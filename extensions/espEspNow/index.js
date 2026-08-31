const espEspNow = formatMessage => ({
    name: formatMessage({
        id: 'espEspNow.name',
        default: 'ESP-NOW'
    }),
    extensionId: 'espEspNow',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/espnow.png`,
    description: formatMessage({
        id: 'espEspNow.description',
        default: 'Board-to-board wireless messaging without a router.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['communication'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espEspNow;
