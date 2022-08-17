/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const colour = '#00DD77';
    const secondaryColour = '#00AA55';

    const sound = [
        ['0', '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['十', '10'],
        ['百', '11'],
        ['千', '12'],
    ];

    const digitalPins = Blockly.getMainWorkspace().getFlyout()
        .getFlyoutItems()
        .find(block => block.type === 'arduino_pin_setDigitalOutput')
        .getField('PIN')
        .getOptions();

    Blockly.Blocks.voice_play_init = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_INIT,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.voice_play_combinationPlay = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_COMBINATIONPLAY,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'NO',
                        options: sound
                    }

                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.voic_play_playTemperature  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_TEMPERATURE,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.sdCard_print = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.SDCARD_PRINT,
                args0: [
                    {
                        type: 'input_value',
                        name: 'DATA'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'EOL',
                        options: [
                            [Blockly.Msg.SDCARD_EOL_WARP, 'warp'],
                            [Blockly.Msg.SDCARD_EOL_NOWARP, 'no-warp']
                        ]
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.sdCard_fileDataAvailable = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.SDCARD_FILEDATAAVAILABLE,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.sdCard_readFileData = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.SDCARD_READFILEDATA,
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.sdCard_isFileExists = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.SDCARD_ISFILEEXISTS,
                args0: [
                    {
                        type: 'input_value',
                        name: 'NAME'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['output_boolean']
            });
        }
    };

    Blockly.Blocks.sdCard_createFile = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.SDCARD_CREATEFILE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'NAME'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.sdCard_deleteFile = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.SDCARD_DELETEFILE,
                args0: [
                    {
                        type: 'input_value',
                        name: 'NAME'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
