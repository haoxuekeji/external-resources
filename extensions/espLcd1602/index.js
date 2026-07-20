const espLcd1602 = formatMessage => ({
    name: formatMessage({
        id: 'espLcd1602.name',
        default: 'LCD1602'
    }),
    extensionId: 'espLcd1602',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/lcd1602.svg`,
    description: formatMessage({
        id: 'espLcd1602.description',
        default: 'Show text on a 16x2 character LCD with I2C backpack.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['display'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espLcd1602;
