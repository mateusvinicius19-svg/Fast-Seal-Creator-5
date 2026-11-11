// Desenho CUSTOM - PSO 11 E R (153,5 x 180 x 11,25) - vedacao rotativa de embolo em 2 pecas
// Uso: cole no console do "Simulador CNC.html" (ou rode render.js) e abra o desenho.
// Todas as medidas estao em M (abaixo) - mude aqui e gere de novo.
(() => {
const M = {
  dint: 153.5, dext: 180, h: 11.25,          // alojamento: Ø fundo do canal x Ø camisa x largura do canal
  // PECA 1 - anel de deslize (PTFE): Ø ext = camisa, encaixe (canal) no Ø interno para a peca 2
  p1: { de: 180, di: 166, h: 11.25, ch: 0.5, encL: 7.5, encD: 172, mat: "PTFE" },
  // PECA 2 - anel energizador (NBR 70) secção retangular, vai encaixado no canal da peca 1
  p2: { di: 152, de: 172, h: 7.4, ch: 0.5, mat: "NBR 70" },
};
const f = v => fv3(v);
const P1 = M.p1, P2 = M.p2, a1 = (P1.h - P1.encL) / 2, a2 = (P1.h - P2.h) / 2;
// perfis (a = axial 0..h, r = raio)
const prof1 = [[0, P1.di/2], [0, P1.de/2 - P1.ch], [P1.ch, P1.de/2], [P1.h - P1.ch, P1.de/2], [P1.h, P1.de/2 - P1.ch], [P1.h, P1.di/2],
  [a1 + P1.encL, P1.di/2], [a1 + P1.encL, P1.encD/2], [a1, P1.encD/2], [a1, P1.di/2]];
const ring2 = (ri, re, h, c, a0) => [[a0, ri + c], [a0, re], [a0 + h, re], [a0 + h, ri + c], [a0 + h - c, ri], [a0 + c, ri]];
const prof2 = ring2(P2.di/2, P2.de/2, P2.h, P2.ch, 0);
const prof2m = ring2(M.dint/2, P2.de/2, P2.h, P2.ch, a2);    // montado: comprimido no fundo do canal

function views(p, PT){
  let g = `<defs><pattern id="hatch2" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/><path d="M0,0 L6,6 M6,0 L0,6" stroke="#555" stroke-width=".6"/></pattern></defs>`;
  const W = PT ? 794 : 1123;
  const view = (polys, ox, oy, s, r0) => { const X = a => ox + a * s, Y = r => oy - (r - r0) * s;
    polys.forEach(([pts, fill]) => g += `<path d="${pts.map(([a, r], i) => `${i ? "L" : "M"}${X(a).toFixed(2)},${Y(r).toFixed(2)}`).join("")}Z" class="p" style="fill:url(#${fill})"/>`);
    return { X, Y }; };
  const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
  const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
  const dimH = (x1, x2, y, txt) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${y - 6}" class="t" text-anchor="middle">${txt}</text>`;
  const dimV = (x, y1, y2, txt, side) => { const tx = x + (side < 0 ? -7 : 16), ty = (y1 + y2) / 2;
    return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
  // diâmetro em ordenada: linha de chamada do contorno até o texto
  const dia = (xEdge, y, xTxt, txt) => { const L = xTxt < xEdge;
    return `<line x1="${xEdge}" y1="${y}" x2="${xTxt}" y2="${y}" class="e" ${L ? 'marker-start="url(#a)"' : 'marker-start="url(#a)"'}/><text x="${xTxt + (L ? 0 : 0)}" y="${y - 4}" class="t" text-anchor="${L ? "start" : "end"}">${txt}</text>`; };
  const bal = (x, y, tx, ty, n) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="e"/><circle cx="${tx}" cy="${ty}" r="10" fill="#fff" stroke="#b2221f" stroke-width="1"/><text x="${tx}" y="${ty + 4.5}" class="t" text-anchor="middle">${n}</text>`;
  const cx = W / 2;

  // ---------- CONJUNTO MONTADO (alojamento) ----------
  { const s = PT ? 17 : 15, ox = cx - M.h * s / 2 + 30, oy = PT ? 300 : 280, r0 = M.dint / 2;
    const { X, Y } = view([[prof1, "hatch"], [prof2m, "hatch2"]], ox, oy, s, r0);
    // alojamento (camisa e canal do êmbolo) em traço fino
    g += `<path d="M${X(-2.5)},${Y(M.dext/2)} L${X(M.h + 2.5)},${Y(M.dext/2)}" class="o" stroke-dasharray="6 3"/>`;
    g += `<path d="M${X(-2.5)},${Y(M.dint/2 + 5)} L${X(0)},${Y(M.dint/2 + 5)} L${X(0)},${Y(M.dint/2)} L${X(M.h)},${Y(M.dint/2)} L${X(M.h)},${Y(M.dint/2 + 5)} L${X(M.h + 2.5)},${Y(M.dint/2 + 5)}" class="o" fill="none" stroke-dasharray="6 3"/>`;
    g += `<text x="${X(M.h + 2.6) + 4}" y="${Y(M.dext/2) + 4}" class="tn">camisa</text><text x="${X(M.h + 2.6) + 4}" y="${Y(M.dint/2 + 5) + 4}" class="tn">êmbolo</text>`;
    g += dimH(X(0), X(M.h), Y(M.dext/2) - 40, `${f(M.h)} (canal)`) + ext(X(0), Y(M.dext/2) - 4, X(0), Y(M.dext/2) - 46) + ext(X(M.h), Y(M.dext/2) - 4, X(M.h), Y(M.dext/2) - 46);
    g += dia(X(0), Y(M.dext/2), X(0) - 120, `Ø ${f(M.dext)}`) + dia(X(0), Y(M.dint/2), X(0) - 120, `Ø ${f(M.dint)}`);
    const xs = X(M.h) + 125; g += ext(X(M.h) + 4, Y(M.dext/2), xs + 6, Y(M.dext/2)) + ext(X(M.h) + 4, Y(M.dint/2), xs + 6, Y(M.dint/2)) + dimV(xs, Y(M.dext/2), Y(M.dint/2), `Secção ${f((M.dext - M.dint)/2)}`, 1);
    g += bal(X(M.h * 0.75), Y(M.dext/2 - 1.5), X(M.h) + 34, Y(M.dext/2) - 22, 1) + bal(X(M.h * 0.3), Y((M.dint/2 + P2.de/2) / 2), X(0) - 40, Y(M.dint/2) + 30, 2);
    g += `<text x="${X(M.h / 2)}" y="${Y(M.dint/2) + 70}" class="vt" text-anchor="middle">CONJUNTO MONTADO (no alojamento)</text>`; }

  // ---------- PEÇA 1 ----------
  { const s = PT ? 14 : 13, ox = PT ? 150 : 200, oy = PT ? 610 : 600, r0 = P1.di / 2;
    const { X, Y } = view([[prof1, "hatch"]], ox, oy, s, r0);
    g += dimH(X(0), X(P1.h), Y(P1.de/2) - 34, tolMk("H " + f(P1.h), "0", "-0.1")) + ext(X(0), Y(P1.de/2 - P1.ch) - 4, X(0), Y(P1.de/2) - 40) + ext(X(P1.h), Y(P1.de/2 - P1.ch) - 4, X(P1.h), Y(P1.de/2) - 40);
    g += dimH(X(a1), X(a1 + P1.encL), Y(P1.di/2) + 30, tolMk(f(P1.encL), "0.1", "0")) + ext(X(a1), Y(P1.di/2) + 4, X(a1), Y(P1.di/2) + 36) + ext(X(a1 + P1.encL), Y(P1.di/2) + 4, X(a1 + P1.encL), Y(P1.di/2) + 36);
    g += dia(X(0), Y(P1.de/2), X(0) - 100, tolMk(`Ø ${f(P1.de)}`, "0.1", "0")) + dia(X(0), Y(P1.di/2), X(0) - 100, tolMk(`Ø ${f(P1.di)}`, "0.1", "-0.1"));
    g += dia(X(P1.h), Y(P1.encD/2), X(P1.h) + 100, tolMk(`Ø ${f(P1.encD)}`, "0.1", "0")) + `<line x1="${X(a1 + P1.encL)}" y1="${Y(P1.encD/2)}" x2="${X(P1.h)}" y2="${Y(P1.encD/2)}" class="e" stroke-dasharray="3 2"/>`;
    g += `<line x1="${X(P1.h - P1.ch/2)}" y1="${Y(P1.de/2 - P1.ch/2)}" x2="${X(P1.h) + 26}" y2="${Y(P1.de/2) - 20}" class="e"/><text x="${X(P1.h) + 30}" y="${Y(P1.de/2) - 17}" class="tn">${fmtN(P1.ch, 1)} x 45° (2x)</text>`;
    g += `<text x="${X(P1.h / 2)}" y="${Y(P1.di/2) + 66}" class="vt" text-anchor="middle">PEÇA 1 · ANEL DE DESLIZE</text><text x="${X(P1.h / 2)}" y="${Y(P1.di/2) + 82}" class="tn" text-anchor="middle" style="fill:#111">${P1.mat} · secção ${f((P1.de - P1.di)/2)}</text>`; }

  // ---------- PEÇA 2 ----------
  { const s = PT ? 14 : 13, ox = PT ? 520 : 700, oy = PT ? 610 : 600, r0 = P2.di / 2;
    const { X, Y } = view([[prof2, "hatch2"]], ox, oy, s, r0);
    g += dimH(X(0), X(P2.h), Y(P2.de/2) - 34, tolMk("H " + f(P2.h), "0", "-0.1")) + ext(X(0), Y(P2.de/2) - 4, X(0), Y(P2.de/2) - 40) + ext(X(P2.h), Y(P2.de/2) - 4, X(P2.h), Y(P2.de/2) - 40);
    g += dia(X(0), Y(P2.de/2), X(0) - 100, tolMk(`Ø ${f(P2.de)}`, "0.2", "-0.2")) + dia(X(P2.ch), Y(P2.di/2), X(0) - 100, tolMk(`Ø ${f(P2.di)}`, "0.2", "-0.2"));
    g += `<line x1="${X(P2.h - P2.ch/2)}" y1="${Y(P2.di/2 + P2.ch/2)}" x2="${X(P2.h) + 24}" y2="${Y(P2.di/2) + 22}" class="e"/><text x="${X(P2.h) + 28}" y="${Y(P2.di/2) + 26}" class="tn">${fmtN(P2.ch, 1)} x 45° (2x)</text>`;
    g += `<text x="${X(P2.h / 2)}" y="${Y(P2.di/2) + 66}" class="vt" text-anchor="middle">PEÇA 2 · ANEL ENERGIZADOR</text><text x="${X(P2.h / 2)}" y="${Y(P2.di/2) + 82}" class="tn" text-anchor="middle" style="fill:#111">${P2.mat} · secção ${f((P2.de - P2.di)/2)} · vai no encaixe da peça 1</text>`; }
  return g;
}

const p = { tipoGen: "custom", desc: "PSO 11 E R", dint: M.dint, dext: M.dext, h: M.h,
  customProfile: prof1.map(([a, r]) => [-a, r]), customViews: views,
  customNotes: `Peça 1: anel de deslize ${P1.mat} Ø${f(P1.di)} x Ø${f(P1.de)} x ${f(P1.h)} · Peça 2: energizador ${P2.mat} Ø${f(P2.di)} x Ø${f(P2.de)} x ${f(P2.h)} · medidas do alojamento no carimbo · cotas em mm` };
window.PSO11ER = p;
state.genParams = p;
const mat = document.querySelector("#dwgFields input[data-d=mat]"); if (mat && !mat.value) mat.value = `${P1.mat} + ${P2.mat}`;
const qtd = document.querySelector("#dwgFields input[data-d=obs]"); if (qtd && !qtd.value) qtd.value = "CONJUNTO 2 PEÇAS";
})();
