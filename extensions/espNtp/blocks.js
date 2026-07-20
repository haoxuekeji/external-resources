/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF8C1A';
    const secondaryColour = '#DB6E00';

    Blockly.Blocks.espNtp_sync = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPNTP_SYNC,
                args0: [
                    {
                        type: 'input_value',
                        name: 'TZ'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espNtp_get = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPNTP_GET,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'FIELD',
                        options: [
                            [Blockly.Msg.ESPNTP_YEAR, 'year'],
                            [Blockly.Msg.ESPNTP_MONTH, 'month'],
                            [Blockly.Msg.ESPNTP_DAY, 'day'],
                            [Blockly.Msg.ESPNTP_HOUR, 'hour'],
                            [Blockly.Msg.ESPNTP_MINUTE, 'minute'],
                            [Blockly.Msg.ESPNTP_SECOND, 'second'],
                            [Blockly.Msg.ESPNTP_WEEKDAY, 'weekday']
                        ]
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
