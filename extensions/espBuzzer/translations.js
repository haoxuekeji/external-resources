/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espBuzzer.name": "Buzzer Music",
            "espBuzzer.description": "Play musical notes on a passive buzzer."
        },
        "ru": {
            "espBuzzer.name": "Музыка на зуммере",
            "espBuzzer.description": "Воспроизведение нот на пассивном зуммере."
        },
        "zh-cn": {
            "espBuzzer.name": "蜂鸣器音乐",
            "espBuzzer.description": "使用无源蜂鸣器演奏音符。"
        },
        "zh-tw": {
            "espBuzzer.name": "蜂鳴器音樂",
            "espBuzzer.description": "使用無源蜂鳴器演奏音符。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPBUZZER_CATEGORY": "Buzzer Music",
            "ESPBUZZER_PLAYNOTE": "buzzer pin %1 play note %2 for %3 seconds",
            "ESPBUZZER_PLAYFREQ": "buzzer pin %1 play frequency %2 Hz for %3 seconds",
            "ESPBUZZER_REST": "rest for %1 seconds",
            "ESPBUZZER_STOP": "stop buzzer pin %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPBUZZER_CATEGORY": "Музыка на зуммере",
            "ESPBUZZER_PLAYNOTE": "зуммер пин %1 играть ноту %2 %3 секунд",
            "ESPBUZZER_PLAYFREQ": "зуммер пин %1 играть частоту %2 Гц %3 секунд",
            "ESPBUZZER_REST": "пауза %1 секунд",
            "ESPBUZZER_STOP": "остановить зуммер пин %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPBUZZER_CATEGORY": "蜂鸣器音乐",
            "ESPBUZZER_PLAYNOTE": "蜂鸣器引脚 %1 播放音符 %2 持续 %3 秒",
            "ESPBUZZER_PLAYFREQ": "蜂鸣器引脚 %1 播放频率 %2 赫兹 持续 %3 秒",
            "ESPBUZZER_REST": "休止 %1 秒",
            "ESPBUZZER_STOP": "停止蜂鸣器引脚 %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPBUZZER_CATEGORY": "蜂鳴器音樂",
            "ESPBUZZER_PLAYNOTE": "蜂鳴器引腳 %1 播放音符 %2 持續 %3 秒",
            "ESPBUZZER_PLAYFREQ": "蜂鳴器引腳 %1 播放頻率 %2 赫茲 持續 %3 秒",
            "ESPBUZZER_REST": "休止 %1 秒",
            "ESPBUZZER_STOP": "停止蜂鳴器引腳 %1"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
