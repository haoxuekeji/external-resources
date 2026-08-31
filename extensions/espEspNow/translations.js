/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espEspNow.name": "ESP-NOW",
            "espEspNow.description": "Board-to-board wireless messaging without a router."
        },
        "ru": {
            "espEspNow.name": "ESP-NOW",
            "espEspNow.description": "Беспроводной обмен сообщениями между платами без роутера."
        },
        "zh-cn": {
            "espEspNow.name": "ESP-NOW 板间通信",
            "espEspNow.description": "无需路由器的开发板间无线消息通信。"
        },
        "zh-tw": {
            "espEspNow.name": "ESP-NOW 板間通信",
            "espEspNow.description": "無需路由器的開發板間無線消息通信。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPESPNOW_CATEGORY": "ESP-NOW",
            "ESPESPNOW_INIT": "init ESP-NOW",
            "ESPESPNOW_MYMAC": "my MAC address",
            "ESPESPNOW_SEND": "send %1 to MAC %2",
            "ESPESPNOW_BROADCAST": "broadcast %1",
            "ESPESPNOW_WHENMESSAGE": "when ESP-NOW message received",
            "ESPESPNOW_MESSAGE": "received message",
            "ESPESPNOW_SENDER": "sender MAC address"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPESPNOW_CATEGORY": "ESP-NOW",
            "ESPESPNOW_INIT": "инициализировать ESP-NOW",
            "ESPESPNOW_MYMAC": "мой MAC-адрес",
            "ESPESPNOW_SEND": "отправить %1 на MAC %2",
            "ESPESPNOW_BROADCAST": "разослать всем %1",
            "ESPESPNOW_WHENMESSAGE": "когда получено сообщение ESP-NOW",
            "ESPESPNOW_MESSAGE": "полученное сообщение",
            "ESPESPNOW_SENDER": "MAC-адрес отправителя"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPESPNOW_CATEGORY": "ESP-NOW 板间通信",
            "ESPESPNOW_INIT": "初始化 ESP-NOW",
            "ESPESPNOW_MYMAC": "本机 MAC 地址",
            "ESPESPNOW_SEND": "发送 %1 给 MAC %2",
            "ESPESPNOW_BROADCAST": "广播 %1",
            "ESPESPNOW_WHENMESSAGE": "当收到 ESP-NOW 消息",
            "ESPESPNOW_MESSAGE": "收到的消息",
            "ESPESPNOW_SENDER": "发送者 MAC 地址"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPESPNOW_CATEGORY": "ESP-NOW 板間通信",
            "ESPESPNOW_INIT": "初始化 ESP-NOW",
            "ESPESPNOW_MYMAC": "本機 MAC 地址",
            "ESPESPNOW_SEND": "發送 %1 給 MAC %2",
            "ESPESPNOW_BROADCAST": "廣播 %1",
            "ESPESPNOW_WHENMESSAGE": "當收到 ESP-NOW 消息",
            "ESPESPNOW_MESSAGE": "收到的消息",
            "ESPESPNOW_SENDER": "發送者 MAC 地址"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
