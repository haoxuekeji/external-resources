/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espRgbLedStrip.name": "RGB LED Strip",
            "espRgbLedStrip.description": "Control WS2812 / NeoPixel RGB LED strips."
        },
        "ru": {
            "espRgbLedStrip.name": "RGB лента",
            "espRgbLedStrip.description": "Управление RGB лентами WS2812 / NeoPixel."
        },
        "zh-cn": {
            "espRgbLedStrip.name": "RGB灯带",
            "espRgbLedStrip.description": "控制 WS2812 / NeoPixel RGB 灯带。"
        },
        "zh-tw": {
            "espRgbLedStrip.name": "RGB燈帶",
            "espRgbLedStrip.description": "控制 WS2812 / NeoPixel RGB 燈帶。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPRGBLEDSTRIP_CATEGORY": "RGB LED Strip",
            "ESPRGBLEDSTRIP_INIT": "init RGB strip pin %1 with %2 leds",
            "ESPRGBLEDSTRIP_SETPIXELCOLOR": "RGB strip pin %1 set led %2 color %3",
            "ESPRGBLEDSTRIP_FILL": "RGB strip pin %1 set all leds color %2",
            "ESPRGBLEDSTRIP_SETBRIGHTNESS": "RGB strip pin %1 set brightness to %2 (0-100)",
            "ESPRGBLEDSTRIP_CLEAR": "RGB strip pin %1 turn off all leds"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPRGBLEDSTRIP_CATEGORY": "RGB лента",
            "ESPRGBLEDSTRIP_INIT": "инициализировать RGB ленту пин %1 из %2 светодиодов",
            "ESPRGBLEDSTRIP_SETPIXELCOLOR": "RGB лента пин %1 установить светодиод %2 цвет %3",
            "ESPRGBLEDSTRIP_FILL": "RGB лента пин %1 установить все светодиоды цвет %2",
            "ESPRGBLEDSTRIP_SETBRIGHTNESS": "RGB лента пин %1 установить яркость %2 (0-100)",
            "ESPRGBLEDSTRIP_CLEAR": "RGB лента пин %1 выключить все светодиоды"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPRGBLEDSTRIP_CATEGORY": "RGB灯带",
            "ESPRGBLEDSTRIP_INIT": "初始化 RGB 灯带 引脚 %1 灯数 %2",
            "ESPRGBLEDSTRIP_SETPIXELCOLOR": "RGB 灯带 引脚 %1 设置第 %2 个灯的颜色为 %3",
            "ESPRGBLEDSTRIP_FILL": "RGB 灯带 引脚 %1 设置所有灯的颜色为 %2",
            "ESPRGBLEDSTRIP_SETBRIGHTNESS": "RGB 灯带 引脚 %1 设置亮度为 %2 (0-100)",
            "ESPRGBLEDSTRIP_CLEAR": "RGB 灯带 引脚 %1 熄灭所有灯"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPRGBLEDSTRIP_CATEGORY": "RGB燈帶",
            "ESPRGBLEDSTRIP_INIT": "初始化 RGB 燈帶 引腳 %1 燈數 %2",
            "ESPRGBLEDSTRIP_SETPIXELCOLOR": "RGB 燈帶 引腳 %1 設置第 %2 個燈的顏色為 %3",
            "ESPRGBLEDSTRIP_FILL": "RGB 燈帶 引腳 %1 設置所有燈的顏色為 %2",
            "ESPRGBLEDSTRIP_SETBRIGHTNESS": "RGB 燈帶 引腳 %1 設置亮度為 %2 (0-100)",
            "ESPRGBLEDSTRIP_CLEAR": "RGB 燈帶 引腳 %1 熄滅所有燈"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
