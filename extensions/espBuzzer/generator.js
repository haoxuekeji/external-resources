/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

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

    Blockly.Python.espBuzzer_playNote = function (block) {
        const pin = block.getFieldValue('PIN');
        const note = block.getFieldValue('NOTE');
        const dur = Blockly.Python.valueToCode(block, 'DUR', Blockly.Python.ORDER_ATOMIC) || '0.5';

        ensureHelper();

        return `_ob_buzzer_tone(${pin}, ${note}, ${dur})\n`;
    };

    Blockly.Python.espBuzzer_playFreq = function (block) {
        const pin = block.getFieldValue('PIN');
        const freq = Blockly.Python.valueToCode(block, 'FREQ', Blockly.Python.ORDER_ATOMIC) || '440';
        const dur = Blockly.Python.valueToCode(block, 'DUR', Blockly.Python.ORDER_ATOMIC) || '0.5';

        ensureHelper();

        return `_ob_buzzer_tone(${pin}, ${freq}, ${dur})\n`;
    };

    Blockly.Python.espBuzzer_rest = function (block) {
        const dur = Blockly.Python.valueToCode(block, 'DUR', Blockly.Python.ORDER_ATOMIC) || '0.5';

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
