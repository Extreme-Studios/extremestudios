export default function Contact() {
  return (
    <section id="kontak" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl p-8 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-neon">Kerja sama sekolah</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
            Bawa Pelatihan AI Engineer ke Sekolah Anda.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            Extreme Studios membuka kerja sama dengan sekolah untuk Pelatihan AI Engineer Basic bagi siswa SD kelas 4–6, serta layanan aplikasi Android dan solusi AI.
          </p>
          <a
            href="https://wa.me/6289677523666"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-black text-white transition hover:bg-green-400"
          >
            Hubungi Extreme Studios
          </a>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-black text-white">Fajar</h3>
          <div className="mt-5 space-y-4 text-slate-400">
            <p>089677523666 (WhatsApp)</p>
            <p>Jl. Sono Indah Utara 1 No. 71, Sidokerto - Buduran</p>
            <a className="inline-flex font-bold text-blue-300 hover:text-blue-200" href="https://maps.app.goo.gl/o2vpqovQoQCeAXyg9" target="_blank" rel="noreferrer">
              Buka Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
