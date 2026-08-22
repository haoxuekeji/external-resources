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
const REQUESTS_SOURCE = "import socket\n\n\ndef _ob_to_bytes(value):\n    if isinstance(value, str):\n        return value.encode()\n    return value\n\n\nclass Response:\n    def __init__(self, f):\n        self.raw = f\n        self.encoding = \"utf-8\"\n        self._cached = None\n\n    def close(self):\n        if self.raw:\n            self.raw.close()\n            self.raw = None\n        self._cached = None\n\n    @property\n    def content(self):\n        if self._cached is None:\n            try:\n                self._cached = self.raw.read()\n            finally:\n                self.raw.close()\n                self.raw = None\n        return self._cached\n\n    @property\n    def text(self):\n        return str(self.content, self.encoding)\n\n    def json(self):\n        import json\n\n        return json.loads(self.content)\n\n\ndef request(\n    method,\n    url,\n    data=None,\n    json=None,\n    headers=None,\n    stream=None,\n    auth=None,\n    timeout=None,\n    parse_headers=True,\n):\n    if headers is None:\n        headers = {}\n\n    redirect = None  # redirection url, None means no redirection\n    chunked_data = data and getattr(data, \"__next__\", None) and not getattr(data, \"__len__\", None)\n    if isinstance(data, str):\n        data = data.encode()\n\n    if auth is not None:\n        import binascii\n\n        username, password = auth\n        formated = b\"{}:{}\".format(username, password)\n        formated = str(binascii.b2a_base64(formated)[:-1], \"ascii\")\n        headers[\"Authorization\"] = \"Basic {}\".format(formated)\n\n    try:\n        proto, dummy, host, path = url.split(\"/\", 3)\n    except ValueError:\n        proto, dummy, host = url.split(\"/\", 2)\n        path = \"\"\n    if proto == \"http:\":\n        port = 80\n    elif proto == \"https:\":\n        import tls\n\n        port = 443\n    else:\n        raise ValueError(\"Unsupported protocol: \" + proto)\n\n    if \":\" in host:\n        host, port = host.split(\":\", 1)\n        port = int(port)\n\n    ai = socket.getaddrinfo(host, port, 0, socket.SOCK_STREAM)\n    ai = ai[0]\n\n    resp_d = None\n    if parse_headers is not False:\n        resp_d = {}\n\n    s = socket.socket(ai[0], socket.SOCK_STREAM, ai[2])\n\n    if timeout is not None:\n        # Note: settimeout is not supported on all platforms, will raise\n        # an AttributeError if not available.\n        s.settimeout(timeout)\n\n    try:\n        s.connect(ai[-1])\n        if proto == \"https:\":\n            context = tls.SSLContext(tls.PROTOCOL_TLS_CLIENT)\n            context.verify_mode = tls.CERT_NONE\n            s = context.wrap_socket(s, server_hostname=host)\n        s.write((\"%s /%s HTTP/1.0\\r\\n\" % (method, path)).encode())\n\n        if \"Host\" not in headers:\n            headers[\"Host\"] = host\n\n        if json is not None:\n            assert data is None\n            from json import dumps\n\n            data = dumps(json)\n\n            if \"Content-Type\" not in headers:\n                headers[\"Content-Type\"] = \"application/json\"\n\n        if data:\n            if chunked_data:\n                if \"Transfer-Encoding\" not in headers and \"Content-Length\" not in headers:\n                    headers[\"Transfer-Encoding\"] = \"chunked\"\n            elif \"Content-Length\" not in headers:\n                headers[\"Content-Length\"] = str(len(data))\n\n        if \"Connection\" not in headers:\n            headers[\"Connection\"] = \"close\"\n\n        # Iterate over keys to avoid tuple alloc\n        for k in headers:\n            s.write(_ob_to_bytes(k))\n            s.write(b\": \")\n            s.write(_ob_to_bytes(headers[k]))\n            s.write(b\"\\r\\n\")\n\n        s.write(b\"\\r\\n\")\n\n        if data:\n            if chunked_data:\n                if headers.get(\"Transfer-Encoding\", None) == \"chunked\":\n                    for chunk in data:\n                        s.write(b\"%x\\r\\n\" % len(chunk))\n                        s.write(chunk)\n                        s.write(b\"\\r\\n\")\n                    s.write(b\"0\\r\\n\\r\\n\")\n                else:\n                    for chunk in data:\n                        s.write(chunk)\n            else:\n                s.write(data)\n\n        l = s.readline()\n        # print(l)\n        l = l.split(None, 2)\n        if len(l) < 2:\n            # Invalid response\n            raise ValueError(\"HTTP error: BadStatusLine:\\n%s\" % l)\n        status = int(l[1])\n        reason = \"\"\n        if len(l) > 2:\n            reason = l[2].rstrip()\n        while True:\n            l = s.readline()\n            if not l or l == b\"\\r\\n\":\n                break\n            # print(l)\n            if l.startswith(b\"Transfer-Encoding:\"):\n                if b\"chunked\" in l:\n                    raise ValueError(\"Unsupported \" + str(l, \"utf-8\"))\n            elif l.startswith(b\"Location:\") and not 200 <= status <= 299:\n                if status in [301, 302, 303, 307, 308]:\n                    redirect = str(l[10:-2], \"utf-8\")\n                else:\n                    raise NotImplementedError(\"Redirect %d not yet supported\" % status)\n            if parse_headers is False:\n                pass\n            elif parse_headers is True:\n                l = str(l, \"utf-8\")\n                k, v = l.split(\":\", 1)\n                resp_d[k] = v.strip()\n            else:\n                parse_headers(l, resp_d)\n    except OSError:\n        s.close()\n        raise\n\n    if redirect:\n        s.close()\n        if status in [301, 302, 303]:\n            return request(\"GET\", redirect, None, None, headers, stream)\n        else:\n            return request(method, redirect, data, json, headers, stream)\n    else:\n        resp = Response(s)\n        resp.status_code = status\n        resp.reason = reason\n        if resp_d is not None:\n            resp.headers = resp_d\n        return resp\n\n\ndef head(url, **kw):\n    return request(\"HEAD\", url, **kw)\n\n\ndef get(url, **kw):\n    return request(\"GET\", url, **kw)\n\n\ndef post(url, **kw):\n    return request(\"POST\", url, **kw)\n\n\ndef put(url, **kw):\n    return request(\"PUT\", url, **kw)\n\n\ndef patch(url, **kw):\n    return request(\"PATCH\", url, **kw)\n\n\ndef delete(url, **kw):\n    return request(\"DELETE\", url, **kw)";

const pythonString = value => JSON.stringify(
    value === null || typeof value === 'undefined' ? '' : String(value)
);

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

    const requestCode = (method, url, data) => {
        const source = JSON.stringify(REQUESTS_SOURCE);
        const request = method === 'GET' ?
            'request("GET", ' + url + ', data=None, timeout=5)' :
            'request("POST", ' + url + ', data=str(' + data + ').encode(), timeout=5)';
        return [
            "if '_ob_http_requests_loaded' not in globals():",
            '    exec(' + source + ')',
            '    _ob_http_requests_loaded = True',
            '_ob_http_status = 0',
            "_ob_http_body = ''",
            '_ob_http_response = None',
            'try:',
            '    _ob_http_response = ' + request,
            '    _ob_http_status = int(_ob_http_response.status_code)',
            '    _ob_http_body = _ob_http_response.text',
            'except Exception as _ob_error:',
            '    _ob_http_status = -1',
            "    _ob_http_body = 'HTTP request failed: ' + str(_ob_error)",
            'finally:',
            '    if _ob_http_response is not None:',
            '        try:',
            '            _ob_http_response.close()',
            '        except Exception:',
            '            pass',
            '        _ob_http_response = None'
        ].join('\n');
    };

    return {
        espHttp_get: args => {
            const url = pythonString(args && args.URL);
            return execLive(requestCode('GET', url, 'None'), 12000);
        },

        espHttp_post: args => {
            const url = pythonString(args && args.URL);
            const data = pythonString(args && args.DATA);
            return execLive(requestCode('POST', url, data), 12000);
        },

        espHttp_statusCode: () =>
            execLive("print(globals().get('_ob_http_status', 0))").then(parseReporterNumber),

        espHttp_response: () =>
            execLive("print(globals().get('_ob_http_body', ''))").then(parseReporterString)
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
