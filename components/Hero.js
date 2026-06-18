import { featured } from "@/data/apps";

export default function Hero() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-82px)] max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[0.95fr_1.05fr] md:px-8 md:py-28">
      <div className="reveal">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.32em] text-blue-300">
          Web Builder / App Builder / Software Builder / Visual Production
        </p>
        <h1 className="max-w-3xl text-5xl font-black leading-[0.94] text-white md:text-7xl">
          Build Real Apps{" "}
          <span className="bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
            for Real Needs
          </span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
          Kumpulan aplikasi untuk UMKM, kreator, komunitas, dan distribusi konten digital. Ini bukan
          kumpulan link random, tapi ekosistem produk digital yang dibangun untuk kebutuhan nyata.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#featured" className="rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-glow transition hover:bg-blue-400">
            Explore Projects
          </a>
          <a href="#contact" className="rounded-xl border border-white/15 px-6 py-3 font-bold text-white transition hover:bg-white/10">
            Contact
          </a>
        </div>
      </div>

      <div className="relative reveal">
        <div className="absolute -left-6 top-10 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-6 bottom-10 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="glass soft-grid relative overflow-hidden rounded-3xl p-4 shadow-premium">
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-green-300" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Studio OS</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((app, index) => (
              <a
                key={app.slug}
                href={`/projects/${app.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:scale-[1.02] hover:bg-white/10"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <img src={app.mockup} alt={`${app.title} mockup`} className="h-36 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100" />
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">{app.category}</p>
                  <h3 className="mt-2 font-bold text-white group-hover:text-blue-300">{app.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
