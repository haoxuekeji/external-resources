/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF6F00';
    const secondaryColour = '#CC5800';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    const motorMenu = [
        ['A', 'A'],
        ['B', 'B']
    ];

    Blockly.Blocks.espMotor_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMOTOR_INIT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MOTOR',
                        options: motorMenu
                    },
                    {
                        type: 'field_dropdown',
                        name: 'IN1',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'IN2',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'EN',
                        options: digitalPins
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMotor_run = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMOTOR_RUN,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MOTOR',
                        options: motorMenu
                    },
                    {
                        type: 'field_dropdown',
                        name: 'DIR',
                        options: [
                            [Blockly.Msg.ESPMOTOR_FORWARD, '1'],
                            [Blockly.Msg.ESPMOTOR_BACKWARD, '-1']
                        ]
                    },
                    {
                        type: 'input_value',
                        name: 'SPEED'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMotor_stop = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMOTOR_STOP,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MOTOR',
                        options: motorMenu
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMotor_carMove = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMOTOR_CARMOVE,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'ACTION',
                        options: [
                            [Blockly.Msg.ESPMOTOR_CAR_FORWARD, 'forward'],
                            [Blockly.Msg.ESPMOTOR_CAR_BACKWARD, 'backward'],
                            [Blockly.Msg.ESPMOTOR_CAR_LEFT, 'left'],
                            [Blockly.Msg.ESPMOTOR_CAR_RIGHT, 'right']
                        ]
                    },
                    {
                        type: 'input_value',
                        name: 'SPEED'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espMotor_carStop = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPMOTOR_CARSTOP,
                args0: [],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = registerBlocks;
