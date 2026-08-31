/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#0FBD8C';
    const secondaryColour = '#0B8E69';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };

    Blockly.Blocks.espEspNow_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_INIT', 'init ESP-NOW'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espEspNow_myMac = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_MYMAC', 'my MAC address'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.espEspNow_send = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_SEND', 'send %1 to MAC %2'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'MSG'
                    },
                    {
                        type: 'input_value',
                        name: 'MAC'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espEspNow_broadcast = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_BROADCAST', 'broadcast %1'),
                args0: [
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

    Blockly.Blocks.espEspNow_whenMessage = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_WHENMESSAGE', 'when ESP-NOW message received'),
                nextStatement: null,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_hat']
            });
        }
    };

    Blockly.Blocks.espEspNow_message = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_MESSAGE', 'received message'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.espEspNow_sender = {
        init: function () {
            this.jsonInit({
                message0: message('ESPESPNOW_SENDER', 'sender MAC address'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
