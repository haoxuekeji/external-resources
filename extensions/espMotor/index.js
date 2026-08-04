const espMotor = formatMessage => ({
    name: formatMessage({
        id: 'espMotor.name',
        default: 'DC Motor'
    }),
    extensionId: 'espMotor',
    version: '1.1.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/motor.svg`,
    description: formatMessage({
        id: 'espMotor.description',
        default: 'Drive DC motors and smart cars with L298N / TB6612.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['actuator'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espMotor;
