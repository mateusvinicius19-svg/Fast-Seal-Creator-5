# Fast Seal Creator 5

Gerador de programas CNC (Fagor .PIT e MCS 500) e desenhos PDF para vedações usinadas (gaxetas, raspadores, arruelas).

- `Simulador CNC.html` — aplicativo (abre no navegador).
- `Claude contexto/Rotina/` — scripts PowerShell da rotina de geração em lote (`gerar.ps1`, `revisar.ps1`, ...).
- `Claude contexto/*.md` — regras de usinagem e notas técnicas.
- Versão atual: ver `VERSION`; histórico em `CHANGELOG.md`.

Pasta de trabalho: `W:\Parts\PartsSeals\PROJETOS\PROGRAMAÇÃO\PADRONIZAÇÃO\Arruela Padronizada`.

## Pastas fixas (servidor local)
O navegador esquece a permissão das pastas ao fechar. Para não escolher pasta todo dia, rode uma vez no PC:

    powershell -ExecutionPolicy Bypass -File "Servidor Simulador.ps1" -Instalar

Ele liga junto com o Windows e cria o atalho **Simulador CNC (fixo)** (http://localhost:8765) na área de trabalho. Aberto por ele,
o Simulador grava direto em `W:\Parts\PartsSeals\PROJETOS`. Para tirar: `-Desinstalar`.

### No celular
No PowerShell **como administrador**:

    powershell -ExecutionPolicy Bypass -File "Servidor Simulador.ps1" -Instalar -Rede

Abra no celular (mesmo Wi-Fi) o link do arquivo **Simulador no celular.txt** que aparece na área de trabalho. Não compartilhe esse link.
