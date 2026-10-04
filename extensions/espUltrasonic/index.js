const ultrasonic = formatMessage => ({
    name: formatMessage({
        id: 'ultrasonic.name',
        default: 'Ultrasonic'
    }),
    extensionId: 'espUltrasonic',
    version: '1.2.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    // The esp32 built-in sensor category already covers these blocks, hide
    // the library entry there; loading by id (old projects) is unaffected.
    hiddenForDevices: ['microPythonEsp32'],
    programMode: ['realtime', 'upload'],
    author: 'ArthurZheng',
    iconURL: `assets/ultrasonic.png`,
    description: formatMessage({
        id: 'ultrasonic.description',
        default: 'Standard ultrasonic distance measurement module.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['sensor'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = ultrasonic;
