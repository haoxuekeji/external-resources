/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espOled_init = function (block) {
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');

        Blockly.Python.imports_.espOled_machine = 'from machine import Pin, SoftI2C';
        Blockly.Python.imports_.espOled = 'import ssd1306';

        return `_oled = ssd1306.SSD1306_I2C(128, 64, SoftI2C(sda=Pin(${sda}), scl=Pin(${scl})))\n`;
    };

    Blockly.Python.espOled_text = function (block) {
        const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || `''`;
        const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
        const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
        return `_oled.text(str(${text}), int(${x}), int(${y}))\n`;
    };

    Blockly.Python.espOled_pixel = function (block) {
        const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
        const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
        return `_oled.pixel(int(${x}), int(${y}), 1)\n`;
    };

    Blockly.Python.espOled_line = function (block) {
        const x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC) || '0';
        const y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC) || '0';
        const x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC) || '0';
        const y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC) || '0';
        return `_oled.line(int(${x1}), int(${y1}), int(${x2}), int(${y2}), 1)\n`;
    };

    Blockly.Python.espOled_clear = function () {
        return `_oled.fill(0)\n`;
    };

    Blockly.Python.espOled_show = function () {
        return `_oled.show()\n`;
    };

    return Blockly;
}

exports = registerGenerators;
