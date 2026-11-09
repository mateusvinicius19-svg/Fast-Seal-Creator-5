---
name: feedback-program-variants
description: "Never overwrite the standard program for an exception (e.g. different bucha) — save a variant named \"<número> <ØintXØext>\" in both Programas_CNC (.PIT) and MCS 500 (.txt)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 45259005-745e-4a9f-9607-abc02f83bcc7
  modified: 2026-11-06T09:32:17.026Z
---

When a program is changed away from the ideal/standard (e.g. internal roughing for a different bucha), keep the original `NNNNNN.PIT` untouched and save the exception as `NNNNNN <BI>X<BO>.PIT` (e.g. `037512 53X91.PIT`; MCS side `37512 53X91.txt`), so the next jobs don't repeat it and the variants stay distinguishable. Existing examples: `000175 32X62.PIT`, `044536 111X150.PIT`.

**Why:** 2026-11-06 I edited 037512.PIT in place for a Ø53 bucha; user said that was an exception and "o certo era ter colocado o diâmetro interno e externo da bucha na frente do programa". (I restored the original from backup; the user had already made `037512 53X91.PIT`/`.txt` himself.)

**How to apply:** for any exception edit, write a new file with the bucha suffix (check it doesn't exist first), never overwrite the base file; the Simulador's suggested file name appends " BIXBO" when the bucha is typed manually.

Related: [[cnc-program-release-process]] [[feedback-fsc-derived-rules]]
