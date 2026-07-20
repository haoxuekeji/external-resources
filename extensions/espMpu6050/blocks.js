/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF8C1A';
    const secondaryColour = '#DB6E00';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    Blockly.Blocks.espMpu6050_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMPU6050_INIT,
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
                message0: Blockly.Msg.ESPMPU6050_ACCEL,
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
                message0: Blockly.Msg.ESPMPU6050_GYRO,
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
                message0: Blockly.Msg.ESPMPU6050_TEMPERATURE,
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
