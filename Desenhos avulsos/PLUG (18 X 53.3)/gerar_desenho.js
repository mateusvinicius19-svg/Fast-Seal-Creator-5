// Desenho do pino (imagem do usuário) na folha Parts Seals do Simulador CNC.html (drawingSVG, tipoGen "custom")
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = __dirname;
const HTML = 'file://' + path.resolve(__dirname, '../../Simulador CNC.html');

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto(HTML);
  const svg = await pg.evaluate(() => {
    // geometria (mm): x a partir da face esquerda (colar), r = raio
    const L = 53.3, rB = 4.1 / 2, pB = 5.5, xB = L - pB, cone = rB / Math.tan(59 * Math.PI / 180);   // broca 118°
    const top = [[0, 8.8], [0.2, 9], [1.5, 9], [2, 8.5], [2, 5.5], [4.5, 5.5], [5, 6], [L - 1, 6], [L, 5], [L, rB], [xB, rB], [xB - cone, 0]];
    const full = top.concat(top.slice(0, -1).reverse().map(([x, r]) => [x, -r]));
    const n = v => fmtN(v, Math.abs(v - Math.round(v)) < 1e-9 ? 0 : (Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? 1 : 2));
    const dimH = (x1, x2, y, txt, tx) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" class="d" marker-start="url(#a)" marker-end="url(#a)"/><text x="${tx ?? (x1 + x2) / 2}" y="${y - 6}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV = (x, y1, y2, txt, side = -1, bg = false) => { const tx = x + (side < 0 ? -7 : 16), ty = (y1 + y2) / 2, w = txt.length * 8 + 6;
      return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/><g transform="rotate(-90 ${tx} ${ty})">${bg ? `<rect x="${tx - w / 2}" y="${ty - 12}" width="${w}" height="15" fill="#fff"/>` : ""}<text x="${tx}" y="${ty}" class="t" text-anchor="middle">${txt}</text></g>`; };
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const call = (x, y, tx, ty, txt) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="e"/><text x="${tx + (tx < x ? -4 : 4)}" y="${ty + 4}" class="tn" text-anchor="${tx < x ? "end" : "start"}">${txt}</text>`;

    const views = (p, PT) => {
      let g = "";
      // ---- VISTA EM CORTE (escala ~2:1 na folha) ----
      const s = 10, ox = 140, oy = 235, X = x => ox + x * s, Y = r => oy - r * s;
      const pth = pts => pts.map(([x, r], i) => `${i ? "L" : "M"}${X(x).toFixed(2)},${Y(r).toFixed(2)}`).join("") + "Z";
      g += `<path d="${pth(full)}" class="p"/>`;
      g += `<line x1="${X(xB)}" y1="${Y(rB)}" x2="${X(xB)}" y2="${Y(-rB)}" class="o"/>`;                 // fundo do furo (início do cone)
      g += `<line x1="${X(0) - 25}" y1="${oy}" x2="${X(L) + 25}" y2="${oy}" class="ax"/>`;
      // comprimento total
      const yT = Y(9) - 42; g += ext(X(0), Y(9) - 4, X(0), yT - 6) + ext(X(L), Y(5) - 4, X(L), yT - 6) + dimH(X(0), X(L), yT, n(L));
      // Ø18 à esquerda
      const xD = X(0) - 45; g += ext(X(0) - 4, Y(9), xD - 8, Y(9)) + ext(X(0) - 4, Y(-9), xD - 8, Y(-9)) + dimV(xD, Y(9), Y(-9), "Ø " + n(18));
      // Ø4,1 e Ø12 à direita
      const xF = X(L) + 30, xC = X(L) + 66;
      g += ext(X(L) + 4, Y(rB), xF + 8, Y(rB)) + ext(X(L) + 4, Y(-rB), xF + 8, Y(-rB)) + dimV(xF, Y(rB), Y(-rB), "Ø " + n(4.1), 1);
      g += ext(X(L - 1) + 4, Y(6), xC + 8, Y(6)) + ext(X(L - 1) + 4, Y(-6), xC + 8, Y(-6)) + dimV(xC, Y(6), Y(-6), "Ø " + n(12), 1);
      // profundidade do furo 5,5
      const yP = Y(-9) + 22; g += ext(X(xB), Y(-rB) + 4, X(xB), yP + 6) + ext(X(L), Y(-5) + 4, X(L), yP + 6) + dimH(X(xB), X(L), yP, n(pB));
      // chanfro da ponta e ângulo da broca
      g += call(X(L - 0.5), Y(5.5), X(L) - 40, Y(6) - 26, "1 x 45°");
      g += call(X(xB - cone / 2), Y(rB / 2), X(xB) - 70, Y(-6) + 30, "ponta de broca 118°");
      // marcação do detalhe B
      g += `<circle cx="${X(3)}" cy="${Y(7)}" r="${4.2 * s}" class="det"/><text x="${X(3) + 32}" y="${Y(7) - 30}" class="t">B</text>`;
      g += `<text x="${X(L / 2)}" y="${Y(-9) + 62}" class="vt" text-anchor="middle">VISTA EM CORTE (peça inteira)</text>`;

      // ---- DETALHE B (ampliado): colar e canal ----
      const ds = 17, dx0 = 340, dy0 = 610, DX = x => dx0 + x * ds, DY = r => dy0 - r * ds, xe = 7.5;
      const det = top.filter(([x]) => x <= 5).concat([[xe, 6], [xe, -6]]).concat(top.filter(([x]) => x <= 5).reverse().map(([x, r]) => [x, -r]));
      const dp = det.map(([x, r], i) => `${i ? "L" : "M"}${DX(x).toFixed(2)},${DY(r).toFixed(2)}`).join("");
      g += `<path d="${dp}Z" fill="url(#hatch)" stroke="none"/>`;
      const tp = top.filter(([x]) => x <= 5), ol = [[xe, -6]].concat(tp.slice().reverse().map(([x, r]) => [x, -r]), tp, [[xe, 6]]);
      g += `<path d="${ol.map(([x, r], i) => `${i ? "L" : "M"}${DX(x).toFixed(2)},${DY(r).toFixed(2)}`).join("")}" fill="none" stroke="#111" stroke-width="1.6"/>`;
      // linha de quebra (à mão livre) no corte do corpo
      let br = `M${DX(xe)},${DY(6)}`; for (let k = 1; k <= 12; k++) br += ` L${(DX(xe) + (k % 2 ? 5 : -5)).toFixed(1)},${DY(6 - k)}`;
      g += `<path d="${br}" fill="none" stroke="#111" stroke-width=".9"/>`;
      g += `<line x1="${DX(0) - 20}" y1="${dy0}" x2="${DX(xe) + 20}" y2="${dy0}" class="ax"/>`;
      const yA = DY(9) - 30;
      g += ext(DX(0), DY(9) - 4, DX(0), yA - 6) + ext(DX(2), DY(8.5) - 4, DX(2), yA - 6) + ext(DX(4.5), DY(5.5) - 4, DX(4.5), yA - 6);
      g += dimH(DX(0), DX(2), yA, n(2)) + dimH(DX(2), DX(4.5), yA, n(2.5));
      const xE = DX(0) - 45; g += ext(DX(0) - 4, DY(9), xE - 8, DY(9)) + ext(DX(0) - 4, DY(-9), xE - 8, DY(-9)) + dimV(xE, DY(9), DY(-9), "Ø " + n(18));
      g += dimV(DX(3.25), DY(5.5), DY(-5.5), "Ø " + n(11), 1, true);
      g += call(DX(1.75), DY(8.75), DX(5.2), DY(10.2), "0,5 x 45°");
      g += call(DX(4.75), DY(5.75), DX(8.5), DY(7.8), "0,5 x 45°");
      g += call(DX(0.1), DY(-8.9), DX(0) - 60, DY(-9) + 22, "quebrar canto 0,2");
      g += `<text x="${DX(xe / 2)}" y="${DY(-9) + 55}" class="vt" text-anchor="middle">DETALHE B (ampliado)</text>`;
      return g;
    };
    const p = { tipoGen: "custom", desc: "PLUG", dint: 4.1, dext: 18, h: 53.3, customProfile: top.map(([x, r]) => [-x, r]), customViews: views,
      customNotes: "Cotas em mm · medidas sem tolerância conforme NBR ISO 2768-1 (tabela da folha) · chanfros 0,5 x 45° conforme detalhe B" };
    let out = drawingSVG(p);
    const D = "Ø18 x 53,3";
    out = out.replace(/Ø4,1 x Ø18 x 53,3/g, D).replace(/\s*·\s*secção 6,95/g, "").replace(/\s*\(secção 6,95\)/g, "")
             .replace(/Ø interno 4,1\s*·\s*Ø externo 18\s*·\s*altura 53,3/, "Colar Ø18 · corpo Ø12 · canal Ø11 x 2,5 · furo Ø4,1 x 5,5");
    out = out.replace(`PLUG ${D}`, `PLUG ${D}  ·  furo Ø4,1 x 5,5`);
    return out;
  });
  if (errs.length) console.log('page errors:', errs);
  fs.writeFileSync(path.join(OUT, 'PLUG (18 X 53.3).svg'), svg);
  const doc = `<!doctype html><html><head><meta charset="utf-8"><style>@page{size:A4 portrait;margin:5mm}html,body{margin:0}svg{width:200mm;height:287mm;display:block}</style></head><body>${svg}</body></html>`;
  await pg.setContent(doc);
  await pg.pdf({ path: path.join(OUT, 'PLUG (18 X 53.3).pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await pg.setViewportSize({ width: 794, height: 1123 });
  await pg.setContent(`<html><body style="margin:0">${svg.replace('<svg ', '<svg width="794" height="1123" ')}</body></html>`);
  await pg.screenshot({ path: path.join(OUT, 'PLUG (18 X 53.3).png'), fullPage: true });
  await b.close();
  console.log('ok');
})();
