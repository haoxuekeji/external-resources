"""OpenBlock ESP-NOW helper for MicroPython (esp32 / esp8266 ports)."""

import network
import espnow


class OBEspNow:
    BROADCAST = 'ff:ff:ff:ff:ff:ff'

    def __init__(self):
        self._sta = network.WLAN(network.STA_IF)
        self._sta.active(True)
        self._now = espnow.ESPNow()
        self._now.active(True)
        self._peers = set()
        self.last_message = ''
        self.last_sender = ''
        self.add_peer(self.BROADCAST)

    @staticmethod
    def _parse_mac(text):
        parts = str(text).strip().replace('-', ':').split(':')
        if len(parts) != 6:
            raise ValueError('MAC address must look like AA:BB:CC:DD:EE:FF')
        return bytes(int(part, 16) for part in parts)

    @staticmethod
    def _format_mac(raw):
        return ':'.join('%02X' % byte for byte in raw)

    def mac(self):
        return self._format_mac(self._sta.config('mac'))

    def add_peer(self, mac_text):
        raw = self._parse_mac(mac_text)
        if raw in self._peers:
            return
        try:
            self._now.add_peer(raw)
        except OSError:
            # Peer table may already hold this address (e.g. soft reboot).
            pass
        self._peers.add(raw)

    def send(self, mac_text, message):
        self.add_peer(mac_text)
        self._now.send(self._parse_mac(mac_text), str(message))

    def broadcast(self, message):
        self.send(self.BROADCAST, message)

    def poll(self):
        """Drain received messages; keep the newest one. True if any arrived."""
        got = False
        while True:
            mac, msg = self._now.recv(0)
            if mac is None:
                return got
            self.last_sender = self._format_mac(mac)
            try:
                self.last_message = msg.decode()
            except UnicodeError:
                self.last_message = str(msg)
            got = True
