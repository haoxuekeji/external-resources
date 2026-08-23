const espDht = formatMessage => ({
    name: formatMessage({
        id: 'espDht.name',
        default: 'DHT'
    }),
    extensionId: 'espDht',
    version: '1.0.1',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    // The esp32 built-in sensor category already covers these blocks, hide
    // the library entry there; loading by id (old projects) is unaffected.
    hiddenForDevices: ['microPythonEsp32'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/dht.png`,
    description: formatMessage({
        id: 'espDht.description',
        default: 'Read temperature and humidity from DHT11 / DHT22 sensors.'
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

module.exports = espDht;
