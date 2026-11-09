# Análise de perfis – Parts Seals (05/11/2026)

Fonte: 49.554 arquivos .PIT em `W:\Parts\PartsSeals\PROJETOS\Programas_CNC` (desde 02/2023).
14.337 foram gerados pelo Fast Seal, com **120 perfis diferentes**.
**14 perfis cobrem 80% de todos os programas.** É por eles que o programa próprio deve começar.

## Ranking de uso (todos os anos)

| # | Perfil | Programas | Tipo (pelo catálogo/código) |
|---|--------|-----------|------------------------------|
| 1 | PSA108 | 1582 | Anel guia retangular com 4 chanfros (PTFE) |
| 2 | PSH117 | 1359 | Vedação de haste (PU) |
| 3 | PSHPSE106 | 1324 | Haste/êmbolo (PU) |
| 4 | WH07A | 1241 | Raspador (PU) |
| 5 | PSA108A | 1171 | Anel guia, variante (borracha/PU) |
| 6 | PSG101 | 1036 | Guia (PTFE) |
| 7 | PSR211 | 838 | Haste com canal "hammer" (PU) |
| 8 | PSH105 | 544 | Vedação de haste (PU) |
| 9 | PSE105 | 484 | Êmbolo (PU) |
| 10 | VPA01B | 438 | Vedação de pistão em várias peças (PTFE) |
| 11 | S03 | 422 | — |
| 12 | PSR102 | 370 | Haste (PU) |
| 13 | BUP01 | 354 | Backup de pistão (PTFE) |
| 14 | RS01P | 286 | — |

## O que cada perfil usa (amostra dos 40 programas mais recentes de cada um)

- **Guias e backups (PSA108, PSG101, BUP01, GR03)**: Facing → Inside → Cutting.
  - Ferramentas T7D7 (face), T4D4 (interno) e T8D8 (corte).
  - Material quase sempre PTFE.
  - Geometria simples: retângulo + chanfros.
  - Parâmetros do PSA108 (tela V): AI1, AI2, AO1, AO2 (ângulos, 45°), CHI1, CHI2, CHO1, CHO2 (chanfros, 0,6), HC (altura), IC (Ø interno) e OC (Ø externo).
- **Vedações em PU (PSH117, PSHPSE106, PSH105, PSE105, PSR102, WH07A)**: Facing → Inside → Outside → Cutting, às vezes com Front Groove.
  - Ferramentas T3D3, T5D5, T2D2, T2D12 e T1D45.
- **PSR211**: além das operações acima, tem Outside Angle Hammer Groove (T6D6).
- **VPA01B**: vem em variantes -1, -2 e -3 (peças do conjunto) e leva Front Groove.

Todos começam com o mesmo cabeçalho: `G90 G95 G54 G97S2600M3`.

## Próximos passos sugeridos

1. Fazer primeiro a "receita" do **PSA108**: é o mais usado e o mais simples (retângulo com 4 chanfros). Serve para validar o gerador comparando com os .PIT reais.
2. Depois o PSG101 e o BUP01, que usam o mesmo fluxo de operações.
3. Depois a família de PU (PSH117 / PSHPSE106), que tem lábios e mais operações.

Lista completa de programas × perfil × medidas: `programas_fastseal.csv`.
