// VEDADOR (28 X 46 X 26) 46498 — PU, bucha 12 x 48 (usuário 26/11/2026), 1 operação.
// Secção tirada do STL do Inventor (W:\...\DESENHOS\VEDADOR\VEDADOR (28 X 46 X 26) 46498\), Z0 = face do Ø43 / rebaixo Ø38
// (frente: o rebaixo Ø38 x 17 só sai por este lado; o Ø28 fica atrás):
//   externo: chanfro 0,2, Ø43 até Z −15,2, degrau até o colar Ø46 (chanfro 0,2 nos dois cantos) até Z −20,1,
//            parede reta virada para trás até Ø42, Ø42 até o fim, chanfro 0,2 atrás
//   interno: chanfro 0,2, rebaixo Ø38 até Z −17, degrau até Ø28 (chanfro 0,2), Ø28 até o fim, chanfro 0,2 x 30° atrás
// Roda dentro do Simulador CNC.html (usa tipPath, roughPasses, fagorToMcs, rev3DParams...): prog46498() e des46498().
window.ITEM46498 = {
  // contorno fechado [a, raio], a = 0 na face do Ø43 (frente da usinagem)
  poly: [[0, 21.3], [0.2, 21.5], [15.2, 21.5], [15.2, 22.8], [15.4, 23], [19.9, 23], [20.1, 22.8], [20.1, 21], [25.8, 21], [26, 20.8],
         [26, 14.12], [25.8, 14], [17.2, 14], [17, 14.2], [17, 19], [0.2, 19], [0, 19.2]],
  D_INT: 28, D_EXT: 46, H: 26, tI: 12, tO: 48, r: 0.4
};
window.prog46498 = function(){
  const I = ITEM46498, f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
  const { D_INT, D_EXT, H, tI, tO, r } = I, SOB = 1, ZE = -(H + 1);                      // desbaste deixa 1 no Ø; passes até a face de trás + 1
  const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE), XF = Math.max(tO + 0.2, D_EXT + FACA_MIN);   // faca aproxima/recua 10 acima do maior Ø
  const L = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR (28 X 46 X 26) - FRENTE = FACE DO D43 / REBAIXO D38 X 17 - SECCAO DO STL",
    `;MATERIAL: USER DEFINED PU ${f3(tI)}/${f3(tO)} - TUBE ${f3(tI)}/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
  // ---- faceamento (T3D3): bucha Ø12 < 20, vai até o centro ----
  L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(tO + 4)} Z0.690`, `G1 X${f3(tO + 4)} Z0.000`, ";( FINISH )", `G1 X-4.000 Z0.000 F0.150`, `G0 X-4.000 Z0.690`, "");
  // ---- externo (T2D2, PU): passada de contorno (acabamento + 1 no Ø) e acabamento até o chanfro de trás do colar; atrás do
  //      colar (parede, Ø42 e chanfro de trás) só a T6D6, como no PSE 120.
  //      Usuário 26/11/2026 ("senão eu fico com 2 passes no mesmo lugar e o acabamento fica ruim"): o pré-acabamento sobe na
  //      frente do colar 0,5 antes da parede (Z −14,7) e atrás do colar fica no Ø44 (desce a 45° do canto), para só a T6D6 tirar ----
  const outer = [[0, 21.3], [-0.2, 21.5], [-15.2, 21.5], [-15.2, 22.8], [-15.4, 23], [-19.9, 23], [-20.1, 22.8]];
  const outerR = [[0, 21.3], [-0.2, 21.5], [-14.7, 21.5], [-14.7, 22.8], [-14.9, 23], [-19.9, 23], [-20.1, 22.8], [-20.1 - 1.3, 21.5], [ZE + r, 21.5]];   // + 1 no Ø → Ø44 atrás, até Z −27
  L.push(...sec("OUTSIDE"), "G0 Z70", "T2D2", ";", ";");
  const pR = tipPath(extendStart(outerR, 1.0), r, "right", [-r, -r]);
  L.push(...roughPasses(pR, tO, "od", "0.160", 4, SOB / 2, r));
  const pout = tipPath(extendStart(outer, 1.0), r, "right", [-r, -r]);   // termina no fim do chanfro de trás do colar
  const xTop = Math.max(...pout.map(it => 2 * it.p[1])), lo = pout[pout.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])}`, ...tipLines(pout, r, "0.130"),
         `G1 X${f3(2 * lo[1] + 1)}`, `G0 X${f3(xTop + 3)} Z${f3(lo[0] + 0.2)}`, `G0 X${f3(tO + 1)} Z5.000`, "");
  // ---- interno (T1D45, PU Ø 11–40), bucha Ø12: passes retos Ø20 → Ø27 até Z −27 (máx. 8 no Ø), rebaixo Ø38 em passes até
  //      Ø37 (fundo deixa 0,2), acabamento; recuo da T1D45: 2,5 no Ø até Ø21, 3 acima ----
  L.push(...sec("INSIDE"), "G0 Z70", "T1D45", ";", ";");
  const dRec = x => x < 21 ? 2.5 : 3, zF = -17 + 0.2;
  for (const x of [tI + 8, D_INT - SOB]) L.push(`G0 X${f3(x)} Z3.000`, `G1 X${f3(x)} Z${f3(ZE)} F0.140`, `G1 X${f3(x - dRec(x))}`, `G0 X${f3(x - dRec(x))} Z3.000`);
  for (const x of [35, 38 - SOB]) L.push(`G0 X${f3(x)} Z3.000`, `G1 X${f3(x)} Z${f3(zF)} F0.140`, `G1 X${f3(x - dRec(x))}`, `G0 X${f3(x - dRec(x))} Z3.000`);
  const inner = [[0, 19.2], [-0.2, 19], [-17, 19], [-17, 14.2], [-17.2, 14], [-25.8, 14], [-H, 14.12], [-H - 0.3, 14.3], [ZE + r, 14.3]];
  const pin = tipPath(extendStart(inner, 1.0), r, "left", [-r, r]), li = pin[pin.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, r, "0.150"),
         `G0 X${f3(D_INT - 3)} Z${f3(li[0] + 0.2)}`, `G0 X${f3(D_INT - 3)} Z5.000`, "");
  // ---- T6D6: parede reta atrás do colar (a T2D2 não corta face virada para trás), desce na parede, Ø42 e chanfro de trás
  //      (só ela passa atrás do colar); sai em G1 até acima do pré-acabamento (Ø44) antes do G0 ----
  L.push(...sec("OUTSIDE 2"), "G0 Z70", "T6D6", ";", ";", `G0 X${f3(tO + 4)} Z3.000`, `G0 Z-20.100`, `G1 X42.000 F0.080`, `G1 Z-25.800`, `G1 X41.600 Z${f3(-H)}`,
         `G1 X46.000`, `G0 X${f3(tO + 4)}`, "G0 Z3.000", "");
  // ---- corte com a faca T5D5 (PU só corta com a faca), aproxima 10 acima do maior Ø ----
  L.push(...sec("CUTTING"), "G0 Z70", "T5D5", ";", ";", `G0 X${f3(XF)} Z3.000`, `G0 X${f3(XF)} Z${f3(-H)}`, `G1 X${f3(D_INT - 1)} Z${f3(-H)} F0.220`,
         `G0 X${f3(XF)} Z${f3(-H)}`, `G0 X${f3(XF)} Z15.000`, "", "");
  const g92 = 15 + progMaxZ(L) + 0.15;   // como o PSE 120: 15 + Z mais fundo (−27) + 0,15
  L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
  const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
  const pit = L.join("\n"), mcs = fagorToMcs(pit);
  return { pit, mcs: typeof mcs === "string" ? mcs : JSON.stringify(mcs) };
};
// desenho: secção do STL pelo "Desenho do 3D", invertido (face do Ø43 = Z0 do programa à direita), material PU
window.des46498 = function(){
  const I = ITEM46498;
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "46498"); set("mat", "PU"); set("cod", "42871");   // cód. interno (usuário 26/11/2026)
  const p0 = rev3DParams("VEDADOR (28 X 46 X 26) 46498.stl", I.poly, I.H); p0.desc = "VEDADOR"; p0.mat = "PU";
  const q = rev3DFlip(p0); q.desc = "VEDADOR"; q.mat = "PU"; q.dint = I.D_INT; q.dext = I.D_EXT;
  // padrão aprovado (46310 / 46707 / 46399): Ø só no CORTE A-A (trás à esquerda, frente à direita); secção ampliada só com o
  // contorno, alturas em cota corrida, largura total e as secções — sem chanfros, raios nem ângulos
  const poly = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, rmax = Math.max(...poly.map(v => v[1])), rmin = Math.min(...poly.map(v => v[1]));
  q.corteD = [...new Set(poly.map(v => v[1]))];
  Object.defineProperty(q, "customNotes", { value: "VEDADOR Ø28 x Ø46 x 26 · desenho gerado do 3D (VEDADOR (28 X 46 X 26) 46498.stl) · chanfros 0,2 · cotas em mm", writable: true });
  const orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    g = g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g, "");
    const sc = 300 / (2 * rmax), cy = 238, ox2 = 540, sc2 = Math.min(sc, 180 / L), X2 = a => ox2 + (a - L / 2) * sc2, Y2 = r => cy - r * sc, f = v => fv3(v);
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 5, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const edge = (r, sd) => { const a = poly.filter(v => Math.abs(v[1] - r) < 1e-6).map(v => v[0]); return sd < 0 ? Math.min(...a) : Math.max(...a); };
    // esquerda = trás (Ø28, Ø42, Ø46); direita = frente / Z0 (Ø38, Ø43)
    for (const [sd, rs] of [[-1, [14, 21, 23]], [1, [19, 21.5]]]) rs.forEach((r, k) => { const xe = X2(edge(r, sd)), xx = sd < 0 ? X2(0) - 20 * (k + 1) : X2(L) + 24 * (k + 1);
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
    // externo (cota corrida em cima): Ø42 atrás, colar Ø46, Ø43 da frente
    const zt = [0, 5.9, 10.8, L], yd = yT - 20;
    zt.forEach(z => h += ext(X(z), Y(rTop(z)) - 4, X(z), yd - 6));
    for (let i = 1; i < zt.length; i++) h += dimH(X(zt[i - 1]), X(zt[i]), yd, f(zt[i] - zt[i - 1]));
    // interno (cota corrida embaixo): Ø28 atrás e rebaixo Ø38 da frente
    const zb = [0, 9, L], yb = yB + 28;
    zb.forEach(z => h += ext(X(z), Y(rBot(z)) + 4, X(z), yb + 6));
    for (let i = 1; i < zb.length; i++) h += dimH(X(zb[i - 1]), X(zb[i]), yb, f(zb[i] - zb[i - 1]), yb + 14);
    // secções: lábio da frente (Ø38 → Ø43) e total à direita; trás (Ø28 → Ø42) à esquerda
    const xl = X(L) + 30, xs = X(L) + 70, xb = X(0) - 30;
    h += ext(X(L) + 4, Y(21.5), xl + 6, Y(21.5)) + ext(X(L) + 4, Y(19), xl + 6, Y(19)) + dimV2(xl, Y(21.5), Y(19), f(21.5 - 19));
    h += ext(X(10.8) + 4, yT, xs + 6, yT) + ext(X(9) + 4, yB, xs + 6, yB) + dimV2(xs, yT, yB, f(rmax - rmin));
    h += ext(X(0) - 4, Y(21), xb - 6, Y(21)) + ext(X(0) - 4, Y(14), xb - 6, Y(14)) + dimV2(xb, Y(21), Y(14), f(21 - 14), -6);
    h += `<text x="${X(L / 2)}" y="${yB + 74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return h + tail; };
  return q;
};
