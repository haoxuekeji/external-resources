const espEvents = formatMessage => ({
    name: formatMessage({
        id: 'espEvents.name',
        default: 'Events'
    }),
    extensionId: 'espEvents',
    version: '1.0.0',
    supportDevice: ['microPythonEsp32'],
    programMode: ['realtime', 'upload'],
    author: 'OpenBlock',
    iconURL: `assets/events.png`,
    description: formatMessage({
        id: 'espEvents.description',
        default: 'Event hats: run stacks when a button is pressed, a touch pin is touched, or on a timer.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    runtime: 'runtime.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    official: true,
    tags: ['event'],
    helpLink: 'https://wiki.openblock.cc'
});

module.exports = espEvents;
