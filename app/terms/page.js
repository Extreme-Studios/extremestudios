export const metadata = {
  title: "Syarat Penggunaan | Extreme Studios",
  description: "Syarat penggunaan website Extreme Studios.",
};

const sections = [
  ["1. Ruang lingkup", "Website ini menyediakan informasi tentang layanan, program, dan portfolio Extreme Studios. Informasi di website digunakan sebagai pengenalan awal dan bukan penawaran yang mengikat."],
  ["2. Penggunaan website", "Pengunjung dapat memakai website untuk mencari informasi, menghubungi Extreme Studios, dan menilai relevansi layanan. Jangan menggunakan website untuk mengganggu layanan, mencoba mengakses area yang tidak ditujukan untuk publik, atau mengirimkan materi yang melanggar hukum."],
  ["3. Informasi layanan dan project", "Deskripsi layanan, program, dan project ditampilkan untuk menjelaskan jenis pekerjaan yang tersedia atau pernah dikerjakan. Ruang lingkup, jadwal, harga, hasil, dan hak penggunaan untuk pekerjaan tertentu hanya berlaku setelah disepakati secara tertulis dengan pihak terkait."],
  ["4. Tautan pihak ketiga", "Website dapat mengarahkan pengunjung ke WhatsApp, Google, media sosial, atau situs project. Layanan tersebut dikelola pihak lain dan penggunaan setelah meninggalkan website ini mengikuti ketentuan mereka."],
  ["5. Perubahan", "Kami dapat memperbarui isi website atau syarat ini agar selaras dengan layanan yang tersedia. Versi terbaru dipublikasikan pada halaman ini."],
];

export default function TermsPage() {
  return <main className="min-h-screen bg-[#04101c] px-5 py-12 text-slate-200 md:px-8 md:py-20"><article className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#071a2c] p-6 shadow-2xl md:p-12"><a className="text-sm font-bold text-cyan-300 hover:text-white" href="/">← Kembali ke Extreme Studios</a><p className="mt-12 text-xs font-black uppercase tracking-[.25em] text-cyan-300">Extreme Studios / Legal</p><h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Syarat Penggunaan</h1><p className="mt-5 text-sm leading-7 text-slate-400">Terakhir diperbarui: 17 September 2026</p><div className="mt-10 space-y-8 text-[.98rem] leading-8 text-slate-300">{sections.map(([title, body]) => <section key={title}><h2 className="text-xl font-bold text-white">{title}</h2><p className="mt-2">{body}</p></section>)}<section><h2 className="text-xl font-bold text-white">6. Kontak</h2><p className="mt-2">Untuk pertanyaan terkait website atau layanan, hubungi Extreme Studios melalui WhatsApp: <a className="text-cyan-300 underline" href="https://wa.me/6289677523666" target="_blank" rel="noreferrer">+62 896-7752-3666</a>.</p></section></div></article></main>;
}
