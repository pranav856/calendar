$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$BackupDir = Join-Path $ProjectRoot "supabase\backups"
$DatabaseBackup = Join-Path $BackupDir "database.sql"

Write-Host "Starting Supabase database backup..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force $BackupDir | Out-Null

Push-Location $ProjectRoot

try {
    npx supabase db dump --linked -f $DatabaseBackup

    if (-not (Test-Path $DatabaseBackup)) {
        throw "Database backup file was not created."
    }

    $File = Get-Item $DatabaseBackup

    Write-Host ""
    Write-Host "Backup completed successfully!" -ForegroundColor Green
    Write-Host "File: $($File.FullName)"
    Write-Host "Size: $($File.Length) bytes"
    Write-Host "Time: $($File.LastWriteTime)"
}
finally {
    Pop-Location
}