# Teste de TODOS os perfis neste computador (sem node / Playwright) - v5.85.0.
# Liga um servidorzinho em http://localhost:8790 e abre testes\testar-perfis.html no navegador. A pagina gera o programa
# (e o desenho) de cada perfil na versao NOVA (o "Simulador CNC.html" desta pasta) e na BASE (a main do GitHub, ou -Base),
# e mostra: perfil fora da janela "Escolha o perfil", perfil que nao gera ("Preencha", erro, faixa vermelha) e quais mudaram.
# Uso:
#   powershell -ExecutionPolicy Bypass -File testes\testar-perfis.ps1                  -> novo x origin/main
#   ... -Ref claude/minha-branch      -> base = outra branch/commit     ... -Base C:\pasta\antigo.html -> base = arquivo
#   ... -SemBase                      -> so testa o novo                ... -SemAbrir -> nao abre o navegador sozinho
# Resultado tambem fica em %LOCALAPPDATA%\FastSealCreator\teste\resultado.json. Feche a janela (ou Ctrl+C) para desligar.
# Arquivo so com ASCII (PowerShell 5.1).
param([string]$Ref = 'origin/main', [string]$Base = '', [switch]$SemBase, [int]$Porta = 8790, [switch]$SemAbrir)
$ErrorActionPreference = 'Stop'
$raiz = Split-Path -Parent $PSScriptRoot
$pagina = Join-Path $PSScriptRoot 'testar-perfis.html'
$novo = Join-Path $raiz 'Simulador CNC.html'
$dados = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'FastSealCreator\teste'
New-Item -ItemType Directory -Force $dados | Out-Null
$baseNome = ''
if ($SemBase) { $Base = '' }
elseif ($Base) { $Base = (Resolve-Path -LiteralPath $Base).Path; $baseNome = Split-Path -Leaf $Base }
else {
  # base = "Simulador CNC.html" do -Ref (padrao origin/main), tirado do git sem mexer na pasta
  $Base = Join-Path $dados 'base.html'; Remove-Item -LiteralPath $Base -ErrorAction SilentlyContinue
  if (Get-Command git -ErrorAction SilentlyContinue) {
    if ($Ref -like 'origin/*') { Start-Process git -ArgumentList 'fetch', '-q', 'origin' -WorkingDirectory $raiz -NoNewWindow -Wait }
    $err = Join-Path $dados 'git-erro.txt'
    $pr = Start-Process git -ArgumentList "cat-file blob `"${Ref}:Simulador CNC.html`"" -WorkingDirectory $raiz -NoNewWindow -Wait -PassThru -RedirectStandardOutput $Base -RedirectStandardError $err
    if ($pr.ExitCode -ne 0 -or (Get-Item -LiteralPath $Base).Length -lt 1000) { Write-Warning "Nao consegui tirar a base de $Ref (git): $(Get-Content -Raw $err)"; $Base = '' }
    else { $baseNome = $Ref }
  } else { Write-Warning 'git nao encontrado: testando so a versao nova (use -Base arquivo.html para comparar).'; $Base = '' }
}

$enc = New-Object Text.UTF8Encoding $false
function Send($ctx, [int]$code, [byte[]]$b, [string]$type) {
  $r = $ctx.Response; $r.StatusCode = $code; $r.ContentType = $type; $r.Headers['Cache-Control'] = 'no-store'
  $r.ContentLength64 = $b.Length; $r.OutputStream.Write($b, 0, $b.Length); $r.OutputStream.Close()
}
function SendText($ctx, [int]$code, [string]$t, [string]$type = 'text/plain; charset=utf-8') { Send $ctx $code $enc.GetBytes($t) $type }
$html = 'text/html; charset=utf-8'

$l = New-Object Net.HttpListener; $l.Prefixes.Add("http://localhost:$Porta/")
try { $l.Start() } catch { Write-Warning "Nao consegui abrir a porta $Porta ($_). Ja tem um teste ligado?"; return }
"Teste dos perfis: http://localhost:$Porta/   novo = $novo   base = $(if ($Base) { "$baseNome" } else { '(nenhuma)' })"
'Feche esta janela (ou Ctrl+C) para desligar.'
if (-not $SemAbrir) { Start-Process "http://localhost:$Porta/" }
while ($l.IsListening) {
  $ctx = $l.GetContext()
  try {
    $p = $ctx.Request.Url.AbsolutePath
    switch ($p) {
      '/' { Send $ctx 200 ([IO.File]::ReadAllBytes($pagina)) $html }
      '/novo.html' { Send $ctx 200 ([IO.File]::ReadAllBytes($novo)) $html }
      '/base.html' { if ($Base) { Send $ctx 200 ([IO.File]::ReadAllBytes($Base)) $html } else { SendText $ctx 404 'sem base' } }
      '/info' { SendText $ctx 200 ('{"base":' + $(if ($Base) { '"' + $baseNome.Replace('\', '\\').Replace('"', '\"') + '"' } else { 'null' }) + '}') 'application/json' }
      '/resultado' {
        $ms = New-Object IO.MemoryStream; $ctx.Request.InputStream.CopyTo($ms)
        $f = Join-Path $dados 'resultado.json'; [IO.File]::WriteAllBytes($f, $ms.ToArray())
        $txt = Join-Path $dados 'resultado.txt'; $j = $enc.GetString($ms.ToArray()) | ConvertFrom-Json
        [IO.File]::WriteAllText($txt, $j.resumo, $enc); "`n$($j.resumo)`n(salvo em $f)"
        SendText $ctx 200 'ok'
      }
      default { SendText $ctx 404 'nao existe' }
    }
  } catch { try { SendText $ctx 500 "$_" } catch {} }
}
