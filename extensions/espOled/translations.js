/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espOled.name": "OLED Display",
            "espOled.description": "128x64 I2C OLED display based on SSD1306 drivers."
        },
        "ru": {
            "espOled.name": "OLED дисплей",
            "espOled.description": "OLED-дисплей 128x64 I2C на базе SSD1306."
        },
        "zh-cn": {
            "espOled.name": "OLED 显示屏",
            "espOled.description": "基于 SSD1306 驱动的 128x64 I2C OLED 显示屏。"
        },
        "zh-tw": {
            "espOled.name": "OLED 顯示屏",
            "espOled.description": "基於 SSD1306 驅動的 128x64 I2C OLED 顯示屏。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPOLED_CATEGORY": "OLED Display",
            "ESPOLED_INIT": "init OLED display SDA %1 SCL %2",
            "ESPOLED_TEXT": "display text %1 at x %2 y %3",
            "ESPOLED_PIXEL": "draw pixel at x %1 y %2",
            "ESPOLED_LINE": "draw line from x1 %1 y1 %2 to x2 %3 y2 %4",
            "ESPOLED_CLEAR": "clear display",
            "ESPOLED_SHOW": "refresh display"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPOLED_CATEGORY": "OLED дисплей",
            "ESPOLED_INIT": "инициализировать OLED SDA %1 SCL %2",
            "ESPOLED_TEXT": "показать текст %1 в x %2 y %3",
            "ESPOLED_PIXEL": "нарисовать точку x %1 y %2",
            "ESPOLED_LINE": "нарисовать линию от x1 %1 y1 %2 до x2 %3 y2 %4",
            "ESPOLED_CLEAR": "очистить дисплей",
            "ESPOLED_SHOW": "обновить дисплей"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPOLED_CATEGORY": "OLED 显示屏",
            "ESPOLED_INIT": "初始化 OLED 显示屏 SDA %1 SCL %2",
            "ESPOLED_TEXT": "在坐标 x %2 y %3 显示文字 %1",
            "ESPOLED_PIXEL": "画点 x %1 y %2",
            "ESPOLED_LINE": "画线 从 x1 %1 y1 %2 到 x2 %3 y2 %4",
            "ESPOLED_CLEAR": "清空屏幕",
            "ESPOLED_SHOW": "刷新显示"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPOLED_CATEGORY": "OLED 顯示屏",
            "ESPOLED_INIT": "初始化 OLED 顯示屏 SDA %1 SCL %2",
            "ESPOLED_TEXT": "在坐標 x %2 y %3 顯示文字 %1",
            "ESPOLED_PIXEL": "畫點 x %1 y %2",
            "ESPOLED_LINE": "畫線 從 x1 %1 y1 %2 到 x2 %3 y2 %4",
            "ESPOLED_CLEAR": "清空屏幕",
            "ESPOLED_SHOW": "刷新顯示"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
