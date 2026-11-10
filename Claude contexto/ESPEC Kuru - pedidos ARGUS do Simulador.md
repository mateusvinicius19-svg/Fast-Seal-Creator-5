# Kuru Nuvem: gravar no ARGUS os pedidos do Simulador CNC

Especificação para quem mantém o Kuru Nuvem. Pedido do usuário (Mateus, 10/11/2026): **quando ele salva ou imprime um
desenho no Simulador CNC, o cadastro do item no ARGUS deve receber, sozinho, o PDF no Anexo 1 e o número do programa no
Código do programa.**

O Simulador é uma página HTML aberta no navegador e não acessa o ARGUS. A partir da v5.6.0 ele deixa um **pedido** numa
pasta de rede. O Kuru, que já grava no ARGUS (Pargus, Atribuir, F9 Salvar no ARGUS), deve ler essa pasta e aplicar cada pedido.

## 1. Fila

- Pasta: `W:\Parts\PartsSeals\PROJETOS\DESENHOS\_PEDIDOS ARGUS\`.
- Um arquivo por pedido: `<item>_<programa>.json`, UTF-8. Se o mesmo item e programa forem salvos de novo, o arquivo é sobrescrito.
- Conteúdo:

```json
{
  "item": "45996",
  "programa": "046134",
  "anexo1": "W:\\Parts\\PartsSeals\\PROJETOS\\DESENHOS\\PSA 108\\PSA 108 (75 X 79 X 4) 46134\\PSA 108 (75 X 79 X 4) 46134.pdf",
  "perfil": "PSA 108",
  "criado": "2026-11-10T14:31:21.041Z",
  "status": "pendente"
}
```

- `programa` pode vir vazio: aí grava só o Anexo 1.
- Subpasta `feitos\`: onde ficam os pedidos já aplicados. O script `Claude contexto\Rotina\pedidos_argus.ps1` já usa esse formato.

## 2. O que o Kuru deve fazer

1. **Uma estação só.** Rodar na estação marcada (a do Castor, `sistema.estacaoJobsAutomaticos` ou equivalente), para dois PCs
   não aplicarem o mesmo pedido. Antes de aplicar, criar `<pedido>.lock` e apagar no fim; ignorar arquivos com lock de menos de 5 min.
2. **Vigiar a pasta.** Usar `fs.watch` e também uma varredura a cada 30–60 s, porque o watch em pasta de rede falha às vezes.
   Esperar cerca de 2 s depois que o arquivo aparece, para o Simulador terminar de escrever.
3. **Conferir antes de gravar:**
   - O JSON é válido e `item` só tem dígitos.
   - O item existe no ARGUS.
   - O arquivo `anexo1` existe.
   - Se `programa` vier preenchido, o .PIT `W:\Parts\PartsSeals\PROJETOS\Programas_CNC\<programa>.PIT` existe. Se o programa ainda
     não estiver no banco de programas, registrar como o Atribuir faz, ou rodar a resincronização daquele número. Hoje o campo
     "Código do programa" recusa número novo com "Nenhum cadastro encontrado".
4. **Gravar no cadastro**, com a mesma rotina do F9 Salvar no ARGUS:
   - `ANEXO1` = `anexo1`.
   - Código do programa = `programa` (aba Part Seals), sem zero à esquerda, como o Kuru já mostra (ex.: 46134).
   - Se a OP do item estiver na lista do dia e sem programa, vincular como o Atribuir faz.
5. **Conflito, sem sobrescrever às cegas.** Se o cadastro já tiver *outro* Anexo 1 ou *outro* Código do programa, não gravar.
   Marcar `"status": "conflito"` com os valores atuais e avisar na tela ("Item 24119 já tem programa 25650: trocar por 46136?").
   Aplicar só depois de confirmado.
6. **Resultado:**
   - Deu certo: mover o arquivo para `feitos\`, com `"status": "feito"`, `"gravado": "<data hora>"` e o usuário/estação.
   - Deu erro: deixar o arquivo na fila, com `"status": "erro"` e `"erro": "<motivo>"`, sem tentar de novo em loop. Tentar de novo
     só quando o arquivo mudar ou quando alguém clicar em reprocessar.
   - Registrar na auditoria do Kuru (`argus-catalogo-auditoria.jsonl` ou equivalente) o item, os campos e os valores antes e depois.
7. **Tela.** Uma lista simples no Pargus ("Pedidos do Simulador") com pendentes, conflitos e erros, mais os botões Aplicar,
   Reprocessar e Descartar. Um aviso discreto quando um pedido for aplicado.

## 3. Fora do escopo

- O Simulador não muda. Ele já grava os pedidos (v5.6.0, `pedidoArgus()` em `Simulador CNC.html`).
- Não usar usuário ou senha do banco fora do Kuru. A gravação passa pela conexão que o Kuru já tem com o ARGUS.

## 4. Teste de aceite

1. No Simulador, gerar um desenho com "Cód. interno" = item de teste e salvar. Aparece `<item>_<programa>.json` na fila.
2. Em até 1 minuto, o cadastro do item no Pargus > Catálogo de Itens mostra o Anexo 1 = PDF e o Código do programa = número.
   O arquivo vai para `feitos\`.
3. Repetir com um item que já tem outro programa: o pedido fica como "conflito", nada é gravado e aparece a pergunta.
4. Repetir com um caminho de PDF que não existe: fica como "erro", com o motivo.
