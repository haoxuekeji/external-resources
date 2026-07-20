/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espMqtt.name": "MQTT",
            "espMqtt.description": "Publish and subscribe messages through an MQTT broker over Wi-Fi."
        },
        "ru": {
            "espMqtt.name": "MQTT",
            "espMqtt.description": "Публикация и подписка на сообщения через MQTT-брокер по Wi-Fi."
        },
        "zh-cn": {
            "espMqtt.name": "MQTT",
            "espMqtt.description": "通过 Wi-Fi 连接 MQTT 服务器收发消息，与舞台作品或其他设备联网互动。"
        },
        "zh-tw": {
            "espMqtt.name": "MQTT",
            "espMqtt.description": "通過 Wi-Fi 連接 MQTT 伺服器收發消息，與舞台作品或其他設備聯網互動。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPMQTT_CATEGORY": "MQTT",
            "ESPMQTT_CONNECT": "connect to MQTT broker %1 port %2",
            "ESPMQTT_DISCONNECT": "disconnect from MQTT broker",
            "ESPMQTT_SUBSCRIBE": "subscribe to topic %1",
            "ESPMQTT_PUBLISH": "publish %2 to topic %1",
            "ESPMQTT_CHECKMSG": "check MQTT messages",
            "ESPMQTT_WHENMESSAGE": "when MQTT message received",
            "ESPMQTT_TOPIC": "MQTT topic",
            "ESPMQTT_MESSAGE": "MQTT message"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPMQTT_CATEGORY": "MQTT",
            "ESPMQTT_CONNECT": "подключиться к MQTT брокеру %1 порт %2",
            "ESPMQTT_DISCONNECT": "отключиться от MQTT брокера",
            "ESPMQTT_SUBSCRIBE": "подписаться на тему %1",
            "ESPMQTT_PUBLISH": "опубликовать %2 в тему %1",
            "ESPMQTT_CHECKMSG": "проверить MQTT сообщения",
            "ESPMQTT_WHENMESSAGE": "когда получено MQTT сообщение",
            "ESPMQTT_TOPIC": "MQTT тема",
            "ESPMQTT_MESSAGE": "MQTT сообщение"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPMQTT_CATEGORY": "MQTT",
            "ESPMQTT_CONNECT": "连接 MQTT 服务器 %1 端口 %2",
            "ESPMQTT_DISCONNECT": "断开 MQTT 连接",
            "ESPMQTT_SUBSCRIBE": "订阅主题 %1",
            "ESPMQTT_PUBLISH": "向主题 %1 发送消息 %2",
            "ESPMQTT_CHECKMSG": "检查 MQTT 消息",
            "ESPMQTT_WHENMESSAGE": "当收到 MQTT 消息",
            "ESPMQTT_TOPIC": "MQTT 主题",
            "ESPMQTT_MESSAGE": "MQTT 消息"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPMQTT_CATEGORY": "MQTT",
            "ESPMQTT_CONNECT": "連接 MQTT 伺服器 %1 端口 %2",
            "ESPMQTT_DISCONNECT": "斷開 MQTT 連接",
            "ESPMQTT_SUBSCRIBE": "訂閱主題 %1",
            "ESPMQTT_PUBLISH": "向主題 %1 發送消息 %2",
            "ESPMQTT_CHECKMSG": "檢查 MQTT 消息",
            "ESPMQTT_WHENMESSAGE": "當收到 MQTT 消息",
            "ESPMQTT_TOPIC": "MQTT 主題",
            "ESPMQTT_MESSAGE": "MQTT 消息"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
