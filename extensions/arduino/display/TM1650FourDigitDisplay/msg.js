/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        TM1650_CATEGORY: '4-Digit Display',
        TM1650_INIT: 'init TM1650 display',
        TM1650_SETBRIGHTNESS: 'set 4-digit display brightness %1',
        TM1650_DISPLAYSTRING: '4-digit display show string %1',
        TM1650_DISPLAY: '4-digit display show %1 at bit %2',
        TM1650_SETPOINT: '4-digit display set point %1 num %2' ,
        TM1650_STATE_ON: 'on',
        TM1650_STATE_OFF: 'off',
        TM1650_STATE_BRIGHT: 'bright',
        TM1650_STATE_DROWN: 'drown',
        TM1650_SETPOINT_TOOLTIP: 'It will take effect after the next update of the display.',
        TM1650_CLEAR: 'clear 4-digit display'
    });
    Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
        TM1650_CATEGORY: '4位数码管',
        TM1650_INIT: '初始化TM1650显示器',
        TM1650_SETBRIGHTNESS: '设置4位数码管TM1650亮度 %1',
        TM1650_DISPLAYSTRING: '4数码管TM1650显示字符串 %1',
        TM1650_DISPLAY: '4位数码管TM1650 %1',
        TM1650_SETPOINT: '4位数码管TM1650第 %1个小数点 %2',
        TM1650_STATE_ON: '开',
        TM1650_STATE_OFF: '关',
        TM1650_STATE_BRIGHT: '亮',
        TM1650_STATE_DROWN: '灭',
        TM1650_SETPOINT_TOOLTIP: '将在下次更新显示后生效.',
        TM1650_CLEAR: '清空4位数码管TM1650'
    });
    return Blockly;
}

exports = addMsg;
