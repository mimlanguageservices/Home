# PowerShell script to create a startup shortcut for Classes Auto-Sync
# Run this script as Administrator to add Classes auto-sync to Windows startup

$WshShell = New-Object -ComObject WScript.Shell
$StartupFolder = [System.Environment]::GetFolderPath('Startup')
$ShortcutPath = Join-Path $StartupFolder "Classes Auto-Sync.lnk"
$TargetPath = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding\start-classes-autosync-silent.vbs"

# Create the shortcut
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetPath
$Shortcut.WorkingDirectory = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding"
$Shortcut.Description = "Automatically sync Classes files to GitHub"
$Shortcut.Save()

Write-Host "✅ Startup shortcut created successfully!" -ForegroundColor Green
Write-Host "📁 Location: $ShortcutPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "The Classes Auto-Sync will now start automatically when Windows starts." -ForegroundColor Yellow
Write-Host ""
Write-Host "To remove from startup, delete the shortcut from:" -ForegroundColor Gray
Write-Host "   $StartupFolder" -ForegroundColor Gray
