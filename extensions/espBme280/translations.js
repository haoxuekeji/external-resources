/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espBme280.name": "BME280",
            "espBme280.description": "Temperature, humidity and air pressure sensor (BMP280 compatible)."
        },
        "ru": {
            "espBme280.name": "BME280",
            "espBme280.description": "Датчик температуры, влажности и атмосферного давления (совместим с BMP280)."
        },
        "zh-cn": {
            "espBme280.name": "BME280 环境传感器",
            "espBme280.description": "温度、湿度和气压传感器（兼容 BMP280）。"
        },
        "zh-tw": {
            "espBme280.name": "BME280 環境傳感器",
            "espBme280.description": "溫度、濕度和氣壓傳感器（兼容 BMP280）。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPBME280_CATEGORY": "BME280",
            "ESPBME280_INIT": "init BME280 SDA %1 SCL %2",
            "ESPBME280_TEMPERATURE": "BME280 temperature (°C)",
            "ESPBME280_HUMIDITY": "BME280 humidity (%)",
            "ESPBME280_PRESSURE": "BME280 air pressure (hPa)",
            "ESPBME280_ALTITUDE": "BME280 estimated altitude (m)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPBME280_CATEGORY": "BME280",
            "ESPBME280_INIT": "инициализировать BME280 SDA %1 SCL %2",
            "ESPBME280_TEMPERATURE": "температура BME280 (°C)",
            "ESPBME280_HUMIDITY": "влажность BME280 (%)",
            "ESPBME280_PRESSURE": "давление BME280 (гПа)",
            "ESPBME280_ALTITUDE": "высота BME280 (м)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPBME280_CATEGORY": "BME280 环境传感器",
            "ESPBME280_INIT": "初始化 BME280 SDA %1 SCL %2",
            "ESPBME280_TEMPERATURE": "BME280 温度(°C)",
            "ESPBME280_HUMIDITY": "BME280 湿度(%)",
            "ESPBME280_PRESSURE": "BME280 气压(hPa)",
            "ESPBME280_ALTITUDE": "BME280 估算海拔(米)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPBME280_CATEGORY": "BME280 環境傳感器",
            "ESPBME280_INIT": "初始化 BME280 SDA %1 SCL %2",
            "ESPBME280_TEMPERATURE": "BME280 溫度(°C)",
            "ESPBME280_HUMIDITY": "BME280 濕度(%)",
            "ESPBME280_PRESSURE": "BME280 氣壓(hPa)",
            "ESPBME280_ALTITUDE": "BME280 估算海拔(米)"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
