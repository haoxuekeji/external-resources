/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#9966FF';
    const secondaryColour = '#774DCB';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    Blockly.Blocks.espOled_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPOLED_INIT,
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
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espOled_text = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPOLED_TEXT,
                args0: [
                    {
                        type: 'input_value',
                        name: 'TEXT'
                    },
                    {
                        type: 'input_value',
                        name: 'X'
                    },
                    {
                        type: 'input_value',
                        name: 'Y'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espOled_pixel = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPOLED_PIXEL,
                args0: [
                    {
                        type: 'input_value',
                        name: 'X'
                    },
                    {
                        type: 'input_value',
                        name: 'Y'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espOled_line = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPOLED_LINE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'X1'
                    },
                    {
                        type: 'input_value',
                        name: 'Y1'
                    },
                    {
                        type: 'input_value',
                        name: 'X2'
                    },
                    {
                        type: 'input_value',
                        name: 'Y2'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espOled_clear = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPOLED_CLEAR,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espOled_show = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPOLED_SHOW,
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
