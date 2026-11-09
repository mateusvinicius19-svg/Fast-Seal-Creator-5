# Atualiza Rotina\indice_pit.csv = 1a linha (cabecalho) de cada .PIT de Programas_CNC (leitura em paralelo; so le os arquivos novos/alterados)
param([string]$Prog = 'W:\Parts\PartsSeals\PROJETOS\Programas_CNC')
$ROT = Split-Path -Parent $MyInvocation.MyCommand.Path
$IDX = Join-Path $ROT 'indice_pit.csv'
if (-not ('PitIndex' -as [type])) {
Add-Type -TypeDefinition @'
using System; using System.IO; using System.Linq; using System.Text; using System.Collections.Generic; using System.Collections.Concurrent; using System.Threading.Tasks;
public static class PitIndex {
  public static int Update(string dir, string csv) {
    var enc = Encoding.GetEncoding(1252);
    var old = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase);
    if (File.Exists(csv)) foreach (var l in File.ReadAllLines(csv, Encoding.UTF8).Skip(1)) { var p = l.Split('\t'); if (p.Length >= 3) old[p[0]] = p; }
    var files = new DirectoryInfo(dir).GetFiles("*.PIT", SearchOption.TopDirectoryOnly);
    var res = new ConcurrentDictionary<string, string[]>(StringComparer.OrdinalIgnoreCase);
    int read = 0;
    Parallel.ForEach(files, new ParallelOptions { MaxDegreeOfParallelism = 32 }, f => {
      string stamp = f.LastWriteTimeUtc.Ticks.ToString();
      string[] o;
      if (old.TryGetValue(f.Name, out o) && o[1] == stamp) { res[f.Name] = o; return; }
      string h = "";
      try { using (var r = new StreamReader(f.FullName, enc)) { h = r.ReadLine() ?? ""; } } catch { }
      System.Threading.Interlocked.Increment(ref read);
      res[f.Name] = new[] { f.Name, stamp, h.Replace('\t', ' ').Trim() };
    });
    var sb = new StringBuilder("arquivo\tstamp\tcabecalho\n");
    foreach (var kv in res.OrderBy(k => k.Key)) sb.Append(string.Join("\t", kv.Value)).Append('\n');
    File.WriteAllText(csv, sb.ToString(), new UTF8Encoding(true));
    return read;
  }
}
'@
}
$n = [PitIndex]::Update($Prog, $IDX)
"indice: $n arquivos lidos agora"
