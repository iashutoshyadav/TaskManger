Write-Host "Restarting backend server..." -ForegroundColor Yellow

# Find and kill the existing npm process
$npmProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.Path -like "*node.exe*"
}

if ($npmProcesses) {
    Write-Host "Stopping existing backend server..." -ForegroundColor Cyan
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

Write-Host "Starting backend server..." -ForegroundColor Green
Set-Location "c:\Users\ashutosh yadav\Downloads\Task Manager\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "`n✅ Backend server restarted!" -ForegroundColor Green
Write-Host "The AI service should now work correctly." -ForegroundColor White
