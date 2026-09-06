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
  ["GUITAR FX", "Android Product", "Audio Technology", "/featured/guitar-fx.png"]
];

const parfiScreens = [
  ["/project-parfi-jatim/parfi-home.png", "Beranda website PARFI Jatim"],
  ["/project-parfi-jatim/parfi-news.png", "Portal berita PARFI Jatim"],
  ["/project-parfi-jatim/parfi-agenda.png", "Agenda kegiatan organisasi"],
  ["/project-parfi-jatim/parfi-film-gallery.png", "Galeri film PARFI Jatim"]
];

function FloatingSystem({ type }) {
  if (type === "studio") return <div className="journey-system journey-system--studio"><span className="journey-orbit journey-orbit--one" /><span className="journey-orbit journey-orbit--two" /><div className="journey-system__core">ES<small>STUDIO</small></div><div className="journey-note journey-note--top">IDEA → ENGINEERING</div><div className="journey-note journey-note--bottom">PRODUCT / LIVE</div></div>;
  if (type === "capabilities") return <div className="journey-system journey-system--capabilities">{capabilityCards.map(([index, title, body, icon], cardIndex) => <article className={`journey-capability journey-capability--${cardIndex + 1}`} key={title}><small>{index}</small><i>{icon}</i><strong>{title}</strong><span>{body}</span></article>)}</div>;
  if (type === "web") return <div className="journey-system journey-system--web"><div className="journey-browser"><div><i /><i /><i /><span>yourbrand.com</span></div><section><small>YOUR NEXT WEBSITE</small><b>MAKE IT<br />MEMORABLE.</b><span>Strategy · Design · Build</span></section></div><div className="journey-float-panel journey-float-panel--chat"><b>Chat Assistant</b><span>Ready to help your client</span><i>●</i></div><div className="journey-float-panel journey-float-panel--price"><small>START FROM</small><b>Rp1 jt</b></div></div>;
  if (type === "projects") return <div className="journey-system journey-system--projects"><a href="/projects/web-parfi-jatim" className="journey-parfi-showcase"><div className="journey-parfi-showcase__gallery">{parfiScreens.map(([image, alt]) => <img key={image} src={image} alt={alt} />)}</div><div className="journey-parfi-showcase__copy"><small>WEB PROJECT · ORGANIZATION PORTAL</small><b>Website Resmi<br />PARFI Jatim</b><span>Berita · Agenda · Galeri Film</span></div></a>{projects.map(([label, title, category, image], cardIndex) => <article className={`journey-project journey-project--${cardIndex + 1}`} key={label}><img src={image} alt="" /><div><small>{category}</small><b>{label}<br />{title}</b></div></article>)}</div>;
  return <div className="journey-system journey-system--program"><div className="journey-program-image"><img src="/umkm-naik-kelas-workshop.png" alt="" /></div><div className="journey-program-chip journey-program-chip--one"><small>AI EDUCATION</small><b>AI Engineer<br />Basic</b></div><div className="journey-program-chip journey-program-chip--two"><small>UMKM WORKSHOP</small><b>Naik Kelas<br />Digital</b></div></div>;
}

function MatrixNeuronField() {
  const nodes = [[104,92],[238,163],[406,77],[570,188],[747,106],[897,246],[143,369],[332,292],[515,410],[697,332],[878,460],[84,588],[263,505],[440,666],[627,541],[809,678],[940,572],[157,812],[369,735],[560,897],[752,799],[906,956],[105,1082],[298,1210],[486,1098],[682,1260],[860,1143],[959,1374],[176,1450],[394,1342],[575,1511],[760,1420],[910,1646],[102,1778],[306,1670],[502,1872],[700,1730],[868,1950],[950,2110],[188,2210],[416,2070],[621,2290],[810,2168],[920,2410]];
  return <div className="journey-matrix-field" aria-hidden="true">
    <svg viewBox="0 0 1000 2500" preserveAspectRatio="none">
      <defs><linearGradient id="matrixFlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#56f0ff" /><stop offset=".48" stopColor="#8e67ff" /><stop offset="1" stopColor="#f08fe8" /></linearGradient></defs>
      <g className="journey-matrix-field__far"><path d="M0 104 L238 163 L406 77 L570 188 L747 106 L1000 222 M0 580 L263 505 L440 666 L627 541 L809 678 L1000 570 M0 1085 L298 1210 L486 1098 L682 1260 L860 1143 L1000 1370 M0 1775 L306 1670 L502 1872 L700 1730 L868 1950 L1000 2115 M0 2208 L188 2210 L416 2070 L621 2290 L810 2168 L1000 2410" /></g>
      <g className="journey-matrix-field__near"><path d="M104 92 L143 369 L263 505 L157 812 L298 1210 L176 1450 L306 1670 L188 2210 M406 77 L332 292 L515 410 L440 666 L486 1098 L394 1342 L502 1872 L416 2070 M747 106 L697 332 L878 460 L809 678 L860 1143 L760 1420 L868 1950 L810 2168 M897 246 L940 572 L906 956 L959 1374 L910 1646 L950 2110 L920 2410" /></g>
      <g className="journey-matrix-field__nodes">{nodes.map(([cx, cy], index) => <circle cx={cx} cy={cy} r={index % 5 === 0 ? 7 : 3.5} key={`${cx}-${cy}`} />)}</g>
    </svg>
    <span className="journey-matrix-field__pulse journey-matrix-field__pulse--one" /><span className="journey-matrix-field__pulse journey-matrix-field__pulse--two" /><span className="journey-matrix-field__pulse journey-matrix-field__pulse--three" />
  </div>;
}

const stages = [
  { id: "profile", kicker: "01 / EXTREME STUDIOS", title: <>Teknologi yang<br /><em>punya arah.</em></>, body: "Kami mengubah ide menjadi AI, website, software, aplikasi Android, dan produk digital yang siap dipakai.", link: ["Lihat Profile Lengkap", "/profile"], type: "studio" },
  { id: "services", kicker: "02 / WHAT WE BUILD", title: <>Bukan hanya<br /><em>tampilan.</em></>, body: "Setiap produk dibangun untuk membantu bisnis, komunitas, dan kreator bekerja lebih jelas, lebih cepat, dan lebih siap berkembang.", link: ["Lihat Semua Layanan", "/#contact"], type: "capabilities" },
  { id: "web-builder", kicker: "03 / WEB DEVELOPMENT", title: <>Website yang<br /><em>bekerja.</em></>, body: "Landing page, website interaktif, marketplace, web chatbot, dan web application untuk membuat brand lebih dipercaya dan lebih mudah dihubungi.", link: ["Konsultasikan Website", "/#contact"], type: "web" },
  { id: "projects", kicker: "04 / SELECTED WORK", title: <>Produk nyata.<br /><em>Dampak nyata.</em></>, body: "Dari website organisasi responsif sampai AI assistant dan aplikasi Android, setiap project dibuat untuk menyelesaikan kebutuhan yang jelas.", link: ["Lihat Semua Project", "/projects"], type: "projects" },
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

  // The scenes are driven by the physical scroll position, not a timed animation.
  // A card therefore travels through depth as the visitor moves to the next section.
  useEffect(() => {
    let animationFrame;

    const clamp = (value) => Math.min(1, Math.max(0, value));
    const paintScenes = () => {
      const viewport = window.innerHeight || 1;
      refs.current.forEach((element) => {
        if (!element) return;
        const bounds = element.getBoundingClientRect();
        const travel = clamp((viewport - bounds.top) / (viewport + bounds.height));
        const enter = clamp(travel * 2.15);
        const exit = clamp((travel - 0.47) * 2.15);
        element.style.setProperty("--scene-enter", enter.toFixed(3));
        element.style.setProperty("--scene-exit", exit.toFixed(3));
        element.style.setProperty("--scene-travel", travel.toFixed(3));
      });
      animationFrame = undefined;
    };
    const schedulePaint = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(paintScenes);
    };
    paintScenes();
    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", schedulePaint);
    return () => {
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", schedulePaint);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <section className="cinematic-journey" aria-label="Extreme Studios journey">
    <div className="cinematic-journey__rail"><span /><span /><span /><span /><span /></div>
    {stages.map((stage, index) => <article id={stage.id} data-index={index} ref={(element) => { refs.current[index] = element; }} style={{ "--scene-enter": index === 0 ? 1 : 0, "--scene-exit": 0, "--scene-travel": index === 0 ? 0.5 : 0 }} className={`journey-stage ${active === index ? "journey-stage--active" : ""}`} key={stage.id}>
      <div className="journey-stage__copy"><p>{stage.kicker}</p><h2>{stage.title}</h2><span className="journey-stage__number">0{index + 1}</span><div className="journey-stage__line" /><p className="journey-stage__body">{stage.body}</p><a href={stage.link[1]} className="journey-stage__link">{stage.link[0]} <b>→</b></a></div>
      <div className="journey-stage__visual"><div className="journey-stage__orbit" aria-hidden="true"><i /><i /><i /></div><div className="journey-stage__warp" aria-hidden="true"><i /><i /><i /></div><FloatingSystem type={stage.type} /></div>
    </article>)}
  </section>;
}
