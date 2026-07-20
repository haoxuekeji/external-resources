/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espLcd1602_init = function (block) {
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');
        const addr = block.getFieldValue('ADDR');

        Blockly.Python.imports_.espLcd1602_machine = 'from machine import Pin, SoftI2C';
        Blockly.Python.imports_.espLcd1602 = 'import lcd1602';

        Blockly.Python.setups_.espLcd1602 =
            `_lcd = lcd1602.LCD1602(SoftI2C(sda=Pin(${sda}), scl=Pin(${scl})), addr=${addr})`;

        return '';
    };

    Blockly.Python.espLcd1602_showText = function (block) {
        const row = block.getFieldValue('ROW');
        const col = Blockly.Python.valueToCode(block, 'COL', Blockly.Python.ORDER_ATOMIC) || '1';
        const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || `''`;

        let code = `_lcd.move_to(${row}, max(0, min(15, int(${col}) - 1)))\n`;
        code += `_lcd.putstr(str(${text}))\n`;
        return code;
    };

    Blockly.Python.espLcd1602_clear = function () {
        return `_lcd.clear()\n`;
    };

    Blockly.Python.espLcd1602_backlight = function (block) {
        const state = block.getFieldValue('STATE');

        return `_lcd.backlight(${state})\n`;
    };

    return Blockly;
}

exports = registerGenerators;
