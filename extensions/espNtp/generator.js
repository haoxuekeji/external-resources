/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const FIELD_INDEX = {
        year: 0,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5,
        weekday: 6
    };

    // The timezone lives in a dict updated in place: sync may run inside an
    // asyncio task or a custom block, where rebinding a plain global would
    // only create a local and the clock blocks elsewhere would keep UTC+8.
    const ensureHelper = () => {
        Blockly.Python.imports_.espNtp = 'import ntptime';
        Blockly.Python.imports_.espNtp_time = 'import time';
        Blockly.Python.variables_._ntp = `_ntp = {'tz': 8}`;
    };

    Blockly.Python.espNtp_sync = function (block) {
        ensureHelper();
        const tz = Blockly.Python.valueToCode(block, 'TZ', Blockly.Python.ORDER_ATOMIC) || '8';
        let code = `_ntp['tz'] = int(${tz})\n`;
        code += `try:\n`;
        code += `${Blockly.Python.INDENT}ntptime.settime()\n`;
        code += `except Exception:\n`;
        code += `${Blockly.Python.INDENT}pass\n`;
        return code;
    };

    Blockly.Python.espNtp_get = function (block) {
        ensureHelper();
        const field = block.getFieldValue('FIELD');
        const index = typeof FIELD_INDEX[field] === 'undefined' ? 0 : FIELD_INDEX[field];
        if (field === 'weekday') {
            // localtime() weekday is 0-6 with Monday as 0, report 1-7 instead.
            return [`(time.localtime(time.time() + _ntp['tz'] * 3600)[6] + 1)`, Blockly.Python.ORDER_ATOMIC];
        }
        return [`time.localtime(time.time() + _ntp['tz'] * 3600)[${index}]`, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
