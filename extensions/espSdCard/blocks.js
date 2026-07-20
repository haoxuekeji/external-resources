/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#5CB1D6';
    const secondaryColour = '#2E8EB8';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    Blockly.Blocks.espSdCard_mount = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPSDCARD_MOUNT,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'SCK',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'MOSI',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'MISO',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'CS',
                        options: digitalPins
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espSdCard_appendLine = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPSDCARD_APPENDLINE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'FILE'
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espSdCard_readFile = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPSDCARD_READFILE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'FILE'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.espSdCard_deleteFile = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPSDCARD_DELETEFILE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'FILE'
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
