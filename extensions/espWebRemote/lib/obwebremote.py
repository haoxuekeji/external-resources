"""OpenBlock Web Remote: a phone dashboard served straight from the board.

The server is a plain non-blocking socket listener; call poll() often (the
generated program does it from the repeat() hook) and it answers pending
HTTP requests without ever blocking the program.
"""

import socket

try:
    import json
except ImportError:
    import ujson as json


PAGE = """<!DOCTYPE html>
<html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>OpenBlock Remote</title>
<style>
body{font-family:sans-serif;background:#17233f;color:#fff;margin:0;padding:16px}
h2{text-align:center;margin:8px 0 16px}
#labels div{background:#243758;border-radius:10px;padding:12px 16px;margin:8px 0;font-size:18px}
#btns{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}
#btns button{flex:1 1 40%;min-height:64px;font-size:26px;font-weight:700;border:0;border-radius:14px;background:#4c97ff;color:#fff}
#btns button:active{background:#3373cc}
.sl{background:#243758;border-radius:10px;padding:12px 16px;margin:8px 0}
.sl input{width:100%}
</style></head><body>
<h2 id="t"></h2>
<div id="labels"></div>
<div id="btns"></div>
<div id="sls"></div>
<script>
var cfg='';
function build(s){
 document.title=s.title;
 document.getElementById('t').textContent=s.title;
 var b=document.getElementById('btns');
 b.innerHTML='';
 s.buttons.forEach(function(id){
  var e=document.createElement('button');
  e.textContent=id;
  e.onclick=function(){fetch('/evt?b='+id).catch(function(){})};
  b.appendChild(e);
 });
 var d=document.getElementById('sls');
 d.innerHTML='';
 s.sliders.forEach(function(p){
  var w=document.createElement('div');w.className='sl';
  var n=document.createElement('div');n.textContent=p[0]+': '+p[1];
  var i=document.createElement('input');
  i.type='range';i.min=0;i.max=100;i.value=p[1];
  i.oninput=function(){n.textContent=p[0]+': '+i.value};
  i.onchange=function(){fetch('/set?s='+p[0]+'&v='+i.value).catch(function(){})};
  w.appendChild(n);w.appendChild(i);d.appendChild(w);
 });
}
function tick(){
 fetch('/state').then(function(r){return r.json()}).then(function(s){
  var c=JSON.stringify([s.title,s.buttons,s.sliders.map(function(p){return p[0]})]);
  if(c!==cfg){cfg=c;build(s);}
  var L=document.getElementById('labels');
  L.innerHTML='';
  s.labels.forEach(function(p){
   var e=document.createElement('div');
   e.textContent=p[0]+': '+p[1];
   L.appendChild(e);
  });
 }).catch(function(){}).then(function(){setTimeout(tick,400)});
}
tick();
</script></body></html>"""


class OBWebRemote:

    def __init__(self, title='OpenBlock Remote'):
        self._title = str(title)
        self._sock = None
        self._ap = None
        self._buttons = []
        self._pressed = {}
        self._slider_ids = []
        self._sliders = {}
        self._label_ids = []
        self._labels = {}

    def start_ap(self, ssid, password=''):
        import network
        ssid = str(ssid) or 'OpenBlock'
        password = str(password)
        self._title = ssid
        ap = network.WLAN(network.AP_IF)
        ap.active(True)
        try:
            # WPA2 needs a password of 8+ chars; shorter means an open network.
            if len(password) >= 8:
                ap.config(essid=ssid, password=password, authmode=3)
            else:
                ap.config(essid=ssid, authmode=0)
        except (ValueError, TypeError):
            # Newer MicroPython ports renamed essid/password to ssid/key.
            if len(password) >= 8:
                ap.config(ssid=ssid, key=password)
            else:
                ap.config(ssid=ssid)
        self._ap = ap

    def start(self, port=80):
        if self._sock:
            return
        sock = socket.socket()
        try:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        except OSError:
            pass
        sock.bind(socket.getaddrinfo('0.0.0.0', port)[0][-1])
        sock.listen(4)
        sock.setblocking(False)
        self._sock = sock

    def address(self):
        try:
            import network
            if self._ap and self._ap.active():
                return self._ap.ifconfig()[0]
            sta = network.WLAN(network.STA_IF)
            if sta.active() and sta.isconnected():
                return sta.ifconfig()[0]
        except (ImportError, OSError):
            pass
        return '0.0.0.0'

    def add_button(self, bid):
        bid = str(bid)
        if bid not in self._buttons:
            self._buttons.append(bid)

    def add_slider(self, sid):
        sid = str(sid)
        if sid not in self._sliders:
            self._slider_ids.append(sid)
            self._sliders[sid] = 0

    def set_label(self, lid, text):
        lid = str(lid)
        if lid not in self._labels:
            self._label_ids.append(lid)
        self._labels[lid] = str(text)

    def pressed(self, bid):
        """True once per tap recorded for this dashboard button."""
        bid = str(bid)
        if self._pressed.get(bid, 0) > 0:
            self._pressed[bid] -= 1
            return True
        return False

    def slider(self, sid):
        return self._sliders.get(str(sid), 0)

    def poll(self):
        """Answer pending dashboard HTTP requests; never blocks."""
        if not self._sock:
            return
        for _ in range(4):
            try:
                conn, _addr = self._sock.accept()
            except OSError:
                return
            try:
                self._handle(conn)
            except (OSError, ValueError):
                pass
            try:
                conn.close()
            except OSError:
                pass

    def _state(self):
        return json.dumps({
            'title': self._title,
            'buttons': self._buttons,
            'sliders': [[sid, self._sliders[sid]] for sid in self._slider_ids],
            'labels': [[lid, self._labels[lid]] for lid in self._label_ids]
        })

    def _handle(self, conn):
        conn.settimeout(0.5)
        req = conn.recv(768)
        if not req:
            return
        line = req.split(b'\r\n', 1)[0].decode()
        parts = line.split(' ')
        path = parts[1] if len(parts) > 1 else '/'
        query = ''
        if '?' in path:
            path, query = path.split('?', 1)
        args = {}
        for pair in query.split('&'):
            if '=' in pair:
                key, value = pair.split('=', 1)
                args[key] = value
        if path == '/':
            self._send(conn, '200 OK', 'text/html', PAGE)
        elif path == '/state':
            self._send(conn, '200 OK', 'application/json', self._state())
        elif path == '/evt':
            bid = args.get('b', '')
            if bid in self._buttons:
                self._pressed[bid] = self._pressed.get(bid, 0) + 1
            self._send(conn, '204 No Content', None, None)
        elif path == '/set':
            sid = args.get('s', '')
            if sid in self._sliders:
                try:
                    self._sliders[sid] = int(args.get('v', '0'))
                except ValueError:
                    pass
            self._send(conn, '204 No Content', None, None)
        else:
            self._send(conn, '404 Not Found', 'text/plain', 'not found')

    def _send(self, conn, status, ctype, body):
        head = 'HTTP/1.0 ' + status + '\r\nConnection: close\r\n'
        if ctype:
            head += 'Content-Type: ' + ctype + '\r\n'
        self._send_all(conn, (head + '\r\n').encode())
        if body:
            self._send_all(conn, body if isinstance(body, bytes) else body.encode())

    @staticmethod
    def _send_all(conn, data):
        view = memoryview(data)
        while len(view):
            sent = conn.send(view)
            view = view[sent:]
