const fourDigitDisplay = formatMessage => ({
    name: formatMessage({
        id: 'TM1650fourDigitDisplay.name',
        default: '4-Digit Display'
    }),
    extensionId: 'TM1650fourDigitDisplay',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoMini', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266', 'arduinoEsp32'],
    author: 'xiaoyingzi',
    iconURL: `asset/TM1650fourDigitDisplay.png`,
    description: formatMessage({
        id: 'TM1650fourDigitDisplay.description',
        default: '4-digit display module based on TM1650.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['display'],
    helpLink: 'https://haoxuekeji.github.io/wiki'
});

module.exports = fourDigitDisplay;
