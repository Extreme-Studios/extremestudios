import { apps, getAppBySlug } from "@/data/apps";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export function generateMetadata({ params }) {
  const app = getAppBySlug(params.slug);
  if (!app) return {};

  return {
    title: `${app.title} | Extreme Studios`,
    description: app.desc
  };
}

export default function ProjectDetail({ params }) {
  const app = getAppBySlug(params.slug);
  if (!app) notFound();

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
      <a href="/#projects" className="inline-flex font-bold text-neon hover:text-lime-300">
        Kembali ke portfolio
      </a>

      <section className="grid min-h-[82vh] items-center gap-10 py-12 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-neon">{app.category}</p>
          <h1 className="mt-5 text-5xl font-black leading-[0.95] text-white md:text-7xl">{app.title}</h1>
          <p className="mt-7 text-lg leading-8 text-slate-400">{app.longDesc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {app.points.map((point) => (
              <span key={point} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200">
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="glass overflow-hidden rounded-3xl p-3 shadow-premium">
          <img src={app.mockup} alt={`${app.title} mockup`} className="w-full rounded-2xl object-cover" />
        </div>
      </section>

      <section className="grid gap-5 pb-20 md:grid-cols-4">
        {app.points.map((point, index) => (
          <article key={point} className="glass rounded-2xl p-6">
            <span className="text-xs font-black uppercase tracking-[0.24em] text-neon">Module {String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-4 font-black text-white">{point}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Modul ini bisa dikembangkan menjadi fitur produksi sesuai kebutuhan nyata project.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
