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
        ultrasonic_readDistance: args => {
            const trig = clampInteger(args && args.TRIG, 0, 48, 5);
            const echo = clampInteger(args && args.ECHO, 0, 48, 18);
            const unit = args && args.UNIT === 'MM' ? 'MM' : 'CM';
            const sensor = `_ob_ultrasonic_${trig}_${echo}`;
            const distance = unit === 'MM' ? `round(${sensor}_distance * 10)` :
                `${sensor}_distance`;
            const code = trig === echo ?
                "raise ValueError('Ultrasonic TRIG and ECHO pins must be different')" :
                'from machine import Pin\n' +
                'import machine\n' +
                'import time\n' +
                `if '${sensor}' not in globals():\n` +
                `    ${sensor} = (Pin(${trig}, Pin.OUT), Pin(${echo}, Pin.IN))\n` +
                `${sensor}[0].value(0)\n` +
                'time.sleep_us(2)\n' +
                `${sensor}[0].value(1)\n` +
                'time.sleep_us(10)\n' +
                `${sensor}[0].value(0)\n` +
                `try:\n    ${sensor}_pulse = machine.time_pulse_us(${sensor}[1], 1, 30000)\n` +
                `except Exception as error:\n    raise OSError('Ultrasonic measurement failed: %s' % error)\n` +
                `${sensor}_distance = round(${sensor}_pulse / 58.0, 1) if ${sensor}_pulse > 0 else 0\n` +
                `print(${distance})`;
            return execLive(code).then(parseReporterNumber);
        }
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
