const motor = formatMessage => ({
    name: formatMessage({
        id: 'motor.name',
        default: 'motor dirve'
    }),
    extensionId: 'motor',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoMini', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp8266'],
    author: 'xiaoyingzi',
    iconURL: `asset/motor.png`,
    description: formatMessage({
        id: 'motor.description',
        default: 'Common motor drive.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['actuator'],
    helpLink: 'https://openblockcc.gitee.io/wiki/main'
});

module.exports = motor;
