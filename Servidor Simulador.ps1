# Servidor local do Simulador CNC (v5.11.0) — deixa as pastas FIXAS: o Simulador aberto por http://localhost:8765
# grava direto em W:\Parts\PartsSeals\PROJETOS (Programas_CNC, MCS 500, DESENHOS) sem o navegador pedir pasta/permissão.
# Uso:
#   powershell -ExecutionPolicy Bypass -File "Servidor Simulador.ps1" -Instalar   -> liga junto com o Windows + atalho na área de trabalho
#   ... -Instalar -Rede  (PowerShell como ADMINISTRADOR) -> também no CELULAR, pelo Wi-Fi da empresa, com senha
#        (cria na área de trabalho "Simulador no celular.txt" com o link; abra esse link uma vez no celular)
#   powershell -ExecutionPolicy Bypass -File "Servidor Simulador.ps1" -Desinstalar
#   powershell -ExecutionPolicy Bypass -File "Servidor Simulador.ps1"             -> roda agora (janela aberta; fechar = desliga)
# Segurança: só dentro de PROJETOS, não apaga nada, recusa pedidos vindos de outros sites; sem -Rede só o próprio PC;
# com -Rede, outro aparelho só entra com a senha (cookie gravado ao abrir o link /entrar?k=SENHA).
param([switch]$Instalar, [switch]$Desinstalar, [switch]$Rede, [int]$Porta = 8765)
$ErrorActionPreference = 'Stop'
$ROOT = 'W:\Parts\PartsSeals\PROJETOS'
$SIM  = Join-Path $ROOT 'PROGRAMAÇÃO\PADRONIZAÇÃO\Arruela Padronizada\Simulador CNC.html'
$me   = $MyInvocation.MyCommand.Path
$lnk  = Join-Path ([Environment]::GetFolderPath('Startup')) 'Servidor Simulador CNC.lnk'
$url  = Join-Path ([Environment]::GetFolderPath('Desktop')) 'Simulador CNC (fixo).url'
$cel  = Join-Path ([Environment]::GetFolderPath('Desktop')) 'Simulador no celular.txt'
$DATA = Join-Path $env:APPDATA 'SimuladorCNC'; $TOKF = Join-Path $DATA 'senha.txt'
function IsAdmin { ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator) }
function Token {
  if (-not (Test-Path -LiteralPath $TOKF)) { New-Item -ItemType Directory -Force $DATA | Out-Null
    $b = New-Object byte[] 12; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [IO.File]::WriteAllText($TOKF, (($b | ForEach-Object { $_.ToString('x2') }) -join '')) }
  return ([IO.File]::ReadAllText($TOKF)).Trim()
}

if ($Desinstalar) {
  Remove-Item -LiteralPath $lnk, $url, $cel -ErrorAction SilentlyContinue
  if (IsAdmin) { netsh http delete urlacl url=http://+:$Porta/ | Out-Null; Remove-NetFirewallRule -DisplayName 'Simulador CNC' -ErrorAction SilentlyContinue }
  Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Where-Object { $_.CommandLine -like '*Servidor Simulador.ps1*' -and $_.ProcessId -ne $PID } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  'Servidor removido do inicio do Windows e desligado.'; return
}
if ($Instalar) {
  if ($Rede) {
    if (-not (IsAdmin)) { Write-Warning 'Para o celular (-Rede): abra o PowerShell como ADMINISTRADOR (botao direito > Executar como administrador) e rode de novo.'; return }
    netsh http delete urlacl url=http://+:$Porta/ 2>$null | Out-Null
    netsh http add urlacl url=http://+:$Porta/ sddl='D:(A;;GX;;;WD)' | Out-Null   # WD = todos os usuarios (vale em Windows em portugues)
    Remove-NetFirewallRule -DisplayName 'Simulador CNC' -ErrorAction SilentlyContinue
    New-NetFirewallRule -DisplayName 'Simulador CNC' -Direction Inbound -Protocol TCP -LocalPort $Porta -Action Allow -Profile Domain, Private | Out-Null
    $k = Token
    $ips = @(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } | ForEach-Object IPAddress)
    $txt = "Simulador CNC no celular (mesmo Wi-Fi da empresa, PC ligado).`r`nAbra UMA VEZ no celular e salve nos favoritos:`r`n`r`n" + (($ips | ForEach-Object { "  http://$($_):$Porta/entrar?k=$k" }) -join "`r`n") + "`r`n`r`nNao passe este link para ninguem: quem tiver ele grava no W:.`r`nPara trocar a senha: apague $TOKF e rode -Instalar -Rede de novo.`r`n"
    [IO.File]::WriteAllText($cel, $txt); $txt
  }
  Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" | Where-Object { $_.CommandLine -like '*Servidor Simulador.ps1*' -and $_.CommandLine -notlike '*-Instalar*' -and $_.ProcessId -ne $PID } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
  $sh = New-Object -ComObject WScript.Shell
  $s = $sh.CreateShortcut($lnk); $s.TargetPath = "$env:WINDIR\System32\WindowsPowerShell\v1.0\powershell.exe"
  $s.Arguments = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$me`" -Porta $Porta" + $(if ($Rede) { ' -Rede' } else { '' }); $s.WindowStyle = 7; $s.Save()
  [IO.File]::WriteAllText($url, "[InternetShortcut]`r`nURL=http://localhost:$Porta/`r`n")
  Start-Process -WindowStyle Hidden -FilePath $s.TargetPath -ArgumentList $s.Arguments
  Start-Sleep -Seconds 2; Start-Process "http://localhost:$Porta/"
  "Instalado: liga junto com o Windows ($lnk). Atalho na area de trabalho: 'Simulador CNC (fixo)' -> http://localhost:$Porta/"; return
}

$enc = New-Object Text.UTF8Encoding $false
function Send($ctx, [int]$code, [byte[]]$bytes, [string]$type) {
  $r = $ctx.Response; $r.StatusCode = $code; $r.ContentType = $type; $r.Headers['Cache-Control'] = 'no-store'
  $r.ContentLength64 = $bytes.Length; $r.OutputStream.Write($bytes, 0, $bytes.Length); $r.OutputStream.Close()
}
function SendText($ctx, [int]$code, [string]$t, [string]$type = 'text/plain; charset=utf-8') { Send $ctx $code $enc.GetBytes($t) $type }
function JStr([string]$s) { '"' + ($s -replace '\\', '\\' -replace '"', '\"') + '"' }
function Arg($ctx, [string]$name) {   # le a query a mao (UnescapeDataString decodifica UTF-8: PÇ, PROGRAMAÇÃO)
  foreach ($kv in $ctx.Request.Url.Query.TrimStart('?').Split('&')) { $i = $kv.IndexOf('='); if ($i -gt 0 -and $kv.Substring(0, $i) -eq $name) { return [Uri]::UnescapeDataString($kv.Substring($i + 1).Replace('+', ' ')) } }
  return ''
}
function Full([string]$rel) {
  $rel = $rel.Replace('/', '\').Trim('\')
  if ($rel -match '(^|\\)\.\.?(\\|$)' -or $rel.Contains(':') -or $rel.IndexOfAny([IO.Path]::GetInvalidPathChars()) -ge 0) { throw "caminho invalido: $rel" }
  $f = [IO.Path]::GetFullPath([IO.Path]::Combine($ROOT, $rel))
  if (-not ($f.Equals($ROOT, 'OrdinalIgnoreCase') -or $f.StartsWith($ROOT + '\', 'OrdinalIgnoreCase'))) { throw "fora de PROJETOS: $rel" }
  return $f
}

$l = New-Object Net.HttpListener
$l.Prefixes.Add($(if ($Rede) { "http://+:$Porta/" } else { "http://localhost:$Porta/" }))
$KEY = if ($Rede) { Token } else { '' }
try { $l.Start() } catch { Write-Warning "Nao consegui abrir a porta $Porta ($_). Outro servidor ja esta ligado?"; return }
"Servidor do Simulador ligado: http://localhost:$Porta/$(if ($Rede) { '  + celular (veja Simulador no celular.txt)' })  (pasta $ROOT). Feche esta janela para desligar."
while ($l.IsListening) {
  $ctx = $l.GetContext()
  try {
    $q = $ctx.Request; $path = $q.Url.AbsolutePath
    $site = $q.Headers['Sec-Fetch-Site']
    if ($q.IsLocal) {
      if ($q.Url.Host -notin 'localhost', '127.0.0.1') { SendText $ctx 403 'host'; continue }   # contra DNS rebinding
    } else {
      # outro aparelho (celular): so com a senha. /entrar?k=SENHA grava o cookie e abre o Simulador
      if ($path -eq '/entrar') {
        if ($KEY -and (Arg $ctx 'k') -eq $KEY) { $ctx.Response.Headers.Add('Set-Cookie', "simk=$KEY; Max-Age=31536000; Path=/; HttpOnly; SameSite=Strict"); $ctx.Response.Redirect('/'); $ctx.Response.Close() }
        else { SendText $ctx 403 'Senha errada. Use o link do arquivo "Simulador no celular.txt" da area de trabalho do PC.' }
        continue
      }
      $ck = $q.Cookies['simk']
      if (-not $KEY -or -not $ck -or $ck.Value -ne $KEY) { SendText $ctx 401 'Sem senha. Abra no celular o link do arquivo "Simulador no celular.txt" da area de trabalho do PC.'; continue }
    }
    if ($path -eq '/ping') { $ctx.Response.Headers['Access-Control-Allow-Origin'] = '*'; SendText $ctx 200 '{"ok":true}' 'application/json'; continue }
    if ($path -eq '/' -or $path -eq '/index.html') {
      if (-not (Test-Path -LiteralPath $SIM)) { SendText $ctx 404 "Simulador nao encontrado: $SIM"; continue }
      Send $ctx 200 ([IO.File]::ReadAllBytes($SIM)) 'text/html; charset=utf-8'; continue
    }
    if (-not $path.StartsWith('/fs/')) { SendText $ctx 404 'nao existe'; continue }
    # so o proprio Simulador (mesmo endereco); pedido de outro site -> recusa
    if ($site -and $site -ne 'same-origin') { SendText $ctx 403 'origem recusada'; continue }
    $f = Full (Arg $ctx 'p'); $op = $path.Substring(4)
    switch ($op) {
      'stat' {
        if ([IO.Directory]::Exists($f)) { SendText $ctx 200 '{"kind":"directory"}' 'application/json' }
        elseif ([IO.File]::Exists($f)) { SendText $ctx 200 '{"kind":"file"}' 'application/json' }
        else { SendText $ctx 404 'nao existe' }
      }
      'list' {
        if (-not [IO.Directory]::Exists($f)) { SendText $ctx 404 'pasta nao existe'; break }
        $sb = New-Object Text.StringBuilder; [void]$sb.Append('['); $first = $true
        foreach ($e in (New-Object IO.DirectoryInfo $f).EnumerateFileSystemInfos()) {
          if (-not $first) { [void]$sb.Append(',') }; $first = $false
          [void]$sb.Append('{"n":').Append((JStr $e.Name)).Append(',"k":"').Append($(if ($e -is [IO.DirectoryInfo]) { 'd' } else { 'f' })).Append('"}')
        }
        [void]$sb.Append(']'); SendText $ctx 200 $sb.ToString() 'application/json'
      }
      'read' {
        if (-not [IO.File]::Exists($f)) { SendText $ctx 404 'arquivo nao existe'; break }
        Send $ctx 200 ([IO.File]::ReadAllBytes($f)) 'application/octet-stream'
      }
      'write' {
        if ($q.HttpMethod -ne 'PUT') { SendText $ctx 405 'use PUT'; break }
        $ms = New-Object IO.MemoryStream; $q.InputStream.CopyTo($ms)
        [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($f)) | Out-Null
        [IO.File]::WriteAllBytes($f, $ms.ToArray()); SendText $ctx 200 'ok'
      }
      'mkdir' {
        if ($q.HttpMethod -ne 'POST') { SendText $ctx 405 'use POST'; break }
        [IO.Directory]::CreateDirectory($f) | Out-Null; SendText $ctx 200 'ok'
      }
      default { SendText $ctx 404 'nao existe' }
    }
  } catch { try { SendText $ctx 500 "$_" } catch {} }
}
