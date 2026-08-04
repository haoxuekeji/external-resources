# Minimal HD44780 16x2 character LCD driver via PCF8574 I2C backpack.
# 4-bit mode. Written for OpenBlock, MIT license.
import time


class LCD1602:
    def __init__(self, i2c, addr=None):
        self.i2c = i2c
        self.addr = self._resolve_addr(addr)
        self.bl = 0x08
        time.sleep_ms(50)
        for cmd in (0x33, 0x32, 0x28, 0x0C, 0x06, 0x01):
            self.command(cmd)
            time.sleep_ms(5)

    def _resolve_addr(self, requested):
        devices = self.i2c.scan()
        if requested in devices:
            return requested

        # PCF8574 LCD backpacks most commonly use 0x27 or 0x3F.
        # Keep old projects working by falling back when their saved address
        # does not match the actual backpack address.
        candidates = [addr for addr in (0x27, 0x3F) if addr in devices]
        if len(candidates) == 1:
            return candidates[0]
        if requested is None and candidates:
            return candidates[0]
        if requested is None and len(devices) == 1:
            return devices[0]

        found = ', '.join('0x%02X' % addr for addr in devices) or 'none'
        wanted = 'auto' if requested is None else '0x%02X' % requested
        raise OSError(
            'LCD1602 not found (requested %s, I2C scan: %s). '
            'Check SDA/SCL, power, wiring and backpack address.' % (wanted, found)
        )

    def _write4(self, data):
        # Pulse EN (bit2) with the payload, keeping backlight bit.
        self.i2c.writeto(self.addr, bytes([data | self.bl | 0x04]))
        self.i2c.writeto(self.addr, bytes([(data | self.bl) & 0xFB]))

    def _send(self, value, rs):
        self._write4((value & 0xF0) | rs)
        self._write4(((value << 4) & 0xF0) | rs)

    def command(self, cmd):
        self._send(cmd, 0)

    def write_char(self, char):
        self._send(char, 1)

    def clear(self):
        self.command(0x01)
        time.sleep_ms(2)

    def backlight(self, on):
        self.bl = 0x08 if on else 0x00
        self.i2c.writeto(self.addr, bytes([self.bl]))

    def move_to(self, row, col):
        self.command(0x80 + (0x40 if row else 0x00) + col)

    def putstr(self, string):
        for char in str(string):
            self.write_char(ord(char) & 0xFF)
