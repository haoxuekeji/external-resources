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

    return {
        espDs18b20_read: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const sensor = `_ob_ds18b20_${pin}`;
            const code =
                'from machine import Pin\n' +
                'import onewire, ds18x20\n' +
                'import time\n' +
                `if '${sensor}' not in globals():\n` +
                `    ${sensor} = ds18x20.DS18X20(onewire.OneWire(Pin(${pin})))\n` +
                `${sensor}_roms = ${sensor}.scan()\n` +
                `if not ${sensor}_roms:\n` +
                `    raise OSError('DS18B20 sensor not found on pin ${pin}')\n` +
                `${sensor}.convert_temp()\n` +
                'time.sleep_ms(750)\n' +
                `print(round(${sensor}.read_temp(${sensor}_roms[0]), 1))`;
            return execLive(code, 5000).then(parseReporterNumber);
        }
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
