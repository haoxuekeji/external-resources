/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {
    const ensureTm1650 = block => {
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');
        const brightness = block.getFieldValue('BRIGHTNESS');

        Blockly.Python.imports_.espTm1650_machine = 'from machine import Pin, SoftI2C';
        Blockly.Python.imports_.espTm1650 = 'import tm1650';
        Blockly.Python.setups_.espTm1650 =
            `_tm1650_i2c = SoftI2C(sda=Pin(${sda}), scl=Pin(${scl}), freq=100000)\n` +
            `_tm1650 = tm1650.TM1650(_tm1650_i2c, brightness=${brightness})`;
    };

    Blockly.Python.espTm1650_init = function (block) {
        ensureTm1650(block);
        return '';
    };

    Blockly.Python.espTm1650_showNumber = function (block) {
        const number = Blockly.Python.valueToCode(block, 'NUMBER', Blockly.Python.ORDER_ATOMIC) || '0';
        const decimals = block.getFieldValue('DECIMALS');
        return `_tm1650.show_number(${number}, ${decimals})\n`;
    };

    Blockly.Python.espTm1650_showText = function (block) {
        const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_tm1650.show_text(str(${text}))\n`;
    };

    Blockly.Python.espTm1650_showAt = function (block) {
        const char = Blockly.Python.valueToCode(block, 'CHAR', Blockly.Python.ORDER_ATOMIC) || `''`;
        const position = block.getFieldValue('POSITION');
        return `_tm1650.show_at(${position}, str(${char}))\n`;
    };

    Blockly.Python.espTm1650_setDecimal = function (block) {
        const position = block.getFieldValue('POSITION');
        const state = block.getFieldValue('STATE');
        return `_tm1650.set_decimal(${position}, ${state})\n`;
    };

    Blockly.Python.espTm1650_setBrightness = function (block) {
        const brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || '4';
        return `_tm1650.set_brightness(${brightness})\n`;
    };

    Blockly.Python.espTm1650_setDisplay = function (block) {
        const state = block.getFieldValue('STATE');
        return `_tm1650.set_display(${state})\n`;
    };

    Blockly.Python.espTm1650_clear = function () {
        return `_tm1650.clear()\n`;
    };

    return Blockly;
}

exports = registerGenerators;
