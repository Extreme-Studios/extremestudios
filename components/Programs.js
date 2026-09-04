function ProgramVisual() {
  return <div className="program-visual"><span className="student student-one" /><span className="student student-two" /><span className="student student-three" /><i /></div>;
}

function UmkmVisual() {
  return <div className="program-visual program-visual--umkm"><img src="/umkm-naik-kelas-workshop.png" alt="Workshop UMKM Naik Kelas" /></div>;
}

export default function Programs() {
  return <section id="programs" className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
    <p className="eyebrow">Program Terbaru</p>
    <div className="mt-5 grid gap-5">
      <article className="program-card">
        <ProgramVisual />
        <div className="p-7"><div className="flex items-center gap-3"><h2 className="text-2xl font-medium text-white">Pelatihan AI Engineer Basic</h2><span className="tag">Baru</span></div><p className="mt-2 text-sm text-slate-300">Untuk Siswa SD Kelas 4–6</p><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">Program pengenalan AI dan pembuatan aplikasi Android dengan bantuan Artificial Intelligence dan Android Studio.</p><div className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-3"><p><b className="block text-cyan">4x Pertemuan</b>1 Jam / Pertemuan</p><p><b className="block text-cyan">Biaya</b>Rp250.000 / Siswa</p><p><b className="block text-cyan">Kuota</b>Min. 5 · Maks. 10 Siswa</p></div></div>
        <div className="flex items-center justify-center p-7"><a href="/programs/ai-engineer-basic" className="button-secondary text-center">Lihat Informasi<br />Pelatihan <b>→</b></a></div>
      </article>
      <article className="program-card">
        <UmkmVisual />
        <div className="p-7"><div className="flex items-center gap-3"><h2 className="text-2xl font-medium text-white">Workshop UMKM Naik Kelas</h2><span className="tag">Baru</span></div><p className="mt-2 text-sm text-slate-300">Untuk pelaku UMKM yang ingin berkembang secara digital</p><p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">Workshop praktis untuk membantu UMKM memperkuat branding, memahami strategi digital, dan memanfaatkan teknologi agar bisnis lebih siap tumbuh.</p><div className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-3"><p><b className="block text-cyan">Materi</b>Branding &amp; Digital</p><p><b className="block text-cyan">Format</b>Workshop Praktis</p><p><b className="block text-cyan">Info</b>Segera Hadir</p></div></div>
        <div className="flex items-center justify-center p-7"><a href="#contact" className="button-secondary text-center">Tanya Info<br />Workshop <b>→</b></a></div>
      </article>
    </div>
  </section>;
}
