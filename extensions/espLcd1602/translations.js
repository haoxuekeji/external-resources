/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espLcd1602.name": "LCD1602",
            "espLcd1602.description": "Show text on a 16x2 character LCD with I2C backpack."
        },
        "ru": {
            "espLcd1602.name": "LCD1602",
            "espLcd1602.description": "Вывод текста на символьный дисплей 16x2 с I2C-модулем."
        },
        "zh-cn": {
            "espLcd1602.name": "LCD1602 液晶屏",
            "espLcd1602.description": "在 16x2 字符液晶屏（I2C 转接板）上显示文本。"
        },
        "zh-tw": {
            "espLcd1602.name": "LCD1602 液晶屏",
            "espLcd1602.description": "在 16x2 字符液晶屏（I2C 轉接板）上顯示文本。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPLCD1602_CATEGORY": "LCD1602",
            "ESPLCD1602_INIT": "init LCD1602 SDA %1 SCL %2 address %3",
            "ESPLCD1602_SHOWTEXT": "LCD show at row %1 column %2 text %3",
            "ESPLCD1602_CLEAR": "LCD clear screen",
            "ESPLCD1602_BACKLIGHT": "LCD backlight %1",
            "ESPLCD1602_ON": "on",
            "ESPLCD1602_OFF": "off"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPLCD1602_CATEGORY": "LCD1602",
            "ESPLCD1602_INIT": "инициализировать LCD1602 SDA %1 SCL %2 адрес %3",
            "ESPLCD1602_SHOWTEXT": "LCD показать в строке %1 столбце %2 текст %3",
            "ESPLCD1602_CLEAR": "LCD очистить экран",
            "ESPLCD1602_BACKLIGHT": "LCD подсветка %1",
            "ESPLCD1602_ON": "вкл",
            "ESPLCD1602_OFF": "выкл"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPLCD1602_CATEGORY": "LCD1602 液晶屏",
            "ESPLCD1602_INIT": "初始化 LCD1602 SDA %1 SCL %2 地址 %3",
            "ESPLCD1602_SHOWTEXT": "LCD 在第 %1 行第 %2 列显示 %3",
            "ESPLCD1602_CLEAR": "LCD 清屏",
            "ESPLCD1602_BACKLIGHT": "LCD 背光 %1",
            "ESPLCD1602_ON": "开",
            "ESPLCD1602_OFF": "关"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPLCD1602_CATEGORY": "LCD1602 液晶屏",
            "ESPLCD1602_INIT": "初始化 LCD1602 SDA %1 SCL %2 地址 %3",
            "ESPLCD1602_SHOWTEXT": "LCD 在第 %1 行第 %2 列顯示 %3",
            "ESPLCD1602_CLEAR": "LCD 清屏",
            "ESPLCD1602_BACKLIGHT": "LCD 背光 %1",
            "ESPLCD1602_ON": "開",
            "ESPLCD1602_OFF": "關"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
