/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const colour = '#FF7F50';
    const secondaryColour = '#FF6347';


    Blockly.Blocks.tm1650_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TM1650_INIT,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };


    Blockly.Blocks.tm1650_display = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TM1650_DISPLAY,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'STA',
                        options: [
                            [Blockly.Msg.TM1650_STATE_ON, 'true'],
                            [Blockly.Msg.TM1650_STATE_OFF, 'false']
                        ]
                    }
                ],
                tooltip: Blockly.Msg.TM1650_SETPOINT_TOOLTIP,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tm1650_setBrightness = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TM1650_SETBRIGHTNESS,
                args0: [
                    {
                        type: 'input_value',
                        name: 'BRT'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tm1650_brightnessNumber = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_slider',
                        name: 'NUM',
                        value: '0',
                        precision: 1,
                        min: '0',
                        max: '7'
                    }
                ],
                output: 'Number',
                outputShape: Blockly.OUTPUT_SHAPE_ROUND,
                colour: Blockly.Colours.textField,
                colourSecondary: Blockly.Colours.textField,
                colourTertiary: Blockly.Colours.textField
            });
        }
    };

    Blockly.Blocks.tm1650_displayString = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TM1650_DISPLAYSTRING,
                args0: [
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };



    Blockly.Blocks.tm1650_setPoint = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TM1650_SETPOINT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'POS',
                        options: [
                            ['1', '0'],
                            ['2', '1'],
                            ['3', '2'],
                            ['4', '3']
                        ]
                    },
                    {
                        type: 'field_dropdown',
                        name: 'STA',
                        options: [
                            [Blockly.Msg.TM1650_STATE_BRIGHT, 'true'],
                            [Blockly.Msg.TM1650_STATE_DROWN, 'false']
                        ]
                    }
                ],
                tooltip: Blockly.Msg.TM1650_SETPOINT_TOOLTIP,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.tm1650_clear = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.TM1650_CLEAR,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
