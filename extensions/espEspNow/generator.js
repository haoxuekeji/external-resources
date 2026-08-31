/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    // Declare the hat so the base generator switches to asyncio multi-task
    // mode whenever this block is on the workspace (see generators/python.js).
    if (Array.isArray(Blockly.Python.MICROPYTHON_EVENT_HATS) &&
        Blockly.Python.MICROPYTHON_EVENT_HATS.indexOf('espEspNow_whenMessage') === -1) {
        Blockly.Python.MICROPYTHON_EVENT_HATS.push('espEspNow_whenMessage');
    }

    const ensureNow = () => {
        Blockly.Python.imports_.espEspNow = 'import obespnow';
        Blockly.Python.setups_.espEspNow = '_ob_now = obespnow.OBEspNow()';
    };

    Blockly.Python.espEspNow_init = function () {
        ensureNow();
        return '';
    };

    Blockly.Python.espEspNow_myMac = function () {
        ensureNow();
        return ['_ob_now.mac()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.espEspNow_send = function (block) {
        ensureNow();
        const msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || `''`;
        const mac = Blockly.Python.valueToCode(block, 'MAC', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_ob_now.send(str(${mac}), str(${msg}))\n`;
    };

    Blockly.Python.espEspNow_broadcast = function (block) {
        ensureNow();
        const msg = Blockly.Python.valueToCode(block, 'MSG', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_ob_now.broadcast(str(${msg}))\n`;
    };

    Blockly.Python.espEspNow_whenMessage = function (block) {
        ensureNow();
        const ind = Blockly.Python.INDENT;

        const buildHandlerBody = header => {
            let code = header;
            const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
            if (!nextBlock) {
                code += `${ind}pass\n`;
                return code;
            }
            const variablesName = [];
            for (const x in Blockly.Python.variables_) {
                variablesName.push(Blockly.Python.variables_[x].slice(0, Blockly.Python.variables_[x].indexOf('=') - 1));
            }
            if (variablesName.length !== 0) {
                code += `${ind}global ${variablesName.join(', ')}\n`;
            }
            return Blockly.Python.scrub_(block, code);
        };

        if (Array.isArray(Blockly.Python.asyncTasks_) && Blockly.Python.asyncMode_) {
            // Asyncio path: the stack becomes an async handler awaited by a
            // watcher task, so it runs concurrently with other hats. A second
            // "when message" hat overwrites this one (same as espMqtt).
            Blockly.Python.imports_.asyncio = 'import asyncio';
            Blockly.Python.libraries_.espEspNow_handler = buildHandlerBody('async def _ob_on_espnow():\n');
            Blockly.Python.libraries_.espEspNow_watcher =
                `async def _ob_espnow_watch():\n` +
                `${ind}while True:\n` +
                `${ind}${ind}if _ob_now.poll():\n` +
                `${ind}${ind}${ind}await _ob_on_espnow()\n` +
                `${ind}${ind}await asyncio.sleep_ms(20)\n`;
            if (Blockly.Python.asyncTasks_.indexOf('_ob_espnow_watch') === -1) {
                Blockly.Python.asyncTasks_.push('_ob_espnow_watch');
            }
            return null;
        }

        // Sync fallback for base packages without asyncio support: poll from
        // the generated repeat() hook, mirroring the espMqtt hat pattern.
        Blockly.Python.loops_.espEspNow_poll = `if _ob_now.poll():\n${ind}${ind}on_espnow_message()`;
        Blockly.Python.libraries_.espEspNow_handler = buildHandlerBody('def on_espnow_message():\n');
        return null;
    };

    Blockly.Python.espEspNow_message = function () {
        ensureNow();
        return ['_ob_now.last_message', Blockly.Python.ORDER_MEMBER];
    };

    Blockly.Python.espEspNow_sender = function () {
        ensureNow();
        return ['_ob_now.last_sender', Blockly.Python.ORDER_MEMBER];
    };

    return Blockly;
}

exports = registerGenerators;
