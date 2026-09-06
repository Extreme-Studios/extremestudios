"use client";

import { useEffect, useRef } from "react";

function CinematicStage() {
  return <div className="cinematic-stage" aria-hidden="true">
    <div className="cinematic-stage__aurora" />
    <div className="cinematic-stage__mist cinematic-stage__mist--one" />
    <div className="cinematic-stage__mist cinematic-stage__mist--two" />
    <div className="cinematic-stage__stars">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
    <div className="cinematic-stage__portal"><span /><span /><span /></div>
    <div className="cinematic-stage__core"><b>ES</b><small>BUILD / 01</small></div>
    <div className="cinematic-card cinematic-card--ai"><small>01 / AI SYSTEMS</small><strong>INTELLIGENT<br />SYSTEMS</strong><i>↗</i></div>
    <div className="cinematic-card cinematic-card--web"><small>02 / WEB DEVELOPMENT</small><strong>DIGITAL<br />EXPERIENCES</strong><i>◌</i></div>
    <div className="cinematic-card cinematic-card--android"><small>03 / ANDROID</small><strong>MOBILE<br />PRODUCTS</strong><i>⌁</i></div>
    <div className="cinematic-stage__floor" />
  </div>;
}

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let frame = 0;
    const paint = () => {
      const bounds = section.getBoundingClientRect();
      const exit = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height * .72)));
      section.style.setProperty("--hero-exit", exit.toFixed(4));
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <section id="home" ref={sectionRef} style={{ "--hero-exit": 0 }} className="hero-shell hero-shell--cinematic"><div className="mx-auto grid min-h-[720px] max-w-6xl items-center gap-6 px-5 py-28 md:grid-cols-[.86fr_1.14fr] md:px-8 md:py-28"><div className="hero-copy"><p className="hero-copy__index">01 — BUILD WITH INTENTION</p><h1>Build <span>with</span> Clarity.</h1><p className="hero-copy__lead">AI systems, web development, software, and Android products.</p><div className="hero-copy__rule" /><p className="hero-copy__body">Kami membantu merancang, membangun, dan menyempurnakan AI, website, software, aplikasi Android, serta sistem digital yang memberi dampak nyata.</p><div className="mt-8 flex flex-wrap gap-4"><a href="#profile" className="button-primary">Cara kami bekerja <b>→</b></a><a href="#projects" className="button-secondary">Lihat Project <b>→</b></a></div></div><CinematicStage /></div><div className="hero-shell__scroll">SCROLL TO EXPLORE <span>↓</span></div></section>;
}
