// Desenho CUSTOM - PSE 124 E (15,9 x 25,5 x 3,25) - secção em U aberto (lábios para a direita), fundo arredondado
// Medidas do esboço W:\Parts\PartsSeals\PROJETOS\DESENHOS\PSE 124 E\PSE 124 E (15.9 X 25.5 X 3.25)\DESENHO COTADO.png
// Uso: node "Desenhos custom/render.js" "Desenhos custom/PSE 124 E (15.9 X 25.5 X 3.25).js"
(() => {
const M = { item: [15.9, 25.5, 3.25],                 // medidas do item (carimbo / nome)
  de: 25, di: 16, L: 3.25,                              // Ø dos lábios (ponta) e largura total
  dCav: 23, dLow: 18, cavL: 2.3, cavH: 2.1 };          // canal: Ø23 em cima (reto), fundo 2,1, abre para Ø18 na ponta (2,5)
const RB = M.di / 2, H = (M.de - M.di) / 2;            // altura radial 4,5 acima do Ø16
const hC = (M.dCav - M.di) / 2, hL = (M.dLow - M.di) / 2, a0 = M.L - M.cavL, hB = hC - M.cavH;
const R = 1.85, C = [R, H / 2];                        // fundo arredondado: raio R, tangente à face esquerda (a = 0)
// tangentes das pontas dos lábios (a = L) ao arco
const tang = (P, up) => { const dx = P[0] - C[0], dy = P[1] - C[1], d = Math.hypot(dx, dy), phi = Math.atan2(dy, dx), al = Math.acos(R / d), t = phi + (up ? al : -al); return [C[0] + R * Math.cos(t), C[1] + R * Math.sin(t), t]; };
const Tu = tang([M.L, H], true), Td = tang([M.L, 0], false);
const arc = []; for (let i = 0; i <= 40; i++){ const t = Tu[2] + (Td[2] + 2 * Math.PI - Tu[2]) * i / 40; arc.push([C[0] + R * Math.cos(t), C[1] + R * Math.sin(t)]); }
const prof = [[M.L, H], ...arc, [M.L, 0], [M.L, hL], [a0, hB], [a0, hC], [M.L, hC]];
const f = v => fv3(v), D = h => 2 * (RB + h);

function views(p, PT){
  let g = "";
  const view = (pts, ox, oy, s, sg = 1) => { const X = a => ox + a * s, Y = h => oy - sg * h * s;
    g += `<path d="${pts.map(([a, h], i) => `${i ? "L" : "M"}${X(a).toFixed(2)},${Y(h).toFixed(2)}`).join("")}Z" class="p"/>`; return { X, Y }; };
  const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
  const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
  const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
  const dimV = (x, y1, y2, txt, side) => { const tx = x + (side < 0 ? -7 : 16), ty = (y1 + y2) / 2;
    return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
  const dia = (xEdge, y, xTxt, txt) => `<line x1="${xEdge}" y1="${y}" x2="${xTxt}" y2="${y}" class="e" marker-start="url(#a)"/><text x="${xTxt}" y="${y - 4}" class="t" text-anchor="${xTxt < xEdge ? "start" : "end"}">${txt}</text>`;
  const call = (x, y, tx, ty, txt) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="e"/><text x="${tx + (tx < x ? -4 : 4)}" y="${ty + 4}" class="tn" text-anchor="${tx < x ? "end" : "start"}">${txt}</text>`;

  // ---------- SECÇÃO (ampliada) ----------
  { const s = PT ? 62 : 58, ox = PT ? 330 : 380, oy = PT ? 560 : 470; const { X, Y } = view(prof, ox, oy, s);
    const yT = Y(H), yB = Y(0);
    // larguras: 3,25 total em cima, 2,3 do canal
    g += ext(X(0), Y(C[1]) - 4, X(0), yT - 52) + ext(X(M.L), yT - 4, X(M.L), yT - 52) + dimH(X(0), X(M.L), yT - 46, f(M.L));
    g += ext(X(a0), Y(hC) - 4, X(a0), yT - 22) + dimH(X(a0), X(M.L), yT - 16, f(M.cavL));
    // diâmetros à direita (ordenadas)
    const xd = X(M.L) + 190;
    g += dia(X(M.L), yT, xd, `Ø ${f(M.de)}`) + dia(X(M.L), Y(hC), xd, `Ø ${f(M.dCav)}`) + dia(X(M.L), Y(hL), xd, `Ø (${f(M.dLow)})`) + dia(X(M.L), yB, xd, `Ø ${f(M.di)}`);
    // alturas: lábio de cima 1, canal 2,1 no fundo e (2,5) na ponta, lábio de baixo 1
    const x1 = X(M.L) + 30, x2 = X(M.L) + 75;
    g += dimV(x1, yT, Y(hC), f(H - hC), 1) + dimV(x1, Y(hL), yB, f(hL), 1) + dimV(x2, Y(hC), Y(hL), `(${f(hC - hL)})`, 1);
    g += ext(X(a0) - 4, Y(hB), X(0) - 34, Y(hB)) + ext(X(a0) - 4, Y(hC), X(0) - 34, Y(hC)) + dimV(X(0) - 28, Y(hC), Y(hB), f(M.cavH), -1);
    g += call(X(C[0] - R * 0.7), Y(C[1] + R * 0.7), X(0) - 50, yT - 8, `R${fmtN(R, 2)}`);
    g += `<text x="${X(M.L / 2)}" y="${yB + 50}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`; }

  // ---------- CORTE A-A (peça inteira) ----------
  { const s = PT ? 11 : 10, ox = PT ? 120 : 130, oy = PT ? 330 : 320;   // eixo horizontal no centro; metade de cima e de baixo
    const X = a => ox + a * s, Y = r => oy - r * s;
    const half = sg => `<path d="${prof.map(([a, h], i) => `${i ? "L" : "M"}${X(a).toFixed(2)},${Y(sg * (RB + h)).toFixed(2)}`).join("")}Z" class="p"/>`;
    g += half(1) + half(-1) + `<line x1="${X(-1.5)}" y1="${oy}" x2="${X(M.L + 1.5)}" y2="${oy}" class="ax"/>`;
    const xe = X(0) - 34, xi = X(0) - 14;
    g += ext(X(M.L), Y(RB + H), xe - 6, Y(RB + H)) + ext(X(M.L), Y(-RB - H), xe - 6, Y(-RB - H)) + dimV(xe, Y(RB + H), Y(-RB - H), `Ø ${f(M.de)}`, -1);
    g += ext(X(M.L), Y(RB), xi - 6, Y(RB)) + ext(X(M.L), Y(-RB), xi - 6, Y(-RB)) + dimV(xi, Y(RB), Y(-RB), `Ø ${f(M.di)}`, -1);
    g += `<text x="${X(M.L / 2)}" y="${Y(-RB - H) + 34}" class="vt" text-anchor="middle">CORTE A-A</text>`; }
  return g;
}

const p = { tipoGen: "custom", desc: "PSE 124 E", dint: M.item[0], dext: M.item[1], h: M.item[2],
  customProfile: prof.map(([a, h]) => [-a, RB + h]), customViews: views,
  customNotes: `Peça: lábios Ø${f(M.di)} / Ø${f(M.de)} x ${f(M.L)} · canal ${f(M.cavL)} (Ø${f(M.dCav)}, fundo ${f(M.cavH)}) · fundo R${fmtN(R, 2)} · cotas entre parênteses = referência · carimbo com as medidas do item · cotas em mm` };
window.PSE124E = p;
state.genParams = p;
})();
