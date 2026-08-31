/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espEvents.name": "Events",
            "espEvents.description": "Event hats: run stacks when a button is pressed, a touch pin is touched, or on a timer."
        },
        "ru": {
            "espEvents.name": "События",
            "espEvents.description": "Шляпы событий: запуск стеков по нажатию кнопки, касанию сенсорного вывода или по таймеру."
        },
        "zh-cn": {
            "espEvents.name": "事件",
            "espEvents.description": "事件帽子积木：当按钮被按下、触摸引脚被触摸或定时触发时运行对应脚本。"
        },
        "zh-tw": {
            "espEvents.name": "事件",
            "espEvents.description": "事件帽子積木：當按鈕被按下、觸摸引腳被觸摸或定時觸發時執行對應腳本。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPEVENTS_CATEGORY": "Events",
            "ESPEVENTS_WHENBUTTON": "when button %1 pressed",
            "ESPEVENTS_WHENTOUCH": "when touch pin %1 touched",
            "ESPEVENTS_EVERYNSECONDS": "every %1 seconds"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPEVENTS_CATEGORY": "События",
            "ESPEVENTS_WHENBUTTON": "когда кнопка %1 нажата",
            "ESPEVENTS_WHENTOUCH": "когда сенсорный вывод %1 тронут",
            "ESPEVENTS_EVERYNSECONDS": "каждые %1 секунд"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPEVENTS_CATEGORY": "事件",
            "ESPEVENTS_WHENBUTTON": "当按钮 %1 被按下",
            "ESPEVENTS_WHENTOUCH": "当触摸引脚 %1 被触摸",
            "ESPEVENTS_EVERYNSECONDS": "每隔 %1 秒"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPEVENTS_CATEGORY": "事件",
            "ESPEVENTS_WHENBUTTON": "當按鈕 %1 被按下",
            "ESPEVENTS_WHENTOUCH": "當觸摸引腳 %1 被觸摸",
            "ESPEVENTS_EVERYNSECONDS": "每隔 %1 秒"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
