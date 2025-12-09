@echo off
REM Classes Auto-Sync System Launcher
REM This script starts the automatic syncing of class files to GitHub

echo ====================================
echo   Classes Auto-Sync System
echo ====================================
echo.
echo Starting auto-sync for Classes folder...
echo.

cd /d "%~dp0"
node classes-autosync.js auto 5

pause
