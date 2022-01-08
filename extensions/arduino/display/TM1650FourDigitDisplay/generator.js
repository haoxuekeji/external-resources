/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    Blockly.Arduino.tm1650_init = function (block) {
        Blockly.Arduino.includes_.tm1650_init = `#include <Wire.h>\n#include <TM1650.h>`;
        Blockly.Arduino.definitions_.tm1650_init = `TM1650 tm1650;`;

        return `Wire.begin();\ntm1650.init();\n`;
    };
    Blockly.Arduino.tm1650_brightnessNumber = function (block) {
        const num = block.getFieldValue('NUM');

        return [`${num}`, Blockly.Arduino.ORDER_ATOMIC];
    };
    Blockly.Arduino.tm1650_setBrightness = function (block) {
        const brt = Blockly.Arduino.valueToCode(block, 'BRT', Blockly.Arduino.ORDER_ATOMIC);

        return `tm1650.setBrightness(${brt});\n`;
    };

    Blockly.Arduino.tm1650_display = function (block) {
        const sta = block.getFieldValue('STA');
        if(sta == 'true') {
            return `tm1650.displayOn();`
        }
        else {
            return `tm1650.displayOff();`
        }
    };


    Blockly.Arduino.tm1650_displayString = function (block) {
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

        return `tm1650.displayString(${data});\n`;
    };



    Blockly.Arduino.tm1650_setPoint = function (block) {
        const sta = block.getFieldValue('STA');
        const pos = block.getFieldValue('POS');
        return `tm1650.setDot(${pos},${sta});\n`;
    };

    Blockly.Arduino.tm1650_clear = function () {
        return `tm1650.clear();\n`;
    };

    return Blockly;
}

exports = addGenerator;
