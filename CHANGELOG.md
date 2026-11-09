# Histórico de versões — Fast Seal Creator 5

Regra: toda alteração sobe a versão em `VERSION`, ganha uma entrada aqui (data + o que mudou) e vai para o GitHub
(commit + tag `vX.Y.Z` + push). Versão = MAIOR.MENOR.CORREÇÃO
- CORREÇÃO (5.0.x): conserto de erro, ajuste de regra pequena.
- MENOR (5.x.0): recurso novo, perfil novo, rotina nova.
- MAIOR (x.0.0): mudança grande de formato/fluxo.

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
