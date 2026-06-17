export default function Positioning() {
  return (
    <section id="system" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="glass relative overflow-hidden rounded-3xl p-8 shadow-premium md:p-12">
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-blue-500/15 blur-3xl" />
        <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-300">Positioning</p>
        <h2 className="relative mt-4 max-w-4xl text-3xl font-black leading-tight text-white md:text-5xl">
          Bukan sekadar aplikasi. Ini kumpulan sistem yang dibangun untuk kebutuhan nyata.
        </h2>
        <p className="relative mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Mulai dari UMKM, komunitas, film, musik, kegiatan keagamaan, sampai distribusi software. Fokusnya
          jelas: produk yang bisa dipakai, dipresentasikan, dan dikembangkan.
        </p>
      </div>
    </section>
  );
}
