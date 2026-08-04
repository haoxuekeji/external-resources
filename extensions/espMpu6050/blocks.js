/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF8C1A';
    const secondaryColour = '#DB6E00';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['21', '21'], ['22', '22'], ['4', '4'], ['5', '5']];

    Blockly.Blocks.espMpu6050_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMPU6050_INIT', 'init MPU6050 SDA %1 SCL %2'),
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

    Blockly.Blocks.espMpu6050_accel = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMPU6050_ACCEL', 'acceleration %1 (g)'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'AXIS',
                        options: [
                            ['X', '0'],
                            ['Y', '1'],
                            ['Z', '2']
                        ]
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espMpu6050_gyro = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMPU6050_GYRO', 'angular velocity %1 (°/s)'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'AXIS',
                        options: [
                            ['X', '0'],
                            ['Y', '1'],
                            ['Z', '2']
                        ]
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espMpu6050_temperature = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMPU6050_TEMPERATURE', 'MPU6050 temperature (°C)'),
                args0: [],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
