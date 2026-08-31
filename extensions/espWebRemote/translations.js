/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espWebRemote.name": "Web Remote",
            "espWebRemote.description": "Turn a phone into a remote control: the board serves a web dashboard with buttons, sliders and labels."
        },
        "ru": {
            "espWebRemote.name": "Веб-пульт",
            "espWebRemote.description": "Превратите телефон в пульт: плата раздаёт веб-панель с кнопками, ползунками и надписями."
        },
        "zh-cn": {
            "espWebRemote.name": "网页遥控器",
            "espWebRemote.description": "把手机变成遥控器：开发板直接提供带按钮、滑杆和标签的网页仪表盘。"
        },
        "zh-tw": {
            "espWebRemote.name": "網頁遙控器",
            "espWebRemote.description": "把手機變成遙控器：開發板直接提供帶按鈕、滑桿和標籤的網頁儀表板。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPWEBREMOTE_CATEGORY": "Web Remote",
            "ESPWEBREMOTE_STARTAP": "start Web remote hotspot %1 password %2",
            "ESPWEBREMOTE_STARTSTA": "start Web remote on connected Wi-Fi",
            "ESPWEBREMOTE_ADDRESS": "web remote address",
            "ESPWEBREMOTE_WHENBUTTON": "when web button %1 tapped",
            "ESPWEBREMOTE_SLIDER": "web slider %1 value",
            "ESPWEBREMOTE_SETLABEL": "show %1 on web label %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPWEBREMOTE_CATEGORY": "Веб-пульт",
            "ESPWEBREMOTE_STARTAP": "запустить веб-пульт: точка доступа %1 пароль %2",
            "ESPWEBREMOTE_STARTSTA": "запустить веб-пульт в текущей сети Wi-Fi",
            "ESPWEBREMOTE_ADDRESS": "адрес веб-пульта",
            "ESPWEBREMOTE_WHENBUTTON": "когда веб-кнопка %1 нажата",
            "ESPWEBREMOTE_SLIDER": "значение веб-ползунка %1",
            "ESPWEBREMOTE_SETLABEL": "показать %1 на веб-надписи %2"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPWEBREMOTE_CATEGORY": "网页遥控器",
            "ESPWEBREMOTE_STARTAP": "开启网页遥控器热点 %1 密码 %2",
            "ESPWEBREMOTE_STARTSTA": "在已连接的 Wi-Fi 上开启网页遥控器",
            "ESPWEBREMOTE_ADDRESS": "网页遥控器地址",
            "ESPWEBREMOTE_WHENBUTTON": "当网页按钮 %1 被点按",
            "ESPWEBREMOTE_SLIDER": "网页滑杆 %1 的值",
            "ESPWEBREMOTE_SETLABEL": "在网页标签 %2 显示 %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPWEBREMOTE_CATEGORY": "網頁遙控器",
            "ESPWEBREMOTE_STARTAP": "開啟網頁遙控器熱點 %1 密碼 %2",
            "ESPWEBREMOTE_STARTSTA": "在已連接的 Wi-Fi 上開啟網頁遙控器",
            "ESPWEBREMOTE_ADDRESS": "網頁遙控器地址",
            "ESPWEBREMOTE_WHENBUTTON": "當網頁按鈕 %1 被點按",
            "ESPWEBREMOTE_SLIDER": "網頁滑桿 %1 的值",
            "ESPWEBREMOTE_SETLABEL": "在網頁標籤 %2 顯示 %1"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
