// VEDADOR (9.7 X 16 X 5.5) 46499 — PEAD, tarugo Ø20 (usuário 26/11/2026), 1 operação, cód. interno 46501.
// Secção tirada do STL do Inventor (W:\...\DESENHOS\VEDADOR\VEDADOR (9.7 X 16 X 5.5) 46499\), Z0 = face do Ø13,5
// (do outro lado o Ø16 ficaria na frente do canal e a parede do canal viraria para trás):
//   externo: chanfro 0,2, Ø13,5 até Z −1, desce a 45° e entra no canal (raio 0,884, centro Z −2,116 / Ø13,768, fundo Ø12),
//            que termina na parede reta em Z −3; parede até Ø15,6, chanfro 0,2, Ø16 até Z −5,3, chanfro 0,2
//   interno: chanfro 0,2 x 45° na frente, Ø9,7 até Z −5,3, chanfro 0,2 x 30° atrás
// Roda dentro do Simulador CNC.html (usa tipPath, roughPasses, fagorToMcs, rev3DParams...): prog46499() e des46499().
(function(){
  const ac = 2.116, rc = 6.884, R = 0.884, arc = [];   // canal: de 225° (fim da reta a 45°) a 360° (parede em Z −3), de 15 em 15°
  for (let t = 240; t < 360; t += 15) arc.push([+(ac + R * Math.cos(t * Math.PI / 180)).toFixed(4), +(rc + R * Math.sin(t * Math.PI / 180)).toFixed(4)]);
  window.ITEM46499 = {
    // contorno fechado [a, raio], a = 0 na face do Ø13,5 (frente da usinagem)
    poly: [[0, 6.55], [0.2, 6.75], [1, 6.75], [1.491, 6.259], ...arc, [3, 6.884], [3, 7.8], [3.2, 8], [5.3, 8], [5.5, 7.8],
           [5.5, 4.965], [5.3, 4.85], [0.2, 4.85], [0, 5.05]],
    arc, D_INT: 9.7, D_EXT: 16, H: 5.5, tI: 0, tO: 20, r: 0.4
  };
})();
window.prog46499 = function(){
  const I = ITEM46499, f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
  const { D_INT, D_EXT, H, tI, tO, r } = I, BED = 1, SOB = 1, ZE = -(H + BED);              // bedame 1 mm (referência = lado da frente da lâmina)
  const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE), XF = Math.max(tO, D_EXT) + FACA_MIN;   // bedame aproxima/recua 10 acima do maior Ø (tarugo)
  const L = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR (9.7 X 16 X 5.5) - FRENTE = FACE DO D13.5 / CANAL R0.88 - SECCAO DO STL",
    `;MATERIAL: USER DEFINED PEAD ${f3(tI)}/${f3(tO)} - TUBE ${f3(tI)}/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
  // ---- faceamento (T3D3), tarugo: até o centro ----
  L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(tO + 4)} Z0.690`, `G1 X${f3(tO + 4)} Z0.000`, ";( FINISH )", `G1 X-4.000 Z0.000 F0.150`, `G0 X-4.000 Z0.690`, "");
  // ---- externo (T7D7, PEAD: sem G41/G42, raio 0,4 compensado nas coordenadas): passada de contorno (acabamento + 1 no Ø) até
  //      Z −6,5 (face de trás + bedame) e acabamento até o fim do chanfro de trás; o canal desce a 45° e sobe até a parede ----
  const outer = [[0, 6.55], [-0.2, 6.75], [-1, 6.75], [-1.491, 6.259], ...I.arc.map(([a, q]) => [-a, q]), [-3, 6.884], [-3, 7.8], [-3.2, 8], [-5.3, 8], [-H, 7.8]];
  // pré-acabamento sem passar no mesmo lugar do acabamento (regra do usuário no 46498, 26/11/2026): no canal fica reto no Ø da
  // ponta da reta a 45° e sobe 0,5 antes da parede (Z −2,5); o acabamento faz o raio do canal e a parede em Z −3
  const outerR = [[0, 6.55], [-0.2, 6.75], [-1, 6.75], [-1.491, 6.259], [-2.5, 6.259], [-2.5, 7.8], [-2.7, 8], [ZE + r, 8]];
  L.push(...sec("OUTSIDE"), "G0 Z70", "T7D7", ";", ";");
  L.push(...roughPasses(tipPath(extendStart(outerR, 1.0), r, "right", [-r, -r]), tO, "od", "0.160", 4, SOB / 2, r));
  const pout = tipPath(extendStart(outer, 1.0), r, "right", [-r, -r]), lo = pout[pout.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])}`, ...tipLines(pout, r, "0.130"),
         `G1 X${f3(2 * lo[1] + 1.5)}`, `G0 X${f3(D_EXT + 2)} Z${f3(lo[0] + 0.2)}`, `G0 X${f3(tO + 1)} Z5.000`, "");
  // ---- interno (T2D14 = D14, PEAD Ø < 14), tarugo: passe reto Ø8 (Ø int − 1,5) até Z −6,5, recuo 1 no Ø, acabamento ----
  L.push(...sec("INSIDE"), "G0 Z70", "T2D14", ";", ";", `G0 X8.000 Z3.000`, `G1 X8.000 Z${f3(ZE)} F0.140`, `G1 X7.000`, `G0 X7.000 Z3.000`);
  const inner = [[0, 5.05], [-0.2, 4.85], [-5.3, 4.85], [-H - 0.4, 5.195], [ZE + r, 5.195]];   // chanfro de 30° segue até Z −5,9 (sem canto no meio) e reto até Z −6,5
  const pin = tipPath(extendStart(inner, 1.0), r, "left", [-r, r]), li = pin[pin.length - 1].p;
  L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, r, "0.120"),
         `G1 X${f3(2 * li[1] - 1)}`, `G0 X${f3(2 * li[1] - 1)} Z5.000`, "");
  // ---- corte com o bedame T8D8 (1 mm) em Z −5,5; até Z −6,5 o desbaste já tirou o tarugo até o Ø17 ----
  L.push(...sec("CUTTING"), "G0 Z70", "T8D8", ";", ";", `G0 X${f3(XF)} Z3.000`, `G0 X${f3(XF)} Z${f3(-H)}`, `G0 X${f3(D_EXT + 2)} Z${f3(-H)}`,
         `G1 X${f3(D_INT - 0.1)} Z${f3(-H)} F0.100`, `G0 X${f3(XF)} Z${f3(-H)}`, `G0 X${f3(XF)} Z15.000`, "", "");
  const g92 = 15 + Math.max(progMaxZ(L), H + BED + 0.4) + 0.15;   // avanço = altura + bedame + 0,55 de face (como o 46399)
  L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
  const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
  const pit = L.join("\n"), mcs = fagorToMcs(pit);
  return { pit, mcs: typeof mcs === "string" ? mcs : JSON.stringify(mcs) };
};
// desenho: secção do STL pelo "Desenho do 3D", invertido (face do Ø13,5 = Z0 do programa à direita), material PEAD
window.des46499 = function(){
  const I = ITEM46499;
  const set = (k, v) => { const e = document.querySelector(`#dwgFields input[data-d="${k}"]`); if (e) e.value = v; }; set("prog", "46499"); set("mat", "PEAD"); set("cod", "46501");
  const p0 = rev3DParams("VEDADOR (9.7 X 16 X 5.5) 46499.stl", I.poly, I.H); p0.desc = "VEDADOR"; p0.mat = "PEAD";
  const q = rev3DFlip(p0); q.desc = "VEDADOR"; q.mat = "PEAD"; q.dint = I.D_INT; q.dext = I.D_EXT;
  // padrão aprovado (46310 / 46707 / 46399 / 46498): Ø só no CORTE A-A (trás à esquerda, frente à direita); secção ampliada só
  // com o contorno, alturas em cota corrida, largura total e as secções — sem chanfros, raios nem ângulos
  const poly = q.customProfile.map(([z, r]) => [-z, r]), L = q.h, rmax = Math.max(...poly.map(v => v[1])), rmin = Math.min(...poly.map(v => v[1]));
  q.corteD = [...new Set(poly.map(v => v[1]))];
  Object.defineProperty(q, "customNotes", { value: "VEDADOR Ø9,7 x Ø16 x 5,5 · desenho gerado do 3D (VEDADOR (9.7 X 16 X 5.5) 46499.stl) · canal R0,9 · chanfros 0,2 · cotas em mm", writable: true });
  const orig = q.customViews;
  q.customViews = (pp, PT) => { let g = orig(pp, PT);
    g = g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g, "");
    const sc = 300 / (2 * rmax), cy = 238, ox2 = 540, sc2 = Math.min(sc, 180 / L), X2 = a => ox2 + (a - L / 2) * sc2, Y2 = r => cy - r * sc, f = v => fv3(v);
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 5, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    // esquerda = trás (Ø9,7, Ø16); direita = frente / Z0 (Ø12 fundo do canal, Ø13,5); a = posição da linha de chamada
    for (const [sd, list] of [[-1, [[4.85, 0.2], [8, 0.2]]], [1, [[6, L - 2.116], [6.75, L - 0.2]]]]) list.forEach(([r, a], k) => { const xe = X2(a), xx = sd < 0 ? X2(0) - 20 * (k + 1) : X2(L) + 24 * (k + 1);
      g += ext(xe + sd * 3, Y2(r), xx + sd * 5, Y2(r)) + ext(xe + sd * 3, Y2(-r), xx + sd * 5, Y2(-r)) + dimV(xx, Y2(r), Y2(-r), "Ø " + f(2 * r)); });
    const T = "SECÇÃO (ampliada)</text>", iT = g.indexOf(T), head = g.slice(0, iT), tail = g.slice(iT + T.length);
    const prof = head.match(/<path d="[^"]*" class="p"\/>/)[0];
    const Hh = rmax - rmin, bx0 = 170, bx1 = 600, by0 = 530, by1 = 715, s = Math.min((bx1 - bx0) / L, (by1 - by0) / Hh, 60);
    const ox = (bx0 + bx1) / 2 - L * s / 2, oy = (by0 + by1) / 2 + Hh * s / 2, X = a => ox + a * s, Y = r => oy - (r - rmin) * s, yT = Y(rmax), yB = Y(rmin);
    const dimH = (x1, x2, y, txt, ty) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${ty ?? y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV2 = (x, y1, y2, txt, dx = 16) => { const tx = x + dx, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const rTop = z => Math.max(...poly.filter(v => Math.abs(v[0] - z) < 0.051).map(v => v[1]));
    let h = prof;
    h += ext(X(0), Y(rTop(0)) - 4, X(0), yT - 52) + ext(X(L), Y(rTop(L)) - 4, X(L), yT - 52) + dimH(X(0), X(L), yT - 46, f(L));
    // externo (cota corrida em cima): Ø16 atrás, canal (da parede ao fim do lábio), lábio Ø13,5 da frente
    const zt = [0, 2.5, 4.5, L], yd = yT - 20;
    zt.forEach(z => h += ext(X(z), Y(rTop(z)) - 4, X(z), yd - 6));
    for (let i = 1; i < zt.length; i++) h += dimH(X(zt[i - 1]), X(zt[i]), yd, f(zt[i] - zt[i - 1]));
    // secções: lábio da frente (Ø9,7 → Ø13,5) e total à direita; fundo do canal (Ø9,7 → Ø12) embaixo do canal
    const xl = X(L) + 30, xs = X(L) + 70, xg = X(L - 2.116);
    h += ext(X(L) + 4, Y(6.75), xl + 6, Y(6.75)) + dimV2(xl, Y(6.75), yB, f(6.75 - 4.85));
    h += ext(X(2.5) + 4, yT, xs + 6, yT) + ext(X(L) + 4, yB, xs + 6, yB) + dimV2(xs, yT, yB, f(rmax - rmin));
    h += dimV2(xg, Y(6), yB, f(6 - 4.85), -6);
    h += `<text x="${X(L / 2)}" y="${yB + 54}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
    return h + tail; };
  return q;
};
