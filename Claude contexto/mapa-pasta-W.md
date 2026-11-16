---
name: mapa-pasta-W
description: Mapa da unidade W: (servidor Parts Seals) — onde ficam programas, desenhos, padrões, ferramentas, catálogos e manuais úteis para o Simulador
metadata:
  type: reference
---

# Mapa da pasta W: (levantado em 16/11/2026, pelo PC do usuário)

Raiz útil: `W:\Parts\PartsSeals\`. O resto do W: (Schemas NFe, Sistema = ARGUS, Setup, Tabelas, ADM, TI, senhas,
Supabase) é administrativo/fiscal: **não abrir nem copiar** (tem senhas e dados da empresa).

## PROJETOS (`W:\Parts\PartsSeals\PROJETOS\`) — o principal para o Simulador
| Pasta | O que tem | Uso no Simulador |
|---|---|---|
| `Programas_CNC\` | ~50 mil programas Fagor `NNNNNN.PIT` (variantes no nome: `CICLO 5 PEÇAS`, `A`, medidas, `CORTE FACA`) | fonte das regras FSC (comparar com o gerado) |
| `Programas_CNC\MCS 500\` | ~23 mil programas MCS 500 (`.txt`) | destino de salvar MCS; regras MCS |
| `Programas_CNC\` subpastas | `PROG ANTIGOS`, `Programas Logic 195 MCS`, `PROGRAMAS PROTEGIDOS`, `PROGRAMAS SEM CODIGO` (41), `PROGRAMAS TESTE`, `HISTORICO KURUJOOS` | consulta |
| `PROGRAMAS MAQUINA FAGOR 1` / `FAGOR 2` | programas que estão/estiveram em cada máquina (muitos com ajuste manual: `CICLO 5 PC`, `BDM 0.93`, `T45`) | ver como o operador corrigiu |
| `DESENHOS\` | 560 pastas, uma por perfil (`PSA 108`, `PSE 105 E`, `PSH 110`, `PSR 101`…, `E` = especial) + `_PEDIDOS ARGUS`, `DESENHOS APROVAÇÃO`, `CROQUIS ENVIADOS PELOS CLIENTES`, `ZERAMENTO FERRAMENTAS`, `CORRETORES FERRAMENTA`, `FOLHA A4`, `FLANGE DESENHO PADRÃO` | desenhos de referência por perfil; destino dos PDFs |
| `PROGRAMAÇÃO\PADRONIZAÇÃO\` | `Arruela Padronizada` (onde roda o Simulador), modelos `.txt` de programas: arruela 1/5 peças, DP 4x2.65 / 6x3.5 (T7T4, T54T64), estrutura O-ring (Ø < 28 e normal), `REGRA PROGRAMA PÇ DIRETA.txt`, `FAGOR\` e `MCS\` (PADRAO MCS, DH 6x3.5, PSA 108 1.93-4.7), `DOCUMENTAÇÃO PADRÃO` (Folha Padrão, Família de peças, Propriedades Materiais, indicação de ferramenta, zeramento Fagor, controle prog) | modelos de estrutura de programa |
| `PROGRAMAÇÃO\Controle de Programas.xlsx` | controle dos números de programa | |
| `ORDEM DE SERVIÇO- PERFIS\` | ~250 planilhas `.xls` de ordem por perfil (Gaxeta PSH-105, Raspador PSR-101, Guia PSG-104…) + `Relação Eixos 2 ATUALIXADA.xlsx` | medidas/processo por perfil, eixos (buchas) |
| `PROJETO- FERRAMENTAS\` | projetos de bedames, suportes, dispositivos, `Codigo de ferramentas\TABELA DE CODIGOS FERRAMENTAS.txt`, `Catalogo de ferramentas` (Mastor, Seal Maker) | ferramentas reais |
| `MANUAL - OPERAÇÃO E PROGRAMAÇÃO\` | manuais Fagor 8037/8055, MCS série 500, Nardini Logic 195 II, livro CNC, `PÓS PROCESSADOR\` (`FAGOR 8037-T_Ferramentaria.cps`, `MCS_500 Diplomat.cps`), "Como medir nossos perfis de peças" | sintaxe G-code das máquinas |
| `IT CONVERSÃO DE PROGRAMAS\` | IT Fagor → MCS e MCS → Fagor (docx/pdf) | regra da conversão |
| `CIMCO\`, `RGDNC\` | CIMCO Edit, WinDNC, RGDNC-NET (envio às máquinas, IPs) | não mexer |
| `PADRÃO ANEL ORING\` | modelo PSO 109 | |

## Outras pastas de `W:\Parts\PartsSeals\`
- `CATALOGO\` — catálogos (Parker, Freudenberg, Busak/Trelleborg, Merkel, DNA, Simrit, Sandvik), `PARTS-SEALS - LISTA DE PERFIS.pdf`,
  `FastSealProfileList.pdf`, `Tolerâncias`, `Catalogos\` (Busak por tipo, Chevron, ferramentas).
- `PROCESSO DE FABRICAÇÃO\` — `Limite diametros.txt` (ext. Ø,2 a Ø nunca menor; int. Ø,8 a Ø nunca maior),
  `Tabela Padrão DP DH.xls`, `Fabricação PTFE\` (cálculo de buchas PTFE, moldes, sinterização), `Informaçoes tecnicas\`
  (`Pastilhas Para usinagem.txt`, `Suportes.txt`, cálculo de bucha PU), `FITA GUIA`.
- `Banco de Ordens\` — `BancoDeOrdens.xlsm/.accdb`, `BancoBuchasLiberadas.xlsm`, estoque de teflon (JSON) — dados de produção, só leitura.
- `PCP\`, `PROGRAMAÇÃO DE PRODUÇÃO-DIARIA\`, `Requisição/Solicitação de Compras`, `Relógio Ponto`, `Rnc Interna` — administrativo.

## Ferramentas (dos .txt do W:)
- T7 externa: suporte SVJBL 2020 K16, pastilha VCGT 160404 (Iscar VCGT 331 IC20 / Ceratizit VCGT 160404FN 25P).
- T4 interna 7 mm: S10K-SDUCR 07, pastilha DCGT 070204-AK (Korloy DVGT 070204-AK / Iscar DCGT 2-1-AS IC20); interna 11 mm VCGT 110304-AK.
- T6 bedame 2 mm: MGEHL 2020-2 (MGMN 200 G neutra / MRM 200 M com raio); bedame 3 mm DGTL 20 B 3D40 (DGL 31020).
- T8 bedame 1 mm: 3000-20X125L (pastilha 3002.1,0.13.L WPU7620).
- T2 bedame interno 2 mm MGIVL-2016-2; bedame interno 0,8 MB-E16-34-09R (pastilha MB-09R080-04-14L 1025).
- T1 S16 R SVUCL 11; interno afiado CXS-06TE98-15-6230L.
- Aço: VBM 160404 HMP (35°), TNMG 160404RN F50.

## Peça direta DP (REGRA PROGRAMA PÇ DIRETA.txt)
Externo até altura − 1,6 (alt. 6) / − 1 (alt. 4 e 3); interno até altura − 0,4; corte 1º passe altura + 3, 2º altura + 0,95.

Ver também [[profile-catalog-map]], [[machining-rules-tools]], [[feedback-fsc-derived-rules]].
