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

    const buttonIds = [['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E'], ['F', 'F']];
    const sliderIds = [['S1', 'S1'], ['S2', 'S2'], ['S3', 'S3']];
    const labelIds = [['L1', 'L1'], ['L2', 'L2'], ['L3', 'L3']];

    Blockly.Blocks.espWebRemote_startAp = {
        init: function () {
            this.jsonInit({
                message0: message('ESPWEBREMOTE_STARTAP', 'start Web remote hotspot %1 password %2'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'SSID'
                    },
                    {
                        type: 'input_value',
                        name: 'PWD'
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espWebRemote_startSta = {
        init: function () {
            this.jsonInit({
                message0: message('ESPWEBREMOTE_STARTSTA', 'start Web remote on connected Wi-Fi'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.espWebRemote_address = {
        init: function () {
            this.jsonInit({
                message0: message('ESPWEBREMOTE_ADDRESS', 'web remote address'),
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_string']
            });
        }
    };

    Blockly.Blocks.espWebRemote_whenButton = {
        init: function () {
            this.jsonInit({
                message0: message('ESPWEBREMOTE_WHENBUTTON', 'when web button %1 tapped'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'BTN',
                        options: buttonIds
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['shape_hat']
            });
        }
    };

    Blockly.Blocks.espWebRemote_slider = {
        init: function () {
            this.jsonInit({
                message0: message('ESPWEBREMOTE_SLIDER', 'web slider %1 value'),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'SLIDER',
                        options: sliderIds
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
        }
    };

    Blockly.Blocks.espWebRemote_setLabel = {
        init: function () {
            this.jsonInit({
                message0: message('ESPWEBREMOTE_SETLABEL', 'show %1 on web label %2'),
                args0: [
                    {
                        type: 'input_value',
                        name: 'TEXT'
                    },
                    {
                        type: 'field_dropdown',
                        name: 'LABEL',
                        options: labelIds
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
