$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("C:\Users\admin\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\Grammar-AutoSync.lnk")
$Shortcut.TargetPath = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding\start-grammar-autosync-silent.vbs"
$Shortcut.WorkingDirectory = "C:\Users\admin\PC Files\02 Work\01 Jerome\01 English Teaching\09 Coding"
$Shortcut.Description = "English Grammar Auto-Sync - Automatically syncs grammar files to GitHub"
$Shortcut.Save()

Write-Host "✅ Startup shortcut created successfully!" -ForegroundColor Green
Write-Host "   The Grammar Auto-Sync will now start automatically when Windows boots" -ForegroundColor Cyan
