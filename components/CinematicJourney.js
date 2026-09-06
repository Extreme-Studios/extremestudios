"use client";

import { useEffect, useRef, useState } from "react";

const capabilityCards = [
  ["01", "AI Engineering", "AI Assistant · Automation · Integration", "✦"],
  ["02", "Web Development", "Web Builder · Marketplace · Landing Page", "⌘"],
  ["03", "Software Development", "Custom Software · Internal Tools", "▣"],
  ["04", "Android Development", "Business · Education · Custom App", "◌"]
];

const projects = [
  ["DIANA", "Smart Assistant", "AI Engineering", "/generated-diana-ai.png"],
  ["GUITAR FX", "Android Product", "Audio Technology", "/featured/guitar-fx.png"],
  ["MOVIE HUB", "Mobile Product", "Entertainment", "/featured/movie-hub.png"]
];

function FloatingSystem({ type }) {
  if (type === "studio") return <div className="journey-system journey-system--studio"><span className="journey-orbit journey-orbit--one" /><span className="journey-orbit journey-orbit--two" /><div className="journey-system__core">ES<small>STUDIO</small></div><div className="journey-note journey-note--top">IDEA → ENGINEERING</div><div className="journey-note journey-note--bottom">PRODUCT / LIVE</div></div>;
  if (type === "capabilities") return <div className="journey-system journey-system--capabilities">{capabilityCards.map(([index, title, body, icon], cardIndex) => <article className={`journey-capability journey-capability--${cardIndex + 1}`} key={title}><small>{index}</small><i>{icon}</i><strong>{title}</strong><span>{body}</span></article>)}</div>;
  if (type === "web") return <div className="journey-system journey-system--web"><div className="journey-browser"><div><i /><i /><i /><span>yourbrand.com</span></div><section><small>YOUR NEXT WEBSITE</small><b>MAKE IT<br />MEMORABLE.</b><span>Strategy · Design · Build</span></section></div><div className="journey-float-panel journey-float-panel--chat"><b>Chat Assistant</b><span>Ready to help your client</span><i>●</i></div><div className="journey-float-panel journey-float-panel--price"><small>START FROM</small><b>Rp1 jt</b></div></div>;
  if (type === "projects") return <div className="journey-system journey-system--projects">{projects.map(([label, title, category, image], cardIndex) => <article className={`journey-project journey-project--${cardIndex + 1}`} key={label}><img src={image} alt="" /><div><small>{category}</small><b>{label}<br />{title}</b></div></article>)}</div>;
  return <div className="journey-system journey-system--program"><div className="journey-program-image"><img src="/umkm-naik-kelas-workshop.png" alt="" /></div><div className="journey-program-chip journey-program-chip--one"><small>AI EDUCATION</small><b>AI Engineer<br />Basic</b></div><div className="journey-program-chip journey-program-chip--two"><small>UMKM WORKSHOP</small><b>Naik Kelas<br />Digital</b></div></div>;
}

const stages = [
  { id: "profile", kicker: "01 / EXTREME STUDIOS", title: <>Teknologi yang<br /><em>punya arah.</em></>, body: "Kami mengubah ide menjadi AI, website, software, aplikasi Android, dan produk digital yang siap dipakai.", link: ["Lihat Profile Lengkap", "/profile"], type: "studio" },
  { id: "services", kicker: "02 / WHAT WE BUILD", title: <>Bukan hanya<br /><em>tampilan.</em></>, body: "Setiap produk dibangun untuk membantu bisnis, komunitas, dan kreator bekerja lebih jelas, lebih cepat, dan lebih siap berkembang.", link: ["Lihat Semua Layanan", "/#contact"], type: "capabilities" },
  { id: "web-builder", kicker: "03 / WEB DEVELOPMENT", title: <>Website yang<br /><em>bekerja.</em></>, body: "Landing page, website interaktif, marketplace, web chatbot, dan web application untuk membuat brand lebih dipercaya dan lebih mudah dihubungi.", link: ["Konsultasikan Website", "/#contact"], type: "web" },
  { id: "projects", kicker: "04 / SELECTED WORK", title: <>Produk nyata.<br /><em>Dampak nyata.</em></>, body: "Dari AI assistant sampai aplikasi Android dan platform digital, setiap project dibuat untuk menyelesaikan kebutuhan yang jelas.", link: ["Lihat Semua Project", "/projects"], type: "projects" },
  { id: "programs", kicker: "05 / LEARN & GROW", title: <>Belajar untuk<br /><em>bergerak maju.</em></>, body: "Program AI Engineer Basic dan Workshop UMKM Naik Kelas membantu manusia dan bisnis memanfaatkan teknologi secara praktis.", link: ["Tanya Informasi Program", "/#contact"], type: "program" }
];

export default function CinematicJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.index));
    }, { threshold: [0.35, 0.55, 0.75] });
    refs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <section className="cinematic-journey" aria-label="Extreme Studios journey">
    <div className="cinematic-journey__rail"><span /><span /><span /><span /><span /></div>
    {stages.map((stage, index) => <article id={stage.id} data-index={index} ref={(element) => { refs.current[index] = element; }} className={`journey-stage ${active === index ? "journey-stage--active" : ""}`} key={stage.id}>
      <div className="journey-stage__copy"><p>{stage.kicker}</p><h2>{stage.title}</h2><span className="journey-stage__number">0{index + 1}</span><div className="journey-stage__line" /><p className="journey-stage__body">{stage.body}</p><a href={stage.link[1]} className="journey-stage__link">{stage.link[0]} <b>→</b></a></div>
      <div className="journey-stage__visual"><FloatingSystem type={stage.type} /></div>
    </article>)}
  </section>;
}
