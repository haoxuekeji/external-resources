/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#0FBD8C';
    const secondaryColour = '#0DA57A';

    Blockly.Blocks.espHttp_get = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPHTTP_GET,
                args0: [
                    {
                        type: 'input_value',
                        name: 'URL'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espHttp_post = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPHTTP_POST,
                args0: [
                    {
                        type: 'input_value',
                        name: 'URL'
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espHttp_statusCode = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPHTTP_STATUSCODE,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espHttp_response = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPHTTP_RESPONSE,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
