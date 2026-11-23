// node "Programas avulsos/VEDADOR (33 X 50.8 X 24) 46399/gerar.js" [pasta de saída]
// -> 046399.PIT (Fagor), 46399.txt (MCS 500) e "VEDADOR (33 X 50.8 X 24) 46399.pdf", pelas funções do Simulador CNC.html + item.js.
// (23/11/2026 foi gerado pelo Simulador no navegador com este mesmo item.js — o PC não tem Node.)
const path = require("path"), fs = require("fs"); const { chromium } = require("playwright");
const OUT = process.argv[2] || __dirname;
(async () => {
  const b = await chromium.launch(), pg = await b.newPage(); pg.on("pageerror", e => console.log("ERR", e.message));
  await pg.goto("file://" + path.resolve(__dirname, "..", "..", "Simulador CNC.html"));
  await pg.addScriptTag({ content: fs.readFileSync(path.join(__dirname, "item.js"), "utf8") });
  const res = await pg.evaluate(async () => { const r = prog46399(); state.orient = "portrait"; r.pdf = Array.from(await drawingPdfBytes(des46399())); return r; });
  fs.mkdirSync(OUT, { recursive: true });
  const w = (n, s) => fs.writeFileSync(path.join(OUT, n), s.replace(/\r?\n/g, "\r\n"), "latin1");
  w("046399.PIT", res.pit + "\n"); w("46399.txt", res.mcs);
  fs.writeFileSync(path.join(OUT, "VEDADOR (33 X 50.8 X 24) 46399.pdf"), Buffer.from(res.pdf));
  console.log(res.pit); await b.close();
})();
