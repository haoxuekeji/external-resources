/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espServo.name": "Servo",
            "espServo.description": "Control standard 180 degree servos through PWM."
        },
        "ru": {
            "espServo.name": "Серводвигатель",
            "espServo.description": "Управление стандартными сервоприводами 180° через ШИМ."
        },
        "zh-cn": {
            "espServo.name": "舵机",
            "espServo.description": "通过 PWM 控制标准 180 度舵机。"
        },
        "zh-tw": {
            "espServo.name": "舵機",
            "espServo.description": "通過 PWM 控制標準 180 度舵機。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPSERVO_CATEGORY": "Servo",
            "ESPSERVO_SETANGLE": "set servo pin %1 angle to %2",
            "ESPSERVO_RELEASE": "release servo pin %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPSERVO_CATEGORY": "Серводвигатель",
            "ESPSERVO_SETANGLE": "установить серво пин %1 угол %2",
            "ESPSERVO_RELEASE": "освободить серво пин %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPSERVO_CATEGORY": "舵机",
            "ESPSERVO_SETANGLE": "设置舵机引脚 %1 角度为 %2",
            "ESPSERVO_RELEASE": "释放舵机引脚 %1"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPSERVO_CATEGORY": "舵機",
            "ESPSERVO_SETANGLE": "設置舵機引腳 %1 角度為 %2",
            "ESPSERVO_RELEASE": "釋放舵機引腳 %1"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
