export const metadata = {
  title: "Kebijakan Privasi | Extreme Studios",
  description: "Kebijakan privasi Extreme Studios mengenai penggunaan website, chat assistant, WhatsApp, dan iklan.",
};

const sections = [
  ["1. Tentang kebijakan ini", "Kebijakan ini menjelaskan bagaimana Extreme Studios memperlakukan informasi ketika Anda mengunjungi website, membaca informasi project, menggunakan chat assistant, atau menghubungi kami."],
  ["2. Informasi yang dapat diproses", "Website dapat menerima informasi teknis dasar seperti alamat IP, jenis perangkat, browser, halaman yang dibuka, waktu akses, dan data log untuk menjalankan, mengamankan, dan memperbaiki layanan. Jika Anda menghubungi kami melalui WhatsApp, informasi yang Anda kirimkan diproses oleh WhatsApp dan penerima pesan."],
  ["3. Chat assistant", "Pesan yang dikirim melalui DIANA atau fitur chat dapat diproses oleh layanan pihak ketiga yang digunakan untuk menghasilkan jawaban. Jangan kirim password, nomor identitas, data keuangan, atau informasi rahasia melalui chat. Kami menggunakan percakapan tersebut hanya untuk merespons permintaan dan menjalankan fitur yang tersedia."],
  ["4. Iklan dan cookies", "Website dapat menampilkan iklan Google AdSense. Google dan partner iklan dapat menggunakan cookies atau teknologi serupa untuk menayangkan dan mengukur iklan sesuai pengaturan yang berlaku. Anda dapat mengelola personalisasi iklan melalui pengaturan iklan Google. Ketersediaan dan bentuk iklan dapat berubah setelah situs disetujui dan ditinjau."],
  ["5. Tautan pihak ketiga", "Website dapat memuat tautan ke WhatsApp, layanan Google, media sosial, atau situs project lain. Setelah Anda meninggalkan website ini, pemrosesan data mengikuti kebijakan privasi layanan yang Anda kunjungi."],
  ["6. Keamanan dan penyimpanan", "Kami berupaya menggunakan langkah yang wajar untuk menjaga informasi yang diterima melalui layanan ini. Tidak ada transmisi internet yang dapat dijamin aman sepenuhnya. Informasi disimpan selama diperlukan untuk tujuan layanan, keamanan, penyelesaian permintaan, atau kewajiban yang berlaku."],
  ["7. Pilihan dan permintaan pengguna", "Anda dapat membatasi informasi yang dibagikan dengan tidak mengirimkan data sensitif, mengatur cookies melalui browser, dan mengelola personalisasi iklan melalui pengaturan Google. Untuk pertanyaan atau permintaan terkait privasi, hubungi kami melalui WhatsApp."],
  ["8. Perubahan kebijakan", "Kebijakan ini dapat diperbarui ketika layanan, teknologi, atau kewajiban yang berlaku berubah. Versi terbaru akan dipublikasikan pada halaman ini."],
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#04101c] px-5 py-12 text-slate-200 md:px-8 md:py-20">
      <article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#071a2c] p-6 shadow-2xl md:p-12">
        <a className="text-sm font-bold text-cyan-300 hover:text-white" href="/">← Kembali ke Extreme Studios</a>
        <p className="mt-12 text-xs font-black uppercase tracking-[.25em] text-cyan-300">Extreme Studios / Legal</p>
        <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Kebijakan Privasi</h1>
        <p className="mt-5 text-sm leading-7 text-slate-400">Terakhir diperbarui: 11 September 2026</p>
        <div className="mt-10 space-y-8 text-[.98rem] leading-8 text-slate-300">
          {sections.map(([title, body]) => <section key={title}><h2 className="text-xl font-bold text-white">{title}</h2><p className="mt-2">{body}</p></section>)}
          <section>
            <h2 className="text-xl font-bold text-white">9. Kontak</h2>
            <p className="mt-2">Untuk pertanyaan privasi, hubungi Extreme Studios melalui WhatsApp: <a className="text-cyan-300 underline" href="https://wa.me/6289677523666" target="_blank" rel="noreferrer">+62 896-7752-3666</a>.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
