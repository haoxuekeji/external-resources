const espRgbLedStrip = formatMessage => ({
    name: formatMessage({
        id: 'espRgbLedStrip.name',
        default: 'RGB LED Strip'
    }),
    extensionId: 'espRgbLedStrip',
    version: '1.0.1',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/rgbLedStrip.png`,
    description: formatMessage({
        id: 'espRgbLedStrip.description',
        default: 'Control WS2812 / NeoPixel RGB LED strips.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['display'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espRgbLedStrip;
