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
# v5.87.0 (usuário 20/11/2026, 3 PCs + Kuru): atende vários pedidos ao mesmo tempo (um pedido preso no W: não segura os
# outros) e se religa sozinho: o processo "vigia" liga o servidor (-Filho) e, se ele cair, liga de novo em 3 s.
param([switch]$Instalar, [switch]$Desinstalar, [switch]$Rede, [int]$Porta = 8765, [switch]$Filho)
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

# ---- vigia (v5.87.0): liga o servidor de verdade (-Filho) na mesma janela e religa se ele cair ----
# Saida 0 = desligado de proposito, 2 = porta ocupada (outro servidor ja esta ligado): nao religa.
# Antes de religar espera 3 s e confere: se outro servidor ja responde (o "Abrir Simulador" ligou a versao nova) ou se
# este arquivo sumiu (versao velha apagada pelo atualizador), para. 5 quedas seguidas em menos de 30 s = para.
if (-not $Filho) {
  $argF = "-NoProfile -ExecutionPolicy Bypass -File `"$me`" -Porta $Porta -Filho" + $(if ($Rede) { ' -Rede' } else { '' })
  $rapidas = 0
  while ($true) {
    $t0 = Get-Date
    $p = Start-Process powershell.exe -ArgumentList $argF -NoNewWindow -PassThru -Wait
    if ($p.ExitCode -eq 0 -or $p.ExitCode -eq 2) { break }
    if (((Get-Date) - $t0).TotalSeconds -lt 30) { $rapidas++ } else { $rapidas = 0 }
    if ($rapidas -ge 5) { Write-Warning 'O servidor caiu 5 vezes seguidas: parei de religar. Abra o Simulador de novo pelo atalho.'; break }
    Start-Sleep -Seconds 3
    if (-not (Test-Path -LiteralPath $me)) { break }
    $outro = $false; try { Invoke-WebRequest "http://localhost:$Porta/ping" -UseBasicParsing -TimeoutSec 2 | Out-Null; $outro = $true } catch {}
    if ($outro) { break }
    "$(Get-Date -Format 'dd/MM HH:mm:ss') servidor caiu (saida $($p.ExitCode)) - religando"
  }
  return
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

# v5.85.0: a pagina sai da copia LOCAL (o "Simulador CNC.html" ao lado deste script, baixado pelo atualizador) e fica na memoria:
# ler 1,3 MB do W: a cada abertura levava ~1,8 s. Se a do W: for MAIS NOVA (outro PC atualizou), serve a do W: como antes.
$LOCAL = Join-Path $PSScriptRoot 'Simulador CNC.html'
function SimArquivo {
  $loc = $null; $w = $null
  try { if ([IO.File]::Exists($LOCAL)) { $loc = New-Object IO.FileInfo $LOCAL } } catch {}
  try { if ([IO.File]::Exists($SIM)) { $w = New-Object IO.FileInfo $SIM } } catch {}
  if ($loc -and $w) { if ($w.LastWriteTimeUtc -gt $loc.LastWriteTimeUtc.AddSeconds(2)) { return $w } else { return $loc } }
  if ($loc) { return $loc }; return $w
}

# Um pedido. v5.87.0: roda num dos ate 16 "atendentes" (RunspacePool): enquanto um espera o W:, os outros atendem.
# $S = memoria compartilhada entre os atendentes (pagina guardada).
function Atender($ctx) {
  $ErrorActionPreference = 'Stop'
  try {
    $q = $ctx.Request; $path = $q.Url.AbsolutePath
    $site = $q.Headers['Sec-Fetch-Site']
    if ($q.IsLocal) {
      if ($q.Url.Host -notin 'localhost', '127.0.0.1') { SendText $ctx 403 'host'; return }   # contra DNS rebinding
    } else {
      # outro aparelho (celular): so com a senha. /entrar?k=SENHA grava o cookie e abre o Simulador
      if ($path -eq '/entrar') {
        if ($KEY -and (Arg $ctx 'k') -eq $KEY) { $ctx.Response.Headers.Add('Set-Cookie', "simk=$KEY; Max-Age=31536000; Path=/; HttpOnly; SameSite=Strict"); $ctx.Response.Redirect('/'); $ctx.Response.Close() }
        else { SendText $ctx 403 'Senha errada. Use o link do arquivo "Simulador no celular.txt" da area de trabalho do PC.' }
        return
      }
      $ck = $q.Cookies['simk']
      if (-not $KEY -or -not $ck -or $ck.Value -ne $KEY) { SendText $ctx 401 'Sem senha. Abra no celular o link do arquivo "Simulador no celular.txt" da area de trabalho do PC.'; return }
    }
    if ($path -eq '/ping') { $ctx.Response.Headers['Access-Control-Allow-Origin'] = '*'; SendText $ctx 200 '{"ok":true}' 'application/json'; return }
    if ($path -eq '/' -or $path -eq '/index.html') {
      $sf = SimArquivo
      if (-not $sf) { SendText $ctx 404 "Simulador nao encontrado: $SIM"; return }
      $chave = "$($sf.FullName)|$($sf.LastWriteTimeUtc.Ticks)|$($sf.Length)"
      $g = $S['sim']
      if (-not $g -or $g[0] -ne $chave) { $g = @($chave, [IO.File]::ReadAllBytes($sf.FullName)); $S['sim'] = $g }
      Send $ctx 200 $g[1] 'text/html; charset=utf-8'; return
    }
    if (-not $path.StartsWith('/fs/')) { SendText $ctx 404 'nao existe'; return }
    # so o proprio Simulador (mesmo endereco); pedido de outro site -> recusa
    if ($site -and $site -ne 'same-origin') { SendText $ctx 403 'origem recusada'; return }
    $f = Full (Arg $ctx 'p'); $op = $path.Substring(4)
    switch ($op) {
      'stat' {
        if ([IO.Directory]::Exists($f)) { SendText $ctx 200 '{"kind":"directory"}' 'application/json' }
        elseif ([IO.File]::Exists($f)) { SendText $ctx 200 '{"kind":"file"}' 'application/json' }
        else { SendText $ctx 404 'nao existe' }
      }
      'list' {
        if (-not [IO.Directory]::Exists($f)) { SendText $ctx 404 'pasta nao existe'; break }
        # v5.85.0: &f=046* -> so os nomes que batem (o Windows filtra: Programas_CNC tem ~50 mil, lista toda levava ~5 s).
        # Monta o JSON sem chamar funcao por item (era o que deixava lento).
        $pat = Arg $ctx 'f'; if (-not $pat) { $pat = '*' }
        if ($pat.IndexOfAny([char[]]'\/:') -ge 0 -or $pat.Contains('..')) { SendText $ctx 400 'filtro invalido'; break }
        $sb = New-Object Text.StringBuilder; [void]$sb.Append('['); $first = $true
        foreach ($e in (New-Object IO.DirectoryInfo $f).EnumerateFileSystemInfos($pat)) {
          if ($first) { $first = $false } else { [void]$sb.Append(',') }
          $k = 'f'; if ($e -is [IO.DirectoryInfo]) { $k = 'd' }
          [void]$sb.Append('{"n":"').Append($e.Name.Replace('\', '\\').Replace('"', '\"')).Append('","k":"').Append($k).Append('"}')
        }
        [void]$sb.Append(']'); SendText $ctx 200 $sb.ToString() 'application/json'
      }
      'read' {
        if (-not [IO.File]::Exists($f)) { SendText $ctx 404 'arquivo nao existe'; break }
        $ctx.Response.Headers['X-Mtime'] = [string]([DateTimeOffset][IO.File]::GetLastWriteTimeUtc($f)).ToUnixTimeMilliseconds()
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
      'move' {   # v5.71 (usuario 17/11/2026): so RENOMEAR dentro da mesma pasta de DESENHOS (pasta do desenho ganha o numero do programa); nunca sobrescreve
        if ($q.HttpMethod -ne 'POST') { SendText $ctx 405 'use POST'; break }
        $to = Full (Arg $ctx 'to'); $des = Join-Path $ROOT 'DESENHOS'
        if (-not $f.StartsWith($des + [IO.Path]::DirectorySeparatorChar, 'OrdinalIgnoreCase')) { SendText $ctx 403 'so dentro de DESENHOS'; break }
        if ([IO.Path]::GetDirectoryName($f) -ne [IO.Path]::GetDirectoryName($to)) { SendText $ctx 403 'so renomear na mesma pasta'; break }
        if ([IO.Directory]::Exists($to) -or [IO.File]::Exists($to)) { SendText $ctx 409 'ja existe'; break }
        if ([IO.Directory]::Exists($f)) { [IO.Directory]::Move($f, $to) } elseif ([IO.File]::Exists($f)) { [IO.File]::Move($f, $to) } else { SendText $ctx 404 'nao existe'; break }
        SendText $ctx 200 'ok'
      }
      'cancel' {   # v5.99.0 (usuario 25/11/2026): Cancelar item - MOVE arquivo/pasta do Programas_CNC ou DESENHOS para _CANCELADOS; nunca apaga, nunca sobrescreve
        if ($q.HttpMethod -ne 'POST') { SendText $ctx 405 'use POST'; break }
        $to = Full (Arg $ctx 'to'); $can = Join-Path $ROOT '_CANCELADOS'
        if (-not $to.StartsWith($can + [IO.Path]::DirectorySeparatorChar, 'OrdinalIgnoreCase')) { SendText $ctx 403 'destino so dentro de _CANCELADOS'; break }
        $okSrc = $false
        foreach ($d in 'Programas_CNC', 'DESENHOS') { if ($f.StartsWith((Join-Path $ROOT $d) + [IO.Path]::DirectorySeparatorChar, 'OrdinalIgnoreCase')) { $okSrc = $true } }
        if (-not $okSrc) { SendText $ctx 403 'origem so do Programas_CNC ou DESENHOS'; break }
        if ([IO.Directory]::Exists($to) -or [IO.File]::Exists($to)) { SendText $ctx 409 'ja existe'; break }
        [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($to)) | Out-Null
        if ([IO.Directory]::Exists($f)) { [IO.Directory]::Move($f, $to) } elseif ([IO.File]::Exists($f)) { [IO.File]::Move($f, $to) } else { SendText $ctx 404 'origem nao existe'; break }
        SendText $ctx 200 'ok'
      }
      default { SendText $ctx 404 'nao existe' }
    }
  } catch { try { SendText $ctx 500 "$_" } catch {} }
}

$l = New-Object Net.HttpListener
$l.Prefixes.Add($(if ($Rede) { "http://+:$Porta/" } else { "http://localhost:$Porta/" }))
$KEY = if ($Rede) { Token } else { '' }
try { $l.Start() } catch { Write-Warning "Nao consegui abrir a porta $Porta ($_). Outro servidor ja esta ligado?"; exit 2 }

# atendentes: cada um recebe as funcoes e as variaveis acima
$S = [hashtable]::Synchronized(@{})
$iss = [Management.Automation.Runspaces.InitialSessionState]::CreateDefault()
foreach ($n in 'Send', 'SendText', 'JStr', 'Arg', 'Full', 'SimArquivo', 'Atender') {
  $iss.Commands.Add((New-Object Management.Automation.Runspaces.SessionStateFunctionEntry $n, (Get-Content "function:$n")))
}
foreach ($v in 'ROOT', 'SIM', 'LOCAL', 'KEY', 'enc', 'S') {
  $iss.Variables.Add((New-Object Management.Automation.Runspaces.SessionStateVariableEntry $v, (Get-Variable $v -ValueOnly), ''))
}
$pool = [RunspaceFactory]::CreateRunspacePool(1, 16, $iss, $Host); $pool.Open()
$fila = New-Object Collections.ArrayList
function Limpar {   # devolve os atendentes que ja terminaram
  for ($i = $fila.Count - 1; $i -ge 0; $i--) {
    $j = $fila[$i]
    if ($j.h.IsCompleted) { try { [void]$j.ps.EndInvoke($j.h) } catch {}; $j.ps.Dispose(); $fila.RemoveAt($i) }
  }
}

"Servidor do Simulador ligado: http://localhost:$Porta/$(if ($Rede) { '  + celular (veja Simulador no celular.txt)' })  (pasta $ROOT). Feche esta janela para desligar."
while ($l.IsListening) {
  $t = $l.GetContextAsync()
  while (-not $t.Wait(1000)) { Limpar }
  $ctx = $t.Result
  # /ping do proprio PC responde aqui mesmo (nao passa pelo W:): o "Abrir Simulador" e o aviso da tela sempre tem resposta
  if ($ctx.Request.Url.AbsolutePath -eq '/ping' -and $ctx.Request.IsLocal -and $ctx.Request.Url.Host -in 'localhost', '127.0.0.1') {
    try { $ctx.Response.Headers['Access-Control-Allow-Origin'] = '*'; SendText $ctx 200 '{"ok":true}' 'application/json' } catch {}
    continue
  }
  $ps = [PowerShell]::Create(); $ps.RunspacePool = $pool
  [void]$ps.AddCommand('Atender').AddArgument($ctx)
  [void]$fila.Add(@{ ps = $ps; h = $ps.BeginInvoke() })
  Limpar
}
exit 1
