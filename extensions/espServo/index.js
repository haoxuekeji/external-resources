const espServo = formatMessage => ({
    name: formatMessage({
        id: 'espServo.name',
        default: 'Servo'
    }),
    extensionId: 'espServo',
    version: '1.1.1',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    // The esp32 built-in pin category already covers these blocks, hide the
    // library entry there; loading by id (old projects) is unaffected.
    hiddenForDevices: ['microPythonEsp32'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/servo.png`,
    description: formatMessage({
        id: 'espServo.description',
        default: 'Control standard 180 degree servos through PWM.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['actuators'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espServo;
