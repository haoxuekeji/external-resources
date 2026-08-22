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

const clampNumber = (value, min, max, fallback) => {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, Math.round(number * 1000) / 1000));
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

    const getPin = args => clampInteger(args && args.PIN, 0, 48, 4);
    const getDuration = args => clampNumber(args && args.DUR, 0, 30, 0.5);
    const getFrequency = value => clampInteger(value, 1, 20000, 440);
    const buzzerVariable = pin => `_ob_buzzer_${pin}`;
    const executionTimeout = duration => Math.min(35000, Math.max(5000, (duration * 1000) + 3000));

    const toneCode = (pin, frequency, duration) => {
        const buzzer = buzzerVariable(pin);
        return 'from machine import Pin, PWM\n' +
            'import time\n' +
            `if '${buzzer}' not in globals():\n` +
            `    ${buzzer} = PWM(Pin(${pin}), freq=${frequency})\n` +
            'else:\n' +
            `    ${buzzer}.freq(${frequency})\n` +
            `if hasattr(${buzzer}, 'duty_u16'):\n` +
            `    ${buzzer}.duty_u16(32768)\n` +
            'else:\n' +
            `    ${buzzer}.duty(512)\n` +
            `time.sleep(${duration})\n` +
            `if hasattr(${buzzer}, 'duty_u16'):\n` +
            `    ${buzzer}.duty_u16(0)\n` +
            'else:\n' +
            `    ${buzzer}.duty(0)`;
    };

    const stopCode = pin => {
        const buzzer = buzzerVariable(pin);
        return `if '${buzzer}' not in globals():\n` +
            `    raise RuntimeError('Buzzer on pin ${pin} is not initialized')\n` +
            `if hasattr(${buzzer}, 'duty_u16'):\n` +
            `    ${buzzer}.duty_u16(0)\n` +
            'else:\n' +
            `    ${buzzer}.duty(0)`;
    };

    return {
        espBuzzer_playNote: args => {
            const duration = getDuration(args);
            const pin = getPin(args);
            const frequency = getFrequency(args && args.NOTE);
            return execLive(toneCode(pin, frequency, duration), executionTimeout(duration));
        },

        espBuzzer_playFreq: args => {
            const duration = getDuration(args);
            const pin = getPin(args);
            const frequency = getFrequency(args && args.FREQ);
            return execLive(toneCode(pin, frequency, duration), executionTimeout(duration));
        },

        espBuzzer_rest: args => {
            const duration = getDuration(args);
            return execLive(`import time\ntime.sleep(${duration})`, executionTimeout(duration));
        },

        espBuzzer_stop: args => execLive(stopCode(getPin(args)))
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
