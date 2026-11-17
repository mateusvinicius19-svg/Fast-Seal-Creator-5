# VEDADOR 10 X 16 X 6 — programa 46310 (PU, tarugo Ø20, 2 operações)

Secção tirada do STL do Inventor: Ø int 9,606 · Ø ext 16,706 · altura 6.

| Arquivo | Onde vai |
|---|---|
| `046310.PIT`, `046310 OP2.PIT` | `Programas_CNC` (Fagor) |
| `46310.txt`, `46310 OP2.txt` | `Programas_CNC\MCS 500` |

**OP1 (`046310`)**: T3D3 face → canal da frente (ferramenta de forma, Ø12,088, Z −0,9) → T2D2 externo (desbaste + acabamento,
chanfro 45° de trás) → T8D8 canal Ø14,088 embaixo do lábio (Z −0,8 a −2,3, 2 mergulhos) → T4D14 interno (furo do tarugo
Ø7,5 + acabamento: lábio Ø9,606, rebaixo Ø10,188 com rampas de 12,5°) → T5D5 corte em Z −6,5 (0,5 de sobremetal).

**OP2 (`046310 OP2`)**: peça virada e presa pelo externo; Z0 = face de trás acabada (entra com 0,5 a mais).
T3D3 faceia → T4D14 chanfro interno 0,2 → canal de trás (ferramenta de forma, Ø12,646, Z −1,4). Sem RPT/barra
(o `CYC CALL 4` do intervalo foi tirado do .txt).

## Conferir antes de rodar
- **T4D92 / T4D93 são provisórios**: troque pelo T/D das ferramentas de forma (frente: largura 0,9 com fundo R0,45;
  trás: boca ~1,24, flancos 11,6°, fundo R0,4). Referência: ponta (fundo) no centro do canal.
- T8D8 (bedame 1 mm) com referência no lado da frente da lâmina.
- T4D14 com a barra de R0,2; a rampa do rebaixo interno pede 12,5° de folga nas costas.
- Fixação da OP2 (peça pequena, presa no Ø16,088).

Regerar: `node "Programas avulsos/VEDADOR (10 X 16 X 6) 46310/gerar_programa.js"`.
