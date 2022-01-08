/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        MOTOR_CATEGORY: 'Motor',
        MOTOR_RUN: 'set motor speed %1 speed PIN %2 direction PIN %3',
    });
    Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
        MOTOR_CATEGORY: '电机驱动',
        MOTOR_RUN: '设置电机转速（-255～255）%1 调速端 %2 方向端 %3',
    });
    return Blockly;
}

exports = addMsg;
