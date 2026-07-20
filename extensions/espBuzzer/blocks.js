/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#CF63CF';
    const secondaryColour = '#BD42BD';

    const digitalPins = Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput');

    const noteOptions = [
        ['C4 (262)', '262'],
        ['D4 (294)', '294'],
        ['E4 (330)', '330'],
        ['F4 (349)', '349'],
        ['G4 (392)', '392'],
        ['A4 (440)', '440'],
        ['B4 (494)', '494'],
        ['C5 (523)', '523'],
        ['D5 (587)', '587'],
        ['E5 (659)', '659'],
        ['F5 (698)', '698'],
        ['G5 (784)', '784'],
        ['A5 (880)', '880'],
        ['B5 (988)', '988'],
        ['C6 (1047)', '1047']
    ];

    Blockly.Blocks.espBuzzer_playNote = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPBUZZER_PLAYNOTE,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'NOTE',
                        options: noteOptions
                    },
                    {
                        type: 'input_value',
                        name: 'DUR'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espBuzzer_playFreq = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPBUZZER_PLAYFREQ,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'FREQ'
                    },
                    {
                        type: 'input_value',
                        name: 'DUR'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espBuzzer_rest = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPBUZZER_REST,
                args0: [
                    {
                        type: 'input_value',
                        name: 'DUR'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espBuzzer_stop = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.ESPBUZZER_STOP,
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
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

exports = registerBlocks;
