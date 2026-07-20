const espServo = formatMessage => ({
    name: formatMessage({
        id: 'espServo.name',
        default: 'Servo'
    }),
    extensionId: 'espServo',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/servo.svg`,
    description: formatMessage({
        id: 'espServo.description',
        default: 'Control standard 180 degree servos through PWM.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['actuators'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espServo;
