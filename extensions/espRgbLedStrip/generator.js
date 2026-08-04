/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureHelper = () => {
        Blockly.Python.imports_.espRgbLedStrip_neopixel = 'import neopixel';
        Blockly.Python.imports_.espRgbLedStrip_machine = 'from machine import Pin';

        Blockly.Python.libraries_.espRgbLedStrip =
            `_ob_nps = {}\n` +
            `_ob_np_brt = {}\n` +
            `def _ob_np_get(pin, n=16):\n` +
            `    if pin not in _ob_nps:\n` +
            `        _ob_nps[pin] = neopixel.NeoPixel(Pin(pin), n)\n` +
            `        if pin not in _ob_np_brt:\n` +
            `            _ob_np_brt[pin] = 1.0\n` +
            `    return _ob_nps[pin]\n` +
            `def _ob_np_color(c):\n` +
            `    if isinstance(c, str):\n` +
            `        _v = int(c.lstrip('#'), 16)\n` +
            `        return ((_v >> 16) & 0xFF, (_v >> 8) & 0xFF, _v & 0xFF)\n` +
            `    if isinstance(c, (int, float)):\n` +
            `        _v = int(c)\n` +
            `        return ((_v >> 16) & 0xFF, (_v >> 8) & 0xFF, _v & 0xFF)\n` +
            `    return tuple(c)\n` +
            `def _ob_np_scale(pin, c):\n` +
            `    _b = _ob_np_brt.get(pin, 1.0)\n` +
            `    return (int(c[0] * _b), int(c[1] * _b), int(c[2] * _b))\n` +
            `def _ob_np_set(pin, i, c):\n` +
            `    _np = _ob_np_get(pin)\n` +
            `    _i = int(i) - 1\n` +
            `    if 0 <= _i < _np.n:\n` +
            `        _np[_i] = _ob_np_scale(pin, _ob_np_color(c))\n` +
            `        _np.write()\n` +
            `def _ob_np_fill(pin, c):\n` +
            `    _np = _ob_np_get(pin)\n` +
            `    _np.fill(_ob_np_scale(pin, _ob_np_color(c)))\n` +
            `    _np.write()\n`;
    };

    // The colour_picker shadow emits a bare "#rrggbb" literal, convert it to a
    // python tuple at generation time; other reporters are converted at runtime.
    const colourToPython = raw => {
        const code = String(raw || '').trim();
        const matches = code.match(/^#([0-9a-fA-F]{6})$/);
        if (matches) {
            const value = parseInt(matches[1], 16);
            return `(${(value >> 16) & 0xFF}, ${(value >> 8) & 0xFF}, ${value & 0xFF})`;
        }
        if (!code) {
            return '(255, 255, 255)';
        }
        return `_ob_np_color(${code})`;
    };

    Blockly.Python.espRgbLedStrip_init = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');
        const len = Blockly.Python.valueToCode(block, 'LEN', Blockly.Python.ORDER_ATOMIC) || '16';

        return `_ob_nps[${pin}] = neopixel.NeoPixel(Pin(${pin}), int(${len}))\n` +
            `_ob_np_brt.setdefault(${pin}, 1.0)\n`;
    };

    Blockly.Python.espRgbLedStrip_setPixelColor = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');
        const no = Blockly.Python.valueToCode(block, 'NO', Blockly.Python.ORDER_ATOMIC) || '1';
        const colour = colourToPython(Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC));

        return `_ob_np_set(${pin}, ${no}, ${colour})\n`;
    };

    Blockly.Python.espRgbLedStrip_fill = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');
        const colour = colourToPython(Blockly.Python.valueToCode(block, 'COLOR', Blockly.Python.ORDER_ATOMIC));

        return `_ob_np_fill(${pin}, ${colour})\n`;
    };

    Blockly.Python.espRgbLedStrip_setBrightness = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');
        const brightness = Blockly.Python.valueToCode(block, 'BRT', Blockly.Python.ORDER_ATOMIC) || '100';

        return `_ob_np_brt[${pin}] = min(100, max(0, int(${brightness}))) / 100\n`;
    };

    Blockly.Python.espRgbLedStrip_clear = function (block) {
        ensureHelper();
        const pin = block.getFieldValue('PIN');

        return `_ob_np_fill(${pin}, (0, 0, 0))\n`;
    };

    return Blockly;
}

exports = registerGenerators;
