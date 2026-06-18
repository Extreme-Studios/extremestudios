const items = [
  {
    title: "Real Use Case",
    desc: "Semua aplikasi dibuat dari kebutuhan nyata, bukan eksperimen kosong."
  },
  {
    title: "Lightweight System",
    desc: "Fokus ke fitur inti, cepat dipakai, dan tidak over-engineering."
  },
  {
    title: "Fast Deployment",
    desc: "Dibangun agar mudah masuk GitHub, Vercel, dan bisa dikembangkan bertahap."
  },
  {
    title: "Clean Product Feel",
    desc: "Visual dijaga tetap tech, rapi, dan tidak terasa seperti template murah."
  }
];

export default function Philosophy() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-300">Build Philosophy</p>
        <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">Dibangun seperti product studio, bukan halaman link.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {items.map((item) => (
          <article key={item.title} className="glass rounded-2xl p-6 transition hover:bg-white/10">
            <div className="mb-5 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-violet-400 shadow-glow" />
            <h3 className="font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
