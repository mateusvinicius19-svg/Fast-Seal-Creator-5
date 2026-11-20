'use strict';
// Fila de pedidos do Simulador CNC -> cadastro do item no ARGUS (Anexo 1 + Codigo do programa).
// Modulo isolado: so usa 'fs' e 'path' do Node. Nao importa nada do Kuru; o Kuru entrega as funcoes do ARGUS em "argus".
// v5.87.0: a varredura automatica (a cada 45 s e a cada pedido novo) acessa o W: sem travar o Kuru (fs.promises):
// se o W: ficar lento ou sumir, so a fila espera; a janela do Kuru continua respondendo. Os botoes (listar, reprocessar,
// descartar, conferir) continuam do mesmo jeito de antes, para nao mudar nada no Kuru.
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const PADRAO = {
  pasta: 'W:\\Parts\\PartsSeals\\PROJETOS\\DESENHOS\\_PEDIDOS ARGUS',
  pastaProgramas: 'W:\\Parts\\PartsSeals\\PROJETOS\\Programas_CNC',
  intervaloMs: 45000,      // varredura (o fs.watch em pasta de rede falha as vezes)
  esperaArquivoMs: 2000,   // arquivo mais novo que isso: o Simulador ainda pode estar escrevendo
  lockMaxMs: 5 * 60000,    // lock mais velho que isso = sobra de um travamento
  presaMs: 10 * 60000,     // varredura rodando ha mais que isso = W: nao responde (so avisa no log)
  simular: true            // true = so confere e registra o que faria; nao grava no ARGUS nem move arquivo
};

function criarFila(opcoes) {
  const cfg = Object.assign({}, PADRAO, opcoes || {});
  const argus = cfg.argus;
  if (!argus || typeof argus.lerItem !== 'function' || typeof argus.gravarItem !== 'function') {
    throw new Error('filaPedidosArgus: informe argus.lerItem(item) e argus.gravarItem(item, campos)');
  }
  const log = typeof cfg.log === 'function' ? cfg.log : () => {};
  const feitos = path.join(cfg.pasta, 'feitos');
  let timer = null, watcher = null, rodando = false, deNovo = false, inicioVarredura = 0, avisouPresa = false;

  const agora = () => new Date().toISOString();
  const semZero = p => String(p || '').replace(/\D/g, '').replace(/^0+/, '');
  const existe = async f => { try { await fsp.access(f); return true; } catch (e) { return false; } };

  // ---- usados pelos botoes (iguais a antes) ----
  function lerJson(arq) {
    const txt = fs.readFileSync(arq, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(txt);
  }
  function gravarJson(arq, obj) {
    const tmp = arq + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf8');
    fs.renameSync(tmp, arq);
  }

  // ---- usados pela varredura automatica (nao travam o Kuru) ----
  async function lerJsonA(arq) {
    const txt = (await fsp.readFile(arq, 'utf8')).replace(/^\uFEFF/, '');
    return JSON.parse(txt);
  }
  async function gravarJsonA(arq, obj) {
    const tmp = arq + '.tmp';
    await fsp.writeFile(tmp, JSON.stringify(obj, null, 2), 'utf8');
    await fsp.rename(tmp, arq);
  }
  async function pegarLock(arq) {
    const lk = arq + '.lock';
    try {
      await fsp.writeFile(lk, JSON.stringify({ estacao: cfg.estacao || '', em: agora() }), { flag: 'wx' });
      return lk;
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
      let velho = false;
      try { velho = Date.now() - (await fsp.stat(lk)).mtimeMs > cfg.lockMaxMs; } catch (e2) { return null; }
      if (!velho) return null;
      try { await fsp.unlink(lk); } catch (e3) { return null; }
      return pegarLock(arq);
    }
  }
  async function soltarLock(lk) { try { if (lk) await fsp.unlink(lk); } catch (e) { /* ja saiu */ } }

  // Confere o pedido. Devolve { erro } ou { ped, prog }. conferir = botoes (sincrono), conferirA = varredura.
  function conferirBase(ped) {
    if (!ped || typeof ped !== 'object') return { erro: 'JSON nao e um objeto' };
    const item = String(ped.item || '').trim();
    if (!/^\d+$/.test(item)) return { erro: 'item "' + item + '" nao e numero' };
    if (typeof ped.anexo1 !== 'string' || !ped.anexo1.trim()) return { erro: 'anexo1 vazio' };
    const prog = semZero(ped.programa);
    // v5.88.0: "arquivoPrograma" = nome real do .PIT (ex.: "046198 164X205.PIT"); sem ele, NNNNNN.PIT
    const n6 = prog.padStart(6, '0'), a = String(ped.arquivoPrograma || '').trim();
    const nomePit = a.startsWith(n6) && /\.PIT$/i.test(a) && !/[\\/]/.test(a) ? a : n6 + '.PIT';
    const pit = prog ? path.join(cfg.pastaProgramas, nomePit) : '';
    return { ped: Object.assign({}, ped, { item: item }), prog: prog, pit: pit };
  }
  function conferir(ped) {
    const c = conferirBase(ped);
    if (c.erro) return c;
    if (!fs.existsSync(c.ped.anexo1)) return { erro: 'PDF do anexo1 nao existe: ' + c.ped.anexo1 };
    if (c.pit && !fs.existsSync(c.pit)) return { erro: 'programa nao existe: ' + c.pit };
    return { ped: c.ped, prog: c.prog };
  }
  async function conferirA(ped) {
    const c = conferirBase(ped);
    if (c.erro) return c;
    if (!(await existe(c.ped.anexo1))) return { erro: 'PDF do anexo1 nao existe: ' + c.ped.anexo1 };
    if (c.pit && !(await existe(c.pit))) return { erro: 'programa nao existe: ' + c.pit };
    return { ped: c.ped, prog: c.prog };
  }

  // Um pedido. Devolve 'feito' | 'simulado' | 'conflito' | 'erro' | 'ocupado' | 'ignorado'.
  async function aplicar(arq) {
    const lk = await pegarLock(arq);
    if (!lk) return 'ocupado';
    try {
      let bruto;
      try { bruto = await lerJsonA(arq); } catch (e) {
        // JSON quebrado: nao reescreve (guarda o original como .invalido, fora da fila) e avisa
        log(path.basename(arq) + ' -> JSON invalido: ' + e.message);
        if (!cfg.simular) await fsp.rename(arq, arq + '.invalido');
        return 'erro';
      }
      if (bruto.status === 'erro' || bruto.status === 'conflito') return 'ignorado';   // so volta com Reprocessar
      const c = await conferirA(bruto);
      if (c.erro) return await marcar(arq, Object.assign(bruto, { status: 'erro', erro: c.erro }));
      const ped = c.ped, prog = c.prog;

      const atual = await argus.lerItem(ped.item);
      if (!atual) return await marcar(arq, Object.assign(bruto, { status: 'erro', erro: 'item ' + ped.item + ' nao existe no ARGUS' }));
      const anexoAtual = String(atual.anexo1 || '').trim();
      const progAtual = semZero(atual.programa);
      const conflitos = [];
      if (anexoAtual && anexoAtual.toLowerCase() !== ped.anexo1.trim().toLowerCase()) conflitos.push('Anexo 1 atual: ' + anexoAtual);
      if (prog && progAtual && progAtual !== prog) conflitos.push('programa atual: ' + progAtual);
      if (conflitos.length && !bruto.confirmado) {
        return await marcar(arq, Object.assign(bruto, { status: 'conflito', atual: { anexo1: anexoAtual, programa: progAtual }, erro: conflitos.join('; ') }));
      }

      const campos = { anexo1: ped.anexo1 };
      if (prog) campos.programa = prog;
      if (cfg.simular) { log('[SIMULAR] gravaria item ' + ped.item + ': ' + JSON.stringify(campos)); return 'simulado'; }

      await argus.gravarItem(ped.item, campos);
      const depois = await argus.lerItem(ped.item);
      if (!depois || String(depois.anexo1 || '').trim().toLowerCase() !== ped.anexo1.trim().toLowerCase() || (prog && semZero(depois.programa) !== prog)) {
        return await marcar(arq, Object.assign(bruto, { status: 'erro', erro: 'gravou, mas a releitura do ARGUS nao confere' }));
      }
      if (typeof cfg.auditoria === 'function') {
        try { cfg.auditoria({ item: ped.item, antes: { anexo1: anexoAtual, programa: progAtual }, depois: campos, em: agora() }); } catch (e) { log('auditoria: ' + e.message); }
      }
      await fsp.mkdir(feitos, { recursive: true });
      const fim = Object.assign(bruto, { status: 'feito', gravado: agora(), estacao: cfg.estacao || '' });
      delete fim.erro;
      await gravarJsonA(path.join(feitos, path.basename(arq)), fim);
      await fsp.unlink(arq);
      log('feito: ' + path.basename(arq));
      return 'feito';
    } catch (e) {
      try { const b = await lerJsonA(arq); return await marcar(arq, Object.assign(b, { status: 'erro', erro: e.message })); } catch (e2) { log('erro em ' + arq + ': ' + e.message); return 'erro'; }
    } finally {
      await soltarLock(lk);
    }
  }

  async function marcar(arq, obj) {
    obj.atualizado = agora();
    if (cfg.simular) { log('[SIMULAR] ' + path.basename(arq) + ' -> ' + obj.status + (obj.erro ? ' (' + obj.erro + ')' : '')); return obj.status; }
    await gravarJsonA(arq, obj);
    log(path.basename(arq) + ' -> ' + obj.status + (obj.erro ? ' (' + obj.erro + ')' : ''));
    return obj.status;
  }

  const ehPedido = n => /^\d+_[\w-]+\.json$/i.test(n);
  function listar() {
    if (!fs.existsSync(cfg.pasta)) return [];
    return fs.readdirSync(cfg.pasta).filter(ehPedido).map(n => path.join(cfg.pasta, n));
  }
  async function listarA() {
    let nomes;
    try { nomes = await fsp.readdir(cfg.pasta); } catch (e) { if (e.code === 'ENOENT') return []; throw e; }
    return nomes.filter(ehPedido).map(n => path.join(cfg.pasta, n));
  }

  // Uma varredura. Nunca roda duas ao mesmo tempo.
  async function varrer() {
    if (rodando) {
      deNovo = true;
      if (!avisouPresa && Date.now() - inicioVarredura > cfg.presaMs) {
        avisouPresa = true;
        log('varredura esperando o W: ha ' + Math.round((Date.now() - inicioVarredura) / 60000) + ' min (rede lenta ou fora?). O Kuru segue normal; a fila continua sozinha quando o W: voltar.');
      }
      return [];
    }
    rodando = true; inicioVarredura = Date.now(); avisouPresa = false;
    const res = [];
    try {
      do {
        deNovo = false;
        for (const arq of await listarA()) {
          let novo = false;
          try { novo = Date.now() - (await fsp.stat(arq)).mtimeMs < cfg.esperaArquivoMs; } catch (e) { continue; }
          if (novo) { deNovo = true; continue; }
          res.push({ pedido: path.basename(arq), resultado: await aplicar(arq) });
        }
        if (deNovo) await new Promise(r => setTimeout(r, cfg.esperaArquivoMs));
      } while (deNovo && timer);
    } catch (e) {
      log('varredura: ' + e.message);
    } finally {
      rodando = false;
    }
    return res;
  }

  // Botao Reprocessar: volta para pendente (com confirmar=true aceita trocar o que ja estava no cadastro).
  function reprocessar(nome, confirmar) {
    const arq = path.join(cfg.pasta, path.basename(nome));
    const b = lerJson(arq);
    b.status = 'pendente';
    delete b.erro; delete b.atual;
    if (confirmar) b.confirmado = true;
    gravarJson(arq, b);
  }
  // Botao Descartar: move para feitos\ como descartado (nao apaga).
  function descartar(nome) {
    const arq = path.join(cfg.pasta, path.basename(nome));
    const b = lerJson(arq);
    b.status = 'descartado'; b.descartado = agora();
    fs.mkdirSync(feitos, { recursive: true });
    gravarJson(path.join(feitos, path.basename(arq)), b);
    fs.unlinkSync(arq);
  }

  function iniciar() {
    if (timer) return;
    timer = setInterval(() => { varrer(); }, cfg.intervaloMs);
    try {
      watcher = fs.watch(cfg.pasta, () => { setTimeout(() => { varrer(); }, cfg.esperaArquivoMs); });
      watcher.on('error', e => { log('watch: ' + e.message); try { watcher.close(); } catch (e2) { /* */ } watcher = null; });
    } catch (e) { log('watch indisponivel (fica so a varredura): ' + e.message); }
    varrer();
  }
  function parar() {
    if (timer) { clearInterval(timer); timer = null; }
    if (watcher) { try { watcher.close(); } catch (e) { /* */ } watcher = null; }
  }

  return { iniciar, parar, varrer, listar, reprocessar, descartar, conferir, config: cfg };
}

module.exports = { criarFila };
