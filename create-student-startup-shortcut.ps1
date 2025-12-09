# PowerShell script to create a startup shortcut for student auto-sync

$WScriptShell = New-Object -ComObject WScript.Shell
$StartupFolder = [System.Environment]::GetFolderPath('Startup')
$ShortcutPath = Join-Path $StartupFolder "Student-AutoSync.lnk"

$Shortcut = $WScriptShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding\start-student-autosync-silent.vbs"
$Shortcut.WorkingDirectory = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding"
$Shortcut.Description = "Student Roster Auto-Sync to GitHub"
$Shortcut.Save()

Write-Host "Startup shortcut created successfully at: $ShortcutPath"
Write-Host "The student auto-sync service will now start automatically when Windows starts."
