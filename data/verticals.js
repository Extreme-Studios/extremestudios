export const verticalConfigs = {
  mua: {
    slug: "mua",
    businessType: "Makeup Artist",
    productName: "Website MUA + AI Assistant",
    price: "Rp1.500.000",
    priceValue: 1500000,
    badge: "Domain .COM 1 Tahun Termasuk",
    hero: {
      title: "Website MUA + AI Assistant",
      subtitle: "Calon client bisa tanya, cek layanan dan booking tanpa kamu balas chat satu-satu."
    },
    features: [
      ["✦", "Website profesional", "Tampilan premium yang membangun kepercayaan calon pengantin."],
      ["▣", "Portfolio MUA", "Before-after, lookbook, testimoni, dan hasil terbaik dalam satu tempat."],
      ["◌", "AI Chat Assistant", "Menjawab pertanyaan paket, proses, dan ketersediaan 24 jam."],
      ["✓", "Form calon pengantin", "Data acara dan kebutuhan calon client lebih rapi sejak chat pertama."],
      ["▤", "Sistem booking", "Alur booking jelas dari pilih tanggal sampai detail acara."],
      ["◫", "Google Calendar ready", "Struktur jadwal siap dihubungkan ke kalender MUA Anda."],
      ["↗", "WhatsApp terintegrasi", "Follow-up ke WhatsApp saat calon client sudah siap lanjut."],
      ["⌁", "Mobile responsive", "Tampil nyaman saat dibuka dari Instagram, TikTok, atau WhatsApp."],
      [".COM", "Domain 1 tahun", "Domain .com sudah termasuk dalam harga promo."],
    ],
    demoServices: ["Akad Nikah", "Resepsi", "Engagement", "Family Makeup"],
    demoPackages: [
      { name: "Essential Bride", price: "Rp1.250.000", note: "Makeup + hijab styling" },
      { name: "Signature Bride", price: "Rp2.250.000", note: "Makeup + hairdo + touch-up" },
      { name: "Family Glam", price: "Rp650.000", note: "Untuk keluarga atau pendamping" }
    ],
    bookingFields: ["Nama", "Nomor WhatsApp", "Lokasi acara", "Jumlah orang", "Catatan kebutuhan"],
    calendarRules: {
      unavailableDays: [12, 18, 26],
      availableLabel: "Tanggal tersedia untuk booking."
    },
    faq: [
      ["Apakah harga sudah termasuk domain?", "Ya. Domain .com untuk satu tahun sudah termasuk."],
      ["Apakah bisa pakai brand dan warna sendiri?", "Bisa. Desain disesuaikan dengan identitas MUA Anda."],
      ["Apakah Diana bisa menjawab calon client?", "Ya. Diana disiapkan khusus untuk paket dan alur booking MUA."],
      ["Apakah Google Calendar langsung aktif?", "Demo ini memakai kalender simulasi; integrasi akun client disiapkan saat setup."],
    ],
    chatbotPrompt: "Kamu DIANA khusus produk Website MUA + AI Assistant dari Extreme Studios. Jawab dalam Bahasa Indonesia ramah, singkat, meyakinkan. Fokus harga Rp1.500.000, fitur, domain, booking, AI assistant, Google Calendar, proses pembuatan, pembayaran, serta manfaat untuk MUA. Jangan mengarahkan ke WhatsApp sebelum calon customer siap order."
  }
};

export function getVerticalConfig(slug) {
  return verticalConfigs[slug] || null;
}
