# Histórico de versões — Fast Seal Creator 5

Regra: toda alteração sobe a versão em `VERSION`, ganha uma entrada aqui (data + o que mudou) e vai para o GitHub
(commit + tag `vX.Y.Z` + push). Versão = MAIOR.MENOR.CORREÇÃO
- CORREÇÃO (5.0.x): conserto de erro, ajuste de regra pequena.
- MENOR (5.x.0): recurso novo, perfil novo, rotina nova.
- MAIOR (x.0.0): mudança grande de formato/fluxo.

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
- Simulador CNC.html: gera Fagor .PIT + MCS 500 + desenho PDF para PSE/PSH 105/106/107, PSH 117, PSR 102/211,
  DH PSH 129, PSO 109, arruelas (ISO, ciclo com/sem chanfro); Alterar programa (só desbaste); Ver programa.
- Rotina noturna (`Claude contexto/Rotina/*.ps1`): gerar, revisar, controle, imprimir, regerar, índice de .PIT, pit2mcs.
