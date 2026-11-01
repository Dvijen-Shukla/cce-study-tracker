"""Optional local storage companion for CCE Prelims Tracker.
Run with start.bat, then visit http://localhost:8765.
The hosted GitHub Pages version does not use this server.
"""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import mimetypes
import os
import shutil
import tempfile

ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "cce-data.json"
MAX_BODY_BYTES = 50 * 1024 * 1024
HOST = "127.0.0.1"
PORT = 8765

class Handler(BaseHTTPRequestHandler):
    server_version = "CCETrackerLocal/1.0"

    def _send(self, status=200, body=b"", content_type="application/json; charset=utf-8"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Length", str(len(body)))
        # API is bound to loopback only; this also supports localhost vs 127.0.0.1 access.
        origin = self.headers.get("Origin", "")
        if origin in {"http://localhost:8765", "http://127.0.0.1:8765"}:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        if body:
            self.wfile.write(body)

    def do_OPTIONS(self):
        self._send(204, b"")

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/load":
            payload = DATA_FILE.read_bytes() if DATA_FILE.is_file() else b"null"
            return self._send(200, payload)
        rel = "index.html" if path in ("", "/") else path.lstrip("/")
        try:
            target = (ROOT / rel).resolve()
            target.relative_to(ROOT)
        except (ValueError, OSError):
            return self._send(403, b"Not allowed", "text/plain; charset=utf-8")
        if not target.is_file() or target.name.startswith("."):
            return self._send(404, b"Not found", "text/plain; charset=utf-8")
        ctype, _ = mimetypes.guess_type(str(target))
        ctype = ctype or "application/octet-stream"
        if ctype.startswith("text/") or ctype in ("application/javascript", "application/json", "image/svg+xml"):
            ctype += "; charset=utf-8"
        return self._send(200, target.read_bytes(), ctype)

    def do_POST(self):
        if self.path.split("?", 1)[0] != "/save":
            return self._send(404, b"Not found", "text/plain; charset=utf-8")
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return self._send(400, b"Invalid Content-Length", "text/plain; charset=utf-8")
        if length < 1 or length > MAX_BODY_BYTES:
            return self._send(413, b"Invalid or too-large save payload", "text/plain; charset=utf-8")
        raw = self.rfile.read(length)
        try:
            parsed = json.loads(raw.decode("utf-8"))
            if not isinstance(parsed, dict):
                raise ValueError("The save payload must be a JSON object")
        except (UnicodeDecodeError, json.JSONDecodeError, ValueError):
            return self._send(400, b"Invalid JSON save payload", "text/plain; charset=utf-8")
        # Atomic replace avoids leaving a partially written progress file if writing is interrupted.
        fd, temp_name = tempfile.mkstemp(prefix="cce-data-", suffix=".tmp", dir=ROOT)
        try:
            with os.fdopen(fd, "wb") as file:
                file.write(raw)
                file.flush()
                os.fsync(file.fileno())
            if DATA_FILE.exists():
                try:
                    shutil.copy2(DATA_FILE, ROOT / "cce-data.json.bak")
                except OSError:
                    pass
            os.replace(temp_name, DATA_FILE)
        except OSError:
            try:
                os.unlink(temp_name)
            except OSError:
                pass
            return self._send(500, b"Could not save data", "text/plain; charset=utf-8")
        return self._send(200, b"ok", "text/plain; charset=utf-8")

    def log_message(self, fmt, *args):
        print("[CCE local server] " + (fmt % args))

if __name__ == "__main__":
    from threading import Timer
    import webbrowser
    url = f"http://localhost:{PORT}"
    print(f"CCE Tracker running at {url}")
    print("Progress file: cce-data.json (local only; do not upload it to a public repository)")
    Timer(1.0, lambda: webbrowser.open(url)).start()
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
