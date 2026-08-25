/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const color = '#FF6F00';
    const secondaryColour = '#FF4F00';

    const digitalPins = Blockly.getMainWorkspace().getFlyout()
        .getFlyoutItems()
        .find(block => block.type === 'arduino_pin_setDigitalOutput')
        .getField('PIN')
        .getOptions();

    const pwmPins = Blockly.getMainWorkspace().getFlyout()
        .getFlyoutItems()
        .find(block => block.type === 'arduino_pin_setPwmOutput')
        .getField('PIN')
        .getOptions();


    Blockly.Blocks.motor_run = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.MOTOR_RUN,
                args0: [
                    {
                        type: 'input_value',
                        name: 'SPEED_VALUE'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'SPEED',
                        options: pwmPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'DIR',
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

exports = addBlocks;
