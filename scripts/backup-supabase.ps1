$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$BackupDir = Join-Path $ProjectRoot "supabase\backups"

$SchemaBackup = Join-Path $BackupDir "database.sql"
$DataBackup = Join-Path $BackupDir "data.sql"

Write-Host "Starting Supabase database backup..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force $BackupDir | Out-Null

Push-Location $ProjectRoot

try {
    Write-Host ""
    Write-Host "1/2 - Backing up database schema and RLS policies..." -ForegroundColor Yellow

    npx supabase db dump --linked -f $SchemaBackup

    if (-not (Test-Path $SchemaBackup)) {
        throw "Schema backup was not created."
    }

    Write-Host "Schema backup completed." -ForegroundColor Green

    Write-Host ""
    Write-Host "2/2 - Backing up database data..." -ForegroundColor Yellow

    npx supabase db dump --linked --data-only --use-copy -f $DataBackup

    if (-not (Test-Path $DataBackup)) {
        throw "Data backup was not created."
    }

    Write-Host "Data backup completed." -ForegroundColor Green

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Supabase backup completed successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""

    $SchemaFile = Get-Item $SchemaBackup
    $DataFile = Get-Item $DataBackup

    Write-Host "Schema: $($SchemaFile.FullName)"
    Write-Host "Size:   $($SchemaFile.Length) bytes"
    Write-Host ""

    Write-Host "Data:   $($DataFile.FullName)"
    Write-Host "Size:   $($DataFile.Length) bytes"
    Write-Host ""

    Write-Host "Storage images are backed up separately in:" -ForegroundColor Cyan
    Write-Host "supabase\backups\storage\"
}
finally {
    Pop-Location
}