// VEDADOR (33 X 50.8 X 24) 46399 — PEAD, bucha 31 x 62, 1 operação (usuário 23/11/2026: frente = lado do Ø50,8).
// Secção tirada do STL do Inventor (W:\...\DESENHOS\VEDADOR\VEDADOR (33 X 50.8 X 24) 46399\), Z0 = face do Ø50,8:
//   externo: chanfro 1 x 45° (Ø48,8 → Ø50,8), Ø50,8 até Z −7, degrau reto até Ø48, Ø48 até Z −16, cone até Ø40 em Z −23
//            (≈ 29,7° com o eixo), chanfro 1 x 45° até Ø38 em Z −24
//   interno: rebaixo Ø47 x 4 de profundidade na frente, Ø33 até o fim
// Roda dentro do Simulador CNC.html (usa tipPath, roughPasses, fagorToMcs, rev3DParams...): prog46399() e des46399().
window.ITEM46399 = {
  // contorno fechado [a, raio], a = 0 na face do Ø50,8 (frente da usinagem)
  poly: [[0, 24.4], [1, 25.4], [7, 25.4], [7, 24], [16, 24], [23, 20], [24, 19], [24, 16.5], [4, 16.5], [4, 23.5], [0, 23.5]],
  D_INT: 33, D_EXT: 50.8, H: 24, tI: 31, tO: 62, r: 0.4
};
window.prog46399 = function(){
  const I = ITEM46399, f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
  const { D_INT, D_EXT, H, tI, tO, r } = I, BED = 1, ZE = -(H + BED), ZO = ZE;             // bedame 1 mm, referência = lado da frente da lâmina
  const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE), XF = tO + FACA_MIN;              // bedame aproxima/recua 10 acima do maior Ø (bucha)
  const L = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR (33 X 50.8 X 24) - FRENTE = FACE DO D50.8 / REBAIXO D47 X 4 - SECCAO DO STL",
    `;MATERIAL: USER DEFINED PEAD ${f3(tI)}/${f3(tO)} - TUBE ${f3(tI)}/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
  // ---- faceamento (T3D3) ----
  const xf0 = tO + 4, xf1 = tI - 4;
  L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(xf0)} Z0.690`, `G1 X${f3(xf0)} Z0.000`, ";( FINISH )", `G1 X${f3(xf1)} Z0.000 F0.150`, `G0 X${f3(xf1)} Z0.690`, "");
  // ---- interno (T4D4, PEAD Ø33 ≥ 15): passe reto Ø32,6 até passar o corte, rebaixo Ø47 x 4 em passes de 2 no raio, acabamento ----
  L.push(...sec("INSIDE"), "G0 Z70", "T4D4", ";", ";");
  const zR = -4 + 0.2, xs = [D_INT - 0.4];
  for (let x = D_INT - 0.4 + 4; x < 47 - 0.4 - 1e-9; x += 4) xs.push(x);
  xs.forEach((x, i) => L.push(`G0 X${f3(x)} Z3.000`, `G1 X${f3(x)} Z${f3(i ? zR : ZO)} F0.140`, `G1 X${f3(x - 1)}`, `G0 X${f3(x - 1)} Z3.000`));
  const pin = tipPath(extendStart([[0, 23.5], [-4, 23.5], [-4, 16.5], [ZO, 16.5]], 1.0), r, "left", [-r, r]);
  L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, r, "0.120"));
  const li = pin[pin.length - 1].p;
  L.push(`G0 X${f3(D_INT - 2)} Z${f3(li[0] + 0.2)}`, `G0 X${f3(D_INT - 2)} Z5.000`, "");
  // ---- externo (T7D7, PEAD: sem G41/G42, raio 0,4 compensado nas coordenadas): chanfro 1 x 45° e Ø50,8 até passar o corte ----
  L.push(...sec("OUTSIDE"), "G0 Z70", "T7D7", ";", ";");
  const pout = tipPath(extendStart([[0, 24.4], [-1, 25.4], [ZO, 25.4]], 1.0), r, "right", [-r, -r]);
  const rOut = roughPasses(pout, tO, "od", "0.160", 0, 0.2, r);
  L.push(...rOut, ";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])}`, ...tipLines(pout, r, "0.130"));
  const lo = pout[pout.length - 1].p;
  L.push(`G0 X${f3(tO + 1)} Z${f3(lo[0] + 0.2)}`, `G0 X${f3(tO + 1)} Z5.000`, "");
  // ---- degrau Ø48, cone e chanfro de trás com o bedame (T8D8, 1 mm): mergulhos de 0,8 em Z deixando 0,2 no raio e 0,1 na parede,
  //      depois o acabamento pelo canto da frente da lâmina, emendando no corte ----
  const rp = z => z >= -16 ? 24 : z >= -23 ? 24 - (-16 - z) * 4 / 7 : 20 - (-23 - z);   // raio do perfil no Z (cai para trás)
  const xa = D_EXT + 2, zs = [];
  for (let z = -7.1; z - BED > -H + 1e-9; z -= 0.8) zs.push(z);
  zs.push(-H + BED);
  L.push(...sec("OUTSIDE GROOVE"), "G0 Z70", "T8D8", ";", ";", `G0 X${f3(XF)} Z3.000`, `G0 X${f3(XF)} Z${f3(zs[0])}`);
  for (const z of zs) L.push(`G0 X${f3(xa)} Z${f3(z)}`, `G1 X${f3(2 * (rp(z) + 0.2))} F0.050`, `G0 X${f3(xa)}`);
  L.push(";( FINISH )", `G0 X${f3(xa)} Z-7.000`, "G1 X48.000 F0.050", "G1 Z-16.000 F0.080", "G1 X40.000 Z-23.000", `G1 X38.000 Z${f3(-H)}`,
    ";( CUTTING )", `G1 X${f3(D_INT - 0.1)} Z${f3(-H)} F0.100`, `G0 X${f3(XF)} Z${f3(-H)}`, `G0 X${f3(XF)} Z15.000`, "", "");
  const g92 = 15 + progMaxZ(L) + 0.15;
  L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
  const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
  const pit = L.join("\n"), mcs = fagorToMcs(pit);
  return { pit, mcs: typeof mcs === "string" ? mcs : JSON.stringify(mcs) };
};
// desenho: secção do STL pelo "Desenho do 3D", invertido (face do Ø50,8 = Z0 do programa à direita), material PEAD
window.des46399 = function(){
  const I = ITEM46399;
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "46399"); set("mat", "PEAD");
  const p0 = rev3DParams("VEDADOR (33 X 50.8 X 24) 46399.stl", I.poly, I.H); p0.desc = "VEDADOR"; p0.mat = "PEAD";
  const q = rev3DFlip(p0); q.desc = "VEDADOR"; q.mat = "PEAD"; q.dint = I.D_INT; q.dext = I.D_EXT;
  // padrão aprovado (46310 / 46707): Ø só no CORTE A-A (trás à esquerda, frente à direita); secção ampliada só com o contorno,
  // alturas em cota corrida, largura total, secção do lábio da frente e secção total — sem chanfros, raios nem ângulos
  const poly = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, rmax = Math.max(...poly.map(v => v[1])), rmin = Math.min(...poly.map(v => v[1]));
  q.corteD = [...new Set(poly.map(v => v[1]))];
  Object.defineProperty(q, "customNotes", { value: "VEDADOR Ø33 x Ø50,8 x 24 · desenho gerado do 3D (VEDADOR (33 X 50.8 X 24) 46399.stl) · cotas em mm", writable: true });
  const orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    g = g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g, "");
    const sc = 300 / (2 * rmax), cy = 238, ox2 = 540, sc2 = Math.min(sc, 180 / L), X2 = a => ox2 + (a - L / 2) * sc2, Y2 = r => cy - r * sc, f = v => fv3(v);
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 5, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const edge = (r, sd) => { const a = poly.filter(v => Math.abs(v[1] - r) < 1e-6).map(v => v[0]); return sd < 0 ? Math.min(...a) : Math.max(...a); };
    // esquerda = trás (Ø33, Ø38, Ø40, Ø48); direita = frente / Z0 (Ø47, Ø48,8, Ø50,8)
    for (const [sd, rs] of [[-1, [16.5, 19, 20, 24]], [1, [23.5, 24.4, 25.4]]]) rs.forEach((r, k) => { const xe = X2(edge(r, sd)), xx = sd < 0 ? X2(0) - 20 * (k + 1) : X2(L) + 24 * (k + 1);
      g += ext(xe + sd * 3, Y2(r), xx + sd * 5, Y2(r)) + ext(xe + sd * 3, Y2(-r), xx + sd * 5, Y2(-r)) + dimV(xx, Y2(r), Y2(-r), "Ø " + f(2 * r)); });
    const T = "SECÇÃO (ampliada)</text>", iT = g.indexOf(T), head = g.slice(0, iT), tail = g.slice(iT + T.length);
    const prof = head.match(/<path d="[^"]*" class="p"\/>/)[0];
    const Hh = rmax - rmin, bx0 = 170, bx1 = 600, by0 = 530, by1 = 715, s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60);
    const ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2, X = a => ox + a * s, Y = r => oy - (r - rmin) * s, yT = Y(rmax), yB = Y(rmin);
    const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV2 = (x, y1, y2, txt) => { const tx = x + 16, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const rTop = z => Math.max(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1])), rBot = z => Math.min(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1]));
    let h = prof;
    h += ext(X(0), Y(rTop(0)) - 4, X(0), yT - 52) + ext(X(L), Y(rTop(L)) - 4, X(L), yT - 52) + dimH(X(0), X(L), yT - 46, f(L));
    // externo (cota corrida em cima): chanfro de trás, cone, Ø48, Ø50,8, chanfro da frente
    const zt = [0, 1, 8, 17, 23, L], yd = yT - 20;
    zt.forEach(z => h += ext(X(z), Y(rTop(z)) - 4, X(z), yd - 6));
    for (let i = 1; i < zt.length; i++) h += dimH(X(zt[i - 1]), X(zt[i]), yd, f(zt[i] - zt[i - 1]));
    // interno (cota corrida embaixo): Ø33 e rebaixo Ø47 da frente
    const zb = [0, 20, L], yb = yB + 28;
    zb.forEach(z => h += ext(X(z), Y(rBot(z)) + 4, X(z), yb + 6));
    for (let i = 1; i < zb.length; i++) h += dimH(X(zb[i - 1]), X(zb[i]), yb, f(zb[i] - zb[i - 1]), yb + 14);
    // secção do lábio da frente (Ø47 → Ø50,8) e secção total
    const xl = X(L) + 30, xs = X(L) + 70;
    h += ext(X(L) + 4, Y(23.5), xl + 6, Y(23.5)) + dimV2(xl, yT, Y(23.5), f(25.4 - 23.5));
    h += ext(X(L) + 4, yT, xs + 6, yT) + ext(X(0) + 4, yB, xs + 6, yB) + dimV2(xs, yT, yB, f(rmax - rmin));
    h += `<text x="${X(L / 2)}" y="${yB + 74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return h + tail; };
  return q;
};
