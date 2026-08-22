/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
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
const SDCARD_SOURCE = "\"\"\"\nMicroPython driver for SD cards using SPI bus.\n\nRequires an SPI bus and a CS pin.  Provides readblocks and writeblocks\nmethods so the device can be mounted as a filesystem.\n\nExample usage on pyboard:\n\n    import pyb, sdcard, os\n    sd = sdcard.SDCard(pyb.SPI(1), pyb.Pin.board.X5)\n    pyb.mount(sd, '/sd2')\n    os.listdir('/')\n\nExample usage on ESP8266:\n\n    import machine, sdcard, os\n    sd = sdcard.SDCard(machine.SPI(1), machine.Pin(15))\n    os.mount(sd, '/sd')\n    os.listdir('/')\n\n\"\"\"\n\nfrom micropython import const\nimport time\n\n\n_CMD_TIMEOUT = const(100)\n\n_R1_IDLE_STATE = const(1 << 0)\n# R1_ERASE_RESET = const(1 << 1)\n_R1_ILLEGAL_COMMAND = const(1 << 2)\n# R1_COM_CRC_ERROR = const(1 << 3)\n# R1_ERASE_SEQUENCE_ERROR = const(1 << 4)\n# R1_ADDRESS_ERROR = const(1 << 5)\n# R1_PARAMETER_ERROR = const(1 << 6)\n_TOKEN_CMD25 = const(0xFC)\n_TOKEN_STOP_TRAN = const(0xFD)\n_TOKEN_DATA = const(0xFE)\n\n\nclass SDCard:\n    def __init__(self, spi, cs, baudrate=1320000):\n        self.spi = spi\n        self.cs = cs\n\n        self.cmdbuf = bytearray(6)\n        self.dummybuf = bytearray(512)\n        self.tokenbuf = bytearray(1)\n        for i in range(512):\n            self.dummybuf[i] = 0xFF\n        self.dummybuf_memoryview = memoryview(self.dummybuf)\n\n        # initialise the card\n        self.init_card(baudrate)\n\n    def init_spi(self, baudrate):\n        try:\n            master = self.spi.MASTER\n        except AttributeError:\n            # on ESP8266\n            self.spi.init(baudrate=baudrate, phase=0, polarity=0)\n        else:\n            # on pyboard\n            self.spi.init(master, baudrate=baudrate, phase=0, polarity=0)\n\n    def init_card(self, baudrate):\n        # init CS pin\n        self.cs.init(self.cs.OUT, value=1)\n\n        # init SPI bus; use low data rate for initialisation\n        self.init_spi(100000)\n\n        # clock card at least 100 cycles with cs high\n        for i in range(16):\n            self.spi.write(b\"\\xff\")\n\n        # CMD0: init card; should return _R1_IDLE_STATE (allow 5 attempts)\n        for _ in range(5):\n            if self.cmd(0, 0, 0x95) == _R1_IDLE_STATE:\n                break\n        else:\n            raise OSError(\"no SD card\")\n\n        # CMD8: determine card version\n        r = self.cmd(8, 0x01AA, 0x87, 4)\n        if r == _R1_IDLE_STATE:\n            self.init_card_v2()\n        elif r == (_R1_IDLE_STATE | _R1_ILLEGAL_COMMAND):\n            self.init_card_v1()\n        else:\n            raise OSError(\"couldn't determine SD card version\")\n\n        # get the number of sectors\n        # CMD9: response R2 (R1 byte + 16-byte block read)\n        if self.cmd(9, 0, 0, 0, False) != 0:\n            raise OSError(\"no response from SD card\")\n        csd = bytearray(16)\n        self.readinto(csd)\n        if csd[0] & 0xC0 == 0x40:  # CSD version 2.0\n            self.sectors = ((csd[8] << 8 | csd[9]) + 1) * 1024\n        elif csd[0] & 0xC0 == 0x00:  # CSD version 1.0 (old, <=2GB)\n            c_size = (csd[6] & 0b11) << 10 | csd[7] << 2 | csd[8] >> 6\n            c_size_mult = (csd[9] & 0b11) << 1 | csd[10] >> 7\n            read_bl_len = csd[5] & 0b1111\n            capacity = (c_size + 1) * (2 ** (c_size_mult + 2)) * (2**read_bl_len)\n            self.sectors = capacity // 512\n        else:\n            raise OSError(\"SD card CSD format not supported\")\n        # print('sectors', self.sectors)\n\n        # CMD16: set block length to 512 bytes\n        if self.cmd(16, 512, 0) != 0:\n            raise OSError(\"can't set 512 block size\")\n\n        # set to high data rate now that it's initialised\n        self.init_spi(baudrate)\n\n    def init_card_v1(self):\n        for i in range(_CMD_TIMEOUT):\n            time.sleep_ms(50)\n            self.cmd(55, 0, 0)\n            if self.cmd(41, 0, 0) == 0:\n                # SDSC card, uses byte addressing in read/write/erase commands\n                self.cdv = 512\n                # print(\"[SDCard] v1 card\")\n                return\n        raise OSError(\"timeout waiting for v1 card\")\n\n    def init_card_v2(self):\n        for i in range(_CMD_TIMEOUT):\n            time.sleep_ms(50)\n            self.cmd(58, 0, 0, 4)\n            self.cmd(55, 0, 0)\n            if self.cmd(41, 0x40000000, 0) == 0:\n                self.cmd(58, 0, 0, -4)  # 4-byte response, negative means keep the first byte\n                ocr = self.tokenbuf[0]  # get first byte of response, which is OCR\n                if not ocr & 0x40:\n                    # SDSC card, uses byte addressing in read/write/erase commands\n                    self.cdv = 512\n                else:\n                    # SDHC/SDXC card, uses block addressing in read/write/erase commands\n                    self.cdv = 1\n                # print(\"[SDCard] v2 card\")\n                return\n        raise OSError(\"timeout waiting for v2 card\")\n\n    def cmd(self, cmd, arg, crc, final=0, release=True, skip1=False):\n        self.cs(0)\n\n        # create and send the command\n        buf = self.cmdbuf\n        buf[0] = 0x40 | cmd\n        buf[1] = arg >> 24\n        buf[2] = arg >> 16\n        buf[3] = arg >> 8\n        buf[4] = arg\n        buf[5] = crc\n        self.spi.write(buf)\n\n        if skip1:\n            self.spi.readinto(self.tokenbuf, 0xFF)\n\n        # wait for the response (response[7] == 0)\n        for i in range(_CMD_TIMEOUT):\n            self.spi.readinto(self.tokenbuf, 0xFF)\n            response = self.tokenbuf[0]\n            if not (response & 0x80):\n                # this could be a big-endian integer that we are getting here\n                # if final<0 then store the first byte to tokenbuf and discard the rest\n                if final < 0:\n                    self.spi.readinto(self.tokenbuf, 0xFF)\n                    final = -1 - final\n                for j in range(final):\n                    self.spi.write(b\"\\xff\")\n                if release:\n                    self.cs(1)\n                    self.spi.write(b\"\\xff\")\n                return response\n\n        # timeout\n        self.cs(1)\n        self.spi.write(b\"\\xff\")\n        return -1\n\n    def readinto(self, buf):\n        self.cs(0)\n\n        # read until start byte (0xff)\n        for i in range(_CMD_TIMEOUT):\n            self.spi.readinto(self.tokenbuf, 0xFF)\n            if self.tokenbuf[0] == _TOKEN_DATA:\n                break\n            time.sleep_ms(1)\n        else:\n            self.cs(1)\n            raise OSError(\"timeout waiting for response\")\n\n        # read data\n        mv = self.dummybuf_memoryview\n        if len(buf) != len(mv):\n            mv = mv[: len(buf)]\n        self.spi.write_readinto(mv, buf)\n\n        # read checksum\n        self.spi.write(b\"\\xff\")\n        self.spi.write(b\"\\xff\")\n\n        self.cs(1)\n        self.spi.write(b\"\\xff\")\n\n    def write(self, token, buf):\n        self.cs(0)\n\n        # send: start of block, data, checksum\n        self.spi.read(1, token)\n        self.spi.write(buf)\n        self.spi.write(b\"\\xff\")\n        self.spi.write(b\"\\xff\")\n\n        # check the response\n        if (self.spi.read(1, 0xFF)[0] & 0x1F) != 0x05:\n            self.cs(1)\n            self.spi.write(b\"\\xff\")\n            return\n\n        # wait for write to finish\n        while self.spi.read(1, 0xFF)[0] == 0:\n            pass\n\n        self.cs(1)\n        self.spi.write(b\"\\xff\")\n\n    def write_token(self, token):\n        self.cs(0)\n        self.spi.read(1, token)\n        self.spi.write(b\"\\xff\")\n        # wait for write to finish\n        while self.spi.read(1, 0xFF)[0] == 0x00:\n            pass\n\n        self.cs(1)\n        self.spi.write(b\"\\xff\")\n\n    def readblocks(self, block_num, buf):\n        # workaround for shared bus, required for (at least) some Kingston\n        # devices, ensure MOSI is high before starting transaction\n        self.spi.write(b\"\\xff\")\n\n        nblocks = len(buf) // 512\n        assert nblocks and not len(buf) % 512, \"Buffer length is invalid\"\n        if nblocks == 1:\n            # CMD17: set read address for single block\n            if self.cmd(17, block_num * self.cdv, 0, release=False) != 0:\n                # release the card\n                self.cs(1)\n                raise OSError(5)  # EIO\n            # receive the data and release card\n            self.readinto(buf)\n        else:\n            # CMD18: set read address for multiple blocks\n            if self.cmd(18, block_num * self.cdv, 0, release=False) != 0:\n                # release the card\n                self.cs(1)\n                raise OSError(5)  # EIO\n            offset = 0\n            mv = memoryview(buf)\n            while nblocks:\n                # receive the data and release card\n                self.readinto(mv[offset : offset + 512])\n                offset += 512\n                nblocks -= 1\n            if self.cmd(12, 0, 0xFF, skip1=True):\n                raise OSError(5)  # EIO\n\n    def writeblocks(self, block_num, buf):\n        # workaround for shared bus, required for (at least) some Kingston\n        # devices, ensure MOSI is high before starting transaction\n        self.spi.write(b\"\\xff\")\n\n        nblocks, err = divmod(len(buf), 512)\n        assert nblocks and not err, \"Buffer length is invalid\"\n        if nblocks == 1:\n            # CMD24: set write address for single block\n            if self.cmd(24, block_num * self.cdv, 0) != 0:\n                raise OSError(5)  # EIO\n\n            # send the data\n            self.write(_TOKEN_DATA, buf)\n        else:\n            # CMD25: set write address for first block\n            if self.cmd(25, block_num * self.cdv, 0) != 0:\n                raise OSError(5)  # EIO\n            # send the data\n            offset = 0\n            mv = memoryview(buf)\n            while nblocks:\n                self.write(_TOKEN_CMD25, mv[offset : offset + 512])\n                offset += 512\n                nblocks -= 1\n            self.write_token(_TOKEN_STOP_TRAN)\n\n    def ioctl(self, op, arg):\n        if op == 4:  # get number of blocks\n            return self.sectors\n        if op == 5:  # get block size in bytes\n            return 512";

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

    const sdHelpers = [
        "def _ob_sd_path(name):",
        "    name = str(name).replace('\\\\', '/')",
        "    if not name.startswith('/'):",
        "        name = '/' + name",
        "    parts = [part for part in name.split('/') if part]",
        "    if any(part == '..' for part in parts):",
        "        raise ValueError('SD file path cannot contain ..')",
        "    return '/sd/' + '/'.join(parts)",
        ""
    ].join('\n');

    const requireMounted = [
        "if '_ob_sd_mounted' not in globals() or not _ob_sd_mounted:",
        "    raise RuntimeError('SD card is not mounted. Run the SD mount block first')"
    ].join('\n');

    const withMounted = code => requireMounted + '\n' + code;

    return {
        espSdCard_mount: args => {
            const sck = clampInteger(args && args.SCK, 0, 48, 18);
            const mosi = clampInteger(args && args.MOSI, 0, 48, 23);
            const miso = clampInteger(args && args.MISO, 0, 48, 19);
            const cs = clampInteger(args && args.CS, 0, 48, 5);
            const source = JSON.stringify(SDCARD_SOURCE);
            const code = [
                'from machine import Pin, SPI',
                'import uos',
                sdHelpers,
                "if '_ob_sd_mounted' in globals() and _ob_sd_mounted:",
                '    pass',
                'else:',
                '    try:',
                "        uos.stat('/sd')",
                '        _ob_sd_mounted = True',
                '    except OSError:',
                '        exec(' + source + ')',
                '        try:',
                '            _ob_sd_spi = SPI(1, baudrate=1000000, sck=Pin(' + sck + '),',
                '                mosi=Pin(' + mosi + '), miso=Pin(' + miso + '))',
                '            _ob_sd_cs = Pin(' + cs + ', Pin.OUT)',
                '            _ob_sd_cs.value(1)',
                '            _ob_sd_card = SDCard(_ob_sd_spi, _ob_sd_cs, baudrate=1000000)',
                "            uos.mount(_ob_sd_card, '/sd')",
                '            _ob_sd_mounted = True',
                '        except Exception as _ob_error:',
                '            try:',
                "                uos.umount('/sd')",
                '            except Exception:',
                '                pass',
                '            try:',
                '                _ob_sd_spi.deinit()',
                '            except Exception:',
                '                pass',
                "            for _ob_name in ('_ob_sd_card', '_ob_sd_spi', '_ob_sd_cs'):",
                '                if _ob_name in globals():',
                '                    del globals()[_ob_name]',
                '            _ob_sd_mounted = False',
                "            raise OSError('SD mount failed: %s' % _ob_error)"
            ].join('\n');
            return execLive(code, 15000);
        },

        espSdCard_appendLine: args => {
            const file = pythonString(args && args.FILE);
            const data = pythonString(args && args.DATA);
            const code = withMounted([
                'try:',
                '    with open(_ob_sd_path(' + file + '), \'a\') as _ob_file:',
                '        _ob_file.write(str(' + data + ') + \'\\\\n\')',
                'except Exception as _ob_error:',
                "    raise OSError('SD write failed: %s' % _ob_error)"
            ].join('\n'));
            return execLive(code);
        },

        espSdCard_readFile: args => {
            const file = pythonString(args && args.FILE);
            const code = withMounted([
                'try:',
                '    with open(_ob_sd_path(' + file + ')) as _ob_file:',
                '        print(_ob_file.read())',
                'except OSError:',
                "    print('')"
            ].join('\n'));
            return execLive(code).then(parseReporterString);
        },

        espSdCard_deleteFile: args => {
            const file = pythonString(args && args.FILE);
            const code = withMounted([
                'try:',
                '    import uos',
                '    uos.remove(_ob_sd_path(' + file + '))',
                'except OSError:',
                '    pass'
            ].join('\n'));
            return execLive(code);
        }
    };
}

return registerDeviceExtensionRuntime;
})();

exports = registerDeviceExtensionRuntime;
