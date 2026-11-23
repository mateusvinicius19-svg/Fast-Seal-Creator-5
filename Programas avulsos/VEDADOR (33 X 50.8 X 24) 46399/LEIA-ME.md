# VEDADOR (33 X 50.8 X 24) — programa 46399, cód. interno 46245 (PEAD, bucha 31 x 62, 1 operação)

Cadastro ARGUS: item **46245** — pedido `DESENHOS\_PEDIDOS ARGUSĲ45_046399.json` (Anexo 1 = PDF, Código do programa = 046399), 23/11/2026.

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

**Programa (`046399`)**, ferramentas de PEAD (sem G41/G42, raio 0,4 compensado nas coordenadas). v2 (usuário 23/11/2026:
"essa parte faz com a T7D7, o bedame faz só o paralelo nas costas"):
T3D3 face → INSIDE T4D4 (passe Ø32,6 até o fim, rebaixo Ø47 x 4 em passes de 2 no raio, acabamento) → OUTSIDE T7D7: passes
retos Ø56 e Ø51,2; atrás do Ø50,8, passes de 2 no raio descendo pela rampa/cone; acabamento do chanfro da frente, Ø50,8, rampa
Ø50,8 → Ø48 com a inclinação do cone (≈ 29,7°, até Z −9,45), Ø48, cone até Ø40, chanfro de trás (segue 0,7 além do corte) →
OUTSIDE GROOVE T8D8 (bedame 1 mm, referência = lado da frente da lâmina): só a parede reta atrás do Ø50,8 — 3 mergulhos até
Ø48 (Z −8,65, −7,8 e −7, o último na parede) → CUTTING T8D8 em Z −24 (F0,100). Bedame aproxima/recua em X72 (bucha Ø62 + 10).
G92 Z40,55 (avanço 25,55 por peça).

v3 (usuário 23/11/2026: "deixa pelo menos 1 mm para tirar no acabamento e a parte de trás não precisa sair fora da peça"):
o desbaste (externo e interno) deixa 1 no Ø para o acabamento; o acabamento da T7D7 termina no fim do chanfro de trás e os
passes vão só até Z −24,78 (o raio da pastilha chega lá no fim do chanfro); o furo Ø33 até Z −24,5. Atrás disso a bucha fica
inteira, então o bedame corta desde o Ø64.

v4 (usuário 23/11/2026: "em Z no final precisa ter no mínimo a medida do bedame, que é de 1 mm"): passes do externo e o furo
vão até Z −25 (face de trás + 1 do bedame); o acabamento termina no fim do chanfro; o bedame volta a entrar em X42.

**Desenho**: padrão aprovado (Ø só no corte A-A, secção ampliada só com alturas, lábio da frente 1,9 e secção 8,9), face do
Z0 à direita, material PEAD.


v5 (usuário 23/11/2026: "essa descida coloca um ângulo de 45 graus, vai ficar menos material para o bedame"): a rampa da T7D7
do Ø50,8 para o Ø48 é a 45° (até Z −8,4); o bedame faz 2 mergulhos até o Ø48 (Z −7,6 e −7, o último na parede).
## Conferir antes de rodar
- A T7D7 desce a 45° na rampa do Ø48 e a ≈ 30° no cone: confirme que a pastilha tem folga nas costas para isso.
- Profundidade do bedame: corta de Ø50,8 até Ø32,9 (≈ 9 mm no raio).

Regerar: `node "Programas avulsos/VEDADOR (33 X 50.8 X 24) 46399/gerar.js"` (o Simulador no navegador também roda o `item.js`).
