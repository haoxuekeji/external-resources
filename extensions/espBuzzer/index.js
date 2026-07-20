const espBuzzer = formatMessage => ({
    name: formatMessage({
        id: 'espBuzzer.name',
        default: 'Buzzer Music'
    }),
    extensionId: 'espBuzzer',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/buzzer.svg`,
    description: formatMessage({
        id: 'espBuzzer.description',
        default: 'Play musical notes on a passive buzzer.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['actuator'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espBuzzer;
