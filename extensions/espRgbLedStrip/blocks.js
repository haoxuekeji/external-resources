/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#7700FF';
    const secondaryColour = '#4400B3';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['4', '4'], ['5', '5'], ['21', '21'], ['22', '22']];

    Blockly.Blocks.espRgbLedStrip_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPRGBLEDSTRIP_INIT', 'init RGB strip pin %1 with %2 leds'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'LEN'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espRgbLedStrip_setPixelColor = {
        init: function () {
            this.jsonInit({
                message0: message('ESPRGBLEDSTRIP_SETPIXELCOLOR', 'RGB strip pin %1 set led %2 color %3'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'NO'
                    },
                    {
                        type: 'input_value',
                        name: 'COLOR'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espRgbLedStrip_fill = {
        init: function () {
            this.jsonInit({
                message0: message('ESPRGBLEDSTRIP_FILL', 'RGB strip pin %1 set all leds color %2'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'COLOR'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espRgbLedStrip_setBrightness = {
        init: function () {
            this.jsonInit({
                message0: message('ESPRGBLEDSTRIP_SETBRIGHTNESS', 'RGB strip pin %1 set brightness to %2 (0-100)'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'BRT'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espRgbLedStrip_clear = {
        init: function () {
            this.jsonInit({
                message0: message('ESPRGBLEDSTRIP_CLEAR', 'RGB strip pin %1 turn off all leds'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
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
