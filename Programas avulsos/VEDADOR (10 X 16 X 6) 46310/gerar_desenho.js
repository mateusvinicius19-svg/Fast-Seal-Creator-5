// node gerar_desenho.js "<stl>" "<saida sem extensao>"  -> desenho do VEDADOR 46310 (PU) em PDF/PNG
// Desenho do VEDADOR 46310: diâmetros só no corte A-A (em cima), secção ampliada sem Ø (usuário: "ficou muito poluído")
const path=require("path"),fs=require("fs");const {chromium}=require("playwright");
const [stl,out]=process.argv.slice(2);
(async()=>{const b=await chromium.launch(),pg=await b.newPage({viewport:{width:1500,height:900}});pg.on("pageerror",e=>console.log("ERR",e.message));
await pg.goto("file://"+path.resolve(__dirname,"..","..","Simulador CNC.html"));
await pg.setInputFiles("#file3D",stl);await pg.waitForTimeout(800);
const svg=await pg.evaluate(()=>{const p=state.genParams; p.desc="VEDADOR";
 const set=(k,v)=>{const e=document.querySelector(`#dwgFields input[data-d="${k}"]`); if(e) e.value=v;}; set("prog","46310"); set("mat","PU"); state.orient="portrait";
 const poly=p.customProfile.map(([z,r])=>[-z,r]), L=p.h, rmax=Math.max(...poly.map(q=>q[1]));
 p.corteD=[...new Set(poly.map(q=>q[1]))];                       // nenhum Ø na secção ampliada
 Object.defineProperty(p,"customNotes",{value:"VEDADOR Ø9,606 x Ø16,706 x 6 · desenho gerado do 3D (VEDADOR 10 X 16 X 6 46310.stl) · cotas em mm",writable:true});
 const orig=p.customViews;
 p.customViews=(pp,PT)=>{ let g=orig(pp,PT);
   // tira as cotas de Ø que o gerador pôs no corte (saem da folha)
   g=g.replace(/<line[^>]*class="e"\/><line[^>]*class="e"\/><line[^>]*class="d"[^>]*\/><text[^>]*rotate\(-90[^>]*>Ø[^<]*<\/text>/g,"");
   const sc=300/(2*rmax), cy=238, ox2=540, sc2=Math.min(sc,180/L), X2=a=>ox2+(a-L/2)*sc2, Y2=r=>cy-r*sc, f=v=>fv3(v);
   const arr=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="d" marker-start="url(#a)" marker-end="url(#a)"/>`;
   const ext=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="e"/>`;
   const dimV=(x,y1,y2,txt)=>{const tx=x-5,ty=(y1+y2)/2;return arr(x,y1,x,y2)+`<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`;};
   const edge=(r,side)=>{const a=poly.filter(q=>Math.abs(q[1]-r)<1e-6).map(q=>q[0]); return side<0?Math.min(...a):Math.max(...a);};
   // esquerda: face do lábio (Ø14,988) e canal de 0,9; direita: face do canal fundo e aresta Ø16,706
   const lados=[[-1,[5.094,5.594,6.494,7.044,7.494]],[1,[4.803,5.743,6.744,8.044,8.353]]];
   for(const [sd,rs] of lados) rs.forEach((r,k)=>{const xe=X2(edge(r,sd)), xx=sd<0?X2(0)-20*(k+1):X2(L)+24*(k+1);
     g+=ext(xe+sd*3,Y2(r),xx+sd*5,Y2(r))+ext(xe+sd*3,Y2(-r),xx+sd*5,Y2(-r))+dimV(xx,Y2(r),Y2(-r),"Ø "+f(2*r));});
   // secção ampliada: só o contorno + alturas dos rebaixos, profundidade dos canais das faces e a secção (sem raios/chanfros/ângulos)
   const iT=g.indexOf("SECÇÃO (ampliada)</text>"), head=g.slice(0,iT), tail=g.slice(iT+"SECÇÃO (ampliada)</text>".length);
   const prof=head.match(/<path d="[^"]*" class="p"\/>/)[0];
   const rmin=Math.min(...poly.map(q=>q[1])), Hh=rmax-rmin, bx0=170,bx1=600,by0=530,by1=715, s=Math.min((bx1-bx0)/L,(by1-by0)/Hh,60);
   const ox=(bx0+bx1)/2-L*s/2, oy=(by0+by1)/2+Hh*s/2, X=a=>ox+a*s, Y=r=>oy-(r-rmin)*s, yT=Y(rmax), yB=Y(rmin);
   const dimH=(x1,x2,y,txt,ty)=>arr(x1,y,x2,y)+`<text x="${(x1+x2)/2}" y="${ty??y-5}" class="t" text-anchor="middle">${txt}</text>`;
   const dimV2=(x,y1,y2,txt)=>{const tx=x+16,ty=(y1+y2)/2;return arr(x,y1,x,y2)+`<text x="${tx}" y="${ty}" class="t" text-anchor="middle" transform="rotate(-90 ${tx} ${ty})">${txt}</text>`;};
   const rAt=(a,top)=>{const v=poly.filter(q=>Math.abs(q[0]-a)<1e-6).map(q=>q[1]); return top?Math.max(...v):Math.min(...v);};
   let h=prof;
   // largura total
   h+=ext(X(0),Y(rAt(0,1))-4,X(0),yT-52)+ext(X(L),Y(rAt(L,1))-4,X(L),yT-52)+dimH(X(0),X(L),yT-46,f(L));
   // alturas dos rebaixos do externo (cota corrida em cima): lábio, canal, degrau Ø16,088, até a face
   const zt=[0,0.8,2.3,4.5,L], yd=yT-20;
   zt.forEach(z=>{const r=Math.max(...poly.filter(q=>Math.abs(q[0]-z)<0.051).map(q=>q[1])); h+=ext(X(z),Y(r)-4,X(z),yd-6);});
   for(let i=1;i<zt.length;i++) h+=dimH(X(zt[i-1]),X(zt[i]),yd,f(zt[i]-zt[i-1]));
   // alturas do interno (cota corrida embaixo): lábio + rampa, rebaixo Ø10,188, rampa + lábio
   const zb=[0,1.5,4.5,L], yb=yB+28;
   zb.forEach(z=>{const r=Math.min(...poly.filter(q=>Math.abs(q[0]-z)<0.051).map(q=>q[1])); h+=ext(X(z),Y(r)+4,X(z),yb+6);});
   for(let i=1;i<zb.length;i++) h+=dimH(X(zb[i-1]),X(zb[i]),yb,f(zb[i]-zb[i-1]),yb+14);
   // profundidade dos canais das faces (a partir da face)
   const gl=[0.9,6.044], gr=[L-1.4,6.321];
   h+=arr(X(0),Y(gl[1]),X(gl[0]),Y(gl[1]))+ext(X(0)-40,Y(gl[1]),X(0),Y(gl[1]))+`<text x="${X(0)-8}" y="${Y(gl[1])-4}" class="t" text-anchor="end">${f(0.9)}</text>`;
   h+=arr(X(gr[0]),Y(gr[1]),X(L),Y(gr[1]))+ext(X(L),Y(gr[1]),X(L)+40,Y(gr[1]))+`<text x="${X(L)+8}" y="${Y(gr[1])-4}" class="t" text-anchor="start">${f(1.4)}</text>`;
   // secção (Ø ext − Ø int)/2
   const xs=X(L)+70; h+=ext(X(5.4)+4,yT,xs+6,yT)+ext(X(L)+4,yB,xs+6,yB)+dimV2(xs,yT,yB,"Secção "+f(rmax-rmin));
   h+=`<text x="${X(L/2)}" y="${yB+74}" class="vt" text-anchor="middle">SECÇÃO (ampliada)</text>`;
   return h+tail; };
 return drawingSVG(p);});
const html=`<html><head><style>@page{size:A4;margin:0}body{margin:0}svg{width:210mm;height:297mm;display:block}</style></head><body>${svg}</body></html>`;
const p2=await b.newPage();await p2.setContent(html);await p2.pdf({path:out+".pdf",format:"A4",printBackground:true});
await p2.setViewportSize({width:794,height:1123});await p2.screenshot({path:out+".png",fullPage:true});
await p2.setViewportSize({width:1588,height:2246});await p2.screenshot({path:out+"_top.png",clip:{x:600,y:100,width:988,height:750}});
await b.close();})();
