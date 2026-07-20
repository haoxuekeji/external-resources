/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espMotor.name": "DC Motor",
            "espMotor.description": "Drive DC motors and smart cars with L298N / TB6612."
        },
        "ru": {
            "espMotor.name": "Мотор",
            "espMotor.description": "Управление моторами и умными машинками через L298N / TB6612."
        },
        "zh-cn": {
            "espMotor.name": "直流电机",
            "espMotor.description": "通过 L298N / TB6612 驱动直流电机和智能小车。"
        },
        "zh-tw": {
            "espMotor.name": "直流電機",
            "espMotor.description": "通過 L298N / TB6612 驅動直流電機和智能小車。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPMOTOR_CATEGORY": "DC Motor",
            "ESPMOTOR_INIT": "init motor %1 IN1 %2 IN2 %3 PWM %4",
            "ESPMOTOR_RUN": "motor %1 turn %2 at speed %3 %",
            "ESPMOTOR_FORWARD": "forward",
            "ESPMOTOR_BACKWARD": "backward",
            "ESPMOTOR_STOP": "stop motor %1",
            "ESPMOTOR_CARMOVE": "car %1 at speed %2 %",
            "ESPMOTOR_CAR_FORWARD": "move forward",
            "ESPMOTOR_CAR_BACKWARD": "move backward",
            "ESPMOTOR_CAR_LEFT": "turn left",
            "ESPMOTOR_CAR_RIGHT": "turn right",
            "ESPMOTOR_CARSTOP": "car stop"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPMOTOR_CATEGORY": "Мотор",
            "ESPMOTOR_INIT": "инициализировать мотор %1 IN1 %2 IN2 %3 PWM %4",
            "ESPMOTOR_RUN": "мотор %1 вращать %2 со скоростью %3 %",
            "ESPMOTOR_FORWARD": "вперёд",
            "ESPMOTOR_BACKWARD": "назад",
            "ESPMOTOR_STOP": "остановить мотор %1",
            "ESPMOTOR_CARMOVE": "машинка %1 со скоростью %2 %",
            "ESPMOTOR_CAR_FORWARD": "ехать вперёд",
            "ESPMOTOR_CAR_BACKWARD": "ехать назад",
            "ESPMOTOR_CAR_LEFT": "повернуть налево",
            "ESPMOTOR_CAR_RIGHT": "повернуть направо",
            "ESPMOTOR_CARSTOP": "машинка стоп"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPMOTOR_CATEGORY": "直流电机",
            "ESPMOTOR_INIT": "初始化电机 %1 IN1 %2 IN2 %3 调速 %4",
            "ESPMOTOR_RUN": "电机 %1 %2 速度 %3 %",
            "ESPMOTOR_FORWARD": "正转",
            "ESPMOTOR_BACKWARD": "反转",
            "ESPMOTOR_STOP": "停止电机 %1",
            "ESPMOTOR_CARMOVE": "小车 %1 速度 %2 %",
            "ESPMOTOR_CAR_FORWARD": "前进",
            "ESPMOTOR_CAR_BACKWARD": "后退",
            "ESPMOTOR_CAR_LEFT": "左转",
            "ESPMOTOR_CAR_RIGHT": "右转",
            "ESPMOTOR_CARSTOP": "小车停止"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPMOTOR_CATEGORY": "直流電機",
            "ESPMOTOR_INIT": "初始化電機 %1 IN1 %2 IN2 %3 調速 %4",
            "ESPMOTOR_RUN": "電機 %1 %2 速度 %3 %",
            "ESPMOTOR_FORWARD": "正轉",
            "ESPMOTOR_BACKWARD": "反轉",
            "ESPMOTOR_STOP": "停止電機 %1",
            "ESPMOTOR_CARMOVE": "小車 %1 速度 %2 %",
            "ESPMOTOR_CAR_FORWARD": "前進",
            "ESPMOTOR_CAR_BACKWARD": "後退",
            "ESPMOTOR_CAR_LEFT": "左轉",
            "ESPMOTOR_CAR_RIGHT": "右轉",
            "ESPMOTOR_CARSTOP": "小車停止"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
