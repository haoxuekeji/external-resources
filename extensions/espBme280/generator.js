/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espBme280_init = function (block) {
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');

        Blockly.Python.imports_.espBme280_machine = 'from machine import Pin, SoftI2C';
        Blockly.Python.imports_.espBme280 = 'import bme280';

        Blockly.Python.setups_.espBme280 =
            `_bme = bme280.BME280(SoftI2C(sda=Pin(${sda}), scl=Pin(${scl})))`;

        return '';
    };

    Blockly.Python.espBme280_temperature = function () {
        return [`_bme.temperature()`, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.espBme280_humidity = function () {
        return [`_bme.humidity()`, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.espBme280_pressure = function () {
        return [`_bme.pressure()`, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    Blockly.Python.espBme280_altitude = function () {
        return [`_bme.altitude()`, Blockly.Python.ORDER_FUNCTION_CALL];
    };

    return Blockly;
}

exports = registerGenerators;
