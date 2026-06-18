$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$outDir = Join-Path $root "public\mockups"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$projects = @(
  @{ Slug="portal-arek-musik"; Title="Portal Arek Musik"; Type="music"; A="#3b82f6"; B="#8b5cf6" },
  @{ Slug="pasarku-sidokerto"; Title="Pasarku Sidokerto"; Type="market"; A="#22c55e"; B="#3b82f6" },
  @{ Slug="cinema-parfi-jatim"; Title="Cinema Parfi Jatim"; Type="film"; A="#ef4444"; B="#8b5cf6" },
  @{ Slug="cine-arena"; Title="Cine Arena"; Type="studentfilm"; A="#38bdf8"; B="#8b5cf6" },
  @{ Slug="lazis-nu-sidokerto-tv"; Title="Lazis NU Sidokerto TV"; Type="dakwah"; A="#22c55e"; B="#0ea5e9" },
  @{ Slug="grii-sidoarjo"; Title="GRII Sidoarjo"; Type="church"; A="#60a5fa"; B="#22c55e" },
  @{ Slug="extreme-studios-hub"; Title="Extreme Studios HUB"; Type="hub"; A="#f97316"; B="#3b82f6" },
  @{ Slug="auto-cut-video"; Title="Auto Cut Video"; Type="editor"; A="#06b6d4"; B="#8b5cf6" },
  @{ Slug="pas-photo-layout"; Title="Pas Photo Layout"; Type="photo"; A="#38bdf8"; B="#22c55e" },
  @{ Slug="photography-invoice"; Title="Photography Invoice"; Type="invoice"; A="#3b82f6"; B="#f59e0b" }
)

function C($hex, $alpha = 255) {
  $h = $hex.TrimStart("#")
  [System.Drawing.Color]::FromArgb($alpha, [Convert]::ToInt32($h.Substring(0,2),16), [Convert]::ToInt32($h.Substring(2,2),16), [Convert]::ToInt32($h.Substring(4,2),16))
}

function Brush($color) { New-Object System.Drawing.SolidBrush($color) }

function RoundFill($g, $brush, $x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x,$y,$d,$d,180,90); $p.AddArc(($x+$w-$d),$y,$d,$d,270,90)
  $p.AddArc(($x+$w-$d),($y+$h-$d),$d,$d,0,90); $p.AddArc($x,($y+$h-$d),$d,$d,90,90)
  $p.CloseFigure(); $g.FillPath($brush,$p); $p.Dispose()
}

function RoundStroke($g, $pen, $x, $y, $w, $h, $r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $p.AddArc($x,$y,$d,$d,180,90); $p.AddArc(($x+$w-$d),$y,$d,$d,270,90)
  $p.AddArc(($x+$w-$d),($y+$h-$d),$d,$d,0,90); $p.AddArc($x,($y+$h-$d),$d,$d,90,90)
  $p.CloseFigure(); $g.DrawPath($pen,$p); $p.Dispose()
}

function Text($g, $text, $font, $brush, $x, $y) {
  $g.DrawString($text, $font, $brush, [float]$x, [float]$y)
}

function UiChrome($g, $title, $accent, $accent2) {
  $white = Brush ([System.Drawing.Color]::White)
  $muted = Brush ([System.Drawing.Color]::FromArgb(170,255,255,255))
  $stroke = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(38,255,255,255), 2)
  $panel = Brush ([System.Drawing.Color]::FromArgb(92,255,255,255))
  $dark = Brush ([System.Drawing.Color]::FromArgb(178,4,8,14))
  RoundFill $g $panel 52 50 1496 900 44
  RoundStroke $g $stroke 52 50 1496 900 44
  RoundFill $g $dark 92 88 1416 74 24
  $g.FillEllipse((Brush (C "#ef4444")),128,116,16,16)
  $g.FillEllipse((Brush (C "#f59e0b")),158,116,16,16)
  $g.FillEllipse((Brush (C "#22c55e")),188,116,16,16)
  Text $g $title (New-Object System.Drawing.Font("Arial", 21, [System.Drawing.FontStyle]::Bold)) $white 238 108
  Text $g "DUMMY APPLICATION SCREEN" (New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Bold)) $muted 1180 116
}

function DrawBackground($g, $accent, $accent2) {
  $rect = New-Object System.Drawing.Rectangle(0,0,1600,1000)
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, (C "#050814"), (C "#0b1220"), 35)
  $g.FillRectangle($bg, $rect)
  $g.FillEllipse((Brush ([System.Drawing.Color]::FromArgb(48,$accent.R,$accent.G,$accent.B))), -140, -180, 580, 580)
  $g.FillEllipse((Brush ([System.Drawing.Color]::FromArgb(42,$accent2.R,$accent2.G,$accent2.B))), 1160, 640, 620, 620)
  $grid = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(16,255,255,255), 1)
  for ($x=0; $x -lt 1600; $x+=64) { $g.DrawLine($grid,$x,0,$x,1000) }
  for ($y=0; $y -lt 1000; $y+=64) { $g.DrawLine($grid,0,$y,1600,$y) }
}

function DrawSidebar($g, $accent) {
  RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(134,4,8,14))) 92 188 260 700 26
  for ($i=0; $i -lt 7; $i++) {
    $y = 234 + ($i * 76)
    RoundFill $g (Brush ([System.Drawing.Color]::FromArgb($(if($i -eq 1){62}else{24}),255,255,255))) 122 $y 190 44 14
    $g.FillEllipse((Brush $(if($i -eq 1){$accent}else{[System.Drawing.Color]::FromArgb(76,255,255,255)})),142,($y+13),18,18)
  }
}

function DrawCard($g, $x, $y, $w, $h, $accent, $label) {
  RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(42,255,255,255))) $x $y $w $h 24
  RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(70,$accent.R,$accent.G,$accent.B))) ($x+16) ($y+16) ($w-32) 86 18
  Text $g $label (New-Object System.Drawing.Font("Arial", 15, [System.Drawing.FontStyle]::Bold)) (Brush ([System.Drawing.Color]::White)) ($x+18) ($y+$h-48)
}

foreach ($p in $projects) {
  $accent = C $p.A
  $accent2 = C $p.B
  $bmp = New-Object System.Drawing.Bitmap(1600,1000,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  DrawBackground $g $accent $accent2
  UiChrome $g $p.Title $accent $accent2
  DrawSidebar $g $accent

  $white = Brush ([System.Drawing.Color]::White)
  $muted = Brush ([System.Drawing.Color]::FromArgb(170,255,255,255))
  $big = New-Object System.Drawing.Font("Arial", 38, [System.Drawing.FontStyle]::Bold)
  $med = New-Object System.Drawing.Font("Arial", 19, [System.Drawing.FontStyle]::Bold)
  $small = New-Object System.Drawing.Font("Arial", 15, [System.Drawing.FontStyle]::Regular)

  Text $g $p.Title $big $white 395 205

  switch ($p.Type) {
    "music" {
      Text $g "Indie band streaming dashboard" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(48,255,255,255))) 398 306 520 360 30
      $g.FillEllipse((Brush $accent),520,360,190,190)
      $g.FillEllipse((Brush (C "#050814")),580,420,70,70)
      for($i=0;$i -lt 22;$i++){ RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(185,255,255,255))) (420+$i*21) (710-(($i%5)+2)*18) 10 ((($i%5)+2)*18) 5 }
      DrawCard $g 980 306 190 230 $accent2 "Band Profile"
      DrawCard $g 1200 306 190 230 $accent "Album Grid"
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(48,255,255,255))) 980 582 410 84 24
      Text $g "Now Playing: Arek Indie Session" $med $white 1010 608
    }
    "market" {
      Text $g "UMKM product catalog + WhatsApp order flow" $small $muted 398 258
      for($i=0;$i -lt 8;$i++){ DrawCard $g (398+(($i%4)*235)) (310+([Math]::Floor($i/4)*250)) 205 210 $(if($i%2 -eq 0){$accent}else{$accent2}) $("Produk " + ($i+1)) }
      RoundFill $g (Brush $accent) 1112 800 250 54 22
      Text $g "Order via WhatsApp" $med $white 1140 813
    }
    "film" {
      Text $g "Indie movie streaming interface" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(62,$accent.R,$accent.G,$accent.B))) 398 310 990 300 34
      Text $g "Featured Short Movie" $big $white 445 398
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(220,255,255,255))) 820 405 74 74 37
      for($i=0;$i -lt 5;$i++){ DrawCard $g (398+$i*200) 665 174 190 $accent2 $("Film " + ($i+1)) }
    }
    "studentfilm" {
      Text $g "Student film showcase and submission area" $small $muted 398 258
      for($i=0;$i -lt 6;$i++){ DrawCard $g (398+(($i%3)*315)) (310+([Math]::Floor($i/3)*250)) 280 210 $(if($i%2 -eq 0){$accent}else{$accent2}) $("Student Film " + ($i+1)) }
    }
    "dakwah" {
      Text $g "Kajian, kegiatan dakwah, and video archive" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(52,$accent.R,$accent.G,$accent.B))) 398 310 650 310 34
      Text $g "Kajian Terbaru" $big $white 442 395
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(220,255,255,255))) 700 420 70 70 35
      DrawCard $g 1100 310 250 190 $accent "Dakwah"
      DrawCard $g 1100 540 250 190 $accent2 "Kegiatan"
      DrawCard $g 398 675 250 170 $accent "Ustadz"
      DrawCard $g 690 675 250 170 $accent2 "Dokumentasi"
      DrawCard $g 982 675 250 170 $accent "Video"
    }
    "church" {
      Text $g "Live service streaming and worship archive" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(52,$accent.R,$accent.G,$accent.B))) 398 310 700 350 34
      Text $g "Ibadah Online" $big $white 442 415
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(220,255,255,255))) 735 448 70 70 35
      for($i=0;$i -lt 3;$i++){ DrawCard $g (1135) (310+$i*185) 230 150 $accent2 $("Event " + ($i+1)) }
    }
    "hub" {
      Text $g "APK and PC software distribution hub" $small $muted 398 258
      for($i=0;$i -lt 6;$i++){
        $x=398+(($i%2)*485); $y=315+([Math]::Floor($i/2)*155)
        RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(42,255,255,255))) $x $y 435 115 24
        $g.FillEllipse((Brush $(if($i%2 -eq 0){$accent}else{$accent2})),($x+24),($y+26),60,60)
        Text $g $("Extreme App " + ($i+1)) $med $white ($x+108) ($y+28)
        Text $g "Download / Update ready" $small $muted ($x+108) ($y+62)
      }
    }
    "editor" {
      Text $g "Auto highlight cutting and Premiere XML export" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(44,255,255,255))) 398 310 990 300 30
      for($i=0;$i -lt 4;$i++){ RoundFill $g (Brush $(if($i%2 -eq 0){$accent}else{$accent2})) 430 (675+$i*44) (520+$i*90) 26 12 }
      for($i=0;$i -lt 7;$i++){ RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(56,255,255,255))) (430+$i*130) 350 94 210 18 }
      RoundFill $g (Brush $accent) 1125 790 230 54 22
      Text $g "Export XML" $med $white 1174 803
    }
    "photo" {
      Text $g "Automatic photo print layout generator" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(235,255,255,255))) 470 310 560 500 16
      for($i=0;$i -lt 12;$i++){ RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(92,$accent.R,$accent.G,$accent.B))) (500+(($i%3)*165)) (340+([Math]::Floor($i/3)*108)) 130 86 8 }
      DrawCard $g 1110 330 240 170 $accent2 "3x4"
      DrawCard $g 1110 540 240 170 $accent "4x6"
    }
    "invoice" {
      Text $g "Photographer billing and payment tracking" $small $muted 398 258
      RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(44,255,255,255))) 398 310 570 500 28
      Text $g "Invoice #PH-2026" $big $white 440 365
      for($i=0;$i -lt 5;$i++){ RoundFill $g (Brush ([System.Drawing.Color]::FromArgb(40,255,255,255))) 440 (455+$i*55) 470 28 14 }
      RoundFill $g (Brush $accent2) 440 740 250 48 18
      Text $g "PAID Rp 2.500.000" $med $white 462 752
      DrawCard $g 1035 330 290 180 $accent "Client"
      DrawCard $g 1035 565 290 180 $accent2 "Report"
    }
  }

  $rand = New-Object System.Random(100 + $p.Slug.Length)
  for ($i=0; $i -lt 7000; $i++) {
    $bmp.SetPixel($rand.Next(0,1600), $rand.Next(0,1000), [System.Drawing.Color]::FromArgb($rand.Next(8,30),255,255,255))
  }

  $out = Join-Path $outDir "$($p.Slug).png"
  $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

Write-Host "Generated specific dummy application mockups: $($projects.Count)"
