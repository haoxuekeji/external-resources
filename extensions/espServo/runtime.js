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

    const servoVariable = pin => `_ob_servo_${pin}`;

    return {
        espServo_setAngle: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const angle = clampInteger(args && args.ANGLE, 0, 180, 90);
            const servo = servoVariable(pin);
            const dutyU16 = 1638 + Math.trunc(angle * 6554 / 180);
            const duty = 26 + Math.trunc(angle * 102 / 180);
            const code =
                'from machine import Pin, PWM\n' +
                `if '${servo}' not in globals():\n` +
                `    ${servo} = PWM(Pin(${pin}), freq=50)\n` +
                `if hasattr(${servo}, 'duty_u16'):\n` +
                `    ${servo}.duty_u16(${dutyU16})\n` +
                'else:\n' +
                `    ${servo}.duty(${duty})`;
            return execLive(code);
        },

        espServo_release: args => {
            const pin = clampInteger(args && args.PIN, 0, 48, 4);
            const servo = servoVariable(pin);
            const code =
                `if '${servo}' not in globals():\n` +
                `    raise RuntimeError('Servo on pin ${pin} is not initialized')\n` +
                `${servo}.deinit()\n` +
                `del ${servo}`;
            return execLive(code);
        }
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
