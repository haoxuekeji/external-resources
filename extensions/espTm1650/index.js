const espTm1650 = formatMessage => ({
    name: formatMessage({
        id: 'espTm1650.name',
        default: 'TM1650 4-digit display'
    }),
    extensionId: 'espTm1650',
    version: '1.0.2',
    supportDevice: ['microPythonEsp32'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: 'assets/tm1650.svg',
    description: formatMessage({
        id: 'espTm1650.description',
        default: 'Drive a TM1650 four-digit seven-segment display over a two-wire interface.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['display'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espTm1650;
