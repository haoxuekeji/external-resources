#!/usr/bin/env node
/**
 * AI-032 积木能力注册表生成器
 *
 * 从扩展元数据（index.js + blocks.js + generator.js + toolbox.js）机器生成
 * 积木能力注册表 JSON，供平台 AI 服务做能力子集检索与受控 AST 校验。
 * 事实只有一份：本脚本不手工维护任何积木清单，全部从扩展源码提取。
 *
 * 用法：
 *   node scripts/generate-block-registry.js                # 生成 ESP32 试点组（esp* 扩展）
 *   node scripts/generate-block-registry.js --filter esp   # 同上（前缀过滤）
 *   node scripts/generate-block-registry.js --ids espDht,espServo
 *   node scripts/generate-block-registry.js --check        # 校验已提交产物与源码一致（CI 门禁）
 *
 * 输出（可复现：同一源码 commit 重复生成字节一致，不含时间戳）：
 *   registry/block-capability-registry-esp32.json
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const {execSync} = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const EXT_DIR = path.join(ROOT, 'extensions');
const SCHEMA_VERSION = 1;
const DYNAMIC_PIN = '__DEVICE_PIN__';

// 安全约束推导规则（从 import/库名派生，非手工按块标注）
const SAFETY_RULES = [
    {pattern: /urequests|usocket|socket|umqtt|mqtt|ntptime|network|urllib/i, tag: 'network'},
    {pattern: /sdcard|uos\b|\bos\b|vfs/i, tag: 'filesystem'}
];
// 执行器类扩展（可驱动物理动作）按扩展 tags 派生
const ACTUATOR_TAGS = new Set(['actuator', 'actuators']);

function parseArgs (argv) {
    const args = {filter: null, ids: null, out: null, check: false};
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--check') args.check = true;
        else if (a === '--filter') args.filter = argv[++i];
        else if (a === '--ids') args.ids = argv[++i].split(',').map(s => s.trim()).filter(Boolean);
        else if (a === '--out') args.out = argv[++i];
        else throw new Error(`未知参数: ${a}`);
    }
    if (!args.filter && !args.ids) args.filter = 'esp'; // 默认 ESP32 试点组
    return args;
}

/** 执行 `exports = fn` 风格的扩展模块文件，返回导出的函数 */
function evalExportsModule (file) {
    const code = fs.readFileSync(file, 'utf8');
    // eslint-disable-next-line no-new-func
    const fn = new Function('exports', 'module', 'require', `${code}\n;return exports;`);
    return fn(undefined, {exports: {}}, () => ({}));
}

/** 加载 index.js 元数据（module.exports = formatMessage => ({...})） */
function loadMeta (extId) {
    const file = path.join(EXT_DIR, extId, 'index.js');
    const code = fs.readFileSync(file, 'utf8');
    const sandbox = {module: {exports: null}, exports: {}, require: () => ({})};
    vm.runInNewContext(code, sandbox, {filename: file, timeout: 5000});
    const factory = sandbox.module.exports;
    if (typeof factory !== 'function') throw new Error(`${extId}/index.js 未导出工厂函数`);
    const formatMessage = descriptor => (descriptor && descriptor.default) || '';
    return factory(formatMessage);
}

/** 构造捕获式 Blockly mock；dynamicPins=true 时 getPinOptions 返回动态标记 */
function mockBlocklyForBlocks (dynamicPins) {
    return {
        Msg: {},
        Device: {
            getPinOptions: () => (dynamicPins ? [[DYNAMIC_PIN, DYNAMIC_PIN]] : null)
        },
        Blocks: {}
    };
}

/** 运行 blocks.js，返回 {opcode: {json, fieldDefaults}} */
function captureBlocks (extId, dynamicPins) {
    const file = path.join(EXT_DIR, extId, 'blocks.js');
    if (!fs.existsSync(file)) return {};
    const register = evalExportsModule(file);
    const Blockly = mockBlocklyForBlocks(dynamicPins);
    register(Blockly);

    const captured = {};
    for (const [opcode, def] of Object.entries(Blockly.Blocks)) {
        if (!def || typeof def.init !== 'function') continue;
        const fieldDefaults = {};
        let json = null;
        const self = {
            jsonInit (j) { json = j; },
            getField (name) {
                return {setValue (v) { fieldDefaults[name] = String(v); }};
            },
            setColour () {}, setOutput () {}, setPreviousStatement () {},
            setNextStatement () {}, appendDummyInput () { return self; },
            appendValueInput () { return self; }, setTooltip () {}, setHelpUrl () {}
        };
        try {
            def.init.call(self);
        } catch (e) {
            console.warn(`[warn] ${extId}.${opcode} blocks.init 执行失败: ${e.message}`);
        }
        if (json) captured[opcode] = {json, fieldDefaults};
    }
    return captured;
}

/** 从块 JSON 的 extensions 字段推导块形状 */
function blockShape (json) {
    const exts = json.extensions || [];
    if (exts.includes('shape_hat')) return 'hat';
    if (exts.includes('output_number')) return 'reporter_number';
    if (exts.includes('output_string')) return 'reporter_string';
    if (exts.includes('output_boolean')) return 'boolean';
    if (exts.includes('shape_statement')) return 'statement';
    if (json.output) return 'reporter_string';
    return 'statement';
}

/** 提取参数定义（合并 args0/args1/...） */
function extractArgs (json, fieldDefaults, toolboxDefaults) {
    const args = [];
    for (let i = 0; i <= 4; i++) {
        for (const arg of json[`args${i}`] || []) {
            if (!arg || !arg.name) continue;
            if (arg.type === 'field_dropdown') {
                const options = (arg.options || []).map(o => String(o[1]));
                const dynamic = options.includes(DYNAMIC_PIN);
                const entry = {
                    name: arg.name,
                    kind: 'dropdown',
                    dynamicOptions: dynamic ? 'device_pins' : null,
                    allowedValues: dynamic ? null : options,
                    default: fieldDefaults[arg.name] ||
                        (toolboxDefaults && toolboxDefaults[arg.name]) ||
                        (dynamic ? null : options[0]) || null
                };
                args.push(entry);
            } else if (arg.type === 'input_value') {
                args.push({
                    name: arg.name,
                    kind: 'input',
                    check: arg.check || null,
                    default: (toolboxDefaults && toolboxDefaults[arg.name]) || null
                });
            } else if (arg.type === 'field_input') {
                args.push({name: arg.name, kind: 'text_field', default: arg.text || null});
            }
        }
    }
    return args;
}

/** 构造 Blockly.Python 捕获 mock */
function mockPython () {
    const store = {
        imports_: {}, libraries_: {}, variables_: {}, setups_: {},
        loops_: {}, definitions_: {}, customFunctions_: {},
        INDENT: '    ',
        valueToCode: () => '0',
        quote_: s => `'${s}'`,
        scrub_: (block, code) => code,
        statementToCode: () => '',
        provideFunction_: () => '_fn'
    };
    return new Proxy(store, {
        get (target, prop) {
            if (prop in target) return target[prop];
            if (typeof prop === 'string' && prop.startsWith('ORDER_')) return 0;
            return undefined;
        }
    });
}

/** 运行 generator.js，返回 {opcode: pythonMapping} */
function capturePython (extId, blockDefs) {
    const file = path.join(EXT_DIR, extId, 'generator.js');
    if (!fs.existsSync(file)) return {};
    const register = evalExportsModule(file);
    const Python = mockPython();
    const Blockly = {Python, Msg: {}};
    try {
        register(Blockly);
    } catch (e) {
        console.warn(`[warn] ${extId} generator 注册失败: ${e.message}`);
        return {};
    }

    const builtin = new Set(Object.keys(mockPython()));
    const mappings = {};
    for (const [opcode, gen] of Object.entries(Python)) {
        if (builtin.has(opcode) || typeof gen !== 'function') continue;
        const def = blockDefs[opcode] || {json: {}, fieldDefaults: {}};
        const mockBlock = {
            getFieldValue (name) {
                const argLists = [];
                for (let i = 0; i <= 4; i++) argLists.push(...(def.json[`args${i}`] || []));
                const arg = argLists.find(a => a && a.name === name);
                if (arg && arg.options && arg.options.length) {
                    const v = String(arg.options[0][1]);
                    return v === DYNAMIC_PIN ? '4' : v;
                }
                return def.fieldDefaults[name] || '0';
            }
        };
        // 每块独立快照：清空累积字典，保证 imports/库归因到当前块而非扩展内首个执行的块
        Python.imports_ = {};
        Python.libraries_ = {};
        Python.setups_ = {};
        Python.variables_ = {};
        Python.customFunctions_ = {};
        let kind = null;
        try {
            const out = gen(mockBlock);
            kind = Array.isArray(out) ? 'expression' : 'statement';
        } catch (e) {
            mappings[opcode] = {available: false, error: `generator 执行失败: ${e.message}`};
            continue;
        }
        mappings[opcode] = {
            available: true,
            kind,
            imports: Object.values(Python.imports_).map(String).sort(),
            libraries: Object.keys(Python.libraries_).sort(),
            setups: Object.keys(Python.setups_).sort(),
            variables: Object.keys(Python.variables_).sort()
        };
    }
    return mappings;
}

/** 解析 toolbox.js，返回 {opcode: {FIELD: default}} */
function captureToolboxDefaults (extId) {
    const file = path.join(EXT_DIR, extId, 'toolbox.js');
    if (!fs.existsSync(file)) return {};
    let xml;
    try {
        const register = evalExportsModule(file);
        xml = String(register());
    } catch (e) {
        console.warn(`[warn] ${extId} toolbox 解析失败: ${e.message}`);
        return {};
    }
    const result = {};
    const blockRe = /<block type="([^"]+)"[^>]*>([\s\S]*?)<\/block>|<block type="([^"]+)"[^>]*\/>/g;
    const fieldRe = /<field name="([^"]+)">([^<]*)<\/field>/g;
    let m;
    while ((m = blockRe.exec(xml)) !== null) {
        const opcode = m[1] || m[3];
        const inner = m[2] || '';
        const fields = {};
        let f;
        while ((f = fieldRe.exec(inner)) !== null) fields[f[1]] = f[2];
        if (!result[opcode]) result[opcode] = fields;
    }
    return result;
}

/** 派生安全约束标签 */
function deriveSafety (mapping, meta) {
    const tags = new Set();
    const haystack = [
        ...(mapping.imports || []),
        ...(mapping.libraries || [])
    ].join(' ');
    for (const rule of SAFETY_RULES) {
        if (rule.pattern.test(haystack)) tags.add(rule.tag);
    }
    for (const t of meta.tags || []) {
        if (ACTUATOR_TAGS.has(t)) tags.add('actuator');
    }
    return [...tags].sort();
}

function buildExtensionEntry (extId) {
    const meta = loadMeta(extId);
    const dynamicPass = captureBlocks(extId, true);
    const staticPass = captureBlocks(extId, false);
    const toolboxDefaults = captureToolboxDefaults(extId);
    const pythonMappings = capturePython(extId, staticPass);

    const blocks = [];
    for (const opcode of Object.keys(dynamicPass).sort()) {
        const dyn = dynamicPass[opcode];
        const stat = staticPass[opcode] || dyn;
        const args = extractArgs(dyn.json, stat.fieldDefaults, toolboxDefaults[opcode]);
        // 动态 pin 下拉的候选回退值从静态 pass 提取
        const staticArgs = extractArgs(stat.json, stat.fieldDefaults, toolboxDefaults[opcode]);
        for (const arg of args) {
            if (arg.kind === 'dropdown' && arg.dynamicOptions) {
                const fallback = staticArgs.find(a => a.name === arg.name);
                arg.fallbackValues = (fallback && fallback.allowedValues) || [];
                if (!arg.default) arg.default = arg.fallbackValues[0] || null;
            }
        }
        const mapping = pythonMappings[opcode] || {available: false, error: '未找到 Python generator'};
        blocks.push({
            opcode,
            shape: blockShape(dyn.json),
            args,
            pythonMapping: mapping,
            safety: deriveSafety(mapping, meta)
        });
    }

    return {
        extensionId: meta.extensionId || extId,
        name: meta.name || extId,
        version: meta.version || '0.0.0',
        supportDevices: meta.supportDevice || [],
        programModes: meta.programMode || [],
        bundledLibrary: meta.library || null,
        official: Boolean(meta.official),
        tags: meta.tags || [],
        blocks
    };
}

function gitCommit () {
    try {
        return execSync('git rev-parse HEAD', {cwd: ROOT}).toString().trim();
    } catch (e) {
        return null;
    }
}

function main () {
    const args = parseArgs(process.argv);
    const all = fs.readdirSync(EXT_DIR).filter(d => fs.statSync(path.join(EXT_DIR, d)).isDirectory());
    let selected;
    if (args.ids) {
        selected = args.ids;
        const missing = selected.filter(id => !all.includes(id));
        if (missing.length) throw new Error(`扩展不存在: ${missing.join(', ')}`);
    } else {
        selected = all.filter(d => d.startsWith(args.filter));
    }
    selected.sort();
    if (!selected.length) throw new Error('未匹配到任何扩展');

    const extensions = selected.map(buildExtensionEntry);
    const registry = {
        schemaVersion: SCHEMA_VERSION,
        registryId: args.ids ? 'openblock-custom' :
            (args.filter === 'esp' ? 'openblock-esp32-pilot' : `openblock-${args.filter}-pilot`),
        generator: 'external-resources-v3/scripts/generate-block-registry.js',
        source: {repo: 'external-resources-v3', commit: gitCommit()},
        extensionCount: extensions.length,
        blockCount: extensions.reduce((n, e) => n + e.blocks.length, 0),
        extensions
    };

    const outPath = path.resolve(ROOT, args.out ||
        `registry/block-capability-registry-${args.ids ? 'custom' : 'esp32'}.json`);
    const content = `${JSON.stringify(registry, null, 2)}\n`;
    const sha256 = crypto.createHash('sha256').update(content).digest('hex');

    if (args.check) {
        if (!fs.existsSync(outPath)) {
            console.error(`[check] 失败：产物不存在 ${outPath}`);
            process.exit(1);
        }
        const existing = fs.readFileSync(outPath, 'utf8');
        // source.commit 随提交变化（产物提交后 HEAD 前移属正常），比较时归一化
        const normalize = s => s.replace(/"commit": "[0-9a-f]{40}"/, '"commit": "<HEAD>"');
        if (normalize(existing) !== normalize(content)) {
            console.error('[check] 失败：注册表与扩展源码不一致，请重新运行生成脚本并提交');
            process.exit(1);
        }
        console.log(`[check] 通过：${path.relative(ROOT, outPath)} 与源码一致`);
        console.log(`[check] sha256=${crypto.createHash('sha256').update(existing).digest('hex')}`);
        return;
    }

    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(outPath, content);
    console.log(`已生成 ${path.relative(ROOT, outPath)}`);
    console.log(`  扩展 ${registry.extensionCount} 个，积木 ${registry.blockCount} 块`);
    console.log(`  sha256=${sha256}`);
}

main();
