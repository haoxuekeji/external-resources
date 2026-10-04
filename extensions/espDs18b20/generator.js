/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    // Inside an asyncio task (event hats / several begin stacks) the 750 ms
    // conversion wait must not block every other task; older base packages
    // have no isInAsyncTask and always generate plain sequential code.
    const inAsyncTask = block => typeof Blockly.Python.isInAsyncTask === 'function' &&
        Blockly.Python.isInAsyncTask(block);

    Blockly.Python.espDs18b20_read = function (block) {
        const pin = block.getFieldValue('PIN');

        Blockly.Python.imports_.espDs18b20_machine = 'from machine import Pin';
        Blockly.Python.imports_.espDs18b20 = 'import onewire, ds18x20';
        Blockly.Python.imports_.espDs18b20_time = 'import time';

        Blockly.Python.libraries_.espDs18b20 =
            `_ds_buses = {}\n` +
            `def _ob_ds18b20_sensor(pin):\n` +
            `    if pin not in _ds_buses:\n` +
            `        _ds_buses[pin] = ds18x20.DS18X20(onewire.OneWire(Pin(pin)))\n` +
            `    _ds = _ds_buses[pin]\n` +
            `    return _ds, _ds.scan()\n` +
            `def _ob_ds18b20(pin):\n` +
            `    _ds, _roms = _ob_ds18b20_sensor(pin)\n` +
            `    if not _roms:\n` +
            `        return -999\n` +
            `    _ds.convert_temp()\n` +
            `    time.sleep_ms(750)\n` +
            `    return _ds.read_temp(_roms[0])\n`;

        if (inAsyncTask(block)) {
            Blockly.Python.imports_.asyncio = 'import asyncio';
            Blockly.Python.libraries_.espDs18b20_async =
                `async def _ob_ds18b20_async(pin):\n` +
                `    _ds, _roms = _ob_ds18b20_sensor(pin)\n` +
                `    if not _roms:\n` +
                `        return -999\n` +
                `    _ds.convert_temp()\n` +
                `    await asyncio.sleep_ms(750)\n` +
                `    return _ds.read_temp(_roms[0])\n`;
            return [`(await _ob_ds18b20_async(${pin}))`, Blockly.Python.ORDER_ATOMIC];
        }

        return [`_ob_ds18b20(${pin})`, Blockly.Python.ORDER_ATOMIC];
    };

    return Blockly;
}

exports = registerGenerators;
