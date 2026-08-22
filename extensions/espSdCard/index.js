const espSdCard = formatMessage => ({
    name: formatMessage({
        id: 'espSdCard.name',
        default: 'SD Card'
    }),
    extensionId: 'espSdCard',
    version: '1.1.1',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/sdcard.png`,
    description: formatMessage({
        id: 'espSdCard.description',
        default: 'Log and read data on a SPI SD card.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    programMode: ['realtime', 'upload'],
    runtime: 'runtime.js',
    library: 'lib',
    official: true,
    tags: ['actuator'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espSdCard;
