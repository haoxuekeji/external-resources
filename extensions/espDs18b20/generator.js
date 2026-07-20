/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espDs18b20_read = function (block) {
        const pin = block.getFieldValue('PIN');

        Blockly.Python.imports_.espDs18b20_machine = 'from machine import Pin';
        Blockly.Python.imports_.espDs18b20 = 'import onewire, ds18x20';
        Blockly.Python.imports_.espDs18b20_time = 'import time';

        Blockly.Python.libraries_.espDs18b20 =
            `_ds_buses = {}\n` +
            `def _ob_ds18b20(pin):\n` +
            `    if pin not in _ds_buses:\n` +
            `        _ds_buses[pin] = ds18x20.DS18X20(onewire.OneWire(Pin(pin)))\n` +
            `    _ds = _ds_buses[pin]\n` +
            `    _roms = _ds.scan()\n` +
            `    if not _roms:\n` +
            `        return -999\n` +
            `    _ds.convert_temp()\n` +
            `    time.sleep_ms(750)\n` +
            `    return _ds.read_temp(_roms[0])\n`;

        return [`_ob_ds18b20(${pin})`, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
