/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#4C97FF';
    const secondaryColour = '#3373CC';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['4', '4'], ['5', '5'], ['21', '21'], ['22', '22']];

    Blockly.Blocks.espDs18b20_read = {
        init: function () {
            this.jsonInit({
                message0: message('ESPDS18B20_READ', 'read DS18B20 pin %1 temperature (°C)'),
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
