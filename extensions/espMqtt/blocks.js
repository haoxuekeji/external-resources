/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#660066';
    const secondaryColour = '#4D004D';
    const message = (key, fallback) => {
        const value = Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };

    Blockly.Blocks.espMqtt_connect = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMQTT_CONNECT', 'connect to MQTT broker %1 port %2'),
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
                message0: message('ESPMQTT_DISCONNECT', 'disconnect from MQTT broker'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_subscribe = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMQTT_SUBSCRIBE', 'subscribe to topic %1'),
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
                message0: message('ESPMQTT_PUBLISH', 'publish %2 to topic %1'),
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
                message0: message('ESPMQTT_CHECKMSG', 'check MQTT messages'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMqtt_whenMessage = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMQTT_WHENMESSAGE', 'when MQTT message received'),
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
                message0: message('ESPMQTT_TOPIC', 'MQTT topic'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.espMqtt_message = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMQTT_MESSAGE', 'MQTT message'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
