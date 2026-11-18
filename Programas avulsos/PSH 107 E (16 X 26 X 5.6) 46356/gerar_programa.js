// Gera 046356 (Fagor .PIT + MCS 500 .txt) para o PSH 107 E (16 X 26 X 5.6), secção tirada do STL do Inventor.
// Rodar: node "Programas avulsos/PSH 107 E (16 X 26 X 5.6) 46356/gerar_programa.js"  (usa as funções do Simulador CNC.html)
// (18/11/2026 foi gerado pelo Simulador aberto em http://localhost:8765 com esta mesma função — o PC não tem Node.)
const path = require("path"), fs = require("fs"); const { chromium } = require("playwright");
const OUT = process.argv[2] || __dirname;
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); pg.on("pageerror", e => console.log("ERR", e.message));
  await pg.goto("file://" + path.resolve(__dirname, "..", "..", "Simulador CNC.html"));
  const res = await pg.evaluate(() => {
    const f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
    const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
    const D_INT = 16, D_EXT = 26, H = 5.6, tI = 12, tO = 35, r = 0.4;     // UHMW (= PEAD), bucha 12 x 35
    const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE);
    // perfil do STL (Z0 = face do canal): [z, raio]; depois do chanfro de trás segue 0,5 além do corte, como o PSH 107 do Simulador
    const kI = 0.1445 / 0.25;                                          // chanfro interno de trás 0,25 x 0,14 (2,8° … 30°)
    const outer = [[0, 13.1], [-0.2, 13.3], [-5.35, 13.0], [-5.6, 12.75], [-6.1, 12.25]];
    const inner = [[0, 8.05], [-0.2, 7.85], [-5.35, 8.1], [-5.6, 8.2445], [-6.1, 8.2445 + 0.5 * kI]];
    const L = [`%PSH107 ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";PSH 107 E (16 X 26 X 5.6) - CANAL FRONTAL RETO 2.9 X 3.2 (BEDAME T1D86) - SECCAO DO STL",
      `;MATERIAL: USER DEFINED UHMW ${f3(tI)}/${f3(tO)} - TUBE ${f3(tI)}/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
    // ---- faceamento (T3D3) ----
    const xf0 = tO + 4, xf1 = tI - 4;
    L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(xf0)} Z0.690`, `G1 X${f3(xf0)} Z0.000`, ";( FINISH )", `G1 X${f3(xf0)} Z0.000`, `G1 X${f3(xf1)} Z0.000 F0.150`, `G0 X${f3(xf1)} Z0.690`);
    // ---- canal frontal: bedame 2,9 (T1D86) entra direto na medida — centro Ø20,8 (entre Ø17,9 e Ø23,7), fundo Z -3,2 ----
    L.push("", ...sec("FRONT GROOVE"), "G0 Z70", "T1D86; (BEDAME FRONTAL 2.9)", ";", ";", "G0 X20.800 Z3", "G1 Z0.300 F0.500", "G1 Z-3.200 F0.050", "G0 Z3", "");
    // ---- interno (T2D14, PEAD) ----
    L.push(...sec("INSIDE"), "G0 Z70", "T2D14", ";", ";");
    const pin = tipPath(extendStart(inner, 1.0), r, "left", [-r, r]);
    L.push(...roughPasses(pin, tI, "id", "0.140", 0, 0, r));
    L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, r, "0.120"));
    const li = pin[pin.length - 1].p;
    L.push(`G0 X${f3(D_INT - 2)} Z${f3(li[0] + 0.2)}`, `G0 X${f3(D_INT - 2)} Z5.000`, "");
    // ---- externo (T7D7, PEAD: sem G41/G42, raio 0,4 compensado nas coordenadas) ----
    L.push(...sec("OUTSIDE"), "G0 Z70", "T7D7", ";", ";");
    const pout = tipPath(extendStart(outer, 1.0), r, "right", [-r, -r]);
    const rOut = roughPasses(pout, tO, "od", "0.160", 0, 0, r);
    L.push(...rOut, ";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])}`, ...tipLines(pout, r, "0.130"));
    const lo = pout[pout.length - 1].p;
    L.push(`G0 X${f3(tO + 1)} Z${f3(lo[0] + 0.2)}`, `G0 X${f3(tO + 1)} Z5.000`, "");
    // ---- corte (T8D8, bedame 1 mm) ----
    const xc = tO + 0.2;
    L.push(...sec("CUTTING"), "G0 Z70", "T8D8", ";", ";", `G0 X${f3(xc)} Z3.000`, `G0 X${f3(xc)} Z${f3(-H)}`, `G1 X${f3(D_INT - 0.1)} Z${f3(-H)} F0.100`,
      `G0 X${f3(xc)} Z${f3(-H)}`, `G0 X${f3(xc)} Z15.000`, "", "");
    const g92 = 15 + progMaxZ(rOut.extraZ && rOut.extraZ.length ? L.filter(l => !rOut.extraZ.some(z => l.includes(z))) : L) + 0.15;
    L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
    const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
    const pit = L.join("\n"), mcs = fagorToMcs(pit);
    return { pit, mcs: typeof mcs === "string" ? mcs : JSON.stringify(mcs) };
  });
  fs.mkdirSync(OUT, { recursive: true });
  const w = (n, s) => fs.writeFileSync(path.join(OUT, n), s.replace(/\r?\n/g, "\r\n"), "latin1");
  w("046356.PIT", res.pit); w("46356.txt", res.mcs);
  console.log(res.pit);
  await b.close();
})();
