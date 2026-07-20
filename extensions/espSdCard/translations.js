/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espSdCard.name": "SD Card",
            "espSdCard.description": "Log and read data on a SPI SD card."
        },
        "ru": {
            "espSdCard.name": "SD-карта",
            "espSdCard.description": "Запись и чтение данных на SD-карте по SPI."
        },
        "zh-cn": {
            "espSdCard.name": "SD 卡",
            "espSdCard.description": "通过 SPI 读写 SD 卡，记录数据。"
        },
        "zh-tw": {
            "espSdCard.name": "SD 卡",
            "espSdCard.description": "通過 SPI 讀寫 SD 卡，記錄數據。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPSDCARD_CATEGORY": "SD Card",
            "ESPSDCARD_MOUNT": "mount SD card SCK %1 MOSI %2 MISO %3 CS %4",
            "ESPSDCARD_APPENDLINE": "append line %2 to file %1",
            "ESPSDCARD_READFILE": "content of file %1",
            "ESPSDCARD_DELETEFILE": "delete file %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPSDCARD_CATEGORY": "SD-карта",
            "ESPSDCARD_MOUNT": "смонтировать SD-карту SCK %1 MOSI %2 MISO %3 CS %4",
            "ESPSDCARD_APPENDLINE": "добавить строку %2 в файл %1",
            "ESPSDCARD_READFILE": "содержимое файла %1",
            "ESPSDCARD_DELETEFILE": "удалить файл %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPSDCARD_CATEGORY": "SD 卡",
            "ESPSDCARD_MOUNT": "挂载 SD 卡 SCK %1 MOSI %2 MISO %3 CS %4",
            "ESPSDCARD_APPENDLINE": "向文件 %1 追加一行 %2",
            "ESPSDCARD_READFILE": "文件 %1 的内容",
            "ESPSDCARD_DELETEFILE": "删除文件 %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPSDCARD_CATEGORY": "SD 卡",
            "ESPSDCARD_MOUNT": "掛載 SD 卡 SCK %1 MOSI %2 MISO %3 CS %4",
            "ESPSDCARD_APPENDLINE": "向文件 %1 追加一行 %2",
            "ESPSDCARD_READFILE": "文件 %1 的內容",
            "ESPSDCARD_DELETEFILE": "刪除文件 %1"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
