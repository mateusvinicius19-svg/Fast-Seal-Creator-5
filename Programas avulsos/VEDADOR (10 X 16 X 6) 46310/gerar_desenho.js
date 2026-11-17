// node gerar_desenho.js "<stl>" "<saida sem extensao>"  -> desenho do 3D (programa 46310, PU) em PDF/PNG
const path=require("path"),fs=require("fs");const {chromium}=require("playwright");
const [stl,out,flip]=process.argv.slice(2);
(async()=>{const b=await chromium.launch(),pg=await b.newPage({viewport:{width:1500,height:900}});pg.on("pageerror",e=>console.log("ERR",e.message));
await pg.goto("file://"+path.resolve(__dirname, "..", "..", "Simulador CNC.html"));
await pg.setInputFiles("#file3D",stl);await pg.waitForTimeout(800);
const svg=await pg.evaluate((flip)=>{let p=state.genParams; if(flip==="1"){p=rev3DFlip(p);state.genParams=p;}
 p.desc="VEDADOR"; const set=(k,v)=>{const e=document.querySelector(`#dwgFields input[data-d="${k}"]`); if(e) e.value=v;};
 set("prog","46310"); set("mat","PU"); state.orient="portrait"; return drawingSVG(p);},flip||"0");
const html=`<html><head><style>@page{size:A4;margin:0}body{margin:0}svg{width:210mm;height:297mm;display:block}</style></head><body>${svg}</body></html>`;
const p2=await b.newPage();await p2.setContent(html);await p2.pdf({path:out+".pdf",format:"A4",printBackground:true});
await p2.setViewportSize({width:794,height:1123});await p2.screenshot({path:out+".png",fullPage:true});
await p2.setViewportSize({width:1588,height:2246});await p2.screenshot({path:out+"_big.png",clip:{x:0,y:500,width:1588,height:800}});
await b.close();})();
