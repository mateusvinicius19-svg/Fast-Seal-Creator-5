# CLAUDE.md — Fast Seal Creator 5

## Regra principal: TUDO na `main` (usuário, 11/11/2026)
O `Iniciar\Abrir Simulador.bat` da área de trabalho do usuário baixa **só a branch `main`**. O que não estiver na `main`
não chega no computador dele.

Ao terminar qualquer alteração (mesmo pequena):
1. Antes de começar, traga a `main` mais nova para a sua branch (`git fetch origin main && git merge origin/main`):
   outras sessões trabalham em paralelo e mexem no mesmo `Simulador CNC.html`.
2. Suba a versão em `VERSION` a partir do número da **main** (nunca repita um número que já existe na main) e escreva a
   entrada no `CHANGELOG.md`.
3. Commit + push na branch da sessão, **abra o pull request para a `main` e faça o merge** (sem esperar pedido).
   Se a main andou enquanto você trabalhava: merge da main na sua branch, resolva conflitos, teste e só então o merge do PR.
4. Confira que a `main` no GitHub ficou com o `VERSION` novo.

## Como o usuário usa
- `Iniciar\Abrir Simulador.bat` (cópia na Área de Trabalho) só baixa e roda `Iniciar\atualizar.ps1` da main (mude a lógica
  lá, não no .bat). O atualizador baixa a `main` para `%LOCALAPPDATA%\FastSealCreator\app-<commit>` (uma pasta por versão: a
  antiga pode estar em uso pelo servidor), roda `Iniciar\abrir.ps1`, que copia o
  `Simulador CNC.html` para `W:\Parts\PartsSeals\PROJETOS\PROGRAMAÇÃO\PADRONIZAÇÃO\Arruela Padronizada`, religa o
  `Servidor Simulador.ps1` e abre `http://localhost:8765` (pastas fixas, não pede pasta). Log: `%LOCALAPPDATA%\FastSealCreator\log.txt`.
- O usuário NÃO copia arquivos à mão: entregar = estar na `main`.
- Usuário do Windows tem espaço no nome (`C:\Users\jsl sbo`, TEMP vira `C:\Users\JSLSBO~1\...`): nos scripts não use
  `$env:TEMP` com `Expand-Archive`; use pastas em `LocalApplicationData` e `[IO.Compression.ZipFile]`.
- Scripts `.ps1` rodam no Windows PowerShell 5.1: arquivo sem BOM é lido como ANSI — use só ASCII ou salve com BOM (UTF-8).
- Esta sessão na nuvem não enxerga o W:. Para ver um programa, peça para o usuário colar o texto (🔎 Ver programa → ⧉ Copiar).

## Onde está o quê
- `Simulador CNC.html` — aplicativo inteiro (geradores, simulador, desenhos).
- `Servidor Simulador.ps1` — servidor local (pastas fixas; `-Rede` = celular).
- `Iniciar/` — `Abrir Simulador.bat` e `abrir.ps1`.
- `Claude contexto/` — regras de usinagem, catálogo de perfis, rotina em lote (`Rotina/*.ps1`).
- `RODAR FILA DE PROGRAMAS.md` + `Kuru - fila ARGUS/` — guia e módulo testado para o Kuru aplicar a fila `_PEDIDOS ARGUS` no ARGUS.
- `Desenhos custom/`, `Desenhos avulsos/` — desenhos especiais na folha Parts Seals.
- Idioma: português do Brasil; escrever "secção" (com ç) nos desenhos.
