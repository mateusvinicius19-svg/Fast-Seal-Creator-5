# Confere a bucha (TUBE a/b) de programas gerados: se cabe (>= 1 mm no diametro por dentro e por fora do que e usinado),
# se e da tabela de compra PU (com preco), qual seria a mais leve da tabela que serve, e quanto material sobra.
# Uso: buchas.ps1 -Programas 046025,046026,... [-OutCsv arquivo.csv]
param([string[]]$Programas, [string]$OutCsv)
$ErrorActionPreference = 'Stop'
$ROT  = Split-Path -Parent $MyInvocation.MyCommand.Path
$ROOT = (Get-Item -LiteralPath $ROT).Parent.Parent.FullName                       # ...\Arruela Padronizada
$PROG = Join-Path (Get-Item -LiteralPath $ROT).Parent.Parent.Parent.Parent.Parent.FullName 'Programas_CNC'
$inv  = [Globalization.CultureInfo]::InvariantCulture
$h = [IO.File]::ReadAllText((Join-Path $ROOT 'Simulador CNC.html'), [Text.Encoding]::UTF8)
function Arr($name){ $m = [regex]::Match($h, "const $name\s*=\s*\[(.*?)\];", 'Singleline'); [regex]::Matches($m.Groups[1].Value, '\[([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+),\s*([\d.]+))?\]') | ForEach-Object { ,@([double]::Parse($_.Groups[1].Value,$inv), [double]::Parse($_.Groups[2].Value,$inv), $(if($_.Groups[3].Success){[double]::Parse($_.Groups[3].Value,$inv)}else{$null}), $(if($_.Groups[4].Success){[double]::Parse($_.Groups[4].Value,$inv)}else{$null})) } }
$real = @{ '40/62' = @(32, 62); '106/129' = @(103, 129) }
$tab = @(); foreach ($r in (Arr 'PU_TABELA')) { $k = "$($r[0])/$($r[1])"; $x = if ($real[$k]) { $real[$k] } else { @($r[0], $r[1]) }; $tab += ,@($x[0], $x[1], ($r[2] / $r[3]), "$($r[0])x$($r[1])") }
$old = @(Arr 'BUCHAS_PROGRAMAS' | ForEach-Object { ,@($_[0], $_[1]) })
$out = @()
foreach ($n in $Programas) {
  $f = Join-Path $PROG "$n.PIT"; if (-not (Test-Path -LiteralPath $f)) { continue }
  $L = [IO.File]::ReadAllLines($f, [Text.Encoding]::GetEncoding(1252)) | ForEach-Object { $_.Trim() }
  $t = [regex]::Match(($L -join "`n"), '(?:USER DEFINED (\S+(?: \S+)*?) )?([\d.]+)/([\d.]+) - TUBE')
  $mat = $t.Groups[1].Value; $a = [double]::Parse($t.Groups[2].Value, $inv); $b = [double]::Parse($t.Groups[3].Value, $inv)
  # menor X usinado no INSIDE (acabamento + desbaste) e maior X do contorno externo acabado (OUTSIDE ;( FINISH ))
  $sec = ''; $fin = $false; $minI = 1e9; $maxO = 0
  foreach ($s in $L) {
    if ($s -match '^;\(\s*(INSIDE|OUTSIDE|CUTTING|FACING DOWNWARD|FACING|FRONT GROOVE|OUTSIDE ANGLE)') { $sec = $Matches[1]; $fin = $false }
    if ($s -match 'FINISH') { $fin = $true }
    if ($s -match '^G[123]\b.*X([\d.]+)') { $x = [double]::Parse($Matches[1], $inv)
      if ($sec -eq 'INSIDE' -and $fin) { if ($x -lt $minI) { $minI = $x } }
      if ($sec -eq 'OUTSIDE' -and $fin -and $s -notmatch '^G0') { if ($x -gt $maxO) { $maxO = $x } } }
  }
  $hdr = $L[0]
  $intAp = $minI; $extAp = $maxO
  $okI = ($a -eq 0) -or ($a -le $intAp - 1 + 1e-6); $okO = $b -ge $extAp + 1 - 1e-6
  $inTab = @($tab | Where-Object { $_[0] -eq $a -and $_[1] -eq $b }).Count -gt 0
  $inOld = @($old | Where-Object { $_[0] -eq $a -and $_[1] -eq $b }).Count -gt 0
  $best = $tab | Where-Object { $_[0] -le $intAp - 1 + 1e-6 -and $_[1] -ge $extAp + 1 - 1e-6 } | Sort-Object { $_[2] } | Select-Object -First 1
  $obs = @()
  if (-not $okI) { $obs += "bucha Ø int $a NAO cabe (usinado int. min $intAp)" }
  if (-not $okO) { $obs += "bucha Ø ext $b NAO cabe (usinado ext. max $extAp)" }
  if (-not $inTab) { $obs += $(if ($inOld) { 'bucha antiga sem preco (fora da tabela PU)' } else { 'bucha fora da lista (sob medida)' }) }
  if ($best -and ($best[0] -ne $a -or $best[1] -ne $b)) { $obs += "tabela PU tem mais barata que serve: $($best[0])x$($best[1]) ($($best[3]))" }
  if (-not $best) { $obs += 'nenhuma bucha da tabela PU serve' }
  if ($mat -and $mat -notmatch '^PU$') { $obs += "material $mat - bucha escolhida pela tabela de PU: confirmar se existe tubo nesse material" }
  $out += [pscustomobject]@{ programa = $n; cab = $hdr; material = $mat; bucha = "$a x $b"; usinado = ("int {0} / ext {1}" -f $intAp, $extAp)
    sobra = ("int {0:0.0} / ext {1:0.0} (raio)" -f (($intAp - $a) / 2), (($b - $extAp) / 2)); resultado = $(if ($obs.Count) { 'VER' } else { 'OK' }); obs = ($obs -join ' | ') }
}
if ($OutCsv) { $out | Export-Csv $OutCsv -NoTypeInformation -Encoding UTF8 -Delimiter ';' }
$out
