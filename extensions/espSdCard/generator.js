/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerGenerators (Blockly) {

    const ensureHelper = () => {
        Blockly.Python.imports_.espSdCard_machine = 'from machine import Pin, SPI';
        Blockly.Python.imports_.espSdCard = 'import sdcard, uos';

        Blockly.Python.libraries_.espSdCard_helpers =
            `def _ob_sd_path(name):\n` +
            `    name = str(name)\n` +
            `    if not name.startswith('/'):\n` +
            `        name = '/' + name\n` +
            `    return '/sd' + name\n` +
            `def _ob_sd_read(name):\n` +
            `    try:\n` +
            `        with open(_ob_sd_path(name)) as _f:\n` +
            `            return _f.read()\n` +
            `    except OSError:\n` +
            `        return ''\n` +
            `def _ob_sd_delete(name):\n` +
            `    try:\n` +
            `        uos.remove(_ob_sd_path(name))\n` +
            `    except OSError:\n` +
            `        pass\n`;
    };

    Blockly.Python.espSdCard_mount = function (block) {
        const sck = block.getFieldValue('SCK');
        const mosi = block.getFieldValue('MOSI');
        const miso = block.getFieldValue('MISO');
        const cs = block.getFieldValue('CS');

        ensureHelper();

        let code = `try:\n`;
        code += `    _sd = sdcard.SDCard(SPI(1, baudrate=1000000, sck=Pin(${sck}), mosi=Pin(${mosi}), miso=Pin(${miso})), Pin(${cs}))\n`;
        code += `    uos.mount(_sd, '/sd')\n`;
        code += `except OSError as _e:\n`;
        code += `    print('SD mount failed:', _e)\n`;
        return code;
    };

    Blockly.Python.espSdCard_appendLine = function (block) {
        const file = Blockly.Python.valueToCode(block, 'FILE', Blockly.Python.ORDER_ATOMIC) || `'data.txt'`;
        const data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC) || `''`;

        ensureHelper();

        let code = `try:\n`;
        code += `    with open(_ob_sd_path(${file}), 'a') as _f:\n`;
        code += `        _f.write(str(${data}) + '\\n')\n`;
        code += `except OSError as _e:\n`;
        code += `    print('SD write failed:', _e)\n`;
        return code;
    };

    Blockly.Python.espSdCard_readFile = function (block) {
        const file = Blockly.Python.valueToCode(block, 'FILE', Blockly.Python.ORDER_ATOMIC) || `'data.txt'`;

        ensureHelper();

        return [`_ob_sd_read(${file})`, Blockly.Python.ORDER_ATOMIC];
    };

    Blockly.Python.espSdCard_deleteFile = function (block) {
        const file = Blockly.Python.valueToCode(block, 'FILE', Blockly.Python.ORDER_ATOMIC) || `'data.txt'`;

        ensureHelper();

        return `_ob_sd_delete(${file})\n`;
    };

    return Blockly;
}

exports = registerGenerators;
