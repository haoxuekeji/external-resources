/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espNtp.name": "Network Time",
            "espNtp.description": "Synchronize the clock from an NTP server and read date and time."
        },
        "ru": {
            "espNtp.name": "Сетевое время",
            "espNtp.description": "Синхронизация часов с NTP-сервера и чтение даты и времени."
        },
        "zh-cn": {
            "espNtp.name": "网络时间",
            "espNtp.description": "从 NTP 服务器同步时钟，读取日期和时间。"
        },
        "zh-tw": {
            "espNtp.name": "網絡時間",
            "espNtp.description": "從 NTP 伺服器同步時鐘，讀取日期和時間。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPNTP_CATEGORY": "Network Time",
            "ESPNTP_SYNC": "sync network time timezone %1",
            "ESPNTP_GET": "current %1",
            "ESPNTP_YEAR": "year",
            "ESPNTP_MONTH": "month",
            "ESPNTP_DAY": "day",
            "ESPNTP_HOUR": "hour",
            "ESPNTP_MINUTE": "minute",
            "ESPNTP_SECOND": "second",
            "ESPNTP_WEEKDAY": "weekday"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPNTP_CATEGORY": "Сетевое время",
            "ESPNTP_SYNC": "синхронизировать время, часовой пояс %1",
            "ESPNTP_GET": "текущий %1",
            "ESPNTP_YEAR": "год",
            "ESPNTP_MONTH": "месяц",
            "ESPNTP_DAY": "день",
            "ESPNTP_HOUR": "час",
            "ESPNTP_MINUTE": "минута",
            "ESPNTP_SECOND": "секунда",
            "ESPNTP_WEEKDAY": "день недели"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPNTP_CATEGORY": "网络时间",
            "ESPNTP_SYNC": "同步网络时间 时区 %1",
            "ESPNTP_GET": "当前时间的 %1",
            "ESPNTP_YEAR": "年",
            "ESPNTP_MONTH": "月",
            "ESPNTP_DAY": "日",
            "ESPNTP_HOUR": "时",
            "ESPNTP_MINUTE": "分",
            "ESPNTP_SECOND": "秒",
            "ESPNTP_WEEKDAY": "星期（1-7）"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPNTP_CATEGORY": "網絡時間",
            "ESPNTP_SYNC": "同步網絡時間 時區 %1",
            "ESPNTP_GET": "當前時間的 %1",
            "ESPNTP_YEAR": "年",
            "ESPNTP_MONTH": "月",
            "ESPNTP_DAY": "日",
            "ESPNTP_HOUR": "時",
            "ESPNTP_MINUTE": "分",
            "ESPNTP_SECOND": "秒",
            "ESPNTP_WEEKDAY": "星期（1-7）"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
