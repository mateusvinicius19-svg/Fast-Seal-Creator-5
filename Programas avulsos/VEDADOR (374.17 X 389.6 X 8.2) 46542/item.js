// VEDADOR (374.17 X 389.6 X 8.2) 46542 — PU, bucha 301 x 391 (usuário 27/11/2026), 1 operação, cód. interno 46516.
// Secção tirada do STL do Inventor (W:\...\DESENHOS\VEDADOR\VEDADOR (374.17 X 389.6 X 8.2) 46542\): Ø374,27 x Ø389,77 x 8,2
// (o STL tem 374,27 / 389,77; o nome da pasta diz 374,17 / 389,6). Chanfros 0,5 nos 4 cantos.
// Z0 = face com o canal em V raso (0,5 de fundo, de Ø376,27 a Ø387,77, fundo em Ø382,02): é a única face que dá para usinar —
// a outra (lisa) é a do corte. Em a (0 = frente, para trás):
//   externo: chanfro 0,5 → Ø389,77 até a 1,406, arredondado, V até Ø387,77 em a 4,303, sobe até Ø389,77 em a 7,2, chanfro 0,5
//   interno: chanfro 0,5 → Ø374,27 até a 1, V até Ø376,17 em a 4,1, desce até Ø374,27 em a 7,2, chanfro 0,5
// Roda dentro do Simulador CNC.html (usa tipPath, tipLines, fagorToMcs, rev3DParams...): prog46542() e des46542().
window.ITEM46542 = {
  // contorno fechado [a, raio], a = 0 na face da frente da usinagem (face do canal)
  poly: [[0, 194.385], [0.5, 194.885], [1.406, 194.885], [1.542, 194.782], [4.303, 193.885], [7.063, 194.782], [7.2, 194.885],
         [7.7, 194.885], [8.2, 194.385], [8.2, 187.635], [7.7, 187.135], [7.2, 187.135], [4.1, 188.085], [1, 187.135],
         [0.5, 187.135], [0, 187.635], [0, 188.135], [0.5, 191.01], [0, 193.885]],
  D_INT: 374.27, D_EXT: 389.77, H: 8.2, tI: 301, tO: 391, r: 0.4
};
window.prog46542 = function(){
  const I = ITEM46542, f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
  const { D_INT, D_EXT, H, tI, tO, r } = I, SOB = 1, ZI = -(H + 1);   // interno até a altura + 1 (como o 46498)
  const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE), XT = D_EXT + FACA_MIN;   // faca aproxima a 10 acima da peça
  const L = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR (374.17 X 389.6 X 8.2) - FRENTE = FACE DO CANAL EM V (0.5) - SECCAO DO STL",
    `;MATERIAL: USER DEFINED PU ${f3(tI)}/${f3(tO)} - TUBE ${f3(tI)}/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
  // ---- faceamento (T3D3) ----
  L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(tO + 4)} Z0.690`, `G1 X${f3(tO + 4)} Z0.000`, ";( FINISH )", `G1 X${f3(tI - 4)} Z0.000 F0.150`, `G0 X${f3(tI - 4)} Z0.690`, "");
  // ---- canal em V da face (T3D3, a mesma do faceamento: rômbica 35° R0,4, desce usinando direto) — 0,5 de fundo, passe único ----
  const face = [[0, 195.2], [0, 193.885], [-0.5, 191.01], [0, 188.135], [0, 187.6]];
  const pf = tipPath(face, r, "left", [-r, -r]), lf = pf[pf.length - 1].p;
  L.push(...sec("FACE GROOVE"), ";( FINISH )", `G0 X${f3(2 * pf[0].p[1])} Z1.000`, `G1 X${f3(2 * pf[0].p[1])} Z${f3(pf[0].p[0])} F0.150`, ...tipLines(pf, r, "0.120"),
         `G0 X${f3(2 * lf[1])} Z1.000`, `G0 X${f3(tO + 4)} Z1.000`, "");
  // ---- externo (T2D2): bucha Ø391 deixa só 1,23 no Ø — só o acabamento (PU até 6 no Ø = passe único). Chanfro da frente,
  //      Ø389,77, canal em V (18° com o eixo nos dois lados), chanfro de trás e um pouco além da linha do corte ----
  const outer = [[0, 194.385], [-0.5, 194.885], [-1.406, 194.885], [-1.542, 194.782], [-4.303, 193.885], [-7.063, 194.782], [-7.2, 194.885],
                 [-7.7, 194.885], [-8.2, 194.385], [-8.6, 193.985]];
  const pout = tipPath(extendStart(outer, 1.0), r, "right", [-r, -r]), lo = pout[pout.length - 1].p;
  L.push(...sec("OUTSIDE"), "G0 Z70", "T2D2", ";", ";", ";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])} F1.000`,
         ...tipLines(pout, r, "0.130"), `G1 X${f3(2 * lo[1] + 1)}`, `G0 X${f3(tO + 4)} Z${f3(lo[0] + 0.2)}`, `G0 X${f3(tO + 4)} Z5.000`, "");
  // ---- interno (T2D12, Ø ≥ 40), bucha Ø301: camadas de no máximo 8 no Ø; a última é o pré-acabamento (acabamento − 1 no Ø);
  //      recuo da T2D12 3,5 no Ø (como o 46504) ----
  const interp = null;
  const layer = (P, lo, hi) => {
    const cl = x => Math.min(hi, Math.max(lo, x)), out = [{ z: P[0].z, x: cl(P[0].x) }];
    for (let i = 1; i < P.length; i++){ const a = P[i - 1], b = P[i], ts = [];
      for (const c of [lo, hi]) if (isFinite(c) && (a.x - c) * (b.x - c) < 0) ts.push((c - a.x) / (b.x - a.x));
      ts.sort((u, v) => u - v).forEach(t => out.push({ z: a.z + (b.z - a.z) * t, x: cl(a.x + (b.x - a.x) * t) }));
      out.push({ z: b.z, x: cl(b.x) }); }
    const o = out.filter((q, i) => !i || Math.abs(q.z - out[i - 1].z) > 5e-4 || Math.abs(q.x - out[i - 1].x) > 5e-4);
    return o.filter((q, i) => !(i > 0 && i < o.length - 1 && Math.abs(o[i - 1].x - q.x) < 5e-4 && Math.abs(o[i + 1].x - q.x) < 5e-4));
  };
  const cut = (Q, feed) => { const s = [`G0 X${f3(Q[0].x)} Z3.500`, `G1 X${f3(Q[0].x)} Z3.000 F1.000`];
    Q.slice(1).forEach((q, i) => s.push(`G1 X${f3(q.x)} Z${f3(q.z)}` + (i ? "" : ` F${feed}`))); return s; };
  const inner = [[0, 187.635], [-0.5, 187.135], [-1, 187.135], [-4.1, 188.085], [-7.2, 187.135], [-7.7, 187.135], [-8.2, 187.635], [-8.5, 187.935], [ZI + r, 187.935]];
  const pin = tipPath(extendStart(inner, 1.0), r, "left", [-r, r]);
  const PI = [{ z: 3, x: 0 }, ...pin.map(it => ({ z: it.p[0], x: 2 * it.p[1] - SOB }))]; PI[0].x = PI[1].x;
  const maxI = Math.max(...PI.map(q => q.x)), nI = Math.ceil((maxI - tI) / 8 - 1e-9), stI = (maxI - tI) / nI;
  L.push(...sec("INSIDE"), "G0 Z70", "T2D12", ";", ";");
  for (let k = 1; k <= nI; k++){
    const hi = k < nI ? tI + k * stI : Infinity, Q = layer(PI, -Infinity, hi), xm = Math.min(...Q.map(q => q.x));
    L.push(...cut(Q, "0.140"), `G1 X${f3(xm - 3.5)}`, `G0 X${f3(xm - 3.5)} Z3.000`);
  }
  const li = pin[pin.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, r, "0.150"),
         `G1 X${f3(2 * li[1] - 3.5)}`, `G0 X${f3(2 * li[1] - 3.5)} Z5.000`, "");
  // ---- corte com a faca T5D5 em Z −8,2 (PU só corta com a faca), a 10 acima da peça ----
  L.push(...sec("CUTTING"), "G0 Z70", "T5D5", ";", ";", `G0 X${f3(XT)} Z3.000`, `G0 X${f3(XT)} Z${f3(-H)}`, `G1 X${f3(D_INT - 1)} Z${f3(-H)} F0.220`,
         `G0 X${f3(XT)} Z${f3(-H)}`, `G0 X${f3(XT)} Z15.000`, "", "");
  const g92 = 15 + progMaxZ(L) + 0.15;   // como o 46498: 15 + Z mais fundo (−9,2) + 0,15
  L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
  const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
  const pit = L.join("\n"), mcs = fagorToMcs(pit);
  return { pit, mcs: typeof mcs === "string" ? mcs : JSON.stringify(mcs) };
};
// desenho: secção do STL pelo "Desenho do 3D", invertido (face do Z0 = face do canal à direita), material PU
window.des46542 = function(){
  const I = ITEM46542;
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "46542"); set("mat", "PU"); set("cod", "46516");
  const p0 = rev3DParams("VEDADOR (374.17 X 389.6 X 8.2) 46542.stl", I.poly, I.H); p0.desc = "VEDADOR"; p0.mat = "PU";
  const q = rev3DFlip(p0); q.desc = "VEDADOR"; q.mat = "PU"; q.dint = I.D_INT; q.dext = I.D_EXT;
  // padrão aprovado (46310 / 46707 / 46498): Ø só no CORTE A-A; secção ampliada só com o contorno, alturas em cota corrida,
  // largura total e as secções — sem chanfros, raios nem ângulos. Aqui a = 0 é a face de TRÁS (esquerda) e a = L a face do canal.
  const poly = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, rmax = Math.max(...poly.map(v => v[1])), rmin = Math.min(...poly.map(v => v[1]));
  q.corteD = [...new Set(poly.map(v => v[1]))];
  Object.defineProperty(q, "customNotes", { value: "VEDADOR Ø374,27 x Ø389,77 x 8,2 · desenho gerado do 3D (VEDADOR (374.17 X 389.6 X 8.2) 46542.stl) · chanfros 0,5 · cotas em mm", writable: true });
  const orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    g = g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g, "");
    const sc = 300 / (2 * rmax), cy = 238, ox2 = 540, sc2 = Math.min(sc, 180 / L), X2 = a => ox2 + (a - L / 2) * sc2, Y2 = r => cy - r * sc, f = v => fv3(v);
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 5, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    // esquerda = trás (Ø374,27, Ø376,17 do V interno, Ø387,77 do V externo, Ø389,77); direita = frente / Z0 (canal da face Ø376,27 e Ø382,02)
    for (const [sd, list] of [[-1, [[187.135, 0.5], [188.085, 4.1], [193.885, 3.897], [194.885, 0.5]]], [1, [[188.135, L], [191.01, L - 0.5]]]]) list.forEach(([r, a], k) => { const xe = X2(a), xx = sd < 0 ? X2(0) - 20 * (k + 1) : X2(L) + 24 * (k + 1);
      g += ext(xe + sd * 3, Y2(r), xx + sd * 5, Y2(r)) + ext(xe + sd * 3, Y2(-r), xx + sd * 5, Y2(-r)) + dimV(xx, Y2(r), Y2(-r), "Ø " + f(2 * r)); });
    const T = "SECÇÃO (ampliada)</text>", iT = g.indexOf(T), head = g.slice(0, iT), tail = g.slice(iT + T.length);
    const prof = head.match(/<path d="[^"]*" class="p"\/>/)[0];
    const Hh = rmax - rmin, bx0 = 170, bx1 = 600, by0 = 530, by1 = 715, s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60);
    const ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2, X = a => ox + a * s, Y = r => oy - (r - rmin) * s, yT = Y(rmax), yB = Y(rmin);
    const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV2 = (x, y1, y2, txt, dx = 16) => { const tx = x + dx, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    let h = prof;
    // largura total (bem em cima)
    h += ext(X(0), yT - 4, X(0), yT - 52) + ext(X(L), yT - 4, X(L), yT - 52) + dimH(X(0), X(L), yT - 46, f(L));
    // externo (cota corrida em cima): face de trás até o V, V, até a face do canal
    const zt = [0, 1, 6.794, L], yd = yT - 20;
    zt.forEach(z => h += ext(X(z), yT - 4, X(z), yd - 6));
    for (let i = 1; i < zt.length; i++) h += dimH(X(zt[i - 1]), X(zt[i]), yd, f(zt[i] - zt[i - 1]));
    // interno (cota corrida embaixo): V do interno
    const zb = [0, 1, 7.2, L], yb = yB + 28;
    zb.forEach(z => h += ext(X(z), yB + 4, X(z), yb + 6));
    for (let i = 1; i < zb.length; i++) h += dimH(X(zb[i - 1]), X(zb[i]), yb, f(zb[i] - zb[i - 1]), yb + 14);
    // canal da face (direita): do interno até o canal 1, largura do canal 5,75, secção total 7,75; fundo do canal 0,5
    const xl = X(L) + 30, xw = X(L) + 62, xs = X(L) + 96;
    h += ext(X(L) + 4, Y(188.135), xl + 6, Y(188.135)) + ext(X(L) + 4, yB, xl + 6, yB) + dimV2(xl, Y(188.135), yB, f(188.135 - rmin));
    h += ext(X(L) + 4, Y(193.885), xw + 6, Y(193.885)) + ext(xl + 6, Y(188.135), xw + 6, Y(188.135)) + dimV2(xw, Y(193.885), Y(188.135), f(193.885 - 188.135));
    h += ext(X(L) + 4, yT, xs + 6, yT) + ext(xw + 6, yB, xs + 6, yB) + ext(xl + 6, yB, xw + 6, yB) + dimV2(xs, yT, yB, f(rmax - rmin));
    const yG = Y(191.01);
    h += ext(X(L - 0.5), yG, X(L - 0.5) - 30, yG) + arr(X(L - 0.5) - 26, yG, X(L) , yG).replace('marker-start="url(#a)" ', "")
       + `<text x="${X(L - 0.5) - 30}" y="${yG - 4}" class="t" text-anchor="end">${f(0.5)}</text>`;
    // fundo dos V: externo 1 (Ø389,77 → Ø387,77) e interno 0,95 (Ø374,27 → Ø376,17), à esquerda
    const xa = X(0) - 30, xc = X(0) - 30;
    h += ext(X(3.897) - 4, Y(193.885), xa - 6, Y(193.885)) + ext(X(0) - 4, yT, xa - 6, yT) + dimV2(xa, yT, Y(193.885), f(rmax - 193.885), -6);
    h += ext(X(4.1) - 4, Y(188.085), xc - 6, Y(188.085)) + ext(X(0) - 4, yB, xc - 6, yB) + dimV2(xc, Y(188.085), yB, f(188.085 - rmin), -6);
    h += `<text x="${X(L / 2)}" y="${yB + 74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return h + tail; };
  return q;
};
