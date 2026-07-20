/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#4C97FF';
    const secondaryColour = '#3373CC';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    Blockly.Blocks.espDs18b20_read = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPDS18B20_READ,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
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
