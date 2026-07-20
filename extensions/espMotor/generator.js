/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureHelper = () => {
        Blockly.Python.imports_.espMotor_machine = 'from machine import Pin, PWM';

        Blockly.Python.libraries_.espMotor_helpers =
            `_motors = {}\n` +
            `def _ob_motor_init(m, in1, in2, en):\n` +
            `    _pwm = PWM(Pin(en))\n` +
            `    _pwm.freq(1000)\n` +
            `    _pwm.duty_u16(0)\n` +
            `    _motors[m] = (Pin(in1, Pin.OUT), Pin(in2, Pin.OUT), _pwm)\n` +
            `def _ob_motor_run(m, direction, speed):\n` +
            `    if m not in _motors:\n` +
            `        return\n` +
            `    _in1, _in2, _pwm = _motors[m]\n` +
            `    speed = min(100, max(0, int(speed)))\n` +
            `    if direction >= 0:\n` +
            `        _in1.value(1)\n` +
            `        _in2.value(0)\n` +
            `    else:\n` +
            `        _in1.value(0)\n` +
            `        _in2.value(1)\n` +
            `    _pwm.duty_u16(int(speed * 65535 / 100))\n` +
            `def _ob_motor_stop(m):\n` +
            `    if m in _motors:\n` +
            `        _motors[m][2].duty_u16(0)\n`;
    };

    Blockly.Python.espMotor_init = function (block) {
        const motor = block.getFieldValue('MOTOR');
        const in1 = block.getFieldValue('IN1');
        const in2 = block.getFieldValue('IN2');
        const en = block.getFieldValue('EN');

        ensureHelper();

        Blockly.Python.setups_[`espMotor_${motor}`] =
            `_ob_motor_init('${motor}', ${in1}, ${in2}, ${en})`;

        return '';
    };

    Blockly.Python.espMotor_run = function (block) {
        const motor = block.getFieldValue('MOTOR');
        const dir = block.getFieldValue('DIR');
        const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '80';

        ensureHelper();

        return `_ob_motor_run('${motor}', ${dir}, ${speed})\n`;
    };

    Blockly.Python.espMotor_stop = function (block) {
        const motor = block.getFieldValue('MOTOR');

        ensureHelper();

        return `_ob_motor_stop('${motor}')\n`;
    };

    Blockly.Python.espMotor_carMove = function (block) {
        const action = block.getFieldValue('ACTION');
        const speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC) || '80';

        ensureHelper();

        // Differential drive: A is the left wheel, B the right one.
        const dirs = {
            forward: ['1', '1'],
            backward: ['-1', '-1'],
            left: ['-1', '1'],
            right: ['1', '-1']
        }[action];

        let code = `_ob_motor_run('A', ${dirs[0]}, ${speed})\n`;
        code += `_ob_motor_run('B', ${dirs[1]}, ${speed})\n`;
        return code;
    };

    Blockly.Python.espMotor_carStop = function () {
        ensureHelper();

        return `_ob_motor_stop('A')\n_ob_motor_stop('B')\n`;
    };

    return Blockly;
}

exports = registerGenerators;
