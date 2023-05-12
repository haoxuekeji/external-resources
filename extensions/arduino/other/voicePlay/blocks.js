/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function addBlocks (Blockly) {
    const colour = '#00DD77';
    const secondaryColour = '#00AA55';

    const sound = [
        ['0', '0'],
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        ['4', '4'],
        ['5', '5'],
        ['6', '6'],
        ['7', '7'],
        ['8', '8'],
        ['9', '9'],
        ['十', '10'],
        ['百', '11'],
        ['千', '12'],
        ['万', '13'],
        ['亿', '14'],
        ['点', '15'],
        ['负', '16'],
        ['温度', '17'],
        ['湿度', '18'],
        ['电量', '19'],
        ['摄氏度', '20'],
        ['百分之', '21'],
        ['日期', '22'],
        ['时间', '23'],
        ['定时', '24'],
        ['年', '25'],
        ['月', '26'],
        ['日', '27'],
        ['号', '28'],
        ['分', '29'],
        ['秒', '30'],
        ['加', '31'],
        ['减', '32'],
        ['乘', '33'],
        ['除', '34'],
        ['等于', '35'],
        ['红', '36'],
        ['黄', '37'],
        ['绿', '38'],
        ['蓝', '39'],
        ['闪烁', '40'],
        ['次', '41'],
        ['前进', '42'],
        ['后退', '43'],
        ['左转', '44'],
        ['右转', '45'],
        ['停止', '46'],
        ['倒车', '47'],
        ['正确', '48'],
        ['错误', '49'],
        ['确认', '50'],
        ['注意', '51'],
        ['输入', '52'],
        ['密码', '53'],
        ['刷卡', '54'],
        ['全额', '55'],

        ['元', '59'],
        ['打开', '60'],
        ['关闭', '61'],
        ['灯', '62'],
        ['色', '63'],

        ['请', '91'],
        ['祝', '92'],
        ['好', '93'],
        ['您', '94'],
        ['爸爸', '95'],
        ['妈妈', '96'],
        ['爷爷', '97'],
        ['奶奶', '98'],

        ['谢谢', '109'],
        ['不客气', '110'],
        ['没问题', '111'],
        ['对不起', '112'],
        
        ['万事如意', '117'],
        ['工作顺利', '118'],
        ['学习进步', '119'],
        ['身体健康', '120'],
        ['生日快乐', '121'],
        ['天天向上', '122'],
        ['欢迎', '123'],
        ['光临', '124'],
    ];

    const digitalPins = Blockly.getMainWorkspace().getFlyout()
        .getFlyoutItems()
        .find(block => block.type === 'arduino_pin_setDigitalOutput')
        .getField('PIN')
        .getOptions();

    Blockly.Blocks.voice_play_combinationPlay = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_COMBINATIONPLAY,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'field_dropdown',
                        name: 'NO',
                        options: sound
                    }

                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    Blockly.Blocks.voice_play_playTemperature  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_TEMPERATURE,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playHumidity  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_HUMIDITY,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playIntNumber  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_INTNUMBER,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playFloatNumber  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_FLOAT_NUMBER,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playSerialNumber  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_SERIAL_NUMBER,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playDistance  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_DISTANCE_NUMBER,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'DATA'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playFullCurrentTime  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_FULLCURRENT_TIME,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'HOUR'
                    },
                    {
                        type: 'input_value',
                        name: 'MIN'
                    },
                    {
                        type: 'input_value',
                        name: 'SEC'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };
    Blockly.Blocks.voice_play_playCurrentTime  = {
        init: function () {
            this.jsonInit({
                message0: Blockly.Msg.VOICE_PLAY_CURRENT_TIME,
                args0: [                    
                    {
                        type: 'field_dropdown',
                        name: 'PIN',
                        options: digitalPins
                    },
                    {
                        type: 'input_value',
                        name: 'HOUR'
                    },
                    {
                        type: 'input_value',
                        name: 'MIN'
                    }
                ],
                colour: colour,
                secondaryColour: secondaryColour,
                extensions: ['shape_statement']
            });
        }
    };

    return Blockly;
}

exports = addBlocks;
