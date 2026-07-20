/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espHttp.name": "HTTP Request",
            "espHttp.description": "Send HTTP GET / POST requests over Wi-Fi and read the response."
        },
        "ru": {
            "espHttp.name": "HTTP запрос",
            "espHttp.description": "Отправка HTTP GET / POST запросов по Wi-Fi и чтение ответа."
        },
        "zh-cn": {
            "espHttp.name": "HTTP 请求",
            "espHttp.description": "通过 Wi-Fi 发送 HTTP GET / POST 请求并读取响应。"
        },
        "zh-tw": {
            "espHttp.name": "HTTP 請求",
            "espHttp.description": "通過 Wi-Fi 發送 HTTP GET / POST 請求並讀取響應。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPHTTP_CATEGORY": "HTTP Request",
            "ESPHTTP_GET": "HTTP GET %1",
            "ESPHTTP_POST": "HTTP POST %1 with data %2",
            "ESPHTTP_STATUSCODE": "HTTP status code",
            "ESPHTTP_RESPONSE": "HTTP response"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPHTTP_CATEGORY": "HTTP запрос",
            "ESPHTTP_GET": "HTTP GET %1",
            "ESPHTTP_POST": "HTTP POST %1 с данными %2",
            "ESPHTTP_STATUSCODE": "код состояния HTTP",
            "ESPHTTP_RESPONSE": "ответ HTTP"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPHTTP_CATEGORY": "HTTP 请求",
            "ESPHTTP_GET": "发送 GET 请求 %1",
            "ESPHTTP_POST": "发送 POST 请求 %1 数据 %2",
            "ESPHTTP_STATUSCODE": "HTTP 状态码",
            "ESPHTTP_RESPONSE": "HTTP 响应内容"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPHTTP_CATEGORY": "HTTP 請求",
            "ESPHTTP_GET": "發送 GET 請求 %1",
            "ESPHTTP_POST": "發送 POST 請求 %1 數據 %2",
            "ESPHTTP_STATUSCODE": "HTTP 狀態碼",
            "ESPHTTP_RESPONSE": "HTTP 響應內容"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
