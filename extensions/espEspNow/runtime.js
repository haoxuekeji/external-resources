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
const ESPNOW_CLASS_SOURCE = `import network
import espnow

class _OBEspNow:
    BROADCAST = 'ff:ff:ff:ff:ff:ff'

    def __init__(self):
        self._sta = network.WLAN(network.STA_IF)
        self._sta.active(True)
        self._now = espnow.ESPNow()
        self._now.active(True)
        self._peers = set()
        self.last_message = ''
        self.last_sender = ''
        self.add_peer(self.BROADCAST)

    @staticmethod
    def _parse_mac(text):
        parts = str(text).strip().replace('-', ':').split(':')
        if len(parts) != 6:
            raise ValueError('MAC address must look like AA:BB:CC:DD:EE:FF')
        return bytes(int(part, 16) for part in parts)

    @staticmethod
    def _format_mac(raw):
        return ':'.join('%02X' % byte for byte in raw)

    def mac(self):
        return self._format_mac(self._sta.config('mac'))

    def add_peer(self, mac_text):
        raw = self._parse_mac(mac_text)
        if raw in self._peers:
            return
        try:
            self._now.add_peer(raw)
        except OSError:
            pass
        self._peers.add(raw)

    def send(self, mac_text, message):
        self.add_peer(mac_text)
        self._now.send(self._parse_mac(mac_text), str(message))

    def broadcast(self, message):
        self.send(self.BROADCAST, message)

    def poll(self):
        got = False
        while True:
            mac, msg = self._now.recv(0)
            if mac is None:
                return got
            self.last_sender = self._format_mac(mac)
            try:
                self.last_message = msg.decode()
            except UnicodeError:
                self.last_message = str(msg)
            got = True`;

const pythonString = value => JSON.stringify(
    value === null || typeof value === 'undefined' ? '' : String(value)
);

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

    const requireNow = code => `if '_ob_espnow' not in globals():
    raise RuntimeError('ESP-NOW is not initialized. Run the ESP-NOW init block first')
${code}`;

    // The "when message" hat is an edge-activated predicate the runtime polls
    // every frame. The REPL round trip is far slower than a frame, so the
    // predicate answers from this cache and refreshes it at most every 150ms.
    let pollInFlight = false;
    let lastPollAt = 0;
    let messagePending = false;

    const primitives = {
        espEspNow_init: () => {
            pollInFlight = false;
            messagePending = false;
            const code = `exec(${JSON.stringify(ESPNOW_CLASS_SOURCE)})
_ob_espnow = _OBEspNow()`;
            return execLive(code, 10000);
        },

        espEspNow_myMac: () => execLive(requireNow('print(_ob_espnow.mac())')).then(parseReporterString),

        espEspNow_send: args => {
            const msg = pythonString(args && args.MSG);
            const mac = pythonString(args && args.MAC);
            return execLive(requireNow(`_ob_espnow.send(${mac}, ${msg})`), 8000);
        },

        espEspNow_broadcast: args => {
            const msg = pythonString(args && args.MSG);
            return execLive(requireNow(`_ob_espnow.broadcast(${msg})`), 8000);
        },

        espEspNow_whenMessage: () => {
            const now = Date.now();
            if (!pollInFlight && now - lastPollAt >= 150) {
                pollInFlight = true;
                lastPollAt = now;
                // Silently answer 0 while uninitialized instead of raising on
                // every frame poll before the init block has run.
                execLive("print(1 if ('_ob_espnow' in globals() and _ob_espnow.poll()) else 0)", 3000)
                    .then(output => {
                        if (parseReporterString(output).slice(-1) === '1') {
                            messagePending = true;
                        }
                    })
                    .catch(() => {})
                    .then(() => {
                        pollInFlight = false;
                    });
            }
            if (messagePending) {
                messagePending = false;
                return true;
            }
            return false;
        },

        espEspNow_message: () => execLive(requireNow('print(_ob_espnow.last_message)')).then(parseReporterString),

        espEspNow_sender: () => execLive(requireNow('print(_ob_espnow.last_sender)')).then(parseReporterString)
    };

    Object.defineProperty(primitives, 'hats', {
        value: {
            espEspNow_whenMessage: {
                edgeActivated: true,
                restartExistingThreads: false
            }
        },
        enumerable: false
    });
    return primitives;
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
