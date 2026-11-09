# Revisa os programas listados num resultado_<data>.csv (ou numa lista de numeros):
# arquivos (.PIT, MCS 500, PDF), medidas do cabecalho x descricao, ferramentas pelo material (Teflon x PU),
# G92 (regra do T5D5 / T8D8), MCS 500 igual a conversao do .PIT, movimentos G0 abaixo de Z0 para dentro da peca.
param([string[]]$Csv, [string]$OutCsv)
$ErrorActionPreference = 'Stop'
$ROT  = Split-Path -Parent $MyInvocation.MyCommand.Path
$PROJ = (Get-Item -LiteralPath $ROT).Parent.Parent.Parent.Parent.Parent.FullName
$PROG = Join-Path $PROJ 'Programas_CNC'
$inv  = [Globalization.CultureInfo]::InvariantCulture
$enc  = [Text.Encoding]::GetEncoding(1252)
$tmp  = Join-Path $env:TEMP 'claude_revisar'; New-Item -ItemType Directory -Force $tmp | Out-Null
function N([string]$s){ [double]::Parse(($s -replace ',', '.'), $inv) }
$rows = @(); foreach ($c in $Csv) { $rows += Import-Csv -LiteralPath $c -Delimiter ';' -Encoding UTF8 }
$out = @()
foreach ($r in $rows) {
  if ($r.status -eq 'ERRO') { continue }
  $num = (($r.numero -replace '\.PIT', '') -split ',\s*')[0]
  $probs = @(); $info = @()
  $pit = Join-Path $PROG "$num.PIT"; $mcs = Join-Path $PROG ("MCS 500\" + $num.TrimStart('0') + '.txt')
  if (-not (Test-Path -LiteralPath $pit)) { $out += [pscustomobject]@{ op = $r.op; programa = $num; resultado = 'ERRO'; problemas = 'falta o .PIT'; info = '' }; continue }
  $L = [IO.File]::ReadAllLines($pit, $enc) | ForEach-Object { $_.Trim() }
  # 1. medidas do cabecalho x descricao
  $hdr = $L[0]; $hm = [regex]::Match($hdr, '([\d.]+)/([\d.]+)/([\d.]+)')
  $dm = [regex]::Matches(($r.desc -replace '(\d),(\d)', '$1.$2'), '\d+(?:\.\d+)?') | ForEach-Object { [double]::Parse($_.Value, $inv) }
  if ($hm.Success) {
    $a = N $hm.Groups[1].Value; $b = N $hm.Groups[2].Value; $h = N $hm.Groups[3].Value
    $ds = @($dm | Select-Object -First 4)
    $okD = ($ds -contains $a) -and ($ds -contains $b)
    $aloj = $r.desc -match 'ALOJ'
    $okH = ($ds -contains $h) -or $aloj
    if (-not $okD) { $probs += "diametros $a/$b nao batem com a descricao" }
    if (-not $okH) { $probs += "altura $h nao bate com a descricao" }
    $info += "cab. $a/$b/$h"
  } else { $probs += 'cabecalho sem medidas' }
  # 2. ferramentas pelo material
  $tools = @($L | Where-Object { $_ -match '^T\d+D\d+' } | ForEach-Object { ($_ -split '[;\s]')[0] })
  $teflon = ($r.desc -match 'TEFLON') -or ($r.desc -match 'PTFE\s*(PURO)?\s*$')
  $isFsc = $hdr -match '^%(PS[EHR]\d{3}|PSHPSE)'
  if ($isFsc) {
    if ($teflon) { foreach ($t in 'T2D2','T1D45','T5D5') { if ($tools -contains $t) { $probs += "Teflon com ferramenta de PU ($t)" } } ; foreach ($t in 'T7D7','T4D4','T8D8') { if ($tools -notcontains $t) { $probs += "Teflon sem $t" } } }
    else { if ($tools -contains 'T8D8') { $probs += 'PU com T8D8' } }
  }
  $info += ($tools -join ' ')
  # 3. G92, RPT e MCS 500
  $g = $L | Where-Object { $_ -match '^G92\s*Z' } | Select-Object -First 1
  if (-not $g) { $probs += 'sem G92' } else { $info += $g }
  if (-not ($L | Where-Object { $_ -match '\(RPT N10,N20\)N\d+' })) { $probs += 'sem RPT' }
  if (-not (Test-Path -LiteralPath $mcs)) { $probs += 'falta o MCS 500' }
  else {
    $t = Join-Path $tmp "$num.txt"; & (Join-Path $ROT 'pit2mcs.ps1') -Pit $pit -Out $t
    $x = [IO.File]::ReadAllLines($t, $enc); $y = [IO.File]::ReadAllLines($mcs, $enc)
    if (@(Compare-Object $x $y).Count) { $probs += 'MCS 500 diferente do .PIT (reconverter)' }
  }
  # 4. G0 abaixo de Z0 entrando na peca: so pode ir para X fora do tubo (>= Ø tubo ext.) ou recuar afastando do que foi cortado
  $tube = [regex]::Match(($L -join "`n"), 'TUBE\s+([\d.]+)/([\d.]+)')
  if ($tube.Success) {
    $tI = N $tube.Groups[1].Value; $tO = N $tube.Groups[2].Value
    $x = 0.0; $z = 100.0; $abs = $true; $sec = ''
    foreach ($s in $L) {
      if ($s -match '^;\(\s*(\w[\w ]*?)\s*\)') { $sec = $Matches[1] }
      if ($s -match 'G91') { $abs = $false }; if ($s -match 'G90') { $abs = $true }
      if ($s -match '^;' -or $s -match '^G92') { continue }
      $mx = [regex]::Match($s, 'X(-?[\d.]+)'); $mz = [regex]::Match($s, 'Z(-?[\d.]+)')
      $nx = if ($mx.Success) { N $mx.Groups[1].Value } else { $x }; $nz = if ($mz.Success) { if ($abs) { N $mz.Groups[1].Value } else { $z + (N $mz.Groups[1].Value) } } else { $z }
      if ($s -match '^G0\b' -and $nz -lt -0.001 -and $nz -lt $z - 0.001 -and $nx -lt $tO -and $nx -gt $tI + 0.001) { $probs += "G0 descendo Z dentro da peca: '$s' ($sec)" }
      $x = $nx; $z = $nz
    }
  }
  # 5. desenho
  $pdf = if ($r.desenho) { Join-Path $PROJ $r.desenho } else { '' }
  if ($r.status -eq 'GERADO') { if (-not $pdf -or -not (Test-Path -LiteralPath $pdf)) { $probs += 'falta o PDF do desenho' } elseif ((Get-Item -LiteralPath $pdf).Length -lt 5000) { $probs += 'PDF muito pequeno' } }
  $out += [pscustomobject]@{ op = $r.op; programa = $num; resultado = $(if ($probs.Count) { 'VER' } else { 'OK' }); problemas = ($probs -join ' | '); info = ($info -join ' | '); pdf = $pdf }
}
if ($OutCsv) { $out | Export-Csv $OutCsv -NoTypeInformation -Encoding UTF8 -Delimiter ';' }
$out
