/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    Blockly.Arduino.voice_play = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        //Blockly.Arduino.definitions_.voic_play_init = ``;
        return ``;
    };

    Blockly.Arduino.voice_play_combinationPlay = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const num = block.getFieldValue('NO');
        const pin = block.getFieldValue('PIN');

        return `combinationPlay(${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playTemperature = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const temp = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
        return `playTemperature(${temp}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playHumidity = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const hum = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

        return `playHumidity(${hum}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playIntNumber = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
        const pin = block.getFieldValue('PIN');
        return `playIntNumber(${data}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playFloatNumber = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
        return `playFloatNumber(${data}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playSerialNumber = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

        return `playSerialNumber (${data}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playDistance = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const num = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

        return `playDistance(${num}, ${pin});\n`;
    };

    Blockly.Arduino.voice_play_playFullCurrentTime = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const hour = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_ATOMIC);
        const min = Blockly.Arduino.valueToCode(block, 'MIN', Blockly.Arduino.ORDER_ATOMIC);
        const sec = Blockly.Arduino.valueToCode(block, 'SEC', Blockly.Arduino.ORDER_ATOMIC);

        return `playFullCurrentTime (${hour}, ${min}, ${sec}, ${pin});\n`;
    };
    Blockly.Arduino.voice_play_playCurrentTime = function (block) {
        Blockly.Arduino.includes_.voice_play_init = `#include <SoundChip.h>`;
        const pin = block.getFieldValue('PIN');
        const hour = Blockly.Arduino.valueToCode(block, 'HOUR', Blockly.Arduino.ORDER_ATOMIC);
        const min = Blockly.Arduino.valueToCode(block, 'MIN', Blockly.Arduino.ORDER_ATOMIC);

        return `playCurrentTime (${hour}, ${min}, ${pin});\n`;
    };

    return Blockly;
}

exports = addGenerator;
