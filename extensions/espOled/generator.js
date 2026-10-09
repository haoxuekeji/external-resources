/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    Blockly.Python.espOled_init = function (block) {
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');
        // 地址：auto = 扫描/探测自动选可用地址（默认）；0x3C / 0x3D = 直接用所选地址。
        const addr = block.getFieldValue('ADDR') || 'auto';

        Blockly.Python.imports_.espOled_machine = 'from machine import Pin, SoftI2C';
        Blockly.Python.imports_.espOled_time = 'import time';
        Blockly.Python.imports_.espOled = 'import ssd1306';
        // SSD1306 modules ship as 0x3C or 0x3D. Resolve the address
        // robustly (same policy as the realtime runtime
        // _OBSSD1306._resolve_addr):
        //   1. Retry the scan a few times with a short settle - at cold
        //      boot the panel may not answer the very first scan yet, and
        //      a momentary empty scan used to fall back to 0x3C and brick a
        //      0x3D-only screen (ENODEV on main.py at boot).
        //   2. If the scan stays empty/odd, probe 0x3C and 0x3D directly
        //      with a zero-length write and use whichever ACKs, instead of
        //      blindly assuming 0x3C.
        //   3. Only when neither address answers do we raise a clear error.
        Blockly.Python.customFunctions_.espOled_addr = `def _oled_addr(i2c):
    devices = []
    for _ in range(3):
        try:
            devices = i2c.scan()
        except Exception:
            devices = []
        if 0x3C in devices or 0x3D in devices:
            break
        time.sleep_ms(50)
    for address in (0x3C, 0x3D):
        if address in devices:
            return address
    for address in (0x3C, 0x3D):
        try:
            i2c.writeto(address, b'')
            return address
        except Exception:
            pass
    raise OSError('SSD1306 OLED not found on SDA/SCL (addr 0x3C/0x3D)')
`;

        // freq matches the realtime runtime so both modes drive the same
        // screen with identical bus timing.
        // `global`: in asyncio multi-task mode (event hats / several begin
        // stacks) this runs inside one `async def` task while other tasks and
        // event handlers draw on the same screen; a bare assignment would only
        // bind a local and every other task would hit NameError on _oled.
        const addrExpr = addr === 'auto' ? '_oled_addr(_oled_i2c)' : addr;
        return `global _oled_i2c, _oled\n` +
            `_oled_i2c = SoftI2C(sda=Pin(${sda}), scl=Pin(${scl}), freq=400000)\n` +
            `_oled = ssd1306.SSD1306_I2C(128, 64, _oled_i2c, addr=${addrExpr})\n`;
    };

    Blockly.Python.espOled_text = function (block) {
        const text = Blockly.Python.valueToCode(block, 'TEXT', Blockly.Python.ORDER_ATOMIC) || `''`;
        const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
        const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
        return `_oled.text(str(${text}), int(${x}), int(${y}))\n`;
    };

    Blockly.Python.espOled_pixel = function (block) {
        const x = Blockly.Python.valueToCode(block, 'X', Blockly.Python.ORDER_ATOMIC) || '0';
        const y = Blockly.Python.valueToCode(block, 'Y', Blockly.Python.ORDER_ATOMIC) || '0';
        return `_oled.pixel(int(${x}), int(${y}), 1)\n`;
    };

    Blockly.Python.espOled_line = function (block) {
        const x1 = Blockly.Python.valueToCode(block, 'X1', Blockly.Python.ORDER_ATOMIC) || '0';
        const y1 = Blockly.Python.valueToCode(block, 'Y1', Blockly.Python.ORDER_ATOMIC) || '0';
        const x2 = Blockly.Python.valueToCode(block, 'X2', Blockly.Python.ORDER_ATOMIC) || '0';
        const y2 = Blockly.Python.valueToCode(block, 'Y2', Blockly.Python.ORDER_ATOMIC) || '0';
        return `_oled.line(int(${x1}), int(${y1}), int(${x2}), int(${y2}), 1)\n`;
    };

    Blockly.Python.espOled_clear = function () {
        return `_oled.fill(0)\n`;
    };

    Blockly.Python.espOled_show = function () {
        return `_oled.show()\n`;
    };

    return Blockly;
}

exports = registerGenerators;
