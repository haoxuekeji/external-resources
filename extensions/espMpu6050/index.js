const espMpu6050 = formatMessage => ({
    name: formatMessage({
        id: 'espMpu6050.name',
        default: 'MPU6050'
    }),
    extensionId: 'espMpu6050',
    version: '1.1.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/mpu6050.svg`,
    description: formatMessage({
        id: 'espMpu6050.description',
        default: '6-axis accelerometer and gyroscope motion sensor.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['sensor'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espMpu6050;
