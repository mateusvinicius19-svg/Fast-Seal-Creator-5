// Gera 046310 (OP1) e 046310 OP2 (Fagor .PIT + MCS 500 .txt) para o VEDADOR 10 X 16 X 6, secção tirada do STL do Inventor.
// Rodar: node "Programas avulsos/VEDADOR (10 X 16 X 6) 46310/gerar_programa.js"  (usa as funções do Simulador CNC.html)
const path = require("path"), fs = require("fs"); const { chromium } = require("playwright");
const OUT = process.argv[2] || __dirname;
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); pg.on("pageerror", e => console.log("ERR", e.message));
  await pg.goto("file://" + path.resolve(__dirname, "..", "..", "Simulador CNC.html"));
  const res = await pg.evaluate(() => {
    const f3 = v => fx(v, 3), now = new Date(), pad = n => String(n).padStart(2, "0");
    const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} @ ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const sec = name => [";( *********************** )", ";( " + name.padEnd(24, " ").slice(0, 24) + ")", ";( *********************** )"];
    const D_INT = 9.606, D_EXT = 16.706, H = 6, SOB = 0.5, ZC = -(H + SOB);   // OP1 corta com 0,5 de sobremetal na face de trás (OP2 faceia)
    const tO = 20, rE = 0.4, rI = 0.2;                                              // tarugo Ø20 (PU); T2D2 R0,4; T4D14 barra R0,2
    const S = rpmLookup(Math.max(D_EXT, tO), RPM_TABLE);
    // ---------------- OP1 ----------------
    const L = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR 10 X 16 X 6 - OP1 (FRENTE, EXTERNO, INTERNO, CORTE C/ 0.5 DE SOBREMETAL)",
      `;MATERIAL: USER DEFINED PU 0.000/${f3(tO)} - TUBE 0.000/${f3(tO)}`, `;DATE OF FILE: ${date}`, ";INTERVALO    MM", "G90 ", "G95 ", "G54", `G97S${gen15(S)}M3`, "N10", "", ""];
    // face (T3D3) até o centro (tarugo)
    L.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(tO + 4)} Z0.690`, `G1 X${f3(tO + 4)} Z0.000 F0.500`, ";( FINISH )", `G1 X${f3(tO + 4)} Z0.000`, `G1 X-4.000 Z0.000 F0.150`, `G0 X-4.000 Z0.690`, "");
    // canal da face da frente: ferramenta de forma 0,9 R0,45 — só entra e volta (como o FRONT GROOVE do PSE 107)
    L.push(...sec("FRONT GROOVE"), "G0 Z70", "T4D92; (FORMA CANAL FRONTAL 0.9 R0.45 - CONFIRMAR T/D)", ";", ";",
      "G0 X12.088 Z3", "G1 Z0.300 F0.500", "G1 Z-0.900 F0.050", "G0 Z3", "");
    // externo (T2D2): lábio da frente, passa reto por cima do canal externo (feito depois com o bedame), degrau, rampa, aresta Ø16,706 e chanfro 45° de trás até o corte
    const outer = [[0, 7.403], [-0.1, 7.494], [-0.7, 7.494], [-0.8, 7.403], [-0.965, 7.253], [-2.3, 7.253], [-2.3, 7.853], [-2.5, 8.044], [-4.5, 8.044], [-5.4, 8.353], [-6, 7.753],
                   [ZC - 0.75, 7.753 - (SOB + 0.75)], [ZC - 1.25, 7.753 - (SOB + 0.75)]];
    const pout = tipPath(extendStart(outer, 1.0), rE, "right", [-rE, -rE]);
    L.push(...sec("OUTSIDE"), "G0 Z70", "T2D2", ";", ";", ...roughPasses(pout, tO, "od", "0.160", NaN, 1, rE, null),
      ";( FINISH )", `G0 X${f3(2 * pout[0].p[1])} Z3.000`, `G1 X${f3(2 * pout[0].p[1])} Z${f3(pout[0].p[0])}`, ...tipLines(pout, rE, "0.130"));
    const lo = pout[pout.length - 1].p;
    L.push(`G0 X${f3(tO + 1)} Z${f3(lo[0] + 0.2)}`, `G0 X${f3(tO + 1)} Z5.000`, "");
    // canal externo embaixo do lábio (Ø14,088, Z −0,8 a −2,3) com o bedame de 1 mm (referência = lado da frente da lâmina)
    L.push(...sec("OUTSIDE GROOVE"), "G0 Z70", "T8D8", ";", ";", `G0 X${f3(tO + 1)} Z3`, "G0 Z-1.300",
      "G1 X14.088 F0.050", "G0 X16.200", "G0 Z-0.800", "G1 X14.088 F0.050", "G1 Z-1.300", "G0 X16.200", "G0 Z3", "");
    // interno (T4D14): lábio Ø9,606, rampa 12,5° até Ø10,188 (rebaixo), volta ao Ø9,606 e segue reto até passar o corte
    const inner = [[0, 4.803], [-0.25, 4.803], [-1.5, 5.094], [-4.5, 5.094], [-5.8, 4.803], [ZC - 1.25, 4.803]];
    const pin = tipPath(extendStart(inner, 1.0), rI, "left", [-rI, rI]);
    L.push(...sec("INSIDE"), "G0 Z70", "T4D14", ";", ";");
    { // tarugo: passes retos (1º Ø int − 1,5), regra do pseFscBuild
      const xmin = Math.min(...pin.map(q => 2 * q.p[1])), tgt = Math.round((xmin - 2) * 2) / 2, zc = Math.floor(pin[pin.length - 1].p[0] * 10) / 10;
      let x = Math.min(13, Math.floor((D_INT - 1.5) * 2) / 2), first = true;
      for (let gq = 0; gq < 20; gq++){ const xp = Math.min(x, tgt);
        L.push(`G0 X${gen15(xp)} Z3`, `G1 Z${gen15(zc)}` + (first ? " F0.150" : ""), `G1 X${gen15(xp - 0.5)}`, "G0 Z3"); first = false;
        if (xp >= tgt) break; x = xp + (tgt - xp) / Math.ceil((tgt - xp) / 8 - 1e-9); }
    }
    L.push(";( FINISH )", `G0 X${f3(2 * pin[0].p[1])} Z3.000`, `G1 X${f3(2 * pin[0].p[1])} Z${f3(pin[0].p[0])}`, ...tipLines(pin, rI, "0.120"));
    const li = pin[pin.length - 1].p;
    L.push(`G0 X${f3(D_INT - 1.5)} Z${f3(li[0] + 0.2)}`, `G0 X${f3(D_INT - 1.5)} Z5.000`, "");
    // corte (T5D5) em Z −6,5
    const xc = tO + 0.2, xe = D_INT - 1.2;
    L.push(...sec("CUTTING"), "G0 Z70", "T5D5", ";", ";", `G0 X${f3(xc)} Z3.000`, `G0 X${f3(xc)} Z${f3(ZC)}`, `G1 X${f3(xe)} Z${f3(ZC)} F0.220`,
      `G0 X${f3(xc)} Z${f3(ZC)}`, `G0 X${f3(xc)} Z15.000`, "", "");
    const g92 = 15 + progMaxZ(L) + 0.15;
    L.push(`G92 Z${f3(g92)}`, "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30");
    // ---------------- OP2 (peça virada: Z0 = face de trás acabada; entra com 0,5 de sobremetal) ----------------
    const M = [`%VEDADOR ${f3(D_INT)}/${f3(D_EXT)}/${f3(H)},MX,`, ";VEDADOR 10 X 16 X 6 - OP2 (PECA VIRADA: FACE DE TRAS NA ALTURA 6 + CANAL DE TRAS)",
      ";PECA PRESA PELO EXTERNO; Z0 = FACE DE TRAS ACABADA (ENTRA COM 0.5 DE SOBREMETAL)", `;DATE OF FILE: ${date}`, "G90 ", "G95 ", "G54", `G97S${gen15(rpmLookup(D_EXT, RPM_TABLE))}M3`, "N10", "", ""];
    M.push(...sec("FACING DOWNWARD"), "G0 Z100", "T3D3", `G0 X${f3(D_EXT + 2)} Z0.690`, `G1 X${f3(D_EXT + 2)} Z0.000 F0.500`, ";( FINISH )",
      `G1 X${f3(D_INT - 1)} Z0.000 F0.120`, `G0 X${f3(D_INT - 1)} Z0.690`, "");
    // chanfro interno da face de trás (0,2 do 3D) com a T4D14
    const inner2 = [[0, 4.994], [-0.2, 4.803], [-0.6, 4.803]];
    const pin2 = tipPath(extendStart(inner2, 0.5), rI, "left", [-rI, rI]);
    M.push(...sec("INSIDE"), "G0 Z70", "T4D14", ";", ";", `G0 X${f3(2 * pin2[0].p[1])} Z3.000`, `G1 X${f3(2 * pin2[0].p[1])} Z${f3(pin2[0].p[0])} F0.500`, ...tipLines(pin2, rI, "0.100"),
      `G1 X${f3(D_INT - 1)} Z${f3(pin2[pin2.length - 1].p[0])}`, `G0 X${f3(D_INT - 1)} Z5.000`, "");
    // canal da face de trás: ferramenta de forma R0,4 (flancos 11,6°), centro Ø12,646, fundo Z −1,4
    M.push(...sec("BACK GROOVE"), "G0 Z70", "T4D93; (FORMA CANAL TRAS 1.24 R0.4 - CONFIRMAR T/D)", ";", ";", "G0 X12.646 Z3", "G1 Z0.300 F0.500", "G1 Z-1.400 F0.050", "G0 Z3", "", "G0 Z100", "G00 X250 Z250", "M05", "M30");
    const dd = A => A.filter((l, i) => !(l.startsWith("G1 ") && i > 0 && A[i - 1].slice(3).startsWith(l.slice(3)))); L.splice(0, L.length, ...dd(L));
    return { op1: L.join("\n"), op2: M.join("\n"), mcs1: fagorToMcs(L.join("\n")), mcs2: fagorToMcs(M.slice(0, -4).concat(["G92 Z15.000", "N20 G00 Z100", "(RPT N10,N20)N0", "G54", "G00 X250 Z250", "M05", "M30"]).join("\n")) };
  });
  fs.mkdirSync(OUT, { recursive: true });
  const w = (n, s) => fs.writeFileSync(path.join(OUT, n), s.replace(/\r?\n/g, "\r\n"), "latin1");
  w("046310.PIT", res.op1); w("046310 OP2.PIT", res.op2);
  w("46310.txt", typeof res.mcs1 === "string" ? res.mcs1 : JSON.stringify(res.mcs1)); w("46310 OP2.txt", res.mcs2.replace(/:CYC CALL 4 *\r?\n\t[^\n]*\r?\n/, ""));
  console.log(res.op1); console.log("=========="); console.log(res.op2);
  await b.close();
})();
