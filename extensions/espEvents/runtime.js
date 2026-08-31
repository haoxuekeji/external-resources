/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-control-regex */
/* eslint-disable no-var, indent */

// Every device extension runtime.js executes as a classic <script> on the
// same page, so top-level const/let declarations share one global lexical
// scope. Keep the whole body inside an IIFE and publish the register hook
// through a redeclarable `var` (see espMpu6050/runtime.js for the story).
var registerDeviceExtensionRuntime = (function () {

const parseReporterString = output => {
    const text = String(output === null || typeof output === 'undefined' ? '' : output)
        .replace(/[\x00-\x04]/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
    return text.replace(/^\s*>>> ?/gm, '').trim();
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

    // Hats are edge-activated predicates the runtime polls every frame. A REPL
    // round trip is far slower than a frame, so each predicate answers from a
    // cache that it refreshes at most every POLL_MS.
    const POLL_MS = 120;
    const TOUCH_THRESHOLD = 300;
    const btnState = {};   // pin -> {pressed, pending, inFlight, lastAt, inited}
    const touchState = {}; // pin -> {touched, pending, inFlight, lastAt, inited}
    const timerState = {}; // key  -> lastFireAt (ms since epoch)

    const refreshButton = pin => {
        const st = btnState[pin];
        const now = Date.now();
        if (st.inFlight || now - st.lastAt < POLL_MS) return;
        st.inFlight = true;
        st.lastAt = now;
        const setup = st.inited ? '' :
            `if '_ob_btn${pin}' not in globals():\n` +
            ` from machine import Pin\n` +
            ` _ob_btn${pin} = Pin(${pin}, Pin.IN, Pin.PULL_UP)\n`;
        execLive(`${setup}print(_ob_btn${pin}.value())`, 3000)
            .then(output => {
                st.inited = true;
                const pressed = parseReporterString(output).slice(-1) === '0';
                if (pressed && !st.pressed) st.pending = true;
                st.pressed = pressed;
            })
            .catch(() => {})
            .then(() => {
                st.inFlight = false;
            });
    };

    const refreshTouch = pin => {
        const st = touchState[pin];
        const now = Date.now();
        if (st.inFlight || now - st.lastAt < POLL_MS) return;
        st.inFlight = true;
        st.lastAt = now;
        const setup = st.inited ? '' :
            `if '_ob_touch${pin}' not in globals():\n` +
            ` from machine import Pin, TouchPad\n` +
            ` _ob_touch${pin} = TouchPad(Pin(${pin}))\n`;
        execLive(`${setup}print(_ob_touch${pin}.read())`, 3000)
            .then(output => {
                st.inited = true;
                const value = parseInt(parseReporterString(output), 10);
                const touched = Number.isFinite(value) && value < TOUCH_THRESHOLD;
                if (touched && !st.touched) st.pending = true;
                st.touched = touched;
            })
            .catch(() => {})
            .then(() => {
                st.inFlight = false;
            });
    };

    const primitives = {
        espEvents_whenButton: args => {
            const pin = String(args && args.PIN !== undefined ? args.PIN : '0');
            if (!btnState[pin]) {
                btnState[pin] = {pressed: false, pending: false, inFlight: false, lastAt: 0, inited: false};
            }
            refreshButton(pin);
            if (btnState[pin].pending) {
                btnState[pin].pending = false;
                return true;
            }
            return false;
        },

        espEvents_whenTouch: args => {
            const pin = String(args && args.TOUCH !== undefined ? args.TOUCH : '4');
            if (!touchState[pin]) {
                touchState[pin] = {touched: false, pending: false, inFlight: false, lastAt: 0, inited: false};
            }
            refreshTouch(pin);
            if (touchState[pin].pending) {
                touchState[pin].pending = false;
                return true;
            }
            return false;
        },

        espEvents_everyNSeconds: args => {
            let secs = parseFloat(args && args.N);
            if (!Number.isFinite(secs) || secs <= 0) secs = 1;
            const key = String(secs);
            const now = Date.now();
            if (timerState[key] === undefined) {
                // Anchor the first tick one interval into the future.
                timerState[key] = now;
                return false;
            }
            if (now - timerState[key] >= secs * 1000) {
                timerState[key] = now;
                return true;
            }
            return false;
        }
    };

    Object.defineProperty(primitives, 'hats', {
        value: {
            espEvents_whenButton: {edgeActivated: true, restartExistingThreads: false},
            espEvents_whenTouch: {edgeActivated: true, restartExistingThreads: false},
            espEvents_everyNSeconds: {edgeActivated: true, restartExistingThreads: false}
        },
        enumerable: false
    });
    return primitives;
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
