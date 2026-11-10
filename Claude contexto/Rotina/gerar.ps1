# Rotina noturna (Claude): gera programa Fagor (.PIT), MCS 500 (.txt) e desenho (PDF) pelo Simulador CNC,
# em segundo plano (Edge headless), e grava tudo em "Para conferir\<data>" para o usuario conferir e liberar.
# Uso:  powershell -ExecutionPolicy Bypass -File gerar.ps1 -Jobs jobs.json [-Data 07-11-2026] [-DryRun]
# jobs.json = lista: [{ "op":"31053/1", "item":"45961", "desc":"GAXETA 12 X 25 X 8 PSH-106 PU", "cliente":"JSL S.B.O", "qtd":6,
#                       "type":"psh106", "p":{"dint":12,"dext":25,"h":8}, "dwg":{"mat":"PU","qtd":"6"} }, ...]
param([Parameter(Mandatory)][string]$Jobs, [string]$Data = (Get-Date).AddDays(1).ToString('dd-MM-yyyy'), [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$PROG   = 'W:\Parts\PartsSeals\PROJETOS\Programas_CNC'
$SIM    = 'W:\Parts\PartsSeals\PROJETOS\PROGRAMAÇÃO\PADRONIZAÇÃO\Arruela Padronizada\Simulador CNC.html'
$ROT    = Split-Path -Parent $MyInvocation.MyCommand.Path
$CONF   = 'W:\Parts\PartsSeals\PROJETOS\PROGRAMAÇÃO\Para conferir'
$OUT    = Join-Path $CONF $Data
$EDGE   = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
$WORK   = Join-Path $env:TEMP 'claude_rotina'
$cp1252 = [Text.Encoding]::GetEncoding(1252)
New-Item -ItemType Directory -Force $WORK | Out-Null

# ---------- 1. harness: Simulador atual do W: + script que gera e devolve tudo em JSON ----------
$inj = @'
<script>
(async function(){ const put = o => { const pre = document.createElement("pre"); pre.id = "HARNESS_OUT"; pre.textContent = "@@@" + JSON.stringify(o) + "@@@"; document.body.appendChild(pre); };
 try{
  const q = JSON.parse(decodeURIComponent(location.hash.slice(1)));
  if (q.orient) state.orient = q.orient;
  const p = profDefaults(q.type); if (q.type === "psa108") { p.chE = ""; p.chI = ""; }   // sem isso ficava o chanfro do exemplo (2,9 -> 0,29); vazio = sugestao pela altura
  Object.assign(p, q.p); p.tipoGen = q.type;
  if (q.type === "psa108" && typeof psaTolFill === "function") psaTolFill(p);   // v5.5.0: tolerancia padrao do desenho (Ø pela tabela, altura 0/-0,1)
  if (!(q.p && q.p.mat) && q.dwg && q.dwg.mat) p.mat = q.dwg.mat;   // material da peca escolhe as ferramentas (Teflon: T7D7/T4D4/T8D8)
  if (!(q.p && q.p.matA) && p.mat && typeof ARR_MAT === "object") { const m = String(p.mat).toUpperCase().replace(/\s+/g, ""); p.matA = /^PTFE\+BR/.test(m) ? "PTFEBR" : /TEFLON|^PTFE/.test(m) ? "PTFE" : /POM|ACETAL/.test(m) ? "POM" : /NYLON|PEAD/.test(m) ? "NYLON" : /CELERON/.test(m) ? "CELERON" : /NBR|BORRACHA/.test(m) ? "NBR" : "PU"; }   // arruelas (ciclo/semch/psa108): material -> ferramentas
  if (!p.aloj && /ALOJ/i.test(q.desc || "")) p.aloj = "S";              // "ALOJAMENTO" na descricao: altura menor (4 %, 0,3 a 1 mm)
  const alojTxt = (typeof applyAloj === "function") ? applyAloj(p) : "";
  if (q.type === "lip") p.dext = p.dint + 2 * p.sec;
  for (const [k,v] of Object.entries(Object.assign({prog: q.num || ""}, q.dwg || {}))) { const el = document.querySelector('#dwgFields [data-d="'+k+'"]'); if (el) el.value = v; }
  const lines = GEN[q.type].build(p), fag = lines.join("\n");
  const out = {ok:true, aloj: alojTxt, check: GEN[q.type].check ? (GEN[q.type].check(p) || "") : "", fagor: fag, mcs: fagorToMcs(fag),
               desFam: (DESENHO_TYPES.includes(q.type) ? desFam(p) : ""), desName: (DESENHO_TYPES.includes(q.type) ? desenhoFolderName(p, q.num || "0") : "")};
  if (DESENHO_TYPES.includes(q.type) && !(q.type === "iso" && pieceKind(p) === "dp")) {
    try { const b = await drawingPdfBytes(p); let s = ""; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); out.pdf = btoa(s); } catch(e){ out.pdfErr = String(e); }
  } else out.pdfErr = "perfil sem desenho automatico (fazer a mao)";
  put(out);
 }catch(e){ put({ok:false, err:String(e && e.stack || e)}); } })();
</script></body>
'@
$h = [IO.File]::ReadAllText($SIM, [Text.Encoding]::UTF8)
$i = $h.LastIndexOf('</body>')
$HARN = Join-Path $WORK 'harness.html'
[IO.File]::WriteAllText($HARN, $h.Substring(0, $i) + $inj + $h.Substring($i + 7), (New-Object Text.UTF8Encoding $false))

function Invoke-Sim($q) {
  $ud  = Join-Path $WORK 'edgeprof'; $dom = Join-Path $WORK 'dom.txt'
  $url = 'file:///' + ($HARN -replace '\\', '/') + '#' + [uri]::EscapeDataString(($q | ConvertTo-Json -Compress -Depth 5))
  if (Test-Path $dom) { Remove-Item $dom -Force }
  Start-Process -FilePath $EDGE -ArgumentList @('--headless=new', '--disable-gpu', '--no-first-run', "--user-data-dir=`"$ud`"", '--virtual-time-budget=20000', '--dump-dom', "`"$url`"") `
    -RedirectStandardOutput $dom -RedirectStandardError (Join-Path $WORK 'err.txt') -Wait -WindowStyle Hidden
  $s  = [IO.File]::ReadAllText($dom, [Text.Encoding]::UTF8)
  $ms = [regex]::Matches($s, '<pre id="HARNESS_OUT">@@@(.*?)@@@</pre>', 'Singleline')
  if (-not $ms.Count) { return [pscustomobject]@{ ok = $false; err = 'Simulador nao respondeu' } }
  return ([Net.WebUtility]::HtmlDecode($ms[$ms.Count - 1].Groups[1].Value) | ConvertFrom-Json)
}

# ---------- 2. indice dos cabecalhos (1a linha) de todos os .PIT, para achar programa ja existente ----------
function Get-Key([string]$hdr) {
  $m = [regex]::Match($hdr, '^%\s*([A-Z0-9 ]+?)(?:-[A-Z0-9]+)*\s+([\d.]+)\s*/\s*([\d.]+)(?:\s*/\s*([\d.]+))?(?:\s*/\s*([\d.]+))?')
  if (-not $m.Success) { $m = [regex]::Match($hdr, '^%\s*([A-Z]+\s*\d+[A-Z]?)\s+([\d.]+)X([\d.]+)(?:X([\d.]+))?(?:X([\d.]+))?') }   # "%PSA 108 50.4X57X3.1"
  if (-not $m.Success) { return @() }
  $prof = ($m.Groups[1].Value -replace '\s', '')
  $inv = [Globalization.CultureInfo]::InvariantCulture; $dl = @()
  foreach ($g in 2..5) { $v = $m.Groups[$g].Value.TrimEnd('.'); if (-not $v) { continue }; $d = 0.0
    if (-not [double]::TryParse($v, [Globalization.NumberStyles]::Float, $inv, [ref]$d)) { return @() }; $dl += [math]::Round($d, 2).ToString($inv) }
  $dims = $dl -join '/'
  $profs = if ($prof -eq 'PSHPSE106') { @('PSH106', 'PSE106') } else { @($prof) }
  return @($profs | ForEach-Object { "$_ $dims" })
}
$IDX = Join-Path $ROT 'indice_pit.csv'
& (Join-Path $ROT 'indice.ps1') -Prog $PROG | Out-Null
$hdrs = @{}
[IO.File]::ReadAllLines($IDX, [Text.Encoding]::UTF8) | Select-Object -Skip 1 | ForEach-Object { $c = $_.Split("`t"); if ($c.Count -ge 3) { $hdrs[$c[0]] = $c[2] } }
$byKey = @{}
foreach ($e in $hdrs.GetEnumerator()) { foreach ($k in (Get-Key $e.Value)) { if (-not $byKey[$k]) { $byKey[$k] = @() }; $byKey[$k] += $e.Key } }
. (Join-Path $ROT 'duplicados.ps1') -DupProg $PROG -DupDes 'W:\Parts\PartsSeals\PROJETOS\DESENHOS'   # Find-Dup (v5.1.0)

# ---------- 3. numeracao: proximo numero depois do maior da pasta Programas_CNC (e dos ja reservados em Para conferir) ----------
function Get-MaxNum {
  $n = 0
  Get-ChildItem -LiteralPath $PROG -Filter '0*.PIT' -File | ForEach-Object { if ($_.Name -match '^(\d{6})') { $v = [int]$matches[1]; if ($v -gt $n -and $v -lt 900000) { $n = $v } } }
  if (Test-Path $CONF) { Get-ChildItem -LiteralPath $CONF -Recurse -Filter '*.PIT' -File | ForEach-Object { if ($_.Name -match '^(\d{6})') { $v = [int]$matches[1]; if ($v -gt $n) { $n = $v } } } }
  return $n
}

# ---------- 4. gerar ----------
# fila do ARGUS (mesmo formato do pedidoArgus() do Simulador e do pedidos_argus.ps1)
function New-PedidoArgus([string]$item, [string]$prog, [string]$pdf, [string]$perfil) {
  $q = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS\_PEDIDOS ARGUS'; New-Item -ItemType Directory -Force $q | Out-Null
  $rec = [ordered]@{ item = $item; programa = $prog; anexo1 = $pdf; perfil = $perfil; criado = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ'); status = 'pendente' }
  [IO.File]::WriteAllText((Join-Path $q "$($item)_$prog.json"), ($rec | ConvertTo-Json), (New-Object Text.UTF8Encoding $false))
  return "Pedido ARGUS na fila: item $item (Anexo 1 + programa $prog). "
}
$tmp = ConvertFrom-Json ([IO.File]::ReadAllText($Jobs, [Text.Encoding]::UTF8)); $jobsList = @(); foreach ($x in $tmp) { $jobsList += $x }
# Destino (pedido do usuario 06/11/2026): pastas normais -> Programas_CNC (.PIT), Programas_CNC\MCS 500 (.txt), PROJETOS\DESENHOS (PDF).
# Numero: antes de CADA programa rele o maior numero da pasta (o usuario tambem salva ao mesmo tempo) e nunca sobrescreve arquivo existente.
$DES = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS'
$REL = Join-Path $ROT 'relatorios'
if (-not $DryRun) { New-Item -ItemType Directory -Force $REL | Out-Null }
$next = 0
$res = @()
foreach ($j in $jobsList) {
  $r = [ordered]@{ op = $j.op; item = $j.item; desc = $j.desc; cliente = $j.cliente; type = $j.type; status = ''; numero = ''; desenho = ''; obs = '' }
  try {
    $pp = @{}; $j.p.PSObject.Properties | ForEach-Object { $pp[$_.Name] = $_.Value }
    $dw = @{}; if ($j.dwg) { $j.dwg.PSObject.Properties | ForEach-Object { $dw[$_.Name] = $_.Value } }
    if (-not $dw.ContainsKey('cod') -and "$($j.item)".Trim()) { $dw['cod'] = "$($j.item)".Trim() }   # v5.3.0: croqui "COD INTERNO" = codigo do item
    # v5.2.0: CADASTRO do Kuru (OP -> Visualizar Cadastro -> aba Part Seals) manda (usuario 09/11: cabecalhos dos .PIT estao errados na maioria).
    #   "cad": {"prog":"46012", "bucha":"106X129 PU (PINCA)"}  -> prog preenchido = programa ja existe (so atribuir); bucha = a da fabrica.
    if ($j.cad -and "$($j.cad.prog)".Trim()) {
      $cp = [int](("$($j.cad.prog)" -replace '\D', '')); $cf = @(Get-ChildItem -LiteralPath $PROG -Filter ('{0:D6}*.PIT' -f $cp) -File -ErrorAction SilentlyContinue | ForEach-Object Name)
      if ($cf.Count) { $r.status = 'JA EXISTE'; $r.numero = ($cf -join ', '); $r.obs = "Cadastro (Part Seals) ja aponta o programa $($j.cad.prog): so atribuir."; $res += [pscustomobject]$r; continue }
      $r.status = 'VERIFICAR'; $r.numero = "$($j.cad.prog)"; $r.obs = "Cadastro aponta o programa $($j.cad.prog), mas o .PIT nao esta em Programas_CNC: conferir."; $res += [pscustomobject]$r; continue
    }
    if ($j.cad -and "$($j.cad.bucha)".Trim() -and -not $pp.ContainsKey('bi')) {
      $bu = "$($j.cad.bucha)".ToUpper() -replace ',', '.'
      if ($bu -match '([\d.]+)\s*X\s*([\d.]+)') { $pp['bi'] = [double]$matches[1]; $pp['bo'] = [double]$matches[2] }
      elseif ($bu -match 'TARUGO\s*([\d.]+)') { $pp['bi'] = 0; $pp['bo'] = [double]$matches[1] }
      $r.obs += "Bucha do cadastro: $($j.cad.bucha). "
    }
    # v5.1.0: conferencia de programa ja existente (cabecalhos + desenhos + altura do corte) ANTES de reservar numero.
    # VERIFICAR = provavel duplicado: nao gera; para gerar mesmo assim, por "forcar": true no job.
    # v5.4.0: "forcar": true tambem passa por JA EXISTE (usuario pediu programa NOVO mesmo havendo antigo); fica anotado na obs.
    $dup = Find-Dup $j.type $j.p
    if ($j.forcar -and $dup.status -in 'JA EXISTE', 'VERIFICAR') { $r.obs += "FORCADO (usuario pediu novo); ja existiam: $($dup.numeros). " }
    elseif ($dup.status -eq 'JA EXISTE' -or $dup.status -eq 'VERIFICAR') {
      $r.status = $dup.status; $r.numero = $dup.numeros
      $r.obs = if ($dup.status -eq 'JA EXISTE') { "Programa com o mesmo perfil e medidas ja existe: so atribuir ($($dup.detalhe))." } else { "Possivel duplicado: $($dup.detalhe). Se nao for, por ""forcar"": true no job." }
      $res += [pscustomobject]$r; continue
    }
    if ($dup.status -eq 'SEM CONFERENCIA') { $r.obs += "ATENCAO: $($dup.detalhe). " }
    $n = [math]::Max($next, (Get-MaxNum) + 1)
    while ((Test-Path -LiteralPath (Join-Path $PROG ('{0:D6}.PIT' -f $n))) -or (Test-Path -LiteralPath (Join-Path $PROG "MCS 500\$n.txt"))) { $n++ }
    $num = '{0:D6}' -f $n
    $o = Invoke-Sim @{ type = $j.type; num = $num; p = $pp; dwg = $dw; desc = [string]$j.desc }
    if (-not $o.ok) { throw $o.err }
    $hdr = (($o.fagor -split "`n")[0]).Trim()
    $exist = @(); foreach ($k in (Get-Key $hdr)) { if ($byKey[$k]) { $exist += $byKey[$k] } }
    $exist = @($exist | Sort-Object -Unique)
    if ($exist.Count -and -not $j.forcar) { $r.status = 'JA EXISTE'; $r.numero = ($exist -join ', '); $r.obs = 'Programa com o mesmo perfil e medidas ja esta em Programas_CNC: so atribuir.'; $res += [pscustomobject]$r; continue }
    if ($o.check) { $r.obs += "Aviso do Simulador: $($o.check). " }
    if ($o.aloj)  { $r.obs += "$($o.aloj). " }
    $r.numero = $num; $r.status = 'GERADO'; $next = $n + 1
    if (-not $DryRun) {
      $fp = Join-Path $PROG "$num.PIT"; $fm = Join-Path $PROG "MCS 500\$n.txt"
      if ((Test-Path -LiteralPath $fp) -or (Test-Path -LiteralPath $fm)) { throw "numero $num ficou ocupado durante a geracao" }
      [IO.File]::WriteAllText($fp, (($o.fagor -replace "`r", '') -replace "`n", "`r`n"), $cp1252)
      [IO.File]::WriteAllText($fm, (($o.mcs -replace "`r", '') -replace "`n", "`r`n"), $cp1252)
      if ($o.pdf) {
        $dd = Join-Path $DES "$($o.desFam)\$($o.desName)"; $pdf = Join-Path $dd "$($o.desName).pdf"
        if (Test-Path -LiteralPath $pdf) { $r.obs += 'Desenho ja existia (mantido). ' }
        else { New-Item -ItemType Directory -Force $dd | Out-Null; [IO.File]::WriteAllBytes($pdf, [Convert]::FromBase64String($o.pdf)); $r.desenho = "DESENHOS\$($o.desFam)\$($o.desName)\$($o.desName).pdf" }
        # v5.7.0: pedido do Anexo 1 / Codigo do programa no ARGUS (antes so o Simulador na tela gravava; OP 31205/2 ficou de fora)
        if ("$($j.item)".Trim() -match '^\d+$') {
          try { $r.obs += (New-PedidoArgus "$($j.item)".Trim() $num $pdf $o.desFam) } catch { $r.obs += "Pedido ARGUS NAO gravado: $_. " }
        } else { $r.obs += 'Sem item numerico: pedido ARGUS (Anexo 1) nao gravado. ' }
      } else { $r.obs += "Desenho: $($o.pdfErr). " }
    }
  } catch { $r.status = 'ERRO'; $r.obs = "$_" }
  $res += [pscustomobject]$r
}
if (-not $DryRun) {
  $resCsv = Join-Path $REL "resultado_$Data.csv"
  $res | Export-Csv $resCsv -NoTypeInformation -Encoding UTF8 -Delimiter ';'
  # planilha de controle do usuario (PROGRAMACAO\Controle de Programas.xlsx); se estiver aberta, avisa e segue
  try { & (Join-Path $ROT 'controle.ps1') -Csv $resCsv -Entrega ($Data -replace '-', '/') } catch { Write-Warning "Controle de Programas nao atualizado: $_ (rodar controle.ps1 depois)" }
}
$res | ConvertTo-Json -Depth 3
