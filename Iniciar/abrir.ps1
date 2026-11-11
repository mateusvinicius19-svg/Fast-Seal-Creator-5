# Fast Seal Creator - chamado pelo "Abrir Simulador.bat" depois de baixar a versao mais nova do GitHub.
# 1) copia o Simulador CNC.html para a pasta Arruela Padronizada no W: (se mudou) - o servidor serve o Simulador de la
# 2) (re)liga o "Servidor Simulador.ps1" desta versao (pastas fixas, sem pedir pasta) e abre http://localhost:8765/
# Arquivo so com ASCII (PowerShell 5.1).
param([string]$App = (Split-Path -Parent $PSScriptRoot), [int]$Port = 8765)
$ErrorActionPreference = 'Continue'
$html = Join-Path $App 'Simulador CNC.html'
$srv = Join-Path $App 'Servidor Simulador.ps1'
$base = 'W:\Parts\PartsSeals\PROJETOS'
if (-not (Test-Path -LiteralPath 'W:\')) { Write-Host 'ATENCAO: o W: nao esta acessivel (\\172.16.99.40). O Simulador abre, mas nao grava na rede.' -ForegroundColor Yellow }

# 1) copia para o W: (PROGRAMACAO\PADRONIZACAO tem acento: acha pelo coringa)
$alvo = $null
try {
  $dest = Get-ChildItem -LiteralPath $base -Directory -ErrorAction Stop | Where-Object { $_.Name -like 'PROGRAMA*O' } |
    ForEach-Object { Get-ChildItem -LiteralPath $_.FullName -Directory | Where-Object { $_.Name -like 'PADRONIZA*O' } } |
    ForEach-Object { Join-Path $_.FullName 'Arruela Padronizada' } | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
  if ($dest) {
    $alvo = Join-Path $dest 'Simulador CNC.html'
    $novo = (Get-FileHash -LiteralPath $html).Hash
    $velho = if (Test-Path -LiteralPath $alvo) { (Get-FileHash -LiteralPath $alvo).Hash } else { '' }
    if ($novo -ne $velho) { Copy-Item -LiteralPath $html -Destination $alvo -Force; Write-Host "Simulador atualizado no W: ($alvo)" }
    else { Write-Host 'O W: ja esta com a versao mais nova.' }
  } else { Write-Host 'Pasta Arruela Padronizada nao encontrada no W: (nao copiei).' -ForegroundColor Yellow }
} catch { Write-Host "Nao consegui copiar para o W: $($_.Exception.Message)" -ForegroundColor Yellow }

# 2) servidor: desliga o que estiver rodando (guarda o -Rede do celular, se tinha) e liga o desta versao
$rede = $false
Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Where-Object { $_.CommandLine -like '*Servidor Simulador.ps1*' -and $_.CommandLine -notlike '*-Instalar*' -and $_.ProcessId -ne $PID } |
  ForEach-Object { if ($_.CommandLine -like '*-Rede*') { $rede = $true }; Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Milliseconds 600
$url = "http://localhost:$Port"
$ok = $false
if ((Test-Path -LiteralPath $srv) -and $alvo) {
  $args2 = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$srv`" -Porta $Port" + $(if ($rede) { ' -Rede' } else { '' })
  Start-Process powershell.exe -WindowStyle Hidden -WorkingDirectory ([Environment]::GetFolderPath('LocalApplicationData')) -ArgumentList $args2
  for ($i = 0; $i -lt 40 -and -not $ok; $i++) {
    Start-Sleep -Milliseconds 250
    try { Invoke-WebRequest "$url/ping" -UseBasicParsing -TimeoutSec 2 | Out-Null; $ok = $true } catch {}
  }
}
if ($ok) { Start-Process "$url/" }
else {
  Write-Host 'O servidor local nao ligou - abrindo o arquivo direto (vai pedir a pasta PROJETOS).' -ForegroundColor Yellow
  Start-Process $(if ($alvo) { $alvo } else { $html })
  Start-Sleep -Seconds 4
}
