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

    Blockly.Blocks.espDht_read = {
        init: function () {
            this.jsonInit({
                message0: message('ESPDHT_READ', 'read %1 pin %2 %3'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'TYPE',
                        options: [
                            ['DHT11', '11'],
                            ['DHT22', '22']
                        ]
                    },
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'DATA',
                        options: [
                            [message('ESPDHT_TEMPERATURE', 'temperature (°C)'), 'temperature'],
                            [message('ESPDHT_HUMIDITY', 'humidity (%)'), 'humidity']
                        ]
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
