/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    Blockly.Arduino.motor_run = function (block) {
        const speed_value = Blockly.Arduino.valueToCode(block, 'SPEED_VALUE', Blockly.Arduino.ORDER_ATOMIC);
        const speed = block.getFieldValue('SPEED');
        const dir = block.getFieldValue('DIR');
        Blockly.Arduino.definitions_.motor_run = `void motor_run(int speed, int pwm_pin, int dir_pin) {\n` +
        `  pinMode(dir_pin, OUTPUT);\n  pinMode(pwm_pin, OUTPUT);\n  speed = speed > 255 ? 255: speed;\n` +
        `  speed = speed < -255 ? -255 : speed;\n` +
        `  if (speed >= 0) {\n    digitalWrite(dir_pin, HIGH);\n` +
        `    analogWrite(pwm_pin, speed);\n  }\n  else {\n    digitalWrite(dir_pin, LOW);\n    analogWrite(pwm_pin, -speed);\n  }\n}`;
        return `motor_run(${speed_value},${speed}, ${dir});\n`;
    };

    return Blockly;
}

exports = addGenerator;
