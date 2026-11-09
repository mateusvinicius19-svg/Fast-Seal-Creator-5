# Imprime PDFs sem abrir o Acrobat: renderiza cada pagina com o leitor de PDF do Windows (Windows.Data.Pdf, 300 dpi)
# e manda para a impressora pelo System.Drawing (ajusta a pagina na folha, retrato/paisagem pelo desenho).
# Uso: imprimir.ps1 -Pdf "a.pdf","b.pdf" [-Printer "Imp_Prod_M4070"]   (sem -Printer = impressora padrao)
param([Parameter(Mandatory)][string[]]$Pdf, [string]$Printer = '')
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing, System.Runtime.WindowsRuntime
[void][Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
[void][Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
[void][Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]
$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]
function Await($op, [Type]$t) { $task = $asTask.MakeGenericMethod($t).Invoke($null, @($op)); $task.Wait(-1) | Out-Null; $task.Result }
function AwaitAction($op) { $m = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]; $m.Invoke($null, @($op)).Wait(-1) | Out-Null }
$out = @()
foreach ($f in $Pdf) {
  try {
    $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync((Resolve-Path -LiteralPath $f).ProviderPath)) ([Windows.Storage.StorageFile])
    $doc  = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)) ([Windows.Data.Pdf.PdfDocument])
    $imgs = @()
    for ($i = 0; $i -lt $doc.PageCount; $i++) {
      $pg = $doc.GetPage($i); $opt = New-Object Windows.Data.Pdf.PdfPageRenderOptions
      $opt.DestinationWidth = [uint32]([math]::Round($pg.Size.Width / 72 * 300)); $opt.DestinationHeight = [uint32]([math]::Round($pg.Size.Height / 72 * 300))
      $ms = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
      AwaitAction ($pg.RenderToStreamAsync($ms, $opt))
      $net = [System.IO.WindowsRuntimeStreamExtensions]::AsStream($ms); $net.Position = 0
      $imgs += [System.Drawing.Image]::FromStream($net); $pg.Dispose()
    }
    $pd = New-Object System.Drawing.Printing.PrintDocument
    if ($Printer) { $pd.PrinterSettings.PrinterName = $Printer }
    if (-not $pd.PrinterSettings.IsValid) { throw "impressora invalida: $Printer" }
    $pd.DocumentName = [IO.Path]::GetFileName($f)
    $pd.DefaultPageSettings.Landscape = ($imgs[0].Width -gt $imgs[0].Height)
    $script:k = 0
    $pd.add_PrintPage({ param($s, $e)
      $img = $imgs[$script:k]; $b = $e.MarginBounds; $pb = $e.PageBounds
      $r = [math]::Min(($pb.Width - 20) / $img.Width, ($pb.Height - 20) / $img.Height)
      $w = $img.Width * $r; $h = $img.Height * $r
      $e.Graphics.DrawImage($img, [single](($pb.Width - $w) / 2), [single](($pb.Height - $h) / 2), [single]$w, [single]$h)
      $script:k++; $e.HasMorePages = ($script:k -lt $imgs.Count) })
    $pd.Print()
    $out += [pscustomobject]@{ pdf = [IO.Path]::GetFileName($f); paginas = $imgs.Count; resultado = 'ENVIADO'; erro = '' }
    $imgs | ForEach-Object { $_.Dispose() }
  } catch { $out += [pscustomobject]@{ pdf = [IO.Path]::GetFileName($f); paginas = 0; resultado = 'ERRO'; erro = "$_" } }
}
$out
