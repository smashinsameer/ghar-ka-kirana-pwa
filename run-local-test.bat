@echo off
title Ghar Ka Kirana - DMart Grocery PWA Runner
echo ===================================================
echo   Ghar Ka Kirana (घर का किराना) - Local Test Runner
echo ===================================================
echo.
echo Opening index.html in your default web browser...
start "" "%~dp0index.html"
echo.
echo If you want to test PWA offline and on phone via Wi-Fi:
echo    python -m http.server 8080
echo    or: npx serve .
echo.
echo ===================================================
timeout /t 3 >nul
