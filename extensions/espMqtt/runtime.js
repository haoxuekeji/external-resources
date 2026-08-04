/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-control-regex */
/* eslint-disable quotes */
/* eslint-disable prefer-template */

const MQTT_SOURCE = "import socket\nimport struct\nfrom binascii import hexlify\n\n\nclass MQTTException(Exception):\n    pass\n\n\nclass MQTTClient:\n    def __init__(\n        self,\n        client_id,\n        server,\n        port=0,\n        user=None,\n        password=None,\n        keepalive=0,\n        ssl=None,\n    ):\n        if port == 0:\n            port = 8883 if ssl else 1883\n        self.client_id = client_id\n        self.sock = None\n        self.server = server\n        self.port = port\n        self.ssl = ssl\n        self.pid = 0\n        self.cb = None\n        self.user = user\n        self.pswd = password\n        self.keepalive = keepalive\n        self.lw_topic = None\n        self.lw_msg = None\n        self.lw_qos = 0\n        self.lw_retain = False\n\n    def _send_str(self, s):\n        self.sock.write(struct.pack(\"!H\", len(s)))\n        self.sock.write(s)\n\n    def _recv_len(self):\n        n = 0\n        sh = 0\n        while 1:\n            b = self.sock.read(1)[0]\n            n |= (b & 0x7F) << sh\n            if not b & 0x80:\n                return n\n            sh += 7\n\n    def set_callback(self, f):\n        self.cb = f\n\n    def set_last_will(self, topic, msg, retain=False, qos=0):\n        assert 0 <= qos <= 2\n        assert topic\n        self.lw_topic = topic\n        self.lw_msg = msg\n        self.lw_qos = qos\n        self.lw_retain = retain\n\n    def connect(self, clean_session=True):\n        self.sock = socket.socket()\n        self.sock.settimeout(5)\n        addr = socket.getaddrinfo(self.server, self.port)[0][-1]\n        self.sock.connect(addr)\n        if self.ssl:\n            self.sock = self.ssl.wrap_socket(self.sock, server_hostname=self.server)\n        premsg = bytearray(b\"\\x10\\0\\0\\0\\0\\0\")\n        msg = bytearray(b\"\\x04MQTT\\x04\\x02\\0\\0\")\n\n        sz = 10 + 2 + len(self.client_id)\n        msg[6] = clean_session << 1\n        if self.user:\n            sz += 2 + len(self.user) + 2 + len(self.pswd)\n            msg[6] |= 0xC0\n        if self.keepalive:\n            assert self.keepalive < 65536\n            msg[7] |= self.keepalive >> 8\n            msg[8] |= self.keepalive & 0x00FF\n        if self.lw_topic:\n            sz += 2 + len(self.lw_topic) + 2 + len(self.lw_msg)\n            msg[6] |= 0x4 | (self.lw_qos & 0x1) << 3 | (self.lw_qos & 0x2) << 3\n            msg[6] |= self.lw_retain << 5\n\n        i = 1\n        while sz > 0x7F:\n            premsg[i] = (sz & 0x7F) | 0x80\n            sz >>= 7\n            i += 1\n        premsg[i] = sz\n\n        self.sock.write(premsg, i + 2)\n        self.sock.write(msg)\n        # print(hex(len(msg)), hexlify(msg, \":\"))\n        self._send_str(self.client_id)\n        if self.lw_topic:\n            self._send_str(self.lw_topic)\n            self._send_str(self.lw_msg)\n        if self.user:\n            self._send_str(self.user)\n            self._send_str(self.pswd)\n        resp = self.sock.read(4)\n        assert resp[0] == 0x20 and resp[1] == 0x02\n        if resp[3] != 0:\n            raise MQTTException(resp[3])\n        return resp[2] & 1\n\n    def disconnect(self):\n        self.sock.write(b\"\\xe0\\0\")\n        self.sock.close()\n\n    def ping(self):\n        self.sock.write(b\"\\xc0\\0\")\n\n    def publish(self, topic, msg, retain=False, qos=0):\n        pkt = bytearray(b\"\\x30\\0\\0\\0\")\n        pkt[0] |= qos << 1 | retain\n        sz = 2 + len(topic) + len(msg)\n        if qos > 0:\n            sz += 2\n        assert sz < 2097152\n        i = 1\n        while sz > 0x7F:\n            pkt[i] = (sz & 0x7F) | 0x80\n            sz >>= 7\n            i += 1\n        pkt[i] = sz\n        # print(hex(len(pkt)), hexlify(pkt, \":\"))\n        self.sock.write(pkt, i + 1)\n        self._send_str(topic)\n        if qos > 0:\n            self.pid += 1\n            pid = self.pid\n            struct.pack_into(\"!H\", pkt, 0, pid)\n            self.sock.write(pkt, 2)\n        self.sock.write(msg)\n        if qos == 1:\n            while 1:\n                op = self.wait_msg()\n                if op == 0x40:\n                    sz = self.sock.read(1)\n                    assert sz == b\"\\x02\"\n                    rcv_pid = self.sock.read(2)\n                    rcv_pid = rcv_pid[0] << 8 | rcv_pid[1]\n                    if pid == rcv_pid:\n                        return\n        elif qos == 2:\n            assert 0\n\n    def subscribe(self, topic, qos=0):\n        assert self.cb is not None, \"Subscribe callback is not set\"\n        pkt = bytearray(b\"\\x82\\0\\0\\0\")\n        self.pid += 1\n        struct.pack_into(\"!BH\", pkt, 1, 2 + 2 + len(topic) + 1, self.pid)\n        # print(hex(len(pkt)), hexlify(pkt, \":\"))\n        self.sock.write(pkt)\n        self._send_str(topic)\n        self.sock.write(qos.to_bytes(1, \"little\"))\n        while 1:\n            op = self.wait_msg()\n            if op == 0x90:\n                resp = self.sock.read(4)\n                # print(resp)\n                assert resp[1] == pkt[2] and resp[2] == pkt[3]\n                if resp[3] == 0x80:\n                    raise MQTTException(resp[3])\n                return\n\n    # Wait for a single incoming MQTT message and process it.\n    # Subscribed messages are delivered to a callback previously\n    # set by .set_callback() method. Other (internal) MQTT\n    # messages processed internally.\n    def wait_msg(self):\n        res = self.sock.read(1)\n        self.sock.setblocking(True)\n        if res is None:\n            return None\n        if res == b\"\":\n            raise OSError(-1)\n        if res == b\"\\xd0\":  # PINGRESP\n            sz = self.sock.read(1)[0]\n            assert sz == 0\n            return None\n        op = res[0]\n        if op & 0xF0 != 0x30:\n            return op\n        sz = self._recv_len()\n        topic_len = self.sock.read(2)\n        topic_len = (topic_len[0] << 8) | topic_len[1]\n        topic = self.sock.read(topic_len)\n        sz -= topic_len + 2\n        if op & 6:\n            pid = self.sock.read(2)\n            pid = pid[0] << 8 | pid[1]\n            sz -= 2\n        msg = self.sock.read(sz)\n        self.cb(topic, msg)\n        if op & 6 == 2:\n            pkt = bytearray(b\"\\x40\\x02\\0\\0\")\n            struct.pack_into(\"!H\", pkt, 2, pid)\n            self.sock.write(pkt)\n        elif op & 6 == 4:\n            assert 0\n        return op\n\n    # Checks whether a pending message from server is available.\n    # If not, returns immediately with None. Otherwise, does\n    # the same processing as wait_msg.\n    def check_msg(self):\n        self.sock.setblocking(False)\n        return self.wait_msg()";

const clampInteger = (value, min, max, fallback) => {
    const number = parseInt(value, 10);
    if (!Number.isFinite(number)) return fallback;
    return Math.max(min, Math.min(max, number));
};

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

const notifyMessageHat = (runtime, output) => {
    if (parseReporterString(output) === '1' && typeof runtime.startHats === 'function') {
        runtime.startHats('espMqtt_whenMessage');
    }
    return output;
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

    const requireClient = code => [
        "if '_ob_mqtt' not in globals() or not _ob_mqtt_connected:",
        "    raise RuntimeError('MQTT is not connected. Run the connect block first')",
        code
    ].join('\n');

    const loadSource = source => [
        "if '_ob_mqtt_library_loaded' not in globals():",
        '    exec(' + JSON.stringify(source) + ')',
        '    _ob_mqtt_library_loaded = True'
    ].join('\n');

    const topicString = args => pythonString(args && args.TOPIC);
    const messageString = args => pythonString(args && args.MSG);

    const primitives = {
        espMqtt_connect: args => {
            const hostValue = args && args.HOST ? String(args.HOST) : 'broker.emqx.io';
            const host = pythonString(hostValue);
            const port = clampInteger(args && args.PORT, 1, 65535, 1883);
            const code = [
                'import machine, ubinascii',
                loadSource(MQTT_SOURCE),
                'def _ob_mqtt_callback(_topic, _msg):',
                '    global _ob_mqtt_topic, _ob_mqtt_msg, _ob_mqtt_message_pending',
                '    try:',
                '        _ob_mqtt_topic = _topic.decode()',
                '    except Exception:',
                '        _ob_mqtt_topic = str(_topic)',
                '    try:',
                '        _ob_mqtt_msg = _msg.decode()',
                '    except Exception:',
                '        _ob_mqtt_msg = str(_msg)',
                '    _ob_mqtt_message_pending = True',
                "_ob_mqtt_topic = ''",
                "_ob_mqtt_msg = ''",
                '_ob_mqtt_message_pending = False',
                'try:',
                "    if '_ob_mqtt' in globals() and _ob_mqtt_connected:",
                '        _ob_mqtt.disconnect()',
                'except Exception:',
                '    pass',
                '_ob_mqtt_connected = False',
                "_ob_mqtt = MQTTClient('ob_' + ubinascii.hexlify(machine.unique_id()).decode(), " +
                    host + ', port=' + port + ', keepalive=30)',
                '_ob_mqtt.set_callback(_ob_mqtt_callback)',
                '_ob_mqtt.connect()',
                '_ob_mqtt_connected = True'
            ].join('\n');
            return execLive(code, 12000);
        },

        espMqtt_disconnect: () => {
            const code = [
                requireClient([
                    'try:',
                    '    _ob_mqtt.disconnect()',
                    'finally:',
                    '    _ob_mqtt_connected = False'
                ].join('\n'))
            ].join('\n');
            return execLive(code);
        },

        espMqtt_subscribe: args => {
            const code = requireClient([
                'try:',
                '    _ob_mqtt.subscribe(str(' + topicString(args) + ').encode())',
                'except Exception as _ob_error:',
                "    raise OSError('MQTT subscribe failed: %s' % _ob_error)"
            ].join('\n'));
            return execLive(code, 10000);
        },

        espMqtt_publish: args => {
            const code = requireClient([
                'try:',
                '    _ob_mqtt.publish(str(' + topicString(args) + ').encode(),',
                '        str(' + messageString(args) + ').encode())',
                'except Exception as _ob_error:',
                "    raise OSError('MQTT publish failed: %s' % _ob_error)"
            ].join('\n'));
            return execLive(code, 8000);
        },

        espMqtt_checkMsg: () => {
            const code = requireClient([
                'try:',
                '    _ob_mqtt_message_pending = False',
                '    _ob_mqtt.check_msg()',
                '    print(1 if _ob_mqtt_message_pending else 0)',
                'except Exception as _ob_error:',
                "    raise OSError('MQTT check failed: %s' % _ob_error)"
            ].join('\n'));
            return execLive(code, 5000).then(output => notifyMessageHat(runtime, output));
        },

        espMqtt_topic: () => execLive(requireClient(
            "print(globals().get('_ob_mqtt_topic', ''))"
        )).then(parseReporterString),

        espMqtt_message: () => execLive(requireClient(
            "print(globals().get('_ob_mqtt_msg', ''))"
        )).then(parseReporterString)
    };
    Object.defineProperty(primitives, 'hats', {
        value: {
            espMqtt_whenMessage: {
                edgeActivated: false,
                restartExistingThreads: true
            }
        },
        enumerable: false
    });
    return primitives;
}

exports = registerDeviceExtensionRuntime;
