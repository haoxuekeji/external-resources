const espHttp = formatMessage => ({
    name: formatMessage({
        id: 'espHttp.name',
        default: 'HTTP Request'
    }),
    extensionId: 'espHttp',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    author: 'OpenBlock',
    iconURL: `assets/http.svg`,
    description: formatMessage({
        id: 'espHttp.description',
        default: 'Send HTTP GET / POST requests over Wi-Fi and read the response.'
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

module.exports = espHttp;
