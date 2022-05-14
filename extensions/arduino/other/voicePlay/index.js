const sdCard = formatMessage => ({
    name: formatMessage({
        id: 'voicPlay.name',
        default: 'voic play Module'
    }),
    extensionId: 'voicPlay',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoMini', 'arduinoLeonardo',
        'arduinoMega2560', 'arduinoEsp32', 'arduinoEsp8266'],
    author: 'xiaoyingzi',
    iconURL: `asset/voic_play.png`,
    description: formatMessage({
        id: 'voicPlay.description',
        default: 'play same voic.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    msg: 'msg.js',
    library: 'lib',
    tags: ['other'],
    helpLink: 'https://haoxuekeji.com'
});

module.exports = sdCard;
