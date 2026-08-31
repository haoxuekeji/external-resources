"""BME280 / BMP280 driver for MicroPython (I2C, forced mode, float API)."""

import time
import struct


class BME280:
    def __init__(self, i2c, address=None):
        self.i2c = i2c
        self.address = address or self._resolve_address()
        chip_id = self._read(0xD0, 1)[0]
        if chip_id not in (0x60, 0x58):
            raise OSError('BME280/BMP280 not found (chip id 0x%02X)' % chip_id)
        self._has_humidity = chip_id == 0x60
        self._load_calibration()
        if self._has_humidity:
            # humidity oversampling x1; applies on the next ctrl_meas write
            self._write(0xF2, 0x01)

    def _resolve_address(self):
        try:
            devices = self.i2c.scan()
        except Exception:
            devices = []
        for address in (0x76, 0x77):
            if address in devices:
                return address
        return 0x76

    def _read(self, register, length):
        return self.i2c.readfrom_mem(self.address, register, length)

    def _write(self, register, value):
        self.i2c.writeto_mem(self.address, register, bytes((value,)))

    def _load_calibration(self):
        data = self._read(0x88, 26)
        (self.dig_T1, self.dig_T2, self.dig_T3,
         self.dig_P1, self.dig_P2, self.dig_P3, self.dig_P4, self.dig_P5,
         self.dig_P6, self.dig_P7, self.dig_P8, self.dig_P9,
         _, self.dig_H1) = struct.unpack('<HhhHhhhhhhhhBB', data)
        if self._has_humidity:
            data = self._read(0xE1, 7)
            self.dig_H2, self.dig_H3 = struct.unpack('<hB', data[0:3])
            self.dig_H4 = (data[3] << 4) | (data[4] & 0x0F)
            if self.dig_H4 > 2047:
                self.dig_H4 -= 4096
            self.dig_H5 = (data[5] << 4) | (data[4] >> 4)
            if self.dig_H5 > 2047:
                self.dig_H5 -= 4096
            self.dig_H6 = struct.unpack('<b', data[6:7])[0]

    def _measure(self):
        # forced mode, temperature and pressure oversampling x1
        self._write(0xF4, 0x25)
        for _ in range(10):
            if not self._read(0xF3, 1)[0] & 0x08:
                break
            time.sleep_ms(10)
        data = self._read(0xF7, 8)
        raw_p = (data[0] << 12) | (data[1] << 4) | (data[2] >> 4)
        raw_t = (data[3] << 12) | (data[4] << 4) | (data[5] >> 4)
        raw_h = (data[6] << 8) | data[7]
        return raw_t, raw_p, raw_h

    def read_all(self):
        """One measurement -> (temperature C, pressure Pa, humidity %)."""
        raw_t, raw_p, raw_h = self._measure()

        var1 = (raw_t / 16384 - self.dig_T1 / 1024) * self.dig_T2
        var2 = ((raw_t / 131072 - self.dig_T1 / 8192) ** 2) * self.dig_T3
        t_fine = var1 + var2
        temperature = t_fine / 5120

        var1 = t_fine / 2 - 64000
        var2 = var1 * var1 * self.dig_P6 / 32768
        var2 = var2 + var1 * self.dig_P5 * 2
        var2 = var2 / 4 + self.dig_P4 * 65536
        var1 = (self.dig_P3 * var1 * var1 / 524288 + self.dig_P2 * var1) / 524288
        var1 = (1 + var1 / 32768) * self.dig_P1
        if var1 == 0:
            pressure = 0
        else:
            pressure = 1048576 - raw_p
            pressure = (pressure - var2 / 4096) * 6250 / var1
            var1 = self.dig_P9 * pressure * pressure / 2147483648
            var2 = pressure * self.dig_P8 / 32768
            pressure = pressure + (var1 + var2 + self.dig_P7) / 16

        humidity = 0
        if self._has_humidity:
            h = t_fine - 76800
            h = ((raw_h - (self.dig_H4 * 64 + self.dig_H5 / 16384 * h)) *
                 (self.dig_H2 / 65536 * (1 + self.dig_H6 / 67108864 * h *
                  (1 + self.dig_H3 / 67108864 * h))))
            humidity = h * (1 - self.dig_H1 * h / 524288)
            humidity = max(0, min(100, humidity))

        return temperature, pressure, humidity

    def temperature(self):
        return round(self.read_all()[0], 2)

    def pressure(self):
        return round(self.read_all()[1] / 100, 2)

    def humidity(self):
        return round(self.read_all()[2], 2)

    def altitude(self, sea_level=1013.25):
        pressure = self.read_all()[1] / 100
        return round(44330 * (1 - (pressure / sea_level) ** 0.1903), 2)
