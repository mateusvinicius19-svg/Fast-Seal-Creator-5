# Regera UM programa existente com o MESMO numero (correcao, ex.: bucha errada), guardando antes o .PIT/.txt/PDF antigos em Rotina\backup.
# Uso: regerar.ps1 -Num 046048 -Type psr102 -Desc "RASPADOR ..." -P '{"dint":35,"dext":51,"hh":5,"h":8,"bi":31,"bo":52}' -Dwg '{"mat":"TEFLON PURO","qtd":"4"}'
param([Parameter(Mandatory)][string]$Num, [Parameter(Mandatory)][string]$Type, [string]$Desc = '', [Parameter(Mandatory)][string]$P, [string]$Dwg = '{}')
$gerar = [IO.File]::ReadAllText((Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'gerar.ps1'), [Text.Encoding]::UTF8)
$head = $gerar.Substring(0, $gerar.IndexOf('# ---------- 2.')) -replace '(?s)^.*?\$ErrorActionPreference', '$ErrorActionPreference'
$Jobs = 'x'; Invoke-Expression $head
$DES = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS'; $BK = Join-Path $ROT 'backup'; New-Item -ItemType Directory -Force $BK | Out-Null
$n = [int]$Num; $fp = Join-Path $PROG "$Num.PIT"; $fm = Join-Path $PROG "MCS 500\$n.txt"
if (-not (Test-Path -LiteralPath $fp)) { throw "nao existe $fp" }
$stamp = Get-Date -Format 'yyyyMMdd-HHmm'
Copy-Item -LiteralPath $fp (Join-Path $BK "$Num antes-regerar $stamp.PIT")
if (Test-Path -LiteralPath $fm) { Copy-Item -LiteralPath $fm (Join-Path $BK "$n antes-regerar $stamp.txt") }
$pp = @{}; (ConvertFrom-Json $P).PSObject.Properties | ForEach-Object { $pp[$_.Name] = $_.Value }
$dw = @{}; (ConvertFrom-Json $Dwg).PSObject.Properties | ForEach-Object { $dw[$_.Name] = $_.Value }
$o = Invoke-Sim @{ type = $Type; num = $Num; p = $pp; dwg = $dw; desc = $Desc }
if (-not $o.ok) { throw $o.err }
[IO.File]::WriteAllText($fp, (($o.fagor -replace "`r", '') -replace "`n", "`r`n"), $cp1252)
[IO.File]::WriteAllText($fm, (($o.mcs -replace "`r", '') -replace "`n", "`r`n"), $cp1252)
$res = [ordered]@{ numero = $Num; check = $o.check; aloj = $o.aloj; desenho = '' }
if ($o.pdf) {
  $dd = Join-Path $DES "$($o.desFam)\$($o.desName)"; $pdf = Join-Path $dd "$($o.desName).pdf"
  if (Test-Path -LiteralPath $pdf) { Copy-Item -LiteralPath $pdf (Join-Path $BK "$($o.desName) antes-regerar $stamp.pdf") }
  New-Item -ItemType Directory -Force $dd | Out-Null; [IO.File]::WriteAllBytes($pdf, [Convert]::FromBase64String($o.pdf)); $res.desenho = $pdf
} else { $res.desenho = "sem PDF: $($o.pdfErr)" }
[pscustomobject]$res
