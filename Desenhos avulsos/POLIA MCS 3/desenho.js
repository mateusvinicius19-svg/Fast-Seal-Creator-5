// POLIA MCS 3 — desenho (sem programa) na folha Parts Seals do Simulador CNC.html (drawingSVG, tipoGen "custom").
// Usuário 26/11/2026: polia que já existe — abrir o furo para Ø19 +0,05/0 e fazer rasgo de chaveta de 6 mm.
// Geometria do STL do Inventor (W:\...\DESENHOS\MAQUINAS\POLIA MCS 3\POLIA MCS 3.stl), eixo Z de 0 a 45:
//   Ø60 de Z0 a Z33, cubo Ø40 de Z33 a Z45; rebaixo Ø25,8 x 12 na face Z0; furo Ø19 de Z12 a Z45;
//   rasgo de chaveta 6 de largura, fundo a 12,5 do centro (22 da parte de baixo do furo), de Z12 a Z45.
// Uso no navegador (página do Simulador): desPoliaMCS3() devolve o p do desenho; fixPoliaMCS3(svg) acerta os textos do carimbo.
window.desPoliaMCS3 = function(){
  const R1 = 30, R2 = 20, L1 = 33, L = 45, RR = 12.9, LR = 12, RF = 9.5, KW = 6, KT = 12.5, RK = Math.sqrt(RF * RF - (KW / 2) ** 2);
  const n = v => fmtN(v, Math.abs(v - Math.round(v)) < 1e-9 ? 0 : 1);
  const views = (p, PT) => {
    let g = "";
    const s = 5;
    const ln = (x1, y1, x2, y2, st) => `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" style="${st}"/>`;
    const VIS = "stroke:#111;stroke-width:1.6;fill:none", THIN = "stroke:#111;stroke-width:.8;fill:none", HID = "stroke:#111;stroke-width:.8;stroke-dasharray:5 3;fill:none",
          CEN = "stroke:#b2221f;stroke-width:.6;stroke-dasharray:14 3 2 3;fill:none";
    const arr = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
    const ext = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
    const dimH = (x1, x2, y, txt) => arr(x1, y, x2, y) + `<text x="${(x1 + x2) / 2}" y="${y - 5}" class="t" text-anchor="middle">${txt}</text>`;
    const dimV = (x, y1, y2, txt) => { const tx = x - 6, ty = (y1 + y2) / 2; return arr(x, y1, x, y2) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`; };
    const call = (x, y, tx, ty, txt, w) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="d" marker-start="url(#a)"/><line x1="${tx}" y1="${ty}" x2="${tx + w}" y2="${ty}" class="d"/>` +
      `<text x="${tx + 3}" y="${ty - 4}" class="t">${txt}</text>`;
    const tol = b => tolMk(b, "+0.05", "0");

    // ---------------- VISTA FRONTAL (pelo lado do cubo, Z45) ----------------
    const cx = 215, cy = 300, X = x => cx + x * s, Y = y => cy - y * s;
    g += `<circle cx="${cx}" cy="${cy}" r="${R1 * s}" style="${VIS}"/><circle cx="${cx}" cy="${cy}" r="${R2 * s}" style="${VIS}"/>`;
    g += `<circle cx="${cx}" cy="${cy}" r="${RR * s}" style="${HID}"/>`;                                   // rebaixo Ø25,8 do outro lado
    const a0 = Math.atan2(RK, KW / 2);
    g += `<path d="M${X(KW / 2)},${Y(RK)} A${RF * s},${RF * s} 0 1 1 ${X(-KW / 2)},${Y(RK)} L${X(-KW / 2)},${Y(KT)} L${X(KW / 2)},${Y(KT)} Z" style="${VIS}"/>`;
    g += ln(cx - (R1 + 6) * s, cy, cx + (R1 + 6) * s, cy, CEN) + ln(cx, cy - (R1 + 6) * s, cx, cy + (R1 + 6) * s, CEN);
    // corte A-A (vertical, pelo rasgo)
    g += `<path d="M${cx - 9},${Y(R1 + 9)} L${cx},${Y(R1 + 9)} L${cx},${Y(R1 + 3)}" style="${VIS}"/><text x="${cx - 18}" y="${Y(R1 + 9) + 4}" class="t">A</text>`;
    g += `<path d="M${cx - 9},${Y(-R1 - 9)} L${cx},${Y(-R1 - 9)} L${cx},${Y(-R1 - 3)}" style="${VIS}"/><text x="${cx - 18}" y="${Y(-R1 - 9) + 4}" class="t">A</text>`;
    // rasgo: largura 6 em cima e 22 (da parte de baixo do furo até o fundo do rasgo) à direita
    const yk = Y(R1) - 18;
    g += ext(X(-KW / 2), Y(KT) - 4, X(-KW / 2), yk - 6) + ext(X(KW / 2), Y(KT) - 4, X(KW / 2), yk - 6);
    g += arr(X(-KW / 2) - 30, yk, X(-KW / 2), yk).replace('marker-start="url(#a)" ', "") + arr(X(KW / 2), yk, X(KW / 2) + 30, yk).replace(' marker-end="url(#a)"', "");
    g += ln(X(-KW / 2), yk, X(KW / 2), yk, "stroke:#b2221f;stroke-width:.8") + `<text x="${X(KW / 2) + 34}" y="${yk + 4}" class="t">${n(KW)}</text>`;
    const xk = X(R1) + 26;
    g += ext(X(KW / 2) + 4, Y(KT), xk + 6, Y(KT)) + ext(X(0) + 4, Y(-RF), xk + 6, Y(-RF)) + dimV(xk, Y(KT), Y(-RF), n(KT + RF));
    g += call(X(-RF * Math.cos(Math.PI / 4)), Y(-RF * Math.sin(Math.PI / 4)), X(-R1) - 10, Y(-R1) + 4, tol(`Ø${n(2 * RF)}`), 84);
    g += `<text x="${cx}" y="${Y(-R1) + 62}" class="vt" text-anchor="middle">VISTA FRONTAL</text>`;

    // ---------------- CORTE A-A (pelo rasgo de chaveta) ----------------
    const z0 = 470, SX = z => z0 + z * s, SY = r => cy - r * s;
    const up = [[0, RR], [0, R1], [L1, R1], [L1, R2], [L, R2], [L, KT], [LR, KT], [LR, RR]];
    const dn = [[0, -RR], [0, -R1], [L1, -R1], [L1, -R2], [L, -R2], [L, -RF], [LR, -RF], [LR, -RR]];
    const path = P => P.map(([z, r], i) => `${i ? "L" : "M"}${SX(z).toFixed(2)},${SY(r).toFixed(2)}`).join("") + "Z";
    g += `<path d="${path(up)}" fill="url(#hatch)" style="stroke:#111;stroke-width:1.6"/><path d="${path(dn)}" fill="url(#hatch)" style="stroke:#111;stroke-width:1.6"/>`;
    g += ln(SX(LR), SY(RK), SX(L), SY(RK), THIN);                                                           // canto do rasgo com o furo (atrás do corte)
    g += ln(SX(0), SY(RR), SX(LR), SY(RR), THIN) + ln(SX(LR), SY(RK), SX(LR), SY(-RF), THIN) + ln(SX(LR), SY(-RF), SX(L), SY(-RF), THIN);
    g += ln(SX(-8), cy, SX(L + 8), cy, CEN);
    // comprimentos: 12 (rebaixo) e 45 embaixo; 33 em cima
    const yb1 = SY(-R1) + 26, yb2 = SY(-R1) + 54, yt = SY(R1) - 26;
    g += ext(SX(0), SY(-R1) + 4, SX(0), yb2 + 6) + ext(SX(LR), SY(-RR) + 4, SX(LR), yb1 + 6) + ext(SX(L), SY(-R2) + 4, SX(L), yb2 + 6);
    g += dimH(SX(0), SX(LR), yb1, n(LR)) + dimH(SX(0), SX(L), yb2, n(L));
    g += ext(SX(0), SY(R1) - 4, SX(0), yt - 6) + ext(SX(L1), SY(R1) - 4, SX(L1), yt - 6) + dimH(SX(0), SX(L1), yt, n(L1));
    // diâmetros: Ø60 e Ø25,8 à esquerda; Ø40 e Ø19 à direita
    const xl1 = SX(0) - 24, xl2 = SX(0) - 52, xr1 = SX(L) + 28, xr2 = SX(L) + 56;
    g += ext(SX(0) - 4, SY(R1), xl2 - 6, SY(R1)) + ext(SX(0) - 4, SY(-R1), xl2 - 6, SY(-R1)) + dimV(xl2, SY(R1), SY(-R1), `Ø${n(2 * R1)}`);
    g += ext(SX(0) - 4, SY(RR), xl1 - 6, SY(RR)) + ext(SX(0) - 4, SY(-RR), xl1 - 6, SY(-RR)) + dimV(xl1, SY(RR), SY(-RR), `Ø${n(2 * RR)}`);
    g += ext(SX(L) + 4, SY(R2), xr2 + 6, SY(R2)) + ext(SX(L) + 4, SY(-R2), xr2 + 6, SY(-R2)) + dimV(xr2 + 14, SY(R2), SY(-R2), `Ø${n(2 * R2)}`);
    const tx = xr1 + 8, ty = (SY(RK) + SY(-RF)) / 2;
    g += ext(SX(L) + 4, SY(-RF), xr1 + 6, SY(-RF)) + ext(SX(L) + 4, SY(RK), xr1 + 6, SY(RK)).replace(/y1="[^"]*"/, `y1="${SY(RF)}"`).replace(/y2="[^"]*"/, `y2="${SY(RF)}"`);
    g += arr(xr1, SY(RF), xr1, SY(-RF)) + `<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${tol(`Ø${n(2 * RF)}`)}</text>`;
    g += `<text x="${SX(L / 2)}" y="${SY(-R1) + 92}" class="vt" text-anchor="middle">CORTE A-A</text>`;
    return g;
  };
  return { tipoGen: "custom", desc: "POLIA MCS 3", mat: "", dint: 2 * RF, dext: 2 * R1, h: L, customProfile: [[0, RR], [-L, RF], [-L, R2], [0, R1]], customViews: views, customTools: [],
    customNotes: "POLIA EXISTENTE: abrir furo Ø19 +0,05/0 e rasgo de chaveta 6 mm (do rebaixo até a face do cubo) · demais medidas para conferência · cotas em mm" };
};
// material: o usuário não passou (a folha põe PU quando está vazio) — fica em branco até ele dizer
window.POLIA_MCS3_MAT = "";
window.fixPoliaMCS3 = svg => svg.replace(/(MATERIAL:<\/text><text[^>]*>)PU</, (m, a) => a + (window.POLIA_MCS3_MAT || "") + "<")
  .replace(/Ø interno 19\s*·\s*Ø externo 60\s*·\s*altura 45\s*·\s*secção 20,5/, "Abrir furo Ø19 +0,05/0 · rasgo de chaveta 6 mm").replace(/\s*·\s*secção 20,5/g, "");
