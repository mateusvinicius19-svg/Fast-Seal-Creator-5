'use strict';
// Fila de pedidos do Simulador CNC -> cadastro do item no ARGUS (Anexo 1 + Codigo do programa).
// Modulo isolado: so usa 'fs' e 'path' do Node. Nao importa nada do Kuru; o Kuru entrega as funcoes do ARGUS em "argus".
const fs = require('fs');
const path = require('path');

const PADRAO = {
  pasta: 'W:\\Parts\\PartsSeals\\PROJETOS\\DESENHOS\\_PEDIDOS ARGUS',
  pastaProgramas: 'W:\\Parts\\PartsSeals\\PROJETOS\\Programas_CNC',
  intervaloMs: 45000,      // varredura (o fs.watch em pasta de rede falha as vezes)
  esperaArquivoMs: 2000,   // arquivo mais novo que isso: o Simulador ainda pode estar escrevendo
  lockMaxMs: 5 * 60000,    // lock mais velho que isso = sobra de um travamento
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
  let timer = null, watcher = null, rodando = false, deNovo = false;

  const agora = () => new Date().toISOString();
  const semZero = p => String(p || '').replace(/\D/g, '').replace(/^0+/, '');

  function lerJson(arq) {
    const txt = fs.readFileSync(arq, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(txt);
  }
  function gravarJson(arq, obj) {
    const tmp = arq + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(obj, null, 2), 'utf8');
    fs.renameSync(tmp, arq);
  }
  function pegarLock(arq) {
    const lk = arq + '.lock';
    try {
      fs.writeFileSync(lk, JSON.stringify({ estacao: cfg.estacao || '', em: agora() }), { flag: 'wx' });
      return lk;
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
      let velho = false;
      try { velho = Date.now() - fs.statSync(lk).mtimeMs > cfg.lockMaxMs; } catch (e2) { return null; }
      if (!velho) return null;
      try { fs.unlinkSync(lk); } catch (e3) { return null; }
      return pegarLock(arq);
    }
  }
  function soltarLock(lk) { try { if (lk) fs.unlinkSync(lk); } catch (e) { /* ja saiu */ } }

  // Confere o pedido. Devolve { erro } ou { ped, prog }.
  function conferir(ped) {
    if (!ped || typeof ped !== 'object') return { erro: 'JSON nao e um objeto' };
    const item = String(ped.item || '').trim();
    if (!/^\d+$/.test(item)) return { erro: 'item "' + item + '" nao e numero' };
    if (typeof ped.anexo1 !== 'string' || !ped.anexo1.trim()) return { erro: 'anexo1 vazio' };
    if (!fs.existsSync(ped.anexo1)) return { erro: 'PDF do anexo1 nao existe: ' + ped.anexo1 };
    const prog = semZero(ped.programa);
    if (prog) {
      const pit = path.join(cfg.pastaProgramas, prog.padStart(6, '0') + '.PIT');
      if (!fs.existsSync(pit)) return { erro: 'programa nao existe: ' + pit };
    }
    return { ped: Object.assign({}, ped, { item: item }), prog: prog };
  }

  // Um pedido. Devolve 'feito' | 'simulado' | 'conflito' | 'erro' | 'ocupado' | 'ignorado'.
  async function aplicar(arq) {
    const lk = pegarLock(arq);
    if (!lk) return 'ocupado';
    try {
      let bruto;
      try { bruto = lerJson(arq); } catch (e) {
        // JSON quebrado: nao reescreve (guarda o original como .invalido, fora da fila) e avisa
        log(path.basename(arq) + ' -> JSON invalido: ' + e.message);
        if (!cfg.simular) fs.renameSync(arq, arq + '.invalido');
        return 'erro';
      }
      if (bruto.status === 'erro' || bruto.status === 'conflito') return 'ignorado';   // so volta com Reprocessar
      const c = conferir(bruto);
      if (c.erro) return marcar(arq, Object.assign(bruto, { status: 'erro', erro: c.erro }));
      const ped = c.ped, prog = c.prog;

      const atual = await argus.lerItem(ped.item);
      if (!atual) return marcar(arq, Object.assign(bruto, { status: 'erro', erro: 'item ' + ped.item + ' nao existe no ARGUS' }));
      const anexoAtual = String(atual.anexo1 || '').trim();
      const progAtual = semZero(atual.programa);
      const conflitos = [];
      if (anexoAtual && anexoAtual.toLowerCase() !== ped.anexo1.trim().toLowerCase()) conflitos.push('Anexo 1 atual: ' + anexoAtual);
      if (prog && progAtual && progAtual !== prog) conflitos.push('programa atual: ' + progAtual);
      if (conflitos.length && !bruto.confirmado) {
        return marcar(arq, Object.assign(bruto, { status: 'conflito', atual: { anexo1: anexoAtual, programa: progAtual }, erro: conflitos.join('; ') }));
      }

      const campos = { anexo1: ped.anexo1 };
      if (prog) campos.programa = prog;
      if (cfg.simular) { log('[SIMULAR] gravaria item ' + ped.item + ': ' + JSON.stringify(campos)); return 'simulado'; }

      await argus.gravarItem(ped.item, campos);
      const depois = await argus.lerItem(ped.item);
      if (!depois || String(depois.anexo1 || '').trim().toLowerCase() !== ped.anexo1.trim().toLowerCase() || (prog && semZero(depois.programa) !== prog)) {
        return marcar(arq, Object.assign(bruto, { status: 'erro', erro: 'gravou, mas a releitura do ARGUS nao confere' }));
      }
      if (typeof cfg.auditoria === 'function') {
        try { cfg.auditoria({ item: ped.item, antes: { anexo1: anexoAtual, programa: progAtual }, depois: campos, em: agora() }); } catch (e) { log('auditoria: ' + e.message); }
      }
      fs.mkdirSync(feitos, { recursive: true });
      const fim = Object.assign(bruto, { status: 'feito', gravado: agora(), estacao: cfg.estacao || '' });
      delete fim.erro;
      gravarJson(path.join(feitos, path.basename(arq)), fim);
      fs.unlinkSync(arq);
      log('feito: ' + path.basename(arq));
      return 'feito';
    } catch (e) {
      try { const b = lerJson(arq); return marcar(arq, Object.assign(b, { status: 'erro', erro: e.message })); } catch (e2) { log('erro em ' + arq + ': ' + e.message); return 'erro'; }
    } finally {
      soltarLock(lk);
    }
  }

  function marcar(arq, obj) {
    obj.atualizado = agora();
    if (cfg.simular) { log('[SIMULAR] ' + path.basename(arq) + ' -> ' + obj.status + (obj.erro ? ' (' + obj.erro + ')' : '')); return obj.status; }
    gravarJson(arq, obj);
    log(path.basename(arq) + ' -> ' + obj.status + (obj.erro ? ' (' + obj.erro + ')' : ''));
    return obj.status;
  }

  function listar() {
    if (!fs.existsSync(cfg.pasta)) return [];
    return fs.readdirSync(cfg.pasta)
      .filter(n => /^\d+_[\w-]+\.json$/i.test(n))
      .map(n => path.join(cfg.pasta, n));
  }

  // Uma varredura. Nunca roda duas ao mesmo tempo.
  async function varrer() {
    if (rodando) { deNovo = true; return []; }
    rodando = true;
    const res = [];
    try {
      do {
        deNovo = false;
        for (const arq of listar()) {
          let novo = false;
          try { novo = Date.now() - fs.statSync(arq).mtimeMs < cfg.esperaArquivoMs; } catch (e) { continue; }
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
