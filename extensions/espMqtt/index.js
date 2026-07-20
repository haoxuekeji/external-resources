const espMqtt = formatMessage => ({
    name: formatMessage({
        id: 'espMqtt.name',
        default: 'MQTT'
    }),
    extensionId: 'espMqtt',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/mqtt.svg`,
    description: formatMessage({
        id: 'espMqtt.description',
        default: 'Publish and subscribe messages through an MQTT broker over Wi-Fi.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['communication'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espMqtt;
