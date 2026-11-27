# VEDADOR (374.17 X 389.6 X 8.2) — programa 46542, cód. interno 46516 (PU, bucha 301 x 391, 1 operação)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\VEDADOR\VEDADOR (374.17 X 389.6 X 8.2) 46542\`). **Medidas do STL: Ø374,27 x
Ø389,77 x 8,2** (o nome da pasta diz 374,17 x 389,6). Chanfros 0,5 nos 4 cantos; canal em V no externo (fundo Ø387,77), no interno
(fundo Ø376,17) e numa face (0,5 de fundo, de Ø376,27 a Ø387,77, fundo em Ø382,02).

**Z0 = face com o canal em V** — a outra face é lisa e fica no corte (o canal da face não sai pela face do corte).

| Arquivo | Onde foi gravado (27/11/2026) |
|---|---|
| `046542.PIT` | `Programas_CNC` (Fagor) |
| `46542.txt` | `Programas_CNC\MCS 500` |
| `VEDADOR (374.17 X 389.6 X 8.2) 46542.pdf` | `DESENHOS\VEDADOR\VEDADOR (374.17 X 389.6 X 8.2) 46542\` |

**Programa (`046542`)**: T3D3 face (X395 → X297) e o canal em V da face (passe único, F0,12) → OUTSIDE T2D2: só acabamento
(bucha Ø391 deixa 1,23 no Ø): chanfro, Ø389,77, V a 18°, chanfro de trás e um pouco além do corte → INSIDE T2D12: 9 passes retos
até Z −9,2 (máx. 8 no Ø), pré-acabamento (−1 no Ø) e acabamento com o V → CUTTING T5D5 em Z −8,2 (X399,77 = Ø + 10), F0,22.
G92 Z24,433 (15 + 9,283 + 0,15). S500.

**Desenho**: padrão aprovado (Ø só no corte A-A; secção com 1 / 5,794 / 1,406 em cima, 1 / 6,2 / 1 embaixo, canal da face 0,5 e
5,75, fundos dos V 1 e 0,95, secção 7,75), face do canal (Z0) à direita, material PU, cód. interno 46516.

## Conferir
- Medidas: o STL (374,27 / 389,77) não bate com o nome da pasta (374,17 / 389,6) — programa e desenho seguem o STL.
- T3D3 fazendo o canal da face (V raso de 0,5, ~10° com a face).

Gerado pelo Simulador no navegador com `item.js` (`prog46542()` / `des46542()` + `drawingPdfBytes`).
