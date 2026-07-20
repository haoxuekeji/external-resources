/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureHelper = () => {
        Blockly.Python.imports_.espHttp = 'import requests';
        Blockly.Python.variables_._http_status = `_http_status = 0`;
        Blockly.Python.variables_._http_body = `_http_body = ''`;
        Blockly.Python.libraries_.espHttp =
            `def _ob_http(method, url, data=None):\n` +
            `    global _http_status, _http_body\n` +
            `    try:\n` +
            `        _r = requests.request(method, url, data=data)\n` +
            `        _http_status = _r.status_code\n` +
            `        _http_body = _r.text\n` +
            `        _r.close()\n` +
            `    except Exception as _e:\n` +
            `        _http_status = -1\n` +
            `        _http_body = str(_e)\n`;
    };

    Blockly.Python.espHttp_get = function (block) {
        ensureHelper();
        const url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_ob_http('GET', str(${url}))\n`;
    };

    Blockly.Python.espHttp_post = function (block) {
        ensureHelper();
        const url = Blockly.Python.valueToCode(block, 'URL', Blockly.Python.ORDER_ATOMIC) || `''`;
        const data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || `''`;
        return `_ob_http('POST', str(${url}), str(${data}))\n`;
    };

    Blockly.Python.espHttp_statusCode = function () {
        return ['_http_status', Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.espHttp_response = function () {
        return ['_http_body', Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
