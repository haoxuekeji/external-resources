/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const color = '#42CCFF';
    const secondaryColour = '#00BFFF';
    const topic_num = [
        ['Topic_0', '0'],
        ['Topic_1', '1'],
        ['Topic_2', '2'],
        ['Topic_3', '3'],
        ['Topic_4', '4']
    ];

    Blockly.Blocks.hxIot_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_INIT,
                args0: [
                    {
                        type: 'input_value',
                        name: 'SERVER'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.hxIot_connect= {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_CONNECT,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    
    Blockly.Blocks.hxIot_disconnect= {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_DISCONNECT,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    
    Blockly.Blocks.hxIot_connected= {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_CONNECTED,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_boolean']
            });
        }
    };
    
    Blockly.Blocks.hxIot_publish= {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_PUBLISH,
                args0: [
                    {
                        type: 'input_value',
                        name: 'DATA'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'TOPIC_NUM',
                        options: topic_num
                    },
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.hxIot_whenReceivedEventMessage = {
        init: function () {
            this.jsonInit({
                message0: 'message',
                output: 'String',
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.hxIot_whenReceivedEvent = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_WHEN_RECEIVED_EVENT,
                message1: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'TOPIC_NUM',
                        options: topic_num
                    },
                    {
                        type: "input_value",
                        name: "MESSAGE",
                    }
                ],
                args1: [{
                    type: 'input_statement',
                    name: 'SUBSTACK'
                }],
                colour: color,
                secondaryColour: secondaryColour,
                category: Blockly.Categories.data,
                // extensions: ['shape_hat']
            });
            //this.setNextStatement(false, null);
        }
    };

    Blockly.Blocks.hxIot_whenTopicReceived = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.HXIOT_WHEN_TOPIC_RECEIVED,
                message1: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'TOPIC_NUM',
                        options: topic_num
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    },                   
                   
                ],
                args1: [{
                    type: 'input_statement',
                    name: 'SUBSTACK'
                }],
                colour: color,
                secondaryColour: secondaryColour,
                //extensions: ['shape_hat']
            });
            //this.setNextStatement(false, null);
        }
    };

    return Blockly;
}

exports = addBlocks;
