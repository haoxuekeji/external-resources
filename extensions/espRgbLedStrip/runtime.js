/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

const clampInteger = (value, min, max, fallback) => {
    const number = parseInt(value, 10);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
};

const parseColour = value => {
    if (typeof value !== 'number') {
        const text = String(value === null || typeof value === 'undefined' ? '' : value).trim();
        const matches = text.match(/^#?([0-9a-fA-F]{6})$/);
        if (matches) {
            const parsed = parseInt(matches[1], 16);
            return [(parsed >> 16) & 0xFF, (parsed >> 8) & 0xFF, parsed & 0xFF];
        }
        value = Number(text);
    }
    if (Number.isFinite(value)) {
        const parsed = Math.max(0, Math.trunc(value)) & 0xFFFFFF;
        return [(parsed >> 16) & 0xFF, (parsed >> 8) & 0xFF, parsed & 0xFF];
    }
    return [255, 255, 255];
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

    const stripVariable = pin => `_ob_np_${pin}`;

    const ensureStrip = (pin, count = 16) => {
        const strip = stripVariable(pin);
        return 'import neopixel\n' +
            'from machine import Pin\n' +
            `if '${strip}' not in globals():\n` +
            `    ${strip} = neopixel.NeoPixel(Pin(${pin}), ${count})\n` +
            `    ${strip}_b = 1.0\n`;
    };

    const scaledColour = (pin, rgb) => {
        const strip = stripVariable(pin);
        return `(int(${rgb[0]} * ${strip}_b), int(${rgb[1]} * ${strip}_b), int(${rgb[2]} * ${strip}_b))`;
    };

    return {
        espRgbLedStrip_init: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const length = clampInteger(args && args.LEN, 1, 1024, 16);
            const strip = stripVariable(pin);
            const code =
                'import neopixel\n' +
                'from machine import Pin\n' +
                `${strip} = neopixel.NeoPixel(Pin(${pin}), ${length})\n` +
                `if '${strip}_b' not in globals():\n` +
                `    ${strip}_b = 1.0\n` +
                `${strip}.fill((0, 0, 0))\n` +
                `${strip}.write()`;
            return execLive(code);
        },

        espRgbLedStrip_setPixelColor: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const index = clampInteger(args && args.NO, 1, 1024, 1);
            const rgb = parseColour(args && args.COLOR);
            const strip = stripVariable(pin);
            const code = ensureStrip(pin) +
                `if 0 <= ${index - 1} < ${strip}.n:\n` +
                `    ${strip}[${index - 1}] = ${scaledColour(pin, rgb)}\n` +
                `    ${strip}.write()`;
            return execLive(code);
        },

        espRgbLedStrip_fill: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const rgb = parseColour(args && args.COLOR);
            const strip = stripVariable(pin);
            const code = ensureStrip(pin) +
                `${strip}.fill(${scaledColour(pin, rgb)})\n` +
                `${strip}.write()`;
            return execLive(code);
        },

        espRgbLedStrip_setBrightness: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const brightness = clampInteger(args && args.BRT, 0, 100, 100);
            const strip = stripVariable(pin);
            const code = ensureStrip(pin) +
                `${strip}_b = ${brightness / 100}`;
            return execLive(code);
        },

        espRgbLedStrip_clear: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const strip = stripVariable(pin);
            const code = ensureStrip(pin) +
                `${strip}.fill((0, 0, 0))\n` +
                `${strip}.write()`;
            return execLive(code);
        }
    };
}

exports = registerDeviceExtensionRuntime;
