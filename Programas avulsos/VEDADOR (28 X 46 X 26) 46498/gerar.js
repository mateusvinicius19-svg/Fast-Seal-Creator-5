// node "Programas avulsos/VEDADOR (28 X 46 X 26) 46498/gerar.js" [pasta de saída]
// -> 046498.PIT (Fagor), 46498.txt (MCS 500) e "VEDADOR (28 X 46 X 26) 46498.pdf", pelas funções do Simulador CNC.html + item.js.
// (26/11/2026 foi gerado pelo Simulador no navegador com este mesmo item.js — o PC não tem Node.)
const path = require("path"), fs = require("fs"); const { chromium } = require("playwright");
const OUT = process.argv[2] || __dirname;
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); pg.on("pageerror", e => console.log("ERR", e.message));
  await pg.goto("file://" + path.resolve(__dirname, "..", "..", "Simulador CNC.html"));
  await pg.addScriptTag({ content: fs.readFileSync(path.join(__dirname, "item.js"), "utf8") });
  const res = await pg.evaluate(async () => { const r = prog46498(); state.orient = "portrait"; r.pdf = Array.from(await drawingPdfBytes(des46498())); return r; });
  fs.mkdirSync(OUT, { recursive: true });
  const w = (n, s) => fs.writeFileSync(path.join(OUT, n), s.replace(/\r?\n/g, "\r\n"), "latin1");
  w("046498.PIT", res.pit + "\n"); w("46498.txt", res.mcs);
  fs.writeFileSync(path.join(OUT, "VEDADOR (28 X 46 X 26) 46498.pdf"), Buffer.from(res.pdf));
  console.log(res.pit); await b.close();
})();
