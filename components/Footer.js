export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 text-sm text-slate-400 md:flex-row md:items-end">
        <div><p className="font-black tracking-[.18em] text-white">EXTREME STUDIOS</p><p className="mt-2">AI Engineering · Android Development · AI Education</p><p className="mt-1 text-neon">Learn • Create • Build with AI</p></div>
        <a href="https://wa.me/6289677523666" target="_blank" rel="noreferrer" className="font-bold text-white transition hover:text-neon">WhatsApp 089677523666</a>
      </div>
    </footer>
  );
}
