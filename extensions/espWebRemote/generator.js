/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    // Declare the hat so the base generator switches to asyncio multi-task
    // mode whenever this block is on the workspace (see generators/python.js).
    if (Array.isArray(Blockly.Python.MICROPYTHON_EVENT_HATS) &&
        Blockly.Python.MICROPYTHON_EVENT_HATS.indexOf('espWebRemote_whenButton') === -1) {
        Blockly.Python.MICROPYTHON_EVENT_HATS.push('espWebRemote_whenButton');
    }

    const ind = Blockly.Python.INDENT;

    const ensureWeb = () => {
        Blockly.Python.imports_.espWebRemote = 'import obwebremote';
        Blockly.Python.setups_.espWebRemote = '_ob_web = obwebremote.OBWebRemote()';
        // The dashboard answers HTTP requests from the repeat() polling hook;
        // the base generator runs that hook in both sync and asyncio modes.
        Blockly.Python.loops_.espWebRemote_poll = '_ob_web.poll()';
    };

    Blockly.Python.espWebRemote_startAp = function (block) {
        ensureWeb();
        const ssid = Blockly.Python.valueToCode(block, 'SSID', Blockly.Python.ORDER_ATOMIC) || `'OpenBlock'`;
        const pwd = Blockly.Python.valueToCode(block, 'PWD', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_ob_web.start_ap(str(${ssid}), str(${pwd}))\n_ob_web.start()\n`;
    };

    Blockly.Python.espWebRemote_startSta = function () {
        ensureWeb();
        return '_ob_web.start()\n';
    };

    Blockly.Python.espWebRemote_address = function () {
        ensureWeb();
        return ['_ob_web.address()', Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.espWebRemote_slider = function (block) {
        ensureWeb();
        const sid = block.getFieldValue('SLIDER') || 'S1';
        Blockly.Python.setups_[`espWebRemote_slider_${sid}`] = `_ob_web.add_slider('${sid}')`;
        return [`_ob_web.slider('${sid}')`, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.espWebRemote_setLabel = function (block) {
        ensureWeb();
        const label = block.getFieldValue('LABEL') || 'L1';
        const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_ob_web.set_label('${label}', str(${text}))\n`;
    };

    Blockly.Python.espWebRemote_whenButton = function (block) {
        ensureWeb();
        const bid = block.getFieldValue('BTN') || 'A';
        Blockly.Python.setups_[`espWebRemote_button_${bid}`] = `_ob_web.add_button('${bid}')`;

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
            // watcher task; the HTTP server itself is polled by the shared
            // _ob_repeat_task the base generator builds from loops_.
            Blockly.Python.imports_.asyncio = 'import asyncio';
            Blockly.Python.asyncTaskCount_++;
            const n = Blockly.Python.asyncTaskCount_;
            const handlerName = `_ob_on_webbtn${bid}_${n}`;
            const watcherName = `_ob_webbtnwatch${n}`;
            Blockly.Python.libraries_[`espWebRemote_handler_${n}`] = buildHandlerBody(`async def ${handlerName}():\n`);
            Blockly.Python.libraries_[`espWebRemote_watcher_${n}`] =
                `async def ${watcherName}():\n` +
                `${ind}while True:\n` +
                `${ind}${ind}if _ob_web.pressed('${bid}'):\n` +
                `${ind}${ind}${ind}await ${handlerName}()\n` +
                `${ind}${ind}await asyncio.sleep_ms(20)\n`;
            Blockly.Python.asyncTasks_.push(watcherName);
            return null;
        }

        // Sync fallback for base packages without asyncio support: check for
        // taps from the generated repeat() hook, like the espEspNow hat.
        const fnName = `on_web_button_${bid}`;
        Blockly.Python.libraries_[`espWebRemote_handler_${bid}`] = buildHandlerBody(`def ${fnName}():\n`);
        Blockly.Python.loops_[`espWebRemote_btn_${bid}`] = `if _ob_web.pressed('${bid}'):\n${ind}${ind}${fnName}()`;
        return null;
    };

    return Blockly;
}

exports = registerGenerators;
