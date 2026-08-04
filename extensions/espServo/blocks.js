/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#40BF4A';
    const secondaryColour = '#389438';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['4', '4'], ['21', '21'], ['22', '22']];

    Blockly.Blocks.espServo_setAngle = {
        init: function () {
            this.jsonInit({
                message0: message('ESPSERVO_SETANGLE', 'set servo pin %1 angle to %2'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'ANGLE'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espServo_release = {
        init: function () {
            this.jsonInit({
                message0: message('ESPSERVO_RELEASE', 'release servo pin %1'),
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
