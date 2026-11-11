@echo off
title Abrir Simulador CNC
rem Baixa do GitHub a versao mais nova do Simulador CNC (branch com o maior VERSION), copia para o W: e abre.
rem Fica na Area de Trabalho. O codigo PowerShell esta no fim deste arquivo, depois da marca.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='%~f0'; iex ((Get-Content -LiteralPath $f -Raw -Encoding UTF8) -split '#\#PS\#\#',2)[1]"
if errorlevel 1 pause
exit /b
##PS##
$ErrorActionPreference = 'Stop'
try {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  $repo = 'mateusvinicius19-svg/Fast-Seal-Creator-5'
  $root = Join-Path $env:LOCALAPPDATA 'FastSealCreator'; $app = Join-Path $root 'app'
  New-Item -ItemType Directory -Force $root | Out-Null
  Write-Host 'Procurando a versao mais nova no GitHub...'
  $best = $null
  try {
    $br = Invoke-RestMethod "https://api.github.com/repos/$repo/branches?per_page=100" -Headers @{ 'User-Agent' = 'FastSealCreator' } -TimeoutSec 20
    foreach ($b in $br) {
      try { $v = (Invoke-WebRequest "https://raw.githubusercontent.com/$repo/$($b.commit.sha)/VERSION" -UseBasicParsing -TimeoutSec 15).Content.Trim(); $ver = [version]$v } catch { continue }
      if (-not $best -or $ver -gt $best.ver -or ($ver -eq $best.ver -and $b.name -eq 'main')) { $best = @{ name = $b.name; sha = $b.commit.sha; ver = $ver; v = $v } }
    }
  } catch { Write-Host "Sem acesso ao GitHub ($($_.Exception.Message)) - usando a versao ja baixada." }
  $atual = ''; if (Test-Path "$root\sha.txt") { $atual = (Get-Content "$root\sha.txt" -Raw).Trim() }
  if ($best -and ($best.sha -ne $atual -or -not (Test-Path "$app\Simulador CNC.html"))) {
    Write-Host "Baixando a versao $($best.v) ($($best.name))..."
    try { Invoke-WebRequest 'http://localhost:8765/api/quit' -UseBasicParsing -TimeoutSec 3 | Out-Null; Start-Sleep -Milliseconds 800 } catch {}
    $zip = Join-Path $env:TEMP 'fastseal.zip'; $tmp = Join-Path $env:TEMP 'fastseal_x'
    Invoke-WebRequest "https://codeload.github.com/$repo/zip/$($best.sha)" -OutFile $zip -UseBasicParsing -TimeoutSec 180
    if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
    Expand-Archive -LiteralPath $zip -DestinationPath $tmp -Force
    $src = (Get-ChildItem $tmp -Directory | Select-Object -First 1).FullName
    if (-not (Test-Path -LiteralPath (Join-Path $src 'Simulador CNC.html'))) { throw 'o download veio sem o Simulador CNC.html' }
    if (Test-Path $app) { Remove-Item $app -Recurse -Force }
    Move-Item -LiteralPath $src -Destination $app
    Get-ChildItem $app -Recurse -File | Unblock-File
    Set-Content "$root\sha.txt" $best.sha
    Remove-Item $zip, $tmp -Recurse -Force -ErrorAction SilentlyContinue
  } elseif ($best) { Write-Host "Ja esta na versao mais nova ($($best.v))." }
  if (-not (Test-Path "$app\Iniciar\abrir.ps1")) { throw 'Nenhuma versao baixada ainda e o GitHub nao respondeu.' }
  & "$app\Iniciar\abrir.ps1" -App $app
} catch { Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red; exit 1 }
