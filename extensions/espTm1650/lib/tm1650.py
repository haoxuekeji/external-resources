# TM1650 four-digit seven-segment display driver for MicroPython.
# Uses the controller's two-wire interface through machine.I2C/SoftI2C.
# Written for OpenBlock, MIT license.


class TM1650:
    CONTROL_ADDRESS = 0x24
    DIGIT_ADDRESSES = (0x34, 0x35, 0x36, 0x37)

    SEGMENTS = {
        ' ': 0x00,
        '-': 0x40,
        '_': 0x08,
        '0': 0x3F,
        '1': 0x06,
        '2': 0x5B,
        '3': 0x4F,
        '4': 0x66,
        '5': 0x6D,
        '6': 0x7D,
        '7': 0x07,
        '8': 0x7F,
        '9': 0x6F,
        'A': 0x77,
        'B': 0x7C,
        'C': 0x39,
        'D': 0x5E,
        'E': 0x79,
        'F': 0x71,
        'G': 0x3D,
        'H': 0x76,
        'I': 0x06,
        'J': 0x1E,
        'L': 0x38,
        'N': 0x54,
        'O': 0x3F,
        'P': 0x73,
        'Q': 0x67,
        'R': 0x50,
        'S': 0x6D,
        'T': 0x78,
        'U': 0x3E,
        'Y': 0x6E
    }

    def __init__(self, i2c, brightness=4):
        self.i2c = i2c
        self.brightness = self._clamp(brightness, 1, 8)
        self.enabled = True
        self.buffer = [0, 0, 0, 0]
        self._verify_bus()
        self._write_control()
        self.clear()

    @staticmethod
    def _clamp(value, minimum, maximum):
        try:
            value = int(value)
        except (TypeError, ValueError):
            value = minimum
        return max(minimum, min(maximum, value))

    def _scan_text(self):
        try:
            devices = self.i2c.scan()
        except Exception:
            devices = []
        return devices, (', '.join('0x%02X' % addr for addr in devices) or 'none')

    def _verify_bus(self):
        devices, found = self._scan_text()
        expected = (self.CONTROL_ADDRESS,) + self.DIGIT_ADDRESSES
        if devices and not any(addr in devices for addr in expected):
            raise OSError(
                'TM1650 not found (I2C scan: %s). Check SDA/SCL, power and wiring.' % found
            )

    def _write(self, address, value):
        try:
            self.i2c.writeto(address, bytes((value & 0xFF,)))
        except OSError as error:
            _, found = self._scan_text()
            raise OSError(
                'TM1650 write failed at 0x%02X (I2C scan: %s). Check SDA/SCL, power and wiring: %s' %
                (address, found, error)
            )

    def _write_control(self):
        level = self._clamp(self.brightness, 1, 8) - 1
        command = (level << 4) | (0x01 if self.enabled else 0x00)
        self._write(self.CONTROL_ADDRESS, command)

    def _write_digit(self, index, segments):
        index = self._clamp(index, 0, 3)
        self.buffer[index] = segments & 0xFF
        self._write(self.DIGIT_ADDRESSES[index], self.buffer[index])

    @classmethod
    def encode(cls, char):
        text = str(char)
        if not text:
            return 0
        return cls.SEGMENTS.get(text[0].upper(), 0)

    @classmethod
    def _parse_text(cls, text):
        glyphs = []
        for char in str(text):
            if char == '.':
                if glyphs:
                    glyphs[-1] |= 0x80
                continue
            glyphs.append(cls.encode(char))
        return glyphs

    def _show_glyphs(self, glyphs, right_align=False):
        if len(glyphs) > 4:
            glyphs = glyphs[-4:] if right_align else glyphs[:4]
        padding = [0] * (4 - len(glyphs))
        values = padding + glyphs if right_align else glyphs + padding
        for index, segments in enumerate(values):
            self._write_digit(index, segments)

    def show_text(self, text):
        self._show_glyphs(self._parse_text(text), False)

    def show_number(self, value, decimals=0):
        decimals = self._clamp(decimals, 0, 3)
        try:
            number = float(value)
            if decimals == 0:
                text = str(int(round(number)))
            elif decimals == 1:
                text = '%.1f' % number
            elif decimals == 2:
                text = '%.2f' % number
            else:
                text = '%.3f' % number
        except (TypeError, ValueError):
            text = str(value)

        glyphs = self._parse_text(text)
        if len(glyphs) > 4:
            glyphs = [0x40, 0x40, 0x40, 0x40]
        self._show_glyphs(glyphs, True)

    def show_at(self, position, char):
        position = self._clamp(position, 1, 4) - 1
        text = str(char)
        segments = self.encode(text)
        if '.' in text[1:]:
            segments |= 0x80
        self._write_digit(position, segments)

    def set_decimal(self, position, on=True):
        position = self._clamp(position, 1, 4) - 1
        segments = self.buffer[position]
        if on:
            segments |= 0x80
        else:
            segments &= 0x7F
        self._write_digit(position, segments)

    def set_brightness(self, brightness):
        self.brightness = self._clamp(brightness, 1, 8)
        self._write_control()

    def set_display(self, on=True):
        self.enabled = bool(on)
        self._write_control()

    def clear(self):
        for index in range(4):
            self._write_digit(index, 0)
