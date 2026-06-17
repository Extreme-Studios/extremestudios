export const apps = [
  {
    slug: "portal-arek-musik",
    title: "Portal Arek Musik",
    category: "Indie Music Platform",
    group: "featured",
    mockup: "/mockups/portal-arek-musik.png",
    desc: "Platform streaming musik untuk band indie agar karya mereka bisa dipublikasikan dan didengar lebih luas.",
    longDesc:
      "Portal Arek Musik dibuat sebagai tempat band indie memamerkan lagu, memperluas jangkauan pendengar, dan membangun identitas musik lokal secara digital.",
    points: ["Music player", "Band profile", "Discovery feed", "Join platform"]
  },
  {
    slug: "pasarku-sidokerto",
    title: "Pasarku Sidokerto",
    category: "UMKM Catalog",
    group: "featured",
    mockup: "/mockups/pasarku-sidokerto.png",
    desc: "Aplikasi katalog digital untuk pedagang UMKM agar bisa menampilkan produk dan melayani pembelian dengan lebih praktis.",
    longDesc:
      "Pasarku Sidokerto membantu pedagang lokal punya etalase digital yang rapi, mudah dibuka, dan siap diarahkan ke kontak pembelian.",
    points: ["Product catalog", "Merchant profile", "Search products", "WhatsApp order"]
  },
  {
    slug: "cinema-parfi-jatim",
    title: "Cinema Parfi Jatim",
    category: "Indie Film Streaming",
    group: "featured",
    mockup: "/mockups/cinema-parfi-jatim.png",
    desc: "Platform streaming film indie dan short movie untuk distribusi karya sineas lokal.",
    longDesc:
      "Cinema Parfi Jatim menampilkan film indie, short movie, dan trailer dalam format katalog streaming yang lebih profesional.",
    points: ["Movie catalog", "Film poster", "Trailer player", "Creator showcase"]
  },
  {
    slug: "cine-arena",
    title: "Cine Arena",
    category: "Student Film Platform",
    group: "featured",
    mockup: "/mockups/cine-arena.png",
    desc: "Platform streaming film khusus pelajar untuk menampilkan dan mengembangkan karya film siswa.",
    longDesc:
      "Cine Arena menjadi ruang presentasi karya film pelajar dengan visual yang tetap clean, modern, dan tidak terasa seperti tugas sekolah.",
    points: ["Student showcase", "Campus category", "Film submission", "Watch room"]
  },
  {
    slug: "lazis-nu-sidokerto-tv",
    title: "Lazis NU Sidokerto TV",
    category: "Dakwah Streaming",
    group: "other",
    mockup: "/mockups/lazis-nu-sidokerto-tv.png",
    desc: "Platform video dakwah berbasis streaming untuk dokumentasi dan distribusi kegiatan keagamaan.",
    longDesc:
      "Aplikasi dakwah Islam berisi video kegiatan, kajian, dan dokumentasi organisasi agar bisa disaksikan online.",
    points: ["Kajian video", "Activity archive", "Streaming catalog", "Watch page"]
  },
  {
    slug: "grii-sidoarjo",
    title: "GRII Sidoarjo",
    category: "Church Streaming",
    group: "other",
    mockup: "/mockups/grii-sidoarjo.png",
    desc: "Aplikasi streaming ibadah dan kegiatan gereja untuk akses online jemaat.",
    longDesc:
      "GRII Sidoarjo membantu jemaat mengikuti ibadah, kegiatan gereja, dan live streaming ketika berhalangan hadir.",
    points: ["Live service", "Worship video", "Event archive", "Online access"]
  },
  {
    slug: "extreme-studios-hub",
    title: "Extreme Studios HUB",
    category: "Private App Store",
    group: "other",
    mockup: "/mockups/extreme-studios-hub.png",
    desc: "Platform distribusi aplikasi untuk mengelola dan menyediakan semua produk software dalam satu tempat.",
    longDesc:
      "Extreme Studios HUB menjadi katalog pusat untuk APK dan software PC buatan sendiri agar user punya satu tempat download yang jelas.",
    points: ["APK catalog", "PC software", "Download center", "Version update"]
  },
  {
    slug: "auto-cut-video",
    title: "Auto Cut Video",
    category: "Desktop Automation",
    group: "other",
    mockup: "/mockups/auto-cut-video.png",
    desc: "Software desktop untuk memotong video secara otomatis menjadi highlight dan mengekspor XML untuk editing lanjutan.",
    longDesc:
      "Auto Cut Video mempercepat workflow editor dengan deteksi potongan highlight dan export XML untuk proses lanjut di Adobe Premiere.",
    points: ["Auto highlight", "Timeline cut", "XML export", "Editor workflow"]
  },
  {
    slug: "pas-photo-layout",
    title: "Pas Photo Layout",
    category: "Photography Tool",
    group: "other",
    mockup: "/mockups/pas-photo-layout.png",
    desc: "Aplikasi untuk menyusun banyak foto secara otomatis dalam satu layout cetak.",
    longDesc:
      "Pas Photo Layout membantu fotografer menyusun banyak pas foto ke satu kertas tanpa mengatur manual berulang-ulang.",
    points: ["Photo import", "Auto layout", "Print sheet", "Size presets"]
  },
  {
    slug: "photography-invoice",
    title: "Photography Invoice",
    category: "Invoice Utility",
    group: "other",
    mockup: "/mockups/photography-invoice.png",
    desc: "Aplikasi invoice sederhana untuk membantu fotografer mencatat pembayaran klien.",
    longDesc:
      "Photography Invoice membantu fotografer mencatat paket foto, pembayaran, status klien, dan laporan sederhana.",
    points: ["Client invoice", "Payment status", "Package data", "Simple report"]
  }
];

export const featured = apps.filter((app) => app.group === "featured");
export const others = apps.filter((app) => app.group === "other");

export function getAppBySlug(slug) {
  return apps.find((app) => app.slug === slug);
}
