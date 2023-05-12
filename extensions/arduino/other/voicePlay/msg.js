/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        VOICE_PLAY_CATEGORY: 'voice play',
        VOICE_PLAY_COMBINATIONPLAY: 'pin%1 voice combination play %2',
        VOICE_PLAY_TEMPERATURE: 'pin%1 play temperature%2',
        VOICE_PLAY_HUMIDITY: 'pin%1play hummidity%2 %',
        VOICE_PLAY_INTNUMBER: 'pin%1play int number2',
        VOICE_PLAY_FLOAT_NUMBER: 'pin%1play float number%2',
        VOICE_PLAY_SERIAL_NUMBER: 'pin%1play serial number%2',
        VOICE_PLAY_DISTANCE_NUMBER: 'pin%1play distance%2cm',
        VOICE_PLAY_FULLCURRENT_TIME: 'pin%1play full current time%2hour%3min%4sec',
        VOICE_PLAY_CURRENT_TIME: 'pin%1play current time%2hour%3min',

    });
    Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
        VOICE_PLAY_CATEGORY: '语音播放',
        VOICE_PLAY_COMBINATIONPLAY: '管脚%1播放日常语%2',
        VOICE_PLAY_TEMPERATURE: '管脚%1播放温度%2摄氏度',
        VOICE_PLAY_HUMIDITY: '管脚%1播放湿度%2 %',
        VOICE_PLAY_INTNUMBER: '管脚%1播放整数%2',
        VOICE_PLAY_FLOAT_NUMBER: '管脚%1播放小数%2',
        VOICE_PLAY_SERIAL_NUMBER: '管脚%1播放号码%2',
        VOICE_PLAY_DISTANCE_NUMBER: '管脚%1播放距离%2厘米',
        VOICE_PLAY_FULLCURRENT_TIME: '管脚%1播放完整时间%2时%3分%4秒',
        VOICE_PLAY_CURRENT_TIME: '管脚%1播放当前时间%2时%3分',
    });
    return Blockly;
}

exports = addMsg;
