# PowerShell script to create a startup shortcut for Classes auto-push

$WshShell = New-Object -ComObject WScript.Shell
$StartupFolder = [System.Environment]::GetFolderPath('Startup')
$ShortcutPath = Join-Path $StartupFolder "Classes Auto-Push.lnk"
$TargetPath = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding\start-classes-autopush-silent.vbs"

$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $TargetPath
$Shortcut.WorkingDirectory = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding"
$Shortcut.Description = "Auto-push Classes folder to GitHub"
$Shortcut.Save()

Write-Host "Startup shortcut created successfully!"
Write-Host "Location: $ShortcutPath"
Write-Host ""
Write-Host "The Classes folder will now automatically push to GitHub:"
Write-Host "  - When your computer starts"
Write-Host "  - Every 60 seconds if changes are detected"
