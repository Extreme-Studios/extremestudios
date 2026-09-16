"use client";

import { useEffect, useState } from "react";

export default function DriveMediaGallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    fetch("/api/media")
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (active && payload?.ok && Array.isArray(payload.items)) setItems(payload.items);
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  if (!items.length) return null;
  return (
    <section className="mt-16 border-t border-cyan/20 pt-12">
      <p className="eyebrow">Drive Gallery</p>
      <h2 className="mt-4 text-3xl font-medium text-white md:text-4xl">Visual terbaru dari Extreme Studios.</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id || item.url} className="project-card overflow-hidden">
            <div className="project-visual"><img src={item.url} alt={item.alt || item.title || "Media Extreme Studios"} /></div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-cyan">{item.category || "Portfolio"}</p>
              <h3 className="mt-2 text-lg font-medium text-white">{item.title || "Visual terbaru"}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
