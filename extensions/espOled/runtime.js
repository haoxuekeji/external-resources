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
const OLED_CLASS_SOURCE = `class _OBSSD1306:
    def __init__(self, i2c, addr=None):
        self.i2c = i2c
        self.addr = addr if addr is not None else self._resolve_addr()
        self.width = 128
        self.height = 64
        self.pages = 8
        self.buffer = bytearray(self.width * self.pages)
        self.fb = framebuf.FrameBuffer(self.buffer, self.width, self.height, framebuf.MONO_VLSB)
        self._init_display()

    def _resolve_addr(self):
        import time
        devices = []
        for _ in range(3):
            try:
                devices = self.i2c.scan()
            except Exception:
                devices = []
            if 0x3C in devices or 0x3D in devices:
                break
            time.sleep_ms(50)
        for address in (0x3C, 0x3D):
            if address in devices:
                return address
        for address in (0x3C, 0x3D):
            try:
                self.i2c.writeto(address, b'')
                return address
            except Exception:
                pass
        raise OSError('SSD1306 OLED not found on SDA/SCL (addr 0x3C/0x3D)')

    def _write_cmd(self, command):
        self.i2c.writeto(self.addr, bytes((0x80, command & 0xFF)))

    def _write_data(self):
        if hasattr(self.i2c, 'writevto'):
            self.i2c.writevto(self.addr, (bytes((0x40,)), self.buffer))
        else:
            self.i2c.writeto(self.addr, bytes((0x40,)) + self.buffer)

    def _init_display(self):
        for command in (
            0xAE, 0xD5, 0x80, 0xA8, 0x3F, 0xD3, 0x00,
            0x40, 0x8D, 0x14, 0x20, 0x00, 0xA1, 0xC8,
            0xDA, 0x12, 0x81, 0xCF, 0xD9, 0xF1, 0xDB,
            0x40, 0xA4, 0xA6, 0xAF
        ):
            self._write_cmd(command)
        self.fill(0)
        self.show()

    def fill(self, color):
        self.fb.fill(color)

    def text(self, value, x, y):
        self.fb.text(str(value), x, y, 1)

    def pixel(self, x, y):
        self.fb.pixel(x, y, 1)

    def line(self, x1, y1, x2, y2):
        self.fb.line(x1, y1, x2, y2, 1)

    def show(self):
        self._write_cmd(0x21)
        self._write_cmd(0)
        self._write_cmd(self.width - 1)
        self._write_cmd(0x22)
        self._write_cmd(0)
        self._write_cmd(self.pages - 1)
        self._write_data()`;

const clampInteger = (value, min, max, fallback) => {
    const number = parseInt(value, 10);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
};

const pythonString = value => JSON.stringify(
    value === null || typeof value === 'undefined' ? '' : String(value)
);

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

    const requireOLED = code => `if '_ob_oled' not in globals():
    raise RuntimeError('OLED is not initialized. Run the OLED init block first')
${code}`;

    return {
        espOled_init: args => {
            const sda = clampInteger(args && args.SDA, 0, 48, 21);
            const scl = clampInteger(args && args.SCL, 0, 48, 22);
            // 地址：auto（默认）= 板端自动探测；0x3C / 0x3D = 直接用所选地址。
            const rawAddr = args && args.ADDR;
            const addrArg = (rawAddr === '0x3C' || rawAddr === '0x3D') ? `, ${rawAddr}` : '';
            const classSource = JSON.stringify(OLED_CLASS_SOURCE);
            const code = `from machine import Pin, SoftI2C
import framebuf
exec(${classSource})
try:
    _ob_oled_i2c.deinit()
except Exception:
    pass
_ob_oled_i2c = SoftI2C(sda=Pin(${sda}), scl=Pin(${scl}), freq=400000)
_ob_oled = _OBSSD1306(_ob_oled_i2c${addrArg})`;
            return execLive(code);
        },

        espOled_text: args => {
            const x = clampInteger(args && args.X, 0, 127, 0);
            const y = clampInteger(args && args.Y, 0, 63, 0);
            return execLive(requireOLED(`_ob_oled.text(${pythonString(args && args.TEXT)}, ${x}, ${y})`));
        },

        espOled_pixel: args => {
            const x = clampInteger(args && args.X, 0, 127, 0);
            const y = clampInteger(args && args.Y, 0, 63, 0);
            return execLive(requireOLED(`_ob_oled.pixel(${x}, ${y})`));
        },

        espOled_line: args => {
            const x1 = clampInteger(args && args.X1, 0, 127, 0);
            const y1 = clampInteger(args && args.Y1, 0, 63, 0);
            const x2 = clampInteger(args && args.X2, 0, 127, 0);
            const y2 = clampInteger(args && args.Y2, 0, 63, 0);
            return execLive(requireOLED(`_ob_oled.line(${x1}, ${y1}, ${x2}, ${y2})`));
        },

        espOled_clear: () => execLive(requireOLED('_ob_oled.fill(0)')),

        espOled_show: () => execLive(requireOLED('_ob_oled.show()'))
    };
}

return registerDeviceExtensionRuntime;
}());

exports = registerDeviceExtensionRuntime;
