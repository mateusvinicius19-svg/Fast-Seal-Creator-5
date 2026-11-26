# VEDADOR (28 X 46 X 26) — programa 46498, cód. interno 42871 (PU, bucha 12 x 48, 1 operação)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\VEDADOR\VEDADOR (28 X 46 X 26) 46498\`), **Z0 = face do Ø43 / rebaixo Ø38**
(o rebaixo Ø38 x 17 só sai por este lado):
- externo: chanfro 0,2, Ø43 até Z −15,2, colar Ø46 (chanfros 0,2) até Z −20,1, parede reta até Ø42, Ø42 até o fim, chanfro 0,2
- interno: chanfro 0,2, rebaixo Ø38 até Z −17, Ø28 até o fim, chanfro 0,2 x 30° atrás

| Arquivo | Onde foi gravado (26/11/2026) |
|---|---|
| `046498.PIT` | `Programas_CNC` (Fagor) |
| `46498.txt` | `Programas_CNC\MCS 500` |
| `VEDADOR (28 X 46 X 26) 46498.pdf` | `DESENHOS\VEDADOR\VEDADOR (28 X 46 X 26) 46498\` |

**Programa (`046498`)**, ferramentas de PU, raio 0,4 compensado nas coordenadas:
T3D3 face (até o centro) → OUTSIDE T2D2: passada de contorno (acabamento + 1 no Ø) e acabamento até o chanfro de trás do colar →
INSIDE T1D45: Ø20 e Ø27 até Z −27, rebaixo Ø35 e Ø37 até Z −16,8, acabamento → OUTSIDE 2 T6D6: parede atrás do colar, Ø42 e
chanfro de trás → CUTTING T5D5 (faca) em Z −26, F0,220, aproxima em X56 (Ø46 + 10). G92 Z42,15.

v2 (usuário 26/11/2026: "senão eu fico com 2 passes no mesmo lugar e o acabamento fica ruim"): o pré-acabamento da T2D2 sobe
na parede da frente do colar em Z −14,7 (0,5 antes do acabamento) e atrás do colar fica no Ø44; atrás do colar só a T6D6 tira.

**Desenho**: padrão aprovado (Ø só no corte A-A, secção ampliada só com alturas, lábio da frente 2,5, trás 7, secção 9), face do
Z0 à direita, material PU.

Regerar: `node "Programas avulsos/VEDADOR (28 X 46 X 26) 46498/gerar.js"` (o Simulador no navegador também roda o `item.js`).
