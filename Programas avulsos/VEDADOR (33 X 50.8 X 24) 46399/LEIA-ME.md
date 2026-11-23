# VEDADOR (33 X 50.8 X 24) — programa 46399 (PEAD, bucha 31 x 62, 1 operação)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\VEDADOR\VEDADOR (33 X 50.8 X 24) 46399\`), **Z0 = face do Ø50,8**
(usuário 23/11/2026: frente = lado Ø50,8, uma operação só):
- externo: chanfro 1 x 45° (Ø48,8 → Ø50,8), Ø50,8 até Z −7, degrau reto até Ø48, Ø48 até Z −16, cone até Ø40 em Z −23
  (≈ 29,7° com o eixo), chanfro 1 x 45° até Ø38 em Z −24
- interno: rebaixo Ø47 x 4 na frente, Ø33 até o fim

| Arquivo | Onde foi gravado (23/11/2026) |
|---|---|
| `046399.PIT` | `Programas_CNC` (Fagor) |
| `46399.txt` | `Programas_CNC\MCS 500` |
| `VEDADOR (33 X 50.8 X 24) 46399.pdf` | `DESENHOS\VEDADOR\VEDADOR (33 X 50.8 X 24) 46399\` |

**Programa (`046399`)**, ferramentas de PEAD (sem G41/G42, raio 0,4 compensado nas coordenadas): T3D3 face → INSIDE T4D4
(passe Ø32,6 até o fim, rebaixo Ø47 x 4 em passes de 2 no raio, acabamento) → OUTSIDE T7D7 (desbaste Ø62 → Ø51,2, acabamento
chanfro + Ø50,8 até Z −25) → OUTSIDE GROOVE T8D8 (bedame 1 mm, referência = lado da frente da lâmina): mergulhos de 0,8 em Z
deixando 0,2 no raio, acabamento pelo canto da frente (parede Z −7, Ø48, cone, chanfro) emendando no **corte** em Z −24
(F0,100). Bedame aproxima/recua em X72 (bucha Ø62 + 10). G92 Z40,55 (avanço 25,55 por peça).

**Desenho**: padrão aprovado (Ø só no corte A-A, secção ampliada só com alturas, lábio da frente 1,9 e secção 8,9), face do
Z0 à direita, material PEAD.

## Conferir antes de rodar
- O cone e os chanfros de trás saem pelo canto da lâmina do bedame (sem compensar o raio do canto, como nos outros avulsos).
- Profundidade do bedame: corta de Ø50,8 até Ø32,9 (≈ 9 mm no raio).

Regerar: `node "Programas avulsos/VEDADOR (33 X 50.8 X 24) 46399/gerar.js"` (o Simulador no navegador também roda o `item.js`).
