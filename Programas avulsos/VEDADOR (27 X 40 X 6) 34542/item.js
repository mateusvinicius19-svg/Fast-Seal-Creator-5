// VEDADOR (27 X 40 X 6) 34542 — perfil em U (Mastor GR07 27/40/6/28,7/3,8), canal externo 3,8 até Ø28,7, paredes de 1,1.
// Usuário 27/11/2026: canal feito pela T2D94 (bedame 3,8) entrando 1 vez só → canal reto, sem os chanfros 0,2 da boca do canal
// que o desenho do Mastor tinha. Programa: `Programas_CNC\034542 CICLO 3 PÇ.PIT` (PSA 108 de 3 peças + bloco da T2D94).
// Roda dentro do Simulador CNC.html (usa rev3DParams, rev3DFlip, tolMk, fv3...): des34542().
window.ITEM34542 = {
  // contorno fechado [a, raio], a = 0 na face da frente (Z0 do programa); perfil simétrico
  poly: [[0, 19.8], [0.2, 20], [1.1, 20], [1.1, 14.35], [4.9, 14.35], [4.9, 20], [5.8, 20], [6, 19.8],
         [6, 13.7], [5.8, 13.5], [0.2, 13.5], [0, 13.7]],
  D_INT: 27, D_EXT: 40, H: 6, D_CAN: 28.7, W: 3.8, PAR: 1.1, MAT: "PTFE"
};
window.des34542 = function(){
  const I = ITEM34542;
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "34542"); set("mat", I.MAT); set("cod", "33841");   // cód. interno (usuário 27/11/2026)
  const p0 = rev3DParams("VEDADOR (27 X 40 X 6) 34542", I.poly, I.H); p0.desc = "VEDADOR"; p0.mat = I.MAT;
  const q = rev3DFlip(p0); q.desc = "VEDADOR"; q.mat = I.MAT; q.dint = I.D_INT; q.dext = I.D_EXT;
  // padrão aprovado (46310 / 46707 / 46498): Ø só no CORTE A-A; secção ampliada só com o contorno, alturas em cota corrida,
  // largura total e as secções — sem chanfros, raios nem ângulos. Tolerâncias do desenho do Mastor.
  const poly = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, rmax = Math.max(...poly.map(v => v[1])), rmin = Math.min(...poly.map(v => v[1]));
  q.corteD = [...new Set(poly.map(v => v[1]))];
  Object.defineProperty(q, "customNotes", { value: "VEDADOR Ø27 x Ø40 x 6 · canal Ø28,7 x 3,8 (bedame 3,8, sem chanfro na boca) · demais chanfros 0,2 · cotas em mm", writable: true });
  const orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    g = g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g, "");
    const sc = 300 / (2 * rmax), cy = 238, ox2 = 540, sc2 = Math.min(sc, 180 / L), X2 = a => ox2 + (a - L / 2) * sc2, Y2 = r => cy - r * sc, f = v => fv3(v);
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 5, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const edge = (r, sd) => { const a = poly.filter(v => Math.abs(v[1] - r) < 1e-6).map(v => v[0]); return sd < 0 ? Math.min(...a) : Math.max(...a); };
    // esquerda: Ø27 e Ø40; direita: Ø28,7 (fundo do canal)
    const tolD = { 13.5: ["+0.135", "-0.034"] };
    for (const [sd, rs] of [[-1, [13.5, 20]], [1, [14.35]]]) rs.forEach((r, k) => { const xe = X2(edge(r, sd)), xx = sd < 0 ? X2(0) - 24 * (k + 1) : X2(L) + 24 * (k + 1);
      const t = tolD[r] ? tolMk("Ø " + f(2 * r), ...tolD[r]) : "Ø " + f(2 * r);
      g += ext(xe + sd * 3, Y2(r), xx + sd * 5, Y2(r)) + ext(xe + sd * 3, Y2(-r), xx + sd * 5, Y2(-r)) + dimV(xx, Y2(r), Y2(-r), t); });
    const T = "SECÇÃO (ampliada)</text>", iT = g.indexOf(T), head = g.slice(0, iT), tail = g.slice(iT + T.length);
    const prof = head.match(/<path d="[^"]*" class="p"\/>/)[0];
    const Hh = rmax - rmin, bx0 = 170, bx1 = 600, by0 = 530, by1 = 715, s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60);
    const ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2, X = a => ox + a * s, Y = r => oy - (r - rmin) * s, yT = Y(rmax), yB = Y(rmin);
    const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV2 = (x, y1, y2, txt, dx = 16) => { const tx = x + dx, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const rTop = z => Math.max(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1])), rBot = z => Math.min(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1]));
    let h = prof;
    // largura total (embaixo)
    const yb = yB + 30;
    h += ext(X(0), Y(rBot(0)) + 4, X(0), yb + 6) + ext(X(L), Y(rBot(L)) + 4, X(L), yb + 6) + dimH(X(0), X(L), yb, f(L), yb + 14);
    // em cima (cota corrida): parede 1,1 · canal 3,8 ±0,1 · parede 1,1
    const zt = [0, I.PAR, L - I.PAR, L], yd = yT - 24;
    zt.forEach(z => h += ext(X(z), yT - 4, X(z), yd - 6));
    for (let i = 1; i < zt.length; i++) h += dimH(X(zt[i - 1]), X(zt[i]), yd, i === 2 ? tolMk(f(I.W), "+0.1", "-0.1") : f(zt[i] - zt[i - 1]));
    // secções: fundo do canal 0,85 (Ø27 → Ø28,7) à direita, total 6,5 à esquerda
    const rc = I.D_CAN / 2, xl = X(L) + 34, xs = X(0) - 34;
    h += ext(X(L - I.PAR) - 4, Y(rc), xl + 6, Y(rc)) + ext(X(L) + 4, yB, xl + 6, yB) + dimV2(xl, Y(rc), yB, tolMk(f(rc - rmin), "0", "-0.07"));
    h += ext(X(0) - 4, yT, xs - 6, yT) + ext(X(0) - 4, yB, xs - 6, yB) + dimV2(xs, yT, yB, tolMk(f(rmax - rmin), "+0.03", "-0.15"), -6);
    h += `<text x="${X(L / 2)}" y="${yB + 74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return h + tail; };
  return q;
};
