const espDs18b20 = formatMessage => ({
    name: formatMessage({
        id: 'espDs18b20.name',
        default: 'DS18B20'
    }),
    extensionId: 'espDs18b20',
    version: '1.1.2',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/ds18b20.png`,
    description: formatMessage({
        id: 'espDs18b20.description',
        default: 'Waterproof digital temperature sensor on the 1-Wire bus.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['sensor'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espDs18b20;
