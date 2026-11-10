# Fila de pedidos do Simulador para o cadastro ARGUS (v5.6.0).
# O Simulador grava DESENHOS\_PEDIDOS ARGUS\<item>_<programa>.json ao salvar/imprimir um desenho com "Cód. interno" preenchido.
# Quem aplica e o Claude, pelo Kuru > PCP > Setores > Pargus > Catalogo de Itens:
#   buscar o item -> editar -> Outras Informacoes: Anexo 1 = caminho do PDF -> Part Seals: Codigo do programa -> F9 Salvar no ARGUS.
# Uso:
#   pedidos_argus.ps1                      -> lista os pendentes (confere se o PDF existe)
#   pedidos_argus.ps1 -Feito 45996_046134  -> move o pedido para _PEDIDOS ARGUS\feitos (com data)
#   pedidos_argus.ps1 -Erro 45996_046134 -Motivo "programa nao aceito no campo" -> marca erro e mantem na fila
param([string]$Feito = '', [string]$Erro = '', [string]$Motivo = '')
$ErrorActionPreference = 'Stop'
$Q = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS\_PEDIDOS ARGUS'
$F = Join-Path $Q 'feitos'
if (-not (Test-Path -LiteralPath $Q)) { 'Nenhum pedido (pasta _PEDIDOS ARGUS ainda nao existe).'; return }
$enc = New-Object Text.UTF8Encoding $false
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
