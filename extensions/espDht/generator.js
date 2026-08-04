/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espDht_read = function (block) {
        const model = block.getFieldValue('TYPE');
        const pin = block.getFieldValue('PIN');
        const data = block.getFieldValue('DATA') === 'humidity' ? 'h' : 't';

        Blockly.Python.imports_.espDht_dht = 'import dht';
        Blockly.Python.imports_.espDht_time = 'import time';
        Blockly.Python.imports_.espDht_machine = 'from machine import Pin';

        // DHT sensors need a minimum sampling interval (1s for DHT11, 2s for
        // DHT22), so the last reading is cached and reused inside that window.
        Blockly.Python.libraries_.espDht =
            `_ob_dht_objs = {}\n` +
            `_ob_dht_time = {}\n` +
            `def _ob_dht(pin, model, what):\n` +
            `    _key = (pin, model)\n` +
            `    if _key not in _ob_dht_objs:\n` +
            `        _ob_dht_objs[_key] = dht.DHT22(Pin(pin)) if model == 22 else dht.DHT11(Pin(pin))\n` +
            `        _ob_dht_time[_key] = None\n` +
            `    _d = _ob_dht_objs[_key]\n` +
            `    _now = time.ticks_ms()\n` +
            `    _gap = 2000 if model == 22 else 1000\n` +
            `    if _ob_dht_time[_key] is None or time.ticks_diff(_now, _ob_dht_time[_key]) >= _gap:\n` +
            `        try:\n` +
            `            _d.measure()\n` +
            `            _ob_dht_time[_key] = _now\n` +
            `        except OSError:\n` +
            `            if _ob_dht_time[_key] is None:\n` +
            `                return -999\n` +
            `    return _d.temperature() if what == 't' else _d.humidity()\n`;

        return [`_ob_dht(${pin}, ${model}, '${data}')`, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
