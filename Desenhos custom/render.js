// node "Desenhos custom/render.js" "<arquivo do desenho>.js"  -> gera .pdf e .png ao lado
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const js = path.resolve(process.argv[2]), base = js.replace(/\.js$/, '');
  const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 1200, height: 1400 } });
  await pg.goto('file://' + path.resolve(__dirname, '..', 'Simulador CNC.html'));
  await pg.addScriptTag({ content: fs.readFileSync(js, 'utf8') });
  const svg = await pg.evaluate(() => { state.orient = 'portrait'; return drawingSVG(state.genParams); });
  const html = `<html><head><style>@page{size:A4;margin:0}body{margin:0}svg{width:210mm;height:297mm;display:block}</style></head><body>${svg}</body></html>`;
  const p2 = await b.newPage(); await p2.setContent(html);
  await p2.pdf({ path: base + '.pdf', format: 'A4', printBackground: true });
  await p2.setViewportSize({ width: 794, height: 1123 }); await p2.screenshot({ path: base + '.png', fullPage: true });
  await b.close();
})();
