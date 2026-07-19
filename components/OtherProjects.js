import { others } from "@/data/apps";

export default function OtherProjects() {
  return (
    <section id="portfolio" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-neon">Portfolio</p>
          <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Project nyata dari Extreme Studios.</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-400">
          Aplikasi dan produk digital yang dibangun untuk komunitas, pendidikan, kreator, dan kebutuhan bisnis.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {others.map((app) => (
          <a key={app.slug} href={`/projects/${app.slug}`} className="group glass overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/10">
            <img src={app.mockup} alt={`${app.title} mockup`} className="h-36 w-full object-cover opacity-70 transition duration-300 group-hover:opacity-100" />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-neon">{app.category}</p>
              <h3 className="mt-2 text-lg font-black text-white group-hover:text-neon">{app.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{app.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
