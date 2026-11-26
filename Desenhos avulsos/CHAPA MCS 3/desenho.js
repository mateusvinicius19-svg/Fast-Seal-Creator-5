// CHAPA MCS 3 — desenho (sem programa) na folha Parts Seals do Simulador CNC.html (drawingSVG, tipoGen "custom").
// Geometria tirada do STL do Inventor (W:\...\DESENHOS\MAQUINAS\CHAPA MCS 3\CHAPA MCS 3.stl), origem no centro do furo Ø95:
//   contorno: x −62,6 a 89,4 (152), y −95 a 95 (190), canto de cima à direita cortado de (52,4; 95) a (89,4; −10); espessura 15
//   furo central Ø95 passante; 4 furos a 45° em Ø130 — no STL Ø9, usuário 26/11/2026: rosca M8 (passante), centro no furo Ø95.
// Uso no navegador (página do Simulador): desChapaMCS3() devolve o p do desenho; fixChapaMCS3(svg) acerta os textos do carimbo.
window.desChapaMCS3 = function(){
  const W0 = -62.6, W1 = 89.4, H0 = -95, H1 = 95, XD = 52.4, YD = -10, T = 15, RC = 47.5, PCD = 130, M = 8, MD = 6.8;
  const n = v => fmtN(v, Math.abs(v - Math.round(v)) < 1e-9 ? 0 : 1);
  const views = (p, PT) => {
    let g = "";
    const s = 3, ox = 125 - W0 * s, oy = 95 + H1 * s, X = x => ox + x * s, Y = y => oy - y * s;
    const ln = (x1, y1, x2, y2, st) => `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" style="${st}"/>`;
    const VIS = "stroke:#111;stroke-width:1.6;fill:none", THIN = "stroke:#111;stroke-width:.7;fill:none", HID = "stroke:#111;stroke-width:.8;stroke-dasharray:5 3;fill:none",
          CEN = "stroke:#b2221f;stroke-width:.6;stroke-dasharray:14 3 2 3;fill:none";
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimH = (x1, x2, y, txt) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 6, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const call = (x, y, tx, ty, txt, end, w) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="d" marker-start="url(#a)"/><line x1="${tx}" y1="${ty}" x2="${tx + (end ? -1 : 1) * (w ?? txt.length * 7.6 + 6)}" y2="${ty}" class="d"/>` +
      `<text x="${tx + (end ? -3 : 3)}" y="${ty - 4}" class="t" text-anchor="${end ? "end" : "start"}">${txt}</text>`;

    // ---------------- VISTA FRONTAL ----------------
    const out = [[W0, H0], [W1, H0], [W1, YD], [XD, H1], [W0, H1]];
    g += `<path d="${out.map(([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(2)},${Y(y).toFixed(2)}`).join("")}Z" style="${VIS}"/>`;
    g += `<circle cx="${X(0)}" cy="${Y(0)}" r="${RC * s}" style="${VIS}"/>`;
    // linhas de centro, círculo de furação Ø130 e os 4 furos M8 (rosca: Ø6,8 grosso + 3/4 do Ø8 fino)
    g += ln(X(0) - (RC + 10) * s, Y(0), X(0) + (RC + 10) * s, Y(0), CEN) + ln(X(0), Y(0) - (RC + 10) * s, X(0), Y(0) + (RC + 10) * s, CEN);
    g += `<circle cx="${X(0)}" cy="${Y(0)}" r="${PCD / 2 * s}" style="${CEN}"/>`;
    const holes = [45, 135, 225, 315].map(a => [PCD / 2 * Math.cos(a * Math.PI / 180), PCD / 2 * Math.sin(a * Math.PI / 180), a]);
    for (const [hx, hy, a] of holes){
      const cx = X(hx), cy = Y(hy), rM = M / 2 * s, u = [Math.cos(a * Math.PI / 180), -Math.sin(a * Math.PI / 180)];
      g += `<circle cx="${cx}" cy="${cy}" r="${MD / 2 * s}" style="${VIS}"/>`;
      g += `<path d="M${cx + rM},${cy} A${rM},${rM} 0 1 1 ${cx},${cy - rM}" style="${THIN}"/>`;   // 3/4 do Ø nominal
      g += ln(cx - u[0] * 9 * s / 1, cy - u[1] * 9 * s / 1, cx + u[0] * 9 * s, cy + u[1] * 9 * s, CEN) + ln(cx + u[1] * 6 * s, cy - u[0] * 6 * s, cx - u[1] * 6 * s, cy + u[0] * 6 * s, CEN);
    }
    // cotas do contorno
    const yb1 = Y(H0) + 26, yb2 = Y(H0) + 54;
    g += ext(X(W0), Y(H0) + 4, X(W0), yb2 + 6) + ext(X(0), Y(0) + RC * s + 4, X(0), yb1 + 6) + ext(X(W1), Y(H0) + 4, X(W1), yb2 + 6);
    g += dimH(X(W0), X(0), yb1, n(-W0)) + dimH(X(W0), X(W1), yb2, n(W1 - W0));
    const xl1 = X(W0) - 26, xl2 = X(W0) - 54;
    g += ext(X(W0) - 4, Y(H0), xl2 - 6, Y(H0)) + ext(X(0) - RC * s - 4, Y(0), xl1 - 6, Y(0)) + ext(X(W0) - 4, Y(H1), xl2 - 6, Y(H1));
    g += dimV(xl1, Y(H0), Y(0), n(-H0)) + dimV(xl2, Y(H0), Y(H1), n(H1 - H0));
    const yt = Y(H1) - 26;
    g += ext(X(XD), Y(H1) - 4, X(XD), yt - 6) + ext(X(W0), Y(H1) - 4, X(W0), yt - 6) + dimH(X(W0), X(XD), yt, n(XD - W0));
    const xr = X(W1) + 26;
    g += ext(X(W1) + 4, Y(YD), xr + 6, Y(YD)) + ext(X(W1) + 4, Y(H0), xr + 6, Y(H0)) + dimV(xr, Y(H0), Y(YD), n(YD - H0));
    // furo central, círculo de furação, furos M8 e ângulo de 45°
    g += call(X(-RC * Math.SQRT1_2), Y(-RC * Math.SQRT1_2), X(-RC * Math.SQRT1_2) + 52, Y(-RC * Math.SQRT1_2) - 60, tolMk(`Ø${n(2 * RC)}`, "+0.05", "0") + `<tspan dx="30">PASSANTE</tspan>`, false, 160);   // tolerância do usuário 26/11/2026
    g += call(X(PCD / 2 * Math.cos(200 * Math.PI / 180)), Y(PCD / 2 * Math.sin(200 * Math.PI / 180)), X(W0) + 30, Y(-60), tolMk(`Ø${n(PCD)}`, "+0.05", "0"), false, 70);   // tolerância do usuário 26/11/2026
    g += call(X(holes[0][0]) + 3, Y(holes[0][1]) - 3, X(holes[0][0]) + 34, Y(holes[0][1]) - 44, `4x M${n(M)} PASSANTE`);
    const ra = 40 * s, a45 = Math.PI / 4;
    g += `<path d="M${X(0) + ra},${Y(0)} A${ra},${ra} 0 0 0 ${X(0) + ra * Math.cos(a45)},${Y(0) - ra * Math.sin(a45)}" class="d" marker-start="url(#a)" marker-end="url(#a)" fill="none"/>`;
    g += ln(X(0), Y(0), X(holes[0][0]), Y(holes[0][1]), CEN);
    g += `<text x="${X(0) + (ra + 10) * Math.cos(a45 / 2)}" y="${Y(0) - (ra + 10) * Math.sin(a45 / 2)}" class="t">45°</text>`;
    g += `<text x="${X((W0 + W1) / 2)}" y="${yb2 + 40}" class="vt" text-anchor="middle">VISTA FRONTAL</text>`;

    // ---------------- VISTA LATERAL (pelo lado direito) ----------------
    const lx0 = X(W1) + 95, LX = z => lx0 + z * s;
    g += `<rect x="${LX(0)}" y="${Y(H1)}" width="${T * s}" height="${(H1 - H0) * s}" style="${VIS}"/>`;
    g += ln(LX(0), Y(YD), LX(T), Y(YD), VIS);                                          // aresta da face inclinada
    g += ln(LX(0), Y(RC), LX(T), Y(RC), HID) + ln(LX(0), Y(-RC), LX(T), Y(-RC), HID);  // furo Ø95
    g += ln(LX(0) - 12, Y(0), LX(T) + 12, Y(0), CEN);
    const yT = Y(H1) - 26;
    g += ext(LX(0), Y(H1) - 4, LX(0), yT - 6) + ext(LX(T), Y(H1) - 4, LX(T), yT - 6) + dimH(LX(0), LX(T), yT, n(T));
    g += `<text x="${LX(T / 2)}" y="${yb2 + 40}" class="vt" text-anchor="middle">VISTA LATERAL</text>`;
    return g;
  };
  return { tipoGen: "custom", desc: "CHAPA MCS 3", mat: "", dint: 2 * RC, dext: 190, h: T, customProfile: [[0, RC], [-T, RC], [-T, 95], [0, 95]], customViews: views, customTools: [],
    customNotes: "CHAPA MCS 3 · desenho gerado do 3D (CHAPA MCS 3.stl) · 4 furos com rosca M8 passante, a 45°, em Ø130 (+0,05/0) com centro no furo Ø95 (+0,05/0) · cotas em mm" };
};
// material: o usuário não passou (a folha põe PU quando está vazio) — fica em branco até ele dizer
window.CHAPA_MCS3_MAT = "";
window.fixChapaMCS3 = svg => svg.replace(/(MATERIAL:<\/text><text[^>]*>)PU</, (m, a) => a + (window.CHAPA_MCS3_MAT || "") + "<").replace(/Ø95 x Ø190 x 15/g, "152 x 190 x 15").replace(/\s*·\s*secção 47,5/g, "")
  .replace(/Ø interno 95\s*·\s*Ø externo 190\s*·\s*altura 15/, "Chapa 152 x 190 x 15 · furo Ø95 +0,05/0 · 4x M8 em Ø130 +0,05/0");
