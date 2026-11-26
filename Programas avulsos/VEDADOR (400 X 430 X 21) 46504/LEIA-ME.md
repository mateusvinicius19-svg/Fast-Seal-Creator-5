# VEDADOR (400 X 430 X 21) — programa 46504, cód. interno 46524 (PU, bucha 327 x 444, 1 operação)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\VEDADOR\VEDADOR (400 X 430 X 21) 44504\` — a pasta e o STL têm 44504; o
programa é 46504, como o usuário passou). Medidas do STL: Ø399 x Ø431 (colar) x 21. **Z0 = face com o colar mais perto (Z −5)**:
- externo: Ø402 na face, cone até Ø410 em Z −5, parede, colar Ø431 (chanfros 0,5) até Z −11, parede virada para trás até Ø416,8,
  cone até Ø402 em Z −21
- interno: Ø399 na face, cone até Ø405,4 em Z −8, reto até Z −11, cone até Ø399 em Z −21

| Arquivo | Onde foi gravado (26/11/2026) |
|---|---|
| `046504.PIT` | `Programas_CNC` (Fagor) |
| `46504.txt` | `Programas_CNC\MCS 500` |
| `VEDADOR (400 X 430 X 21) 46504.pdf` | `DESENHOS\VEDADOR\VEDADOR (400 X 430 X 21) 44504\` |

**Programa (`046504`)**: T3D3 face → OUTSIDE T2D2: desbaste em 6 camadas (máx. 8 no Ø; na frente até a parede do colar, atrás
entra por cima e desce na rampa de 45°), a última = pré-acabamento (+1 no Ø, sobe 0,5 antes da parede), acabamento até o chanfro
de trás do colar → OUTSIDE 2 T6D6: parede em Z −11 e cone de trás em 3 passes (como o PSR 212) → INSIDE T2D12: 9 passes retos,
pré-acabamento (−1 no Ø) e acabamento → CUTTING T5D5 em Z −21 (X441 = Ø431 + 10). Externo até Z −23 (T6D6 2 mm), interno até
Z −22. G92 Z38,15.

**Desenho**: padrão aprovado (Ø só no corte A-A; secção com alturas 10 / 6 / 5 e 10 / 3 / 8, faces 1,5, secção 16), face do Z0 à
direita, material PU.

Regerar: `node "Programas avulsos/VEDADOR (400 X 430 X 21) 46504/gerar.js"` (o Simulador no navegador também roda o `item.js`).
