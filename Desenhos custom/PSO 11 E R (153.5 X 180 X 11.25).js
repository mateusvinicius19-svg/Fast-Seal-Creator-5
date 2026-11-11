// Desenho CUSTOM - PSO 11 E R (153,5 x 180 x 11,25) - 2 pecas: corpo + anel GR06 encaixado no topo do corpo
// Medidas tiradas do esboco do Inventor (PSO 11 E R ... ATUALIZADO.ipt). Uso: node "Desenhos custom/render.js" "<este arquivo>"
(() => {
const RB = 153.5 / 2;            // raio da base (Ø153,5)
// PECA 1 - perfil em (a = axial 0..11,5 da esquerda, h = altura acima da base Ø153,5)
const G = { L: 11.5, B: 10, b0: 0.75, b1: 10.75, H: 13.25,
  can: [4.5, 6.5], canH: 10.75, land: [6.5, 8.5], landH: 12.25, stepA: 8.5, stepH: 7.375,
  ch: 0.4, flL: 4.2, flR: 4.0, chL: 1.25, chR: 0.7,
  aloj: [3.2, 8.5], alojW: 0.75, alojR: 2.65 };       // alojamento: largura 5,3, altura 3,4 (0,75 reto + R2,65)
const arc = (cx, cy, R, t0, t1, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const t = t0 + (t1 - t0) * i / n; return [cx + R * Math.cos(t), cy + R * Math.sin(t)]; });
const acx = (G.aloj[0] + G.aloj[1]) / 2, c = G.ch;
const prof1 = [[G.b0, G.H], [G.can[0] - c, G.H], [G.can[0], G.H - c], [G.can[0], G.canH], [G.can[1], G.canH], [G.can[1], G.landH - c], [G.can[1] + c, G.landH],
  [G.land[1] - c, G.landH], [G.land[1], G.landH - c], [G.stepA, G.stepH], [G.b1 - c, G.stepH], [G.b1, G.stepH - c], [G.b1, G.flR], [G.L, G.chR], [G.L - G.chR, 0],
  [G.aloj[1], 0], [G.aloj[1], G.alojW], ...arc(acx, G.alojW, G.alojR, 0, Math.PI).slice(1, -1), [G.aloj[0], G.alojW], [G.aloj[0], 0],
  [G.chL, 0], [0, G.chL], [G.b0, G.flL]];
// PECA 2 - anel GR06 (FSC: GR06 162/180/6,25/178/2) Ø168,25 x Ø180 x 6,25 - encaixa por cima do corpo, de a=4,5 a 10,75
// perna curta 1,8 no canal do corpo (até Ø175), rasgo 2,15 até Ø178 abraça o ressalto, perna longa 2,3 até Ø168,25; chanfros 0,3
const R2 = { a0: G.can[0], a1: G.b1, legS: 1.8, slot: 2.15, legL: 2.3, hTop: G.H, hSlot: G.landH, hLegS: G.canH, hBot: G.stepH, c: 0.3 };
{ const r = R2, q = r.c, s1 = r.a0 + r.legS, s2 = s1 + r.slot;
  var prof2 = [[r.a0, r.hTop - q], [r.a0 + q, r.hTop], [r.a1 - q, r.hTop], [r.a1, r.hTop - q], [r.a1, r.hBot + q], [r.a1 - q, r.hBot], [s2 + q, r.hBot], [s2, r.hBot + q],
    [s2, r.hSlot], [s1, r.hSlot], [s1, r.hLegS + q], [s1 - q, r.hLegS], [r.a0 + q, r.hLegS], [r.a0, r.hLegS + q]]; }
const D = h => 2 * (RB + h), f = v => fv3(v);
const P2 = { di: D(R2.hBot), de: D(R2.hTop), w: R2.a1 - R2.a0, s1: R2.a0 + R2.legS, s2: R2.a0 + R2.legS + R2.slot };

function views(p, PT){
  let g = `<defs><pattern id="hatch2" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/><path d="M0,0 L6,6 M6,0 L0,6" stroke="#555" stroke-width=".6"/></pattern></defs>`;
  const view = (polys, ox, oy, s) => { const X = a => ox + a * s, Y = h => oy - h * s;
    polys.forEach(([pts, fill]) => g += `<path d="${pts.map(([a, h], i) => `${i ? "L" : "M"}${X(a).toFixed(2)},${Y(h).toFixed(2)}`).join("")}Z" class="p" style="fill:url(#${fill})"/>`);
    return { X, Y }; };
  const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
  const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
  const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
  const dimV = (x, y1, y2, txt, side) => { const tx = x + (side < 0 ? -7 : 16), ty = (y1 + y2) / 2;
    return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
  const dia = (xEdge, y, xTxt, txt) => { const L = xTxt < xEdge;
    return `<line x1="${xEdge}" y1="${y}" x2="${xTxt}" y2="${y}" class="e" marker-start="url(#a)"/><text x="${xTxt}" y="${y - 4}" class="t" text-anchor="${L ? "start" : "end"}">${txt}</text>`; };
  const call = (x, y, tx, ty, txt) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="e"/><text x="${tx + (tx < x ? -4 : 4)}" y="${ty + 4}" class="tn" text-anchor="${tx < x ? "end" : "start"}">${txt}</text>`;
  const bal = (x, y, tx, ty, n) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="e"/><circle cx="${tx}" cy="${ty}" r="10" fill="#fff" stroke="#b2221f" stroke-width="1"/><text x="${tx}" y="${ty + 4.5}" class="t" text-anchor="middle">${n}</text>`;

  // ---------- PEÇA 1 (ampliada) ----------
  { const s = 25, ox = 205, oy = 445; const { X, Y } = view([[prof1, "hatch"]], ox, oy, s);
    // cima: 10 / canal 2 / 2 / 2,25
    const yT = Y(G.H);
    g += dimH(X(G.b0), X(G.b1), yT - 62, f(G.B)) + ext(X(G.b0), yT - 4, X(G.b0), yT - 68) + ext(X(G.b1), Y(G.stepH) - 4, X(G.b1), yT - 68);
    const yC = yT - 30;
    g += ext(X(G.can[0]), Y(G.H - c) - 4, X(G.can[0]), yC - 6) + ext(X(G.can[1]), Y(G.landH) - 4, X(G.can[1]), yC - 6) + ext(X(G.land[1]), Y(G.landH - c) - 4, X(G.land[1]), yC - 6);
    g += dimH(X(G.can[0]), X(G.can[1]), yC, f(G.can[1] - G.can[0])) + dimH(X(G.land[0]), X(G.land[1]), yC, f(G.land[1] - G.land[0])) + dimH(X(G.land[1]), X(G.b1), yC, f(G.b1 - G.land[1]));
    // profundidades do canal
    g += ext(X(G.can[0]) - 4, Y(G.canH), X(G.can[0]) - 30, Y(G.canH)) + dimV(X(G.can[0]) - 24, yT, Y(G.canH), f(G.H - G.canH), -1);
    g += dimV(X(G.can[1]) + 14, Y(G.landH), Y(G.canH), f(G.landH - G.canH), 1);
    // diâmetros: esquerda Ø180 e Ø153,5 ; direita Ø178 e Ø168,25
    g += dia(X(G.b0), yT, X(0) - 120, tolMk(`Ø ${f(D(G.H))}`, "0.1", "-0.1")) + dia(X(G.chL), Y(0), X(0) - 120, tolMk(`Ø ${f(D(0))}`, "0.1", "-0.1"));
    g += dia(X(G.land[1]), Y(G.landH), X(G.L) + 150, `Ø ${f(D(G.landH))}`) + dia(X(G.b1), Y(G.stepH), X(G.L) + 150, `Ø ${f(D(G.stepH))}`);
    // alturas à direita: 7,375 e secção 13,25
    const xr = X(G.L) + 30; g += ext(X(G.L - G.chR) + 4, Y(0), X(G.L) + 165, Y(0)) + dimV(xr, Y(G.stepH), Y(0), f(G.stepH), 1);
    g += ext(X(G.b1) + 4, yT, X(G.L) + 165, yT) + dimV(X(G.L) + 160, yT, Y(0), tolMk(`Secção ${f(G.H)}`, "0", "-0.1"), 1);
    // flancos: alturas 4,2 / 4,0 e chanfros
    g += ext(X(0) - 4, Y(G.flL), X(0) - 40, Y(G.flL)) + dimV(X(0) - 34, Y(G.flL), Y(0), f(G.flL), -1) + ext(X(G.chL) - 4, Y(0), X(0) - 40, Y(0));
    g += call(X(G.chL / 2), Y(G.chL / 2), X(0) - 50, Y(0) + 30, `${fmtN(G.chL, 2)} x 45°`) + call(X(G.L - G.chR / 2), Y(G.chR / 2), X(G.L) + 20, Y(0) + 34, `${fmtN(G.chR, 2)} x 45°`);
    g += call(X(G.b1), Y(G.flR + 1), X(G.L) + 20, Y(G.flR) - 26, `flanco até ${f(G.flR)} (Ø ${f(D(G.flR))})`);
    g += call(X(G.can[0] - c / 2), Y(G.H - c / 2), X(G.can[0]) - 40, yT - 14, `${fmtN(c, 1)} x 45° (3x)`);
    // base: 11,5 total, alojamento 5,3 / 3 / altura 3,4 / R2,65
    const yB = Y(0) + 62;
    g += ext(X(0), Y(G.chL) + 4, X(0), yB + 6) + ext(X(G.L), Y(G.chR) + 4, X(G.L), yB + 6) + dimH(X(0), X(G.L), yB, tolMk(f(G.L), "0.1", "0"), yB + 16);
    const yA = Y(0) + 28;
    g += ext(X(G.aloj[0]), Y(0) + 4, X(G.aloj[0]), yA + 6) + ext(X(G.aloj[1]), Y(0) + 4, X(G.aloj[1]), yA + 6);
    g += dimH(X(G.aloj[0]), X(G.aloj[1]), yA, tolMk(f(G.aloj[1] - G.aloj[0]), "0.1", "0"), yA + 15) + dimH(X(G.aloj[1]), X(G.L), yA, f(G.L - G.aloj[1]), yA + 15);
    g += ext(X(acx) + 4, Y(G.alojW + G.alojR), X(G.aloj[1]) + 30, Y(G.alojW + G.alojR)) + dimV(X(G.aloj[1]) + 24, Y(G.alojW + G.alojR), Y(0), f(G.alojW + G.alojR), 1);
    g += call(X(acx - G.alojR * 0.7), Y(G.alojW + G.alojR * 0.7), X(G.aloj[0]) - 10, Y(G.alojW + G.alojR) - 30, `R${fmtN(G.alojR, 2)}`);
    g += `<text x="${X(G.L / 2)}" y="${yB + 40}" class="vt" text-anchor="middle">PEÇA 1 · CORPO (ampliado)</text>`; }

  // ---------- CONJUNTO MONTADO ----------
  { const s = 13, ox = 110, oy = 760; const { X, Y } = view([[prof1, "hatch"], [prof2, "hatch2"]], ox, oy, s);
    const hw = (11.25 - G.L) / 2;   // canal do êmbolo 11,25 (flancos da base com interferência)
    g += `<path d="M${X(hw - 2)},${Y(G.H)} L${X(G.L - hw + 2)},${Y(G.H)}" class="o" stroke-dasharray="6 3"/>`;
    g += `<path d="M${X(hw - 2)},${Y(5)} L${X(hw)},${Y(5)} L${X(hw)},${Y(0)} L${X(G.L - hw)},${Y(0)} L${X(G.L - hw)},${Y(5)} L${X(G.L - hw + 2)},${Y(5)}" class="o" fill="none" stroke-dasharray="6 3"/>`;
    g += `<text x="${X(G.L + 2) + 4}" y="${Y(G.H) + 4}" class="tn">camisa Ø180</text><text x="${X(G.L + 2) + 4}" y="${Y(5) + 4}" class="tn">êmbolo Ø153,5 · canal 11,25</text>`;
    g += bal(X(2.5), Y(10), X(0) - 30, Y(11), 1) + bal(X(10), Y(9), X(G.L) + 26, Y(4), 2);
    g += `<text x="${X(G.L / 2) + 40}" y="${Y(0) + 34}" class="vt" text-anchor="middle">CONJUNTO MONTADO</text>`; }

  // ---------- PEÇA 2 · ANEL GR06 ----------
  { const s = 24, ox = 515 - R2.a0 * s, oy = 715 + R2.hBot * s; const { X, Y } = view([[prof2, "hatch2"]], ox, oy, s);
    const yt = Y(R2.hTop), yb = Y(R2.hBot), q = R2.c;
    g += dimH(X(R2.a0), X(R2.a1), yt - 30, tolMk(f(P2.w), "0.2", "-0.2")) + ext(X(R2.a0), Y(R2.hTop - q) - 4, X(R2.a0), yt - 36) + ext(X(R2.a1), Y(R2.hTop - q) - 4, X(R2.a1), yt - 36);
    const yd = yb + 26;
    g += ext(X(R2.a0), Y(R2.hLegS) + 4, X(R2.a0), yd + 6) + ext(X(P2.s1), Y(R2.hLegS) + 4, X(P2.s1), yd + 6) + ext(X(P2.s2), yb + 4, X(P2.s2), yd + 6) + ext(X(R2.a1), yb + 4, X(R2.a1), yd + 6);
    g += dimH(X(R2.a0), X(P2.s1), yd, f(R2.legS), yd + 14) + dimH(X(P2.s1), X(P2.s2), yd, tolMk(f(R2.slot), "0.1", "-0.1"), yd + 14) + dimH(X(P2.s2), X(R2.a1), yd, f(R2.legL), yd + 14);
    g += dia(X(R2.a0 + q), yt, X(R2.a0) - 85, tolMk(`Ø ${f(P2.de)}`, "0.075", "-0.25")) + dia(X(R2.a0), Y(R2.hLegS), X(R2.a0) - 85, `Ø ${f(D(R2.hLegS))}`);
    g += dia(X(P2.s1), Y(R2.hSlot), X(R2.a0) - 85, `Ø ${f(D(R2.hSlot))}`) + dia(X(P2.s2), yb, X(R2.a0) - 85, `Ø ${f(P2.di)}`);
    g += ext(X(R2.a1) + 4, yt, X(R2.a1) + 70, yt) + ext(X(R2.a1) + 4, yb, X(R2.a1) + 70, yb) + dimV(X(R2.a1) + 66, yt, yb, tolMk(`Secção ${f((P2.de - P2.di) / 2)}`, "0.02", "-0.12"), 1);
    g += ext(X(R2.a1) + 4, Y(R2.hLegS), X(R2.a1) + 34, Y(R2.hLegS)) + dimV(X(R2.a1) + 26, yt, Y(R2.hLegS), tolMk(f(R2.hTop - R2.hLegS), "0.01", "-0.1"), 1);
    g += call(X(R2.a0 + q / 2), Y(R2.hLegS + q / 2), X(R2.a0) + 6, Y(R2.hLegS) + 36, `${fmtN(q, 1)} x 45° (6x)`);
    g += `<text x="${X((R2.a0 + R2.a1) / 2)}" y="${yd + 40}" class="vt" text-anchor="middle">PEÇA 2 · ANEL GR06</text>`; }
  return g;
}

const p = { tipoGen: "custom", desc: "PSO 11 E R", dint: 153.5, dext: 180, h: 11.25,
  customProfile: prof1.map(([a, h]) => [-a, RB + h]), customViews: views,
  customNotes: `Peça 1: corpo Ø${f(D(0))} x Ø${f(D(G.H))} x ${f(G.L)} · Peça 2: anel GR06 Ø${f(P2.di)} x Ø${f(P2.de)} x ${f(P2.w)} (encaixa no canal/ressalto do corpo) · carimbo com medidas do alojamento · cotas em mm` };
window.PSO11ER = p;
state.genParams = p;
const obs = document.querySelector("#dwgFields input[data-d=obs]"); if (obs && !obs.value) obs.value = "CONJUNTO 2 PEÇAS";
})();
