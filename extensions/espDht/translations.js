/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espDht.name": "DHT",
            "espDht.description": "Read temperature and humidity from DHT11 / DHT22 sensors."
        },
        "ru": {
            "espDht.name": "DHT",
            "espDht.description": "Считывание температуры и влажности с датчиков DHT11 / DHT22."
        },
        "zh-cn": {
            "espDht.name": "DHT温湿度",
            "espDht.description": "读取 DHT11 / DHT22 传感器的温度和湿度。"
        },
        "zh-tw": {
            "espDht.name": "DHT溫濕度",
            "espDht.description": "讀取 DHT11 / DHT22 感測器的溫度和濕度。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPDHT_CATEGORY": "DHT",
            "ESPDHT_READ": "read %1 pin %2 %3",
            "ESPDHT_TEMPERATURE": "temperature (°C)",
            "ESPDHT_HUMIDITY": "humidity (%)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPDHT_CATEGORY": "DHT",
            "ESPDHT_READ": "считать %1 пин %2 %3",
            "ESPDHT_TEMPERATURE": "температура (°C)",
            "ESPDHT_HUMIDITY": "влажность (%)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPDHT_CATEGORY": "DHT温湿度",
            "ESPDHT_READ": "读取 %1 引脚 %2 的 %3",
            "ESPDHT_TEMPERATURE": "温度(°C)",
            "ESPDHT_HUMIDITY": "湿度(%)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPDHT_CATEGORY": "DHT溫濕度",
            "ESPDHT_READ": "讀取 %1 引腳 %2 的 %3",
            "ESPDHT_TEMPERATURE": "溫度(°C)",
            "ESPDHT_HUMIDITY": "濕度(%)"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
