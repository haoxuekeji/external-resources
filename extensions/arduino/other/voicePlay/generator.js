/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    Blockly.Arduino.voice_play() = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <QXCSoundChip.h>`;
        //Blockly.Arduino.definitions_.voic_play_init = ``;
        return ``;
    };

    Blockly.Arduino.voice_play_combinationPlay = function (block) {
        const num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
        const pin = block.getFieldValue('PIN');

        return `combinationPlay(${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playTemperature = function (block) {
        const pin = block.getFieldValue('PIN');
        const temp = Blockly.Arduino.valueToCode(block, 'TEMP', Blockly.Arduino.ORDER_ATOMIC);
        return `playTemperature(${temp}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playHumidity = function (block) {
        const pin = block.getFieldValue('PIN');
        const hum = Blockly.Arduino.valueToCode(block, 'HUM', Blockly.Arduino.ORDER_ATOMIC);

        return `playHumidity(${hum}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playIntNumber = function () {
        const num = Blockly.Arduino.valueToCode(block, 'INTNUM', Blockly.Arduino.ORDER_ATOMIC);
        const pin = block.getFieldValue('PIN');
        return `playIntNumber(${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playFloatNumber = function (block) {
        const pin = block.getFieldValue('PIN');
        const num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
        return `playFloatNumber(${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playSerialNumber = function (block) {
        const pin = block.getFieldValue('PIN');
        const name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC);

        return `playSerialNumber (${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playDistance = function (block) {
        const pin = block.getFieldValue('PIN');
        const name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC);

        return `playDistance(${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playFullCurrentTime = function (block) {
        const pin = block.getFieldValue('PIN');
        const hour = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_ATOMIC);
        const min = Blockly.Arduino.valueToCode(block, 'MIN', Blockly.Arduino.ORDER_ATOMIC);
        const sec = Blockly.Arduino.valueToCode(block, 'SEC', Blockly.Arduino.ORDER_ATOMIC);

        return `playFullCurrentTime (${hour}, ${min}, ${sec}, ${pin});\n`;
    };
    Blockly.Arduino.voice_play_playCurrentTime = function (block) {
        const pin = block.getFieldValue('PIN');
        const name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC);

        return `playCurrentTime(${num}, ${pin});\n`;
    };

    return Blockly;
}

exports = addGenerator;
