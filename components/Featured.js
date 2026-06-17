import { featured } from "@/data/apps";

export default function Featured() {
  return (
    <section id="featured" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-300">Featured Projects</p>
        <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
          Empat produk utama yang jadi wajah Extreme Studios.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((app) => (
          <a
            key={app.slug}
            href={`/projects/${app.slug}`}
            className="group glass overflow-hidden rounded-3xl transition duration-300 hover:scale-[1.015] hover:bg-white/10"
          >
            <div className="relative overflow-hidden">
              <img src={app.mockup} alt={`${app.title} mockup`} className="h-64 w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-200 backdrop-blur">
                {app.category}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-black text-white group-hover:text-blue-300">{app.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{app.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
