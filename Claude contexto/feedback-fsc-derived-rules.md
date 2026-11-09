---
name: feedback-fsc-derived-rules
description: "For new seal profiles, derive the rules (apertos, folgas, sizes) from existing Fast Seal programs/drawings instead of asking the user or using the 2020 tables"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 45259005-745e-4a9f-9607-abc02f83bcc7
  modified: 2026-11-06T09:04:56.633Z
---

When building a new profile generator, take the rules from the company's existing Fast Seal programs (Programas_CNC) and FSC drawings (DESENHOS\<perfil>), not from the user and not from the Tolerâncias/esqueleto tables, unless the user already gave a rule (e.g. PSE/PSH 106 follow the table on user request).

**Why:** user said (2026-11-06) "pode seguir a regra que você localizar nos programas, se eu for te passar vai complicar muito" and for PSR 211 "o aperto pode manter em relação aos parâmetros que você pegou dos programas e desenhos, não precisa seguir a tabela".

**How to apply:** parse FINISH paths of real programs (reverse the 0.4 nose-radius compensation) and FSC PDFs, fit simple rules, show a comparison table vs FSC, and expose every rule as an editable parameter. Also mirror FSC program structure (sections, special tools like T6D6, T4Dx2 form tools, bedame clearance: PSR211 external roughing AND finishing (mainly the finish, otherwise the rear-groove tool rips too much material) go to Z −(H+2) because the rear-groove bedame is 2 mm wide; internal does not).

Related: [[profile-catalog-map]] [[cnc-program-release-process]]
