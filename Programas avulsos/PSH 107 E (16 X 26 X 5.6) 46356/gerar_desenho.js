// node gerar_desenho.js "<saida sem extensao>"  -> desenho do PSH 107 E (16 X 26 X 5.6) 46356 (UHMW) em PDF/PNG
// Secção do STL do Inventor pelo "Desenho do 3D" (rev3DParams), INVERTIDA (rev3DFlip): face do canal à direita = Z0 do programa
// (usuário 18/11/2026: "o desenho sempre precisa ser igual o programa") + cota da abertura do canal (2,9) na face.
// Usuário 24/11/2026: canal com tolerância — abertura 2,9 0/−0,1 (2,8 a 2,9), Ø23,7 0/−0,1, Ø17,9 +0,1/0, profundidade 3,2 0/−0,1;
// e as cotas da SECÇÃO no estilo da imagem que ele mandou: cada Ø com linha de chamada horizontal e seta vertical (texto em pé
// ao lado da seta), sem a cota corrida embaixo. Vista frontal e corte A-A continuam os do rev3DViews.
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
  const pl = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, orig = q.customViews;
  q.customViews = (pp, PT) => { const g0 = orig(pp, PT);
    // do rev3DViews fica só o contorno da secção (1º path) e as vistas frontal / corte A-A (depois do título da secção)
    const tit = "SECÇÃO (ampliada)</text>", front = g0.slice(g0.indexOf(tit) + tit.length), outline = g0.match(/<path [^>]*class="p"\/>/)[0];
    const rmin = Math.min(...pl.map(v => v[1])), rmax = Math.max(...pl.map(v => v[1])), Hh = rmax - rmin;
    const bx0 = PT ? 170 : 650, bx1 = PT ? 600 : 970, by0 = PT ? 530 : 150, by1 = PT ? 715 : 390;   // mesma caixa da secção do rev3DViews
    const s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60), ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2;
    const X = a => ox + a * s, Y = r => oy - (r - rmin) * s, yT = Y(rmax), yB = Y(rmin), f = v => fv3(v);
    const ln = (x1, y1, x2, y2, c, m) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"${m || ""}/>`;
    const AA = ' marker-start="url(#a)" marker-end="url(#a)"', A1 = ' marker-start="url(#a)"';
    const vtxt = (x, y, txt, anc) => `<text x="${x}" y="${y}" class="t" text-anchor="${anc}" transform="rotate(-90 ${x} ${y})">${txt}</text>`;
    // Ø: linha de chamada horizontal da aresta até a seta; seta vertical subindo até o nível; texto em pé à esquerda da seta, embaixo
    const dia = (r, aEdge, x, txt, len = 100) => { const xe = X(aEdge), sg = x > xe ? 1 : -1;
      return ln(xe + 3 * sg, Y(r), x + 5 * sg, Y(r), "e") + ln(x, Y(r), x, Y(r) + len, "d", A1) + vtxt(x - 4, Y(r) + len - 2, txt, "start"); };
    const call = (x, y, tx, ty, txt) => ln(x, y, tx, ty, "e") + `<text x="${tx + (tx < x ? -4 : 4)}" y="${ty + 4}" class="tn" text-anchor="${tx < x ? "end" : "start"}">${txt}</text>`;
    const tD = (r, sS, iS) => tolMk(`Ø ${f(2 * r)}`, sS, iS);
    let g = outline;
    // largura total em cima
    g += ln(X(0), Y(12.75) - 4, X(0), yT - 56, "e") + ln(X(L), Y(13.1) - 4, X(L), yT - 56, "e") + ln(X(0), yT - 50, X(L), yT - 50, "d", AA) +
         `<text x="${X(L / 2)}" y="${yT - 55}" class="t" text-anchor="middle">${f(L)}</text>`;
    // Ø à esquerda (trás): externo e interno onde começam as rampas
    g += dia(13.0, 0.25, X(0) - 70, tD(13.0)) + dia(8.1, 0.25, X(0) - 40, tD(8.1));
    // Ø à direita (face do canal): o de cima mais longe, para as setas não cruzarem as linhas de chamada de baixo
    g += dia(13.3, 5.4, X(L) + 130, tD(13.3)) + dia(11.85, L, X(L) + 100, tD(11.85, "0", "-0.1")) +
         dia(8.95, L, X(L) + 70, tD(8.95, "0.1", "0")) + dia(7.85, 5.4, X(L) + 40, tD(7.85));
    // abertura do canal (entre as linhas de chamada do Ø23,7 e do Ø17,9), texto à direita da cota
    { const x = X(L) + 14; g += ln(x, Y(11.85), x, Y(8.95), "d", AA) + vtxt(x + 14, (Y(11.85) + Y(8.95)) / 2, tolMk(f(11.85 - 8.95), "0", "-0.1"), "middle"); }
    // profundidade do canal dentro dele (do fundo até a face)
    { const y = (Y(11.85) + Y(8.95)) / 2 + 14, a0 = L - 3.2; g += ln(X(L), y - 7, X(L), y + 7, "e") + ln(X(a0), y, X(L), y, "d", AA) +
        `<text x="${(X(a0) + X(L)) / 2}" y="${y - 6}" class="t" text-anchor="middle">${tolMk(f(3.2), "0", "-0.1")}</text>`; }
    // chanfros e rampas
    g += call(X(0.125), Y(12.875), X(0) - 22, yT - 24, "0,25 x 45°") + call(X(5.5), Y(13.2), X(L) + 18, yT - 24, "0,2 x 45° (2x)") +
         call(X(2), Y(13.102), X(2) + 20, yT - 24, "3,3° com o eixo") +
         call(X(0.125), Y(8.17), X(0) + 24, yB + 36, "0,25 x 0,14") + call(X(3.4), Y(7.97), X(3.4) + 24, yB + 36, "2,8° com o eixo");
    g += `<text x="${X(L / 2)}" y="${yB + 74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return g + front; };
  state.orient = "portrait"; window.__q = q; return drawingSVG(q); });
const html = `<html><head><style>@page{size:A4;margin:0}body{margin:0}svg{width:210mm;height:297mm;display:block}</style></head><body>${svg}</body></html>`;
const p2 = await b.newPage(); await p2.setContent(html); await p2.pdf({ path: out + ".pdf", format: "A4", printBackground: true });
await p2.setViewportSize({ width: 794, height: 1123 }); await p2.screenshot({ path: out + ".png", fullPage: true });
await b.close(); })();
