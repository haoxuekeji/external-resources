/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-control-regex */
/* eslint-disable quotes */
/* eslint-disable prefer-template */
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
    const text = String(output === null || typeof output === 'undefined' ? '' : output)
        .replace(/[\x00-\x04]/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
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

    const requireSynchronized = code => [
        "if '_ob_ntp_tz' not in globals():",
        "    raise RuntimeError('NTP time is not synchronized. Run the sync block first')",
        code
    ].join('\n');

    const fieldIndexes = {
        year: 0,
        month: 1,
        day: 2,
        hour: 3,
        minute: 4,
        second: 5,
        weekday: 6
    };

    return {
        espNtp_sync: args => {
            const timezone = clampInteger(args && args.TZ, -24, 24, 8);
            const code = [
                'import socket, struct, time, machine',
                '_ob_ntp_query = bytearray(48)',
                '_ob_ntp_query[0] = 0x1B',
                "_ob_ntp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)",
                'try:',
                '    _ob_ntp_socket.settimeout(3)',
                "    _ob_ntp_addr = socket.getaddrinfo('pool.ntp.org', 123)[0][-1]",
                '    _ob_ntp_socket.sendto(_ob_ntp_query, _ob_ntp_addr)',
                '    _ob_ntp_message = _ob_ntp_socket.recv(48)',
                'finally:',
                '    _ob_ntp_socket.close()',
                'if len(_ob_ntp_message) < 44:',
                "    raise OSError('NTP response is too short')",
                "_ob_ntp_value = struct.unpack('!I', _ob_ntp_message[40:44])[0]",
                'if _ob_ntp_value < 3913056000:',
                '    _ob_ntp_value += 0x100000000',
                '_ob_ntp_epoch = time.gmtime(0)[0]',
                'if _ob_ntp_epoch == 2000:',
                '    _ob_ntp_delta = 3155673600',
                'elif _ob_ntp_epoch == 1970:',
                '    _ob_ntp_delta = 2208988800',
                'else:',
                "    raise OSError('Unsupported MicroPython epoch')",
                '_ob_ntp_tm = time.gmtime(_ob_ntp_value - _ob_ntp_delta)',
                'machine.RTC().datetime((_ob_ntp_tm[0], _ob_ntp_tm[1], _ob_ntp_tm[2],',
                '    _ob_ntp_tm[6] + 1, _ob_ntp_tm[3], _ob_ntp_tm[4], _ob_ntp_tm[5], 0))',
                '_ob_ntp_tz = ' + timezone
            ].join('\n');
            return execLive(code, 12000);
        },

        espNtp_get: args => {
            const field = args && args.FIELD;
            const index = Object.prototype.hasOwnProperty.call(fieldIndexes, field) ?
                fieldIndexes[field] : 0;
            const value = field === 'weekday' ?
                'time.localtime(time.time() + _ob_ntp_tz * 3600)[6] + 1' :
                'time.localtime(time.time() + _ob_ntp_tz * 3600)[' + index + ']';
            return execLive(requireSynchronized('print(' + value + ')')).then(parseReporterNumber);
        }
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
