/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
function getInterfaceTranslations () {
    return {
        "en": {
            "espMpu6050.name": "MPU6050",
            "espMpu6050.description": "6-axis accelerometer and gyroscope motion sensor."
        },
        "ru": {
            "espMpu6050.name": "MPU6050",
            "espMpu6050.description": "6-осевой датчик движения: акселерометр и гироскоп."
        },
        "zh-cn": {
            "espMpu6050.name": "MPU6050 姿态传感器",
            "espMpu6050.description": "六轴运动传感器：加速度计与陀螺仪。"
        },
        "zh-tw": {
            "espMpu6050.name": "MPU6050 姿態傳感器",
            "espMpu6050.description": "六軸運動傳感器：加速度計與陀螺儀。"
        }
    };
}

function registerScratchExtensionTranslations () {
    return {};
}

function registerBlocksMessages (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"],
        {
            "ESPMPU6050_CATEGORY": "MPU6050",
            "ESPMPU6050_INIT": "init MPU6050 SDA %1 SCL %2",
            "ESPMPU6050_ACCEL": "acceleration %1 (g)",
            "ESPMPU6050_GYRO": "angular velocity %1 (°/s)",
            "ESPMPU6050_TEMPERATURE": "MPU6050 temperature (°C)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["ru"],
        {
            "ESPMPU6050_CATEGORY": "MPU6050",
            "ESPMPU6050_INIT": "инициализировать MPU6050 SDA %1 SCL %2",
            "ESPMPU6050_ACCEL": "ускорение %1 (g)",
            "ESPMPU6050_GYRO": "угловая скорость %1 (°/с)",
            "ESPMPU6050_TEMPERATURE": "температура MPU6050 (°C)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"],
        {
            "ESPMPU6050_CATEGORY": "MPU6050 姿态传感器",
            "ESPMPU6050_INIT": "初始化 MPU6050 SDA %1 SCL %2",
            "ESPMPU6050_ACCEL": "加速度 %1 轴(g)",
            "ESPMPU6050_GYRO": "角速度 %1 轴(°/秒)",
            "ESPMPU6050_TEMPERATURE": "MPU6050 温度(°C)"
        }
    );

    Object.assign(Blockly.ScratchMsgs.locales["zh-tw"],
        {
            "ESPMPU6050_CATEGORY": "MPU6050 姿態傳感器",
            "ESPMPU6050_INIT": "初始化 MPU6050 SDA %1 SCL %2",
            "ESPMPU6050_ACCEL": "加速度 %1 軸(g)",
            "ESPMPU6050_GYRO": "角速度 %1 軸(°/秒)",
            "ESPMPU6050_TEMPERATURE": "MPU6050 溫度(°C)"
        }
    );

    return Blockly;
}

if (typeof module !== 'undefined') {
    module.exports = {getInterfaceTranslations};
}
exports = registerScratchExtensionTranslations;
exports = registerBlocksMessages;
