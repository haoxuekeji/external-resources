/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#9966FF';
    const secondaryColour = '#774DCB';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['21', '21'], ['22', '22'], ['4', '4'], ['5', '5']];

    Blockly.Blocks.espOled_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPOLED_INIT', 'init OLED display SDA %1 SCL %2'),
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
                message0: message('ESPOLED_TEXT', 'display text %1 at x %2 y %3'),
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
                message0: message('ESPOLED_PIXEL', 'draw pixel at x %1 y %2'),
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
                message0: message('ESPOLED_LINE', 'draw line from x1 %1 y1 %2 to x2 %3 y2 %4'),
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
                message0: message('ESPOLED_CLEAR', 'clear display'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espOled_show = {
        init: function () {
            this.jsonInit({
                message0: message('ESPOLED_SHOW', 'refresh display'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
