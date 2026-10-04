/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    // Same semantics as the esp32 built-in ultrasonic block and the realtime
    // runtime: time_pulse_us returns -2 when the echo pulse never starts
    // (sensor missing, miswired or unpowered) and -1 when it outlasts the
    // timeout (nothing in range). Report -1 and the 400 cm rated range, so an
    // obstacle avoidance "distance < N" stops when the sensor is gone instead
    // of treating open space as an obstacle. The pull-down keeps a
    // disconnected ECHO line from floating into random readings.
    const ensureHelper = () => {
        Blockly.Python.imports_.ultrasonic_machine = 'import machine';
        Blockly.Python.imports_.ultrasonic_pin = 'from machine import Pin';
        Blockly.Python.imports_.ultrasonic_time = 'import time';
        Blockly.Python.customFunctions_.ultrasonic_readDistance =
            `def _ob_ultrasonic_cm(trig, echo):\n` +
            `    _tp = Pin(trig, Pin.OUT)\n` +
            `    _ep = Pin(echo, Pin.IN, Pin.PULL_DOWN)\n` +
            `    _tp.value(0)\n` +
            `    time.sleep_us(2)\n` +
            `    _tp.value(1)\n` +
            `    time.sleep_us(10)\n` +
            `    _tp.value(0)\n` +
            `    _d = machine.time_pulse_us(_ep, 1, 30000)\n` +
            `    if _d == -2:\n` +
            `        return -1\n` +
            `    if _d < 0:\n` +
            `        return 400\n` +
            `    return min(400, round(_d / 58.0, 1))\n` +
            `def _ob_ultrasonic_mm(trig, echo):\n` +
            `    _cm = _ob_ultrasonic_cm(trig, echo)\n` +
            `    return _cm if _cm < 0 else int(round(_cm * 10))\n`;
    };

    Blockly.Python.ultrasonic_readDistance = function (block) {
        const trig = block.getFieldValue('TRIG');
        const echo = block.getFieldValue('ECHO');
        const unit = block.getFieldValue('UNIT');

        ensureHelper();

        if (unit === 'CM') {
            return [`_ob_ultrasonic_cm(${trig}, ${echo})`, Blockly.Python.ORDER_FUNCTION_CALL];
        }
        return [`_ob_ultrasonic_mm(${trig}, ${echo})`, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    return Blockly;
}

exports = registerGenerators;
