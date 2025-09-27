@echo off
REM Student File Manager Auto-Sync Startup Script
REM This script automatically starts the auto-sync when Windows boots up

echo Starting Student File Manager Auto-Sync...

REM Change to the project directory
cd /d "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding\Students"

REM Start the auto-sync with 5-minute intervals
REM The script will run minimized to avoid cluttering the desktop
node student-file-manager.js auto 5

pause