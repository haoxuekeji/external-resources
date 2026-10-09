/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-var, indent */

// Every device extension runtime.js executes as a classic <script> on the
// same page, so top-level const/let declarations share one global lexical
// scope. Identical helper names across extensions (e.g. clampInteger) made
// every later script die at parse time with "Identifier ... has already
// been declared" before a single line ran, leaving the extension with no
// realtime primitives. Keep the whole body inside an IIFE and publish the
// register hook through a redeclarable `var`.
var registerDeviceExtensionRuntime = (function () {
const LCD1602_CLASS_SOURCE = `class _OBLCD1602:
    def __init__(self, i2c, addr=None):
        self.i2c = i2c
        self.addr = self._resolve_addr(addr)
        self.bl = 0x08
        time.sleep_ms(50)
        for cmd in (0x33, 0x32, 0x28, 0x0C, 0x06, 0x01):
            self.command(cmd)
            time.sleep_ms(5)

    def _resolve_addr(self, requested):
        devices = self.i2c.scan()
        if requested in devices:
            return requested
        candidates = [addr for addr in (0x27, 0x3F) if addr in devices]
        if len(candidates) == 1:
            return candidates[0]
        if requested is None and candidates:
            return candidates[0]
        if requested is None and len(devices) == 1:
            return devices[0]
        found = ', '.join('0x%02X' % addr for addr in devices) or 'none'
        wanted = 'auto' if requested is None else '0x%02X' % requested
        raise OSError('LCD1602 not found (requested %s, I2C scan: %s). Check SDA/SCL, power, wiring and backpack address.' % (wanted, found))

    def _write4(self, data):
        self.i2c.writeto(self.addr, bytes([data | self.bl | 0x04]))
        self.i2c.writeto(self.addr, bytes([(data | self.bl) & 0xFB]))

    def _send(self, value, rs):
        self._write4((value & 0xF0) | rs)
        self._write4(((value << 4) & 0xF0) | rs)

    def command(self, cmd):
        self._send(cmd, 0)

    def write_char(self, char):
        self._send(char, 1)

    def clear(self):
        self.command(0x01)
        time.sleep_ms(2)

    def backlight(self, on):
        self.bl = 0x08 if on else 0x00
        self.i2c.writeto(self.addr, bytes([self.bl]))

    def move_to(self, row, col):
        self.command(0x80 + (0x40 if row else 0x00) + col)

    def putstr(self, string):
        for char in str(string):
            self.write_char(ord(char) & 0xFF)`;

const clampInteger = (value, min, max, fallback) => {
    const number = parseInt(value, 10);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
};

const normalizeAddress = value => {
    if (value === null || typeof value === 'undefined' || value === 'None' || value === 'auto') {
        return 'None';
    }
    const address = Number(value);
    if (!Number.isFinite(address) || address < 0 || address > 0x7F) {
        return 'None';
    }
    return `0x${Math.trunc(address).toString(16)}`;
};

const pythonString = value => JSON.stringify(String(value));

function registerDeviceExtensionRuntime (runtime) {
    const getPeripheral = () => {
        const device = runtime.getDevice && runtime.getDevice();
        if (!device || !runtime.peripheralExtensions) return null;
        return runtime.peripheralExtensions[device.deviceId] || null;
    };

    const execLive = code => {
        const peripheral = getPeripheral();
        if (!peripheral || typeof peripheral.execLive !== 'function') {
            return Promise.reject(new Error('The current connection does not support MicroPython realtime mode'));
        }
        return peripheral.execLive(code);
    };

    return {
        espLcd1602_init: args => {
            const sda = clampInteger(args.SDA, 0, 48, 21);
            const scl = clampInteger(args.SCL, 0, 48, 22);
            const address = normalizeAddress(args.ADDR);
            const classSource = JSON.stringify(LCD1602_CLASS_SOURCE);
            const code = `from machine import Pin, I2C\nimport time\nexec(${classSource})\n` +
                `_ob_lcd_i2c = I2C(0, sda=Pin(${sda}), scl=Pin(${scl}))\n` +
                `_ob_lcd = _OBLCD1602(_ob_lcd_i2c, ${address})`;
            return execLive(code);
        },

        espLcd1602_showText: args => {
            const row = clampInteger(args.ROW, 0, 1, 0);
            const column = clampInteger(Number(args.COL) - 1, 0, 15, 0);
            return execLive(
                `_ob_lcd.move_to(${row}, ${column})\n` +
                `_ob_lcd.putstr(${pythonString(args.TEXT)})`
            );
        },

        espLcd1602_clear: () => execLive('_ob_lcd.clear()'),

        espLcd1602_backlight: args => {
            const on = args.STATE === true || args.STATE === 'True' || args.STATE === 'true' || args.STATE === 1;
            return execLive(`_ob_lcd.backlight(${on ? 'True' : 'False'})`);
        }
    };
}

return registerDeviceExtensionRuntime;
}());

exports = registerDeviceExtensionRuntime;
