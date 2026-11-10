# Fila de pedidos do Simulador para o cadastro ARGUS (v5.6.0).
# O Simulador grava DESENHOS\_PEDIDOS ARGUS\<item>_<programa>.json ao salvar/imprimir um desenho com "Cód. interno" preenchido.
# Quem aplica e o Claude, pelo Kuru > PCP > Setores > Pargus > Catalogo de Itens:
#   buscar o item -> editar -> Outras Informacoes: Anexo 1 = caminho do PDF -> Part Seals: Codigo do programa -> F9 Salvar no ARGUS.
# Uso:
#   pedidos_argus.ps1                      -> lista os pendentes (confere se o PDF existe)
#   pedidos_argus.ps1 -Feito 45996_046134  -> move o pedido para _PEDIDOS ARGUS\feitos (com data)
#   pedidos_argus.ps1 -Erro 45996_046134 -Motivo "programa nao aceito no campo" -> marca erro e mantem na fila
#   pedidos_argus.ps1 -Item 45996 -Programa 046134 [-Pdf "W:\...pdf"] -> cria o pedido de um desenho ja salvo
#       (ex.: OP gerada pela rotina antes da v5.7.0). Sem -Pdf, acha o PDF em DESENHOS\<PERFIL>\<... NNNNN>\ pelo numero.
param([string]$Feito = '', [string]$Erro = '', [string]$Motivo = '', [string]$Item = '', [string]$Programa = '', [string]$Pdf = '')
$ErrorActionPreference = 'Stop'
$Q = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS\_PEDIDOS ARGUS'
$F = Join-Path $Q 'feitos'
$enc = New-Object Text.UTF8Encoding $false
if ($Item) {
  if ($Item -notmatch '^\d+$') { throw "item '$Item' nao e numero" }
  $prog = $Programa -replace '\D', ''; $n = $prog.TrimStart('0')
  if (-not $Pdf) {
    if (-not $n) { throw 'informe -Programa ou -Pdf' }
    $D = Split-Path -Parent $Q
    $c = @(Get-ChildItem -LiteralPath $D -Directory | Where-Object { $_.Name -notlike '_*' } | ForEach-Object {
      Get-ChildItem -LiteralPath $_.FullName -Directory -Filter "* $n" } | ForEach-Object { Join-Path $_.FullName "$($_.Name).pdf" } | Where-Object { Test-Path -LiteralPath $_ })
    if ($c.Count -ne 1) { throw "PDF do programa $n $(if ($c.Count) { 'achado em mais de uma pasta: ' + ($c -join ' | ') } else { 'nao achado em DESENHOS' }); use -Pdf" }
    $Pdf = $c[0]
  }
  if (-not (Test-Path -LiteralPath $Pdf)) { throw "PDF nao existe: $Pdf" }
  if ($prog) { $prog = '{0:D6}' -f [int]$prog }
  $perfil = Split-Path -Leaf (Split-Path -Parent (Split-Path -Parent $Pdf))
  New-Item -ItemType Directory -Force $Q | Out-Null
  $rec = [ordered]@{ item = $Item; programa = $prog; anexo1 = $Pdf; perfil = $perfil; criado = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ'); status = 'pendente' }
  $nm = "$($Item)_$(if ($prog) { $prog } else { 'sem-programa' })"
  [IO.File]::WriteAllText((Join-Path $Q "$nm.json"), ($rec | ConvertTo-Json), $enc)
  "pedido criado: $nm -> $Pdf"; return
}
if (-not (Test-Path -LiteralPath $Q)) { 'Nenhum pedido (pasta _PEDIDOS ARGUS ainda nao existe).'; return }
function Load($f) { [IO.File]::ReadAllText($f, [Text.Encoding]::UTF8) | ConvertFrom-Json }
if ($Feito -or $Erro) {
  $nm = if ($Feito) { $Feito } else { $Erro }; $f = Join-Path $Q ($nm -replace '\.json$', '') ; $f += '.json'
  if (-not (Test-Path -LiteralPath $f)) { throw "pedido nao encontrado: $f" }
  $r = Load $f; $agora = (Get-Date).ToString('dd/MM/yyyy HH:mm')
  if ($Feito) {
    $r.status = 'feito'; $r | Add-Member -Force NoteProperty gravado $agora
    New-Item -ItemType Directory -Force $F | Out-Null
    [IO.File]::WriteAllText((Join-Path $F ([IO.Path]::GetFileName($f))), ($r | ConvertTo-Json), $enc); Remove-Item -LiteralPath $f
    "feito: $nm"
  } else {
    $r.status = 'erro'; $r | Add-Member -Force NoteProperty erro "$agora - $Motivo"
    [IO.File]::WriteAllText($f, ($r | ConvertTo-Json), $enc); "erro anotado: $nm"
  }
  return
}
$l = @(Get-ChildItem -LiteralPath $Q -Filter *.json -File | Sort-Object LastWriteTime)
if (-not $l.Count) { 'Nenhum pedido pendente.'; return }
$l | ForEach-Object { $r = Load $_.FullName
  [pscustomobject]@{ pedido = $_.BaseName; item = $r.item; programa = $r.programa; status = $r.status
    pdf_ok = (Test-Path -LiteralPath $r.anexo1); anexo1 = $r.anexo1; criado = $r.criado; erro = $r.erro } }
