// Teste de todos os perfis do Simulador CNC (rodar antes de todo merge na main):
//   node testes/testar-perfis.js                    -> gera programa + desenho de cada perfil com os valores padrão
//   node testes/testar-perfis.js --salvar base.json -> também grava os programas (para comparar antes/depois)
//   node testes/testar-perfis.js --comparar base.json -> diz quais perfis mudaram de programa
//   --html outro.html -> testa outro arquivo
// Falha (código 1) se algum perfil não aparecer na janela "Escolha o perfil" ou não gerar: "Preencha", erro, faixa vermelha ou programa vazio.
// Usa o Playwright/Chromium já instalado na sessão da nuvem.
const path = require("path"), fs = require("fs");
const { chromium } = require("playwright");
const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
(async () => {
  const html = path.resolve(arg("--html") || path.join(__dirname, "..", "Simulador CNC.html"));
  const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 1500, height: 900 } });
  const errs = []; pg.on("pageerror", e => errs.push(e.message));
  await pg.goto("file://" + html);
  const tipos = await pg.evaluate(() => [...document.querySelectorAll("#genType option")].map(o => o.value));
  const res = {}, falhas = [];
  // todo perfil do menu tem que estar na janela "Escolha o perfil" (o menu de lista fica escondido)
  const semImagem = await pg.evaluate(() => { const g = new Set(PROF_GROUPS.flatMap(x => x[1])); return [...document.querySelectorAll("#genType option")].map(o => o.value).filter(v => !g.has(v)); });
  for (const t of semImagem) { console.log(`FALHOU  ${t.padEnd(8)} não aparece na janela "Escolha o perfil" (falta em PROF_GROUPS)`); falhas.push(t); }
  for (const t of tipos) {
    errs.length = 0;
    const r = await pg.evaluate((t) => {
      const sel = document.getElementById("genType"); sel.value = t; sel.dispatchEvent(new Event("change"));
      state.src = ""; const gm = document.getElementById("genMsg"); gm.textContent = "";
      try { generate(true); } catch (e) { return { erro: String(e && e.message || e) }; }
      const ban = document.getElementById("errBanner");
      let des = "";
      try { if (typeof DESENHO_TYPES !== "undefined" && DESENHO_TYPES.includes(t) && document.getElementById("btnDraw").offsetParent) { document.getElementById("btnDraw").click(); } } catch (e) { des = String(e && e.message || e); }
      const ban2 = document.getElementById("errBanner");
      return { msg: gm.textContent, faixa: ban ? ban.textContent : "", faixaDes: ban2 && ban2 !== ban ? ban2.textContent : "", des, prog: state.src || "" };
    }, t);
    await pg.keyboard.press("Escape").catch(() => {});
    await pg.evaluate(() => { document.querySelectorAll(".modal,#printView,#dwgView").forEach(x => x.remove && x.style && (x.style.display = "none")); }).catch(() => {});
    const linhas = r.prog ? r.prog.split("\n").length : 0;
    const vermelho = /^⚠ Erro/.test(r.faixa || "") || /^⚠ Erro/.test(r.faixaDes || "");
    const ruim = r.erro || /Preencha|ERRO/.test(r.msg || "") || /Falta preencher/.test(r.faixa || "") || vermelho || r.des || errs.length || !linhas;
    res[t] = r.prog;
    const txt = `${t.padEnd(8)} ${String(linhas).padStart(4)} linhas  ${(r.erro || r.des || errs.join("; ") || r.msg || "").slice(0, 110)}`;
    console.log((ruim ? "FALHOU  " : "ok      ") + txt);
    if (ruim) falhas.push(t);
  }
  const salvar = arg("--salvar"), comparar = arg("--comparar");
  if (salvar) fs.writeFileSync(salvar, JSON.stringify(res, null, 1));
  if (comparar) {
    const base = JSON.parse(fs.readFileSync(comparar, "utf8")), limpa = s => String(s || "").replace(/;DATE OF FILE:.*$/m, "");
    const mud = tipos.filter(t => limpa(base[t]) !== limpa(res[t]));
    console.log(mud.length ? "PROGRAMA MUDOU: " + mud.join(", ") : "Nenhum programa mudou em relação à base.");
  }
  await b.close();
  console.log(falhas.length ? `\n${falhas.length} perfil(is) com problema: ${falhas.join(", ")}` : `\nTodos os ${tipos.length} perfis geraram programa.`);
  process.exit(falhas.length ? 1 : 0);
})();
