# PSH 107 E (16 X 26 X 5.6) — programa 46356 (UHMW = PEAD, bucha 12 x 35)

Secção tirada do STL do Inventor (`W:\...\DESENHOS\PSH 107 E\PSH 107 E (16 X 26 X 5.6)\`), Z0 = face do canal:
- externo: chanfro 0,2 x 45° (Ø26,2 → Ø26,6), cônico Ø26,6 → Ø26 (3,3° com o eixo), chanfro de trás 0,25 x 45° (Ø25,5)
- canal frontal reto: Ø17,9 a Ø23,7 (abertura 2,9), profundidade 3,2
- interno: chanfro 0,2 x 45° (Ø16,1 → Ø15,7), cônico Ø15,7 → Ø16,2 (2,8° com o eixo), chanfro de trás 0,25 x 0,14 (Ø16,49)
- altura 5,6

| Arquivo | Onde foi gravado (18/11/2026, pelo servidor do Simulador) |
|---|---|
| `046356.PIT` | `Programas_CNC` (Fagor) |
| `46356.txt` | `Programas_CNC\MCS 500` |
| `PSH 107 E (16 X 26 X 5.6) 46356.pdf` | `DESENHOS\PSH 107 E\PSH 107 E (16 X 26 X 5.6) 46356\` |

**Programa (`046356`)**, no padrão do PSH 107 do Simulador: T3D3 face → FRONT GROOVE T1D86 (bedame 2,9, entra direto na
medida: X20,8 = centro do canal, Z −3,2, F0,05) → INSIDE T2D14 (usuário: "D14"; interno PEAD) → OUTSIDE T7D7 → CUTTING T8D8
(bedame 1 mm, Z −5,6, F0,100). PEAD: sem G41/G42, raio 0,4 compensado nas coordenadas (tipPath). G92 Z21,933 → MCS Z6,933.

**Desenho**: folha Parts Seals (A4 retrato) pelo "Desenho do 3D", **invertido** (face do canal à direita, igual ao Z0 do
programa — usuário: "o desenho sempre precisa ser igual o programa") e com a **cota da abertura do canal** (2,9) na face.
Revisão 24/11/2026 (usuário): tolerâncias do canal — abertura 2,9 0/−0,1 (2,8 a 2,9), Ø23,7 0/−0,1, Ø17,9 +0,1/0,
profundidade 3,2 0/−0,1; cotas da secção no estilo da imagem dele (Ø com linha de chamada horizontal + seta vertical, sem cota corrida).
O PDF do W: foi regravado pelo Simulador (servidor), mesmo código do `gerar_desenho.js`.

## Conferir antes de rodar
- T1D86: X no centro do canal (como as ferramentas de forma do PSH 107). Se o corretor for pela aresta da lâmina, o X muda 2,9 no Ø.

Regerar: `node "Programas avulsos/PSH 107 E (16 X 26 X 5.6) 46356/gerar_programa.js"` e `gerar_desenho.js`.
