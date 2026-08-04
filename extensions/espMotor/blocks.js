/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#FF6F00';
    const secondaryColour = '#CC5800';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['4', '4'], ['16', '16'], ['17', '17'], ['21', '21'], ['22', '22']];

    const motorMenu = [
        ['A', 'A'],
        ['B', 'B']
    ];

    Blockly.Blocks.espMotor_init = {
        init: function () {
            this.jsonInit({
                message0: message('ESPMOTOR_INIT', 'init motor %1 IN1 %2 IN2 %3 PWM %4'),
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
                message0: message('ESPMOTOR_RUN', 'motor %1 turn %2 at speed %3 %'),
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
                            [message('ESPMOTOR_FORWARD', 'forward'), '1'],
                            [message('ESPMOTOR_BACKWARD', 'backward'), '-1']
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
                message0: message('ESPMOTOR_STOP', 'stop motor %1'),
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
                message0: message('ESPMOTOR_CARMOVE', 'car %1 at speed %2 %'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'ACTION',
                        options: [
                            [message('ESPMOTOR_CAR_FORWARD', 'move forward'), 'forward'],
                            [message('ESPMOTOR_CAR_BACKWARD', 'move backward'), 'backward'],
                            [message('ESPMOTOR_CAR_LEFT', 'turn left'), 'left'],
                            [message('ESPMOTOR_CAR_RIGHT', 'turn right'), 'right']
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
                message0: message('ESPMOTOR_CARSTOP', 'car stop'),
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
