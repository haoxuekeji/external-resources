/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    // Declare the hats so the base generator switches to asyncio multi-task
    // mode whenever any of them is on the workspace (see generators/python.js:
    // init() reads MICROPYTHON_EVENT_HATS to detect async mode).
    const EVENT_HATS = ['espEvents_whenButton', 'espEvents_whenTouch', 'espEvents_everyNSeconds'];
    if (Array.isArray(Blockly.Python.MICROPYTHON_EVENT_HATS)) {
        EVENT_HATS.forEach(hat => {
            if (Blockly.Python.MICROPYTHON_EVENT_HATS.indexOf(hat) === -1) {
                Blockly.Python.MICROPYTHON_EVENT_HATS.push(hat);
            }
        });
    }

    const ind = Blockly.Python.INDENT;

    // Turn the stack under a hat into an `async def <name>():` handler, exactly
    // like the built-in pin event hat (children indented by scrub_).
    const buildHandler = (block, name) => {
        let code = `async def ${name}():\n`;
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        if (!nextBlock) {
            return `${code}${ind}pass\n`;
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

    Blockly.Python.espEvents_whenButton = function (block) {
        Blockly.Python.imports_.machine_pin = 'from machine import Pin';
        Blockly.Python.imports_.asyncio = 'import asyncio';

        const pin = block.getFieldValue('PIN') || '0';
        Blockly.Python.setups_[`pin_${pin}`] = `p${pin} = Pin(${pin})`;
        // Buttons are wired to ground and read low when pressed, so bias the
        // idle level high with the internal pull-up.
        Blockly.Python.setups_[`pin_mode_${pin}`] = `p${pin}.init(Pin.IN, Pin.PULL_UP)`;

        Blockly.Python.asyncTaskCount_++;
        const n = Blockly.Python.asyncTaskCount_;
        const handlerName = `_ob_on_btn${pin}_${n}`;
        const watcherName = `_ob_btnwatch${n}`;

        Blockly.Python.libraries_[`async_handler_btn${n}`] = buildHandler(block, handlerName);
        // Falling-edge detection with a 20ms poll debounces mechanical bounce.
        Blockly.Python.libraries_[`async_watcher_btn${n}`] =
            `async def ${watcherName}():\n` +
            `${ind}_last = p${pin}.value()\n` +
            `${ind}while True:\n` +
            `${ind}${ind}_now = p${pin}.value()\n` +
            `${ind}${ind}if _now == 0 and _last != 0:\n` +
            `${ind}${ind}${ind}await ${handlerName}()\n` +
            `${ind}${ind}_last = _now\n` +
            `${ind}${ind}await asyncio.sleep_ms(20)\n`;
        Blockly.Python.asyncTasks_.push(watcherName);
        return null;
    };

    Blockly.Python.espEvents_whenTouch = function (block) {
        Blockly.Python.imports_.machine_touch = 'from machine import Pin, TouchPad';
        Blockly.Python.imports_.asyncio = 'import asyncio';

        const pin = block.getFieldValue('TOUCH') || '4';
        Blockly.Python.setups_[`touch_${pin}`] = `_t${pin} = TouchPad(Pin(${pin}))`;

        Blockly.Python.asyncTaskCount_++;
        const n = Blockly.Python.asyncTaskCount_;
        const handlerName = `_ob_on_touch${pin}_${n}`;
        const watcherName = `_ob_touchwatch${n}`;

        Blockly.Python.libraries_[`async_handler_touch${n}`] = buildHandler(block, handlerName);
        // A touched capacitive pad reads far below its idle value; latch so the
        // handler fires once per touch instead of every polling frame.
        Blockly.Python.libraries_[`async_watcher_touch${n}`] =
            `async def ${watcherName}():\n` +
            `${ind}_touched = False\n` +
            `${ind}while True:\n` +
            `${ind}${ind}_v = _t${pin}.read()\n` +
            `${ind}${ind}if _v < 300 and not _touched:\n` +
            `${ind}${ind}${ind}_touched = True\n` +
            `${ind}${ind}${ind}await ${handlerName}()\n` +
            `${ind}${ind}elif _v >= 300:\n` +
            `${ind}${ind}${ind}_touched = False\n` +
            `${ind}${ind}await asyncio.sleep_ms(20)\n`;
        Blockly.Python.asyncTasks_.push(watcherName);
        return null;
    };

    Blockly.Python.espEvents_everyNSeconds = function (block) {
        Blockly.Python.imports_.asyncio = 'import asyncio';

        const secs = Blockly.Python.valueToCode(block, 'N', Blockly.Python.ORDER_NONE) || '1';

        Blockly.Python.asyncTaskCount_++;
        const n = Blockly.Python.asyncTaskCount_;
        const handlerName = `_ob_everybody${n}`;
        const taskName = `_ob_every${n}`;

        Blockly.Python.libraries_[`async_handler_every${n}`] = buildHandler(block, handlerName);
        Blockly.Python.libraries_[`async_watcher_every${n}`] =
            `async def ${taskName}():\n` +
            `${ind}while True:\n` +
            `${ind}${ind}await asyncio.sleep(${secs})\n` +
            `${ind}${ind}await ${handlerName}()\n`;
        Blockly.Python.asyncTasks_.push(taskName);
        return null;
    };

    return Blockly;
}

exports = registerGenerators;
