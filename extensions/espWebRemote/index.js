const espWebRemote = formatMessage => ({
    name: formatMessage({
        id: 'espWebRemote.name',
        default: 'Web Remote'
    }),
    extensionId: 'espWebRemote',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32', 'microPythonEsp8266'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/webremote.png`,
    description: formatMessage({
        id: 'espWebRemote.description',
        default: 'Turn a phone into a remote control: the board serves a web dashboard with buttons, sliders and labels.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['communication'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espWebRemote;
