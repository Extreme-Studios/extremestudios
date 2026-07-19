const flow = ["IDE", "PROMPT", "BUILD", "APK", "ANDROID"];

export default function Hero() {
  return (
    <section id="home" className="mx-auto grid min-h-[calc(100vh-74px)] max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1fr_.9fr] md:px-8">
      <div className="reveal">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-neon">AI Engineering • Android Development • Education</p>
        <h1 className="max-w-3xl text-5xl font-black leading-[.95] text-white md:text-7xl">Belajar <span className="text-neon">AI.</span><br />Bangun Aplikasi.<br />Wujudkan Ide.</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">Extreme Studios membantu generasi muda mengenal Artificial Intelligence melalui pengalaman nyata membuat aplikasi Android, sekaligus menyediakan layanan pengembangan aplikasi dan solusi AI.</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#pelatihan" className="rounded-xl bg-neon px-6 py-3 font-bold text-ink shadow-glow transition hover:bg-lime-300">Lihat Pelatihan</a>
          <a href="#layanan" className="rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition hover:border-neon/60 hover:bg-neon/10">Lihat Layanan</a>
        </div>
      </div>

      <div className="relative reveal">
        <div className="absolute -left-10 top-12 h-48 w-48 rounded-full bg-neon/15 blur-3xl" />
        <div className="glass soft-grid relative overflow-hidden rounded-3xl p-5 shadow-premium">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-xs font-black uppercase tracking-[.22em] text-neon">Build Flow</span>
            <span className="rounded-full border border-neon/30 bg-neon/10 px-3 py-1 text-[10px] font-bold text-neon">REAL PROJECT</span>
          </div>
          <div className="space-y-3 py-7">
            {flow.map((item, index) => <div key={item} className="flex items-center gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-neon/30 bg-neon/10 text-sm font-black text-neon">0{index + 1}</span>
              <span className="font-black tracking-[.16em] text-white">{item}</span>
              {index < flow.length - 1 && <span className="ml-auto text-neon/70">→</span>}
            </div>)}
          </div>
          <div className="rounded-2xl border border-neon/20 bg-neon/10 p-4 text-sm leading-6 text-slate-200">Dari ide sederhana hingga aplikasi Android yang dapat dijalankan di HP sendiri.</div>
        </div>
      </div>
    </section>
  );
}
