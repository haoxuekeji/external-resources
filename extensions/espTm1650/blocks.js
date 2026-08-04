/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const colour = '#FF6680';
    const secondaryColour = '#D94C66';
    const message = (key, fallback) =>
        typeof Blockly.Msg[key] === 'string' && Blockly.Msg[key].length > 0 ? Blockly.Msg[key] : fallback;
    const validOptions = options => Array.isArray(options) && options.length > 0 &&
        options.every(option => Array.isArray(option) && option.length >= 2 &&
            (typeof option[0] === 'string' || (option[0] && typeof option[0] === 'object')));
    const requestedPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');
    const digitalPins = validOptions(requestedPins) ? requestedPins : [
        ['21', '21'], ['22', '22'], ['18', '18'], ['19', '19'],
        ['4', '4'], ['5', '5'], ['8', '8'], ['9', '9']
    ];
    const positionOptions = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    const stateOptions = [
        [message('ESPTM1650_ON', 'on'), 'True'],
        [message('ESPTM1650_OFF', 'off'), 'False']
    ];

    Blockly.Blocks.espTm1650_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_INIT', 'init TM1650 SDA %1 SCL %2 brightness %3'),
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
                        name: 'BRIGHTNESS',
                        options: [
                            ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'],
                            ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8']
                        ]
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_showNumber = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_SHOWNUMBER', 'TM1650 show number %1 decimal places %2'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'NUMBER'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'DECIMALS',
                        options: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']]
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_showText = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_SHOWTEXT', 'TM1650 show text %1'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'TEXT'
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_showAt = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_SHOWAT', 'TM1650 show %1 at digit %2'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'CHAR'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'POSITION',
                        options: positionOptions
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_setDecimal = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_SETDECIMAL', 'TM1650 decimal point at digit %1 %2'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'POSITION',
                        options: positionOptions
                    },
                    {
                        type: 'field_dropdown',
                        name: 'STATE',
                        options: stateOptions
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_setBrightness = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_SETBRIGHTNESS', 'set TM1650 brightness %1'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'BRIGHTNESS'
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_setDisplay = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_SETDISPLAY', 'TM1650 display %1'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'STATE',
                        options: stateOptions
                    }
                ],
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espTm1650_clear = {
        init: function () {
            this.jsonInit({
                message0: message('ESPTM1650_CLEAR', 'clear TM1650 display'),
                colour,
                secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
