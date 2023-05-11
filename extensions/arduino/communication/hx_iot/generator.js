/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addGenerator (Blockly) {
    Blockly.Arduino.hxIot_init = function (block) {
        const server = Blockly.Arduino.valueToCode(block, 'SERVER', Blockly.Arduino.ORDER_ATOMIC);
        Blockly.Arduino.includes_.hxIot_init = `#include "hx_iot.h"`;
        Blockly.Arduino.definitions_.hxIot_init= `Hx_Iot myIot;`;
        return `myIot.init(${server});\n`;
    };

    Blockly.Arduino.hxIot_connect = function (block) {
        return `myIot.connect();\n`;;
    };
    Blockly.Arduino.hxIot_disconnect = function (block) {
        return `myIot.disconnect();\n`;;
    };

    Blockly.Arduino.hxIot_connected = function (block) {
        return [`myIot.connected()`, Blockly.Arduino.ORDER_ATOMIC];
    };


    Blockly.Arduino.hxIot_publish = function (block) {
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
        const topic_num = block.getFieldValue('TOPIC_NUM');
        return `myIot.publish(${topic_num}, ${data});\n`;
    };

    Blockly.Arduino.hxIot_whenReceivedEventMessage = function (block) {
        //return `message`
        return [`message`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino.hxIot_whenReceivedEvent = function (block) {
        const topic_num = block.getFieldValue('TOPIC_NUM');
        
        //console.log(block)
        // var safeArgName = Blockly.Arduino.customFunctionsArgName_[argName];
        // let message = Blockly.Arduino.statementToCode(block, 'MESSAGE');
        // console.log(message)


        let setupBranch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        setupBranch = Blockly.Arduino.addLoopTrap(setupBranch, block.id);
        Blockly.Arduino.customFunctions_[`hxIot_whenReceivedEventT${topic_num}`] = `void obloqMqttEventT${topic_num}(String& message) {\n${setupBranch}}`;
        Blockly.Arduino.setups_.setups_hxIot_whenReceivedEvent = `myIot.setMqttCallback(msgHandles);`
        var cb = Array
        for(let i = 0; i < 5; i++) {
            if(Blockly.Arduino.customFunctions_[`hxIot_whenReceivedEventT${i}`]) {
                cb[i] = `obloqMqttEventT${i}`;
            }
            else {
                cb[i] = 'NULL';
            }         
        }
        Blockly.Arduino.definitions_[`hxIot_whenReceivedEventT${topic_num}`] = `void obloqMqttEventT${topic_num}(String& message);`;
        Blockly.Arduino.definitions_.hxIot_whenReceivedEvent= `const MsgHandleCb msgHandles[5] = {${cb[0]}, ${cb[1]}, ${cb[2]}, ${cb[3]}, ${cb[4]}};`;
        
        return '';
    };

    Blockly.Arduino.hxIot_whenTopicReceived= function (block) {
        const data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
        const topic_num = block.getFieldValue('TOPIC_NUM');
        let setupBranch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
        setupBranch = Blockly.Arduino.addLoopTrap(setupBranch, block.id);

        Blockly.Arduino.definitions_[`hxIot_whenTopic${topic_num}Received`] = `void whenTopic${topic_num}Received();`;
        Blockly.Arduino.customFunctions_[`hxIot_whenTopic${topic_num}Received`] = `void whenTopic${topic_num}Received() {\n${setupBranch}}`;
        Blockly.Arduino.setups_[`hxIot_whenTopic${topic_num}Received`] = `myIot.setMqttCallback(topic_${topic_num}, ${data}, whenTopic${topic_num}Received);`
        return '';
    };

    return Blockly;
}

exports = addGenerator;
