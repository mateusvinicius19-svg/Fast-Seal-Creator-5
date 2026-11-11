# Cancela um programa feito em duplicado: MOVE (nao apaga) o .PIT, o .txt do MCS 500, a pasta do desenho e o pedido ARGUS
# para Rotina\backup\cancelados\<numero>, e anota em Rotina\Programas cancelados.csv (numero, duplicado de, data).
# Uso: powershell -ExecutionPolicy Bypass -File cancelar.ps1 -Num 046166 -Dup 046125
#      (mostra o que vai mover e pede S para confirmar)
param([Parameter(Mandatory)][string]$Num, [Parameter(Mandatory)][string]$Dup)
$ErrorActionPreference = 'Stop'
$PROG = 'W:\Parts\PartsSeals\PROJETOS\Programas_CNC'
$DES  = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS'
$ROT  = Split-Path -Parent $MyInvocation.MyCommand.Path
$n = [int]($Num -replace '\D', ''); $N6 = '{0:D6}' -f $n; $d = [int]($Dup -replace '\D', ''); $D6 = '{0:D6}' -f $d
if (-not (Test-Path -LiteralPath (Join-Path $PROG "$D6.PIT"))) { throw "o programa original $D6.PIT nao existe em $PROG - confira o numero" }
$BK = Join-Path $ROT "backup\cancelados\$N6"

$alvo = @()
Get-ChildItem -LiteralPath $PROG -File | Where-Object { $_.BaseName -eq $N6 -or $_.BaseName -like "$N6 *" } | ForEach-Object { $alvo += $_ }   # 046166.PIT e variantes "046166 BIxBO"
$mcs = Join-Path $PROG 'MCS 500'
Get-ChildItem -LiteralPath $mcs -File | Where-Object { $_.BaseName -eq "$n" -or $_.BaseName -like "$n *" } | ForEach-Object { $alvo += $_ }
Get-ChildItem -LiteralPath $DES -Directory | ForEach-Object { Get-ChildItem -LiteralPath $_.FullName -Directory | Where-Object { $_.Name -match "\) 0*$n$" } } | ForEach-Object { $alvo += $_ }
$ped = Join-Path $DES '_PEDIDOS ARGUS'
if (Test-Path -LiteralPath $ped) { Get-ChildItem -LiteralPath $ped -File -Filter '*.json' | Where-Object { $_.BaseName -match "_0*$n$" } | ForEach-Object { $alvo += $_ } }

if (-not $alvo) { Write-Host "Nada encontrado do programa $N6."; exit }
Write-Host "Programa $N6 (duplicado do $D6) - vai MOVER para $BK :"
$alvo | ForEach-Object { Write-Host "  $($_.FullName)" }
if ((Read-Host 'Confirmar? (S/N)') -notmatch '^[sS]') { Write-Host 'Cancelado, nada mudou.'; exit }
New-Item -ItemType Directory -Force $BK | Out-Null
$alvo | ForEach-Object { Move-Item -LiteralPath $_.FullName -Destination (Join-Path $BK $_.Name) }
$log = Join-Path $ROT 'Programas cancelados.csv'
if (-not (Test-Path -LiteralPath $log)) { 'Data;Programa;Duplicado de;Backup' | Out-File -LiteralPath $log -Encoding UTF8 }
"$(Get-Date -Format 'dd/MM/yyyy HH:mm');$N6;$D6;$BK" | Out-File -LiteralPath $log -Append -Encoding UTF8
Write-Host "OK: $($alvo.Count) item(ns) movido(s). Use o $D6 no cadastro/OP. Se o $N6 entrou na planilha Controle de Programas, troque la para $D6."
