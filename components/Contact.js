export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl p-8 md:p-10">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-300">Contact</p>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
            Siap jadi wajah profesional untuk semua produk digital.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            Hubungi Adi Nugroho untuk web, aplikasi, software, katalog digital, streaming platform, dan visual
            production.
          </p>
          <a
            href="https://wa.me/6289677523666"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-green-500 px-6 py-3 font-black text-white transition hover:bg-green-400"
          >
            Chat WhatsApp
          </a>
        </div>

        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-black text-white">Adi Nugroho</h3>
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
