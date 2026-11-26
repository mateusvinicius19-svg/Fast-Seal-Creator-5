// VEDADOR (400 X 430 X 21) 46504 — PU, bucha 327 x 444 (usuário 26/11/2026), 1 operação, cód. interno 46524.
// Secção tirada do STL do Inventor (W:\...\DESENHOS\VEDADOR\VEDADOR (400 X 430 X 21) 44504\), Z0 = face com o colar mais perto (Z −5):
//   externo: Ø402 na face, cone até Ø410 em Z −5, parede até o colar, chanfro 0,5, colar Ø431 até Z −10,5, chanfro 0,5,
//            parede virada para trás em Z −11 até Ø416,8, cone até Ø402 em Z −21
//   interno: Ø399 na face, cone até Ø405,4 em Z −8, reto até Z −11, cone até Ø399 em Z −21
// Roda dentro do Simulador CNC.html (usa tipPath, tipLines, fagorToMcs, rev3DParams...): prog46504() e des46504().
window.ITEM46504 = {
  // contorno fechado [a, raio], a = 0 na face da frente da usinagem
  poly: [[0, 201], [5, 205], [5, 215], [5.5, 215.5], [10.5, 215.5], [11, 215], [11, 208.4], [21, 201],
         [21, 199.5], [11, 202.7], [8, 202.7], [0, 199.5]],
  D_INT: 399, D_EXT: 431, H: 21, tI: 327, tO: 444, r: 0.4
};
window.prog46504 = function(){
  const I = ITEM46504, f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
  const { D_INT, D_EXT, H, tI, tO, r } = I, SOB = 1;
  const ZE = -(H + 2), ZI = -(H + 1);   // externo até a altura + 2 (largura da T6D6, como no PSR 212); interno até a altura + 1
  const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE), XT = D_EXT + FACA_MIN;   // PU com sobremetal > 10: T6 e faca a 10 acima da peça
  const L = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR (400 X 430 X 21) - FRENTE = FACE DO COLAR EM Z-5 - SECCAO DO STL",
    `;MATERIAL: USER DEFINED PU ${f3(tI)}/${f3(tO)} - TUBE ${f3(tI)}/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
  // desbaste em camadas: externo x = máx(P, nível), interno x = mín(P, nível) — P = acabamento ± 1 no Ø; onde P passa do nível
  // anterior o passe vai pelo P (já está no ar)
  const interp = (P, z) => { for (let i = 1; i < P.length; i++){ const a = P[i - 1], b = P[i]; if ((a.z - z) * (b.z - z) <= 0 && a.z !== b.z) return a.x + (b.x - a.x) * (z - a.z) / (b.z - a.z); } return P[P.length - 1].x; };
  const layer = (P, lo, hi) => {   // x preso em [lo, hi], com os pontos onde o caminho cruza lo/hi
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
  // ---- faceamento (T3D3) ----
  L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(tO + 4)} Z0.690`, `G1 X${f3(tO + 4)} Z0.000`, ";( FINISH )", `G1 X${f3(tI - 4)} Z0.000 F0.150`, `G0 X${f3(tI - 4)} Z0.690`, "");
  // ---- externo (T2D2): desbaste em camadas de no máximo 8 no Ø; a última é o pré-acabamento (acabamento + 1 no Ø).
  //      Pré-acabamento sem passar no mesmo lugar do acabamento (usuário, 46498): sobe 0,5 antes da parede do colar (Z −4,5);
  //      atrás do colar desce a 45° do canto e deixa a parede e o cone de trás para a T6D6. Passes acima do Ø431 vão 1 mm a mais
  //      em Z (PU, sobremetal 13 no Ø), sem contar no G92 ----
  const outerR = [[0, 201], [-4.5, 204.6], [-4.5, 215], [-5, 215.5], [-10.5, 215.5], [ZE + r, 215.5 - (-10.5 - ZE - r)]];
  const PO = [{ z: 3, x: 0 }, ...tipPath(extendStart(outerR, 1.0), r, "right", [-r, -r]).map(it => ({ z: it.p[0], x: 2 * it.p[1] + SOB }))];
  PO[0].x = PO[1].x;
  const minO = Math.min(...PO.map(q => q.x)), nO = Math.ceil((tO - minO) / 8 - 1e-9), stO = (tO - minO) / nO;
  L.push(...sec("OUTSIDE"), "G0 Z70", "T2D2", ";", ";");
  // cada passe: na frente vai até onde o caminho chega no nível do passe anterior (parede do colar) e sai; atrás do colar entra
  // por cima (no ar), um pouco atrás de onde a rampa de 45° cruza o nível anterior, e desce até o nível do passe até o fim
  const xC = Math.max(...PO.map(q => q.x)) + 3;   // 3 acima do colar (pré-acabamento)
  for (let k = 1, hi = tO; k <= nO; k++){
    const lo = k < nO ? tO - k * stO : -Infinity, Q = layer(PO, lo, hi), top = Q.map(q => q.x >= hi - 1e-6);
    const i1 = top.indexOf(true), i2 = top.lastIndexOf(true);
    const fim = R => { const e = R[R.length - 1]; if (e.x > D_EXT + 1e-6) R.push({ z: e.z - 1, x: e.x }); return R; };   // acima do Ø da peça: 1 mm a mais em Z
    if (i1 < 0){ const R = fim(Q.slice()), e = R[R.length - 1];
      L.push(...cut(R, "0.160"), `G0 X${f3(hi + 3)} Z${f3(e.z + 0.2)}`, `G0 X${f3(hi + 3)} Z3.000`); }
    else {
      const F = Q.slice(0, i1 + 1), B = fim(Q.slice(i2)), e = B[B.length - 1];
      L.push(...cut(F, "0.160"), `G0 X${f3(xC)} Z${f3(F[F.length - 1].z + 0.2)}`, `G0 X${f3(xC)} Z${f3(B[0].z - 0.3)}`,
             `G0 X${f3(hi + 0.3)} Z${f3(B[0].z - 0.3)}`, `G1 X${f3(B[0].x)} Z${f3(B[0].z)} F0.160`, ...B.slice(1).map(q => `G1 X${f3(q.x)} Z${f3(q.z)}`),
             `G0 X${f3(xC)} Z${f3(e.z + 0.2)}`, `G0 X${f3(xC)} Z3.000`);
    }
    if (isFinite(lo)) hi = lo;
  }
  // acabamento: cone da frente, parede, colar e o chanfro de trás do colar (o que fica atrás do colar é da T6D6)
  const outer = [[0, 201], [-5, 205], [-5, 215], [-5.5, 215.5], [-10.5, 215.5], [-11, 215]];
  const pout = tipPath(extendStart(outer, 1.0), r, "right", [-r, -r]), lo1 = pout[pout.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])}`, ...tipLines(pout, r, "0.130"),
         `G1 X${f3(2 * lo1[1] + 1)}`, `G0 X${f3(D_EXT + 4)} Z${f3(lo1[0] + 0.2)}`, `G0 X${f3(D_EXT + 4)} Z5.000`, "");
  // ---- T6D6 (2 mm, afiada): parede atrás do colar (Z −11) até Ø416,8 e o cone até Ø402 em Z −21, em 3 passes que seguem o
  //      mesmo caminho, cada um mais fundo (como o PSR 212); o canto da frente da lâmina é a referência ----
  const top = z => interp(PO, z), tg = [[-11, 416.8], [-21, 402]], nT = 3;
  L.push(...sec("OUTSIDE 2"), "G0 Z70", "T6D6", ";", ";", `G0 X${f3(XT)} Z3.000`);
  for (let k = 1; k <= nT; k++){
    const xs = tg.map(([z, x]) => [z, top(z) - (top(z) - x) * k / nT]);
    L.push(`;( PASSE ${k}/${nT} )`, `G0 Z${f3(xs[0][0])}`, `G1 X${f3(top(xs[0][0]) + 1)} F0.080`, `G1 X${f3(xs[0][1])}`, `G1 X${f3(xs[1][1])} Z${f3(xs[1][0])}`,
           `G1 X${f3(top(xs[1][0]) + 2)}`, `G0 X${f3(XT)}`);
  }
  L.push("G0 Z3.000", "");
  // ---- interno (T2D12, Ø ≥ 40), bucha Ø327: camadas de no máximo 8 no Ø; a última é o pré-acabamento (acabamento − 1 no Ø);
  //      recuo da T2D12 3,5 no Ø ----
  const inner = [[0, 199.5], [-8, 202.7], [-11, 202.7], [-21.5, 199.34], [ZI + r, 199.34]]   // cone de trás segue 0,5 além da altura (sem ponto no meio);
  const pin = tipPath(extendStart(inner, 1.0), r, "left", [-r, r]);
  const PI = [{ z: 3, x: 0 }, ...pin.map(it => ({ z: it.p[0], x: 2 * it.p[1] - SOB }))]; PI[0].x = PI[1].x;
  const maxI = Math.max(...PI.map(q => q.x)), nI = Math.ceil((maxI - tI) / 8 - 1e-9), stI = (maxI - tI) / nI;
  L.push(...sec("INSIDE"), "G0 Z70", "T2D12", ";", ";");
  for (let k = 1; k <= nI; k++){
    const hi = k < nI ? tI + k * stI : Infinity, Q = layer(PI, -Infinity, hi), ze = Q[Q.length - 1].z, xm = Math.min(...Q.map(q => q.x));
    L.push(...cut(Q, "0.140"), `G1 X${f3(xm - 3.5)}`, `G0 X${f3(xm - 3.5)} Z3.000`);
  }
  const li = pin[pin.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, r, "0.150"),
         `G1 X${f3(2 * li[1] - 3.5)}`, `G0 X${f3(2 * li[1] - 3.5)} Z5.000`, "");
  // ---- corte com a faca T5D5 em Z −21 (PU só corta com a faca), a 10 acima da peça ----
  L.push(...sec("CUTTING"), "G0 Z70", "T5D5", ";", ";", `G0 X${f3(XT)} Z3.000`, `G0 X${f3(XT)} Z${f3(-H)}`, `G1 X${f3(D_INT - 1)} Z${f3(-H)} F0.220`,
         `G0 X${f3(XT)} Z${f3(-H)}`, `G0 X${f3(XT)} Z15.000`, "", "");
  const g92 = 15 + (H + 2) + 0.15;   // como o PSR 212: 15 + altura + 2 (T6D6) + 0,15; o 1 mm a mais dos passes de cima não conta
  L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
  const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
  const pit = L.join("\n"), mcs = fagorToMcs(pit);
  return { pit, mcs: typeof mcs === "string" ? mcs : JSON.stringify(mcs) };
};
// desenho: secção do STL pelo "Desenho do 3D", invertido (face do Z0 à direita), material PU
window.des46504 = function(){
  const I = ITEM46504;
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "46504"); set("mat", "PU"); set("cod", "46524");
  const p0 = rev3DParams("VEDADOR (400 X 430 X 21) 46504.stl", I.poly, I.H); p0.desc = "VEDADOR"; p0.mat = "PU";
  const q = rev3DFlip(p0); q.desc = "VEDADOR"; q.mat = "PU"; q.dint = I.D_INT; q.dext = I.D_EXT;
  const poly = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, rmax = Math.max(...poly.map(v => v[1])), rmin = Math.min(...poly.map(v => v[1]));
  q.corteD = [...new Set(poly.map(v => v[1]))];
  Object.defineProperty(q, "customNotes", { value: "VEDADOR Ø399 x Ø431 x 21 · desenho gerado do 3D (VEDADOR (400 X 430 X 21) 44504.stl) · chanfros 0,5 no colar · cotas em mm", writable: true });
  const orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    g = g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g, "");
    const sc = 300 / (2 * rmax), cy = 238, ox2 = 540, sc2 = Math.min(sc, 180 / L), X2 = a => ox2 + (a - L / 2) * sc2, Y2 = r => cy - r * sc, f = v => fv3(v);
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 5, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    // esquerda = trás (Ø399, Ø402, Ø405,4 do interno, Ø416,8); direita = frente / Z0 (Ø399, Ø402, Ø410, Ø431); [raio, posição]
    for (const [sd, list] of [[-1, [[199.5, 0], [201, 0], [202.7, 10], [208.4, 10]]], [1, [[199.5, L], [201, L], [205, 16], [215.5, 13]]]]) list.forEach(([r, a], k) => { const xe = X2(a), xx = sd < 0 ? X2(0) - 20 * (k + 1) : X2(L) + 24 * (k + 1);
      g += ext(xe + sd * 3, Y2(r), xx + sd * 5, Y2(r)) + ext(xe + sd * 3, Y2(-r), xx + sd * 5, Y2(-r)) + dimV(xx, Y2(r), Y2(-r), "Ø " + f(2 * r)); });
    const T = "SECÇÃO (ampliada)</text>", iT = g.indexOf(T), head = g.slice(0, iT), tail = g.slice(iT + T.length);
    const prof = head.match(/<path d="[^"]*" class="p"\/>/)[0];
    const Hh = rmax - rmin, bx0 = 170, bx1 = 600, by0 = 530, by1 = 715, s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60);
    const ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2, X = a => ox + a * s, Y = r => oy - (r - rmin) * s, yT = Y(rmax), yB = Y(rmin);
    const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV2 = (x, y1, y2, txt, dx = 16) => { const tx = x + dx, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const rTop = z => Math.max(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1])), rBot = z => Math.min(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1]));
    let h = prof;
    h += ext(X(0), Y(rTop(0)) - 4, X(0), yT - 52) + ext(X(L), Y(rTop(L)) - 4, X(L), yT - 52) + dimH(X(0), X(L), yT - 46, f(L));
    // externo (cota corrida em cima): cone de trás, colar, cone da frente
    const zt = [0, 10, 16, L], yd = yT - 20;
    zt.forEach(z => h += ext(X(z), Y(rTop(z)) - 4, X(z), yd - 6));
    for (let i = 1; i < zt.length; i++) h += dimH(X(zt[i - 1]), X(zt[i]), yd, f(zt[i] - zt[i - 1]));
    // interno (cota corrida embaixo): cone de trás, reto Ø405,4, cone da frente
    const zb = [0, 10, 13, L], yb = yB + 28;
    zb.forEach(z => h += ext(X(z), Y(rBot(z)) + 4, X(z), yb + 6));
    for (let i = 1; i < zb.length; i++) h += dimH(X(zb[i - 1]), X(zb[i]), yb, f(zb[i] - zb[i - 1]), yb + 14);
    // secções: face da frente (Ø399 → Ø402) e total à direita; face de trás à esquerda
    const xl = X(L) + 30, xs = X(L) + 70, xb = X(0) - 30;
    h += ext(X(L) + 4, Y(201), xl + 6, Y(201)) + ext(X(L) + 4, yB, xl + 6, yB) + dimV2(xl, Y(201), yB, f(201 - 199.5));
    h += ext(X(13) + 4, yT, xs + 6, yT) + ext(X(L) + 4, yB, xs + 6, yB) + dimV2(xs, yT, yB, f(rmax - rmin));
    h += ext(X(0) - 4, Y(201), xb - 6, Y(201)) + ext(X(0) - 4, yB, xb - 6, yB) + dimV2(xb, Y(201), yB, f(201 - 199.5), -6);
    h += `<text x="${X(L / 2)}" y="${yB + 74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return h + tail; };
  return q;
};
