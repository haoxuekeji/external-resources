# Minimal MPU-6050 6-axis IMU driver (I2C).
# Written for OpenBlock, MIT license.


class MPU6050:
    def __init__(self, i2c, addr=0x68):
        self.i2c = i2c
        self.addr = addr
        # Wake up from sleep mode (PWR_MGMT_1 = 0).
        self.i2c.writeto_mem(self.addr, 0x6B, b'\x00')

    def _read_raw(self):
        # ACCEL_XOUT_H .. GYRO_ZOUT_L, 14 bytes starting at 0x3B.
        data = self.i2c.readfrom_mem(self.addr, 0x3B, 14)
        values = []
        for i in range(0, 14, 2):
            val = (data[i] << 8) | data[i + 1]
            if val > 32767:
                val -= 65536
            values.append(val)
        return values

    def accel(self):
        # Returns (x, y, z) in g at the default +/-2g range.
        raw = self._read_raw()
        return (raw[0] / 16384, raw[1] / 16384, raw[2] / 16384)

    def gyro(self):
        # Returns (x, y, z) in deg/s at the default +/-250 deg/s range.
        raw = self._read_raw()
        return (raw[4] / 131, raw[5] / 131, raw[6] / 131)

    def temperature(self):
        raw = self._read_raw()
        return raw[3] / 340 + 36.53
