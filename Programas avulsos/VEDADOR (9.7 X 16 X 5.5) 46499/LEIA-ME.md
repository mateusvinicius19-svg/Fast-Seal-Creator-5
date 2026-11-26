# VEDADOR (9.7 X 16 X 5.5) — programa 46499, cód. interno 46501 (PEAD, tarugo Ø20, 1 operação)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\VEDADOR\VEDADOR (9.7 X 16 X 5.5) 46499\`), **Z0 = face do Ø13,5**
(assim a parede do canal fica virada para a frente):
- externo: chanfro 0,2, Ø13,5 até Z −1, reta a 45° e canal R0,884 (fundo Ø12) até a parede reta em Z −3, Ø16 até o fim, chanfro 0,2
- interno: Ø9,7 com chanfro 0,2 x 45° na frente e 0,2 x 30° atrás

| Arquivo | Onde foi gravado (26/11/2026) |
|---|---|
| `046499.PIT` | `Programas_CNC` (Fagor) |
| `46499.txt` | `Programas_CNC\MCS 500` |
| `VEDADOR (9.7 X 16 X 5.5) 46499.pdf` | `DESENHOS\VEDADOR\VEDADOR (9.7 X 16 X 5.5) 46499\` |

**Programa (`046499`)**, ferramentas de PEAD (sem G41/G42, raio 0,4 compensado nas coordenadas):
T3D3 face (até o centro) → OUTSIDE T7D7: pré-acabamento (+1 no Ø; no canal reto no Ø13,5 e sobe 0,5 antes da parede, em
Z −2,5, para não passar no mesmo lugar do acabamento — regra do usuário no 46498) e acabamento até o fim do chanfro de trás →
INSIDE T2D14: passe reto Ø8 até Z −6,5 (tarugo), acabamento → CUTTING T8D8 (bedame 1) em Z −5,5, F0,100, aproxima em X30.
G92 Z22,05.

**Desenho**: padrão aprovado (Ø só no corte A-A; secção com alturas 2,5 / 2 / 1, lábio 1,9, secção 3,15, fundo do canal 1,15),
face do Z0 à direita, material PEAD.

Regerar: `node "Programas avulsos/VEDADOR (9.7 X 16 X 5.5) 46499/gerar.js"` (o Simulador no navegador também roda o `item.js`).
