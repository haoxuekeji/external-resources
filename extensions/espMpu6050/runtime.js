/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const MPU6050_CLASS_SOURCE = `class _OBMPU6050:
    def __init__(self, i2c):
        self.i2c = i2c
        self.addr = self._resolve_addr()
        self.i2c.writeto_mem(self.addr, 0x6B, bytes((0,)))
        self.i2c.writeto_mem(self.addr, 0x1C, bytes((0,)))
        self.i2c.writeto_mem(self.addr, 0x1B, bytes((0,)))

    def _resolve_addr(self):
        try:
            devices = self.i2c.scan()
        except Exception:
            devices = []
        for address in (0x68, 0x69):
            if address in devices:
                return address
        if not devices:
            return 0x68
        found = ', '.join('0x%02X' % address for address in devices)
        raise OSError('MPU6050 not found (I2C scan: %s)' % found)

    def _read_raw(self):
        data = self.i2c.readfrom_mem(self.addr, 0x3B, 14)
        if len(data) != 14:
            raise OSError('MPU6050 returned an invalid data frame')
        values = []
        for index in range(0, 14, 2):
            value = (data[index] << 8) | data[index + 1]
            if value > 32767:
                value -= 65536
            values.append(value)
        return values

    def accel(self):
        raw = self._read_raw()
        return (raw[0] / 16384, raw[1] / 16384, raw[2] / 16384)

    def gyro(self):
        raw = self._read_raw()
        return (raw[4] / 131, raw[5] / 131, raw[6] / 131)

    def temperature(self):
        raw = self._read_raw()
        return raw[3] / 340 + 36.53`;

const clampInteger = (value, min, max, fallback) => {
    const number = parseInt(value, 10);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
};

const parseReporterNumber = output => {
    const text = String(output === null || typeof output === 'undefined' ? '' : output);
    const matches = text.match(/[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][-+]?\d+)?/g);
    if (!matches || matches.length === 0) return 0;
    const value = Number(matches[matches.length - 1]);
    return Number.isFinite(value) ? value : 0;
};

function registerDeviceExtensionRuntime (runtime) {
    const getPeripheral = () => {
        const device = runtime.getDevice && runtime.getDevice();
        if (!device || !runtime.peripheralExtensions) return null;
        return runtime.peripheralExtensions[device.deviceId] || null;
    };

    const execLive = (code, timeout = 5000) => {
        const peripheral = getPeripheral();
        if (!peripheral || typeof peripheral.execLive !== 'function') {
            return Promise.reject(
                new Error('The current connection does not support MicroPython realtime mode')
            );
        }
        return peripheral.execLive(code, timeout);
    };

    const requireMPU = code => `if '_ob_mpu6050' not in globals():
    raise RuntimeError('MPU6050 is not initialized. Run the MPU6050 init block first')
${code}`;

    const readAxis = args => clampInteger(args && args.AXIS, 0, 2, 0);

    return {
        espMpu6050_init: args => {
            const sda = clampInteger(args && args.SDA, 0, 48, 21);
            const scl = clampInteger(args && args.SCL, 0, 48, 22);
            const classSource = JSON.stringify(MPU6050_CLASS_SOURCE);
            const code = `from machine import Pin, SoftI2C
exec(${classSource})
try:
    _ob_mpu6050_i2c.deinit()
except Exception:
    pass
_ob_mpu6050_i2c = SoftI2C(sda=Pin(${sda}), scl=Pin(${scl}), freq=400000)
_ob_mpu6050 = _OBMPU6050(_ob_mpu6050_i2c)`;
            return execLive(code);
        },

        espMpu6050_accel: args => {
            const axis = readAxis(args);
            return execLive(requireMPU(`print(_ob_mpu6050.accel()[${axis}])`)).then(parseReporterNumber);
        },

        espMpu6050_gyro: args => {
            const axis = readAxis(args);
            return execLive(requireMPU(`print(_ob_mpu6050.gyro()[${axis}])`)).then(parseReporterNumber);
        },

        espMpu6050_temperature: () =>
            execLive(requireMPU('print(_ob_mpu6050.temperature())')).then(parseReporterNumber)
    };
}

exports = registerDeviceExtensionRuntime;
