---
name: machining-rules-tools
description: "Shop machining rules given by the user — tarugo internal roughing, 30° internal heel chamfer, tool sets per material, D17/D51 special tools"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 45259005-745e-4a9f-9607-abc02f83bcc7
  modified: 2026-11-06T12:24:07.587Z
---

- 07/11/2026: PSR 102 (psr102Build) did NOT have the tarugo rule (user caught it: "já fizemos isso em outros modelos") — now added, same code as pseFscBuild. Any NEW generator must include it. 046069 regenerated.
- Tarugo (bucha Ø int. 0): internal roughing = straight passes, 1st at Ø13 (or Ø int − 1.5 if smaller), then +8 in Ø up to ~3.5 below finish min X, each to cut-end Z, retract X−0.5 (as in user's manual 046010). FSC never generated these; people added by hand.
- Internal heel chamfer must be 30° to the axis (tools T1D45 / T4D4 cut max 35° on the back); same radial size, Z length = chc/tan30.
- TEFLON (PTFE / Teflon puro), user 2026-11-06: facing T3D3, external T7D7, internal T4D4, cutting T8D8 (cut F0.100; G92 = 15 + |cut Z| + 1.25, as in real PSR102 PTFE programs 020537/020765/021029). DONE in Simulador 06/11 (isTeflon/fscTools in pseFscBuild + psr102Build): material field "TEFLON..." or "PTFE"/"PTFE PURO" switches tools (PTFE+BR and others keep PU tools — ask user if those need other tools). gerar.ps1 copies dwg.mat into p.mat. Verified: Teflon output = hand-fixed 046048; PU output unchanged (046025, 046048 PU). Backup of the previous Simulador in Rotina\backup. The PC HP desktop working copy is now OLDER than the W: file.
- 07/11/2026 (user): PTFE+BR uses the SAME tools as PTFE puro. Simulador: isTeflon accepts "PTFE+BR"; arruela material list has "PTFE+BR" (matA PTFEBR); gerar.ps1 maps dwg.mat → matA for arruelas. PTFE/PTFE+BR bucha must be typed (from the molding OP / Infos. Ordem Prensagem).
- Materials: PU/POM → T7D7/T4D4/T8D8 (or T5D5); Nylon/PAD → same tools without compensation (no G41/G42); Celeron → T2D54/T2D64/T6D16. PSG 101 (guia) in Celeron/POM is made 0.9 larger in Ø to be saw-cut open.
- T7D17 = D7 ground without back (external, plunges V grooves); T1D51 = D12 ground without back (internal).
- RULE: never enter the piece/stock in G0 — any move below Z0 (or into a region that may still have material, even through the bore) must be G1 with feed; G0 only in air (Z>0) or for retracts along already-cleared paths.
- RULE: always machine front to back (cut moving −Z); never cut moving +Z. Back plunges: go in through the bore at min Ø, G1 up in X at the angle-line Z, then cut −Z to the finish end.
- RULE for every piece: roughing Z must reach at least the finish end Z (including plunge/"cavando" passes entering from the back).
- Retracts: never G0 back along a diameter just machined — retract ≥2 above the pass max Ø (OD) / ≥1 below the pass min Ø (ID) before G0 Z. Internal tool T1D51 (and D45) works at min Ø21. Groove plunging ("cavando"): only 2 passes, 1 rough + 1 finish. Facing with T3D3. Roughing max 8 in Ø per pass, finish 2; <5 to remove → single pass. Internal tool by Ø int: <11 T4D14, 11–40 T1D45, >40 T2D12.
- MCS 500 save target is the real folder Programas_CNC\MCS 500 (the "MCS 500 - Atalho" .lnk points to it); Explorer sorted by date desc hides folders at the bottom.

**Why:** user corrections on 2026-11-06 while testing the Simulador. **How to apply:** keep these in the Simulador generators and any hand-written program. See [[cnc-program-release-process]], [[feedback-fsc-derived-rules]].
- 09/11/2026 PSR 102 (psr102Build): com bucha grande, passes externos acima do Ø do calcanhar vão até o fim da peça (Z do contorno), não só até a face do calcanhar (sobrava anel; ex. 189,2x202,8x4,9x9,5 bucha 173x219).
- 09/11/2026 (usuário): sobremetal externo > 10 no Ø (bucha ext − Ø ext) → passes externos ACIMA do Ø ext. vão 1 mm a mais em Z. G92 não conta esse 1 mm. Feito no PSR 102 e no Alterar programa (passes externos extras).
- 09/11/2026 Alterar programa (altRough): passes externos extras em escada da bucha nova até o 1º passe do programa (máx. 8 no Ø); acima do contorno vão até o fundo, abaixo só até o Z do 1º passe (lábio). Ex. 046065 bucha 219: 213 (Z−11,6), 207 (Z−4,37), 201 original.
- 09/11/2026 altRough: só G0 acompanham a bucha fora do FACING (046062: desbaste externo começa em X207=bucha antiga, Z+0,796 — G1 não pode ser deslocado).
- 09/11/2026 (usuário): regra do +1 mm em Z (sobremetal ext. > 10 no Ø) vale para TODOS os perfis, só em PU (isPU/deepAbove): PSE/PSH 105/106/107/117, PSR 211 (roughPasses 'above'), PSR 102 e Alterar programa. Teflon não. G92 não muda.
- 09/11/2026 (usuário): desenho das gaxetas (PSE/PSH 105/106/107/117, PSR 211 corpo) — tolerância da ALTURA no máximo 0/−0,4 (antes = secção, até −0,5). Secção continua pela tabela.
- 09/11/2026 (usuário): DH PSH 129 ganhou campo Material (matA, mesma lista/ferramentas das arruelas via applyArrMat; linha ;MATERIAL). Fora do PU a bucha tem que ser digitada (ATENÇÃO se vazia).
- 09/11/2026 (usuário): desenho PSH (106/105/117/107): cota de secção à direita = lábio ext → lábio int (extAp − intAp)/2 ±tol, igual ao PSE (ex. 54,50→44,00 = 5,25 = soma das 3 cotas), não mais calcanhar até ponta do lábio.
- 13/11/2026 (usuário): PSH 129 (DH) medidas padrão pela secção B (DH_PADRAO no HTML): B 1,1/1,9/2,65/3,5/5 → A altura 2/3/4/6/8, C secção do rebaixo frontal 0,7/1,2/1,65/2,25/4, D profundidade do rebaixo 0,7/1/1,3/2/2,8; E = ângulo da base 10° (padrão). Campos A/C/D vazios = tabela; fora da tabela = proporcional (interpola entre linhas; fora das pontas, proporcional à linha da ponta).
- 09/11/2026 (usuário): PSH 129 (DH) tolerância padrão (campo vazio): Ø int e Ø ext 0/−0,2, altura 0/−0,1. PSE 108 e PSH 129: desenho SEM o O-ring ativador por enquanto (const DESENHO_ORING = false).
- 09/11/2026 (usuário): PSA 108 tolerância padrão (campo vazio): Ø int e Ø ext ±0,2, altura 0/−0,1. Nome da pasta/PDF do desenho arredonda a 3 casas.
- 10/11/2026 (usuário) — REGRAS PARA O CLAUDE AO FAZER PROGRAMAS DE PSA 108 (arruela). Seguir sempre, gerando pelo Simulador/gerar.ps1 (v5.9.1 já aplica):
  - Fazer PRIMEIRO o programa de 1 peça por ciclo e DEPOIS o de várias peças por ciclo (dois programas, dois números).
  - Programa de várias peças: a quantidade vai no NÚMERO/arquivo do programa: `046140 CICLO 5 PÇ.PIT` (Fagor) e `46140 CICLO 5 PÇ.txt` (MCS 500). 1 peça = só o número.
  - Bucha: calcular o comprimento para o total de peças pedido (total = peças por ciclo × (1 + RPT N0); consumo por ciclo = avanço do G92). Ex.: 50x58x2, 12 pç: 1 pç RPT N11 (3,1 mm/pç ≈ 37,2 mm) ou 6 pç RPT N1 (17,85 mm/ciclo ≈ 35,7 mm), mais a fixação.
  - Desbaste em Z (NBR, POM, Nylon, Celeron): comprimento máximo 40 mm (limita as peças por ciclo) e NUNCA de uma vez: dividir em etapas de até 20 mm, sempre pelo menos 2 — exceto comprimento até 10 mm (zMin), que vai de uma vez (usuário 11/11: 2 etapas em peça curta = desbaste duplicado).
  - PU: NÃO usar a regra do desbaste em Z (sem limite de 40 mm e sem etapas) — desbaste como sempre, bucha automática da tabela de buchas PU.
  - Teflon (PTFE puro e PTFE+BR) saindo de BUCHA (tubo): externo e interno num PASSE SÓ (o de acabamento), a bucha de Teflon fica bem próxima da medida; bucha sugerida = Ø int − 2 × Ø ext + 2 (2 mm de sobremetal nos 2 diâmetros, v5.9.4) — usar a da OP de prensagem quando houver; avisar se sobrar ≥ 5 no Ø.
  - Teflon saindo de TARUGO: NÃO usa o passe único — desbaste interno com 1º passe em Ø16, depois passes de no máximo 8 no Ø até Ø int − 2 (acabamento 2); limite de 40 mm e etapas em Z de até 20 mm. (Só Teflon; PU/outros: tarugo como antes.)

## PSG 101 (guia) — usuário 11/11/2026
- Cópia do PSA 108 (arruela). Guias são mais altas (padrão 9,7).
- POM e Celeron: usinar 0,9 mm MAIOR nos 2 diâmetros (desenho com a medida nominal).
- Depois de usinada, a guia leva um CORTE em ângulo, feito no ACABAMENTO (fora do programa CNC): mais comuns 30°, 45° e 60°; serra de 1,8 mm.
- O +0,9 nos Ø é só para POM e Celeron (perda da serra). Outros materiais também são cortados, mas sem perda.
- Secção no desenho: +0 / −0,05.
- Celeron: chanfro externo a 30° (medida em Z, 30° com o eixo), em vez de 45°.
- Celeron (todas as arruelas/guias): corte com a T6D16 → bedame 2 nas peças e G92 +1 (como secção > 14,8); desbaste vai até o fim da faixa do corte (N×B6 + sobreposição), 0,1 antes da peça seguinte; acabamento termina no mesmo Z (paralelo = meio bedame + sobreposição, no fundo do chanfro, sem degrau): nada passa para a peça seguinte. Vale também para secção > 14,8.
