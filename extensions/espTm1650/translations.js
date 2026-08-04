/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espTm1650.name": "TM1650 4-digit display",
            "espTm1650.description": "Drive a TM1650 four-digit seven-segment display over a two-wire interface."
        },
        "ru": {
            "espTm1650.name": "4-разрядный индикатор TM1650",
            "espTm1650.description": "Управление четырёхразрядным семисегментным индикатором TM1650 по двухпроводному интерфейсу."
        },
        "zh-cn": {
            "espTm1650.name": "TM1650 四位数码管",
            "espTm1650.description": "通过两线接口控制 TM1650 四位七段数码管。"
        },
        "zh-tw": {
            "espTm1650.name": "TM1650 四位數碼管",
            "espTm1650.description": "透過雙線介面控制 TM1650 四位七段數碼管。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        "ESPTM1650_CATEGORY": "TM1650 display",
        "ESPTM1650_INIT": "init TM1650 SDA %1 SCL %2 brightness %3",
        "ESPTM1650_SHOWNUMBER": "TM1650 show number %1 decimal places %2",
        "ESPTM1650_SHOWTEXT": "TM1650 show text %1",
        "ESPTM1650_SHOWAT": "TM1650 show %1 at digit %2",
        "ESPTM1650_SETDECIMAL": "TM1650 decimal point at digit %1 %2",
        "ESPTM1650_SETBRIGHTNESS": "set TM1650 brightness %1",
        "ESPTM1650_SETDISPLAY": "TM1650 display %1",
        "ESPTM1650_CLEAR": "clear TM1650 display",
        "ESPTM1650_ON": "on",
        "ESPTM1650_OFF": "off"
    });

    Object.assign(Blockly.ScratchMsgs.locales["ru"], {
        "ESPTM1650_CATEGORY": "Индикатор TM1650",
        "ESPTM1650_INIT": "инициализировать TM1650 SDA %1 SCL %2 яркость %3",
        "ESPTM1650_SHOWNUMBER": "TM1650 показать число %1 знаков после запятой %2",
        "ESPTM1650_SHOWTEXT": "TM1650 показать текст %1",
        "ESPTM1650_SHOWAT": "TM1650 показать %1 в разряде %2",
        "ESPTM1650_SETDECIMAL": "TM1650 точка в разряде %1 %2",
        "ESPTM1650_SETBRIGHTNESS": "установить яркость TM1650 %1",
        "ESPTM1650_SETDISPLAY": "дисплей TM1650 %1",
        "ESPTM1650_CLEAR": "очистить дисплей TM1650",
        "ESPTM1650_ON": "вкл",
        "ESPTM1650_OFF": "выкл"
    });

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"], {
        "ESPTM1650_CATEGORY": "TM1650 四位数码管",
        "ESPTM1650_INIT": "初始化 TM1650 SDA %1 SCL %2 亮度 %3",
        "ESPTM1650_SHOWNUMBER": "TM1650 显示数字 %1 保留 %2 位小数",
        "ESPTM1650_SHOWTEXT": "TM1650 显示文本 %1",
        "ESPTM1650_SHOWAT": "TM1650 在第 %2 位显示 %1",
        "ESPTM1650_SETDECIMAL": "TM1650 第 %1 位小数点 %2",
        "ESPTM1650_SETBRIGHTNESS": "设置 TM1650 亮度 %1",
        "ESPTM1650_SETDISPLAY": "TM1650 显示 %1",
        "ESPTM1650_CLEAR": "清空 TM1650 数码管",
        "ESPTM1650_ON": "开",
        "ESPTM1650_OFF": "关"
    });

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"], {
        "ESPTM1650_CATEGORY": "TM1650 四位數碼管",
        "ESPTM1650_INIT": "初始化 TM1650 SDA %1 SCL %2 亮度 %3",
        "ESPTM1650_SHOWNUMBER": "TM1650 顯示數字 %1 保留 %2 位小數",
        "ESPTM1650_SHOWTEXT": "TM1650 顯示文字 %1",
        "ESPTM1650_SHOWAT": "TM1650 在第 %2 位顯示 %1",
        "ESPTM1650_SETDECIMAL": "TM1650 第 %1 位小數點 %2",
        "ESPTM1650_SETBRIGHTNESS": "設定 TM1650 亮度 %1",
        "ESPTM1650_SETDISPLAY": "TM1650 顯示 %1",
        "ESPTM1650_CLEAR": "清空 TM1650 數碼管",
        "ESPTM1650_ON": "開",
        "ESPTM1650_OFF": "關"
    });

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
