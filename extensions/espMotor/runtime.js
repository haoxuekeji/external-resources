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

function normalizeMotor (value) {
    return value === 'B' ? 'B' : 'A';
}

const normalizeAction = value => {
    const actions = ['forward', 'backward', 'left', 'right'];
    return actions.includes(value) ? value : 'forward';
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

    const motorVariable = motor => `_ob_motor_${motor}`;

    const dutyHelper = `if '_ob_motor_duty' not in globals():
    def _ob_motor_duty(pwm, percent):
        percent = min(100, max(0, int(percent)))
        if hasattr(pwm, 'duty_u16'):
            pwm.duty_u16(int(percent * 65535 / 100))
        else:
            pwm.duty(int(percent * 1023 / 100))
`;

    const readMotorArgs = args => {
        const motor = normalizeMotor(args && args.MOTOR);
        const in1 = clampInteger(args && args.IN1, 0, 48, 16);
        const in2 = clampInteger(args && args.IN2, 0, 48, 17);
        const en = clampInteger(args && args.EN, 0, 48, 4);
        return {motor, in1, in2, en};
    };

    const readSpeed = args => clampInteger(args && args.SPEED, 0, 100, 80);

    const initCode = ({motor, in1, in2, en}) => {
        const variable = motorVariable(motor);
        return `from machine import Pin, PWM
${dutyHelper}if '${variable}' in globals():
    try:
        ${variable}[2].deinit()
    except:
        pass
${variable} = (Pin(${in1}, Pin.OUT), Pin(${in2}, Pin.OUT), PWM(Pin(${en}), freq=1000))
_ob_motor_duty(${variable}[2], 0)`;
    };

    const runCode = (motor, direction, speed) => {
        const variable = motorVariable(motor);
        return `${dutyHelper}if '${variable}' not in globals():
    raise RuntimeError('Motor ${motor} is not initialized')
if ${direction} >= 0:
    ${variable}[0].value(1)
    ${variable}[1].value(0)
else:
    ${variable}[0].value(0)
    ${variable}[1].value(1)
_ob_motor_duty(${variable}[2], ${speed})`;
    };

    const stopCode = motor => {
        const variable = motorVariable(motor);
        return `${dutyHelper}if '${variable}' not in globals():
    raise RuntimeError('Motor ${motor} is not initialized')
_ob_motor_duty(${variable}[2], 0)`;
    };

    const carDirections = {
        forward: [1, 1],
        backward: [-1, -1],
        left: [-1, 1],
        right: [1, -1]
    };

    return {
        espMotor_init: args => execLive(initCode(readMotorArgs(args))),

        espMotor_run: args => {
            const motor = normalizeMotor(args && args.MOTOR);
            const direction = args && String(args.DIR) === '-1' ? -1 : 1;
            const speed = readSpeed(args);
            return execLive(runCode(motor, direction, speed));
        },

        espMotor_stop: args => execLive(stopCode(normalizeMotor(args && args.MOTOR))),

        espMotor_carMove: args => {
            const action = normalizeAction(args && args.ACTION);
            const speed = readSpeed(args);
            const directions = carDirections[action];
            const code = `${runCode('A', directions[0], speed)}
${runCode('B', directions[1], speed)}`;
            return execLive(code);
        },

        espMotor_carStop: () => execLive(`${stopCode('A')}
${stopCode('B')}`)
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
