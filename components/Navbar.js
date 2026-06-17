export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/10 text-sm font-black text-white">
            ES
          </span>
          <span>
            <strong className="block text-sm tracking-[0.22em] text-white">EXTREME STUDIOS</strong>
            <span className="text-xs font-medium text-slate-400">Digital Product Ecosystem</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          <a className="hover:text-white" href="#featured">Featured</a>
          <a className="hover:text-white" href="#projects">Projects</a>
          <a className="hover:text-white" href="#system">System</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>

        <a
          href="https://wa.me/6289677523666"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-glow transition hover:bg-blue-400"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}
