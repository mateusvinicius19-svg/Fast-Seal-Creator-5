# VEDADOR (374.17 X 389.6 X 8.2) — programa 46542, cód. interno 46516 (PU, bucha 301 x 391, 1 operação)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\VEDADOR\VEDADOR (374.17 X 389.6 X 8.2) 46542\`). **Medidas do STL: Ø374,27 x
Ø389,77 x 8,2** (o nome da pasta diz 374,17 x 389,6). Chanfros 0,5 nos 4 cantos; canal em RAIO no externo (R5,305, fundo Ø387,77, borda de 1 mm dos dois lados — usuário; o STL tinha 1,406 na frente) e no interno (R5,533, fundo Ø376,17) — v2,
usuário: "é raio, você fez em ângulo" (o STL só tem 3 a 5 pontos em cada canal; o raio passa por eles) — e canal em RAIO numa face (R8,516; usuário: "a face também é raio") (0,5 de fundo, de Ø376,27 a Ø387,77, fundo em Ø382,02).

**Z0 = face com o canal em V** — a outra face é lisa e fica no corte (o canal da face não sai pela face do corte).

| Arquivo | Onde foi gravado (27/11/2026) |
|---|---|
| `046542.PIT` | `Programas_CNC` (Fagor) |
| `46542.txt` | `Programas_CNC\MCS 500` |
| `VEDADOR (374.17 X 389.6 X 8.2) 46542.pdf` | `DESENHOS\VEDADOR\VEDADOR (374.17 X 389.6 X 8.2) 46542\` |

**Programa (`046542`)**: T3D3 face (X395 → X297) e o canal da face em raio (G3 R8,116 na ponta, passe único, F0,12) → OUTSIDE T2D2: só acabamento
(bucha Ø391 deixa 1,23 no Ø): chanfro, Ø389,77, canal R5,305 (G2 R4,905 na ponta), chanfro de trás e um pouco além do corte → INSIDE T2D12: 9 passes retos
até Z −9,2 (máx. 8 no Ø), pré-acabamento (−1 no Ø) e acabamento com o canal R5,533 (G3 R5,133 na ponta) → CUTTING T5D5 em Z −8,2 (X399,77 = Ø + 10), F0,22.
G92 Z24,433 (15 + 9,283 + 0,15). S500.

**Desenho**: padrão aprovado (Ø só no corte A-A; secção com 1 / 6,2 / 1 em cima, 1 / 6,2 / 1 embaixo, canal da face 0,5 e
5,75, fundos dos canais em raio 1 e 0,95, secção 7,75), face do canal (Z0) à direita, material PU, cód. interno 46516.

## Conferir
- Medidas: o STL (374,27 / 389,77) não bate com o nome da pasta (374,17 / 389,6) — programa e desenho seguem o STL.
- T3D3 fazendo o canal da face (raio R8,516, 0,5 de fundo).

Gerado pelo Simulador no navegador com `item.js` (`prog46542()` / `des46542()` + `drawingPdfBytes`).
