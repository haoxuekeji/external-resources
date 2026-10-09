const espBme280 = formatMessage => ({
    name: formatMessage({
        id: 'espBme280.name',
        default: 'BME280'
    }),
    extensionId: 'espBme280',
    version: '1.0.1',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/bme280.png`,
    description: formatMessage({
        id: 'espBme280.description',
        default: 'Temperature, humidity and air pressure sensor (BMP280 compatible).'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['sensor'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espBme280;
