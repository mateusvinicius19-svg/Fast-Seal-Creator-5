// Desenho CUSTOM - VEDADOR (272 x 291 x 19) - programa 46219 · cód. interno 46146
// Medidas do esboço do Inventor "VEDADOR (272 X 291 X 19).ipt" (usuário 12/11/2026):
// largura 19 · Ø291 externo · Ø289 na face esquerda · rampa 45° até Ø272 · fundo 1,5 em Ø272 · degrau a 9 da face direita até Ø277
// canal na face direita: profundidade 2,3, fundo 3 (2,3 do Ø291), boca 4, (1,7) até o Ø277 · chanfros da boca 0,5 · cantos 0,3
// Uso: node "Desenhos custom/render.js" "Desenhos custom/VEDADOR (272 X 291 X 19).js"
(() => {
const M = { di: 272, de: 291, dTop: 289, dStep: 277, L: 19, flat: 1.5, step: 9, gDep: 2.3, gTop: 2.3, gW: 3, gMouth: 4, gRef: 1.7, cm: 0.5, c: 0.3 };
const RB = M.di / 2, H = (M.de - M.di) / 2;                     // h = altura radial acima do Ø272 (0 .. 9,5)
const hTop = (M.dTop - M.di) / 2, hStep = (M.dStep - M.di) / 2;    // 8,5 e 2,5
const aStep = M.L - M.step, aFlat = aStep - M.flat;                 // 10 e 8,5 (rampa 45°: 8,5 x 8,5)
const gU = H - M.gTop, gD = gU - M.gW, mU = gU + (M.gMouth - M.gW) / 2, mD = gD - (M.gMouth - M.gW) / 2, aG = M.L - M.gDep;
const c = M.c, L = M.L, cm = M.cm;
const prof = [[c, H], [L - c, H], [L, H - c], [L, mU], [L - cm, gU], [aG, gU], [aG, gD], [L - cm, gD], [L, mD], [L, hStep + c], [L - c, hStep],
  [aStep, hStep], [aStep, 0], [aFlat, 0], [0, hTop], [0, H - c]];
const f = v => fv3(v), D = h => 2 * (RB + h);

function views(p, PT){
  let g = "";
  const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
  const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
  const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
  const dimV = (x, y1, y2, txt, side) => { const tx = x + (side < 0 ? -7 : 16), ty = (y1 + y2) / 2;
    return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
  const dia = (xEdge, y, xTxt, txt) => `<line x1="${xEdge}" y1="${y}" x2="${xTxt}" y2="${y}" class="e" marker-start="url(#a)"/><text x="${xTxt}" y="${y - 4}" class="t" text-anchor="${xTxt < xEdge ? "start" : "end"}">${txt}</text>`;
  const call = (x, y, tx, ty, txt) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="e"/><text x="${tx + (tx < x ? -4 : 4)}" y="${ty + 4}" class="tn" text-anchor="${tx < x ? "end" : "start"}">${txt}</text>`;

  // ---------- SECÇÃO (ampliada) ----------
  { const s = PT ? 24 : 22, ox = PT ? 150 : 330, oy = PT ? 700 : 560;
    const X = a => ox + a * s, Y = h => oy - h * s;
    g += `<path d="${prof.map(([a, h], i) => `${i ? "L" : "M"}${X(a).toFixed(2)},${Y(h).toFixed(2)}`).join("")}Z" class="p"/>`;
    const yT = Y(H), yB = Y(0);
    // largura total 19 em cima
    g += ext(X(0), Y(hTop) - 4, X(0), yT - 46) + ext(X(L), yT - 4, X(L), yT - 46) + dimH(X(0), X(L), yT - 40, f(L));
    // embaixo: fundo 1,5 e degrau 9
    const yd = yB + 34;
    g += ext(X(aFlat), yB + 4, X(aFlat), yd + 6) + ext(X(aStep), yB + 4, X(aStep), yd + 6) + ext(X(L), Y(hStep) + 4, X(L), yd + 6);
    g += dimH(X(aFlat), X(aStep), yd, f(M.flat), yd + 16) + dimH(X(aStep), X(L), yd, f(M.step));
    // canal: profundidade 2,3
    g += dimH(X(aG), X(L), Y((gU + gD) / 2), f(M.gDep), Y((gU + gD) / 2) - 5);
    // canal: alturas à direita (2,3 / 3 / (1,7)) e boca 4
    const x1 = X(L) + 32, x2 = X(L) + 72, xd = X(L) + 150;
    g += ext(X(L) + 4, yT, x1 + 6, yT) + ext(X(aG) + 4, Y(gU), x1 + 6, Y(gU)) + ext(X(aG) + 4, Y(gD), x1 + 6, Y(gD));
    g += ext(X(L) + 4, Y(mU), x2 + 6, Y(mU)) + ext(X(L) + 4, Y(mD), x2 + 6, Y(mD));
    g += dimV(x1, yT, Y(gU), f(M.gTop), 1) + dimV(x1, Y(gU), Y(gD), f(M.gW), 1) + dimV(x1, Y(gD), Y(hStep), `(${f(M.gRef)})`, 1) + dimV(x2, Y(mU), Y(mD), f(M.gMouth), 1);
    // diâmetros
    g += dia(X(L), Y(hStep), xd, `Ø ${f(M.dStep)}`);
    g += dia(X(c), yT, X(0) - 110, `Ø ${f(M.de)}`) + dia(X(0), Y(hTop), X(0) - 110, `Ø ${f(M.dTop)}`) + dia(X(aFlat), yB, X(0) - 110, `Ø ${f(M.di)}`);
    // rampa 45° e chanfros
    g += call(X(aFlat / 2) + 2, Y(hTop / 2) + 2, X(aFlat / 2) - 40, Y(hTop / 2) + 70, "45°");
    g += call(X(L - cm / 2), Y(gU + cm / 2), X(L) + 18, yT - 22, `${fmtN(cm, 1)} x 45° (2x)`);
    g += call(X(L - c / 2), Y(H - c / 2), X(L) - 70, yT - 18, `${fmtN(c, 1)} x 45° (3x)`);
    g += `<text x="${X(L / 2)}" y="${yd + 46}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`; }

  // ---------- VISTA FRONTAL + CORTE A-A (escala real, mesma escala nas duas) ----------
  { const s = PT ? 0.9 : 0.8, cx = PT ? 210 : 200, oy = PT ? 238 : 330, ox = PT ? 520 : 560;
    const R = d => d / 2 * s;
    // vista frontal: anéis Ø291 (externo), Ø272 (furo); Ø289 / Ø277 em linha fina (rampa e degrau vistos de frente)
    const ring = r => `M${cx - r},${oy}A${r},${r} 0 1 0 ${cx + r},${oy}A${r},${r} 0 1 0 ${cx - r},${oy}Z`;
    g += `<path d="${ring(R(M.de))}${ring(R(M.di))}" class="p" fill-rule="evenodd"/>`;
    g += `<circle cx="${cx}" cy="${oy}" r="${R(M.dTop)}" class="e" style="fill:none"/><circle cx="${cx}" cy="${oy}" r="${R(M.dStep)}" class="e" style="fill:none"/>`;
    g += `<line x1="${cx - R(M.de) - 12}" y1="${oy}" x2="${cx + R(M.de) + 12}" y2="${oy}" class="ax"/><line x1="${cx}" y1="${oy - R(M.de) - 12}" x2="${cx}" y2="${oy + R(M.de) + 12}" class="ax"/>`;
    // linha de corte A-A (vertical, no centro)
    const yA = oy - R(M.de) - 22, yA2 = oy + R(M.de) + 22;
    g += `<line x1="${cx}" y1="${yA}" x2="${cx}" y2="${yA + 10}" class="p"/><line x1="${cx}" y1="${yA2 - 10}" x2="${cx}" y2="${yA2}" class="p"/>`;
    g += `<line x1="${cx}" y1="${yA}" x2="${cx + 16}" y2="${yA}" class="p" marker-end="url(#a)"/><line x1="${cx}" y1="${yA2}" x2="${cx + 16}" y2="${yA2}" class="p" marker-end="url(#a)"/>`;
    g += `<text x="${cx + 22}" y="${yA + 4}" class="t">A</text><text x="${cx + 22}" y="${yA2 + 4}" class="t">A</text>`;
    g += `<text x="${cx}" y="${yA2 + 26}" class="vt" text-anchor="middle">VISTA FRONTAL</text>`;
    // corte A-A em escala real (face com o canal para a direita)
    const X = a => ox + (a - L / 2) * s, Y = r => oy - r * s;
    const half = sg => `<path d="${prof.map(([a, h], i) => `${i ? "L" : "M"}${X(a).toFixed(2)},${Y(sg * (RB + h)).toFixed(2)}`).join("")}Z" class="p"/>`;
    g += half(1) + half(-1) + `<line x1="${X(-10)}" y1="${oy}" x2="${X(L + 10)}" y2="${oy}" class="ax"/>`;
    g += ext(X(0), Y(RB), X(L), Y(RB)) + ext(X(0), Y(-RB), X(L), Y(-RB));   // furo visto em corte (linha de fundo)
    const xe = X(L) + 60, xi = X(L) + 30;
    g += ext(X(L), Y(RB + H), xe + 6, Y(RB + H)) + ext(X(L), Y(-RB - H), xe + 6, Y(-RB - H)) + dimV(xe, Y(RB + H), Y(-RB - H), `Ø ${f(M.de)}`, 1);
    g += ext(X(aStep), Y(RB), xi + 6, Y(RB)) + ext(X(aStep), Y(-RB), xi + 6, Y(-RB)) + dimV(xi, Y(RB), Y(-RB), `Ø ${f(M.di)}`, 1);
    g += ext(X(0), Y(RB + H) - 4, X(0), Y(RB + H) - 26) + ext(X(L), Y(RB + H) - 4, X(L), Y(RB + H) - 26) + dimH(X(0), X(L), Y(RB + H) - 20, f(L));
    g += `<text x="${ox}" y="${yA2 + 26}" class="vt" text-anchor="middle">CORTE A-A</text>`; }
  return g;
}

const p = { tipoGen: "custom", desc: "VEDADOR", mat: "TEFLON + GR", dint: M.di, dext: M.de, h: M.L,
  customProfile: prof.map(([a, h]) => [-a, RB + h]), customViews: views,
  customNotes: `Vedador Ø${f(M.di)} x Ø${f(M.de)} x ${f(M.L)} · rampa 45° de Ø${f(M.dTop)} a Ø${f(M.di)} · canal ${f(M.gDep)} x ${f(M.gW)} (boca ${f(M.gMouth)}) · cotas entre parênteses = referência · cotas em mm` };
window.VEDADOR272 = p;
state.genParams = p;
const set = (k, v) => { const el = document.querySelector(`#dwgFields input[data-d=${k}]`); if (el) el.value = v; };
set("prog", "46219"); set("cod", "46146");
})();
