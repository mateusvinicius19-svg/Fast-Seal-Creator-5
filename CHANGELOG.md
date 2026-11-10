# Histórico de versões — Fast Seal Creator 5

Regra: toda alteração sobe a versão em `VERSION`, ganha uma entrada aqui (data + o que mudou) e vai para o GitHub
(commit + tag `vX.Y.Z` + push). Versão = MAIOR.MENOR.CORREÇÃO
- CORREÇÃO (5.0.x): conserto de erro, ajuste de regra pequena.
- MENOR (5.x.0): recurso novo, perfil novo, rotina nova.
- MAIOR (x.0.0): mudança grande de formato/fluxo.

## 5.7.2 — 10/11/2026
- Rotina\cancelar.ps1 (novo): cancela programa duplicado — MOVE (não apaga) .PIT/variantes, .txt do MCS 500, pasta do desenho
  e pedido ARGUS para `Rotina\backup\cancelados\<num>`, anota em `Rotina\Programas cancelados.csv`. Confere que o original existe
  e pede S para confirmar. Uso: `cancelar.ps1 -Num 046166 -Dup 046125` (046166 feito em duplicado do 046125).
## 5.7.1 — 10/11/2026
- Prévia de impressão: o botão **Imprimir / PDF** (e o Ctrl+P com a prévia aberta) pergunta o **Cód. interno** ANTES da
  janela de impressão, já preenchido com o código da peça (Enter confirma, Cancelar não imprime). Não precisa mais fechar
  a prévia para editar. Se o código mudou depois de salvar, regrava o PDF em DESENHOS e o pedido ARGUS com o código novo.
- Correção: o pedido ARGUS da impressão só usa o último desenho salvo se for da MESMA peça.
## 5.7.0 — 10/11/2026
- Simulador (desenho): pergunta o **Cód. interno (item)** ANTES de mostrar o desenho — no botão do desenho e no
  Salvar programa (depois do número, antes de gravar o PDF/pedido ARGUS). Uma vez por peça (`askCod`, chave `pieceFile`):
  peça nova começa em branco (não reaproveita o código do item anterior); Cancelar não abre o desenho / não salva.
## 5.6.3 — 10/11/2026
- Desenho avulso: `Desenhos avulsos/PLUG (18 X 53.3)/` — PLUG Ø18 x 53,3 (colar Ø18 x 2, canal Ø11 x 2,5, corpo Ø12,
  chanfro 1 x 45°, furo Ø4,1 x 5,5 ponta 118°) na folha Parts Seals (drawingSVG modo "custom"); PDF/SVG/PNG + `gerar_desenho.js`.
  Chanfros 0,5 x 45° e quebra 0,2 estimados da imagem (não cotados). Material/programa/cód. interno em branco.
## 5.6.2 — 10/11/2026
- ESPEC Kuru: a tela "Pedidos do Simulador" fica na aba Projeto do Kuru (não na Usinagem CNC nem no Pargus).
## 5.6.1 — 10/11/2026
- Documentação: `Claude contexto/ESPEC Kuru - pedidos ARGUS do Simulador.md`, a especificação para o Kuru Nuvem ler a fila
  `DESENHOS\_PEDIDOS ARGUS` e gravar sozinho o Anexo 1 e o Código do programa no ARGUS (usuário quer automático ao salvar).
## 5.6.0 — 10/11/2026
- Simulador (desenho): campo **"Cód. interno (item) → Anexo 1 ARGUS"**. Com ele preenchido, ao salvar o desenho (Salvar programa)
  ou ao clicar em Imprimir na prévia, o Simulador grava um pedido em `DESENHOS\_PEDIDOS ARGUS\<item>_<programa>.json`
  (item, programa, caminho do PDF). Código vazio ou com letra: não grava e avisa na mensagem.
- Rotina\pedidos_argus.ps1 (novo): lista a fila (confere se o PDF existe) e marca `-Feito` (move para `feitos`) ou `-Erro`.
  Quem aplica é o Claude pelo Kuru > Pargus > Catálogo de Itens: Anexo 1 = PDF, Código do programa, F9 Salvar no ARGUS.
  O Simulador não grava direto no ARGUS (só o Kuru grava; senha do banco não é usada).
## 5.5.0 — 10/11/2026
- PSA 108 (desenho): tolerância dos diâmetros por faixa (`PSA_DIA_TOL`, quanto menor o Ø menor a tolerância):
  Ø até 30 = ±0,1 · até 80 = ±0,2 · até 150 = ±0,3 · até 300 = ±0,4 · acima = ±0,5. Altura 0/−0,1. **Secção ±0,1** (antes sem tolerância).
  Vale quando o campo de tolerância está vazio (antes ±0,2 fixo). Função `psaTolFill(p)`.
- Rotina\gerar.ps1 (harness): chama `psaTolFill` — antes os desenhos PSA 108 gerados pela rotina saíam sem tolerância no Ø e na altura.
- Inclui alteração do Simulador feita em 09/11 (fora desta conversa, não commitada): material das gaxetas/raspadores em lista
  (PU / NBR / PTFE puro / PTFE+BR) e ferramentas do NBR = as das arruelas.
## 5.4.0 — 10/11/2026
- Rotina\gerar.ps1: `"forcar": true` no job agora também passa pela conferência de duplicados com resultado **JA EXISTE**
  (antes só liberava VERIFICAR). Uso: o usuário pede programa NOVO mesmo havendo antigo (ex.: 31140/1 PSA 108 123x128x7,
  que tinha só as variantes antigas do 025650 → gerados 046135 = 1 peça e 046136 = 4 peças por ciclo).
## 5.3.0 — 09/11/2026
- Croqui (Simulador CNC.html): campo INTERVALO trocado por **COD INTERNO** (código do item do cadastro);
  no formulário do desenho o campo "Intervalo" virou "Cód. interno (item)" (`data-d="cod"`).
- Croqui: texto do bloco **Quantidade** centralizado (estava à esquerda).
- gerar.ps1: passa o código do item do job (`item`) para o COD INTERNO do desenho.

## 5.2.0 — 09/11/2026
- O CADASTRO do Kuru manda (os cabeçalhos dos .PIT estão errados na maioria):
  - jobs ganham `"cad": {"prog": "...", "bucha": "..."}` lidos de OP → Visualizar Cadastro → aba Part Seals;
  - `gerar.ps1`: Código do programa preenchido → JA EXISTE (não gera); código sem .PIT na pasta → VERIFICAR;
    bucha do cadastro (`AxB` ou `TARUGO N`) vira bi/bo do programa.
- `duplicados.ps1`: cabeçalho sozinho não confirma mais; precisa do desenho do mesmo número ou da altura do corte (senão VERIFICAR).
- Rotina documentada: passo "cadastro de cada OP" antes de montar os jobs.

## 5.1.1 — 09/11/2026
- duplicados.ps1: desenho com as mesmas medidas só confirma o programa se o cabeçalho do .PIT for do mesmo perfil
  (025382 = desenho PSH 106 mas programa RS01P; 031951.PIT = arquivo MCS) → senão VERIFICAR.
- Correção: cabeçalho `PSHPSE106` virava um texto só ("PSH106 PSE106") e não casava com PSH106/PSE106.
- 046112 (duplicado do 046012) movido para backup; planilha de controle da 31042/12 apontada para 046012.

## 5.1.0 — 09/11/2026
- Nova conferência de programa duplicado (`Claude contexto/Rotina/duplicados.ps1`), usada pelo `gerar.ps1` ANTES de reservar número:
  - cabeçalhos de todos os .PIT nos 2 formatos (`PSR 102 110X125X9X12` e `PSR102-P 110.000/125.000/9.000`), perfil sem sufixo -P/-M;
  - cabeçalho cortado em 21 caracteres: último número comparado como prefixo;
  - cabeçalho sem altura total (PSR do Simulador) ou cortado: confirma pelo desenho do mesmo número ou pela altura do corte (Z da faca);
  - pastas de desenho `DESENHOS\<PERFIL>\<PERFIL> (a X b X c [X d]) NNNNN` com as mesmas medidas → programa NNNNN.
  - Resultado: JA EXISTE (não gera, só atribuir) / VERIFICAR (provável; não gera sem `"forcar": true` no job) / NOVO.
- Motivo: a OP 31042/12 (PSR 102 110x125x9/12) ganhou o 046112, mas já existiam 046012 e 004446; 046115 (PSH 106 35x45x10) repetia 025382/031951.
- Uso sozinho: `duplicados.ps1 -JobsFile jobs_dd-MM-aaaa.json` (só confere, não grava).

## 5.0.0 — 09/11/2026
- Primeira versão no GitHub (base do que já estava no W: em 09/11/2026).
- Simulador CNC.html: gera Fagor .PIT + MCS 500 + desenho PDF para PSE/PSH 105/106/107, PSH 117, PSR 102/211,
  DH PSH 129, PSO 109, arruelas (ISO, ciclo com/sem chanfro); Alterar programa (só desbaste); Ver programa.
- Rotina noturna (`Claude contexto/Rotina/*.ps1`): gerar, revisar, controle, imprimir, regerar, índice de .PIT, pit2mcs.
