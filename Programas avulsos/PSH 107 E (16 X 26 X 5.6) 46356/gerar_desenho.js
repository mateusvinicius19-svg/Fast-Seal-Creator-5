// node gerar_desenho.js "<saida sem extensao>"  -> desenho do PSH 107 E (16 X 26 X 5.6) 46356 (UHMW) em PDF/PNG
// Secção do STL do Inventor pelo "Desenho do 3D" (rev3DParams), INVERTIDA (rev3DFlip): face do canal à direita = Z0 do programa
// (usuário 18/11/2026: "o desenho sempre precisa ser igual o programa") + cota da abertura do canal (2,9) na face.
const path = require("path"); const { chromium } = require("playwright");
const out = process.argv[2] || path.join(__dirname, "PSH 107 E (16 X 26 X 5.6) 46356");
(async () => { const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 1500, height: 900 } }); pg.on("pageerror", e => console.log("ERR", e.message));
await pg.goto("file://" + path.resolve(__dirname, "..", "..", "Simulador CNC.html"));
const svg = await pg.evaluate(() => {
  // secção do STL: [a (0 = face do canal), raio]
  let poly = [[0,8.05],[0,8.95],[3.2,8.95],[3.2,11.85],[0,11.85],[0,13.1],[0.2,13.3],[5.35,13.0],[5.6,12.75],[5.6,8.2445],[5.35,8.1],[0.2,7.85]];
  const area = l => { let A = 0; for (let i = 0; i < l.length; i++){ const p = l[i], q = l[(i + 1) % l.length]; A += p[0] * q[1] - q[0] * p[1]; } return A / 2; };
  if (area(poly) < 0) poly.reverse();
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "46356"); set("mat", "UHMW");
  const p0 = rev3DParams("PSH 107 E (16 X 26 X 5.6).stl", poly, 5.6); p0.desc = "PSH 107 E"; p0.mat = "UHMW";
  const q = rev3DFlip(p0); q.desc = "PSH 107 E"; q.mat = "UHMW"; q.dint = 16; q.dext = 26;   // carimbo/pasta com as medidas do item
  q.tolD = { "11.850": ["0", "-0.1"], "8.950": ["0.1", "0"] };   // usuário 24/11/2026: canal Ø23,7 0/−0,1 e Ø17,9 +0,1/0
  const pl = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    const rmin = Math.min(...pl.map(v => v[1])), rmax = Math.max(...pl.map(v => v[1])), Hh = rmax - rmin;
    const bx0 = PT ? 170 : 650, bx1 = PT ? 600 : 970, by0 = PT ? 530 : 150, by1 = PT ? 715 : 390;   // mesma caixa da secção do rev3DViews
    const s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60), ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2;
    const X = a => ox + a * s, Y = r => oy - (r - rmin) * s;
    const wall = pl.filter(v => Math.abs(v[0] - L) < 1e-6 && v[1] > rmin + 0.5 && v[1] < rmax - 0.5).map(v => v[1]).sort((a, b) => a - b);
    const r1 = wall[0], r2 = wall[wall.length - 1], x = X(L) - 14, y1 = Y(r2), y2 = Y(r1), tx = x - 6, ty = (y1 + y2) / 2;
    g += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>` +
         `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${tolMk(fv3(r2 - r1), "0", "-0.1")}</text>`;   // usuário 24/11/2026: abertura do canal de 2,8 a 2,9
    return g; };
  state.orient = "portrait"; return drawingSVG(q); });
const html = `<html><head><style>@page{size:A4;margin:0}body{margin:0}svg{width:210mm;height:297mm;display:block}</style></head><body>${svg}</body></html>`;
const p2 = await b.newPage(); await p2.setContent(html); await p2.pdf({ path: out + ".pdf", format: "A4", printBackground: true });
await p2.setViewportSize({ width: 794, height: 1123 }); await p2.screenshot({ path: out + ".png", fullPage: true });
await b.close(); })();
