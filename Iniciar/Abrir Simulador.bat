@echo off
title Abrir Simulador CNC
rem Baixa do GitHub a versao mais nova do Simulador CNC (branch com o maior VERSION), copia para o W: e abre.
rem Fica na Area de Trabalho. O codigo PowerShell esta no fim deste arquivo, depois da marca.
rem Log: %LOCALAPPDATA%\FastSealCreator\log.txt
powershell -NoProfile -ExecutionPolicy Bypass -Command "$f='%~f0'; iex ((Get-Content -LiteralPath $f -Raw -Encoding UTF8) -split '#\#PS\#\#',2)[1]"
if errorlevel 1 pause
exit /b
##PS##
$ErrorActionPreference = 'Stop'
$repo = 'mateusvinicius19-svg/Fast-Seal-Creator-5'
$root = Join-Path $env:LOCALAPPDATA 'FastSealCreator'; $app = Join-Path $root 'app'
New-Item -ItemType Directory -Force $root | Out-Null
$log = Join-Path $root 'log.txt'
$erros = New-Object System.Collections.ArrayList
function Log($t) { Add-Content -LiteralPath $log -Value ("{0:dd/MM HH:mm:ss} {1}" -f (Get-Date), $t) }
function Falha($onde, $e) { $m = "$onde -> $e"; [void]$erros.Add($m); Log $m }
Log '----- Abrir Simulador -----'
# rede da empresa: TLS 1.2 e proxy do Windows com o login do usuario
try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12 } catch {}
try { $px = [Net.WebRequest]::GetSystemWebProxy(); $px.Credentials = [Net.CredentialCache]::DefaultNetworkCredentials; [Net.WebRequest]::DefaultWebProxy = $px } catch {}
$curl = Join-Path $env:WINDIR 'System32\curl.exe'
# baixa texto (ou arquivo com -Out): 1o PowerShell, 2o curl.exe do Windows (--ssl-no-revoke: proxy que bloqueia a checagem de revogacao)
function Baixar([string]$url, [string]$Out) {
  try {
    $w = New-Object Net.WebClient; $w.Headers['User-Agent'] = 'FastSealCreator'; $w.Proxy = [Net.WebRequest]::DefaultWebProxy
    if ($Out) { $w.DownloadFile($url, $Out); return $true } else { return [Text.Encoding]::UTF8.GetString($w.DownloadData($url)) }
  } catch { Falha "PowerShell $url" $_.Exception.InnerException.Message; if (-not $_.Exception.InnerException) { Falha "PowerShell $url" $_.Exception.Message } }
  if (Test-Path $curl) {
    $tmp = if ($Out) { $Out } else { Join-Path $env:TEMP 'fastseal_dl.txt' }
    $msg = & $curl -fsSL --ssl-no-revoke --proxy-ntlm -U : -A FastSealCreator -o $tmp $url 2>&1
    if ($LASTEXITCODE -eq 0) { if ($Out) { return $true } else { return [IO.File]::ReadAllText($tmp, [Text.Encoding]::UTF8) } }
    Falha "curl $url" "codigo $LASTEXITCODE $msg"
  }
  return $null
}
try {
  Write-Host 'Procurando a versao mais nova no GitHub...'
  # 1) branches: lista do git (github.com, sem limite) e, se falhar, a API
  $branches = @()
  $refs = Baixar "https://github.com/$repo.git/info/refs?service=git-upload-pack"
  if ($refs) { foreach ($m in [regex]::Matches($refs, '([0-9a-f]{40}) refs/heads/([^\s\x00]+)')) { $branches += @{ name = $m.Groups[2].Value; sha = $m.Groups[1].Value } } }
  if (-not $branches.Count) {
    $j = Baixar "https://api.github.com/repos/$repo/branches?per_page=100"
    if ($j) { foreach ($b in ($j | ConvertFrom-Json)) { $branches += @{ name = $b.name; sha = $b.commit.sha } } }
  }
  Log ("branches: " + (($branches | ForEach-Object { $_.name }) -join ', '))
  # 2) VERSION de cada branch -> a maior
  $best = $null
  foreach ($b in $branches) {
    $v = Baixar "https://raw.githubusercontent.com/$repo/$($b.sha)/VERSION"
    if (-not $v) { $v = Baixar "https://github.com/$repo/raw/$($b.sha)/VERSION" }
    if (-not $v) { continue }
    try { $ver = [version]($v.Trim()) } catch { continue }
    if (-not $best -or $ver -gt $best.ver -or ($ver -eq $best.ver -and $b.name -eq 'main')) { $best = @{ name = $b.name; sha = $b.sha; ver = $ver; v = $v.Trim() } }
  }
  $atual = ''; if (Test-Path "$root\sha.txt") { $atual = (Get-Content "$root\sha.txt" -Raw).Trim() }
  if ($best -and ($best.sha -ne $atual -or -not (Test-Path "$app\Simulador CNC.html"))) {
    Write-Host "Baixando a versao $($best.v) ($($best.name))..."
    Log "baixando $($best.v) $($best.name) $($best.sha)"
    try { Invoke-WebRequest 'http://localhost:8765/api/quit' -UseBasicParsing -TimeoutSec 3 | Out-Null; Start-Sleep -Milliseconds 800 } catch {}
    $zip = Join-Path $env:TEMP 'fastseal.zip'; $tmp = Join-Path $env:TEMP 'fastseal_x'
    if (-not (Baixar "https://codeload.github.com/$repo/zip/$($best.sha)" -Out $zip)) {
      if (-not (Baixar "https://github.com/$repo/archive/$($best.sha).zip" -Out $zip)) { throw 'nao consegui baixar o zip do projeto' } }
    if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
    Expand-Archive -LiteralPath $zip -DestinationPath $tmp -Force
    $src = (Get-ChildItem $tmp -Directory | Select-Object -First 1).FullName
    if (-not (Test-Path -LiteralPath (Join-Path $src 'Simulador CNC.html'))) { throw 'o download veio sem o Simulador CNC.html' }
    if (Test-Path $app) { Remove-Item $app -Recurse -Force }
    Move-Item -LiteralPath $src -Destination $app
    Get-ChildItem $app -Recurse -File | Unblock-File
    Set-Content "$root\sha.txt" $best.sha
    Remove-Item $zip, $tmp -Recurse -Force -ErrorAction SilentlyContinue
  } elseif ($best) { Write-Host "Ja esta na versao mais nova ($($best.v))." }
  else { Write-Host 'Nao consegui falar com o GitHub - usando a versao ja baixada.' -ForegroundColor Yellow }
  if (Test-Path "$app\Iniciar\abrir.ps1") { & "$app\Iniciar\abrir.ps1" -App $app; exit 0 }
  # sem nada baixado: abre o Simulador que ja esta no W: (sem o servidor local)
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
