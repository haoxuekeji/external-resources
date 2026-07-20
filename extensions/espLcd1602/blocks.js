/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#0FBD8C';
    const secondaryColour = '#0B8E69';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    Blockly.Blocks.espLcd1602_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPLCD1602_INIT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'SDA',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'SCL',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'ADDR',
                        options: [
                            ['0x27', '0x27'],
                            ['0x3F', '0x3F']
                        ]
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espLcd1602_showText = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPLCD1602_SHOWTEXT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'ROW',
                        options: [
                            ['1', '0'],
                            ['2', '1']
                        ]
                    },
                    {
                        type: 'input_value',
                        name: 'COL'
                    },
                    {
                        type: 'input_value',
                        name: 'TEXT'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espLcd1602_clear = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPLCD1602_CLEAR,
                args0: [],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espLcd1602_backlight = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPLCD1602_BACKLIGHT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'STATE',
                        options: [
                            [Blockly.Msg.ESPLCD1602_ON, 'True'],
                            [Blockly.Msg.ESPLCD1602_OFF, 'False']
                        ]
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
