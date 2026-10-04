const espBuzzer = formatMessage => ({
    name: formatMessage({
        id: 'espBuzzer.name',
        default: 'Buzzer Music'
    }),
    extensionId: 'espBuzzer',
    version: '1.1.2',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/buzzer.png`,
    description: formatMessage({
        id: 'espBuzzer.description',
        default: 'Play musical notes on a passive buzzer.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['actuator'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espBuzzer;
