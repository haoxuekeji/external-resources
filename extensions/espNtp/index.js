const espNtp = formatMessage => ({
    name: formatMessage({
        id: 'espNtp.name',
        default: 'Network Time'
    }),
    extensionId: 'espNtp',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/ntp.svg`,
    description: formatMessage({
        id: 'espNtp.description',
        default: 'Synchronize the clock from an NTP server and read date and time.'
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

module.exports = espNtp;
