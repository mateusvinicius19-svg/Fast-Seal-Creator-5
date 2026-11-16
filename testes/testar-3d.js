// Teste do "Desenho do 3D (Inventor)": gera um STL do VEDADOR 272x291x19 (perfil conhecido, eixo Z e Y, centro fora da origem),
// abre no Simulador e confere a secção (16 cantos, Ø272 / Ø291, largura 19). Rodar: node testes/testar-3d.js
const path = require("path"), fs = require("fs"), os = require("os");
const { chromium } = require("playwright");
function stl(file, prof, N, ax, c1, c2){
  const tris = [], P = (a, r, th) => { const v = [0, 0, 0], u = (ax + 1) % 3, w = (ax + 2) % 3; v[ax] = a + 5; v[u] = c1 + r * Math.cos(th); v[w] = c2 + r * Math.sin(th); return v; };
  for (let k = 0; k < N; k++){ const t0 = 2 * Math.PI * k / N, t1 = 2 * Math.PI * (k + 1) / N;
    for (let i = 0; i < prof.length; i++){ const [a0, r0] = prof[i], [a1, r1] = prof[(i + 1) % prof.length];
      tris.push([P(a0, r0, t0), P(a1, r1, t0), P(a1, r1, t1)], [P(a0, r0, t0), P(a1, r1, t1), P(a0, r0, t1)]); } }
  const b = Buffer.alloc(84 + 50 * tris.length); b.writeUInt32LE(tris.length, 80);
  tris.forEach((t, i) => t.forEach((v, j) => v.forEach((c, k) => b.writeFloatLE(c, 84 + 50 * i + 12 + 12 * j + 4 * k))));
  fs.writeFileSync(file, b);
}
(async () => {
  const L = 19, c = .3, cm = .5, H = 9.5, RB = 136;
  const prof = [[c,H],[L-c,H],[L,H-c],[L,7.7],[L-cm,7.2],[16.7,7.2],[16.7,4.2],[L-cm,4.2],[L,3.7],[L,2.8],[L-c,2.5],[10,2.5],[10,0],[8.5,0],[0,8.5],[0,H-c]].map(([a, h]) => [a, RB + h]);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fsc3d-")), b = await chromium.launch(), pg = await b.newPage();
  const errs = []; pg.on("pageerror", e => errs.push(e.message));
  await pg.goto("file://" + path.resolve(__dirname, "..", "Simulador CNC.html"));
  let falhou = 0;
  for (const [ax, N] of [[2, 180], [1, 96]]){
    const f = path.join(dir, `VEDADOR teste ${ax}.stl`); stl(f, prof, N, ax, 37, -12);
    await pg.setInputFiles("#file3D", f); await pg.waitForTimeout(500);
    const r = await pg.evaluate(() => { const p = state.genParams || {}; return { n: (p.customProfile || []).length, di: p.dint, de: p.dext, h: p.h, ban: (document.getElementById("errBanner") || {}).textContent || "" }; });
    const ok = r.n === 16 && Math.abs(r.di - 272) < 1e-6 && Math.abs(r.de - 291) < 1e-6 && Math.abs(r.h - 19) < 1e-3 && !r.ban && !errs.length;
    console.log((ok ? "ok      " : "FALHOU  ") + `eixo ${"XYZ"[ax]}, ${N} facetas: ${r.n} cantos, Ø${r.di} x Ø${r.de} x ${r.h} ${r.ban} ${errs.join("; ")}`);
    if (!ok) falhou++;
    await pg.click("#pvClose").catch(() => {});
  }
  await b.close(); process.exit(falhou ? 1 : 0);
})();
