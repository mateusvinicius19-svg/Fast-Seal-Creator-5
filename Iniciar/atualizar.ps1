# Fast Seal Creator - atualizador (o "Abrir Simulador.bat" baixa este arquivo da main e roda a cada abertura).
# Baixa a main para %LOCALAPPDATA%\FastSealCreator\app-<commit> (uma pasta por versao: a antiga pode estar em uso pelo
# servidor e o Windows nao deixa apagar), roda Iniciar\abrir.ps1 da versao nova e depois apaga as pastas antigas.
# Arquivo so com ASCII (PowerShell 5.1).
# v5.95.0: -SoBaixar = roda escondido, por tras, so baixa a versao nova (sem abrir nada) - usado quando o GitHub demora.
param([string]$Root = (Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'FastSealCreator'), [switch]$SoBaixar)
$ErrorActionPreference = 'Stop'
$repo = 'mateusvinicius19-svg/Fast-Seal-Creator-5'
New-Item -ItemType Directory -Force $Root | Out-Null
$log = Join-Path $Root 'log.txt'
$erros = New-Object System.Collections.ArrayList
function Log($t) { Add-Content -LiteralPath $log -Value ("{0:dd/MM HH:mm:ss} {1}" -f (Get-Date), $t) }
function Falha($onde, $e) { $m = "$onde -> $e"; [void]$erros.Add($m); Log $m }
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}
try { $px = [Net.WebRequest]::GetSystemWebProxy(); $px.Credentials = [Net.CredentialCache]::DefaultNetworkCredentials; [Net.WebRequest]::DefaultWebProxy = $px } catch {}
$curl = Join-Path $env:WINDIR 'System32\curl.exe'
# v5.95.0: cada pedido tem prazo ($ms). A consulta da versao usa prazo curto: se o GitHub demorar (a primeira conexao do
# dia as vezes trava 10 s ou mais), abre a versao ja baixada em vez de deixar a janela preta esperando.
function Baixar([string]$url, [string]$Out, [int]$ms = 120000) {
  $tempo = $false
  try {
    $rq = [Net.HttpWebRequest]::Create($url); $rq.Timeout = $ms; $rq.ReadWriteTimeout = $ms
    $rq.UserAgent = 'FastSealCreator'; $rq.Proxy = [Net.WebRequest]::DefaultWebProxy
    $rs = $rq.GetResponse(); $st = $rs.GetResponseStream()
    try {
      if ($Out) { $fs = [IO.File]::Create($Out); try { $st.CopyTo($fs) } finally { $fs.Close() }; return $true }
      $mem = New-Object IO.MemoryStream; $st.CopyTo($mem); return [Text.Encoding]::UTF8.GetString($mem.ToArray())
    } finally { $st.Close(); $rs.Close() }
  } catch {
    $e = $_.Exception; while ($e.InnerException) { $e = $e.InnerException }
    if ($e -is [Net.WebException] -and $e.Status -eq [Net.WebExceptionStatus]::Timeout) { $tempo = $true }
    Falha "PowerShell $url" $e.Message
  }
  if ($tempo -and $ms -lt 60000) { return $null }   # consulta rapida que estourou o prazo: nao tenta de novo pelo curl
  if (Test-Path $curl) {
    $tmp = if ($Out) { $Out } else { Join-Path $Root 'dl.txt' }
    $ErrorActionPreference = 'Continue'   # PS 5.1: stderr do curl com 'Stop' vira erro fatal
    $msg = & $curl -fsSL --ssl-no-revoke --proxy-ntlm -U : -A FastSealCreator --max-time ([math]::Ceiling($ms / 1000)) -o $tmp $url 2>&1
    if ($LASTEXITCODE -eq 0) { if ($Out) { return $true } else { return [IO.File]::ReadAllText($tmp, [Text.Encoding]::UTF8) } }
    Falha "curl $url" "codigo $LASTEXITCODE $msg"
  }
  return $null
}
try {
  Write-Host 'Procurando a versao mais nova no GitHub...'
  $best = $null
  $relogio = [Diagnostics.Stopwatch]::StartNew()
  # v5.95.0: o DNS da rede da fabrica (172.16.99.32) nao responde nomes da internet; cada nome novo espera ~11 s ate o Windows
  # tentar o DNS do Wi-Fi, e o github.com so fica guardado 60 s. O prazo do .NET nao conta o DNS, entao pergunta o DNS antes
  # (os nomes juntos) com prazo de 3 s; sem resposta, abre a versao ja baixada e baixa a nova por tras.
  $dnsLento = $false
  if (-not $SoBaixar) { try {
    $u = [uri]'https://github.com/'
    if (-not $px -or $px.IsBypassed($u) -or $px.GetProxy($u) -eq $u) {
      $dns = @('github.com', 'raw.githubusercontent.com', 'codeload.github.com' | ForEach-Object { [Net.Dns]::GetHostAddressesAsync($_) })
      if (-not $dns[0].Wait(3000)) { $dnsLento = $true }
    } } catch {} }
  $msC = if ($SoBaixar) { 60000 } else { 5000 }
  if (-not $dnsLento) {
    $refs = Baixar "https://github.com/$repo.git/info/refs?service=git-upload-pack" -ms $msC
    if ($refs) { $m = [regex]::Match($refs, '([0-9a-f]{40}) refs/heads/main\b'); if ($m.Success) { $best = @{ sha = $m.Groups[1].Value } } }
    if (-not $best -and $relogio.ElapsedMilliseconds -lt $msC) { $j = Baixar "https://api.github.com/repos/$repo/commits/main" -ms $msC; if ($j) { $best = @{ sha = ($j | ConvertFrom-Json).sha } } }
    if ($best) { $v = Baixar "https://raw.githubusercontent.com/$repo/$($best.sha)/VERSION" -ms $msC; $best.v = if ($v) { $v.Trim() } else { $best.sha.Substring(0, 7) } }
  }
  Log ($(if ($SoBaixar) { 'por tras: ' } else { '' }) + "main: " + $(if ($best) { "$($best.v) $($best.sha)" } elseif ($dnsLento) { 'DNS lento, nao esperei' } else { 'sem resposta' }) + " ($($relogio.ElapsedMilliseconds) ms)")
  $atual = ''; if (Test-Path "$Root\sha.txt") { $atual = (Get-Content "$Root\sha.txt" -Raw).Trim() }
  $appDe = { param($sha) Join-Path $Root ('app-' + $sha.Substring(0, 10)) }
  if (-not $best -and -not ($atual -and (Test-Path -LiteralPath (Join-Path (& $appDe $atual) 'Iniciar\abrir.ps1')))) {
    # sem versao baixada neste PC: ai vale esperar o GitHub (prazo longo)
    $refs = Baixar "https://github.com/$repo.git/info/refs?service=git-upload-pack" -ms 60000
    if ($refs) { $m = [regex]::Match($refs, '([0-9a-f]{40}) refs/heads/main\b'); if ($m.Success) { $best = @{ sha = $m.Groups[1].Value; v = $m.Groups[1].Value.Substring(0, 7) } } }
  }
  if ($best) {
    $app = & $appDe $best.sha
    if (-not (Test-Path -LiteralPath (Join-Path $app 'Iniciar\abrir.ps1'))) {
      Write-Host "Baixando a versao $($best.v) (main)..."
      Log "baixando $($best.v) $($best.sha)"
      $nm = if ($SoBaixar) { 'download-tras' } else { 'download' }
      $zip = Join-Path $Root "$nm.zip"; $tmp = Join-Path $Root $nm
      if (-not (Baixar "https://codeload.github.com/$repo/zip/$($best.sha)" -Out $zip)) {
        if (-not (Baixar "https://github.com/$repo/archive/$($best.sha).zip" -Out $zip)) { throw 'nao consegui baixar o zip do projeto' } }
      if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
      Add-Type -AssemblyName System.IO.Compression.FileSystem
      [IO.Compression.ZipFile]::ExtractToDirectory($zip, $tmp)
      $src = (Get-ChildItem $tmp -Directory | Select-Object -First 1).FullName
      if (-not (Test-Path -LiteralPath (Join-Path $src 'Simulador CNC.html'))) { throw 'o download veio sem o Simulador CNC.html' }
      if (Test-Path -LiteralPath $app) { Remove-Item -LiteralPath $app -Recurse -Force }
      Move-Item -LiteralPath $src -Destination $app
      Get-ChildItem $app -Recurse -File | Unblock-File
      Remove-Item $zip, $tmp -Recurse -Force -ErrorAction SilentlyContinue
    } else { Write-Host "Ja esta na versao mais nova ($($best.v))." }
    Set-Content "$Root\sha.txt" $best.sha
    if ($SoBaixar) { Log "por tras: pronta a $($best.v) (abre na proxima vez)"; exit 0 }
  } else {
    if ($SoBaixar) { exit 1 }
    if ($dnsLento) {
      Write-Host 'O GitHub esta demorando - abrindo a versao ja baixada (a atualizacao baixa por tras, para a proxima vez).' -ForegroundColor Yellow
      try { Start-Process powershell.exe -WindowStyle Hidden -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" -Root `"$Root`" -SoBaixar" } catch { Log "nao liguei o download por tras: $($_.Exception.Message)" }
    } else { Write-Host 'Nao consegui falar com o GitHub - usando a versao ja baixada.' -ForegroundColor Yellow }
    $app = if ($atual) { & $appDe $atual } else { '' }
    if (-not $app -or -not (Test-Path -LiteralPath (Join-Path $app 'Iniciar\abrir.ps1'))) { $app = Join-Path $Root 'app' }   # versao antiga do .bat
  }
  if (Test-Path -LiteralPath (Join-Path $app 'Iniciar\abrir.ps1')) {
    & (Join-Path $app 'Iniciar\abrir.ps1') -App $app
    # limpa as versoes antigas (as que ainda estiverem em uso ficam para a proxima vez)
    # v5.95.0: sem pasta antiga para apagar, fecha na hora (antes esperava 2 s sempre)
    # (nao apaga pasta mexida nos ultimos 10 min: pode ser a versao nova que o download por tras acabou de por)
    $velhas = @(Get-ChildItem -LiteralPath $Root -Directory | Where-Object { ($_.Name -like 'app-*' -or $_.Name -eq 'app') -and $_.FullName -ne $app -and $_.LastWriteTime -lt (Get-Date).AddMinutes(-10) })
    if ($velhas.Count) { Start-Sleep -Seconds 2 }
    $velhas | ForEach-Object { try { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction Stop } catch { Log "nao apaguei $($_.FullName) (em uso)" } }
    exit 0
  }
  $w = Get-ChildItem 'W:\Parts\PartsSeals\PROJETOS\PROGRAMA*O\PADRONIZA*O\Arruela Padronizada\Simulador CNC.html' -ErrorAction SilentlyContinue | Select-Object -First 1
  Write-Host ''
  Write-Host 'NAO CONSEGUI BAIXAR DO GITHUB. Motivos:' -ForegroundColor Red
  $erros | Select-Object -First 8 | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
  Write-Host "(lista completa em $log)"
  if ($w) { Write-Host "Abrindo a copia do W: $($w.FullName)" -ForegroundColor Yellow; Start-Process $w.FullName }
  exit 1
} catch {
  Log "ERRO: $($_.Exception.Message)"
  Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
  $erros | Select-Object -First 8 | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
  Write-Host "(log em $log)"; exit 1
}
