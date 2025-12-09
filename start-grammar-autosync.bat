@echo off
REM English Grammar Auto-Sync Startup Script
REM This script automatically syncs grammar lesson files to GitHub

echo Starting English Grammar Auto-Sync...
echo.
echo This will monitor and automatically sync:
echo   - All grammar lesson files in English-Grammar folder
echo   - A1, A2, and B1 level lessons
echo.

REM Change to the project directory
cd /d "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding"

REM Start the grammar auto-sync with 5-minute intervals
node grammar-autosync.js auto 5

pause
