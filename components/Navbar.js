const links = [["Home", "#home"], ["About", "#about"], ["Services", "#services"], ["Projects", "#projects"], ["Programs & Events", "#programs"], ["Contact", "#contact"]];

export default function Navbar() {
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
      <a href="#home" className="flex shrink-0 items-center gap-3" aria-label="Extreme Studios Home"><span className="grid h-10 w-10 place-items-center rounded-xl border border-neon/40 bg-neon/10 text-sm font-black text-neon shadow-glow">ES</span><span><strong className="block text-xs tracking-[.2em] text-white sm:text-sm">EXTREME STUDIOS</strong><span className="hidden text-[10px] font-medium uppercase tracking-[.13em] text-slate-400 sm:block">AI Engineering & Software Development</span></span></a>
      <nav className="hidden items-center gap-5 text-sm font-medium text-slate-300 lg:flex">{links.map(([label, href]) => <a key={href} className="transition hover:text-neon" href={href}>{label}</a>)}</nav>
      <details className="relative lg:hidden"><summary className="cursor-pointer list-none rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white">MENU</summary><nav className="absolute right-0 mt-3 grid w-52 gap-1 rounded-2xl border border-white/10 bg-panel p-3 shadow-premium">{links.map(([label, href]) => <a key={href} className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-neon/10 hover:text-neon" href={href}>{label}</a>)}</nav></details>
    </div>
  </header>;
}
