const espOled = formatMessage => ({
    name: formatMessage({
        id: 'espOled.name',
        default: 'OLED Display'
    }),
    extensionId: 'espOled',
    version: '1.1.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/oled.svg`,
    description: formatMessage({
        id: 'espOled.description',
        default: '128x64 I2C OLED display based on SSD1306 drivers.'
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

module.exports = espOled;
