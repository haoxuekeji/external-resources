/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF8C1A';
    const secondaryColour = '#DB6E00';
    const message = (key, fallback) => {
        const value = Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };

    Blockly.Blocks.espNtp_sync = {
        init: function () {
            this.jsonInit({
                message0: message('ESPNTP_SYNC', 'sync network time timezone %1'),
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
                message0: message('ESPNTP_GET', 'current %1'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'FIELD',
                        options: [
                            [message('ESPNTP_YEAR', 'year'), 'year'],
                            [message('ESPNTP_MONTH', 'month'), 'month'],
                            [message('ESPNTP_DAY', 'day'), 'day'],
                            [message('ESPNTP_HOUR', 'hour'), 'hour'],
                            [message('ESPNTP_MINUTE', 'minute'), 'minute'],
                            [message('ESPNTP_SECOND', 'second'), 'second'],
                            [message('ESPNTP_WEEKDAY', 'weekday'), 'weekday']
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
