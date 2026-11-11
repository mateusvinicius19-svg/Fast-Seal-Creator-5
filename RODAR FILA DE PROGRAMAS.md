# RODAR FILA DE PROGRAMAS — Kuru Nuvem → ARGUS

Este guia é para quem mantém o **Kuru Nuvem**. Ele explica como fazer o Kuru ler a fila de pedidos do Simulador CNC e gravar
cada pedido no cadastro do item no ARGUS, **sem mexer nas outras funções do Kuru** e sem risco de erro de sintaxe.

**O que o usuário quer:** quando o projetista salva ou imprime um desenho no Simulador CNC com o "Cód. interno" preenchido,
o item no ARGUS (Pargus > Catálogo de Itens) recebe sozinho:
- **Anexo 1** = caminho do PDF do desenho;
- **Código do programa** (aba Part Seals) = número do programa, sem zero à esquerda (ex.: 46198).

Hoje o Simulador grava o pedido na fila, mas ninguém aplica no ARGUS. A mensagem do Simulador mostra
"pedido ARGUS: item 46110 (Anexo 1 + programa 046198) na fila", e o pedido fica parado.

---

## 1. Resumo da implementação segura

| Regra | Por quê |
|---|---|
| Código novo **em um arquivo só** (`filaPedidosArgus.js`), pronto e testado nesta pasta | Não editar funções existentes do Kuru; menos chance de quebrar algo |
| O módulo **não importa nada do Kuru**: usa só `fs` e `path` do Node | Não cria dependência escondida; dá para testar fora do Kuru |
| O Kuru entrega ao módulo **duas funções** dele: `lerItem` e `gravarItem` | A gravação no ARGUS passa pela mesma rotina do F9 que o Kuru já usa |
| Começa em **modo simular** (`simular: true`): só confere e mostra o que faria | Primeiro dia sem gravar nada; o operador confere o log |
| **Liga/desliga** por configuração (`filaArgus.ativo`), desligado por padrão | Se der problema, desliga sem reinstalar |
| Roda **numa estação só** + arquivo `.lock` por pedido | Dois PCs não gravam o mesmo pedido |
| **Nunca sobrescreve** Anexo 1 ou programa diferente sem confirmação | Evita trocar programa de item que já estava certo |
| Erro **não fica tentando em loop**; só volta com "Reprocessar" | Não enche o ARGUS de tentativas |
| Nada é apagado: feitos e descartados vão para `feitos\`; JSON quebrado vira `.invalido` | Sempre dá para conferir o que aconteceu |
| Todo o código do módulo fica dentro de `try/catch` | Um pedido com problema não derruba o Kuru |

---

## 2. Arquivos (na pasta `Kuru - fila ARGUS/` deste repositório)

| Arquivo | O que é |
|---|---|
| `filaPedidosArgus.js` | O módulo. **Copiar o arquivo inteiro, sem editar.** |
| `teste-fila.js` | Teste automático com pasta temporária e ARGUS de mentira; não toca no W: nem no ARGUS. |

Baixe os arquivos pelo GitHub com **Download raw** (não copie do navegador pedaço por pedaço). Assim não entra caractere
errado nem falta linha.

**Antes de colocar no Kuru, confira:**

```bash
node --check filaPedidosArgus.js
```

```bash
node teste-fila.js
```

O primeiro não mostra nada se a sintaxe estiver certa. O segundo tem que terminar com **`TESTE OK`**.
Precisa de Node 16 ou mais novo (o Electron do Kuru já traz).

---

## 3. A fila (o que o Simulador grava)

- Pasta: `W:\Parts\PartsSeals\PROJETOS\DESENHOS\_PEDIDOS ARGUS\`
- Um arquivo por pedido: `<item>_<programa>.json` (UTF-8, às vezes com BOM; o módulo aceita os dois).
  Se o mesmo item e programa forem salvos de novo, o arquivo é sobrescrito.
- Quem grava: o Simulador (`pedidoArgus()` em `Simulador CNC.html`), a rotina em lote (`Claude contexto\Rotina\gerar.ps1`) e
  o script `Claude contexto\Rotina\pedidos_argus.ps1`. Os três usam o mesmo formato:

```json
{
  "item": "46110",
  "programa": "046198",
  "anexo1": "W:\\Parts\\PartsSeals\\PROJETOS\\DESENHOS\\PSA 108\\PSA 108 (170.4 X 176 X 1.3) 46198\\PSA 108 (170.4 X 176 X 1.3) 46198.pdf",
  "perfil": "PSA 108",
  "criado": "2026-11-11T14:31:21.041Z",
  "status": "pendente"
}
```

- `programa` pode vir vazio (`"sem-programa"` no nome do arquivo): aí só grava o Anexo 1.
- **Não mude esse formato.** Ele é usado pelos três lados.

**Status que o módulo escreve no próprio arquivo:**

| status | Onde fica | Significado |
|---|---|---|
| `pendente` | fila | Ainda não aplicado |
| `conflito` | fila | O item já tem **outro** Anexo 1 ou **outro** programa; campo `atual` mostra o que está lá. Espera confirmação |
| `erro` | fila | Campo `erro` com o motivo (PDF não existe, .PIT não existe, item não existe no ARGUS...) |
| `feito` | `feitos\` | Gravado e conferido; campos `gravado` (data/hora) e `estacao` |
| `descartado` | `feitos\` | Alguém clicou em Descartar |
| — (`.invalido`) | fila | JSON quebrado: o arquivo é renomeado para `.json.invalido`, sem reescrever |

---

## 4. Como ligar no Kuru (passo a passo)

### 4.1 Copiar o módulo
Copie `filaPedidosArgus.js` para uma pasta do processo **principal** do Electron (onde já existe acesso a arquivos),
por exemplo `src/main/filaPedidosArgus.js`. Não precisa instalar pacote nenhum.

### 4.2 Escrever o adaptador do ARGUS (a única parte nova escrita no Kuru)
O módulo pede duas funções `async`. **Use as rotinas que o Kuru já tem** para o Catálogo de Itens e o F9 Salvar no ARGUS.
Não abra conexão nova e não use usuário ou senha fora do Kuru.

```js
// adaptador: liga o modulo as rotinas que o Kuru JA tem (troque os nomes pelos reais do Kuru)
const argusAdaptador = {
  // devolve null se o item nao existe; senao { anexo1: '<texto atual>', programa: '<numero atual ou vazio>' }
  async lerItem(item) {
    const cad = await kuruArgus.buscarItemCatalogo(item);      // <- rotina existente do Kuru
    if (!cad) return null;
    return { anexo1: cad.ANEXO1 || '', programa: cad.CODIGO_PROGRAMA || '' };
  },
  // grava SO estes campos; campos.programa so vem quando o pedido tem programa
  async gravarItem(item, campos) {
    const alt = { ANEXO1: campos.anexo1 };
    if (campos.programa) alt.CODIGO_PROGRAMA = campos.programa;
    await kuruArgus.salvarItemCatalogo(item, alt);              // <- mesma rotina do F9 Salvar no ARGUS
  }
};
```

> Os nomes `kuruArgus.buscarItemCatalogo`, `salvarItemCatalogo`, `ANEXO1` e `CODIGO_PROGRAMA` são **exemplos**. Use os nomes
> reais do Kuru. O Código do programa precisa aceitar o número: hoje o campo recusa número novo com "Nenhum cadastro
> encontrado". Se o programa ainda não estiver no banco de programas do Kuru, registre-o dentro de `gravarItem` do mesmo
> jeito que o **Atribuir** faz (ou rode a resincronização daquele número) **antes** de gravar o campo.

Depois de gravar, o módulo chama `lerItem` de novo e confere se os valores ficaram certos. Se não ficaram, marca `erro`.

### 4.3 Ligar na inicialização, protegido
Coloque **só isto** no ponto onde o Kuru já inicia as tarefas automáticas (depois do login e da conexão com o ARGUS):

```js
// Fila de pedidos do Simulador -> ARGUS. Protegido: se falhar, o Kuru continua normal.
let filaArgus = null;
try {
  const cfgFila = configuracao.filaArgus || {};                 // <- onde o Kuru guarda configuracao
  const estaEstacao = configuracao.sistema && configuracao.sistema.estacaoJobsAutomaticos === nomeDestaEstacao;
  if (cfgFila.ativo === true && estaEstacao) {
    const { criarFila } = require('./filaPedidosArgus.js');
    filaArgus = criarFila({
      argus: argusAdaptador,
      simular: cfgFila.simular !== false,                       // padrao: simular (nao grava)
      estacao: nomeDestaEstacao,
      log: msg => registrarLog('fila-argus', msg),              // <- log que o Kuru ja tem
      auditoria: a => registrarAuditoria('argus-catalogo', a)   // <- argus-catalogo-auditoria.jsonl ou equivalente
    });
    filaArgus.iniciar();
  }
} catch (e) {
  registrarLog('fila-argus', 'nao iniciou: ' + e.message);
  filaArgus = null;
}
```

E no encerramento do Kuru:

```js
try { if (filaArgus) filaArgus.parar(); } catch (e) { /* nada */ }
```

**Configuração** (onde o Kuru guarda as dele):

```text
"filaArgus": { "ativo": false, "simular": true }      <- trecho dentro da configuração do Kuru
```

`configuracao`, `nomeDestaEstacao`, `registrarLog` e `registrarAuditoria` também são exemplos: use o que o Kuru já tem.
Se o Kuru não tiver uma estação marcada para tarefas automáticas, crie a opção e marque **um PC só**.

### 4.4 Tela "Pedidos do Simulador" (aba Projeto)
Um cartão novo em **Projeto**, junto de Lista Diária de Projeto e Castor. **Não colocar na Usinagem CNC.** Use o que o módulo
devolve:

| Ação na tela | Chamada |
|---|---|
| Listar pendentes, conflitos e erros | `filaArgus.listar()`; ler cada JSON para mostrar `item`, `programa`, `status`, `erro`, `atual` |
| **Aplicar agora** | `await filaArgus.varrer()`; devolve `[{ pedido, resultado }]` |
| **Reprocessar** (erro corrigido) | `filaArgus.reprocessar(nomeDoArquivo)` |
| **Confirmar troca** (conflito) | Perguntar "Item 24119 já tem programa 25650: trocar por 46198?" → se sim, `filaArgus.reprocessar(nomeDoArquivo, true)` |
| **Descartar** | `filaArgus.descartar(nomeDoArquivo)` (move para `feitos\`, não apaga) |

Se a tela roda no processo de **renderer**, chame essas funções por IPC (`ipcMain.handle`), do mesmo jeito que o Kuru já faz
com outras telas. Não dê acesso a `fs` ao renderer só por causa disto.

Quando um pedido for aplicado, mostre um aviso discreto. Se a OP do item estiver na Lista Diária de Projeto, a coluna
PROGRAMA passa a mostrar o número gravado.

---

## 5. Opções do módulo

| Opção | Padrão | Para quê |
|---|---|---|
| `argus` | (obrigatório) | `{ lerItem, gravarItem }` do item 4.2 |
| `simular` | `true` | `true` = não grava nem move arquivo; só registra no log |
| `pasta` | `W:\Parts\PartsSeals\PROJETOS\DESENHOS\_PEDIDOS ARGUS` | Pasta da fila |
| `pastaProgramas` | `W:\Parts\PartsSeals\PROJETOS\Programas_CNC` | Onde conferir se o `<programa>.PIT` existe |
| `intervaloMs` | `45000` | Varredura periódica (o `fs.watch` em pasta de rede falha às vezes) |
| `esperaArquivoMs` | `2000` | Arquivo mais novo que isso espera (o Simulador pode estar escrevendo) |
| `lockMaxMs` | `300000` | `.lock` mais velho que 5 min é sobra de travamento e é removido |
| `estacao`, `log`, `auditoria` | — | Nome do PC, função de log e função de auditoria (antes/depois) |

---

## 6. Ordem para colocar em produção

1. Rodar `node --check` e `node teste-fila.js` (**TESTE OK**).
2. Fazer o adaptador (4.2) e testar `lerItem` sozinho com um item conhecido (ex.: 46110) antes de ligar a fila.
3. Ligar com `"ativo": true, "simular": true` **só na estação marcada**. Salvar um desenho de teste no Simulador e conferir no
   log: `[SIMULAR] gravaria item ...`. Nada muda no ARGUS e nenhum arquivo sai da fila.
4. Passar para `"simular": false`. Fazer o teste de aceite (item 7).
5. Deixar uns dias olhando o log e a pasta `feitos\`.

**Para desfazer:** `"ativo": false` e reiniciar o Kuru. Os pedidos continuam na pasta e podem ser aplicados depois.

---

## 7. Teste de aceite

1. No Simulador, gerar um desenho com "Cód. interno" = item de teste e salvar → aparece `<item>_<programa>.json` na fila.
2. Em até 1 minuto, o cadastro do item no Pargus > Catálogo de Itens mostra Anexo 1 = PDF e Código do programa = número.
   O arquivo vai para `feitos\` com `"status": "feito"`.
3. Repetir com um item que já tem **outro** programa → fica `conflito`, nada é gravado e aparece a pergunta na tela.
4. Repetir com um PDF que não existe (edite o caminho no JSON) → fica `erro` com o motivo e não fica tentando de novo.
5. Ligar o Kuru em **dois PCs** ao mesmo tempo → só a estação marcada aplica.
6. Desligar a rede (W: fora) por um minuto → o Kuru continua funcionando; quando a rede volta, a fila continua.

---

## 8. Cuidados para não quebrar o resto do Kuru

- **Não edite** `filaPedidosArgus.js`. Se precisar de outro comportamento, mude por opção (item 5) ou peça a alteração neste
  repositório, para o teste continuar valendo.
- **Não mude** funções existentes do Kuru (Atribuir, F9, Comando Geral, Lista Diária). O adaptador só **chama** essas funções.
- **Não renomeie** campos do JSON nem a pasta da fila: o Simulador, a rotina em lote e o `pedidos_argus.ps1` dependem deles.
- **Não grave** outros campos do item além de Anexo 1 e Código do programa.
- **Não apague** arquivos da fila nem de `feitos\`.
- Use os mesmos acessos ao banco e ao ARGUS que o Kuru já tem. Não coloque usuário ou senha no código.
- Gere a versão do Kuru como sempre, teste numa estação e só depois distribua.

---

## 9. Conferência sem o Kuru (PowerShell)

O script `Claude contexto\Rotina\pedidos_argus.ps1` deste repositório lista a fila e confere se cada PDF existe:

```bash
powershell -ExecutionPolicy Bypass -File "Claude contexto\Rotina\pedidos_argus.ps1"
```

Ele também marca à mão: `-Feito <item>_<programa>` ou `-Erro <item>_<programa> -Motivo "..."`.

Especificação original (mais detalhes do pedido do usuário): `Claude contexto\ESPEC Kuru - pedidos ARGUS do Simulador.md`.
