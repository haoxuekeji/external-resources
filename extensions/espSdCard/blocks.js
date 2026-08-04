/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#5CB1D6';
    const secondaryColour = '#2E8EB8';
    const message = (key, fallback) => {
        const value = Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };

    const requestedPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['18', '18'], ['23', '23'], ['19', '19'], ['5', '5'], ['21', '21'], ['22', '22']];

    Blockly.Blocks.espSdCard_mount = {
        init: function () {
            this.jsonInit({
                message0: message('ESPSDCARD_MOUNT', 'mount SD card SCK %1 MOSI %2 MISO %3 CS %4'),
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
                message0: message('ESPSDCARD_APPENDLINE', 'append %2 to file %1'),
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
                message0: message('ESPSDCARD_READFILE', 'read file %1'),
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
                message0: message('ESPSDCARD_DELETEFILE', 'delete file %1'),
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
