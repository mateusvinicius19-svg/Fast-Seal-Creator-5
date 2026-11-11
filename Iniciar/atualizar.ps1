# Fast Seal Creator - atualizador (o "Abrir Simulador.bat" baixa este arquivo da main e roda a cada abertura).
# Baixa a main para %LOCALAPPDATA%\FastSealCreator\app-<commit> (uma pasta por versao: a antiga pode estar em uso pelo
# servidor e o Windows nao deixa apagar), roda Iniciar\abrir.ps1 da versao nova e depois apaga as pastas antigas.
# Arquivo so com ASCII (PowerShell 5.1).
param([string]$Root = (Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'FastSealCreator'))
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
function Baixar([string]$url, [string]$Out) {
  try {
    $w = New-Object Net.WebClient; $w.Headers['User-Agent'] = 'FastSealCreator'; $w.Proxy = [Net.WebRequest]::DefaultWebProxy
    if ($Out) { $w.DownloadFile($url, $Out); return $true } else { return [Text.Encoding]::UTF8.GetString($w.DownloadData($url)) }
  } catch { Falha "PowerShell $url" $_.Exception.InnerException.Message; if (-not $_.Exception.InnerException) { Falha "PowerShell $url" $_.Exception.Message } }
  if (Test-Path $curl) {
    $tmp = if ($Out) { $Out } else { Join-Path $Root 'dl.txt' }
    $ErrorActionPreference = 'Continue'   # PS 5.1: stderr do curl com 'Stop' vira erro fatal
    $msg = & $curl -fsSL --ssl-no-revoke --proxy-ntlm -U : -A FastSealCreator -o $tmp $url 2>&1
    if ($LASTEXITCODE -eq 0) { if ($Out) { return $true } else { return [IO.File]::ReadAllText($tmp, [Text.Encoding]::UTF8) } }
    Falha "curl $url" "codigo $LASTEXITCODE $msg"
  }
  return $null
}
try {
  Write-Host 'Procurando a versao mais nova no GitHub...'
  $best = $null
  $refs = Baixar "https://github.com/$repo.git/info/refs?service=git-upload-pack"
  if ($refs) { $m = [regex]::Match($refs, '([0-9a-f]{40}) refs/heads/main\b'); if ($m.Success) { $best = @{ sha = $m.Groups[1].Value } } }
  if (-not $best) { $j = Baixar "https://api.github.com/repos/$repo/commits/main"; if ($j) { $best = @{ sha = ($j | ConvertFrom-Json).sha } } }
  if ($best) { $v = Baixar "https://raw.githubusercontent.com/$repo/$($best.sha)/VERSION"; $best.v = if ($v) { $v.Trim() } else { $best.sha.Substring(0, 7) } }
  Log ("main: " + $(if ($best) { "$($best.v) $($best.sha)" } else { 'sem resposta' }))
  $atual = ''; if (Test-Path "$Root\sha.txt") { $atual = (Get-Content "$Root\sha.txt" -Raw).Trim() }
  $appDe = { param($sha) Join-Path $Root ('app-' + $sha.Substring(0, 10)) }
  if ($best) {
    $app = & $appDe $best.sha
    if (-not (Test-Path -LiteralPath (Join-Path $app 'Iniciar\abrir.ps1'))) {
      Write-Host "Baixando a versao $($best.v) (main)..."
      Log "baixando $($best.v) $($best.sha)"
      $zip = Join-Path $Root 'download.zip'; $tmp = Join-Path $Root 'download'
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
  } else {
    Write-Host 'Nao consegui falar com o GitHub - usando a versao ja baixada.' -ForegroundColor Yellow
    $app = if ($atual) { & $appDe $atual } else { '' }
    if (-not $app -or -not (Test-Path -LiteralPath (Join-Path $app 'Iniciar\abrir.ps1'))) { $app = Join-Path $Root 'app' }   # versao antiga do .bat
  }
  if (Test-Path -LiteralPath (Join-Path $app 'Iniciar\abrir.ps1')) {
    & (Join-Path $app 'Iniciar\abrir.ps1') -App $app
    # limpa as versoes antigas (as que ainda estiverem em uso ficam para a proxima vez)
    Start-Sleep -Seconds 2
    Get-ChildItem -LiteralPath $Root -Directory | Where-Object { ($_.Name -like 'app-*' -or $_.Name -eq 'app') -and $_.FullName -ne $app } |
      ForEach-Object { try { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction Stop } catch { Log "nao apaguei $($_.FullName) (em uso)" } }
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
