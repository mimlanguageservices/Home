@echo off
REM Integrated File Manager Auto-Sync Startup Script
REM This script automatically syncs BOTH student files AND teacher dashboards

echo Starting Integrated File Manager Auto-Sync...
echo.
echo This will manage:
echo   - Student profile HTML files (from Column B)
echo   - Teacher dashboard files (from Column A)
echo.

REM Change to the project directory
cd /d "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding"

REM Start the integrated auto-sync with 2-minute intervals
node integrated-file-manager.js auto 2

pause