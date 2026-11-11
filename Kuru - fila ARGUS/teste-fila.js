'use strict';
// Teste do filaPedidosArgus.js numa pasta temporaria, com um ARGUS de mentira (nao toca no W: nem no ARGUS).
// Rodar:  node teste-fila.js      -> tem que terminar com "TESTE OK"
const fs = require('fs'), path = require('path'), os = require('os'), assert = require('assert');
const { criarFila } = require('./filaPedidosArgus.js');
(async () => {
  const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'fila-')), q = path.join(raiz, 'fila'), progs = path.join(raiz, 'progs');
  fs.mkdirSync(q); fs.mkdirSync(progs);
  const pdf = path.join(raiz, 'a.pdf'); fs.writeFileSync(pdf, 'x'); fs.writeFileSync(path.join(progs, '046198.PIT'), 'x');
  const velho = f => { const t = new Date(Date.now() - 10000); fs.utimesSync(f, t, t); };
  const ped = (nome, o) => { const f = path.join(q, nome); fs.writeFileSync(f, '﻿' + JSON.stringify(Object.assign({ status: 'pendente' }, o))); velho(f); };
  ped('46110_046198.json', { item: '46110', programa: '046198', anexo1: pdf });          // normal
  ped('24119_046198.json', { item: '24119', programa: '046198', anexo1: pdf });          // item ja tem outro programa
  ped('1_046199.json', { item: '1', programa: '046199', anexo1: pdf });                  // .PIT nao existe
  ped('2_sem-programa.json', { item: '2', programa: '', anexo1: path.join(raiz, 'x.pdf') }); // PDF nao existe
  fs.writeFileSync(path.join(q, '3_x.json'), '{quebrado'); velho(path.join(q, '3_x.json')); // JSON quebrado
  const db = { '46110': {}, '24119': { programa: '25650' }, '1': {} };
  const argus = { lerItem: async i => (db[i] ? Object.assign({}, db[i]) : null), gravarItem: async (i, c) => { Object.assign(db[i], c); } };
  const res = r => Object.fromEntries(r.map(x => [x.pedido, x.resultado]));

  // 1) modo simular: nada muda
  let f = criarFila({ pasta: q, pastaProgramas: progs, argus });
  let r = res(await f.varrer());
  assert.strictEqual(r['46110_046198.json'], 'simulado');
  assert.strictEqual(r['24119_046198.json'], 'conflito');
  assert.strictEqual(r['1_046199.json'], 'erro');
  assert.strictEqual(r['2_sem-programa.json'], 'erro');
  assert.deepStrictEqual(db['46110'], {});
  assert.strictEqual(fs.existsSync(path.join(q, 'feitos')), false);

  // 2) modo real
  const aud = [];
  f = criarFila({ pasta: q, pastaProgramas: progs, argus, simular: false, auditoria: a => aud.push(a) });
  r = res(await f.varrer());
  assert.strictEqual(r['46110_046198.json'], 'feito');
  assert.deepStrictEqual(db['46110'], { anexo1: pdf, programa: '46198' });
  assert.strictEqual(db['24119'].programa, '25650');                         // conflito nao sobrescreve
  assert.ok(fs.existsSync(path.join(q, 'feitos', '46110_046198.json')));
  assert.ok(fs.existsSync(path.join(q, '3_x.json.invalido')));               // JSON quebrado guardado, fora da fila
  assert.strictEqual(lerStatus(q, '24119_046198.json'), 'conflito');
  assert.strictEqual(aud.length, 1);

  // 3) Reprocessar com confirmacao troca o programa do 24119
  f.reprocessar('24119_046198.json', true);
  fs.readdirSync(q).filter(n => n.endsWith('.json')).forEach(n => velho(path.join(q, n)));
  r = res(await f.varrer());
  assert.strictEqual(r['24119_046198.json'], 'feito');
  assert.strictEqual(db['24119'].programa, '46198');
  assert.strictEqual(r['1_046199.json'], 'ignorado');                        // erro nao fica tentando em loop

  // 4) Descartar move para feitos\ (nao apaga)
  f.descartar('2_sem-programa.json');
  assert.ok(fs.existsSync(path.join(q, 'feitos', '2_sem-programa.json')));
  fs.rmSync(raiz, { recursive: true, force: true });
  console.log('TESTE OK');
})().catch(e => { console.error('TESTE FALHOU:', e.message); process.exit(1); });
function lerStatus(q, n) { return JSON.parse(fs.readFileSync(path.join(q, n), 'utf8').replace(/^﻿/, '')).status; }
