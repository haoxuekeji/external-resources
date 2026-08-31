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
        requestedPins : [['21', '21'], ['22', '22'], ['4', '4'], ['5', '5']];

    Blockly.Blocks.espBme280_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPBME280_INIT', 'init BME280 SDA %1 SCL %2'),
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

    Blockly.Blocks.espBme280_temperature = {
        init: function () {
            this.jsonInit({
                message0: message('ESPBME280_TEMPERATURE', 'BME280 temperature (°C)'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espBme280_humidity = {
        init: function () {
            this.jsonInit({
                message0: message('ESPBME280_HUMIDITY', 'BME280 humidity (%)'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espBme280_pressure = {
        init: function () {
            this.jsonInit({
                message0: message('ESPBME280_PRESSURE', 'BME280 air pressure (hPa)'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espBme280_altitude = {
        init: function () {
            this.jsonInit({
                message0: message('ESPBME280_ALTITUDE', 'BME280 estimated altitude (m)'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
