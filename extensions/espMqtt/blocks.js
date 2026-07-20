/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#660066';
    const secondaryColour = '#4D004D';

    Blockly.Blocks.espMqtt_connect = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_CONNECT,
                args0: [
                    {
                        type: 'input_value',
                        name: 'HOST'
                    },
                    {
                        type: 'input_value',
                        name: 'PORT'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_disconnect = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_DISCONNECT,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_subscribe = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_SUBSCRIBE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'TOPIC'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_publish = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_PUBLISH,
                args0: [
                    {
                        type: 'input_value',
                        name: 'TOPIC'
                    },
                    {
                        type: 'input_value',
                        name: 'MSG'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_checkMsg = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_CHECKMSG,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_whenMessage = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_WHENMESSAGE,
                nextStatement: null,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_hat']
            });
        }
    };

    Blockly.Blocks.espMqtt_topic = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_TOPIC,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.espMqtt_message = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMQTT_MESSAGE,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
