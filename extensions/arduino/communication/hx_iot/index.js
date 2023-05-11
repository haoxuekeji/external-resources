const hx_iot = formatMessage => ({
    name: formatMessage({
        id: 'hx_iot.name',
        default: 'Iot net'
    }),
    extensionId: 'hx_iot',
    version: '1.0.0',
    supportDevice: ['arduinoEsp32'],
    author: 'haoxuekeji',
    iconURL: `asset/iot.png`,
    description: formatMessage({
        id: 'hx_iot.description',
        default: 'DHT Temperature and humidity sensor module.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    official: true,
    tags: ['communication'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = hx_iot;
