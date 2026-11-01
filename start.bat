@echo off
setlocal
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found. Install Python 3 or open index.html directly.
  pause
  exit /b 1
)
python server.py
if errorlevel 1 pause
