const projects = [
  ["01", "Aplikasi Biodata", "Membuat profil sederhana berisi nama, foto, kelas, dan hobi."],
  ["02", "Aplikasi Kuis", "Membuat kuis pilihan ganda sederhana dengan sistem skor."],
  ["03", "Aplikasi Kalkulator", "Membuat kalkulator sederhana dengan bantuan prompt AI."],
  ["04", "Jadwal Belajar", "Membuat aplikasi untuk mencatat jadwal pelajaran atau kegiatan."]
];

export default function Training() {
  return <section id="pelatihan" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
    <div className="grid gap-8 lg:grid-cols-[1fr_.72fr]">
      <div>
        <p className="text-xs font-black uppercase tracking-[.28em] text-neon">Pelatihan AI Engineer Basic</p>
        <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">Mulai dari prompt, lanjut menjadi aplikasi.</h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Kelas berbasis project untuk siswa SD kelas 4–6 untuk mengenal prompt dasar, menggunakan AI, Android Studio, dan proses membuat aplikasi Android sederhana.</p>
        <div className="mt-8 rounded-2xl border border-neon/20 bg-neon/10 p-5"><p className="text-xs font-black uppercase tracking-[.18em] text-neon">Target materi</p><p className="mt-2 leading-7 text-slate-200">Pemahaman prompt dasar dan penggunaan software AI sebagai alat bantu pembuatan aplikasi Android.</p></div>
      </div>
      <aside className="glass rounded-3xl p-7"><p className="text-xs font-black uppercase tracking-[.18em] text-neon">Informasi kelas</p><div className="mt-6 space-y-5 text-slate-300"><div><p className="text-3xl font-black text-white">Rp250.000</p><p className="text-sm">per siswa · 4x pertemuan · 1 jam/pertemuan</p></div><div className="border-t border-white/10 pt-5"><p className="font-bold text-white">Kuota 5–10 siswa per kelas</p><p className="mt-1 text-sm leading-6">Kelas dibuka setelah kuota minimal 5 peserta terpenuhi.</p></div><a className="inline-flex rounded-xl bg-neon px-5 py-3 font-black text-ink transition hover:bg-lime-300" href="https://wa.me/6289677523666" target="_blank" rel="noreferrer">Tanya Program</a></div></aside>
    </div>
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{projects.map(([number, title, desc]) => <article key={number} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-neon/30"><span className="text-sm font-black text-neon">PROJECT {number}</span><h3 className="mt-6 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{desc}</p></article>)}</div>
    <div className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-white/[.035] p-6 md:grid-cols-2 md:p-8"><div><p className="text-xs font-black uppercase tracking-[.2em] text-neon">Hasil akhir</p><p className="mt-3 text-lg font-bold leading-8 text-white">Peserta dapat membuat dan menjalankan aplikasi Android hasil belajarnya di HP sendiri.</p></div><div><p className="text-xs font-black uppercase tracking-[.2em] text-neon">Perlengkapan</p><p className="mt-3 leading-7 text-slate-300">Laptop dan HP Android. Laptop perlu memiliki Google Chrome, ChatGPT atau Claude, serta Android Studio.</p></div></div>
  </section>;
}
