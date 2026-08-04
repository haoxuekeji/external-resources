/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#0FBD8C';
    const secondaryColour = '#0DA57A';
    const message = (key, fallback) => {
        const value = Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };

    Blockly.Blocks.espHttp_get = {
        init: function () {
            this.jsonInit({
                message0: message('ESPHTTP_GET', 'HTTP GET %1'),
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
                message0: message('ESPHTTP_POST', 'HTTP POST %1 with data %2'),
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
                message0: message('ESPHTTP_STATUSCODE', 'HTTP status code'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espHttp_response = {
        init: function () {
            this.jsonInit({
                message0: message('ESPHTTP_RESPONSE', 'HTTP response'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
