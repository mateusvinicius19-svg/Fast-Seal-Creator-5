# Histórico de versões — Fast Seal Creator 5

Regra: toda alteração sobe a versão em `VERSION`, ganha uma entrada aqui (data + o que mudou) e vai para o GitHub
(commit + tag `vX.Y.Z` + push). Versão = MAIOR.MENOR.CORREÇÃO
- CORREÇÃO (5.0.x): conserto de erro, ajuste de regra pequena.
- MENOR (5.x.0): recurso novo, perfil novo, rotina nova.
- MAIOR (x.0.0): mudança grande de formato/fluxo.

## 5.6.4 — 11/11/2026
- Simulador (✏️ Alterar programa): acha o programa também quando ele só existe com a bucha no nome
  (ex.: `046158 194X222.PIT`, sem `046158.PIT`). Procura na lista do Ver programa / Histórico e, se não estiver, lê a pasta.
  Mais de uma variante: ignora as CICLO e usa a mais nova. Pode digitar "046158" ou "046158 194X222".
  Salva como `046158 <bucha nova>`; se o nome já existir, pergunta antes de substituir.
## 5.6.3 — 11/11/2026
- Simulador (✏️ Alterar programa): quando não acha o `NNNNNN.PIT`, a mensagem agora diz o motivo — qual pasta está lembrada
  (e avisa se ela não parece a Programas_CNC), se só existem variantes `NNNNNN BIxBO.PIT`, ou se só existe o `.txt` no MCS 500.
  Também aceita o arquivo com extensão minúscula (`.pit`).
- Desenhos custom: `Desenhos custom/PSO 11 E R (153.5 X 180 X 11.25)` (corpo + anel GR06) e `render.js` (gera PDF/PNG).
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
