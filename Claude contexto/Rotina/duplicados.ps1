# Conferência de programa já existente (mesmo perfil + mesmas medidas) ANTES de gerar número novo.  (v5.1.0, 09/11/2026)
# Fontes: 1) cabeçalho (1a linha) de todos os .PIT de Programas_CNC (indice_pit.csv), nos 2 formatos:
#            "%PSR 102 110X125X9X12" (antigo) e "%PSR102-P 110.000/125.000/9.000" (novo);
#            cabeçalho cortado em 21 caracteres (Kuru) = o último número pode estar incompleto -> compara como prefixo;
#         2) nome das pastas de desenho: DESENHOS\<PERFIL>\<PERFIL> (a X b X c [X d]) NNNNN -> número do programa.
# Resultado: JA EXISTE (certo) | VERIFICAR (provável, falta medida no cabeçalho e não há desenho p/ confirmar) | NOVO.
# Uso sozinho:  duplicados.ps1 -JobsFile jobs_dd-MM-aaaa.json      (dentro do gerar.ps1 é carregado com ". duplicados.ps1")
param([string]$JobsFile = '', [string]$DupProg = 'W:\Parts\PartsSeals\PROJETOS\Programas_CNC', [string]$DupDes = 'W:\Parts\PartsSeals\PROJETOS\DESENHOS')
$DUP_ROT = Split-Path -Parent $MyInvocation.MyCommand.Path
$DUP_INV = [Globalization.CultureInfo]::InvariantCulture

function Dup-Prof([string]$type) {
  if ($type -match '^(psh|pse|psr|pso|psa)(\d{3})$') { return ($matches[1].ToUpper() + $matches[2]) }
  if ($type -eq 'lip') { return 'PSH129' }
  if ($type -in @('iso', 'ciclo', 'semch')) { return 'PSA108' }
  return ''
}
function Dup-Num($v) { if ($null -eq $v -or "$v" -eq '') { return $null }; $d = 0.0; if ([double]::TryParse(("$v" -replace ',', '.'), [Globalization.NumberStyles]::Float, $DUP_INV, [ref]$d)) { return $d }; return $null }
# medidas esperadas na ordem do cabeçalho/desenho: Ø int, Ø ext, alturas
function Dup-JobDims([string]$type, $p) {
  $get = { param($n) $pr = $p.PSObject.Properties[$n]; if ($pr) { Dup-Num $pr.Value } else { if ($p -is [hashtable]) { Dup-Num $p[$n] } else { $null } } }
  $d = @((& $get 'dint'), (& $get 'dext'))
  if ($type -eq 'psr102') { $d += (& $get 'hh'); $d += (& $get 'h') }
  elseif ($type -eq 'psr211') { $d += (& $get 'hb'); $d += (& $get 'h') }
  else { $d += (& $get 'h') }
  if (@($d | Where-Object { $null -eq $_ }).Count) { return @() }
  return $d
}
# token do cabeçalho x valor; $prefix = token cortado (compara o começo do texto)
function Dup-Tok([string]$tok, [bool]$prefix, [double]$val) {
  $t = $tok.TrimEnd('.'); if (-not $t) { return $prefix }
  if ($prefix) { foreach ($f in @($val.ToString('0.###', $DUP_INV), $val.ToString('0.000', $DUP_INV))) { if ($f.StartsWith($t)) { return $true } }; return $false }
  $d = Dup-Num $t; return ($null -ne $d -and [math]::Abs($d - $val) -lt 0.006)
}
# "%PSR 102 110X125X9X12,MX---," -> @{ profs=@('PSR102'); toks=@(...); lastPartial=$bool }
function Dup-ParseHdr([string]$h) {
  $s = ($h -split ',')[0].TrimEnd()
  $m = [regex]::Match($s, '^%\s*([A-Z]+)\s*(\d{2,3})(\s+[A-Z](?=\s))?(?:-[A-Z0-9]+)*\s+([\d.]+(?:\s*[X/]\s*[\d.]*)*)')
  if (-not $m.Success) { return $null }
  $base = $m.Groups[1].Value; $prof = $base + $m.Groups[2].Value + ($m.Groups[3].Value -replace '\s', '')
  $profs = if ($base -eq 'PSHPSE') { @(('PSH' + $m.Groups[2].Value), ('PSE' + $m.Groups[2].Value)) } else { @($prof) }
  $raw = $m.Groups[4].Value -replace '\s', ''
  $trunc = ($s.Length -ge 21 -and $s.Length -le 22 -and ($m.Index + $m.Length) -ge $s.Length)
  $toks = @($raw -split '[X/]' | Where-Object { $_ -ne '' })
  return @{ profs = $profs; toks = $toks; lastPartial = ($trunc -and $raw -notmatch '[X/]$') }
}
# compara cabeçalho x esperado: 'certo' | 'possivel' | ''
function Dup-Cmp($ph, [double[]]$exp) {
  $t = $ph.toks; if ($t.Count -lt 2) { return '' }
  $n = [math]::Min($t.Count, $exp.Count)
  $ok = { param($ord) for ($i = 0; $i -lt $n; $i++) { $part = ($ph.lastPartial -and $i -eq $t.Count - 1); if (-not (Dup-Tok $t[$i] $part $exp[$ord[$i]])) { return $false } }; return $true }
  $ord1 = 0..($exp.Count - 1); $ord2 = @(1, 0) + $(if ($exp.Count -gt 2) { 2..($exp.Count - 1) } else { @() })
  if (-not ((& $ok $ord1) -or (& $ok $ord2))) { return '' }
  if ($t.Count -eq $exp.Count -and -not $ph.lastPartial) { return 'certo' }
  if ($t.Count -gt $exp.Count) { return '' }
  return 'possivel'
}
function Dup-Fam([string]$prof) { return ($prof -replace '^([A-Z]+)(\d+)', '$1 $2') }
$script:DUP_DES_CACHE = @{}
# pastas de desenho do perfil: @{ num = 46012; dims = @(110,125,9,12) }
function Dup-Desenhos([string]$prof) {
  if ($script:DUP_DES_CACHE.ContainsKey($prof)) { return $script:DUP_DES_CACHE[$prof] }
  $l = @(); $dir = Join-Path $DupDes (Dup-Fam $prof)
  if (Test-Path -LiteralPath $dir) {
    foreach ($f in [IO.Directory]::GetDirectories($dir)) {
      $nm = [IO.Path]::GetFileName($f)
      $m = [regex]::Match($nm, '\(([^)]*)\)\s*(\d{3,6})\s*[A-Z]?\s*$')
      if (-not $m.Success) { continue }
      $ds = @($m.Groups[1].Value -split '\s*[Xx]\s*' | ForEach-Object { Dup-Num $_ })
      if (@($ds | Where-Object { $null -eq $_ }).Count) { continue }
      $l += [pscustomobject]@{ num = [int]$m.Groups[2].Value; dims = $ds; nome = $nm }
    }
  }
  $script:DUP_DES_CACHE[$prof] = $l; return $l
}
function Dup-SameDims($a, [double[]]$exp) {
  if ($a.Count -ne $exp.Count) { return $false }
  $o1 = $true; $o2 = $true
  for ($i = 0; $i -lt $exp.Count; $i++) {
    if ([math]::Abs($a[$i] - $exp[$i]) -ge 0.006) { $o1 = $false }
    $j = if ($i -eq 0) { 1 } elseif ($i -eq 1) { 0 } else { $i }
    if ([math]::Abs($a[$j] - $exp[$i]) -ge 0.006) { $o2 = $false }
  }
  return ($o1 -or $o2)
}
function Dup-CutH([string]$file) {
  try { $l = [IO.File]::ReadAllLines($file, [Text.Encoding]::GetEncoding(1252)) } catch { return $null }
  $in = $false
  foreach ($x in $l) {
    if ($x -match 'CUTTING|PARTING|^\s*T5D5|^\s*T8D8') { $in = $true; continue }   # FSC novo (CUTTING) e antigo ("T5D5; (FACA)")
    if ($in -and $x -match '^\s*(?:G0?[01]\b.*)?Z(-[\d.]+)') { return [math]::Abs((Dup-Num $matches[1])) }
  }
  return $null
}
# índice dos cabeçalhos: arquivo -> cabeçalho (lido 1x)
$script:DUP_HDRS = $null
function Dup-LoadIdx {
  if ($null -ne $script:DUP_HDRS) { return }
  $idx = Join-Path $DUP_ROT 'indice_pit.csv'
  $script:DUP_HDRS = @()
  foreach ($ln in ([IO.File]::ReadAllLines($idx, [Text.Encoding]::UTF8) | Select-Object -Skip 1)) {
    $c = $ln.Split("`t"); if ($c.Count -lt 3) { continue }
    $ph = Dup-ParseHdr $c[2]; if ($ph) { $script:DUP_HDRS += [pscustomobject]@{ arq = $c[0]; ph = $ph } }
  }
}
# conferência de um job
function Find-Dup([string]$type, $p) {
  $prof = Dup-Prof $type; $exp = [double[]](Dup-JobDims $type $p)
  if (-not $prof -or $exp.Count -lt 3) { return [pscustomobject]@{ status = 'SEM CONFERENCIA'; numeros = ''; detalhe = "perfil/medidas nao conferidos ($type)" } }
  Dup-LoadIdx
  $des = Dup-Desenhos $prof
  $certos = @(); $poss = @(); $info = @(); $info2 = @()
  # 1) desenhos com as mesmas medidas e número -> programa existe?
  foreach ($d in $des) {
    if (-not (Dup-SameDims $d.dims $exp)) { continue }
    $pit = @(Get-ChildItem -LiteralPath $DupProg -Filter ('{0:D6}*.PIT' -f $d.num) -File -ErrorAction SilentlyContinue | ForEach-Object Name)
    foreach ($pf in $pit) {
      # o desenho sozinho não basta: o cabeçalho do .PIT tem de ser do mesmo perfil (025382 = desenho PSH 106 mas programa RS01P;
      # 031951.PIT = arquivo no formato MCS) -> senão vai para VERIFICAR
      $he = @($script:DUP_HDRS | Where-Object { $_.arq -eq $pf } | Select-Object -First 1)
      if ($he.Count -and $he[0].ph.profs -contains $prof -and (Dup-Cmp $he[0].ph $exp)) { $certos += $pf; $info += "desenho '$($d.nome)'" }
      else { $poss += $pf; $info2 += "$pf (desenho '$($d.nome)', cabecalho de outro perfil/formato)" }
    }
  }
  # 2) cabeçalhos dos .PIT
  foreach ($e in $script:DUP_HDRS) {
    if ($e.ph.profs -notcontains $prof) { continue }
    $r = Dup-Cmp $e.ph $exp
    if ($r -eq 'certo') { $certos += $e.arq }
    elseif ($r -eq 'possivel') {
      # confirma pelo desenho do mesmo número
      $nb = if ($e.arq -match '^(\d+)') { [int]$matches[1] } else { -1 }
      $dd = @($des | Where-Object { $_.num -eq $nb })
      if ($dd.Count) { if (@($dd | Where-Object { Dup-SameDims $_.dims $exp }).Count) { $certos += $e.arq } }
      else {
        # sem desenho: altura total = Z do corte (seção CUTTING / PARTING, 1o G1 com Z negativo)
        $hc = Dup-CutH (Join-Path $DupProg $e.arq)
        if ($null -eq $hc) { $poss += $e.arq }
        elseif ([math]::Abs($hc - $exp[$exp.Count - 1]) -lt 0.006) { $certos += $e.arq }
        elseif ($hc -gt $exp[$exp.Count - 1] -and $hc - $exp[$exp.Count - 1] -le 0.5) { $poss += $e.arq }   # programas antigos cortam com sobra (ex. 004446: h 12 -> Z-12.3)
      }
    }
  }
  $certos = @($certos | Sort-Object -Unique); $poss = @($poss | Where-Object { $certos -notcontains $_ } | Sort-Object -Unique)
  if ($certos.Count) { return [pscustomobject]@{ status = 'JA EXISTE'; numeros = ($certos -join ', '); detalhe = ((@('mesmo perfil e medidas') + $info) -join '; ') + $(if ($poss.Count) { "; tambem possivel: $($poss -join ', ')" } else { '' }) } }
  if ($poss.Count) { return [pscustomobject]@{ status = 'VERIFICAR'; numeros = ($poss -join ', '); detalhe = ((@('mesmas medidas, mas cabecalho incompleto ou de outro perfil/formato: abrir e conferir') + $info2) -join '; ') } }
  return [pscustomobject]@{ status = 'NOVO'; numeros = ''; detalhe = '' }
}

if ($JobsFile) {
  & (Join-Path $DUP_ROT 'indice.ps1') -Prog $DupProg | Out-Null
  $jl = ConvertFrom-Json ([IO.File]::ReadAllText($JobsFile, [Text.Encoding]::UTF8))
  foreach ($j in $jl) { $f = Find-Dup $j.type $j.p; [pscustomobject]@{ op = $j.op; desc = $j.desc; status = $f.status; numeros = $f.numeros; detalhe = $f.detalhe } }
}
