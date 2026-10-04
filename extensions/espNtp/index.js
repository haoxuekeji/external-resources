const espNtp = formatMessage => ({
    name: formatMessage({
        id: 'espNtp.name',
        default: 'Network Time'
    }),
    extensionId: 'espNtp',
    version: '1.1.2',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/ntp.png`,
    description: formatMessage({
        id: 'espNtp.description',
        default: 'Synchronize the clock from an NTP server and read date and time.'
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
    tags: ['communication'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espNtp;
