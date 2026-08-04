/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerBlocks (Blockly) {
    const color = '#D39DDB';
    const secondaryColour = '#BA55D3';

    const message = (key, fallback) => {
        const value = Blockly.Msg && Blockly.Msg[key];
        return typeof value === 'string' && value ? value : fallback;
    };
    const requestedPins = Blockly.Device && typeof Blockly.Device.getPinOptions === 'function' ?
        Blockly.Device.getPinOptions('microPython_pin_esp32SetDigitalOutput') : null;
    const digitalPins = Array.isArray(requestedPins) && requestedPins.length > 0 ?
        requestedPins : [['5', '5'], ['18', '18'], ['21', '21'], ['22', '22']];

    Blockly.Blocks.ultrasonic_readDistance = {
        init: function () {
            this.jsonInit({
                message0: message(
                    'ULTRASONIC_READ_DISTANCE',
                    'ultrasonic sensor pin TRIG %1 ECHO %2 read distance %3'
                ),
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'TRIG',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'ECHO',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'UNIT',
                        options: [
                            ['cm', 'CM'],
                            ['mm', 'MM']]
                    }
                ],
                colour: color,
                secondaryColour: secondaryColour,
                extensions: ['output_number']
            });
            const trigField = this.getField('TRIG');
            const echoField = this.getField('ECHO');
            const unitField = this.getField('UNIT');
            if (trigField) trigField.setValue(digitalPins[0][1]);
            if (echoField) echoField.setValue((digitalPins[1] || digitalPins[0])[1]);
            if (unitField) unitField.setValue('CM');
        }
    };


    return Blockly;
}

exports = registerBlocks;
