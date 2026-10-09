/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espMpu6050_init = function (block) {
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');

        Blockly.Python.imports_.espMpu6050_machine = 'from machine import Pin, I2C';
        Blockly.Python.imports_.espMpu6050 = 'import mpu6050';

        Blockly.Python.setups_.espMpu6050 =
            `_mpu = mpu6050.MPU6050(I2C(0, sda=Pin(${sda}), scl=Pin(${scl})))`;

        return '';
    };

    Blockly.Python.espMpu6050_accel = function (block) {
        const axis = block.getFieldValue('AXIS');

        return [`_mpu.accel()[${axis}]`, Blockly.Python.ORDER_MEMBER];
    };

    Blockly.Python.espMpu6050_gyro = function (block) {
        const axis = block.getFieldValue('AXIS');

        return [`_mpu.gyro()[${axis}]`, Blockly.Python.ORDER_MEMBER];
    };

    Blockly.Python.espMpu6050_temperature = function () {
        return [`_mpu.temperature()`, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
