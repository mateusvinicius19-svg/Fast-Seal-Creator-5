# Histórico de versões — Fast Seal Creator 5

Regra: toda alteração sobe a versão em `VERSION`, ganha uma entrada aqui (data + o que mudou) e vai para o GitHub
(commit + tag `vX.Y.Z` + push). Versão = MAIOR.MENOR.CORREÇÃO
- CORREÇÃO (5.0.x): conserto de erro, ajuste de regra pequena.
- MENOR (5.x.0): recurso novo, perfil novo, rotina nova.
- MAIOR (x.0.0): mudança grande de formato/fluxo.

## 5.99.9 — PSG 101 também com "📐 Salvar só o desenho" (25/11/2026)
- Usuário: o PSG 101 também precisa salvar só o desenho (programa já existe). Mesmo botão do PSE 108 (5.99.8):
  grava só o PDF em DESENHOS\PSG 101\… Outros perfis sem o botão.

## 5.99.8 — PSE 108: botão "📐 Salvar só o desenho" (25/11/2026)
- Usuário: muitos itens já têm programa mas não têm desenho. No PSE 108, o botão pede o número do programa que já existe
  (avisa se não achar o .PIT), o Cód. interno e quem desenhou, e grava SÓ o PDF em DESENHOS\PSE 108 (DP)\… (+ pedido ARGUS
  se tiver código) e imprime, como o Salvar. Não grava .PIT, MCS 500 nem histórico.

## 5.99.7 — PU: externo (e canais do externo) antes do interno (25/11/2026)
- Usuário: nos itens de PU, o externo é feito antes do interno, e as outras ferramentas do externo (canal martelo T6D6 do
  PSR 211/212 e PSE 102 R, OUTSIDE 2 do PSE 120) vão juntas, antes do interno. Pós-processamento `puOutsideFirst`: só muda a
  ORDEM dos blocos (mesmas linhas). Face, canal frontal e corte no mesmo lugar.
- Mudam (PU): PSE 102 R, 103, 105, 106, 107, 118, 120 · PSH 103, 105, 106, 107, 108, 117, 121, 125 · PSR 211, 212.
  NBR, Viton, PTFE e os que já faziam o externo antes (PSH 110/131, PSR 101/102, PSE 127, dual, PSH 129, arruelas) iguais.

## 5.99.6 — Ciclo de várias peças sugere o número do programa de 1 peça pelo histórico (25/11/2026)
- Usuário (830): salvou o PSE 108 de 1 peça e logo o ciclo de 4 — o Salvar sugeriu número NOVO. A busca era na lista da pasta
  DESENHOS, guardada 10 min (ainda sem o desenho recém-salvo). Agora o ciclo procura no HISTÓRICO o programa de 1 peça com o
  mesmo perfil e medidas e sugere "000830" (a janela avisa: salva como "000830 CICLO 4 PÇ"). Salvar um desenho também atualiza
  a lista da família na hora.

## 5.99.5 — PSE 108: chanfros voltam ao recomendado ao digitar Ø externo ou secção (25/11/2026)
- Usuário: ao abrir o PSE 108 e digitar Ø ext / secção / altura, ficavam os chanfros do item anterior (memória do perfil e
  formulário salvo) e era preciso apagar. Agora digitar o Ø externo ou a secção limpa os chanfros (= recomendado da tabela);
  chanfro digitado depois vale. Só o PSE 108.

## 5.99.4 — PSE 108 (DP): Ø externo → secção → altura e chanfros recomendados pela tabela (25/11/2026)
- Usuário: preencher Ø externo, secção e depois altura (Ø interno = Ø ext − 2 × secção, só leitura).
- Chanfros (campo vazio = recomendado; digitado vale). Peças padrão [secção · altura · chanfro externo frente/trás · interno]:
  1,1·2·0,2·0,1 · 1,9·3·0,4·0,15 · 2,65·4·0,6·0,25 · 3,5·6·0,8·0,35 · 5·7,9·1·0,4 · 6,5·7,9·1·0,4. Fora do padrão: sugestão
  interpolada pela secção (arredonda a 0,05). Altura vazia = a da tabela. Alojamento (Fast Seal) também preenche a secção.
- Só o PSE 108; Arruela ISO, PSH 129, PSE 125 e PSO 109 iguais.

## 5.99.3 — Desenho do programa: reconhece o PSE 108 e usa o desenho padrão com os chanfros do programa (25/11/2026)
- Usuário (027780 é um PSE 108): o 📐 Desenho do programa saía como perfil especial. Agora, se o programa encaixa no PSE 108 (DP),
  a janela oferece "Usar o desenho padrão do PSE 108" com Ø/altura e CADA chanfro tirados do programa (externo frente/trás,
  interno frente/trás; 0 = sem chanfro, sem cota). O PSE 108 entra em 2º na lista e vem escolhido se for o mais parecido ou se o
  número já tem pasta em DESENHOS\PSE 108. Ø encaixado no X escrito no programa (11,8, não 11,806).
- Desenho padrão do PSE 108/Arruela ISO gerados pelo formulário: sem mudança.

## 5.99.2 — Programa aberto do Programas_CNC: o Desenho é o do programa (25/11/2026)
- Usuário (027780, PSE 108 do Fast Seal, 11,8x14x2): abrindo um programa existente (🔎 Ver programa, Histórico, arquivo ou
  colar), a etapa 4 Desenho / 👁 Ver desenho mostrava o perfil do FORMULÁRIO (PSE 108 novo, chanfro nos dois lados) e não o
  programa (faca em Z-2: chanfro só na frente). Agora fazem o 📐 Desenho do programa. Gerar pelo formulário volta ao normal.

## 5.99.1 — Teste de perfis sem abrir o navegador do usuário (25/11/2026)
- Usuário: o teste abria o navegador dele a cada vez. CLAUDE.md: rodar `testar-perfis.ps1` sempre com `-SemAbrir` e abrir a
  página no navegador interno do app. O Simulador não mudou.

## 5.99.0 — Cada perfil abre com as configurações do último item salvo (25/11/2026)
- Usuário: ao escolher o perfil (ex.: PSH 106), o formulário vem com as configurações da última PSH 106 salva (💾 Salvar), não
  com o padrão. Guardado por perfil no navegador (`ps_prof_<perfil>`; PSE 108 e Arruela ISO separados). Não voltam: tolerâncias
  do desenho (começam no padrão) e a bucha digitada (bi/bo). Antes do 1º Salvar de cada perfil continua o padrão.
- Correção: o "✏️ só trocar a bucha" gravava no histórico as configurações do formulário aberto (de outra peça); agora não grava.

## 5.98.13 — PSE 108 (DP) com D14: fim do interno recua no X do desbaste (25/11/2026)
- Usuário (PSE 108 8,5x10,9x2 PTFE+BR, tarugo): o acabamento interno da T2D14 recuava em X4.5 (Ø int − 4) e as costas da barra
  pegavam do outro lado do furo. Agora, com a D14 (T2D14/T4D14) e passe de desbaste, recua no mesmo X em que saiu o último
  passe de desbaste (X5.5). Só no PSE 108 (DP); outros perfis e ferramentas não mudaram.

## 5.98.12 — Ciclo de várias peças: número do programa de 1 peça e sem "Quem desenhou?" (25/11/2026)
- Usuário: o ciclo é feito depois do programa/desenho de 1 peça e só é reaberto para mudar peças por ciclo ou bedame.
  Ao salvar o ciclo (2+ peças), o aviso "JÁ EXISTE desenho com essas medidas" não aparece mais: o número sugerido é o do
  desenho existente (046140 → 046140 CICLO N PÇ). Também não pergunta "Quem desenhou?" (o desenho não é gravado, 5.98.11).

## 5.98.11 — Ciclo de várias peças: salvar não grava o desenho de novo (25/11/2026)
- Usuário: o desenho e o programa de 1 peça são feitos antes; no programa "CICLO N PÇ" (PSA 108, PSE 108, ciclo de arruelas)
  o salvar agora grava só o .PIT e o MCS 500 — sem regravar/perguntar o desenho e sem imprimir.
- 1 peça por ciclo continua igual (grava e imprime o desenho).

## 5.98.10 — NBR e Viton com os recuos do PU (25/11/2026)
- Usuário (PSH 107 28x38x10 NBR): recuos das ferramentas diferentes do PU. Agora o `puRetracts` (+1 no Ø, 5.81.0) vale também
  para NBR/Viton e o `retractRules` usa a folga da ferramenta que o PU usaria: T7D7 → folga da T2D2; interno → D45/D12/D14
  pelo menor Ø do bloco (mesma escolha do PU), com o Ø mínimo dessa ferramenta. A D14 (T2D14) continua com o recuo exato de 1.
- PU e PTFE não mudaram. Contorno (ferramentas, só-acabamento até 6 no Ø do PU) continua como era.

## 5.98.9 — Altura < secção: canal e lábios com altura ÷ 2 também no PSH 105, PSH 117, PSE 105, PSR 211 e PSR 212 (25/11/2026)
- Usuário: replicar a regra do PSH/PSE 106 (5.98.7/5.98.8). Lista `HM2_TYPES`; nos PSR vale a altura do corpo (hb).
- Altura ≥ secção e os outros perfis (PSH 108 etc.) não mudaram.

## 5.98.8 — PSH 106 / PSE 106: lábios com altura ÷ 2 (igual ao canal) quando a altura é menor que a secção (25/11/2026)
- Usuário: no 20x28x3 os lábios externo e interno ficavam com 2 (secção ÷ 2); agora acompanham o canal (1,5).
- Só PSH 106 e PSE 106; altura ≥ secção e os outros perfis (inclusive PSH 108) não mudaram.

## 5.98.7 — PSH 106 / PSE 106: canal com altura ÷ 2 quando a altura é menor que a secção (25/11/2026)
- Usuário (PSH 106 20x28x3): com altura < secção a profundidade do canal passa a ser altura ÷ 2 (antes secção ÷ 2:
  3 mm de altura ficava com canal de 2 mm; agora 1,5 mm). Altura ≥ secção continua secção ÷ 2.
- Só PSH 106 e PSE 106; PSH 108 (que usa a geometria do 106) e os outros perfis não mudaram.

## 5.98.6 — PSH 107 E 46356: cotas da secção no estilo novo + profundidade do canal com tolerância (24/11/2026)
Só o desenho avulso (`Programas avulsos/PSH 107 E (16 X 26 X 5.6) 46356`); o Simulador não mudou.
- Usuário (com imagem de exemplo): cada Ø da secção com linha de chamada horizontal e seta vertical, texto em pé ao lado
  da seta; sai a cota corrida de baixo (0,25 / 2,15 / 3 / 0,2). Ficam a largura 5,6, chanfros e ângulos em chamada.
- Profundidade do canal 3,2 0/−0,1 (dentro do canal) e abertura 2,9 0/−0,1 ao lado da face.

## 5.98.5 — PSH 107 E 46356: tolerâncias do canal no desenho (24/11/2026)
Só o desenho avulso (`Programas avulsos/PSH 107 E (16 X 26 X 5.6) 46356`); o Simulador não mudou.
- Usuário: abertura do canal entre 2,8 e 2,9 → cota 2,9 0/−0,1; Ø23,7 0/−0,1 e Ø17,9 +0,1/0.
- PDF do W: (`DESENHOS\PSH 107 E\PSH 107 E (16 X 26 X 5.6) 46356\`) regravado com a data de 24/11/2026.

## 5.98.4 — Material novo: PTFE+T46 (T-46) (24/11/2026)
Teste dos 37 perfis: todos geram; nenhum programa mudou. Em PTFE+T46 os 34 perfis com lista de material saem iguais ao
PTFE+GR, só muda o nome na linha ;MATERIAL (PSO 109: programa igual, o material vai para o desenho/histórico).
- Usuário: "acrescenta o material T-46" (no Simulador). Mesmas regras do PTFE puro / +BR / +GR / +FV: ferramentas de Teflon
  (T7D7 / T4D4, T2D14 abaixo de Ø14, bedame T8D8; faca T5D5 na secção de 1 a 3 com 1 peça), bucha automática Ø int − 2 /
  Ø ext + 2, passe único saindo de bucha. Na linha ;MATERIAL sai "PTFE+T46" (como no programa 017473). Texto "T-46" / "T46"
  em programas antigos é reconhecido como PTFE+T46.

## 5.98.3 — Alerta: PU / NBR com várias peças só no Ciclo SEM CHANFRO (24/11/2026)
Teste dos 37 perfis: todos geram; nenhum programa mudou.
- Usuário: "PU e NBR para fazer de várias peças apenas o perfil SEM CHANFRO, os outros coloca um alerta". PU, NBR e Viton
  (padrão do NBR) com 2 ou mais peças por ciclo em PSA 108, Ciclo com chanfro, PSA 108 C/ CORTE, PSA 109, PSG e PSE 108 (DP)
  mostram ATENÇÃO (faixa do topo e mensagem): fazer 1 peça por ciclo ou usar o Ciclo arruelas SEM CHANFRO. O programa continua
  saindo (com bedame). Com 1 peça ou nos outros materiais, sem alerta.

## 5.98.2 — Faca em várias peças só no Ciclo arruelas SEM CHANFRO (24/11/2026)
Teste dos 37 perfis: todos geram; nenhum programa mudou (padrões).
- Usuário: "apenas nesse modelo que vamos fazer com a faca várias peças" (Ciclo arruelas várias peças SEM CHANFRO).
  Com 2 ou mais peças por ciclo, os outros perfis não trocam mais o bedame pela faca T5D5: Ciclo com chanfro, PSA 108 C/ CORTE,
  PSA 109 e PSG em PTFE fino (secção 1 a 3), e PSE 108 (DP) em PU/NBR/Viton → bedame T8D8 (T6D16 acima de 14,8).
  Com 1 peça, como antes. O SEM CHANFRO continua com a faca em qualquer quantidade.

## 5.98.1 — PSA 108: várias peças por ciclo cortam com o bedame, não com a faca (24/11/2026)
Teste dos 37 perfis: todos geram; nenhum programa mudou (padrão = 1 peça).
- Usuário: "no PSA 108 quando fazemos para várias peças não colocar para fazer com a faca, apenas se for de 1 em 1".
  PSA 108 com 2 ou mais peças por ciclo corta com o bedame (T8D8; T6D16 com secção > 14,8 ou Celeron, G92 +1), em PU, NBR,
  Viton e PTFE fino. Com 1 peça continua a faca T5D5. Só o PSA 108 (Ciclo SEM CHANFRO e outros perfis iguais).

## 5.98.0 — PSO 109: campo Material (24/11/2026)
Teste dos 37 perfis: todos geram; nenhum programa mudou (PSO em PU igual ao de antes).
- Usuário: "preciso poder selecionar o material" (PSO 109). Campo Material com a lista completa (PU, NBR, Viton, PTFE puro,
  +BR, +GR, +FV, POM, Nylon/PEAD, Celeron). Usuário: "só o material" — o programa é o mesmo (T7D17 / interno pelo Ø / faca T5D5);
  o material vai para o desenho, o histórico e a bucha automática (Teflon: Ø int − 2 × Ø ext + 2, como nos outros perfis).
  O PSO fica fora da troca do interno pelo menor Ø e da meia rotação do Celeron.

## 5.97.4 — Interno pelo menor Ø: o recuo do passe no tarugo não conta mais (24/11/2026)
Teste dos 37 perfis: todos geram; com os valores padrão nenhum programa mudou. Do tarugo: PSR 102 22x30 PU (46428) e
22x32 PU passam de T4D14 para T1D45; PSR 102 14x22, PSR 101, PSH 105/117, PSE 106 e PSA 108 do tarugo ficam com a mesma ferramenta.
- Usuário: "programa 46428, veja por que o interno selecionou a D14". No tarugo o 1º passe é Ø13 e volta em G1 para Ø11,5 no
  fundo (recuo); a regra do menor Ø trabalhado (v5.92.0) contava esse 11,5 → faixa 10–12 com ângulo → D14. Agora só contam os
  movimentos que andam em Z (como já era nos programas em G91): menor Ø 13 → T1D45. Aplicado em todos os perfis do tarugo.

## 5.97.3 — Editar o programa: a edição não trava mais (24/11/2026)
Teste dos 37 perfis: todos geram; nenhum programa mudou.
- Usuário: "não estou conseguindo editar o programa, preciso mudar algumas coordenadas manual". Com a edição aberta, o gerador
  refazia o programa (campo do formulário mexido) e a caixa de texto sumia: ficava "Editando", sem o botão Editar, e o
  "Aplicar e simular" dava erro — só voltava recarregando a página. Agora carregar um programa fecha a edição (volta o Editar).

## 5.97.2 — PSH 110: aperto da intermediária no mínimo 0,5 no Ø (23/11/2026)
Teste dos 37 perfis: todos geram; com os valores padrão nenhum programa mudou (no padrão o aperto já passa de 0,5).
- Usuário: "estou achando muito pouco o aperto, coloca no mínimo 0,5 em relação ao diâmetro nominal". Lábios da frente da
  intermediária: Ø alojamento + aperto / Ø haste − aperto, aperto = maior entre 0,5 e 0,064·S + 0,07.
  Ex.: 36,35 x 44: Ø44,31 / Ø36,04 → Ø44,50 / Ø35,85. Base, tampa e PSH 110 30° não mudam.

## 5.97.1 — PSH 110 (chevron): entalhe da intermediária do tamanho do V — as peças encaixam (23/11/2026)
Teste dos 37 perfis (PSH 110 nas 3 peças): todos geram; só o PSH 110 mudou (o PSH 110 30° não muda).
- Usuário: "parece que uma peça está bastante dentro da outra no encaixe, elas precisam se encaixar" / "o canal parece mais raso".
  O entalhe da frente da intermediária era 0,4923·S − 1,035 (0,85 no 36,35 x 44) e o V de trás abre ±1,66: no conjunto o V
  entrava no corpo da peça seguinte. Agora o entalhe tem a abertura da base do V, a 45°: fundo (S − 0,5)/2 (1,66), e o V entra
  flanco com flanco até os ombros encostarem na face.
- Altura de cada peça pelo encaixe real de cada junta (base → 1ª, intermediária → intermediária, última → tampa); o conjunto
  continua fechando H exato. Ex.: 36,35 x 44 x 23,5 com 4 intermediárias: 4,62 → 4,87 cada. Sobreposição no conjunto montado: zero
  (conferido também em 50 x 65 x 30 e 100 x 120 x 40). Base e tampa com o mesmo formato; mudam só a altura.

## 5.97.0 — Interno com a D45 (T1D45): no máximo 30° pelas costas (23/11/2026)
Teste: os 37 perfis com os valores padrão e em PU com Ø 20, 33 e 45 (148 programas): todos geram; só mudaram PSH 117,
PSH 125, PSE 102 R e PSE 127 quando o interno é a T1D45 (Ø de 12 a 40). Com a D12 (Ø ≥ 40) e nos padrões, nada mudou.
- Usuário: "ajusta a D45, ela não faz chanfro de 45 graus atrás, no máximo 30". Com a T1D45:
  - PSH 117 / PSH 125: a saída do interno depois do V de trás (fora da peça) era 45° → 30°.
  - PSE 102 R: chanfro interno de trás 45° → 30° com o eixo (mesmo comprimento em Z; o desenho acompanha).
  - PSE 127: chanfro interno de trás (0,3) 45° → 30° com o eixo (o desenho acompanha).
- Ficaram como estão (são a forma da peça, não chanfro): PSH 110 intermediária (flanco do V a 45°, encaixe do conjunto) e o
  canal arredondado do interno do PSE 127 (a metade da frente do canal passa de 30°).

## 5.96.9 — PSG 103: desbaste em Z contínuo (23/11/2026)
Teste dos 37 perfis: todos geram; com os valores padrão nenhum programa mudou (peça curta já era uma etapa).
- Usuário: "o desbaste está em duas etapas, lembra da regra que precisa ser contínuo". O PSG 103 passa a desbastar cada Ø de
  uma vez até o fim em Z, como o PSG 101 (ex.: 181 x 200 x 12, bucha 171 x 207: era "EM Z 2 ETAPAS DE 6.775", agora um passe
  até Z −13,55). Só o PSG 103; PSA 108/109 e PSG 104 continuam iguais.

## 5.96.8 — PSG 103: cota da secção menor (parede do rebaixo) no detalhe B (23/11/2026)
Nenhum programa muda (teste dos 37 perfis: todos geram, nenhum programa mudou; só o desenho do PSG 103 mudou).
- Usuário: "preciso de cota nessa secção menor". O detalhe B do PSG 103 ganha a cota da parede do rebaixo
  ((Ø ext − Ø rebaixo) / 2, ex.: 181 x 200 x 12 com rebaixo Ø194 → 3), ao lado da secção total.

## 5.96.7 — VEDADOR 46399: desenho no cadastro 46245 (23/11/2026)
Simulador não muda (só `Programas avulsos`).
- PDF regravado com COD INTERNO 46245 e pedido `_PEDIDOS ARGUS\46245_046399.json` (Anexo 1 + programa 046399) na fila do Kuru.

## 5.96.6 — VEDADOR 46399: rampa do Ø48 a 45° (23/11/2026)
Simulador não muda (só `Programas avulsos`).
- Usuário: "essa descida coloca um ângulo de 45 graus, vai ficar menos material para o bedame". A T7D7 desce do Ø50,8 para o
  Ø48 a 45° (até Z −8,4); o bedame faz 2 mergulhos na parede. `046399.PIT` e `MCS 500` regravados no W:.

## 5.96.5 — VEDADOR 46399: passes até Z −25 (largura do bedame) (23/11/2026)
Simulador não muda (só `Programas avulsos`).
- Usuário: "em Z no final precisa ter no mínimo a medida do bedame, que é de 1 mm". Desbaste externo e furo vão até Z −25
  (face de trás + 1 do bedame). `046399.PIT` e `MCS 500` regravados no W:.

## 5.96.4 — VEDADOR 46399: 1 mm para o acabamento e nada saindo atrás da peça (23/11/2026)
Simulador não muda (só `Programas avulsos`).
- Usuário: "deixa pelo menos 1 mm para tirar no acabamento e a parte de trás não precisa sair fora da peça". Desbaste externo e
  interno deixa 1 no Ø; acabamento da T7D7 termina no fim do chanfro de trás (não segue o chanfro para fora), passes até Z −24,78,
  furo até Z −24,5; o bedame corta desde o Ø64. `046399.PIT` e `MCS 500` regravados no W:.

## 5.96.3 — VEDADOR 46399: Ø48, cone e chanfro de trás com a T7D7; bedame só na parede e no corte (23/11/2026)
Simulador não muda (só `Programas avulsos`).
- Usuário: "essa parte faz com a T7D7, o bedame faz só o paralelo nas costas". A T7D7 desce do Ø50,8 para o Ø48 numa rampa com
  a inclinação do cone e faz Ø48, cone e chanfro; o bedame T8D8 só tira a rampa até a parede reta em Z −7 e corta. `046399.PIT` e
  `MCS 500` regravados no W: (o desenho não muda).

## 5.96.2 — VEDADOR (33 X 50.8 X 24) 46399: programa e desenho avulso em PEAD (23/11/2026)
Simulador não muda (só arquivos novos em `Programas avulsos`).
- Secção tirada do STL do Inventor; frente = face do Ø50,8, uma operação, bucha 31 x 62. T3D3 face, T4D4 interno (rebaixo
  Ø47 x 4), T7D7 externo Ø50,8, bedame T8D8 faz o degrau Ø48, o cone, o chanfro de trás e o corte. Gravados no W:
  `046399.PIT`, `MCS 500\46399.txt` e o PDF na pasta do desenho.

## 5.96.1 — PSE 108 (DP): material volta a trocar as ferramentas depois de salvar (23/11/2026)
Nenhum programa padrão muda (teste dos 37 perfis: todos geram, nenhum mudou).
- Depois de salvar um programa, a primeira alteração na peça voltava as tolerâncias do desenho ao padrão e junto zerava o
  TIPO DA PEÇA (DP → "Automático"). O botão continuava mostrando PSE 108 (DP), mas o gerador virava Arruela ISO, sem material:
  trocar PU/NBR/PTFE não mudava nada (sempre T7D7 / T4D4 / T8D8). Agora o tipo da peça fica; as tolerâncias continuam voltando ao padrão.

## 5.96.0 — Abrir o Simulador sem ~130 consultas ao W: (22/11/2026)
Nenhum programa muda (teste dos 37 perfis: todos geram, nenhum mudou).
- Ao abrir, o Simulador procurava no W: a foto de cada ferramenta da biblioteca, uma por uma (2 consultas por ferramenta,
  ~130 no total, todas "não existe" — enchiam o console de erros 404). Agora lista a pasta `FERRAMENTAS SIMULADOR` uma vez
  e só lê as fotos que existem: 2 consultas, ~0,15 s em vez de ~3 s de tráfego no W:. As imagens do desenho saem iguais.

## 5.95.0 — Abrir Simulador mais rápido (22/11/2026)
A janela preta do "Abrir Simulador" demorava ~13 s neste PC. Causa: o DNS da rede `partsseals` (172.16.99.32) não
responde nomes da internet; cada nome novo esperava ~11 s até o Windows tentar o DNS do Wi-Fi, e o github.com só fica
guardado 60 s — quase toda abertura pagava essa espera. Agora ~1,5 s (DNS já respondido) e ~4 s (DNS frio).
- `atualizar.ps1`: pergunta o DNS antes (prazo de 3 s); se não responder, abre a versão já baixada na hora e baixa a nova
  escondido, por trás (`-SoBaixar`), para a próxima abertura. Todo pedido ao GitHub tem prazo. Sem versão baixada no PC, espera.
- `atualizar.ps1`: não espera mais 2 s no fim quando não há versão antiga para apagar.
- `abrir.ps1`: se o servidor que está rodando já é desta versão e responde, não religa (economiza ~2 s).
- `abrir.ps1`: não lê o Simulador inteiro do W: para comparar quando o tamanho e a data batem com a última cópia (~1 s).
- O log (`log.txt`) mostra quanto tempo a consulta ao GitHub levou.

## 5.94.0 — Cadastro de ferramentas: lâminas confirmadas pelo usuário (21/11/2026)
Só a biblioteca 🧰 Ferramentas (nenhum programa muda).
- **T8D8:** lâmina WNT 3002.1,0.13.L WPU7620 (1 mm) — saiu o "H1002".
- **T6D16:** lâmina MGMN 200 G H01 (2 mm, neutra) no suporte MGEHL 2020-2 — saiu o "H1002".
- **T6D6** e **T4D14:** afiadas fora de padrão (sem código de catálogo) — saiu o "H1000" da T6D6.
- **T4D74 / T4D84 (bedame 0,8):** suporte MB-E16-34-09R e pastilha MB-09R080-04-14L 1025.
- Suportes, pastilhas e lâminas: saíram os itens H1002 e H1000 (códigos que não existem).

## 5.93.0 — Cadastro de ferramentas: dados que faltavam (21/11/2026)
Só a biblioteca 🧰 Ferramentas (os geradores não leem esses campos; nenhum programa muda).
- Suportes e pastilhas dos .txt do W: (Suportes.txt, Pastilhas Para usinagem.txt, TABELA DE CODIGOS FERRAMENTAS.txt):
  T1D1, T4D4, T1D45, T7D7, T7D17, T6D16, T8D8, T6D26, T6D36, T2D13, T7D37.
- Ø mínimo pela regra do interno (5.92.0): D14 Ø4, D81 Ø10, D45 Ø12, D4 Ø15; D81 também na T2 (T2D81) e textos de uso
  da D14, D45 e D81 com a regra nova. Externos/internos de aço (D37, D44, D47, D51) com material "Aço".
- Ficaram para o usuário confirmar: lâmina da T8D8 e da T6D16 (txt × H1002), pastilha da T4D14, suporte do bedame 0,8 (D74/D84).

## 5.92.0 — Ferramenta do interno pela tabela nova e faca no PTFE fino (21/11/2026)
Regra do usuário (pelo MENOR Ø que a ferramenta trabalha):
- **PU:** D14 (T4D14) abaixo de Ø10 · **D81 (T4D81)** de 10 a 12 · D45 (T1D45) de 12 a 40 · D12 (T2D12) de 40 para cima.
- **PTFE, POM, PEAD, NBR e Viton:** D14 (T2D14) abaixo de Ø10 · **D81 (T2D81)** de 10 a 12 · D14 de 12 a 15 · D4 (T4D4) de 15 para cima.
- A D81 só faz interno **reto**: com chanfro, ângulo ou perfil no interno, de 10 a 12 fica a D14.
- Mudou: D45 no PU começa em Ø12 (era 11); D4 começa em Ø15 (era 14); NBR e Viton passam a seguir a coluna do PTFE (antes sempre D4);
  D14 faz a partir de Ø4 (era 3,5). Nas arruelas sem desbaste interno (bucha justa) a regra agora também vale.
- **Corte:** PTFE (puro, +BR, +GR, +FV) com secção de 1 a 3 mm corta com a **faca T5D5 F0.22** (antes bedame T8D8).
- Exemplos padrão dos 37 perfis: iguais.

## 5.91.0 — Regra da faca em PU também nos perfis antigos (21/11/2026)
- A regra da 5.89.0/5.90.0 (PU com sobremetal externo > 10 no Ø) agora vale também no **DH PSH 129, PSE 125 DPR, PSH 110, PSO 109
  e PSA 108**: passes de desbaste acima do Ø ext **+1 mm** em Z (> 15: **+2 mm**) e o corte (faca T5D5; no DPR o bedame) entra e
  recua a **10 mm acima da peça**, não mais pela bucha. No PSH 110 a saída do acabamento externo também fica a 10 mm da peça.
- O intervalo (G92) não muda. PSA 108: a faca já entrava a 10 mm, só o desbaste muda (PSA 108 C, PSA 109, PSG e ciclos iguais).
- NBR/outros materiais e PU com pouco sobremetal: iguais. PSH 110 30° não mudou.

## 5.90.0 — PU com sobremetal grande: saída do acabamento externo a 10 mm da peça (20/11/2026)
- Depois do acabamento externo (último passe da T2D2), a ferramenta subia em G0 até a bucha + 1/+2 (no PSR 211 PU bucha 40 acima:
  X154,5). Como o desbaste já tirou o material de cima, agora sobe só até **10 mm acima da peça** (maior Ø + 10; ex. X124,5) e volta em Z.
- Só quando vale a regra da 5.89.0 (PU com sobremetal externo > 10 no Ø), nos mesmos perfis. Os outros casos não mudam.

## 5.89.0 — PU com sobremetal grande: passes +2 mm e faca/T6 a 10 mm da peça (20/11/2026)
Regra do usuário (todos os perfis em PU com faca):
- **Sobremetal externo > 15 mm no Ø** (bucha ext − Ø ext): os passes de desbaste acima do Ø ext vão **2 mm** a mais em Z
  (de 10 a 15 continua +1 mm, regra de 09/11). O suporte da faca não pega no material que sobra. O intervalo (G92) não muda.
- **T5 (faca) e T6** entram e recuam a **10 mm acima da peça** (maior Ø + 10 no X), não mais pela bucha, quando a regra acima vale
  (PU com sobremetal > 10). Perfis: PSE/PSH do padrão Fast Seal (PSE 102 R, 103, 105, 106, 107, PSH 106, 107, 117…), PSR 211/212,
  PSE 120 e PSR 102. PSR 101 e DUAL já entravam assim.
- PSR 101 e PSE 120: o milímetro a mais dos passes de cima deixou de entrar no G92 (como já era nos outros perfis).
- Sem mudança: perfis que não são PU, PU com sobremetal até 10 mm e os modelos antigos (PSH 129 DH, PSE 125 DPR, PSH 110, PSO 109,
  PSA 108, arruelas e anel).

## 5.88.0 — Pedidos ARGUS que o Kuru recusava (20/11/2026)
Visto no Kuru Nuvem > Projeto > Pedidos do Simulador: 80 pedidos, 48 em conflito e 22 com erro.
- **PSE 102 R / PSE 120 (anel A) e PSH 110 (peças A/B):** o pedido apontava o PDF numa pasta com o "A" no fim
  (`…46354A\…46354A.pdf`), mas o desenho é salvo na pasta sem o "A" (`…46354\…46354A.pdf`) → "PDF não encontrado".
  Agora o pedido (e a mensagem "desenho: …") usa a pasta certa. Os 4 pedidos parados (46302–46305) foram corrigidos na fila
  e voltaram para "pendente" (cópia antes da correção em `%LOCALAPPDATA%\FastSealCreator\backup-pedidos-20261120`).
- **"Arquivo Fagor do programa não foi encontrado":** o programa tinha sufixo no nome (`046198 164X205.PIT`,
  `046203 9X30 CICLO 5 PÇ.PIT`) e o Kuru procurava só `046198.PIT`. O pedido agora leva o nome real em
  `"arquivoPrograma"`; se não existir programa com o número, o Simulador avisa na hora ("⚠ NÃO existe programa…").
  Especificação (`Claude contexto/ESPEC Kuru…`) e módulo `Kuru - fila ARGUS/filaPedidosArgus.js` já leem o campo
  (`node teste-fila.js` → TESTE OK, com o caso novo). **Falta quem mantém o Kuru ler `arquivoPrograma`** na versão dele.
- Programas gerados: os 37 perfis iguais à 5.87.0 (testar-perfis).

## 5.87.0 — Proteção contra travamento com vários PCs + Kuru (20/11/2026)
- Usuário (3 PCs com o Simulador + Kuru em modo automático): "travamento e instabilidade com todos acessados ao mesmo tempo".
  Teste com 4 servidores juntos no W: não mostrou lentidão; o risco real é o W: demorar ou sumir por alguns segundos.
- **A. Servidor atende vários pedidos ao mesmo tempo** (`Servidor Simulador.ps1`, até 16 atendentes): um pedido preso no W:
  não segura os outros. Medido: um "conferir pasta" no meio de 4 listas grandes levava 1,7 s → 0,02 s; com um pedido preso,
  os outros respondem em 0,03–0,1 s. O `/ping` responde sem passar pelo W:.
- **B. Tempo-limite com aviso claro** (Simulador): ler/procurar no W: espera no máximo 20 s, gravar 60 s. Passou disso →
  "NÃO salvo: O W: não respondeu em 20 s… Nada foi gravado — tente de novo" (na gravação: "confira na pasta se gravou").
  W: sem resposta não vira mais "arquivo não existe" (o "Substituir?" não é pulado) e não cai nas buscas de reserva.
- **C. Servidor se religa sozinho**: o processo vigia liga o servidor e, se ele cair, liga de novo (~3 s). Não religa se o
  "Abrir Simulador" desligou de propósito (outro servidor já responde), se a porta está ocupada ou se a versão foi apagada.
  Na tela: faixa vermelha "Servidor do Simulador desligado — religando sozinho…" (confere a cada 20 s) que some quando volta.
- **D. Kuru sem congelar** (`Kuru - fila ARGUS/filaPedidosArgus.js`): a varredura automática usa acesso ao W: que não trava
  a janela do Kuru; avisa no log se esperar o W: mais de 10 min. Botões iguais. `teste-fila.js` ganhou o teste "W: lento".
  **Quem mantém o Kuru precisa copiar o arquivo de novo** (o Kuru não baixa da main sozinho).
- Nenhum programa muda: testados os 37 perfis (iguais à main 5.86.0).
## 5.86.0 — Aviso de desenho/programa já existente + 📄 Documentos (POP-PS-001) na main (20/11/2026)
- Usuário aprovou trazer para a main as branches de teste de 17/11/2026 (`teste/duplicados` e `claude/documentos`, ajustadas à 5.85.1).
- **Já existe desenho com essas medidas** (pasta DESENHOS\<família>, folga 0,006; lista de cada família guardada 10 min):
  - ao gerar: "⚠ JÁ EXISTE desenho com essas medidas: 46025 — confira antes de salvar um novo";
  - ao salvar (programa novo): com número → OK salva um NOVO mesmo assim / Cancelar abre o existente no 🔎 Ver programa;
    sem número (desenho antigo) → pede o número do ARGUS: o programa salva com ele e a pasta do desenho ganha o número
    (servidor: `/fs/move` só renomeia dentro da mesma pasta de DESENHOS, nunca sobrescreve). Sem o servidor, avisa para renomear à mão.
  - Mantidas as mensagens da 5.70.3 ("NÃO salvo: …") quando alguma pergunta é cancelada.
- **📄 Documentos** na tela inicial: POP-PS-001 (PSA 108, PSG 101, PSH 106, PSE 106 e ciclos) embutido no Simulador + os arquivos
  da pasta `Arruela Padronizada\Documentos` do W:, se houver. O POP tem as fotos das telas: o arquivo passa de 1,35 para 2,8 MB
  (abertura medida +30 ms).
- Testes: 37 perfis geram, nenhum programa mudou; com o W: real, PSH 106 100 x 120 x 12 avisou o desenho já existente sem nº.

## 5.85.1 — Teste dos perfis: uma base por porta (20/11/2026)
- `testes\testar-perfis.ps1`: dois testes ligados ao mesmo tempo (ex.: `-Ref` diferente em outra `-Porta`) usavam o mesmo
  arquivo de base e um trocava a base do outro. Agora cada porta tem a sua (`base-8790.html`). Simulador e programas não mudam.

## 5.85.0 — Servidor mais rápido para salvar e abrir + teste dos perfis neste PC (20/11/2026)
- Pedido do usuário: "maior velocidade e desempenho e menos dúvida" (itens 1, 2 e 4 aprovados).
- **Salvar mais rápido**: o próximo número livre não lista mais a pasta Programas_CNC inteira (~50 mil arquivos, ~5 s pelo
  servidor). O servidor aceita filtro (`/fs/list?...&f=046*`) e o Simulador pede só os milhares do próximo número ("046*" e
  "047*": ~0,04 s). O "Alterar programa", quando não acha na lista guardada, também procura só "NNNNNN*". A lista inteira
  (Ver programa) ficou ~4x mais rápida (4,8 s → 1,3 s): o JSON é montado sem chamar função por arquivo. Mesmo número de antes
  (conferido: 046051 pelos dois jeitos).
- **Abrir mais rápido**: o servidor entrega a página da cópia local (o `Simulador CNC.html` ao lado do servidor, baixado pelo
  atualizador) e guarda na memória; só lê de novo se o arquivo mudar. Se a cópia do W: for mais nova (outro PC atualizou),
  serve a do W:, como antes. 1ª abertura 0,8 s → 0,08 s; funciona mesmo com o W: lento.
- **Teste dos perfis neste PC** (sem node/Playwright): `powershell -ExecutionPolicy Bypass -File testes\testar-perfis.ps1`
  abre `testes/testar-perfis.html`, que gera programa e desenho dos perfis na versão desta pasta e na main do GitHub e mostra
  quem falhou, quem mudou e a diferença linha a linha (~5 s). Opções: `-Ref <branch/commit>`, `-Base arquivo.html`, `-SemBase`.
- Programas não mudam: teste novo x main — "Todos os 37 perfis geraram programa. Nenhum programa mudou".
- Branch `teste/ferramentas` (5.70.0 de teste) apagada do GitHub: substituída pela 5.84.0.

## 5.84.0 — Ferramenta interna pelo menor Ø trabalhado e recuos do G0 por tabela (19/11/2026)
- Pedido do usuário: tirar dos programas de `Programas_CNC` (45.598 programas Fagor; época atual 025000–045999) as regras de
  ferramenta e de recuo, com prioridade abaixo de Ø40, e aplicar no Simulador.
- **Ferramenta interna pelo MENOR Ø que ela trabalha** (1º passe de desbaste / furo da bucha / acabamento), não pelo Ø final:
  PU T4D14 abaixo de Ø11 · T1D45 de 11 até 40 (só PU) · T2D12 a partir de 40 (nos programas: T2D12 só com menor Ø ≥ ~39;
  T1D45 de 11 a 39; T4D14 abaixo de ~10). PTFE/+BR/+GR/+FV, POM e PEAD: T4D4 a partir de Ø14, abaixo a D14 (T2D14).
  Externa não muda pelo Ø (T2D2 no PU desde Ø8). Ex.: PSA 108 40x60 bucha 32 → T1D45 (menor Ø 37); gaxeta 12x20 → T4D14
  (1º passe Ø8,5); 42x54 bucha 32 → T1D45; tarugo → T1D45 (1º passe Ø12,5). Campo "Ferramenta interna" digitado continua valendo.
  Gaxetas (estilo Fast Seal): gera de novo com a ferramenta certa (30° pelas costas / alcance mudam com ela). Arruelas e DP: troca
  o código. PSH 110 (ferramenta fixa no gerador): só aviso de ATENÇÃO quando não bate.
- **Recuos do G0 depois de cada passe**: folga mínima no Ø por ferramenta, material e faixa do Ø do passe (<11 · 11–21 · 21–30 ·
  30–40 · ≥40), pelas medianas dos recuos corrigidos à mão: T2D2 2 · 2 · 2,5 · 2,5 · 3; T7D7 1,5 (≥40 fora do PU: 2); T1D45
  2,5 · 3 · 3 · 3; T2D12 3,5 (≥40); T4D4 2 (≥40 fora do PU: 2,5). Recuo maior que já saía (bucha + 2, +1 do PU da 5.81.0) fica.
  Interno nunca abaixo do Ø mínimo da ferramenta (T2D12 39, T1D45 11, D14 3,5) nem, no tarugo, 1,5 abaixo do menor passe.
- **D14** (T4D14 no PU / T2D14 no PTFE, POM, PEAD — mesmo corretor "INTERNO AFIADO"): barra fina, recuo EXATO de 1 no Ø
  (0,5 nos furos pequenos, preso no Ø3,5), como nos programas corrigidos (moda 1, depois 0,5).
- Testes no navegador: os 37 perfis geram; 1032 casos (22 perfis × 12 medidas de Ø6 a Ø48 × PU/PTFE × bucha/tarugo) sem erro;
  1346 recuos mudados, nenhum ficou menor que antes (fora a D14).

## 5.83.3 — PSR 212: Ø do calcanhar interno dentro do corte A-A (19/11/2026)
- Usuário: "joga essa cota central dentro do desenho" (Ø40,54 no 40 x 48). A cota do Ø do calcanhar interno (com a tolerância)
  passa a ficar dentro do corte A-A, atravessando o furo no meio do trecho reto do calcanhar; as outras cotas de trás ficam mais juntas.
- Só o desenho do PSR 212; programas iguais (148 casos); desenho de todos os perfis gera (retrato e paisagem).

## 5.83.2 — PSR 212: alturas do desenho sem encavalar (19/11/2026)
- Usuário: "arruma essas da altura, está uma em cima da outra". As 4 cotas de altura da secção ampliada (lábio, altura menor, corpo,
  total) ficavam a 16 px uma da outra e a tolerância (0 / −0,2) batia na linha de cima; agora 26 px entre elas.
- Só o desenho do PSR 212; programas iguais. Teste no navegador: 148 programas iguais; desenho de todos os perfis gera (retrato e paisagem).

## 5.83.1 — PSR 212: desenho — só números nas alturas, secção total e secção de trás (19/11/2026)
- Usuário: "tira essas escritas" → as alturas da secção ampliada saem só com o número (sem "corpo" e "altura menor").
- "Preciso da secção total igual estava no padrão antigo": na frente, lábio ext. / abertura do canal / lábio int. em corrente e a
  secção total lábio ext. → lábio int. com a tolerância (40 x 48 x 5,5 x 7: 1,24 · 2,43 · 1,33 · 5 ±0,2).
- "Atrás a secção do diâmetro rebaixo até a ponta do lábio interno": (Ø degrau − Ø ponta int.) / 2 (ex.: (45,6 − 39) / 2 = 3,3).
  Saiu a cota "Secção 4,5" (calcanhar → ponta).
- Só o desenho do PSR 212; programas iguais.

## 5.83.0 — PSR 212: chanfro menor na altura menor + desenho no padrão novo de cotas (19/11/2026)
- Pedido do usuário: "diminui a proporção do chanfro na altura menor e atualiza o padrão de cotas e desenho que falamos mais cedo".
- Chanfro da aresta do degrau (na altura menor): metade do chanfro do perfil (mín. 0,2, de 0,05 em 0,05). Ex. 40 x 48 x 5,5 x 7:
  0,5 → 0,25 x 45° (T2D2 começa o chanfro em Z −3,95 em vez de −3,7; T6D6 entra em X48,5). Os outros chanfros iguais.
- Desenho do PSR 212 no padrão aprovado no VEDADOR 75 x 95 x 26: VISTA FRONTAL + CORTE A-A com todos os Ø (trás à esquerda, frente/
  canal à direita = Z0; tolerâncias como antes) e SECÇÃO (ampliada) só com o contorno, as alturas a partir da face (lábio, altura
  menor, corpo, altura total), o interno em cota corrida (rampa, calcanhar, lábio), profundidade e abertura do canal e a secção.
  Sem chanfros, raios nem ângulos.
- Só o PSR 212 muda (programa e desenho). Teste no navegador (148 casos): todos geram; só o PSR 212 mudou.

## 5.82.2 — PSR 212: "Altura menor" medida da face (19/11/2026)
- Usuário: "essa é a altura menor em relação à face". O campo passa a ser **"Altura menor — da face até o degrau (vazio = corpo −
  0,3 × corpo)"** (chave nova `hm`, para não ler errado valores antigos salvos): parede do degrau em Z = −(altura menor) e comprimento
  do degrau atrás = corpo − altura menor. Ex.: corpo 6,5 e altura menor 3,5 → T6D6 desce em Z −3,5 (igual ao antigo comprimento 3).
- Vazio: igual a antes (degrau 0,3 × corpo). Altura menor maior que o corpo: aviso "degrau curto demais".
- Desenho: a cota do degrau continua o comprimento atrás do corpo. Só o PSR 212.
- Teste no navegador (148 casos): todos geram; nenhum programa mudou com o campo vazio.

## 5.82.1 — PSR 212: campo "Altura menor" como a 1ª altura (19/11/2026)
- Pedido do usuário: o campo "Comprimento do degrau em Z, a partir da trás do corpo" passa a se chamar **"Altura menor — degrau,
  a partir da trás do corpo (vazio = 0,3 × corpo)"** e fica logo depois dos diâmetros, antes de "Altura do corpo".
- Mesmo valor e mesma conta de antes (chave `hs`): programa e desenho não mudam. Só o PSR 212.
- Teste no navegador (148 casos): todos geram; nenhum programa mudou.

## 5.82.0 — Itens em PU: até 6 mm no Ø para tirar = 1 passe só (19/11/2026)
- Pedido do usuário: "se for tirar pouco material nos diâmetros, até 6 mm, coloca em apenas 1 passe".
- Programas estilo Fast Seal (seções OUTSIDE / INSIDE) em PU: em cada lado, se o material a tirar no Ø for ≤ 6, saem os passes
  de desbaste e fica só o acabamento (FINISH). Externo: Ø ext. da bucha − menor Ø do acabamento externo; interno: maior Ø do
  acabamento interno − Ø int. da bucha (tarugo nunca). Ex.: PSE 106 padrão (bucha 96 x 129), interno 101,7 − 96 = 5,7 → só o
  acabamento; o externo (129 − 98,5... tira mais de 6) continua com desbaste.
- Com as medidas padrão mudam: PSE 103, 105, 106, 107; PSH 131; PSR 101, 211, 212; DUAL. Com bucha apertada também PSE 120, 127.
  Outros materiais e os perfis estilo planilha (arruelas, ISO, DH, DP...): iguais. G92 igual.
- Teste no navegador (148 casos: 37 perfis padrão / NBR / bucha apertada): todos geram; nas mudanças só saíram linhas de desbaste.

## 5.81.0 — Itens em PU: recuos do externo +1 mm e do interno −1 mm (padrão do PSR 102) (19/11/2026)
- Pedido do usuário: "nos itens em PU pode alterar para esse padrão externo e interno" (o do PSR 102, 5.80.4).
- Programas no estilo Fast Seal (seções OUTSIDE / INSIDE) com material PU: o recuo em G0 depois de cada passe (desbaste reto,
  contorno e acabamento) vai 1 mm (no Ø) mais para fora no externo e mais para dentro no interno, e o G0 de volta em Z acompanha.
  Furo no tarugo: recuo X − 0,5 → X − 1,5. Ex. PSE 106 padrão: X129,4 → X130,4 · X130 → X131 · X95,6 → X94,6 · X96,5 → X95,5.
- Mudam (em PU): PSE 102 R, 103, 105, 106, 107, 118, 120, 127; PSH 103, 105, 106, 107, 108, 110, 110 30°, 117, 121, 125, 131;
  PSR 101, 211, 212; DUAL. PSR 102 já estava assim (sem mudança). Face, canal frontal, T6D6 e corte: iguais.
- Não mudam: outros materiais (NBR, Viton, PTFE...) e os perfis no estilo planilha (arruelas, PSA/PSG, ISO, DH, DP, DHR, PSO),
  que já saem do material em G1 antes do G0.
- Teste no navegador (185 casos: 37 perfis × padrão/PU/NBR/outros): todos geram; só mudaram os X dos recuos em ±1; nenhum G0 de
  recuo fica dentro da faixa do G1 anterior.

## 5.80.4 — PSR 102: recuos do externo +1 mm e do interno −1 mm (19/11/2026)
- Pedido do usuário: "aumenta mais 1 mm no recuo do externo e menos 1 no interno" (no Ø). Ex. 120 x 138,6 x 10 x 18, bucha 101 x 142:
  - externo (T2D2): passes retos X136,4 → X137,4 e X130,4 → X131,4; contorno de desbaste X145,6 → X146,6; acabamento X143 → X144;
  - interno (T2D12): passes X106,6 → X105,6 e X112,6 → X111,6; contorno X112,6 → X111,6; acabamento X117 → X116;
    tarugo: recuo do furo X − 0,5 → X − 1,5.
- Só o PSR 102 muda (os outros perfis que usam o mesmo desbaste continuam iguais). Teste no navegador: 37 perfis geram
  programa; só o PSR 102 mudou.

## 5.80.3 — PSR 102: recuo do desbaste externo acima do caminho do G1 (19/11/2026)
- Usuário (120 x 138,6 x 10 x 14/18, PU, bucha 142): "linha verde em G1, a pontilhada em G0 — isso não pode". O contorno de
  desbaste da T2D2 sobe em G1 até X143,6 em cima do calcanhar e o recuo em G0 voltava em X142,4 (abaixo do G1, colado na bucha).
  Agora o recuo vai ao maior X do contorno (ou da bucha) + 2: `G0 X145.600 Z-18.900` / `G0 X145.600 Z3.000`.
- Só o PSR 102 muda. Teste no navegador: 37 perfis geram programa; só o PSR 102 mudou.

## 5.80.2 — PSR 102: recuo da T3D3 não passa mais em G0 por cima do lábio (19/11/2026)
- Usuário (120 x 138,6 x 10 x 18, PU, bucha 101 x 142): depois de facear o calcanhar (T3D3 em Z −8 até X129,73) o recuo era
  `G0 X129.730 Z5.000` — rápido em Z rente ao lábio (0,4 do contorno). Agora: `G1 X129.730 Z-7.800` (sai 0,2 da face),
  `G0 X139.600 Z-7.800` (acima do Ø ext. + 1) e `G0 X139.600 Z5.000`. G92 igual.
- Só o PSR 102 muda. Teste no navegador (sem Node neste PC): 37 perfis geram programa; só o PSR 102 mudou.

## 5.80.1 — Desenho não duplica mais o PDF que já existe com sufixo (19/11/2026)
- "Está duplicando os desenhos": a pasta já tinha "PSH 129 (235 X 245 X 7.9) 46359 - PU - PREPARACAO.pdf" (salvo pela impressão
  do navegador em 18/11) e o simulador, que só conferia o nome exato, gravou outro "… 46359.pdf". Agora ele acha
  "<nome> - ….pdf" na pasta, pergunta "Substituir?" e grava em cima DESSE arquivo (mesmo nome): um PDF só por desenho.
  Salvar em lote (manter o que existe) também reconhece. Regravar com o código novo usa o mesmo arquivo.
- No W: (últimos 10 dias) 23 pastas já estão com os dois PDFs; não foram mexidas.
- Programas: nenhum perfil mudou (37 perfis geram programa e desenho).

## 5.80.0 — Material novo: PTFE+FV (Teflon + fibra de vidro) (19/11/2026)
- Nas listas de material de todos os perfis (gaxetas, raspadores, arruelas, guias, DP, DH, PSE 120/102 R, PSH 110, DUAL...).
- Mesmas regras do PTFE puro / +BR / +GR: ferramentas de Teflon (T7D7 / T4D4, T2D14 abaixo de Ø14, bedame T8D8), bucha
  automática Ø int − 2 / Ø ext + 2, passe único saindo de bucha. Na linha ;MATERIAL sai "PTFE+FV". Texto livre "TEFLON + FV"
  ou "fibra de vidro" em programas antigos é reconhecido como PTFE+FV.
- Teste: 76 casos (37 perfis no padrão + cada lista de material) — padrão igual; em PTFE+FV cada perfil sai igual ao PTFE+GR
  (só o nome do material muda).

## 5.79.4 — PSA 108 e Ciclo SEM CHANFRO: ferramentas do PU e corte com a faca em PU / NBR (19/11/2026)
- Em PU (usuário escolheu "gaxetas PU com faca"): externo T2D2, interno T4D14 (Ø < 11) / T1D45 (11 a 40) / T2D12 (> 40),
  corte com a faca T5D5. Antes ficava T7D7 / T4D4 / T8D8 (PSA 108) ou T5D5 (SEM CHANFRO).
- Usuário: "PU e NBR só se corta com a T5D5" → no PSA 108 em PU, NBR e Viton (padrão do NBR) o corte é a T5D5, também com
  secção > 14,8 (antes ia para o bedame 2 T6D16 com G92 +1; agora G92 normal e espaço entre peças pelo campo do bedame).
  NBR / Viton: externo e interno continuam T7D7 / T4D4.
- PEAD, PTFE, POM, Celeron: iguais. PSA 108 C, PSG 101/103/104, PSA 109, Ciclo com chanfro e os outros perfis: iguais.
- Teste: 133 casos (37 perfis + arruelas em PU/NBR/PEAD/PTFE em 4 tamanhos) geram programa; só mudaram PSA 108 e SEM CHANFRO
  em PU/NBR.

## 5.79.3 — Ciclo arruelas SEM CHANFRO: interno já posiciona no Ø do 1º desbaste (19/11/2026)
- Igual ao PSA 108 (5.79.2): a T4D4 ia em G0 até X(Ø int da peça) a Z3 com a bucha ainda fechada e só depois para o 1º desbaste.
  Agora (34 x 40 x 2,5, bucha 13 x 46): T4D4 → G0 X19.333 Z3 → G1 Z-6 F.1. Sem desbaste interno: como antes.
- Só o SEM CHANFRO; os outros perfis iguais (teste dos 37 perfis).

## 5.79.2 — PSA 108: interno já posiciona no Ø do 1º desbaste (19/11/2026)
- PSA 108 34 x 40 x 2,5 com bucha 13 x 46: a T4D4 ia em G0 até X34 Z3 (Ø int da peça, 3 mm acima da face, com a bucha ainda
  fechada em 13) e só depois para X19.333. Agora: T4D4 → G0 X19.333 Z3 → desbaste. Perigoso em G0 tão perto da peça (usuário).
- Só o PSA 108 com desbaste interno. PSA 108 C, PSG 101/103/104, PSA 109 e os outros perfis: iguais (teste dos 37 perfis).

## 5.79.1 — Desbaste que só andava no Ø da bucha sai em TODOS os perfis (19/11/2026)
- O que foi feito no PSE 107 (5.78.1) agora vale para todos os perfis que usam o desbaste estilo Fast Seal, no externo e no
  interno: com bucha de pouco material, a passada de contorno ficava inteira no Ø da bucha (sem cortar nada), colada no
  lábio / no acabamento. Se nenhum ponto dela entra no material, ela sai; o acabamento externo ganha o F0.160.
- Com bucha Ø int − 2 / Ø ext + 2 mudam: PSE 102 R, 103, 105, 106, 107, 118, 120; PSH 103, 105, 106, 107, 108, 117, 121, 125;
  PSR 211, 212. Nas medidas padrão só o PSE 118 (interno em X96, na bucha). Com bucha normal: iguais.
- Teste: 71 casos (37 perfis no padrão + bucha apertada) geram programa; só saíram passes que não cortavam.

## 5.79.0 — Faca aproxima no mínimo 10 mm acima da peça em TODOS os perfis (19/11/2026)
- Pedido do usuário: a ferramenta de corte (faca T5D5, bedame T8D8 / T6D16) aproxima e recua no mínimo 10 (no Ø) acima do
  maior Ø da peça (lábio incluído). Quando já ficava mais longe (bucha grande, parâmetro maior), continua como antes — nunca
  chega mais perto do que chegava. Constante FACA_MIN = 10.
- Gaxetas/raspadores estilo Fast Seal (PSE/PSH 103, 105, 106, 107, 108, 117, 118, 121, 125, PSR 211/212): era Ø bucha + 0,2
  (ex.: 129,2) → maior Ø do contorno + 10 (ex.: 131,5). PSE 107 125x140x18: X150 → X151,5 (lábio em 141,5).
- PSE 102 R, PSE 120 (e anéis), PSE 127, PSH 131, PSH 110 A/B, PSR 101, PSR 102, DUAL: idem.
- Arruela ISO, PSE 108 (DP) e DHR: parâmetro "Corte: acima do Ø externo" vale no mínimo 10 (era 8).
- PSA 108, PSA 108 C, PSA 109, PSG 101/103/104, Ciclo arruelas: recuo do corte no mínimo 10 (era 4). SEM CHANFRO: posição
  do corte no mínimo 10 (era 8). Os passos do corte em G91 acompanham.
- Já ficavam a 10 ou mais (iguais): PSH 129, PSE 125, PSO 109, PSH 110 intermediária.
- Teste: 37 perfis + peças (44 casos) geram programa; só mudaram as linhas de aproximação/recuo da faca.

## 5.78.2 — PSE 107: faca aproxima 10 mm acima da peça (19/11/2026)
- Corte (T5D5 / T8D8) do PSE 107: o X de aproximação e de recuo era Ø da bucha + 0,2 (ex.: X142.2, colado no lábio).
  Agora é Ø externo da peça + 10 (ex.: 125 x 140 x 18 → X150). Bucha maior que isso: continua Ø da bucha + 0,2. G92 igual.
- Só o PSE 107 (pedido do usuário). Os outros perfis iguais (teste dos 37 perfis).

## 5.78.1 — PSE 107: sem o desbaste externo que só raspava o lábio (19/11/2026)
- PSE 107 125 x 140 x 18 com bucha 112 x 142: o desbaste externo ficava inteiro em X142 (o Ø da bucha, sem cortar nada) e passava
  a 0,27 mm (no raio) da ponta do lábio (X141,455). Agora, quando o desbaste externo não corta nada abaixo do Ø da bucha, ele sai
  do programa; o acabamento já começa com F0.160. G92 igual.
- Só o PSE 107 (pedido do usuário). Com bucha maior (ex.: 150) o desbaste continua igual; PSE 106, 118 e os outros perfis iguais.
- Teste dos perfis: 37 perfis geram programa; nenhum mudou no padrão.

## 5.78.0 — Perfis novos PSE 127 e PSH 131 na main (19/11/2026)
- PSE 127 (Fast Seal PS15P, pistão: lábio raiado por fora, canal raiado por dentro) e PSH 131 (RS15P, haste: espelhado).
- Regras dos programas do W: — ponta no meio da altura R 0,21 × secção; aperto do lábio 0,1 × secção + 0,28 no Ø; queda até a face
  0,1 × secção + 0,19; lado do canal Ø + 0,35 %, chanfros 0,3 × 45°; canal 0,5 × H de largura, 0,12 × secção de profundidade.
  Tudo em Parâmetros fixos. PSE 127 85x95x8,5 confere com o 029919 no lábio (X95.741 Z-4.413 R1.450).
- 18/11/2026: CONFERIDO NO FAST SEAL (aba V do PSE127 = PS15P e do RS15P, 40 tamanhos; diferença máx. 0,04 mm). Regras novas:
  calcanhar, ponta do lábio, lado do canal (±0,3 % + 0,013 × secção), canal 0,569 × altura, profundidade pela altura da peça (< 8)
  ou pela secção (≥ 8). Campo novo "Medidas do alojamento?" (Sim = altura menor como o METAL DIM do FSC: 8,5 → 8,19).
  Desenho como o do Fast Seal (PDFs 46216 e 46322): faixa reta ao lado do canal, chanfro 0,3 × 45°, ângulo do lábio (79° no
  108,03x116,3x7,2, tangente ao raio da ponta), na SECÇÃO a profundidade do canal e o lábio até o fundo; tolerância da altura ±0,1
  abaixo de 6 e ±0,2 de 6 para cima (como no FSC); com medida de peça (alojamento = Não) só para menos: 0 / −0,1 ou 0 / −0,2.
  Cotagem pela NBR 10126 / ISO 129 (pedido do usuário): DIÂMETROS só com os 4 Ø e o H — Ø do lábio e do calcanhar do lado do
  lábio, Ø do lado do canal e do fundo do lado do canal, nenhuma linha atravessando a peça, a menor perto da peça e o H por fora;
  largura do canal, faixa, chanfro e ângulo só na SECÇÃO (cota uma vez só); profundidade do canal dentro do canal e sem a cota
  lábio–fundo (cadeia fechada).
  Espessura das linhas pela NBR 8403 (só PSE 127 / PSH 131): contorno da peça 0,6 mm, linhas de cota e de chamada 0,25 mm.
  Cotas pela NBR 10126: tolerância com as mesmas casas da cota (H 8,19 ±0,20; 0/−0,20) e cotas paralelas a 10 mm da peça e
  7 mm entre si (mm de papel).
  Tabelas em `Claude contexto/fsc-ps15p-rs15p-medidas.md`. Continua com ATENÇÃO "perfil novo em teste". Os outros 34 perfis iguais.
- roughPasses: arco com raio próprio (it.R); os outros perfis não mudam (34 iguais).
- Liberado na main em 19/11/2026 (aprovado pelo usuário), junto com tudo da 5.72 à 5.77.

## 5.77.1 — Ciclo arruelas SEM CHANFRO: sem a volta em rápido abaixo da bucha depois do desbaste (19/11/2026)
- Mesmo problema corrigido no PSA 108 (5.76.1): depois do desbaste externo o programa ia em G0 até X(Ø int − 2,7) e subia
  de novo em G91 até o Ø ext. Agora o desbaste termina direto no Ø ext (ex.: 101,6 x 114,14 bucha 91 x 125: G0 X114.14).
- O desbaste em Z já parava no mesmo Z do acabamento (folga) — não mudou. Sem desbaste: igual.
- Teste dos perfis: 35 perfis geram programa; nenhum mudou no padrão; só os casos com desbaste externo do SEM CHANFRO.

## 5.77.0 — PSE 108 (DP): campos de BUCHA (19/11/2026)
- Campos novos "Bucha Ø interno" e "Bucha Ø externo" (só DP). Vazio = automática como nas arruelas (PU pela tabela de buchas;
  Teflon Ø int − 2 / Ø ext + 2); o campo mostra a sugestão.
- Com bucha: linha ;BUCHA, faceamento do maior Ø ext + sobra até o menor Ø int − sobra, rotação pelo maior Ø e desbaste
  (máx. 8 no Ø, acabamento 2) no externo e no interno até o fim do acabamento em Z. Teflon saindo de bucha: passe único.
- Ex.: DP 60 x 67 x 7 em PU com bucha 50 x 80 → face X84 a X46, desbaste externo X74,5 e X69, interno X58, até Z-8.
- Arruela ISO e os outros perfis: iguais (teste dos 35 perfis sem mudança no padrão).

## 5.76.2 — PSH 129 (DH): T2D2 volta em G0 antes do desbaste (19/11/2026)
- Na 5.76.0 o PU passou a facear com a T3D3 e trocar para a T2D2 em Z100; o 1º passe do desbaste externo (ex.: G01 Z-5 F0.15)
  descia em G1 desde o Z100. Agora, depois da troca, vai em G0 até X(Ø ext + sobra) Z3 e só então desbasta.
- Só o PSH 129 em PU (com T3D3). Teste dos perfis: 35 perfis geram programa; só o PSH 129 mudou (1 linha a mais).

## 5.76.1 — PSA 108: sem a volta em rápido até X88.3 depois do desbaste (19/11/2026)
- Programa 46341 (bucha 91 x 125): depois do desbaste externo o programa ia em G0 até X88.3 (Ø int da bucha − 2,7) e
  subia de novo com G91 X24.49 até o início do perfil. Agora o desbaste termina direto no início do perfil: G0 X112.79 / G91 / G1 Z-2.525.
- Só o PSA 108 com desbaste externo. Sem desbaste, PSA 108 C/ CORTE, PSG 101/103/104 e PSA 109: iguais.
- Teste dos perfis: 35 perfis geram programa; nenhum mudou no padrão; só o caso 46341 mudou.

## 5.76.0 — PSH 129 (DH): ferramentas trocam com o material (regra das gaxetas, igual ao DP) (19/11/2026)
- Antes o DH usava a regra das arruelas: só o Celeron trocava, o resto ficava com T7D7 / T4D4 / T8D8. Agora (usuário: "PU diferente"),
  a mesma regra que o PSE 108 (DP) ganhou na 5.75.2:
  - PU: face T3D3 · externo T2D2 · interno T4D14 (Ø < 11), T1D45 (11 a 40), T2D12 (> 40) · corte T5D5 F0.22
  - NBR e Viton: T7D7 / T4D4 / corte T5D5 F0.22
  - PTFE puro, PTFE+BR, PTFE+GR: T7D7 / T4D4 (T2D14 abaixo de Ø14) / bedame T8D8
  - POM, PEAD e Celeron: como antes (Celeron T2D54 / T2D64 / T6D16)
- Ferramenta trocada à mão nos parâmetros continua valendo. G92 / RPT iguais.
- Teste dos perfis: 35 perfis geram programa; só o PSH 129 mudou.

## 5.75.2 — PSE 108 (DP): ferramentas trocam com o material (regra das gaxetas) (19/11/2026)
- Antes o DP usava a regra das arruelas: quase todo material ficava com T7D7 / T4D4 / T8D8. Agora (usuário escolheu a regra das gaxetas):
  - PU: externo T2D2 · interno T4D14 (Ø < 11), T1D45 (11 a 40), T2D12 (> 40) · corte T5D5 F0.22
  - NBR e Viton: T7D7 / T4D4 / corte T5D5 F0.22
  - PTFE puro, PTFE+BR, PTFE+GR: T7D7 / T4D4 (T2D14 abaixo de Ø14) / bedame T8D8
  - POM, PEAD e Celeron: como nas arruelas (Celeron T2D54 / T2D64 / T6D16)
- Ferramenta trocada à mão nos parâmetros continua valendo. Arruela ISO continua igual.
- Teste dos perfis: 35 perfis geram programa; nenhum mudou com os valores padrão.

## 5.75.1 — PSA 108: desbaste não passa do fim do acabamento em Z (19/11/2026)
- Programa 46341 (PSA 108 101,6 x 114,14 x 2, PEAD, bucha 91,6 x 120): o desbaste externo e o interno desciam até Z-3,55,
  0,475 (o prolongamento) além do fim do acabamento (Z-3,075). No simulador parecia um 2º faceamento fora da peça.
  Agora o desbaste para no mesmo Z do acabamento: −(N × altura com prolongamentos + paralelo − prolongamento).
- Só o PSA 108. PSA 108 C/ CORTE, PSG 101/103/104 e PSA 109 (mesmo gerador) continuam iguais; com bedame 2 (Celeron), como antes.
- Teste dos perfis: 35 perfis geram programa; só o PSA 108 mudou (só as linhas G1 Z do desbaste).

## 5.75.0 — Carimbo com ASSINATURA preenchida; PSE 108 (DP) com material (19/11/2026)
- Carimbo do desenho: "ASS." virou "ASSINATURA" por extenso e já sai com o nome de quem desenhou e de quem aprovou em letra
  de assinatura (azul) — não precisa assinar à mão. Nome comprido diminui para caber na coluna.
- PSE 108 (DP): campo novo "Material — só PSE 108 (DP)", com a mesma lista e ferramentas das arruelas (linha ;MATERIAL;
  Celeron T2D54/T2D64/T6D16; T2D14 no interno abaixo de Ø14 em PTFE/POM/PEAD). O material vai também no desenho.
  A Arruela ISO (mesmo gerador) continua igual: programa e desenho sem material, como antes.
- Teste dos perfis: 35 perfis geram programa; nenhum mudou com os valores padrão.

## 5.74.0 — PSA 108: chanfro sugerido pela secção também (18/11/2026)
- PSA 108 e PSA 108 C/ CORTE: chanfro sugerido (externo 45° e interno 30°) era só 10 % da altura e ficava grande na secção fina.
  Agora = o menor entre 10 % da altura e 15 % da secção, de 0,2 a 1 mm, arredondado em 0,1 (nunca maior que antes).
  Ex.: 100x104x8 de 0,8 para 0,3; 50x53x5 de 0,5 para 0,2; 40x60x8 continua 0,8. Chanfro digitado no campo continua valendo.
- Só o PSA 108 e o PSA 108 C/ CORTE mudam (PSA 109, PSG e todos os outros perfis saem iguais).

## 5.73.2 — PSR 212: sem o chanfro interno da ponta (18/11/2026)
- PSR 212: igual ao PSR 211 (5.73.1) — tirado o chanfro do interno na ponta do raspador (era 0,5 a 45°), no programa e no desenho;
  saiu também o campo "Raspador: chanfro da ponta". G92 igual. Os chanfros do degrau externo continuam.
- Só o PSR 212 muda (todos os outros perfis saem iguais).

## 5.73.1 — PSR 211: sem o chanfro interno da ponta (18/11/2026)
- PSR 211: tirado o chanfro do interno na ponta do raspador (0,2 a 0,4 a 30°), no programa e no desenho — o interno desce pela
  rampa até o Ø da ponta e segue reto. G92 igual. PSR 212 continua com o campo do chanfro da ponta.
- Só o PSR 211 muda (todos os outros perfis saem iguais).

## 5.73.0 — Perfil novo PSA 108 C/ CORTE (18/11/2026)
- PSA 108 C/ CORTE (aba Arruelas): o PSA 108 (mesmo programa e desbaste em etapas) com o corte em ângulo do PSG 101 — campo do
  ângulo (30 · 45 · 60°), serra 1,8 no acabamento, POM e Celeron usinados 0,9 maiores nos Ø, comentário do corte no programa
  (`%PSA108C …`), vista "CORTE DA ARRUELA" e nota do corte no desenho. Pasta do desenho: DESENHOS\PSA 108\PSA 108 C CORTE (…).
- O PSA 108 e os outros perfis não mudam (238 programas de teste iguais).

## 5.72.1 — PSR 211 e PSR 212: externo sempre 2 mm além da peça (18/11/2026)
- PSR 211 e PSR 212 (os perfis da T6D6): desbaste e acabamento externos vão até Z −(altura + 2) no mínimo, em qualquer material.
  O campo "Largura do bedame do canal de trás" (chave `bed`) aparecia com 1 — o mesmo nome do bedame das arruelas — e o externo
  parava em altura + 1 (ex.: PSR 211 20 x 25 x 4 x 5 parava em Z −6, agora Z −7). Bedame maior que 2 continua valendo.
- Só esses dois perfis mudam: conferido em 34 perfis × 6 variações (os outros saem iguais).

## 5.72.0 — PSG 101: opção sem corte (18/11/2026)
- PSG 101 (guia): campo **Corte da guia** (Com corte / Sem corte), igual ao PSG 103/104. Sem corte = sem serra, sem o acréscimo
  de 0,9 nos Ø (POM/Celeron), cabeçalho `;PSG 101 (GUIA) - PECA SEM CORTE`, desenho sem a vista do corte e nota "Sem corte".
- Com corte (padrão) o programa sai igual ao de antes (conferido POM, PU, Celeron e PEAD). PSG 103/104: sem mudança (o campo vem do 101).

## 5.71.0 — Desenho do programa entra no cadastro do item (ARGUS) + PSH 107 E 46356 (18/11/2026)
- Desenho do programa (📐): o Imprimir / PDF pergunta o Cód. interno, salva o PDF em DESENHOS e grava o pedido ARGUS
  (Anexo 1 + programa) — antes só pelo 💾 Salvar no W: e só se o Cód. interno fosse digitado ali. O 💾 Salvar no W: também
  aparece no desenho do programa reconhecido como perfil padrão. Desenho do 3D e perfis padrão: sem mudança.
- `Programas avulsos/PSH 107 E (16 X 26 X 5.6) 46356/`: peça do STL do Inventor em UHMW (= PEAD), bucha 12 x 35. Programa no padrão do
  PSH 107 (T3D3 · canal frontal reto 2,9 x 3,2 com o bedame T1D86 · T2D14 · T7D7 · T8D8) e desenho na folha Parts Seals pelo
  "Desenho do 3D", invertido (face do canal à direita = Z0 do programa) e com a cota da abertura do canal.
- Geradores de programa não mudam.

## 5.70.4 — PSE 102 R: Cód. interno uma vez só (18/11/2026)
- PSE 102 R: a gaxeta (U) e o anel de apoio (A) usam o mesmo Cód. interno; ao salvar o anel ele não pergunta de novo.
- Programas não mudam (34 perfis iguais).

## 5.70.3 — Salvar: diz por que não salvou (18/11/2026)
- Salvar programa: se o número, o Cód. interno ou "Quem desenhou?" for cancelado (ou o arquivo já existir e não for substituído),
  aparece "NÃO salvo: …" com o motivo, em vez de ficar parado em "Procurando o próximo número livre…" (visto no PSE 102 R peça A).
- Programas não mudam (34 perfis iguais).

## 5.70.2 — DUAL SEAL na aba Estáticos; cards de perfil só com o código (18/11/2026)
- Escolha do perfil: DUAL SEAL saiu da aba "Simétricos" (removida) e foi para "Estáticos", junto do PSO 109.
- Cards de perfil mostram só o código, sem a descrição embaixo.
- Programas não mudam (34 perfis iguais).

## 5.70.1 — Tela inicial: hora/data e pesquisa; topo sem o cabeçalho (17/11/2026)
- Tela inicial: **hora e data** no canto direito (atualiza sozinha) e **barra de pesquisa** (perfil pelo código ou descrição,
  atalho, ou nº do programa → Ver programa; Enter abre o 1º resultado, Esc limpa; sem acento / maiúscula).
- Topo: saiu a linha do cabeçalho do programa embaixo do título (escondida).
- Programas não mudam (34 perfis iguais).

## 5.70.0 — Tela inicial, tema escuro, passo a passo; PSH 138 (DHR); ajustes do Dual Seal (17/11/2026)
- **Tela inicial** (abre depois do login; botão 🏠 Início no topo): atalhos Novo programa, Ver programa, Alterar programa,
  Pastilhas, Abrir arquivo, Desenho do programa, Histórico, Ferramentas + perfis por família com descrição curta (PROF_DESC).
- **Tema escuro** (botão 🌙/☀️, lembra a escolha; 1ª vez segue o Windows) e acabamento mais limpo (sombras, foco, logo).
  A folha do desenho e a impressão continuam brancas; o canvas da simulação usa as cores do tema (--canvas-*).
- **Passo a passo** no gerador: Perfil → Medidas → Simulação → Desenho → Salvar (clicar leva ao passo; feito = verde).
- Topo: saíram "Colar programa" e "Exemplo" (escondidos).
- **PSH 124 (DHR) → PSH 138 (DHR)** (nome, quadro e pasta DESENHOS\PSH 138 (DHR), que é a do W:).
- DUAL SEAL: nome curto, miniatura vermelha, altura 0/−0,2 (Tudo alojamento ±0,2).
- Programas não mudam (34 perfis iguais).

## 5.69.0 — Perfil novo DUAL SEAL (S03) (17/11/2026)
- Pedido do usuário: **DUAL SEAL** (base Fast Seal S03), grupo novo "Simétricos" na janela de perfis. Dois lábios por fora e dois
  por dentro: lábios a H/4 e 3H/4, vales na face, no meio e atrás; altura dos lábios no raio 0,1 × secção + 0,23 (tirado dos 49
  programas S03 do W:; 037806 100x110x8 confere: 110,72 / 109,26 / 99,28 / 100,74). Secção ±0,1, altura ±0,2.
- Campo **Medidas** (3 opções): Padrão (Ø de haste/alojamento — lábios com aperto —, altura da peça) · Medidas da peça (pontas
  dos lábios no Ø digitado, altura igual) · Tudo alojamento (Ø como o padrão, altura −10 %, máx. 0,7 mm até H10; acima a regra das gaxetas).
- Programa como o Fast Seal (`%S03`): FACING DOWNWARD T3D3, OUTSIDE T2D2, INSIDE (T4D14 < Ø11, T1D45 até Ø40, T2D12), CUTTING T5D5;
  bucha automática, tarugo, PTFE, G92 = 15 + Z mais fundo + 0,15. Lábio interno limitado a 30° para T1D45/T4D14/T4D4 pelas costas (ATENÇÃO).
- Desenho DIÂMETROS + SECÇÃO; pasta DESENHOS\DUAL SEAL\DUAL SEAL (I X O X H) nº. Os outros 33 perfis não mudaram.
- A regra nova das ferramentas internas (T2D12 só de Ø40 para cima etc.) fica em versão de teste separada, ainda não publicada.

## 5.68.0 — Controle de pastilhas (17/11/2026)
- Pedido do usuário: botão **🧰 Pastilhas** (ao lado do 🔎 Ver programa) — estoque das pastilhas/insertos com baixa manual.
  Cadastro (código, descrição, ferramentas que usam, local, saldo, mínimo), **Baixa** (qtd, máquina, motivo, obs., usuário
  logado; não deixa baixar mais que o saldo), **Entrada** (qtd, NF/obs.), ✎ editar/ajustar saldo (vira "ajuste" no histórico),
  excluir (histórico fica). Saldo ≤ mínimo: linha vermelha "⚠ comprar" e contador no botão. Histórico com busca; Exportar (CSV/Excel).
- Dados em `W:\...\Arruela Padronizada\pastilhas.json` pelo servidor (o mesmo para todos os PCs, como o usuarios.json);
  cada operação relê o arquivo antes de gravar. Sem W: fica no navegador, com aviso. `pastilhas.json` no .gitignore.
- Programas e desenhos não mudam (33 perfis iguais).

## 5.67.2 — PSR 211: Ø da ponta é a 1ª cota de trás (17/11/2026)
- Desenho do PSR 211 (vista DIÂMETROS): a cota do Ø da ponta do raspador (lábio int., com tolerância) passa a ser a primeira
  do lado de trás, encostada na peça; as outras (calcanhar int., ponta ext., raiz, Ø ext.) andam uma casa para fora.
- PSR 212 e programas sem mudança (33 perfis geraram, nenhum programa mudou).

## 5.67.1 — PSR 211: chanfro de trás a 30° e desenho sem cotas de chanfro (17/11/2026)
- Pedido do usuário (19,05x25,4x4,4x7): o chanfro da ponta do raspador (atrás, interno) é cortado pelas costas da T1D45 —
  agora a **30° com o eixo** (antes 45°), tamanho no raio **0,1 × secção, entre 0,2 e 0,4** (antes 0,5). Chanfro só de estética:
  o campo "Raspador: chanfro da ponta" saiu do PSR 211 (sempre automático).
- Desenho do PSR 211: sem as cotas de chanfro (lábios, corpo e ponta).
- PSR 212 não muda (continua 0,5 a 45°, com o campo). 33 perfis geraram; só o PSR 211 mudou de programa.

## 5.67.0 — Material PTFE+GR (17/11/2026)
- Pedido do usuário: **PTFE+GR** (PTFE com grafite) na lista de materiais das gaxetas/raspadores, das arruelas/guias e do
  anel de apoio (PSE 120 / PSE 102 R). Mesmas regras e ferramentas do PTFE puro e do PTFE+BR (T3D3, T7D7, T4D4 —
  T2D14 abaixo de Ø14 —, T8D8; bucha com 2 mm de sobremetal; passe único saindo de bucha). Linha `;MATERIAL: PTFE+GR`.
- `Claude contexto/Rotina/gerar.ps1` reconhece "PTFE+GR" no desenho. Programas dos outros materiais não mudam (33 perfis iguais).

## 5.66.8 — VEDADOR 10 X 16 X 6 (46310): secção ampliada só com alturas e secção (17/11/2026)
- Usuário: "não precisa cotar os raios e chanfros, preciso apenas das alturas dos rebaixos e secções igual já fazemos".
  Secção ampliada: largura 6, alturas do externo em cota corrida (0,8 · 1,5 · 2,2 · 1,5), do interno (1,5 · 3 · 1,5),
  profundidade dos canais das faces (0,9 e 1,4) e Secção 3,55. Sem raios, chanfros nem ângulos. Só este desenho.

## 5.66.7 — VEDADOR 10 X 16 X 6 (46310): desenho com os Ø só no corte A-A (17/11/2026)
- Usuário: "ficou muito poluído, colocar os diâmetros só na parte de cima". Os 10 Ø (cada canal e degrau) vão no
  corte A-A, 5 de cada lado; a secção ampliada fica só com larguras, chanfros, ângulos e raios. Só este desenho
  (`gerar_desenho.js` da pasta); o Desenho do 3D do Simulador não muda.

## 5.66.6 — VEDADOR 10 X 16 X 6 (46310): desenho (17/11/2026)
- Desenho do 3D em PDF na pasta do programa (`VEDADOR (9.606 X 16.706 X 6) 46310.pdf`): programa 46310, PU, frente da
  usinagem (canal fundo e aresta Ø16,706) à direita. Simulador não muda.

## 5.66.5 — VEDADOR 10 X 16 X 6 (46310): peça desvirada (17/11/2026)
- Usuário: "fez ao contrário". A frente (OP1) agora é a face do canal fundo (1,4) e da aresta Ø16,706; o lábio Ø14,988 e o
  canal de 0,9 ficam atrás e vão na OP2. Canal externo Ø14,088 passa para Z −3,7 a −5,2. Simulador não muda.

## 5.66.4 — VEDADOR 10 X 16 X 6: programa 46310 (17/11/2026)
- Pedido do usuário (STL do Inventor): `Programas avulsos/VEDADOR (10 X 16 X 6) 46310/` com `046310.PIT` (OP1) e
  `046310 OP2.PIT` (peça virada: face de trás + canal de trás) + MCS 500 (`46310.txt`, `46310 OP2.txt`). PU, tarugo Ø20.
- Canais das faces com ferramenta de forma: T4D92 / T4D93 provisórios (confirmar T/D). Simulador não muda.

## 5.66.3 — PSE 102 R: altura do anel de apoio para menos e lista de materiais (16/11/2026)
- Desenho do PSE 102 R: a altura do anel de apoio sai com tolerância para menos (0/−0,1) nas chamadas do anel, nas duas vistas
  (como no PSE 120).
- "Material do anel" do PSE 102 R virou lista, igual à do PSE 120: PTFE puro, PTFE+BR, POM, PEAD, PU, NBR, Viton e Celeron;
  ferramentas e tubo seguem o material como nas arruelas. Com PTFE (padrão) o programa do anel continua igual.
- A gaxeta e os outros perfis sem mudança.

## 5.66.2 — PSE 102 R: anel de apoio com o mesmo Ø externo do corpo da gaxeta (16/11/2026)
- O Ø externo do anel de apoio agora é o Ø do corpo da gaxeta (Ø ext. − folga externa), antes Ø ext. − 0,3 (− 0,2 até Ø100)
  como no Fast Seal. Ex.: 121,2 x 133,8 x 9 → anel Ø128,26 x Ø133,17 x 2 (antes Ø133,50); no desenho o anel fica 2,45 de
  espessura para o degrau de 2,52 (a diferença é a folga do Ø interno do anel, degrau + 0,1 %).
- Muda o desenho do PSE 102 R e o programa do anel (peça A); a gaxeta e os outros perfis sem mudança.

## 5.66.1 — PSE 120: um desenho para as duas peças e paralelo de 0,6 no fim do externo (16/11/2026)
- Desenho: um só para o ANEL GT e o anel de apoio (o do conjunto). A peça A não tem mais desenho próprio; a altura do anel de
  apoio aparece com tolerância para menos no desenho do conjunto: "anel de apoio Ø... x Ø... x 2,00 0/−0,1 (2x)" nas duas vistas.
- ANEL GT: o externo (T2D2) termina com um paralelo (reta) de 0,6 no fim do perfil, já fora da peça — a descida a 45° de
  trás para 0,6 antes do fim (altura + 2). Ex.: 83,5 x 96 x 7 → G1 X89,674 Z-8,4 / G1 X89,674 Z-9.
- Programa do anel (A), o PSE 102 R e os outros perfis sem mudança.

## 5.66.0 — PSE 120: anel de apoio com desenho próprio, altura para menos e mais materiais (16/11/2026)
- Só o PSE 120 (usuário: os outros ficam como estão). Peça A (anel de apoio) do PSE 120: o desenho agora é do ANEL (Corte A-A + Detalhe B, como as arruelas), com
  as medidas do anel (Ø int., Ø ext., largura = H) e a altura para menos: H 0/−0,1 quando o campo de tolerância da altura está
  vazio. Chanfros cotados (45° no externo e na frente do interno, 30° atrás no interno). O ANEL GT continua com o desenho do
  conjunto.
- "Material do anel" virou lista com os materiais das arruelas: PTFE puro, PTFE+BR, POM, PEAD, PU, NBR, Viton e Celeron.
  As ferramentas seguem o material como nas arruelas (Celeron: T2D54 / T2D64 / T6D16; os outros T7D7 / T4D4, corte T8D8;
  T2D14 no interno abaixo de Ø14 em PTFE, POM e PEAD). Tubo: PU pela lista de buchas; os outros sob medida (−2 / +2 no Ø).
- Com PTFE (padrão) o programa do anel continua igual. O PSE 102 R (gaxeta e anel, campo de material em texto) e os outros
  perfis sem mudança (33 perfis).

## 5.65.1 — PSE 120: peça principal se chama "ANEL GT" (16/11/2026)
- No campo "Peça do conjunto" do PSE 120 a peça principal aparece como "ANEL GT" (antes "GAXETA (U)"). O anel de apoio
  continua "ANEL DE APOIO (A)". Só o nome mudou: programas, desenhos e o número ao salvar iguais (33 perfis).
  O PSE 102 R continua com "GAXETA (U)".

## 5.65.0 — Perfil novo: PSE 120 (16/11/2026)
- Gerador "PSE 120" (base Fast Seal PS16P; nome só "PSE 120" na escolha do perfil) no grupo Pistão, com "Peça do conjunto": GAXETA (U) ou ANEL DE APOIO (A).
- Regras tiradas do acabamento REAL dos programas PS16P (a passada manual com G42 que os operadores põem depois do contorno do
  Fast Seal): lábio = bulbo de raio R (0,214 × altura) no meio da altura com retas a 45° tangentes; topo Ø ext. + 0,9 / 1,1 / 1,5
  (até Ø40 / Ø100 / acima); assentos dos anéis com largura (H − 2R) / 2 e Ø = Ø int. + 0,8 × secção; interno com chanfro
  0,08 × secção a 45° na frente e 30° atrás. Programa: face T3D3, externo T2D2, interno, "OUTSIDE 2" T6D6 no assento de trás,
  corte T5D5; externo até a altura + 2 (bedame). Conferido com o 045740: interno igual (Z −0,9 a −6,9) e a mesma forma da passada G42.
- Como o usuário avisou, o desenho tem leve diferença do Fast Seal: segue o programa (canto vivo na raiz do lábio, onde o
  desenho do Fast Seal mostra R0,63). Anéis de apoio desenhados nos dois assentos.
- Peça A: anel de apoio em PTFE (2 por conjunto), Ø int. = assento + 0,1, Ø ext. = Ø ext., largura do assento, chanfros 0,2
  (como o 045740A; externo igual). Salva com o mesmo número + "A".
- O programa do anel (PSE 102 R e PSE 120) agora é uma função só (fscRingBuild); o anel do PSE 102 R continua igual.
- Imagem da escolha do perfil com os dois anéis de apoio (como a do PSE 102 R).
- Os outros 32 perfis geram os mesmos programas, desenhos e imagens de antes.

## 5.64.5 — PSE 102 R: anel da imagem de escolha alinhado (16/11/2026)
- O anel de apoio no quadro do PSE 102 R ficava com folga e mais alto que a gaxeta. Agora fica encaixado no degrau, com a
  mesma largura e o topo alinhado com o corpo, contorno igual ao da gaxeta. Programas iguais (32 perfis).

## 5.64.4 — PSE 102 R: imagem da escolha com o anel de apoio (16/11/2026)
- O quadro do PSE 102 R na janela "Escolha o perfil" mostrava só a gaxeta. Agora mostra também o anel de apoio (arruela,
  em branco) no degrau de trás. Programas iguais (32 perfis).

## 5.64.3 — PSE 102 R: nome só "PSE 102 R" (16/11/2026)
- Na escolha do perfil o nome aparecia "PSE 102 R (U com degrau para o anel de apoio)". Agora fica só "PSE 102 R".
  Programas iguais (32 perfis).

## 5.64.2 — Arruela ISO: tolerância da altura para menos (16/11/2026)
- Arruela ISO: com o campo de tolerância da altura vazio, o desenho sai com H 0/−0,1 (para menos, como PSA 108 e DP).
  Digitado no campo continua valendo. Só a Arruela ISO muda (o PSE 108 / DP continua 0/−0,1 como antes); programas iguais (32 perfis).

## 5.64.1 — PSE 102 R: externo da gaxeta vai até 2 além da altura (16/11/2026)
- Gaxeta (U) do PSE 102 R: o desbaste e o acabamento do externo (T2D2) agora descem até a altura + 2 (antes + 1), porque o
  bedame do corte, que faz o canal atrás da peça, tem 2 de largura. Ex.: altura 9 → externo até Z-11,4 (antes Z-10,4).
  O intervalo entre peças (G92) sobe 1 mm junto (25,55 → 26,55 no exemplo 114 × 142 × 9 do teste).
- Anel de apoio (A) e os outros 31 perfis geram os mesmos programas de antes.

## 5.64.0 — PSE 102 R: programa do anel de apoio (peça A) (16/11/2026)
- Campo "Peça do conjunto" no PSE 102 R: GAXETA (U) ou ANEL DE APOIO (A). A peça A gera o programa do anel em PTFE (campo
  "Material do anel"), como os programas "NNNNNNA" do Fast Seal (PS05P-2): face e externo T7D7, interno T4D4, corte T8D8 na
  largura do anel; medidas do anel = as do desenho do conjunto (Ø int. = degrau + 0,1 %, Ø ext. = Ø ext. − 0,2 / 0,3).
- Chanfros proporcionais à espessura t do anel, tirados dos anéis 045617A / 045639A / 045626A: externo 45° 0,042 × t (frente e
  trás), interno 45° 0,105 × t na frente, interno de trás a 30° com o eixo 0,063 × t em Z. Conferido com o 045639A: interno e
  externo a menos de 0,05 mm.
- Salvar: a gaxeta salva com o número normal e o anel com o MESMO número + "A" (ex.: 045639 e 045639A); o desenho do anel vai
  na mesma pasta como "…A.pdf" (como no PSH 110).
- Os outros perfis e a gaxeta (U) do PSE 102 R geram os mesmos programas e desenhos de antes.

## 5.63.0 — Perfil novo: PSE 102 R (U de pistão com degrau para o anel de apoio) (16/11/2026)
- Gerador "PSE 102 R" (base Fast Seal PS05P) no grupo Pistão: entradas Ø int., Ø ext. e altura; opcionais largura do anel
  (comprimento do degrau) e Ø do degrau. Regras tiradas de 195 programas PS05P do Programas_CNC e dos desenhos do Fast Seal
  (DESENHOS\PSE 102 R): apertos 1,5 / 1,5 no Ø; folga externa 0,25 + 0,06 × secção; lábio externo recuado 0,11 × secção com
  chanfro a 52° com o eixo; lábios com secção/2; canal assimétrico com fundo no Ø médio, prof. secção/2, R 0,08 × secção
  (mín. 0,5); degrau do anel Ø int. + 1,1 × secção, largura 1,5 / 2 / 2,5 / 3 pela secção, feito pela T6D6
  (";( OUTSIDE HAMMER GROOVE )" como no Fast Seal); chanfro interno de trás 45° 0,5 (secção ≥ 7,5: 0,8).
- Conferido com o 045639 (121,2 × 133,8 × 9): externo, interno e canal a menos de 0,1 mm do programa do Fast Seal.
  Desenho no padrão PSE (Diâmetros + Secção) com o anel de apoio desenhado no degrau, como no Fast Seal.
- Os outros 31 perfis geram os mesmos programas e desenhos de antes.

## 5.62.0 — Login: usuários só no W:, iguais em todos os computadores (16/11/2026)
- A tela "Primeiro acesso" dizia "Sem acesso ao W: os usuários ficam só neste computador", parecendo que cada PC tinha os
  seus usuários. Agora os usuários ficam só no W: (`PADRONIZAÇÃO\Arruela Padronizada\usuarios.json`) e valem em qualquer
  computador. Sem W:, o Simulador não cria mais administrador local: avisa que não encontrou o W:, oferece
  "🔓 Ligar a pasta PROJETOS do W:" (fora do servidor) e "Tentar de novo". Cadastrar/trocar senha sem W: avisa que nada foi
  gravado. Programas iguais (31 perfis).

## 5.61.2 — Desenho do programa: Programa Nº do programa aberto (16/11/2026)
- 📐 Desenho do programa saía com o Programa Nº (e o Cód. interno) da peça anterior (ex.: programa 726 com "27077"). Agora o
  número vem do programa aberto (nome do arquivo) e o Cód. interno da peça anterior é apagado; a folha da tela e a da
  impressão são atualizadas juntas. Programas iguais (31 perfis).

## 5.61.1 — Material do desenho segue o perfil (PSG 101 em PEAD saía PTFE+BR) (16/11/2026)
- O campo MATERIAL do cabeçalho do desenho vale mais que o material do perfil e ficava guardado de uma peça para outra (até
  depois de fechar o Simulador): um "PTFE+BR" digitado uma vez ia em todos os desenhos. Agora é apagado ao trocar o material do
  perfil ou o perfil; digitado depois, vale só para aquela peça. Na 1ª abertura desta versão ele é limpo uma vez.
- Programas iguais (31 perfis); só o material do desenho.

## 5.61.0 — 📐 Desenho do programa (testado pelo usuário na cópia de teste) (16/11/2026)
- Botão "📐 Desenho do programa": digita o número → procura no Programas_CNC (como o ✏️ Alterar programa) → abre no
  simulador → folha de desenho com cotas. Em branco = programa aberto na tela. Para peças sem perfil padrão.
- Peça = material que sobra da 1ª volta do programa (externa tira de fora, interna de dentro, de face pela frente, bedame
  solta a peça). Desenho virado como na usinagem (frente à direita).
- Janela "Desenho do programa": pede o MATERIAL (sugere o ;MATERIAL do programa) e as TOLERÂNCIAS do perfil padrão mais
  parecido (compara o formato; dá para trocar ou "sem tolerância"). Se for PSH 129, oferece o desenho padrão do PSH 129 com as
  medidas tiradas do programa (mostra a diferença, ex.: chanfro a mais).
- Cotas: Ø ext./int. só no corte A-A com tolerância; cota da secção com tolerância; detalhes do lado de fora cotados em cima e
  os de dentro embaixo; canal cotado pela profundidade.
- Não muda nada dos perfis padrão nem do desenho do 3D (31 programas iguais; teste do 3D ok).

## 5.60.1 — PSG 101: chanfro sugerido com 15 % da secção (16/11/2026)
- Usuário achou grande o 0,8 do Ø100 x Ø108 x 9,7 e escolheu 0,6: a sugestão passa a ser o menor entre 10 % da altura e
  **15 %** da secção (era 20 %), de 0,2 a no máximo 1 mm. Ex.: 100x108x9,7 → 0,6; 50x55x9,7 → 0,4; 60x70x15 → 0,8; 80x84x9,7 → 0,3.
- Só o PSG 101 muda; os outros 30 perfis geram o mesmo programa.

## 5.60.0 — PSG 101: chanfro sugerido conforme a secção e a altura (16/11/2026)
- Pedido do usuário: algumas guias saíam com chanfros grandes demais. A sugestão do PSG 101 (chanfro externo e interno, quando o
  campo fica vazio) agora é o MENOR entre 10 % da altura e 20 % da secção, de 0,2 a no máximo 1 mm, arredondada em 0,1.
  Ex.: Ø50 x Ø55 x 9,7 (secção 2,5) passa de 0,97 para 0,5; Ø100 x Ø108 x 9,7 → 0,8; Ø60 x Ø70 x 15 → 1.
- Chanfro digitado no campo continua valendo. Só o PSG 101 muda (PSA 108/109, PSG 103/104 iguais; os outros 30 perfis geram o
  mesmo programa de antes).

## 5.59.0 — Celeron: corte com metade da rotação (16/11/2026)
- Pedido do usuário: no Celeron o corte gira na metade da rotação.
- Logo depois de chamar a ferramenta de corte (T6D16) entra `G97 S<metade> M3 ;(CELERON: METADE DA ROTACAO NO CORTE)`;
  antes do `G92` volta a rotação do início (`;(ROTACAO NORMAL)`), porque o RPT volta para o N10, que fica depois do G97 do começo.
- Vale para todo programa em Celeron (arruelas, PSA 108/109, PSG 101/103/104, PSH 110 base/tampa). Os outros materiais não mudam
  (31 perfis com os valores padrão: programas iguais aos da 5.58.1).

## 5.58.1 — Desenho do programa sai do Simulador até o teste (16/11/2026)
- O usuário quer testar antes: o botão "📐 Desenho do programa" (5.58.0) foi retirado da versão normal. O teste é numa cópia
  separada ("Simulador CNC - TESTE desenho do programa.html"). O Simulador fica igual ao 5.57.3.

## 5.57.3 — PSE 125 (DPR): imagem certa na janela "Escolha o perfil" (16/11/2026)
- Troca a miniatura do PSE 125 (DPR) pela imagem enviada pelo usuário (lábio por fora, O-ring por dentro). Programas iguais.

## 5.57.2 — PSR 211/212: rampa interna de trás menos inclinada com as alturas próximas (16/11/2026)
- Com altura total perto da altura do corpo (raspador baixo), a rampa interna de trás ficava curta (1,24 × diferença) e
  muito inclinada (41° a 84° com o eixo). Agora ela tem no mínimo o comprimento para 20° com o eixo (o ângulo dos padrões)
  e avança para a frente, sem mexer nos Ø; limite de sempre (0,3 antes do lábio interno). Rampa digitada continua valendo.
- Com raspador de 3 mm ou mais nada muda (padrões iguais; 31 perfis iguais no teste).

## 5.57.1 — PSE 108: peças por ciclo voltam a valer depois de reabrir (16/11/2026)
- Ao reabrir o Simulador, o "Tipo da peça" não voltava (ficava "Automático"), então o PSE 108 gerava só 1 peça por ciclo
  mesmo com outro número no campo. Agora o tipo volta junto com as medidas (e o botão do perfil mostra PSE 108).
  "Alterar programa → Abrir configurações" também atualiza o botão do perfil. Nenhum programa dos 31 perfis mudou.

## 5.57.0 — Alterar programa: abrir as configurações da peça salva (16/11/2026)
- Pedido do usuário: no ✏️ Alterar programa, botão **📂 Abrir configurações da peça**. Digita o número e o Simulador põe de
  volta no formulário as medidas e opções com que o programa foi salvo (mesmo perfil, material, bucha, peças por ciclo,
  RPT, tolerâncias do desenho, parâmetros fixos). Aí é só mudar (ex.: peças por ciclo, tolerâncias atualizadas) e
  💾 Salvar, que sugere o mesmo número (pergunta antes de substituir um arquivo que já existe).
- Vem do histórico (Programas_CNC\Historico Simulador CNC.csv, coluna Parametros). Pega a gravação mais nova daquele
  número; programas salvos antes dessa coluna, pelo lote ou pelo "só trocar a bucha" avisam que não têm as configurações.
- A troca de bucha continua igual, logo abaixo ("Ou: só trocar a bucha"). Programas e desenhos não mudam (31 perfis conferidos).

## 5.56.1 — 16/11/2026
- PSA 109: no DESENHO o canal (raio na face) passou para o outro lado (perfil espelhado no Detalhe B; chamadas dos
  chanfros e do R acompanham). O programa CNC não mudou (31 perfis iguais).

## 5.56.0 — Login com senha: quem entra vai no DESENHADO (16/11/2026)
- Pedido do usuário: ao abrir o Simulador aparece **Entrar** (usuário + senha). O nome de quem entrou vai sozinho no
  **DESENHADO** do carimbo (APROVADO continua MATEUS C.). Fica logado até fechar o navegador; botão **👤 nome** no topo:
  trocar a senha, sair / entrar com outro usuário.
- **Primeiro acesso**: cria o administrador (MATEUS C. + senha). O administrador cadastra usuários, troca a senha ou remove.
- Usuários em `W:\...\PROGRAMAÇÃO\PADRONIZAÇÃO\Arruela Padronizada\usuarios.json` (o mesmo em todos os computadores,
  pelo servidor); a senha fica só como hash SHA-256 com sal. Sem W: os usuários ficam só no computador.
- É identificação de quem desenhou, não um cofre (quem tem o arquivo abre sem login). A rotina em lote e os testes
  automáticos não mostram a tela de login. Programas não mudam (conferido nos 31 perfis).

## 5.55.0 — Marca d'água Parts Seals + carimbo (aprovado / desenhado) (16/11/2026)
- Pedido do usuário: **marca d'água** em todos os desenhos (perfis padrão e Desenho do 3D): o logo Parts Seals repetido,
  reto, em fileiras alternadas, a 15% (testado na impressão: 7% quase não aparecia), atrás das vistas e cotas, dentro da
  moldura e acima do carimbo.
- Carimbo: **APROVADO = MATEUS C.** por padrão. **DESENHADO = quem desenhou**: começa vazio e, ao imprimir/salvar o desenho
  (💾 Salvar, Imprimir / PDF, 💾 Salvar no W:), pergunta uma vez "Quem desenhou?" e fica guardado no computador. Nos
  computadores que já tinham "MATEUS C." guardado no desenhado, ele passa para o aprovado (uma vez só).
- Programas não mudam (conferido nos 31 perfis).

## 5.54.0 — Desenho do 3D salva no W: (16/11/2026)
- Pedido do usuário (os desenhos do 3D são de itens fora de padrão): na prévia do desenho do 3D, botão **💾 Salvar no W:**.
  Pergunta a **família** (pasta em DESENHOS, ex.: VEDADOR, PSE 124 E; vem o nome do arquivo), o **número do programa**
  (se não estiver no painel; vazio = sem programa) e o **Cód. interno** (vazio = sem). Grava como os perfis padrão:
  `DESENHOS\<família>\<família> (Ø int X Ø ext X largura) <programa>\….pdf` e, com Cód. interno, o pedido em
  `_PEDIDOS ARGUS` (Anexo 1 no ARGUS).
- Sem número de programa, o nome da pasta não fica mais com espaço sobrando no fim. Programas não mudam.

## 5.53.1 — PSA 108: desbaste sem duplicar nos outros materiais (16/11/2026)
- Usuário: no PU o desbaste está certo; em Nylon, POM, NBR, Viton e Celeron saía duplicado (ex.: 100x120x22, bucha 50x70:
  116 linhas, cada Ø passava 2 vezes em 2 etapas em Z). Agora o PSA 108 desbasta em Z de uma vez em todos os materiais,
  como no PU (90 linhas; o programa em Nylon fica igual ao do PU, menos a linha do material).
- Só o PSA 108 mudou: PSA 109, PSG 101/103/104 e os ciclos de arruela continuam iguais (conferido em todos os materiais).


## 5.53.0 — Desenho a partir do 3D do Inventor (16/11/2026)
- Pedido do usuário: botão novo **🧊 Desenho do 3D (Inventor)** (ou arrastar o arquivo para a tela). No Inventor:
  **Arquivo → Exportar → Formato CAD → STL** (unidade mm, resolução Alta). O `.ipt` não abre fora do Inventor.
- Para peça de revolução (anel, vedação, bucha, raspador): acha o eixo sozinho, tira a secção exata da peça (cantos
  encaixados nos vértices do 3D) e abre a folha Parts Seals com **vista frontal, corte A-A e secção ampliada** com cotas
  automáticas: largura total, Ø de cada degrau (diâmetros que não couberem vão na nota), larguras em cota corrida,
  chanfros (agrupados), ângulo das rampas com o eixo e raios. O nome do arquivo vira a descrição; o resto do carimbo se
  preenche no painel ao lado. "Imprimir / PDF" salva o PDF.
- Novo `testes/testar-3d.js` (VEDADOR 272x291x19 em dois eixos). Programas não mudam (conferido nos 31 perfis).

## 5.52.2 — PSR 212: chanfro maior no desbaste da T2D2 (16/11/2026)
- Pedido do usuário (só PSR 212): a T2D2 continua o 45° do chanfro da aresta do degrau até 0,2 mm (no raio) acima do Ø do
  degrau (Ø109,2 com o degrau padrão 108,8) e segue reto até o 45° de trás. Tira o material do degrau antes da T6D6.
- Na peça o chanfro continua 0,5: a T6D6 corta a parede e o Ø do degrau depois. Desenho não muda.
- Os outros perfis geram o mesmo programa de antes (conferido nos 31).

## 5.52.1 — Ferramentas: o D (corretor) é o código principal (16/11/2026)
- Usuário: o D é fixo e identifica a ferramenta; o T muda conforme a máquina. Na aba Torre CNC (agora "corretores D") cada
  ferramenta aparece com o **D em destaque** (T2D13 menor ao lado), a linha diz "Corretor D13 (fixo) · posição T2 (muda
  conforme a máquina)", a lista vem em ordem de D e a busca acha por "d13".
- Aviso quando o mesmo D está em duas ferramentas (hoje: D14, D24 e D51) e ao cadastrar um D que já existe.
- Ferramenta pedida com um T diferente é achada pelo D. Programas e desenhos dos 31 perfis iguais a antes (conferido).


## 5.52.0 — PSR 212: chanfro do degrau pela T2D2 + passes na parte de trás (16/11/2026)
- Pedido do usuário (só PSR 212): o **chanfro da aresta do degrau** agora é feito pela **T2D2** (ferramenta do externo), no
  acabamento: desce o chanfro e segue no Ø de baixo dele até o 45° de trás. A T6D6 não faz mais esse chanfro; entra direto
  na parede do degrau.
- Campo novo **"Passes da T6D6 na parte de trás — degrau + raspador"** (vazio = 1, até 10). Com mais de um passe, cada passe
  repete o caminho do degrau e do raspador mais raso (cada ponto desce 1/n da sua profundidade, sem passar do acabamento);
  o último é o acabamento. Cada passe vem marcado `;( PASSE k/n )` no programa.
- Os outros perfis geram o mesmo programa de antes (conferido nos 31 com `testes/testar-perfis.js`).

## 5.51.0 — Ferramentas: lista de corretores da fábrica (16/11/2026)
- Lista enviada pelo usuário (DESENHOS\CORRETORES FERRAMENTA\CORRETORES FERRAMENTA.txt) entrou na aba Torre CNC: de 23 para
  60 ferramentas. Cada uma mostra o nome que tem na lista (ex.: T2D13; (BDM INT 2mm)), com o ponto de zero quando a lista diz.
- As 37 novas (bedames internos, frontais, ferramentas de aço, broca, rosca, facas…) são só da biblioteca: nenhum gerador as
  usa. Tipos novos no filtro: Bedame interno e Broca / rosca / outro. A torre aparece em ordem de T e D.
- Campo novo para editar: nome na lista de corretores. Programas e desenhos dos 31 perfis iguais a antes (conferido).

## 5.50.2 — Campo "vazio = …" nunca mais trava o programa + teste de todos os perfis (16/11/2026)
- Pedido do usuário: era o 2º perfil novo que não gerava por pedir "Preencha" num campo opcional. Agora todo campo cujo
  texto diz "vazio = …" é opcional automaticamente (não depende mais de uma lista à parte que dava para esquecer).
- Faltando um campo obrigatório, a faixa laranja do topo diz o nome do campo e que o programa NÃO foi gerado (antes
  aparecia só "Preencha: ds" em letra pequena e o código do programa anterior continuava na tela).
- Novo `testes/testar-perfis.js` (para o Claude rodar antes de todo merge): gera programa e desenho de todos os perfis e
  confere que todo perfil aparece na janela "Escolha o perfil". Teria pegado os dois erros do PSR 212.
- Programas não mudam (conferido nos 31 perfis).

## 5.50.1 — PSR 212 gera o programa com o degrau vazio (16/11/2026)
- O PSR 212 não gerava o programa: com o Ø e o comprimento do degrau vazios (que deveriam usar o padrão) aparecia
  "Preencha: ds" e o código na tela continuava o do programa anterior. Os dois campos agora são opcionais, como diz o
  texto. Só o PSR 212 muda (esses campos só existem nele).

## 5.50.0 — Ferramentas: área separada com cadastro e edição (16/11/2026)
- Pedido do usuário: uma parte só de ferramentas, com tudo o que tem. O botão 🧰 Ferramentas agora abre uma área
  separada (tela cheia, ← Voltar ao Simulador) com duas abas:
  - **Torre CNC (T/D)**: as ferramentas dos programas (posição, corretor, uso, materiais, foto) + campo **suporte**;
  - **Suportes, pastilhas e lâminas**: 33 itens com os códigos dos .txt de ferramentas do W: (Suportes.txt, Pastilhas
    Para usinagem.txt, TABELA DE CODIGOS FERRAMENTAS.txt, ferramentas Seal Maker) e as lâminas H1111 / H1002 / H1000.
- **➕ Cadastrar** e **✏️ Editar** em todas; **Voltar ao original** nas que vieram prontas; **Apagar** nas cadastradas e
  nos itens. Fica salvo em PROJETOS\FERRAMENTAS SIMULADOR\ferramentas.json (vale em todos os PCs; sem acesso à pasta,
  só neste PC). Antes de gravar, lê o arquivo mais novo (não apaga o que outro PC mudou).
- Os programas não mudam: os geradores continuam com as ferramentas deles. Só o nome da ferramenta no quadro
  FERRAMENTAS do desenho acompanha a edição. Conferido: os 31 perfis geram o mesmo programa e o mesmo desenho de antes.

## 5.49.2 — PSR 212 aparece na escolha pela imagem (16/11/2026)
- O PSR 212 não aparecia para o usuário: estava só no menu de lista (escondido) e faltava no grupo **Raspadores** da
  janela "Escolha o perfil". Agora aparece ao lado do PSR 211. Programas não mudam.

## 5.49.1 — Mapa da pasta W: para o Claude (16/11/2026)
- Novo `Claude contexto/mapa-pasta-W.md`: onde ficam no W: os programas (Fagor e MCS 500), os desenhos por perfil, os
  modelos de programa da PADRONIZAÇÃO, as ordens de serviço por perfil, as ferramentas (códigos de suportes e pastilhas),
  manuais, pós-processadores e catálogos. Só documentação: o Simulador não muda.


## 5.49.0 — PSR 212: perfil novo (PSR 211 com degrau no externo) (16/11/2026)
- Novo perfil **PSR 212** no menu e na escolha pela imagem (Raspadores), com a foto do catálogo enviada pelo usuário.
- Geometria = PSR 211 (frente do PSH 105 + raspador a 65°) com um **degrau no externo, atrás do corpo**: Ø maior na frente (lado do canal), Ø do degrau menor atrás, junto do raspador.
- Campos novos: **Ø do degrau** (vazio = Ø ext. − 0,6 × secção) e **comprimento do degrau** em Z a partir da trás do corpo (vazio = 0,3 × corpo). Chanfro do calcanhar nas duas arestas do degrau.
- Programa: o externo da T2D2 fica igual ao do PSR 211 (ela não corta parede virada para trás). O degrau (chanfro da aresta, parede, Ø do degrau e chanfro de trás) é feito pela **T6D6** antes do raspador a 65°.
- Desenho: cota do Ø do degrau (DIÂMETROS), comprimento e profundidade do degrau e chanfro da aresta (SECÇÃO), degrau na nota do raspador.
- Os outros perfis geram o mesmo programa de antes (conferido em todos).
- Valores padrão do degrau são estimados pela foto: conferir com um programa/desenho real de PSR 212.

## 5.48.2 — Aviso de ATENÇÃO aparece na faixa do topo (14/11/2026)
- O usuário não via o aviso (ficava só no texto pequeno embaixo do formulário). Agora todo aviso de ATENÇÃO de qualquer
  perfil abre a faixa no topo, em laranja (erros continuam em vermelho), com "AVISE O RESPONSÁVEL antes de usar este
  programa." A faixa some sozinha quando as medidas voltam a não ter aviso. Programas não mudam.

## 5.48.1 — Avisos pedem para avisar o responsável (14/11/2026)
- Pedido do usuário: todo aviso de ATENÇÃO (ex.: profundidade acima do limite da T2D2/T2D12 no PSH 110) termina com
  "AVISE O RESPONSÁVEL antes de usar este programa.", e a faixa vermelha de erro (programa ou desenho) também pede para
  avisar o responsável. Só muda a mensagem na tela; os programas não mudam.

## 5.48.0 — Erros de programa e desenho aparecem na tela (todos os perfis) (14/11/2026)
- Pedido do usuário: qualquer erro ao gerar um programa ou montar um desenho aparece na tela, numa faixa vermelha no topo
  (perfil + motivo + "tire um print e mande para o Claude"), com × para fechar. Antes falhava calado ou travava.
- Programa: a mensagem embaixo do formulário vira "ERRO: …"; quando volta a gerar certo, a faixa some sozinha.
- Desenho: a folha mostra "ERRO NO DESENHO" e o PDF com erro não é salvo.
- Travamento: os laços do desbaste (roughPasses, desbaste da intermediária do PSH 110/110 30°, furo no tarugo) param
  com erro em vez de congelar a tela quando chega uma medida inválida.
- Erros inesperados em qualquer parte do Simulador também aparecem na faixa.
- Nenhum programa ou desenho que já funcionava mudou (conferido nos 37 casos).

## 5.47.8 — PSR 101: tolerância do h2, só o chanfro novo no formulário, bucha automática (14/11/2026)
- Desenho: o h2 tem a mesma tolerância do h1 (0 / −0,2).
- Formulário principal: só o chanfro novo (canto do degrau). Quebra 45° do corpo e chanfros de trás voltaram para
  Parâmetros fixos; o aperto da ponta estava duplicado (formulário e Parâmetros fixos) e ficou só em Parâmetros fixos.
- Bucha: os campos mostram "automática: …" e o quadro de buchas aparece, como nos outros perfis (PSR 101 entrou na
  lista da bucha automática). Os outros perfis não mudam (conferido).

## 5.47.7 — PSR 101: não trava ao editar; chanfros no formulário (14/11/2026)
- **Travava ao mudar as medidas**: digitando um chanfro (ex.: 0,45) ele passava por "0", o canto ficava com dois pontos
  iguais e o cálculo do percurso entrava em laço — a tela congelava. Agora pontos repetidos saem antes do cálculo
  (chanfro 0 = canto vivo) e, com medidas impossíveis no meio da digitação (Ø alojamento menor que a haste, h1 ≥ h2,
  lábio fora do degrau…), o PSR 101 não calcula: só mostra o aviso em vermelho até a medida fechar.
- Os 4 chanfros (canto do degrau, quebra 45° do corpo, trás externo 60°, trás interno 30°) e o aperto da ponta foram para
  o formulário principal, logo abaixo das alturas (antes ficavam em "Parâmetros fixos", que vem fechado).
- Programas e desenhos de todos os perfis, inclusive o PSR 101 nas medidas normais, iguais a antes (conferido).

## 5.47.6 — PSR 101: furo reto (14/11/2026)
- Pedido do usuário: o furo de trás (d + 1,0, ex.: Ø64 no 63x71) fica inteiro nessa medida, sem ângulo: a rampa de 19° da
  ponta vai direto até o furo e ele segue reto até o chanfro de trás (que continua igual). Antes ia até d + 0,45 e subia em
  cone até d + 1,0, como o Fast Seal. O campo "Fim da rampa interna" vazio agora = igual ao furo. Só o PSR 101 muda.

## 5.47.5 — PSR 101: desenho no padrão do PSR 102 (14/11/2026)
- O desenho do PSR 101 agora usa o mesmo padrão do PSR 102: vistas DIÂMETROS e SECÇÃO, alturas H / h2 / h1 em cima
  (medidas de trás), Ø em ordenadas (alojamento, furo, ponta, lábio e degrau), secções, altura do degrau, distância da
  ponta à face e chamadas de todos os chanfros e ângulos. Função própria: o desenho do PSR 102 não muda (conferido).
- Todos os chanfros do PSR 101 têm campo em Parâmetros fixos (quebra 45° do corpo, chanfro do canto do degrau, chanfro de
  trás externo e interno).

## 5.47.4 — PSR 101: chanfro no canto do degrau (14/11/2026)
- Pedido do usuário: o paralelo do degrau (Ø D − 2/3/4) ganha um chanfro de 45° no canto do lado do lábio: 0,3 / 0,4 / 0,5
  pela secção (até 4 / até 6 / acima de 6), com campo para mudar. Só o PSR 101 muda (conferido).

## 5.47.3 — PSR 101: chanfro de trás do interno a 30° (14/11/2026)
- Pedido do usuário: o chanfro de trás do interno passa de 50° para 30° com o eixo (mesmo tamanho no raio: 0,35; secção
  acima de 6: 0,5). Muda o programa e o desenho só do PSR 101; os outros perfis não mudam (conferido).

## 5.47.2 — PSR 101: desenho invertido (14/11/2026)
- O desenho do PSR 101 (corte, detalhe e DXF) agora tem o corpo à esquerda e o lábio à direita, como no desenho do Fast
  Seal. O programa não muda; os outros perfis não mudam (conferido).

## 5.47.1 — PSR 101: gera ao editar (14/11/2026)
- O PSR 101 não gerava pela tela: os campos opcionais novos (aperto, degrau, chanfros…) não estavam na lista de campos que
  podem ficar vazios e a tela parava em "Preencha: ap". Os campos do PSR 101 ganharam nomes próprios (r1…) e só eles
  entraram na lista; os outros perfis não mudam (conferido).

## 5.47.0 — PSR 101: perfil novo (raspador com degrau) (14/11/2026)
- Perfil novo **PSR 101** no seletor e em Raspadores na escolha pela imagem (imagem enviada pelo usuário). O PSR 102 e
  todos os outros perfis geram o mesmo programa e o mesmo desenho de antes (conferido).
- Medidas como nas pastas do W: **d x D x h1 x h2 x H**: h1 = de trás até a face do degrau, h2 = de trás até o começo do
  lábio, H = total (ex.: 63 x 71 x 4 x 5 x 7).
- Regras tiradas dos 68 programas PSR101-P do Fast Seal no W:, por secção S (até 4 / até 6 / acima de 6):
  - degrau Ø D − 2 / 3 / 4; ponta do lábio d − 1,1 / 1,4 / 1,8, a 0,25 da face;
  - lábio por fora até o degrau no Ø médio; quebra de 45° do degrau para o corpo 0,3 (acima de 6: 0,6);
  - interno: chanfro da frente a 55°, rampa a 19° até d + 0,45 (acima de 6: d + 1,0), furo d + 1,0 atrás;
  - chanfros de trás: externo a 60° com a face (0,35 / 0,65 / 0,6), interno a 50° (0,35; acima de 6: 0,5).
- Conferido contra 034436 (63x71), 039816 (90x99) e 019031 (300x315): degrau, quebra, corpo, chanfro de trás e ponta
  saem iguais ao Fast Seal; rampa e furo a menos de 0,1. Todas as regras têm campo para mudar.

## 5.46.2 — PSH 110 30°: imagem mais nítida (14/11/2026)
- A imagem do card (79x52 px) foi ampliada 4x (316x208, bicúbica + realce de bordas): o card mostra a imagem reduzida em
  vez de esticada, com menos borrão. Para ficar nítida de verdade, precisa de uma imagem original maior.

## 5.46.1 — PSH 110 30°: imagem na escolha pela imagem (14/11/2026)
- O card do PSH 110 30° na escolha do perfil pela imagem usa a imagem enviada pelo usuário (antes era o desenho do perfil).
- Confirmado pelo usuário: o conjunto do PSH 110 30° fecha EXATO a altura do alojamento (não como o FSC, que fazia 7–9% mais alto).

## 5.46.0 — PSH 110 30°: perfil novo (chevron a 30°) (14/11/2026)
- Perfil novo **PSH 110 30°** no seletor e na escolha pela imagem (Veio). É um perfil próprio: as próximas mudanças pedidas
  para ele valem só nele. O PSH 110 de 45° e todos os outros perfis geram o mesmo programa de antes (conferido).
- Regras tiradas dos programas VPA02A30º do W: (S = secção):
  - flancos do V a **30° com o eixo** (entalhe da frente, V de trás da intermediária e bico da base);
  - entalhe com **fundo redondo R = 0,2·S − 0,4** feito com a T3D3 (G2/G3), passadas de 1 em 1 mm como no Fast Seal:
    intermediária 0,666·S de fundo, tampa 0,5795·S − 0,174;
  - paralelo atrás da intermediária = reta do bico da base = **0,4·S** (campo para mudar);
  - lábios da intermediária com aperto +0,40 no Ø na frente, terminando em D / d;
  - base Ø D − 0,2·S / d + 0,2·S; tampa D − 0,2 / d + 0,2; chanfro de trás 0,0571·S + 0,232 (tampa 0,06 menor),
    externo a 45° e interno a 32°.
- Do PSH 110: as três peças com a mesma altura e o conjunto fechando exato a altura do alojamento (encaixe flanco com
  flanco), nomes intermediária / base (A) / tampa (B), salvar com número, número + A e número + B (número sugerido
  separado do PSH 110 de 45°), reta de 0,6 em Z no fim do externo/interno, limite de 14 no Ø da T2D2/T2D12 e desbaste
  escalonado do V de trás.
- Interno da intermediária em PU: T2D12 a partir de Ø40, T1D45 de Ø20 até Ø40, T4D14 abaixo de Ø20 (como nos VPA02A30º).
- Desenho com "V 30° · fundo · R", conjunto montado e nota próprios. Desenhos vão para a pasta `PSH 110 30°`.

## 5.45.2 — PSG 103 / PSG 104: chanfro do degrau do rebaixo mais fácil de achar (13/11/2026)
- O campo chama "Chanfro 45° do degrau do rebaixo" e mostra a sugestão (ex.: 0,76). Digitar um valor muda o chanfro no
  programa e no desenho; 0 = canto vivo.

## 5.45.1 — PSH 110: interno da intermediária só até Ø haste 21 (13/11/2026)
- Intermediária em PU: interno com T2D12 a partir de Ø40 e com T1D45 de Ø40 até Ø21. Abaixo de Ø21 o V de 45° não dá
  para fazer: aparece o aviso "use outro perfil".

## 5.45.0 — Mudança só no perfil pedido: desbaste contínuo só no PSG 101; peças por ciclo só no PSE 108
- Regra do usuário: **quando falamos de um perfil, a mudança vale só para aquele perfil**, a não ser que ele peça para mais.
- Desbaste em Z num passe contínuo (5.44.0) agora vale **só no PSG 101**. PSA 108, PSA 109, PSG 103, PSG 104 e os ciclos
  voltam a ser como na 5.42.0 (etapas de até 20 mm acima de 10 mm; campos "máximo por etapa" e "vai de uma vez" de volta).
- Peças por ciclo (5.37.0) agora vale **só no PSE 108 (DP)** escolhido; a Arruela ISO volta a 1 peça (campo indica "só PSE 108").

## 5.44.0 — Arruelas / PSG: desbaste em Z sempre num passe contínuo
- Pedido do usuário: "só tem que dividir o desbaste em alguns perfis quando a ferramenta for cavar no diâmetro; nos outros
  perfis é um passe contínuo linear". Nas arruelas e guias (PSA 108, PSA 109, PSG 101/103/104, ciclos) o desbaste **não é
  mais dividido em etapas em Z**, qualquer que seja o comprimento: cada passada no Ø vai de uma vez até o fim
  (ex.: PSG 101 com 25 de altura → Z −26,55 direto; antes 2 etapas de 13,275). Substitui a 5.43.0.
- Saíram os campos "Desbaste em Z: máximo por etapa" e "até este comprimento vai de uma vez". O limite de 40 mm (peças por
  ciclo) continua.

## 5.43.0 — Arruelas / PSG: desbaste em Z sem ir "até o meio e de novo"
- Pedido do usuário (PSG 101, já corrigido antes na 5.20.2 para peças até 10 mm): peça de 9,7 de altura dá 11,25 mm de
  desbaste em Z e saía em 2 etapas (até o meio da peça e depois de novo até o fim). Agora até **20 mm** (o máximo por etapa)
  o desbaste em Z vai **de uma vez**; só acima disso divide em etapas de até 20 mm (pelo menos 2).
- Vale para PSA 108, PSA 109, PSG 101/103/104 (não PU, que já ia de uma vez). Campo `zMin` padrão 20 e nunca menor que o
  máximo por etapa (formulários salvos com 10 também passam a usar 20).

## 5.42.0 — PSE 108 (DP): tolerância dos diâmetros maior, igual ao PSE 125
- Pedido do usuário: tolerância padrão dos diâmetros do PSE 108 (campo vazio), cada Ø pelo seu tamanho, para mais:
  até Ø50 → +0,2/0 · até Ø100 → +0,3/0 · até Ø200 → +0,4/0 · até Ø300 → +0,6/0 · acima → +0,8/0 (antes +0,07/0 em todos).
  Altura continua 0/−0,1. Tolerância digitada = usa a digitada.

## 5.41.0 — PSH 110: limite de profundidade da T2D2/T2D12 e desbaste da parte de trás da intermediária
- Pedido do usuário: na intermediária em PU, a **T2D2** (externo) e a **T2D12** (interno) vão no máximo **7 mm de profundidade no raio
  (14 no Ø)**, contados do lábio da frente. Acima disso o percurso para no limite (segue reto em Z) e aparece **ATENÇÃO** com a
  profundidade pedida (ex.: 200x260 → 24,49 no Ø) — o V de trás fica incompleto e precisa de outra ferramenta.
- **Desbaste da parte de trás** da intermediária em passadas de contorno escalonadas (sobremetal 1,5 + 3 mm por passada, do maior
  para o menor) em vez de uma passada só — ex.: 140x170 (S 15) → passadas com 4,5 e 1,5 de sobremetal antes do acabamento.
  Seções pequenas (ex.: 50x65) continuam iguais.

## 5.40.1 — PSH 110: reta em Z no fim do externo e do interno da intermediária
- Pedido do usuário: na intermediária, o V de trás vai até a face de trás (borda do paralelo) e segue **reto em Z mais 0,6**, no
  externo e no interno; o desbaste termina nesse mesmo Z (como nos programas do Fast Seal). Ex.: 50x65x35 → externo X59,375 e
  interno X55,625 até Z −8,278 (ponta da ferramenta).
- Campo novo em Parâmetros fixos: "Intermediária: reta em Z no fim do externo/interno" (vazio = 0,6).

## 5.40.0 — PSH 110: paralelo atrás da intermediária
- Pedido do usuário: a parte de trás da intermediária não tem mais canto vivo — a ponta em V vira um **paralelo** (face reta) de
  **0,25 × secção** (igual à reta do bico da base; 1,88 no 50x65). Os flancos de 45° continuam os mesmos, então o encaixe e a altura
  do conjunto não mudam. No programa a ponta fica dentro do corte e o corte (T5D5) passa o paralelo inteiro.
- Campo novo em Parâmetros fixos: "Paralelo atrás da intermediária" (vazio = 0,25 × secção; 0 = ponta viva). Desenho com a chamada
  "paralelo".

## 5.39.1 — PSH 110: nomes das peças (base, intermediária, tampa)
- Pedido do usuário: a peça do meio passa a se chamar **INTERMEDIÁRIA**; a do canal (entalhe) frontal, **TAMPA** (B); a do ângulo
  grande na face (ponta em V), **BASE** (A). Mudou no seletor da peça, nos campos (quantidade e materiais), no comentário do
  programa, no nome do arquivo ("… INTERMEDIARIA" / "… A (BASE)" / "… B (TAMPA)") e no desenho/conjunto montado.
  Números ao salvar sem mudança: intermediária = número, base = número + A, tampa = número + B.

## 5.39.0 — PSH 110: salvar meio / A / B, campo Altura e imagem nova
- Salvar (pedido do usuário): os **anéis do meio** salvam com o número normal (030249.PIT / 30249.txt); o **macho** com o mesmo
  número + **A** (030249A) e a **fêmea** + **B** (030249B). Ao salvar o macho ou a fêmea, o número sugerido é o do último meio
  salvo. Os desenhos das 3 peças ficam na mesma pasta do conjunto: `PSH 110 (50 X 65 X 35) 30249…30249.pdf`, `…30249A.pdf`,
  `…30249B.pdf`, como no W:.
- Campo "Altura do alojamento" passa a se chamar só **Altura** (no PSH 110 são a mesma coisa).
- Imagem nova do PSH 110 na escolha pela imagem (enviada pelo usuário).

## 5.38.0 — PSH 110: desenho do conjunto montado
- Pedido do usuário: toda folha do PSH 110 ganha a vista **CONJUNTO MONTADO** — meia secção ampliada com o macho (virado, ponta
  para dentro), os n anéis do meio encaixados e a fêmea, dentro do contorno do alojamento (tracejado), com a cota H total e
  "macho + n anéis + fêmea · altura de cada peça". Cada peça entra (altura − entalhe) depois da anterior, fechando H exato.
- Folha em pé: à direita da vista frontal. Folha deitada: vista frontal um pouco menor e o conjunto embaixo dela.

## 5.37.0 — PSE 108 (DP): peças por ciclo
- Pedido do usuário: o PSE 108 (DP) ganhou o campo **Peças por ciclo (1 a 10)**, como o PSA 108. Vale também para a
  Arruela ISO (mesmo gerador). Com 1 peça o programa sai igual ao de antes.
- Peça i começa em Z −(i−1) × (altura + bedame). Entre as peças o externo e o interno descem pelo chanfro de trás até o
  meio do espaço do bedame e sobem pelo chanfro da frente da peça seguinte (comentário ";(PECA n)"). O bedame corta cada
  peça ("; (CORTE PECA n)") e o G92 fica no último corte. Campo **Espessura do bedame** (padrão 1; T6D16 = 2 automático).
- 1ª linha ";N PECAS POR CICLO"; o nome do arquivo leva "CICLO N PÇ"; custo por peça e "Peças por ciclo" dividem por N.

## 5.36.0 — Perfil novo PSH 110 (chevron, base VPA01B do Fast Seal)
- Novo gerador **PSH 110**: conjunto chevron de 3 peças — **MACHO** (A, -1: ponta em V na frente), **FÊMEA** (B, -2: entalhe
  em V na frente) e **ANÉIS DO MEIO** (-3: entalhe na frente, ponta atrás, lábios com aperto). Entradas: Ø haste, Ø alojamento,
  altura do alojamento e **quantidade de anéis do meio**; campo "Peça do conjunto" escolhe qual programa sai.
- Regras tiradas dos programas VPA01B do W: (S = secção): macho Ø D − 0,15·S / d + 0,15·S; fêmea D − 0,03·S / d + 0,03·S;
  meio com aperto na frente 0,064·S + 0,07 e lábios até D − 0,5 / d + 0,5; V 45° com entalhe do meio 0,4923·S − 1,035 e da
  fêmea 0,4349·S − 0,165 (rasgo no fundo com a T3D3, igual aos programas); bico do macho com reta de meia-largura 0,125·S;
  chanfro de trás de macho/fêmea 0,0571·S + 0,232. Conferido com o 033704 (50x65x35): diâmetros 65,55 / 63,88 / 64,78,
  secções 8,05 / 6,38 / 7,28, reta 1,88 e chanfro 0,66 iguais ao desenho do Fast Seal.
- Alturas **iguais** nas 3 peças e o conjunto fecha **exato** a altura do alojamento (usuário): cada peça =
  (H + (n + 1) × entalhe) / (n + 2). Ex.: 50x65x35 com 5 anéis → 7,28.
- Materiais (usuário): meio **PU** (T3D3 face e V, T2D2, T2D12/T1D45, T5D5), macho e fêmea **PEAD** (T7D7, T3D3 no V da fêmea,
  T4D4/T2D14, T8D8); campos para trocar. RPT do meio = quantidade − 1 (vazio).
- Desenho da peça escolhida com as medidas reais dela; arquivo "PSH 110 dxDxH MEIO / A (MACHO) / B (FEMEA)". Só o VPA01B
  (as variações VPA03A, VPA02A 30° e o meio SS11A-P ficam para depois).

## 5.35.0 — PSE 125 (DPR): mesma tabela padrão e tolerância do PSH 129
- Pedido do usuário: as medidas padrão do PSH 129 valem também para o PSE 125 (DPR). Altura (A), secção do rebaixo
  frontal (C) e profundidade do rebaixo (D) vazias = tabela pela secção (B), proporcional fora da tabela; E = 10° (padrão).
- Tolerância padrão dos diâmetros pelo tamanho (Ø interno e Ø externo cada um pelo seu): até Ø50 → 0,2 · até Ø100 → 0,3 ·
  até Ø200 → 0,4 · até Ø300 → 0,6 · acima → 0,8. Como é pistão (espelho do DH), fica **para mais: +valor/0** (antes +0,13/0).
  Altura 0/−0,1.
- Rotina em lote (`gerar.ps1`) usa o mesmo para o PSE 125.

## 5.34.0 — PSH 129 (DH): linha da secção 6,5 e tolerância dos diâmetros pelo tamanho
- Tabela padrão ganhou a linha **secção 6,5 → A 8 · C 4 · D 2,8** (pedido do usuário). Entre 5 e 6,5 fica proporcional
  (ex.: 5,75 → C 3,75); acima de 6,5, proporcional à linha de 6,5 (ex.: 8 → A 9,846 · C 4,923 · D 3,446).
- Tolerância padrão dos diâmetros (campo vazio), Ø interno e Ø externo cada um pelo seu tamanho, valor cheio:
  até Ø50 → 0/−0,2 · até Ø100 → 0/−0,3 · até Ø200 → 0/−0,4 · até Ø300 → 0/−0,6 · acima de Ø300 → 0/−0,8
  (antes 0/−0,13 em todos). Altura continua 0/−0,1. Tolerância digitada = usa a digitada.
- Rotina em lote (`gerar.ps1`): o PSH 129 também usa a tabela padrão (altura/rebaixo vazios) e essa tolerância.

## 5.33.1 — PSH 129 (DH): secção 5 com C = 3,5
- Pedido do usuário: na secção 5 a secção do rebaixo frontal (C) passa de 4 para **3,5** (A 8 · C 3,5 · D 2,8).
  Os valores proporcionais acompanham (ex.: secção 6,5 → C 4,55; secção 4 → C 2,75).

## 5.33.0 — PSH 129 (DH): medidas padrão pela secção (13/11/2026)
- Tabela do usuário (A altura · B secção total · C secção do rebaixo frontal · D profundidade do rebaixo; E = ângulo de 10°,
  que já era o padrão): B 1,1 → A 2 · C 0,7 · D 0,7; B 1,9 → 3 · 1,2 · 1; B 2,65 → 4 · 1,65 · 1,3; B 3,5 → 6 · 2,25 · 2;
  B 5 → 8 · 4 · 2,8.
- Altura (A), secção do rebaixo (C) e profundidade do rebaixo (D) agora começam **vazias = tabela pela secção**; o valor
  aparece no campo ("tabela: …"). Digitou = usa o digitado.
- Secção fora da tabela = **proporcional**: entre duas linhas, proporcional entre elas (ex.: B 3 → A 4,824 · C 1,897 ·
  D 1,588); abaixo de 1,1 ou acima de 5, proporcional à linha da ponta (ex.: B 6,5 → A 10,4 · C 5,2 · D 3,64).

## 5.32.2 — PSA 109: canal da face mais fundo
- Pedido do usuário ("canal muito raso"): a profundidade padrão do canal passa a ser **12 % da altura** e o raio sai da conta
  para o arco caber entre os paralelos (ex.: 52 x 57,1 x 2,9 → prof. 0,35 e R1,34; antes 0,21 e R2,04).
- Profundidade digitada = usada; raio digitado (sem profundidade) = a profundidade sai da conta.

## 5.32.1 — PSA 109: paralelo na face junto ao externo e ao interno
- Pedido do usuário: a face do PSA 109 tem um **paralelo** (parte reta) de **10 % da secção** junto ao externo e outro junto ao
  interno (medidos depois do chanfro da frente); o arco do raio fica entre os dois. Campo novo "Paralelo na face" (vazio = 10 %).
- O raio continua 4/5 da secção e a **profundidade sai da conta** (ex.: 52 x 57,1 x 2,9 → R2,04, prof. 0,21). Se a profundidade
  for digitada, o raio é que sai da conta. Programa (T3D3), desenho e nota atualizados.

## 5.32.0 — Perfil novo PSA 109 (arruela com raio na face)
- Novo gerador **PSA 109** (arruelas): o PSA 108 com um **raio na face da frente** (canal raso em arco, centrado no Ø médio):
  raio = **4/5 da secção**, profundidade = **15 % da altura** (campos "Raio na face" e "Profundidade do canal" para testar
  outros valores).
- Chanfros da **frente menores** que os de trás: campos novos "Chanfro externo/interno da FRENTE" (vazio = metade do de trás);
  os de trás são os campos de sempre (vazio = sugestão). Todos editáveis.
- Programa: **T3D3 faz a face e o canal** (G41, G3 de fora para dentro em Z0), antes da T7D7; a T7D7 não faceia mais (só
  posiciona no ar) e faz o externo com o chanfro da frente menor; T4D4 interno idem; bedame como no PSA 108. 1 peça por ciclo
  (a face das peças seguintes sai do bedame).
- Desenho com o raio na face, as chamadas dos 4 chanfros e do raio, e nota própria; imagem do perfil em Arruelas.

## 5.31.1 — Desenho: detalhe B sobe na folha em pé
- Pedido do usuário: na folha A4 em pé, o **detalhe B** (secção ampliada) subiu para o canto de cima à direita — antes ficava
  colado na vista frontal e o topo da folha ficava vazio. Vale para os desenhos do tipo arruela (PSA 108, PSG 101/103/104,
  ISO/DP, DH, DHR, DPR, PSO). Peças de secção grande descem só o necessário para a cota H não sair da folha. Folha deitada sem
  mudança.

## 5.31.0 — Perfil novo PSG 104 (guia com rebaixo externo)
- Novo gerador **PSG 104** (guias): igual ao PSG 103, mas o rebaixo fica no **Ø externo** (campos "Ø do rebaixo externo" e
  "Altura do rebaixo"). Uma peça por vez, opção "Com corte" / "Sem corte", chanfros editáveis (vazio = sugestão limitada a 30 %
  da parede do rebaixo). Exemplo padrão com secção 5: Ø50 x Ø60 x 9,7, rebaixo Ø56 x 4.
- No torno o rebaixo é feito pela face de entrada (a T7D7 não faz degrau reto nas costas): o externo faz o chanfro no Ø do
  rebaixo, o rebaixo até a altura, o degrau reto até o Ø externo e segue até o chanfro de trás (desbaste do rebaixo quando sai
  5 ou mais no Ø). No desenho o rebaixo aparece na face oposta, como no PSG 103.
- PSG 103 e PSG 104: a seta do chanfro do lado do rebaixo agora aponta para o canto do rebaixo.
- PSG 103 e PSG 104: **chanfro 45° no canto vivo do rebaixo** (quina do degrau): campo novo "Chanfro 45° no canto do rebaixo"
  (vazio = sugestão = chanfro da guia limitado a 40 % do degrau; 0 = sem chanfro). Programa: degrau + chanfro antes de seguir no
  Ø; desenho com a chamada do chanfro; aviso se o chanfro for maior que o degrau.
- Imagem do perfil em Guias: "PSG 104 (GUIA)".

## 5.30.1 — PSG 103: rebaixo na face oposta no desenho, exemplo com secção 5
- Pedido do usuário: no desenho o rebaixo interno fica na **face oposta** (lado direito do detalhe B, como na imagem do
  perfil). No torno ele continua sendo feito pela face de entrada (a T4D4 não faz degrau reto nas costas) — a peça é simétrica,
  só muda o lado em que o rebaixo aparece. Comentário do programa: "USINADO PELA FACE DE ENTRADA".
- Exemplo padrão com **secção 5**: Ø50 x Ø60 x 9,7, rebaixo Ø54 x 4. Sem o campo de peças por ciclo (uma de cada vez).
- Chanfros externo e interno continuam editáveis (vazio = sugestão).

## 5.30.0 — Perfil novo PSG 103 (guia com rebaixo interno)
- Novo gerador **PSG 103** (guias): mesmo padrão do PSG 101 (material, acréscimo de 0,9 no POM/Celeron, chanfros, corte em
  ângulo, tolerâncias, secção +0/−0,05) com **rebaixo interno** na face da frente: campos novos **Ø do rebaixo interno** e
  **Altura do rebaixo**. O rebaixo fica na frente porque a T4D4 não faz degrau reto nas costas.
- Campo **Corte da guia**: "Com corte" (como o PSG 101) ou **"Sem corte"** — sem serra, sem o acréscimo nos Ø, sem a vista do
  corte no desenho e nota "Sem corte".
- Programa: o do PSG 101 com 1 peça por ciclo; o interno faz o chanfro no Ø do rebaixo, o rebaixo até a altura, o degrau reto
  até o Ø interno e segue até o chanfro de trás (com desbaste do rebaixo quando sai 5 ou mais no Ø).
- Chanfro sugerido = o da guia (10 % da altura), limitado a 30 % da parede da frente ((Ø ext. − Ø rebaixo) / 2); aviso se os
  chanfros não couberem na parede.
- Desenho com o rebaixo no detalhe B (cota da altura e Ø do rebaixo) e nota; imagem do perfil em Guias: "PSG 103 (GUIA)".

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
- Simulador CNC.html: gera Fagor .PIT + MCS 500 + desenho PDF para PSE/PSH 105/106/107, PSH 103, PSE 103, PSE 118, PSH 121, PSH 125, PSH 124 (DHR), PSE 125 (DPR), PSH 110, PSG 103, PSG 104, PSA 109, PSH 108, PSH 117, PSR 102/211,
  DH PSH 129, PSO 109, arruelas (ISO, ciclo com/sem chanfro); Alterar programa (só desbaste); Ver programa.
- Rotina noturna (`Claude contexto/Rotina/*.ps1`): gerar, revisar, controle, imprimir, regerar, índice de .PIT, pit2mcs.
