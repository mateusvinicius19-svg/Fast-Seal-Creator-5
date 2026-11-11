@echo off
title Abrir Simulador CNC
rem Baixa do GitHub a versao mais nova do Simulador CNC (branch main), copia para o W: e abre.
rem Este .bat so busca o Iniciar\atualizar.ps1 da main e roda: nao precisa trocar o .bat quando houver correcao.
rem Fica na Area de Trabalho. O codigo PowerShell esta no fim deste arquivo, depois da marca.
rem Log: %LOCALAPPDATA%\FastSealCreator\log.txt
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='%~f0'; iex ((Get-Content -LiteralPath $f -Raw -Encoding UTF8) -split '#\#PS\#\#',2)[1]"
if errorlevel 1 pause
exit /b
##PS##
$ErrorActionPreference = 'Stop'
# So busca o atualizador (Iniciar\atualizar.ps1) na main e roda: as correcoes chegam sem trocar este .bat.
$root = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'FastSealCreator'
New-Item -ItemType Directory -Force $root | Out-Null
$upd = Join-Path $root 'atualizar.ps1'; $novo = Join-Path $root 'atualizar.novo.ps1'
$url = 'https://raw.githubusercontent.com/mateusvinicius19-svg/Fast-Seal-Creator-5/main/Iniciar/atualizar.ps1'
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}
$ok = $false
try { $px = [Net.WebRequest]::GetSystemWebProxy(); $px.Credentials = [Net.CredentialCache]::DefaultNetworkCredentials
  $w = New-Object Net.WebClient; $w.Proxy = $px; $w.Headers['User-Agent'] = 'FastSealCreator'; $w.Headers['Cache-Control'] = 'no-cache'; $w.DownloadFile("$url`?t=$([DateTime]::Now.Ticks)", $novo); $ok = $true } catch {}
if (-not $ok) { $ErrorActionPreference = 'Continue'; $c = Join-Path $env:WINDIR 'System32\curl.exe'; if (Test-Path $c) { & $c -fsSL --ssl-no-revoke --proxy-ntlm -U : -o $novo $url 2>$null; $ok = ($LASTEXITCODE -eq 0) } }
if ($ok -and (Get-Item $novo).Length -gt 500) { Move-Item -LiteralPath $novo -Destination $upd -Force }
if (-not (Test-Path $upd)) { Write-Host 'ERRO: nao consegui baixar o atualizador do GitHub (sem internet ou bloqueado).' -ForegroundColor Red; exit 1 }
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $upd -Root $root
exit $LASTEXITCODE
