# Histórico de versões — Fast Seal Creator 5

Regra: toda alteração sobe a versão em `VERSION`, ganha uma entrada aqui (data + o que mudou) e vai para o GitHub
(commit + tag `vX.Y.Z` + push). Versão = MAIOR.MENOR.CORREÇÃO
- CORREÇÃO (5.0.x): conserto de erro, ajuste de regra pequena.
- MENOR (5.x.0): recurso novo, perfil novo, rotina nova.
- MAIOR (x.0.0): mudança grande de formato/fluxo.

## 5.29.0 — Perfil novo PSE 125 (DPR): PSH 129 (DH) invertido para pistão
- Novo gerador **PSE 125 (DPR)** (pistão): igual ao PSH 129 (DH), espelhado — lábio de PTFE no **Ø externo** (encosta no
  cilindro) com degrau na face da frente por fora, flanco 100° e base 10° (mesmos campos A, B, C, D do DH; entrada = Ø externo
  do bico), O-ring ativador por DENTRO. Interno liso com chanfro nos 2 cantos a **30° com o eixo** (limite da T4D4 nas costas,
  mesmo critério do PSH 124).
- Programa no formato do DH (face, desbaste externo, externo do lábio com G42, interno com G41, bedame, RPT; material e bucha
  como no DH). Tolerâncias padrão: diâmetros +0,2/0 (com a regra de 2/3: +0,13/0), altura 0/−0,1, secção +0,1/−0,05.
- Desenho com as cotas do degrau, ângulos e nota própria; imagem do perfil (enviada pelo usuário) em Pistão: "PSE 125 (DPR)".

## 5.28.2 — Nomes nos quadros: PSH 124 (DHR), PSH 129 (DH), PSG 101 (GUIA)
- Na escolha pela imagem, esses três perfis aparecem com o nome pedido pelo usuário: **PSH 124 (DHR)**, **PSH 129 (DH)**
  (antes "DH PSH 129") e **PSG 101 (GUIA)**. Nome do programa, do arquivo e das pastas do W: sem mudança.

## 5.28.1 — PSH 124 (DHR): os dois chanfros internos a 30°
- Pedido do usuário: chanfro interno da FRENTE também a **30° com o eixo** (antes 45°), igual ao de trás. Os dois campos
  são o tamanho no raio; em Z ficam ÷ tg30 (ex.: 0,8 no raio → 1,39 em Z). Programa (T4D4), desenho e nota atualizados.

## 5.28.0 — Perfil novo PSH 124 (DHR): PSE 108 (DP) invertido
- Novo gerador **PSH 124 (DHR)** (veio): anel de PTFE para HASTE, igual ao PSE 108 (DP) só que invertido — os chanfros
  GRANDES ficam no INTERNO e o pequeno no EXTERNO (O-ring ativador por fora).
- Chanfro interno da frente: chF x 45°. Chanfro interno de TRÁS: mesmo tamanho no raio (chT), mas a **30° com o eixo**
  (a T4D4 faz no máximo 30° nas costas), por isso fica mais comprido em Z (chT ÷ tg30). Chanfro externo: chE em Z x 60°
  (como o interno do DP). Padrão 50 x 57,5 x 4, chanfros 0,8 / 0,8 / 0,2.
- Programa no mesmo formato do DP (T7D7 face + externo com G42, T4D4 interno com G41, T8D8 bedame, RPT).
- Tolerâncias padrão (campo vazio): diâmetros 0/−0,1 (com a regra de 2/3: 0/−0,07), altura 0/−0,1, secção +0,1/−0,05.
- Desenho (detalhe B com as chamadas dos chanfros e nota própria) e imagem do perfil em Veio. O bloco de alojamento do DP
  não foi copiado.

## 5.27.0 — Perfil novo PSH 125 (PSH 117 + O-ring do PSH 107)
- Novo gerador **PSH 125** (veio): perfil do PSH 117 (lábio interno recuado 0,12 × secção, folga do calcanhar interno
  0,134 × secção, lábio de estabilidade V atrás) com o canal do O-ring do PSH 107 (secção automática = a maior até
  0,57 × secção, ou campo "O-ring: secção"; centro no Ø médio ou pelo "O-ring: Ø interno").
- Programa: faceamento T3D3 igual ao 117 (face Z0, raio, rampa até o eixo do canal no Z do recuo) e ";( FRONT GROOVE )" com a
  ferramenta de perfil do O-ring. Cabeçalho `%PSH125`. Desenho com V, recuo e O-ring; imagem do perfil em Veio.

## 5.26.0 — Perfil novo PSH 121 (PSE 118 com as regras de PSH)
- Novo gerador **PSH 121** (veio): = PSH 107 (externo sem folga, folga do calcanhar interno pela tabela, O-ring no canal com
  a ferramenta de perfil), só o chanfro frontal 45° dos lábios = **1/4 do PSH 107** (espessura do lábio ÷ 12), como o PSE 118.
  Ex.: 100x120x12 → 0,26 x 45° (no 107: 1,03).
- Programa com cabeçalho `%PSH121`, desenho e imagem do perfil (enviada pelo usuário) em Veio na escolha pela imagem.

## 5.25.0 — Perfil novo PSE 118 (PSE 107 com chanfro dos lábios 1/4)
- Novo gerador **PSE 118** (pistão): tudo igual ao PSE 107 (O-ring no canal, folgas, ferramenta de perfil do canal), só o
  chanfro frontal 45° dos lábios = **1/4 do PSE 107** (espessura do lábio ÷ 12 em vez de ÷ 3). Ex.: 100x120x12 → 0,26 x 45°
  (no 107: 1,03). "ESPECIAL: chanfro frontal" continua valendo.
- Programa com cabeçalho `%PSE118`, desenho e imagem do perfil (enviada pelo usuário) em Pistão na escolha pela imagem.

## 5.24.0 — Perfil novo PSE 103 (PSE 105 + O-ring do 107)
- Novo gerador **PSE 103** (pistão): lábios, folga externa 0,7 e lábio EXTERNO recuado (0,12 × secção) iguais ao PSE 105;
  no canal, o O-ring do PSE/PSH 107 (secção automática = a maior até 0,57 × secção, ou campo "O-ring: secção"; centro no
  Ø médio ou pelo "O-ring: Ø interno"). É o espelho do PSH 103.
- Programa: faceamento T3D3 igual ao PSE 105 (face do lábio externo no Z do recuo, rampa até a borda do lábio interno, face Z0)
  e depois ";( FRONT GROOVE )" com a ferramenta de perfil do O-ring (só entra e volta). Cabeçalho `%PSE103`.
- Desenho com o O-ring e o recuo; imagem do perfil (enviada pelo usuário) em Pistão na escolha pela imagem.

## 5.23.4 — PSH 108: imagem 3D nova
- Imagem do PSH 108 na escolha pela imagem trocada pela imagem 3D enviada pelo usuário (canal raso de fundo reto).

## 5.23.3 — PSH 108: imagem sem o texto
- Imagem do PSH 108 na escolha pela imagem recortada sem o "PSH108" escrito (o código já aparece embaixo do quadro).

## 5.23.2 — Escolha pela imagem: só o código do perfil
- Nos quadros de "Escolher pela imagem" aparece só o código (PSH 108, PSE 107, DH PSH 129…), sem a descrição entre
  parênteses; o nome completo continua ao passar o mouse e no botão do perfil. Ciclos, Arruela ISO e PSE 108 (DP) sem mudança.

## 5.23.1 — PSH 108: canal com a abertura do 106, fundo reto e dois raios
- Canal do PSH 108 refeito (pedido do usuário): **mesma abertura na face do PSH 106**, 1/3 da profundidade, **fundo reto** e um
  raio no canto externo e outro no interno, de **0,5 a 1 mm** (0,4 × profundidade; campo "ESPECIAL: raio do canal" continua
  valendo). Flancos no mesmo ângulo do 106. Ex.: 100x120x12 → abertura 5,75, prof. 1,67, 2x R0,65.
- Programa: em cada nível, cada lado faz flanco + raio + fundo reto até o meio do canal (T3D3).
- Desenho: "2x R" no raio do canal e "canal fundo reto, 2x R…" nas notas. Imagem nova do PSH 108 na escolha do perfil.
- Demais perfis sem mudança (fundo reto só no PSH 108).

## 5.23.0 — Perfil novo PSH 108 (PSH 106 com canal raso)
- Novo gerador **PSH 108** (veio): tudo igual ao PSH 106 (externo sem folga, lábios, calcanhar, chanfros), só o canal com
  **1/3 da profundidade** do PSH 106 (secção ÷ 6 em vez de secção ÷ 2).
- O canal mantém o raio do fundo e o ângulo dos flancos do PSH 106 (ex.: 100x120x12 → prof. 1,67, R1,5, 40,1°); por isso a
  abertura na face fica menor e os lábios mais grossos. "ESPECIAL: profundidade do canal" continua valendo.
- Programa com cabeçalho `%PSH108`, desenho e imagem do perfil (enviada pelo usuário) na escolha pela imagem, em Veio.

## 5.22.1 — PSH 103: imagem nova na escolha do perfil
- Trocada a imagem do PSH 103 em "Escolher pela imagem" (Veio) pela imagem 3D enviada pelo usuário (lábio recuado com O-ring).

## 5.22.0 — Perfil novo PSH 103 (PSH 105 + O-ring do PSH 107)
- Novo gerador **PSH 103** (veio): lábios, folga do calcanhar interno (0,134 × secção) e lábio interno recuado
  (0,12 × secção) iguais ao PSH 105; no canal, o O-ring do PSH 107 (secção automática = a maior até 0,57 × secção,
  ou campo "O-ring: secção"; centro no Ø médio ou pelo "O-ring: Ø interno").
- Programa: faceamento T3D3 igual ao PSH 105 (face Z0, raio, rampa até o eixo do canal no Z do recuo) e depois
  ";( FRONT GROOVE )" com a ferramenta de perfil do O-ring (só entra e volta), igual ao PSH 107. Cabeçalho `%PSH103`.
- Desenho com o O-ring e as cotas do recuo; imagem do perfil (enviada pelo usuário) na escolha pela imagem, em Veio.

## 5.21.24 — Tolerâncias dos diâmetros reduzidas em 1/3 (todos os perfis)
- Tolerâncias automáticas dos DIÂMETROS × 2/3 (2 casas): PSA 108 / sem chanfro / PSG 101 (tabela ±0,1…0,5 → ±0,07…0,33),
  PSO 109 (Ø int.), DH PSH 129 (0/−0,2 → 0/−0,13), DP (+0,1 → +0,07), gaxetas e raspadores PSE/PSH/PSR 211 (lábios ±0,5 → ±0,33,
  calcanhar ±0,3 → ±0,2 etc., também nas notas).
- Não mudam: altura, secção, raio do canal e o que for digitado em "Tolerâncias do desenho".

## 5.21.23 — PSR 211: Ø do lábio também na parte de trás
- Vista DIÂMETROS: a cota do Ø do lábio (ex.: Ø198 ±0,8), que já aparecia na frente, agora também aparece do lado de trás,
  puxada da ponta do raspador (mesmo Ø e mesma tolerância).

## 5.21.22 — PSA 108: ângulo do chanfro interno de TRÁS
- Campo novo "Ângulo do chanfro interno de TRÁS (° com o eixo, vazio = 30)". O comprimento em Z continua o do chanfro interno.
- Programa: a volta do perfil interno (X+ Z−) usa o ângulo escolhido; com várias peças, um ajuste em X no meio do bedame
  volta para o chanfro da frente da peça seguinte (30°). Cabeçalho mostra "(TRAS X ang)".
- Desenho: perfil, chamada do chanfro de trás e nota com o ângulo novo. Aviso se passar de 30° (a T4D4 faz no máximo 30° nas costas).
- Vazio = programa idêntico ao anterior.

## 5.21.21 — Tolerância da secção no bloco "Tolerâncias do desenho"
- Nova linha **Secção** (sem / ± / + / − / + e −) junto de Ø interno, Ø externo e Altura, em todos os perfis com desenho
  (PSA 108, ciclos, ISO/DP, PSG 101, PSO 109, PSE/PSH, PSR 102/211, DH PSH 129).
- "sem" = continua a tolerância padrão do perfil (ex.: PSA ±0,1, PSG +0/−0,05, gaxetas pela tabela); escolhendo outra, ela vai para a cota da secção no desenho.

## 5.21.20 — VEDADOR (272 x 291 x 19): corte A-A refeito e material TEFLON + GR
- Corte A-A em escala real (sem a largura esticada), com a VISTA FRONTAL (anel Ø291/Ø272 e linha de corte A-A) ao lado.
- Material do carimbo: TEFLON + GR.

## 5.21.19 — Desenho custom VEDADOR (272 x 291 x 19)
- `Desenhos custom/VEDADOR (272 X 291 X 19)` (.js / .pdf / .png): programa 46219, cód. interno 46146, medidas do esboço do Inventor
  (rampa 45° de Ø289 a Ø272, fundo 1,5, degrau 9 até Ø277, canal 2,3 x 3 com boca 4 na face).

## 5.21.18 — T2D14 no interno abaixo de Ø14 (PTFE, PTFE+BR, POM, PEAD)
- Arruelas (PSA 108, ciclos com e sem chanfro, PSG 101) em PTFE puro, PTFE+BR, POM e Nylon/PEAD: a T4D4 faz no mínimo Ø14;
  com Ø interno menor que 14 o interno passa a ser a **T2D14**.
- Gaxetas/raspadores em PTFE / PTFE+BR: mesma regra (interno T2D14 abaixo de Ø14, se o campo de ferramenta estiver vazio).
- Catálogo de ferramentas: incluída a T2D14.

## 5.21.17 — 11/11/2026
- **Ciclo arruelas várias peças SEM CHANFRO** agora tem desenho (👁 Ver desenho / 📐 e PDF ao salvar), igual ao da PSA 108
  sem os chanfros (cantos vivos, sem chamadas de chanfro), com as mesmas tolerâncias da PSA 108 e nota "Sem chanfro · Ciclo N pç".
  Pasta/nome do PDF: PSA 108 (como as arruelas).

## 5.21.16 — 11/11/2026
- Bedame 2 (Celeron / secção > 14,8): o **acabamento** agora termina no **mesmo Z do desbaste** (fim da faixa do corte), sem
  degrau — o paralelo no fundo do chanfro passa a ser meio bedame + sobreposição (1,025 em vez de 0,6). Ex.: PSG 101 35x40x5,6
  Celeron: desbaste e acabamento até Z−7,6; peça seguinte começa em Z−7,7. Conferido na simulação: nada passa para a peça seguinte.

## 5.21.15 — 11/11/2026
- Bedame 2 (Celeron / secção > 14,8): desbaste em Z **um pouco mais fundo** — vai até o **fim da faixa do corte** (último corte
  + 2 mm do bedame = N × B6 + sobreposição), 0,1 mm antes da peça seguinte. Ex.: PSG 101 35x40x5,6 Celeron, 1 peça:
  desbaste até Z−7,6 (era −7,175); acabamento continua em Z−7,175; peça seguinte começa em Z−7,7. Conferido na simulação de
  todos os movimentos: nada passa para a peça seguinte. Bedame 1: sem mudança.

## 5.21.14 — 11/11/2026
- Corrige de vez (5.21.11 / 5.21.13): com bedame 2 (Celeron ou secção > 14,8) **uma peça entrava na outra** e o X saía
  "invertido" (degrau subindo para o Ø da peça depois do chanfro). O trecho a mais do acabamento foi **retirado**: o acabamento
  volta a ser como sempre (paralelo no fundo do chanfro) e é o **desbaste que para no mesmo Z do acabamento**,
  −(N × B6 + paralelo − meio bedame), dentro da faixa do corte. Ex.: PSG 101 35x40x5,6 Celeron, 1 peça: desbaste e acabamento
  até Z−7,175; a peça seguinte começa em Z−7,7 (avanço do G92).
- Conferido com simulação de todos os movimentos (Celeron 1 e 3 peças, com e sem bucha; POM 50x90; Nylon 60x92): nenhuma
  ferramenta de externo/interno passa do início da peça seguinte. Bedame 1 (outros materiais, secção ≤ 14,8): sem mudança.

## 5.21.13 — 11/11/2026
- Corrige (5.21.11): no Celeron com RPT/várias peças **uma peça entrava na outra** — o trecho a mais do acabamento (até o fim do
  desbaste) era feito no diâmetro do fundo do chanfro e passava ~0,45 mm para dentro da peça seguinte. Agora o acabamento sai
  do chanfro para o **Ø da peça** e só então desce até o fim do desbaste (`;(ATE O FIM DO DESBASTE, NO DIAMETRO DA PECA)`),
  no externo e no interno. Conferido na trajetória: nada abaixo do Ø da peça dentro da peça seguinte.
- As regras do bedame 2 valem também para **secção > 14,8** (PSA 108 / PSG 101 / ciclo, qualquer material): campo do bedame
  mostra 2 (travado) e acabamento até o fim do desbaste pelo Ø da peça (G92 +1 e T6D16 já eram assim).

## 5.21.12 — 11/11/2026
- Celeron: o campo **"Espessura do bedame"** passa a mostrar **2** (travado) quando o material é Celeron — também com várias
  peças por ciclo (intervalo entre os cortes = altura + 2 − sobreposição, G92 +1). Ao trocar para outro material o campo volta
  ao valor de antes (1).

## 5.21.11 — 11/11/2026
- **Celeron** (PSA 108, PSG 101, Programa Arruela/ciclo): corta sempre com a T6D16, então agora entra a mesma regra da
  secção > 14,8 — **bedame 2** nas peças (intervalo entre peças e comprimento do desbaste já contam os 2 mm) e **G92 +1 mm**.
  O "+1 em Z" da 5.21.3 deixa de ser somado à parte (já está no bedame 2).
- PSA 108 / PSG 101 em Celeron: o **acabamento** (externo e interno) desce até o **mesmo Z do desbaste** (paralelo final
  + meio bedame). Ex.: PSG 101 35x40x5,6, 1 peça: desbaste e acabamento até Z−8,15. Outros materiais: sem mudança.

## 5.21.10 — 11/11/2026
- Nome do programa salvo (Programas_CNC e MCS 500) com várias peças por ciclo: o **CICLO N PÇ** vai logo depois do número —
  `045000 CICLO 5 PÇ.PIT` / `45000 CICLO 5 PÇ.txt`; com bucha especial `045001 CICLO 5 PÇ 9X30.PIT` (antes `045001 9X30 CICLO 5 PÇ`).
  Vale agora também para o **Programa Arruela/ciclo** (antes só PSA 108 / PSG 101). Desenho e pedido ARGUS continuam só com o número.

## 5.21.9 — 11/11/2026
- Corrige: **desenho saindo sem MATERIAL**. O carimbo só preenchia sozinho nos PSE/PSH/PSR; nas arruelas (PSA 108, ciclo),
  guias (PSG 101) e DH PSH 129 ficava vazio quando o campo Material do cabeçalho não era digitado. Agora vale, nesta ordem:
  o que for digitado no cabeçalho > o material escolhido no perfil (ex.: POM, PTFE+BR, Celeron, NBR / borracha) > a linha
  `;MATERIAL` do programa. PSO 109 e Arruela ISO não têm material no perfil: continuam pelo campo do cabeçalho.

## 5.21.8 — 11/11/2026
- Tela Gerar programa: tirado (a pedido) o botão **📁 MCS 500** (só escondido; a pasta continua fixa pelo servidor e o
  Salvar Fagor + MCS 500 grava como antes).

## 5.21.7 — 11/11/2026
- Tela Gerar programa: tirado (a pedido) o botão **⧉ Copiar** (só escondido; o código continua).

## 5.21.6 — 11/11/2026
- **Programas salvos** (histórico) não aparece mais embaixo da tela ao abrir: só aparece e só carrega quando clica em
  **📋 Histórico**. Clicar de novo (ou em **Fechar**) esconde. O Simulador abre mais rápido (não lê o CSV da rede na abertura).
  Salvar continua gravando no histórico normalmente.

## 5.21.5 — 11/11/2026
- Tela Gerar programa: tirados (a pedido) os botões **⧉ Copiar MCS**, **📁 Programas_CNC** e o do **cadeado** (🔓 PROJETOS /
  🔒 FIXO (servidor)). As pastas continuam fixas pelo servidor; Salvar Fagor + MCS 500 grava como antes.

## 5.21.4 — 11/11/2026
- Novo botão **👁 Ver desenho** (ao lado de "Salvar Fagor + MCS 500"): abre a visualização do desenho da peça atual **antes de
  salvar**, sem pedir o Cód. interno e sem gravar nada. Aparece nos perfis que têm desenho (como o botão 📐 Desenho).

## 5.21.3 — 11/11/2026
- Arruelas e guias em **Celeron** (PSG 101, PSA 108 e Programa Arruela/ciclo): o desbaste externo e interno vai **1 mm mais
  fundo em Z**, porque o corte é com a T6D16 (bedame 2 mm). Ex.: PSG 101 50x55x9,7, 1 peça: Z−11,25 → Z−12,25. O comentário do
  desbaste ganha `+1 EM Z: CORTE COM D16 2MM`. Se a peça já usa bedame 2 (secção > 14,8), não soma de novo. Outros materiais: igual.

## 5.21.2 — 11/11/2026
- PSG 101 (guia) em **Celeron**: chanfro externo a **30°** (como o interno: medida em Z, 30° com o eixo; no X entra
  2 × Z × tg 30°). Programa (`;... CHANFRO EXT 0.970 X 30 ...`), perfil e cotas do desenho seguem o ângulo. Outros materiais e
  os outros perfis continuam com 45° (programas e desenhos conferidos iguais aos de antes).

## 5.21.1 — 11/11/2026
- PSG 101 (guia) — regras do corte (usuário):
  - o corte é feito **depois, no acabamento**, em ângulo: campo novo **"Ângulo do corte da guia (°)"** (30 · 45 · 60, padrão 45);
  - serra de **1,8 mm**: por isso POM e Celeron saem **+0,9 nos Ø**. Os outros materiais também são cortados, mas **sem perda**
    (medida nominal);
  - programa: `;PSG 101 (GUIA) - CORTE NO ACABAMENTO A 45 GRAUS - SERRA 1.8 (POR ISSO +0.9 NOS DIAMETROS)` ou `... - SEM PERDA`;
  - desenho: a abertura aparece na vista frontal e há a vista nova **"CORTE DA GUIA (vista de fora)"**, com o ângulo;
  - tolerância da **secção +0 / −0,05** no desenho do PSG 101.

## 5.21.0 — 11/11/2026
- Novo perfil **PSG 101 (guia)**, no grupo "Guias" da escolha por imagem (imagem do catálogo enviada pelo usuário). É uma cópia
  do PSA 108 (mesmo programa, chanfros, tolerâncias, bucha, desbaste, D16 acima de 14,8), com regras próprias:
  - padrão mais alto (50 x 55 x **9,7**) e material padrão POM;
  - **POM e Celeron: usinado 0,9 mm maior nos dois diâmetros** (param. `psgAcr`); o desenho e o nome do arquivo ficam
    com a medida nominal, e o programa traz a linha `;POM: USINADO 0.90 MAIOR NOS DIAMETROS (...)`;
  - linha `;PSG 101 (GUIA) - DEPOIS DE USINADA: CORTE DA GUIA (PARAMETROS DO CORTE A DEFINIR)` — o corte será definido depois;
  - arquivos: `PSG 101 <dint>x<dext>x<h>`, desenhos em `DESENHOS\PSG 101\`.

## 5.20.3 — 11/11/2026
- Novo: **`RODAR FILA DE PROGRAMAS.md`** — guia para o operador do Kuru Nuvem ligar a fila `_PEDIDOS ARGUS` (Anexo 1 + Código do
  programa no ARGUS) com segurança: módulo isolado e testado `Kuru - fila ARGUS/filaPedidosArgus.js` (só `fs`/`path`, modo
  simular, liga/desliga, uma estação, lock, conflito sem sobrescrever, nada apagado) + `teste-fila.js` (tem que dar TESTE OK).
## 5.20.2 — 11/11/2026
- Corrige: **PSA 108 com desbaste duplicado** em peça curta (ex.: 1 peça 50x60x2,9, bucha 30x70: comprimento 4,45 mm saía em
  2 etapas de 2,225, repetindo o mesmo passe). Agora até **10 mm** de comprimento (param. `zMin`) o desbaste em Z vai de uma vez;
  acima disso continua em etapas de até 20 mm, pelo menos 2.
- Corrige: depois de salvar, a mensagem "NÃO salvo" do PDF voltou a ficar vermelha (5.20.1 tinha desligado sem querer).
## 5.20.1 — 11/11/2026
- Corrige: **desenho parou de abrir para imprimir** depois de salvar (5.20.0) — a volta das tolerâncias ao padrão trocava os dados
  da peça do desenho por uma versão sem o tipo do perfil. Agora as tolerâncias voltam ao padrão quando o usuário começa a peça
  seguinte (mexe numa medida depois de salvar); a impressão da peça salva continua com as tolerâncias dela.
- Mexer numa tolerância com a prévia aberta regera na hora (antes o desenho ficava 250 ms sem o tipo da peça).
## 5.20.0 — 11/11/2026
- **Teflon (PTFE puro e PTFE+BR) em todos os perfis**: ao escolher o material, a bucha sugerida já vem com **2 mm de sobremetal**
  no interno e no externo, a partir dos Ø extremos da peça (lábios com aperto): Ø int − 2 × Ø ext + 2. Ex.: PSE 106 100x120 PTFE
  → 96,5 x 123,5 (PU continua pela tabela). Vale para PSE/PSH 105/106/107/117, PSR 102, PSR 211, DH e PSO (arruelas já eram assim).
  Bucha digitada igual à sugerida não vira exceção (sem sufixo).
- **Tolerâncias do desenho voltam ao padrão em todo item novo**: ao trocar de perfil, depois de salvar um programa e ao abrir o
  Simulador (não são mais lembradas de um item para o outro).
## 5.19.1 — 11/11/2026
- Desenho: fotos das ferramentas no carimbo **cerca de 2× maiores** (usuário: "muito pequeno") — com ferramentas, o nome e a
  linha de medidas sobem no quadro DESCRIÇÃO e as fotos ocupam o resto da altura.
## 5.19.0 — 11/11/2026
- Desenho: no carimbo (quadro DESCRIÇÃO) as ferramentas do programa saem com a **FOTO** da 🧰 biblioteca, o código e o nome,
  na ordem em que entram (ex. PSH 107 NBR: T3D3 · T2D72 · T4D4 · T7D7 · T5D5). Sem foto: quadro vazio com o código.
  Fotos coladas pelo usuário (📷, salvas no W:) também entram. As imagens vão no desenho como PNG (o PDF aceita).
## 5.18.8 — 11/11/2026
- Biblioteca: **T6D6** com a foto real da lâmina **H1000** de 2 mm (do usuário; antes a ficha dizia H1001).
## 5.18.7 — 11/11/2026
- Biblioteca: **T6D16** com a foto real do bedame H1002 (2,0 mm) e **T8D8** com a mesma foto trocando a medida para **1,0 mm**
  (a T8D8 é igual, só que de 1 mm — usuário).
## 5.18.6 — 11/11/2026
- Biblioteca: **T5D5** com a foto real da faca H1111 (do usuário).
## 5.18.5 — 11/11/2026
- Biblioteca: **T2D12** com a foto própria (H100, pastilha do lado de cima), mandada pelo usuário.
## 5.18.4 — 11/11/2026
- Biblioteca: **T2D2 e T2D12** com a foto real do suporte H100 (do usuário), com o corretor (D2 · lado de dentro / D12 · lado de cima).
## 5.18.3 — 11/11/2026
- Biblioteca: **fotos de verdade** do usuário (vista de cima) onde a foto chegou como arquivo: T1D1 (H200 + VCGT 110304),
  T4D4 e T1D45 (mesmo suporte H200; pastilha DCGT 070204) e T4D14 (as 2 barras R0.3 · 4.9 / R0.2 · 3.5), com o corretor.
- Tirados os redesenhos que não batiam com as fotos (T2D2, T2D12, T5D5, T8D8, T6D16, T6D6): ficam "foto pendente" até o usuário
  colar a foto (📷 / Ctrl+V) ou mandar de novo. T3D3 e perfis do anel continuam.
## 5.18.2 — 11/11/2026
- Biblioteca: as ferramentas que tinham ficado sem desenho ganharam o **redesenho da foto que o usuário mandou**, com o corretor:
  T2D2 / T2D12 (suporte H100, lado de dentro / de cima), T1D1 (H200 + VCGT 110304), T4D4 e T1D45 (H200 + DCGT 070204),
  T4D14 (2 barras R0.3 · 4.9 / R0.2 · 3.5), T5D5 (faca H1111), T8D8 (H1002 1 mm), T6D16 (H1002 2 mm), T6D6 (H1001 2 mm).
  Foto colada pelo usuário (📷) continua tendo prioridade sobre o desenho.
## 5.18.1 — 11/11/2026
- Biblioteca: perfis do anel com o **mesmo desenho da imagem do usuário** (cabeça em meio círculo maior que o corpo), só com o
  corretor e a medida em cada um (D42 · 1,78 / D52 · 2,62 / D62 · 3,53 / D72 · 5,33 / D82 · 6,99).
## 5.18.0 — 11/11/2026
- Biblioteca: **fotos reais pelo próprio Simulador** — clicar no quadro da foto e colar (Ctrl+V) ou usar 📷 Foto para escolher o
  arquivo. Ficam em `W:\Parts\PartsSeals\PROJETOS\FERRAMENTAS SIMULADOR\<código>.png` (aparecem em todos os PCs); sem acesso à
  pasta PROJETOS (abriu pelo arquivo sem liberar a pasta), ficam só naquele PC.
- Tirados os desenhos de pastilha que estavam errados (usuário: só o da T3D3 estava certo — ficou).
- Perfis do anel (T4D42/52/62/72/82, T2 em NBR/Viton): desenho da ferramenta **inteira na medida do anel** — corpo reto com a
  largura do O-ring (1,78 / 2,62 / 3,53 / 5,33 / 6,99) e ponta em meio círculo (R = metade).
## 5.17.0 — 11/11/2026
- Corte (usuário): **secção da peça > 14,8 → corta com a T6D16 (bedame H1002 de 2 mm) no lugar da T8D8** (1 mm), em todos os
  geradores que usam a T8D8 (PSA 108, ciclos de arruela, ISO, DH, gaxetas/raspadores em PTFE). Como a lâmina é 1 mm mais grossa:
  o **G92 sobe 1 mm** e, nas arruelas, o bedame vira 2 (intervalo entre as peças acompanha). Comentário da ferramenta: NOSEW 2.
  Mensagem ao gerar avisa a troca. (Antes só avisava "ATENÇÃO".)
- Biblioteca: **T6D6** (canal martelo 65° do PSR 211) = lâmina **H1001 de 2 mm**.
## 5.16.5 — 11/11/2026
- Biblioteca: **T8D8** = bedame **H1002 de 1 mm** de espessura (antes a ficha dizia 2 mm).
- Biblioteca: **T6D16** (corte do Celeron) = bedame **H1002 de 2 mm**.
- T8D8 corta secção de peça de no **máximo 14,8 mm**: ao gerar um programa com T8D8 e secção maior, o Simulador mostra ATENÇÃO.
## 5.16.4 — 11/11/2026
- Biblioteca (usuário): **T1D45 = igual à T4D4** (pastilha DCGT 070204, rômbica 55°, R0,4, máx. 30° nas costas).
  A foto do suporte H200 com VCGT 110304 é da **T1D1** (nova na biblioteca; os geradores ainda não usam).
- **T5D5** = lâmina de corte tipo faca **H1111**.
## 5.16.3 — 11/11/2026
- Biblioteca: **T4D14** (interno pequeno, Ø int < 11) com as duas opções de barra das fotos: R0,3 · 4,9 e R0,2 · 3,5.
## 5.16.2 — 11/11/2026
- Biblioteca (fotos do usuário): **T1D45** = suporte H200 com pastilha **VCGT 110304** (rômbica 35°, R0,4);
  **T4D4** = suporte igual, pastilha **DCGT 070204** (rômbica 55°, R0,4) — faz no máximo **30° nas costas**.
  Ficha mostra o código da pastilha; a busca também acha pela pastilha (ex.: "VCGT").
## 5.16.1 — 11/11/2026
- Biblioteca: **T2D2 e T2D12 = o mesmo suporte H100** na posição T2 — lado de DENTRO = D2 (externo), lado de CIMA = D12 (interno);
  pastilha rômbica 35° (tipo V) com raio de ponta 0,4 (foto do usuário). Busca da biblioteca agora também procura nas observações (ex.: "H100").
## 5.16.0 — 11/11/2026
- Desenho: o carimbo (quadro DESCRIÇÃO) mostra as **FERRAMENTAS** que o programa da peça usa, na ordem em que entram,
  com o nome da 🧰 biblioteca (ex.: "T3D3 Faceamento · T4D72 Perfil do anel O-ring 5,33 · T2D12 Interno grande · T2D2 Externo PU ·
  T5D5 Corte"). Sai também no PDF salvo. Desenho custom: lista em `customTools` (vazio = não mostra).
- Biblioteca: T8D8 = "Bedame" (arruelas de todos os materiais menos Celeron + gaxetas em PTFE).
- Biblioteca: T3D3 = pastilha rômbica 35° (tipo V) com **raio de ponta 0,4** (usuário); desenho da pastilha no lugar da foto até a foto chegar.
## 5.15.0 — 11/11/2026
- Simulador: **🧰 Biblioteca de ferramentas** (botão ao lado do Histórico). 21 ferramentas que já usamos, pelo corretor (T = posição,
  D = corretor): T3D3, T2D2, T7D7, T7D17, T4D4, T4D14, T1D45, T2D12, T1D51, T1D11, T5D5, T8D8, T6D6, T2D54, T2D64, T6D16 e os
  perfis do anel T4D42/52/62/72/82 (T2Dx2 em NBR/Viton). Cada uma com uso, materiais, Ø mínimo e as regras dos programas; busca e
  filtro por tipo. Na legenda do simulador, clicar na ferramenta abre a ficha dela.
- Fotos: espaço reservado ("foto pendente"); as fotos vão embutidas em `FERR_FOTO` quando o usuário mandar.
## 5.14.2 — 11/11/2026
- Desenho custom **PSE 124 E (15.9 X 25.5 X 3.25)** (`Desenhos custom/`): secção em U com fundo R1,85, lábios Ø16 / Ø25,
  canal 2,3 (Ø23, fundo 2,1, abertura (2,5) até Ø(18)), conforme o DESENHO COTADO.png do Inventor; corte A-A + secção ampliada.
## 5.14.1 — 11/11/2026
- `Abrir Simulador.bat`: corrige "O processo não pode acessar o arquivo ...\FastSealCreator\app porque ele está sendo usado"
  — o servidor ligado rodava de dentro da pasta `app` e o .bat tentava desligá-lo por um endereço que não existe (`/api/quit`).
  Agora cada versão vai para `app-<commit>`; o servidor novo é ligado e só depois as pastas antigas são apagadas
  (se ainda estiverem em uso, ficam para a próxima vez). O servidor não roda mais de dentro da pasta da versão.
- O `.bat` agora só baixa e roda `Iniciar\atualizar.ps1` da main: as próximas correções chegam **sem trocar o .bat**.
## 5.14.0 — 11/11/2026
- Material **VITON (FKM)** novo nas gaxetas/raspadores e nas arruelas, com o mesmo padrão do NBR (externo T7D7, interno T4D4,
  face/corte como no PU, bucha digitada). Linha `;MATERIAL: USER DEFINED VITON ...`. Rotina (`gerar.ps1`) reconhece VITON/FKM.
- PSE 107 / PSH 107 em **NBR e VITON**: a ferramenta do anel (canal do O-ring, FRONT GROOVE) vai na posição **T2**
  (T4D42 → T2D42, T4D52 → T2D52, … T4D82 → T2D82). PU e PTFE continuam em T4.
## 5.13.1 — 11/11/2026
- `Abrir Simulador.bat`: corrige "Não existe um objeto no caminho especificado C:\Users\JSLSBO~1" — a pasta TEMP vem com o nome
  curto (usuário com espaço) e o Expand-Archive não aceita. Agora baixa e descompacta em `%LOCALAPPDATA%\FastSealCreator`
  com o ZipFile do .NET. Baixa **só a `main`** (antes: a branch com o maior VERSION).
- `CLAUDE.md`: regra de sempre levar tudo para a `main` (PR + merge) e subir a versão a partir da main.
## 5.13.0 — 11/11/2026
Junta as branches paralelas (5.12.0 servidor/celular, 5.7.x Cód. interno/cancelar/PLUG) com esta.
- **`Iniciar\Abrir Simulador.bat`** (fica na Área de Trabalho): pega no GitHub a versão mais nova (a branch com o maior `VERSION`;
  só baixa se mudou) em `%LOCALAPPDATA%\FastSealCreator\app`, copia o `Simulador CNC.html` para
  `W:\...\PADRONIZAÇÃO\Arruela Padronizada` (só se mudou), religa o `Servidor Simulador.ps1` desta versão (mantém o `-Rede`
  do celular se estava ligado) e abre `http://localhost:8765` — pastas fixas, não pede pasta.
  Rede da empresa: usa o proxy do Windows com o login do usuário, tenta também o `curl.exe` do Windows e lê a lista de branches
  pelo github.com (sem a API). Mostra o motivo de cada falha e grava em `%LOCALAPPDATA%\FastSealCreator\log.txt`.
  Sem GitHub e sem nada baixado: abre a cópia do W:.
- Servidor: `/fs/read` manda a data do arquivo (X-Mtime); o Simulador usa como `lastModified`.
- ✏️ Alterar programa: acha o programa que só existe com a bucha no nome (`046158 194X222.PIT`); várias variantes → sem CICLO,
  a mais nova. Quando não acha, diz por quê (pasta, variantes, só .txt no MCS 500). Aceita `.pit` minúsculo.
- Desenhos custom: `Desenhos custom/PSO 11 E R (153.5 X 180 X 11.25)` (corpo + anel GR06) e `render.js` (gera PDF/PNG).
## 5.12.0 — 10/11/2026
- **Celular**: `Servidor Simulador.ps1 -Instalar -Rede` (PowerShell como administrador) abre o servidor para o Wi-Fi da empresa
  (reserva da porta 8765 + regra no Firewall, perfis Domínio/Privado) e cria na área de trabalho `Simulador no celular.txt` com o link
  `http://<IP do PC>:8765/entrar?k=<senha>`. Abrindo esse link uma vez, o celular fica com a senha (cookie de 1 ano) e usa o Simulador
  inteiro: gerar, simular e **salvar no W:** (Programas_CNC, MCS 500, DESENHOS, pedido ARGUS). Sem a senha: recusa. Senha em
  `%APPDATA%\SimuladorCNC\senha.txt`. Só funciona dentro da empresa, com o PC ligado. `-Desinstalar` também tira a porta e o Firewall.
- Simulador na tela do celular: cabeçalho e barras quebram linha, nada passa da largura da tela (antes cortava à direita).
- Não testado no Windows (sem PowerShell aqui): o modo -Rede, a senha e o Firewall.
## 5.11.0 — 10/11/2026
- **Pastas fixas** (`Servidor Simulador.ps1`, novo): servidor local em PowerShell que liga junto com o Windows (`-Instalar`). O Simulador
  aberto por **http://localhost:8765** (atalho "Simulador CNC (fixo)" na área de trabalho) grava direto em `W:\Parts\PartsSeals\PROJETOS`
  (Programas_CNC, MCS 500, DESENHOS, _PEDIDOS ARGUS, histórico), sem escolher pasta e sem pedir permissão. Segurança: só localhost,
  só dentro de PROJETOS, não apaga, recusa pedido de outro site (Sec-Fetch-Site) e Host diferente de localhost.
- Simulador: aberto pelo servidor, o botão vira "🔒 FIXO (servidor)". Aberto pelo arquivo com o servidor ligado, aparece "🔒 Abrir FIXO",
  que abre pelo servidor levando as buchas e os ajustes guardados no navegador (ps_*).
- Pelo servidor, o "próximo número livre" confere a pasta toda (também `046140 CICLO 5 PÇ`, `037512 53X91`), não só `NNNNNN.PIT`.
- Testado com servidor de teste em Python (mesma API). O `Servidor Simulador.ps1` não foi testado no Windows (sem PowerShell aqui).
## 5.10.0 — 10/11/2026
- Simulador: botão **🔓 PROJETOS** = pasta única `W:\Parts\PartsSeals\PROJETOS`. Escolhe uma vez; o Programas_CNC, o MCS 500 e o DESENHOS
  saem dela. Nos outros dias o navegador só pede **Permitir** (1 clique, no 🔓 PROJETOS ou no Salvar), sem escolher pasta. Antes eram
  3 pastas separadas, e no Salvar só a 1ª era liberada (o navegador dá uma permissão por clique), então o DESENHOS tinha que ser escolhido de novo.
  O botão fica com contorno laranja quando falta liberar. Os botões 📁 de cada pasta continuam para quem não usar a pasta única.
## 5.9.4 — 10/11/2026
- Arruelas em Teflon (PTFE puro e PTFE+BR): bucha **automática** com 2 mm de sobremetal nos 2 diâmetros (Ø int − 2 × Ø ext + 2;
  ex.: 20x28 → 18X30), em vez de "----". Bucha digitada igual à sugerida não vira exceção no nome; diferente → "NNNNNN BIxBO".
- PSA 108: custo "por peça" e "Peças/ciclo" do histórico agora usam as peças por ciclo (antes contava 1 e mostrava o custo do ciclo).
## 5.9.3 — 10/11/2026
- Arruelas em Teflon saindo de **TARUGO**: desbaste interno com o 1º passe em **Ø16** e depois passes de no máximo **8 no Ø**
  até Ø int − 2 (acabamento 2). Ex.: 30x38 → Ø16, 22, 28; 50x58 → Ø16, 24, 32, 40, 48. Ø int pequeno (Ø int − 2 < 16): 1º passe em Ø int − 2.
  Só Teflon (PTFE puro e PTFE+BR); PU e os outros continuam como antes (tarugo começa em Ø7).
## 5.9.2 — 10/11/2026
- Arruelas em Teflon: o passe único (externo e interno) vale só para peça que sai de **BUCHA** (tubo). Saindo de **TARUGO**
  (Ø int. 0), desbasta normal (máx. 8 no Ø, acabamento 2), com o limite de 40 mm e as etapas em Z de até 20 mm, e sem o aviso do passe único.
## 5.9.1 — 10/11/2026
- PSA 108 em **PU**: sem a regra da v5.8.0 (limite de 40 mm e desbaste em Z em etapas). PU volta a sair igual a antes
  (conferido: mesmas linhas da v5.7.0), com a bucha automática da tabela. A regra fica para NBR, POM, Nylon, Celeron e Teflon
  (no Teflon só o limite de 40 mm, porque ele não tem desbaste). O nome "NNNNNN CICLO N PÇ" continua para todos.
## 5.9.0 — 10/11/2026
- Arruelas (PSA 108, ciclo e ciclo sem chanfro) em **Teflon** (PTFE puro e PTFE+BR): externo e interno num **passe só** (o de
  acabamento), sem passes de desbaste nem etapas em Z, porque a bucha de Teflon fica bem próxima da medida nos diâmetros.
  ATENÇÃO se a bucha digitada deixar 5 mm ou mais no Ø (externo ou interno). PU, NBR e os outros materiais não mudam.
## 5.8.0 — 10/11/2026
- PSA 108 (Simulador): desbaste em Z com limite de **40 mm** de comprimento (param. `zMax`): as peças por ciclo ficam limitadas a
  (40 − paralelo) ÷ (altura + bedame − sobreposição), com ATENÇÃO quando passar. O desbaste nunca vai de uma vez: é dividido em
  etapas de até **20 mm** (param. `zSeg`), **sempre pelo menos 2**. Cada etapa passa todos os Ø, de fora para dentro, antes de descer.
  Os outros ciclos de arruela (ciclo/semch) não mudam.
- PSA 108 com várias peças por ciclo: o arquivo leva a quantidade no número, `046140 CICLO 5 PÇ.PIT` / `46140 CICLO 5 PÇ.txt`
  (Simulador ao salvar e Rotina\gerar.ps1). Com 1 peça, o nome continua só o número.
- Exemplo testado: 50 x 58 x 2, 1 pç com RPT N11 (12 peças, 3,1 mm por peça) e 6 pç por ciclo com RPT N1 (12 peças, 17,85 mm por ciclo).
## 5.7.0 — 10/11/2026
- Rotina\gerar.ps1: desenho gerado pela rotina agora também grava o pedido do ARGUS (Anexo 1 = PDF + Código do programa) em
  `DESENHOS\_PEDIDOS ARGUS\<item>_<programa>.json`, igual ao Simulador. Antes só o Simulador na tela gravava, e as OPs da rotina
  (ex.: 31205/2) ficavam fora da fila. Vale também quando o PDF já existia. Item vazio ou com letra: anota na obs.
- Rotina\pedidos_argus.ps1: `-Item <cod> -Programa <num> [-Pdf <caminho>]` cria o pedido de um desenho já salvo; sem `-Pdf`, acha
  o PDF em `DESENHOS\<PERFIL>\<... NNNNN>\` pelo número do programa.
### Branch paralela (números repetidos, já incluída na 5.13.0)
#### 5.7.2 — 10/11/2026
- Rotina\cancelar.ps1 (novo): cancela programa duplicado — MOVE (não apaga) .PIT/variantes, .txt do MCS 500, pasta do desenho
  e pedido ARGUS para `Rotina\backup\cancelados\<num>`, anota em `Rotina\Programas cancelados.csv`. Confere que o original existe
  e pede S para confirmar. Uso: `cancelar.ps1 -Num 046166 -Dup 046125` (046166 feito em duplicado do 046125).
#### 5.7.1 — 10/11/2026
- Prévia de impressão: o botão **Imprimir / PDF** (e o Ctrl+P com a prévia aberta) pergunta o **Cód. interno** ANTES da
  janela de impressão, já preenchido com o código da peça (Enter confirma, Cancelar não imprime). Não precisa mais fechar
  a prévia para editar. Se o código mudou depois de salvar, regrava o PDF em DESENHOS e o pedido ARGUS com o código novo.
- Correção: o pedido ARGUS da impressão só usa o último desenho salvo se for da MESMA peça.
#### 5.7.0 — 10/11/2026
- Simulador (desenho): pergunta o **Cód. interno (item)** ANTES de mostrar o desenho — no botão do desenho e no
  Salvar programa (depois do número, antes de gravar o PDF/pedido ARGUS). Uma vez por peça (`askCod`, chave `pieceFile`):
  peça nova começa em branco (não reaproveita o código do item anterior); Cancelar não abre o desenho / não salva.
#### 5.6.3 — 10/11/2026
- Desenho avulso: `Desenhos avulsos/PLUG (18 X 53.3)/` — PLUG Ø18 x 53,3 (colar Ø18 x 2, canal Ø11 x 2,5, corpo Ø12,
  chanfro 1 x 45°, furo Ø4,1 x 5,5 ponta 118°) na folha Parts Seals (drawingSVG modo "custom"); PDF/SVG/PNG + `gerar_desenho.js`.
  Chanfros 0,5 x 45° e quebra 0,2 estimados da imagem (não cotados). Material/programa/cód. interno em branco.
## 5.6.2 — 10/11/2026
- ESPEC Kuru: a tela "Pedidos do Simulador" fica na aba Projeto do Kuru (não na Usinagem CNC nem no Pargus).
## 5.6.1 — 10/11/2026
- Documentação: `Claude contexto/ESPEC Kuru - pedidos ARGUS do Simulador.md`, a especificação para o Kuru Nuvem ler a fila
  `DESENHOS\_PEDIDOS ARGUS` e gravar sozinho o Anexo 1 e o Código do programa no ARGUS (usuário quer automático ao salvar).
## 5.6.0 — 10/11/2026
- Simulador (desenho): campo **"Cód. interno (item) → Anexo 1 ARGUS"**. Com ele preenchido, ao salvar o desenho (Salvar programa)
  ou ao clicar em Imprimir na prévia, o Simulador grava um pedido em `DESENHOS\_PEDIDOS ARGUS\<item>_<programa>.json`
  (item, programa, caminho do PDF). Código vazio ou com letra: não grava e avisa na mensagem.
- Rotina\pedidos_argus.ps1 (novo): lista a fila (confere se o PDF existe) e marca `-Feito` (move para `feitos`) ou `-Erro`.
  Quem aplica é o Claude pelo Kuru > Pargus > Catálogo de Itens: Anexo 1 = PDF, Código do programa, F9 Salvar no ARGUS.
  O Simulador não grava direto no ARGUS (só o Kuru grava; senha do banco não é usada).
## 5.5.0 — 10/11/2026
- PSA 108 (desenho): tolerância dos diâmetros por faixa (`PSA_DIA_TOL`, quanto menor o Ø menor a tolerância):
  Ø até 30 = ±0,1 · até 80 = ±0,2 · até 150 = ±0,3 · até 300 = ±0,4 · acima = ±0,5. Altura 0/−0,1. **Secção ±0,1** (antes sem tolerância).
  Vale quando o campo de tolerância está vazio (antes ±0,2 fixo). Função `psaTolFill(p)`.
- Rotina\gerar.ps1 (harness): chama `psaTolFill` — antes os desenhos PSA 108 gerados pela rotina saíam sem tolerância no Ø e na altura.
- Inclui alteração do Simulador feita em 09/11 (fora desta conversa, não commitada): material das gaxetas/raspadores em lista
  (PU / NBR / PTFE puro / PTFE+BR) e ferramentas do NBR = as das arruelas.
## 5.4.0 — 10/11/2026
- Rotina\gerar.ps1: `"forcar": true` no job agora também passa pela conferência de duplicados com resultado **JA EXISTE**
  (antes só liberava VERIFICAR). Uso: o usuário pede programa NOVO mesmo havendo antigo (ex.: 31140/1 PSA 108 123x128x7,
  que tinha só as variantes antigas do 025650 → gerados 046135 = 1 peça e 046136 = 4 peças por ciclo).
## 5.3.0 — 09/11/2026
- Croqui (Simulador CNC.html): campo INTERVALO trocado por **COD INTERNO** (código do item do cadastro);
  no formulário do desenho o campo "Intervalo" virou "Cód. interno (item)" (`data-d="cod"`).
- Croqui: texto do bloco **Quantidade** centralizado (estava à esquerda).
- gerar.ps1: passa o código do item do job (`item`) para o COD INTERNO do desenho.

## 5.2.0 — 09/11/2026
- O CADASTRO do Kuru manda (os cabeçalhos dos .PIT estão errados na maioria):
  - jobs ganham `"cad": {"prog": "...", "bucha": "..."}` lidos de OP → Visualizar Cadastro → aba Part Seals;
  - `gerar.ps1`: Código do programa preenchido → JA EXISTE (não gera); código sem .PIT na pasta → VERIFICAR;
    bucha do cadastro (`AxB` ou `TARUGO N`) vira bi/bo do programa.
- `duplicados.ps1`: cabeçalho sozinho não confirma mais; precisa do desenho do mesmo número ou da altura do corte (senão VERIFICAR).
- Rotina documentada: passo "cadastro de cada OP" antes de montar os jobs.

## 5.1.1 — 09/11/2026
- duplicados.ps1: desenho com as mesmas medidas só confirma o programa se o cabeçalho do .PIT for do mesmo perfil
  (025382 = desenho PSH 106 mas programa RS01P; 031951.PIT = arquivo MCS) → senão VERIFICAR.
- Correção: cabeçalho `PSHPSE106` virava um texto só ("PSH106 PSE106") e não casava com PSH106/PSE106.
- 046112 (duplicado do 046012) movido para backup; planilha de controle da 31042/12 apontada para 046012.

## 5.1.0 — 09/11/2026
- Nova conferência de programa duplicado (`Claude contexto/Rotina/duplicados.ps1`), usada pelo `gerar.ps1` ANTES de reservar número:
  - cabeçalhos de todos os .PIT nos 2 formatos (`PSR 102 110X125X9X12` e `PSR102-P 110.000/125.000/9.000`), perfil sem sufixo -P/-M;
  - cabeçalho cortado em 21 caracteres: último número comparado como prefixo;
  - cabeçalho sem altura total (PSR do Simulador) ou cortado: confirma pelo desenho do mesmo número ou pela altura do corte (Z da faca);
  - pastas de desenho `DESENHOS\<PERFIL>\<PERFIL> (a X b X c [X d]) NNNNN` com as mesmas medidas → programa NNNNN.
  - Resultado: JA EXISTE (não gera, só atribuir) / VERIFICAR (provável; não gera sem `"forcar": true` no job) / NOVO.
- Motivo: a OP 31042/12 (PSR 102 110x125x9/12) ganhou o 046112, mas já existiam 046012 e 004446; 046115 (PSH 106 35x45x10) repetia 025382/031951.
- Uso sozinho: `duplicados.ps1 -JobsFile jobs_dd-MM-aaaa.json` (só confere, não grava).

## 5.0.0 — 09/11/2026
- Primeira versão no GitHub (base do que já estava no W: em 09/11/2026).
- Simulador CNC.html: gera Fagor .PIT + MCS 500 + desenho PDF para PSE/PSH 105/106/107, PSH 103, PSE 103, PSE 118, PSH 121, PSH 125, PSH 124 (DHR), PSE 125 (DPR), PSH 108, PSH 117, PSR 102/211,
  DH PSH 129, PSO 109, arruelas (ISO, ciclo com/sem chanfro); Alterar programa (só desbaste); Ver programa.
- Rotina noturna (`Claude contexto/Rotina/*.ps1`): gerar, revisar, controle, imprimir, regerar, índice de .PIT, pit2mcs.
