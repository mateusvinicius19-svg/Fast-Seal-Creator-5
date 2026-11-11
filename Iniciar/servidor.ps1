# Fast Seal Creator - servidor local do Simulador CNC (so localhost)
# Serve o "Simulador CNC.html" em http://localhost:<porta>/ e le/grava arquivos nas pastas da rede
# (W:\Parts\PartsSeals = \\172.16.99.40\dados\Parts\PartsSeals) sem o navegador pedir a pasta.
# Iniciado pelo "Abrir Simulador.bat" (abrir.ps1). Arquivo so com ASCII (PowerShell 5.1 le .ps1 sem BOM como ANSI).
param([int]$Port = 8765, [string]$App = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$VERSAO_SRV = '2'
$UNC = '\\172.16.99.40\dados'
$ROOTS = @('W:\Parts\PartsSeals', "$UNC\Parts\PartsSeals")

function Resolve-Caminho([string]$p) {
  if (-not $p) { throw 'sem caminho' }
  $p = $p -replace '/', '\'
  if ($p -match '^[Ww]:\\' -and -not (Test-Path -LiteralPath 'W:\')) { $p = $UNC + $p.Substring(2) }
  $full = [IO.Path]::GetFullPath($p)
  foreach ($r in $ROOTS) { if ($full.StartsWith($r, [StringComparison]::OrdinalIgnoreCase)) { return $full } }
  throw "fora das pastas permitidas: $full"
}
function Get-Param($ctx) {
  $q = $ctx.Request.Url.Query
  if ($q -match '(?:^\?|&)p=([^&]*)') { return [Uri]::UnescapeDataString(($Matches[1] -replace '\+', ' ')) }
  return $null
}
function Js([string]$s) {
  $sb = New-Object Text.StringBuilder; [void]$sb.Append('"')
  foreach ($ch in $s.ToCharArray()) {
    $c = [int]$ch
    if ($ch -eq '"') { [void]$sb.Append('\"') } elseif ($ch -eq '\') { [void]$sb.Append('\\') }
    elseif ($c -lt 32) { [void]$sb.Append(('\u{0:x4}' -f $c)) } else { [void]$sb.Append($ch) }
  }
  [void]$sb.Append('"'); return $sb.ToString()
}
function Send($ctx, [int]$code, [byte[]]$bytes, [string]$type) {
  $r = $ctx.Response; $r.StatusCode = $code; $r.ContentType = $type
  $r.Headers.Add('Cache-Control', 'no-store')
  $r.ContentLength64 = $bytes.Length; $r.OutputStream.Write($bytes, 0, $bytes.Length)
}
function SendText($ctx, [int]$code, [string]$s, [string]$type = 'text/plain; charset=utf-8') { Send $ctx $code ([Text.Encoding]::UTF8.GetBytes($s)) $type }
function ReadBody($ctx) { $ms = New-Object IO.MemoryStream; $ctx.Request.InputStream.CopyTo($ms); return $ms.ToArray() }

$l = New-Object Net.HttpListener
$l.Prefixes.Add("http://localhost:$Port/")
$l.Start()
Write-Host "Simulador CNC em http://localhost:$Port/  (feche esta janela para parar)"
while ($l.IsListening) {
  $ctx = $l.GetContext()
  try {
    $path = $ctx.Request.Url.AbsolutePath
    switch -Regex ($path) {
      '^/$|^/index\.html$|^/Simulador' {
        $f = Join-Path $App 'Simulador CNC.html'
        Send $ctx 200 ([IO.File]::ReadAllBytes($f)) 'text/html; charset=utf-8'; break }
      '^/api/ping$' {
        $v = ''; try { $v = (Get-Content -LiteralPath (Join-Path $App 'VERSION') -Raw).Trim() } catch {}
        $w = Test-Path -LiteralPath 'W:\'
        SendText $ctx 200 ('{"ok":true,"srv":"' + $VERSAO_SRV + '","versao":' + (Js $v) + ',"w":' + ($(if ($w) { 'true' } else { 'false' })) + '}') 'application/json; charset=utf-8'; break }
      '^/api/stat$' {
        $p = Resolve-Caminho (Get-Param $ctx); $k = 'null'
        if ([IO.Directory]::Exists($p)) { $k = '"directory"' } elseif ([IO.File]::Exists($p)) { $k = '"file"' }
        SendText $ctx 200 ('{"kind":' + $k + '}') 'application/json; charset=utf-8'; break }
      '^/api/list$' {
        $p = Resolve-Caminho (Get-Param $ctx)
        if (-not [IO.Directory]::Exists($p)) { SendText $ctx 404 'pasta nao existe'; break }
        $sb = New-Object Text.StringBuilder; [void]$sb.Append('{"dirs":[')
        $first = $true
        foreach ($d in [IO.Directory]::EnumerateDirectories($p)) { if (-not $first) { [void]$sb.Append(',') }; $first = $false; [void]$sb.Append((Js ([IO.Path]::GetFileName($d)))) }
        [void]$sb.Append('],"files":['); $first = $true
        foreach ($f in [IO.Directory]::EnumerateFiles($p)) { if (-not $first) { [void]$sb.Append(',') }; $first = $false; [void]$sb.Append((Js ([IO.Path]::GetFileName($f)))) }
        [void]$sb.Append(']}')
        SendText $ctx 200 $sb.ToString() 'application/json; charset=utf-8'; break }
      '^/api/read$' {
        $p = Resolve-Caminho (Get-Param $ctx)
        if (-not [IO.File]::Exists($p)) { SendText $ctx 404 'arquivo nao existe'; break }
        $ms = [long]([DateTimeOffset][IO.File]::GetLastWriteTimeUtc($p)).ToUnixTimeMilliseconds()
        $ctx.Response.Headers.Add('X-Mtime', [string]$ms)
        Send $ctx 200 ([IO.File]::ReadAllBytes($p)) 'application/octet-stream'; break }
      '^/api/write$' {
        if ($ctx.Request.HttpMethod -ne 'POST') { SendText $ctx 405 'use POST'; break }
        $p = Resolve-Caminho (Get-Param $ctx)
        [void][IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($p))
        [IO.File]::WriteAllBytes($p, (ReadBody $ctx))
        SendText $ctx 200 'ok'; break }
      '^/api/mkdir$' {
        if ($ctx.Request.HttpMethod -ne 'POST') { SendText $ctx 405 'use POST'; break }
        $p = Resolve-Caminho (Get-Param $ctx); [void][IO.Directory]::CreateDirectory($p)
        SendText $ctx 200 'ok'; break }
      '^/api/quit$' { SendText $ctx 200 'tchau'; $ctx.Response.Close(); $l.Stop(); break }
      default { SendText $ctx 404 'nao encontrado' }
    }
  } catch {
    try { SendText $ctx 500 ($_.Exception.Message) } catch {}
  } finally {
    try { $ctx.Response.Close() } catch {}
  }
}
