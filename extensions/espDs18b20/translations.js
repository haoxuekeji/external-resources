/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espDs18b20.name": "DS18B20",
            "espDs18b20.description": "Waterproof digital temperature sensor on the 1-Wire bus."
        },
        "ru": {
            "espDs18b20.name": "DS18B20",
            "espDs18b20.description": "Водонепроницаемый цифровой датчик температуры на шине 1-Wire."
        },
        "zh-cn": {
            "espDs18b20.name": "DS18B20",
            "espDs18b20.description": "单总线防水数字温度传感器。"
        },
        "zh-tw": {
            "espDs18b20.name": "DS18B20",
            "espDs18b20.description": "單總線防水數字溫度傳感器。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPDS18B20_CATEGORY": "DS18B20",
            "ESPDS18B20_READ": "read DS18B20 pin %1 temperature (°C)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPDS18B20_CATEGORY": "DS18B20",
            "ESPDS18B20_READ": "считать DS18B20 пин %1 температуру (°C)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPDS18B20_CATEGORY": "DS18B20",
            "ESPDS18B20_READ": "读取 DS18B20 引脚 %1 温度(°C)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPDS18B20_CATEGORY": "DS18B20",
            "ESPDS18B20_READ": "讀取 DS18B20 引腳 %1 溫度(°C)"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
