/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    // Inside an asyncio task (event hats / several begin stacks) a note's
    // duration must not block every other task, so the wait is awaited like
    // the built-in wait block does; older base packages have no
    // isInAsyncTask and always generate plain sequential code.
    const inAsyncTask = block => typeof Blockly.Python.isInAsyncTask === 'function' &&
        Blockly.Python.isInAsyncTask(block);

    const ensureHelper = () => {
        Blockly.Python.imports_.espBuzzer_machine = 'from machine import Pin, PWM';
        Blockly.Python.imports_.espBuzzer_time = 'import time';

        Blockly.Python.libraries_.espBuzzer_helpers =
            `_buzzers = {}\n` +
            `def _ob_buzzer(pin):\n` +
            `    if pin not in _buzzers:\n` +
            `        _buzzers[pin] = PWM(Pin(pin))\n` +
            `        _buzzers[pin].duty_u16(0)\n` +
            `    return _buzzers[pin]\n` +
            `def _ob_buzzer_tone(pin, freq, dur):\n` +
            `    _b = _ob_buzzer(pin)\n` +
            `    _b.freq(int(freq))\n` +
            `    _b.duty_u16(32768)\n` +
            `    time.sleep(dur)\n` +
            `    _b.duty_u16(0)\n`;
    };

    const ensureAsyncHelper = () => {
        ensureHelper();
        Blockly.Python.imports_.asyncio = 'import asyncio';
        Blockly.Python.libraries_.espBuzzer_async =
            `async def _ob_buzzer_tone_async(pin, freq, dur):\n` +
            `    _b = _ob_buzzer(pin)\n` +
            `    _b.freq(int(freq))\n` +
            `    _b.duty_u16(32768)\n` +
            `    await asyncio.sleep(dur)\n` +
            `    _b.duty_u16(0)\n`;
    };

    const tone = (block, pin, freq, dur) => {
        if (inAsyncTask(block)) {
            ensureAsyncHelper();
            return `await _ob_buzzer_tone_async(${pin}, ${freq}, ${dur})\n`;
        }
        ensureHelper();
        return `_ob_buzzer_tone(${pin}, ${freq}, ${dur})\n`;
    };

    Blockly.Python.espBuzzer_playNote = function (block) {
        const pin = block.getFieldValue('PIN');
        const note = block.getFieldValue('NOTE');
        const dur = Blockly.Python.valueToCode(block, 'DUR', Blockly.Python.ORDER_ATOMIC) || '0.5';

        return tone(block, pin, note, dur);
    };

    Blockly.Python.espBuzzer_playFreq = function (block) {
        const pin = block.getFieldValue('PIN');
        const freq = Blockly.Python.valueToCode(block, 'FREQ', Blockly.Python.ORDER_ATOMIC) || '440';
        const dur = Blockly.Python.valueToCode(block, 'DUR', Blockly.Python.ORDER_ATOMIC) || '0.5';

        return tone(block, pin, freq, dur);
    };

    Blockly.Python.espBuzzer_rest = function (block) {
        const dur = Blockly.Python.valueToCode(block, 'DUR', Blockly.Python.ORDER_ATOMIC) || '0.5';

        if (inAsyncTask(block)) {
            Blockly.Python.imports_.asyncio = 'import asyncio';
            return `await asyncio.sleep(${dur})\n`;
        }
        Blockly.Python.imports_.espBuzzer_time = 'import time';

        return `time.sleep(${dur})\n`;
    };

    Blockly.Python.espBuzzer_stop = function (block) {
        const pin = block.getFieldValue('PIN');

        ensureHelper();

        return `_ob_buzzer(${pin}).duty_u16(0)\n`;
    };

    return Blockly;
}

exports = registerGenerators;
