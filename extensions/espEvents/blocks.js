/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FFBF00';
    const secondaryColour = '#CC9900';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };

    // Digital input pins for the button hat; falls back to a sane ESP32 set
    // (GPIO0 hosts the on-board BOOT button) when the live device pin list is
    // unavailable (e.g. headless generation).
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalInput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['0', '0'], ['4', '4'], ['5', '5'], ['13', '13'], ['14', '14']];

    // ESP32 capacitive touch channels mapped to their GPIO numbers.
    const touchPins = [
        ['T0 (IO4)', '4'], ['T2 (IO2)', '2'], ['T3 (IO15)', '15'],
        ['T4 (IO13)', '13'], ['T5 (IO12)', '12'], ['T6 (IO14)', '14'],
        ['T7 (IO27)', '27'], ['T8 (IO33)', '33'], ['T9 (IO32)', '32']
    ];

    Blockly.Blocks.espEvents_whenButton = {
        init: function () {
            this.jsonInit({
                message0: message('ESPEVENTS_WHENBUTTON', 'when button %1 pressed'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_hat']
            });
        }
    };

    Blockly.Blocks.espEvents_whenTouch = {
        init: function () {
            this.jsonInit({
                message0: message('ESPEVENTS_WHENTOUCH', 'when touch pin %1 touched'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'TOUCH',
                        options: touchPins
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_hat']
            });
        }
    };

    Blockly.Blocks.espEvents_everyNSeconds = {
        init: function () {
            this.jsonInit({
                message0: message('ESPEVENTS_EVERYNSECONDS', 'every %1 seconds'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'N'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_hat']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
