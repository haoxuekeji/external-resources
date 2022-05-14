#ifndef _QXCSOUNDCHIP_H_
#define _QXCSOUNDCHIP_H_



#include<Arduino.h>

volatile boolean DATA;


void sendingAddress(byte addr, int pin)   //发送地址
{
	pinMode(pin, OUTPUT);
	digitalWrite(pin, LOW);
	delay(5);
	DATA = (addr & 0x01);
	for (int i = 0; i < 8; i++)
	{
		if (DATA == 1)
		{
			pinMode(pin, OUTPUT);
			digitalWrite(pin, HIGH);
			delayMicroseconds(600);
			pinMode(pin, OUTPUT);
			digitalWrite(pin, LOW);
			delayMicroseconds(200);

		}
		else if (DATA == 0)
		{
			pinMode(pin, OUTPUT);
			digitalWrite(pin, HIGH);
			delayMicroseconds(200);
			pinMode(pin, OUTPUT);
			digitalWrite(pin, LOW);
			delayMicroseconds(600);
		}
		addr = (addr >> 1);
		DATA = (addr & 0x01);
	}
	digitalWrite(pin, HIGH);
}
void combinationPlay(byte addr, int pin)   //组合播放
{
	sendingAddress(0xF3, pin);
	delay(2);
	sendingAddress(addr, pin);
	delay(2);
}

void playFullCurrentTime(int hour, int minute, int second, int pin)
{
	combinationPlay(64, pin);
	combinationPlay(23, pin); //现在时间
	if (hour < 10)
		combinationPlay(hour, pin); //
	else
	{
		if((hour / 10) != 1)
			combinationPlay(hour / 10, pin); //
		combinationPlay(10, pin); //
		if ((hour % 10) != 0)
			combinationPlay(hour % 10, pin); //
	}
	combinationPlay(15, pin); //点


	if (minute < 10)
		combinationPlay(minute, pin); //
	else
	{
		if((minute / 10) != 1)
			combinationPlay(minute / 10, pin); //
		combinationPlay(10, pin); //
		if ((minute % 10) != 0)
			combinationPlay(minute % 10, pin); //
	}
	combinationPlay(29, pin); //分


	if (second < 10)
		combinationPlay(second, pin); //
	else
	{
		if((second / 10) != 1)
			combinationPlay(second / 10, pin); //
		combinationPlay(10, pin); //
		if ((second % 10) != 0)
			combinationPlay(second % 10, pin); //
	}
	combinationPlay(30, pin); //秒
}
void playCurrentTime(int hour, int minute, int pin)
{
	combinationPlay(64, pin);
	combinationPlay(23, pin); //现在时间
	if (hour < 10)
		combinationPlay(hour, pin); //
	else
	{
		if((hour / 10) != 1)
			combinationPlay(hour / 10, pin); //
		combinationPlay(10, pin); //
		if ((hour % 10) != 0)
			combinationPlay(hour % 10, pin); //
	}
	combinationPlay(15, pin); //点


	if (minute < 10)
		combinationPlay(minute, pin); //
	else
	{
		if((minute / 10) != 1)
			combinationPlay(minute / 10, pin); //
		combinationPlay(10, pin); //
		if ((minute % 10) != 0)
			combinationPlay(minute % 10, pin); //
	}
	combinationPlay(29, pin); //分
}

void playHumidity(int humidity, int pin)
{
	combinationPlay(18, pin); //湿度
	combinationPlay(21, pin); //百分之
	if (humidity < 10)
		combinationPlay(humidity, pin); //
	else
	{
		combinationPlay(humidity / 10, pin); //
		combinationPlay(10, pin); //播放10
		if ((humidity % 10) != 0)
			combinationPlay(humidity % 10, pin); //
	}
}


void playIntNumber(long int num, int pin)
{
	char str[10];
	sprintf(str, "%10ld", abs(num));
	if (num < 0)
		combinationPlay(16, pin); //负

	if (str[0] != 0x20)
	{
		if (str[0] != '1')
			combinationPlay(str[0] - '0', pin); //播放
		combinationPlay(10, pin); //播放十
	}
	if (str[1] != 0x20)
	{
		if (str[1] != '0')
			combinationPlay(str[1] - '0', pin); //播放
		combinationPlay(14, pin); //播放亿
	}

	if ((str[2] != 0x20) && (str[2] != '0'))
	{

		combinationPlay(str[2] - '0', pin); //播放
		combinationPlay(12, pin); //播放千
	}
	if ((str[3] != 0x20))
	{
		if (str[3] != '0')
		{
			combinationPlay(str[3] - '0', pin); //播放
			combinationPlay(11, pin); //播放百
		}
		else if (str[4] != '0')
			combinationPlay(0, pin); //播放0
	}
	if (str[4] != 0x20)
	{
		if (str[4] != '0')
		{
			combinationPlay(str[4] - '0', pin); //播放
			combinationPlay(10, pin); //播放十
		}
		else if (str[5] != '0')
			combinationPlay(0, pin); //播放0

	}
	if (str[5] != 0x20)
	{
		if (str[5] != '0')
			combinationPlay(str[5] - '0', pin); //播放
		combinationPlay(13, pin); //播放万
	}
	if ((str[6] != 0x20) && (str[6] != '0'))
	{
		combinationPlay(str[6] - '0', pin); //播放
		combinationPlay(12, pin); //播放千
	}

	if ((str[7] != 0x20))
	{
		if (str[7] != '0')
		{
			combinationPlay(str[7] - '0', pin); //播放
			combinationPlay(11, pin); //播放百
		}
		else if (str[8] != '0')
			combinationPlay(0, pin); //播放0
	}
	if (str[8] != 0x20)
	{
		if (str[8] != '0')
		{
			combinationPlay(str[8] - '0', pin); //播放
			combinationPlay(10, pin); //播放十
		}
		else if (str[9] != '0')
			combinationPlay(0, pin); //播放0
	}
	if ((str[9] - '0') != 0)
		combinationPlay(str[9] - '0', pin); //播放

}
void playFloatNumber(float num, int pin)
{
	char str[10];
	dtostrf(num, 10, 3, str);

	playIntNumber((long int)num, pin);

	if ((str[7] == '0') && (str[8] == '0'))
		{}
	else if ((str[7] != '0') && (str[8] == '0'))
	{
		combinationPlay(15, pin); //播放点
		combinationPlay(str[7] - '0', pin);
	}
	else if ((str[7] != '0') && (str[8] != '0'))
	{
		combinationPlay(15, pin); //播放点
		combinationPlay(str[7] - '0', pin);
		combinationPlay(str[8] - '0', pin);
	}


}
void playSerialNumber(String str,  int pin)
{
	int len = String(str).length();
	for (int i = 0; i < len; i++)
	{
		combinationPlay(String(str).charAt(i) - '0', pin);
	}
}
void playDistance(float distance, int pin)
{
	playFloatNumber(distance, pin);

	combinationPlay(77, pin); //厘米


}
void playTemperature(float temperature, int pin)
{
	combinationPlay(17, pin); //温度
	playFloatNumber(temperature, pin);
	combinationPlay(20, pin); //摄氏度
}



#endif