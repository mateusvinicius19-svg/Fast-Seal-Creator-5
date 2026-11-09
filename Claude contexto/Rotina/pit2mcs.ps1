# Converte um .PIT Fagor para MCS 500 (.txt), mesmo formato do Kuru (conferido byte a byte em 06/11/2026).
# Uso: pit2mcs.ps1 -Pit <arquivo.PIT> -Out <arquivo.txt>
param([string]$Pit, [string]$Out)
$enc = [System.Text.Encoding]::GetEncoding(1252)
$lines = [System.IO.File]::ReadAllLines($Pit, $enc)
$S = '0'; $rep = '0'; $g92 = $null; $body = @()
$inBody = $false; $abs = $true; $z = 0.0; $zAtG92 = $null
foreach ($raw in $lines) {
  $l = $raw.Trim()
  if (-not $inBody) {
    if ($l -match '^G97\s*S(\d+)') { $S = $Matches[1] }
    if ($l -eq 'N10') { $inBody = $true }
    continue
  }
  if ($l -match '^G92\s*Z(-?[\d.]+)') { $g92 = [double]$Matches[1]; $zAtG92 = $z; $inBody = $false; continue }
  if ($l -match 'G91') { $abs = $false }
  if ($l -match 'G90') { $abs = $true }
  if ($l -notmatch '^;' -and $l -match 'Z(-?[\d.]+)') {
    $v = [double]$Matches[1]; if ($abs) { $z = $v } else { $z += $v }
  }
  if ($l -eq '' -or $l -eq ';') { continue }
  $body += ':' + $l
}
foreach ($raw in $lines) { if ($raw -match '\(RPT N10,N20\)N(\d+)') { $rep = $Matches[1] } }
$inv = [System.Globalization.CultureInfo]::InvariantCulture
$interval = ([math]::Round($g92 - $zAtG92, 3)).ToString($inv)
$C = [char]0xC7
$txt = @(
  'MCS ENGENHARIA                  SERIE 500',
  ':%0.2104', ':CYC CALL    0', ':;(EXTERNA)', ':CYC CALL    2  M 39   M 69   ',
  ' T     7 D     7', ':0004.G95', ':G54', ":G97 S$S M3", ':G0 Z100', ':LBS SET1'
) + $body + @(
  ':G0 Z100', ':CYC CALL 4 ', "`tZ$interval;(INTERVALO PE$($C)A)", ':LBS SET 0',
  ":LBR CALL 1 REP$rep", ':G00 X250 Z100', ':M05', ':M30', ':'
)
[System.IO.File]::WriteAllText($Out, (($txt -join "`r`n") + "`r`n"), $enc)
