const links = [
  ["Home", "#home"],
  ["Pelatihan", "#pelatihan"],
  ["Layanan", "#layanan"],
  ["Portfolio", "#portfolio"],
  ["Tentang", "#tentang"],
  ["Kontak", "#kontak"]
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="Extreme Studios beranda">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-neon/40 bg-neon/10 text-sm font-black text-neon shadow-glow">ES</span>
          <span>
            <strong className="block text-xs tracking-[0.2em] text-white sm:text-sm">EXTREME STUDIOS</strong>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.13em] text-slate-400 sm:block">AI Engineering & Education</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-300 lg:flex">
          {links.map(([label, href]) => <a key={href} className="transition hover:text-neon" href={href}>{label}</a>)}
        </nav>

        <a href="https://wa.me/6289677523666" target="_blank" rel="noreferrer" className="rounded-xl bg-neon px-4 py-2 text-xs font-black text-ink shadow-glow transition hover:bg-lime-300 sm:text-sm">
          WhatsApp
        </a>
      </div>
    </header>
  );
}
