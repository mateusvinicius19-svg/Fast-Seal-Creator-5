# Fast Seal Creator - chamado pelo "Abrir Simulador.bat" depois de baixar a versao mais nova do GitHub.
# 1) copia o Simulador CNC.html para a pasta Arruela Padronizada no W: (se mudou)
# 2) reinicia o servidor local (servidor.ps1) e abre http://localhost:8765/ no navegador
# Arquivo so com ASCII (PowerShell 5.1).
param([string]$App = (Split-Path -Parent $PSScriptRoot), [int]$Port = 8765)
$ErrorActionPreference = 'Continue'
$html = Join-Path $App 'Simulador CNC.html'
$base = 'W:\Parts\PartsSeals\PROJETOS'
if (-not (Test-Path -LiteralPath 'W:\')) { $base = '\\172.16.99.40\dados\Parts\PartsSeals\PROJETOS' }

# 1) copia para o W: (PROGRAMACAO\PADRONIZACAO com acento: acha pelo coringa)
try {
  $dest = Get-ChildItem -LiteralPath $base -Directory -ErrorAction Stop | Where-Object { $_.Name -like 'PROGRAMA*O' } |
    ForEach-Object { Get-ChildItem -LiteralPath $_.FullName -Directory | Where-Object { $_.Name -like 'PADRONIZA*O' } } |
    ForEach-Object { Join-Path $_.FullName 'Arruela Padronizada' } | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
  if ($dest) {
    $alvo = Join-Path $dest 'Simulador CNC.html'
    $novo = (Get-FileHash -LiteralPath $html).Hash
    $velho = if (Test-Path -LiteralPath $alvo) { (Get-FileHash -LiteralPath $alvo).Hash } else { '' }
    if ($novo -ne $velho) { Copy-Item -LiteralPath $html -Destination $alvo -Force; Write-Host "Copiado para $alvo" }
    else { Write-Host "W: ja esta na versao mais nova" }
  } else { Write-Host "Pasta Arruela Padronizada nao encontrada no W: (nao copiei)" }
} catch { Write-Host "Nao consegui copiar para o W: $($_.Exception.Message)" }

# 2) servidor local
$url = "http://localhost:$Port"
try { Invoke-WebRequest "$url/api/quit" -UseBasicParsing -TimeoutSec 3 | Out-Null; Start-Sleep -Milliseconds 800 } catch {}
$srv = Join-Path $PSScriptRoot 'servidor.ps1'
Start-Process powershell.exe -WindowStyle Hidden -WorkingDirectory $env:TEMP -ArgumentList @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$srv`"", '-Port', $Port, '-App', "`"$App`"")
$ok = $false
for ($i = 0; $i -lt 40 -and -not $ok; $i++) {
  Start-Sleep -Milliseconds 250
  try { Invoke-WebRequest "$url/api/ping" -UseBasicParsing -TimeoutSec 2 | Out-Null; $ok = $true } catch {}
}
if ($ok) { Start-Process "$url/" }
else {
  Write-Host "O servidor local nao subiu - abrindo o arquivo direto (vai pedir as pastas)."
  Start-Process $html
}
