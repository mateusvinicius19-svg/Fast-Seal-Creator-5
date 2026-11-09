# Acrescenta os programas de um resultado_<data>.csv na planilha "Controle de Programas.xlsx"
# (pasta PROGRAMACAO), com links para abrir o .PIT, o MCS 500 e o desenho. Nao repete linha (chave OP + programa)
# e nunca apaga o que o usuario marcou (Conferido / Atribuido / Data / Obs).
# Uso: powershell -ExecutionPolicy Bypass -File controle.ps1 -Csv relatorios\resultado_09-11-2026.csv -Entrega 09-11-2026
param([Parameter(Mandatory)][string]$Csv, [string]$Entrega = '')
$ErrorActionPreference = 'Stop'
$ROT  = Split-Path -Parent $MyInvocation.MyCommand.Path
$PROGR = (Get-Item -LiteralPath $ROT).Parent.Parent.Parent.Parent.FullName      # ...\PROJETOS\PROGRAMACAO
$PROJ = (Get-Item -LiteralPath $PROGR).Parent.FullName                           # ...\PROJETOS
$PROG = Join-Path $PROJ 'Programas_CNC'
$XLSX = Join-Path $PROGR 'Controle de Programas.xlsx'
$c = [char]0xE7; $a = [char]0xE3; $i_ = [char]0xED; $AA = [char]0xC1; $NAO = "N$([char]0xE3)o"
$HDR = @('Entrega', 'OP', 'Item', "Descri${c}${a}o", 'Cliente', 'Perfil', 'Programa (.PIT)', 'MCS 500', 'Desenho',
         "Situa${c}${a}o", 'Conferido', "Atribu${i_}do no Kuru", "Data atribui${c}${a}o", 'Obs')

$rows = Import-Csv -LiteralPath $Csv -Delimiter ';' -Encoding UTF8
$xl = New-Object -ComObject Excel.Application
$xl.Visible = $false; $xl.DisplayAlerts = $false
try {
  if (Test-Path -LiteralPath $XLSX) {
    $wb = $xl.Workbooks.Open($XLSX)
    if ($wb.ReadOnly) { throw "A planilha esta aberta em outro lugar (somente leitura). Feche e rode de novo: $XLSX" }
    $ws = $wb.Worksheets.Item(1)
  } else {
    $wb = $xl.Workbooks.Add(); $ws = $wb.Worksheets.Item(1); $ws.Name = 'Programas'
    for ($k = 0; $k -lt $HDR.Count; $k++) { $ws.Cells.Item(1, $k + 1).Value2 = $HDR[$k] }
    $h = $ws.Range('A1:N1'); $h.Font.Bold = $true; $h.Interior.Color = 0x5E3A1F; $h.Font.Color = 0xFFFFFF
    $ws.Range('A:C').NumberFormat = '@'; $ws.Range('G:H').NumberFormat = '@'
    try { $w = $wb.Windows.Item(1); $w.SplitRow = 1; $w.FreezePanes = $true } catch {}
    $ws.Range('A1:N1').AutoFilter() | Out-Null
    $v = $ws.Range('K2:L5000').Validation; $v.Delete(); $v.Add(3, 1, 1, "Sim;$NAO") | Out-Null
  }
  $last = $ws.Cells.Item($ws.Rows.Count, 2).End(-4162).Row
  $have = @{}
  for ($r = 2; $r -le $last; $r++) { $have["$($ws.Cells.Item($r, 2).Text)|$($ws.Cells.Item($r, 7).Text)"] = 1 }
  $added = 0; $r = $last + 1
  foreach ($x in $rows) {
    if ($x.status -eq 'ERRO') { continue }
    $nums = @(($x.numero -replace '\.PIT', '') -split ',\s*' | Where-Object { $_ })
    $num = $nums[0]
    if ($have["$($x.op)|$num"]) { continue }
    $sit = if ($x.status -eq 'JA EXISTE') { "J$AA EXISTE - s$([char]0xF3) atribuir" } else { 'Gerado (conferir)' }
    $vals = @($Entrega, $x.op, $x.item, $x.desc, $x.cliente, ($x.type).ToUpper(), $num, '', '', $sit, $NAO, $NAO, '', $x.obs)
    for ($k = 0; $k -lt $vals.Count; $k++) { $ws.Cells.Item($r, $k + 1).Value2 = [string]$vals[$k] }
    $pit = Join-Path $PROG "$num.PIT"
    if (Test-Path -LiteralPath $pit) { $ws.Hyperlinks.Add($ws.Cells.Item($r, 7), $pit, '', 'Abrir o programa Fagor', $num) | Out-Null }
    $mcsN = $num.TrimStart('0'); $mcs = Join-Path $PROG "MCS 500\$mcsN.txt"
    if (Test-Path -LiteralPath $mcs) { $ws.Hyperlinks.Add($ws.Cells.Item($r, 8), $mcs, '', 'Abrir o MCS 500', "$mcsN.txt") | Out-Null }
    else { $ws.Cells.Item($r, 8).Value2 = 'FALTA' }
    if ($x.desenho) {
      $pdf = Join-Path $PROJ $x.desenho
      if (Test-Path -LiteralPath $pdf) { $ws.Hyperlinks.Add($ws.Cells.Item($r, 9), $pdf, '', 'Abrir o desenho', 'PDF') | Out-Null }
    }
    $have["$($x.op)|$num"] = 1; $r++; $added++
  }
  $ws.Range('A:N').Columns.AutoFit() | Out-Null
  $ws.Columns.Item(4).ColumnWidth = 48; $ws.Columns.Item(14).ColumnWidth = 50
  if (Test-Path -LiteralPath $XLSX) { $wb.Save() } else { $wb.SaveAs($XLSX, 51) }
  $wb.Close($false)
  "Controle: $added linha(s) nova(s) em $XLSX"
} finally { $xl.Quit(); [Runtime.InteropServices.Marshal]::ReleaseComObject($xl) | Out-Null }
