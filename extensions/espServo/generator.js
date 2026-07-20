/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    // Standard 50Hz servo: 0.5ms - 2.5ms pulse maps 0 - 180 degrees.
    // duty_u16: 65535 * 0.0005 / 0.02 = 1638 (0 deg), 65535 * 0.0025 / 0.02 = 8192 (180 deg).
    const ensureHelper = () => {
        Blockly.Python.imports_.espServo = 'from machine import Pin, PWM';
        Blockly.Python.libraries_.espServo =
            `_servos = {}\n` +
            `def _ob_servo(pin, angle):\n` +
            `    if pin not in _servos:\n` +
            `        _servos[pin] = PWM(Pin(pin), freq=50)\n` +
            `    angle = min(180, max(0, angle))\n` +
            `    _servos[pin].duty_u16(1638 + int(angle * 6554 / 180))\n`;
    };

    Blockly.Python.espServo_setAngle = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');
        const angle = Blockly.Python.valueToCode(block, 'ANGLE', Blockly.Python.ORDER_ATOMIC) || '90';
        return `_ob_servo(${pin}, int(${angle}))\n`;
    };

    Blockly.Python.espServo_release = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');
        return `if ${pin} in _servos:\n${Blockly.Python.INDENT}_servos.pop(${pin}).deinit()\n`;
    };

    return Blockly;
}

exports = registerGenerators;
