"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DianaChat from "@/components/DianaChat";

const steps = [
  ["01", "Pilih konsep", "Kami pelajari brand, paket layanan, dan gaya visual MUA Anda."],
  ["02", "Website dibangun", "Portfolio, informasi paket, chat assistant, dan flow booking disusun."],
  ["03", "Siap menerima client", "Website live dan siap dibagikan dari bio Instagram atau iklan."]
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openDiana() {
  window.dispatchEvent(new CustomEvent("open-diana", { detail: "mua" }));
}

function MuaDiana({ config }) {
  const [messages, setMessages] = useState([
    { role: "diana", text: "Halo Kak, saya Diana. Mau lihat cara website ini bantu bisnis MUA?" }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function send(event) {
    event.preventDefault();
    const question = input.trim();
    if (!question || sending) return;
    setMessages((items) => [...items, { role: "visitor", text: question }]);
    setInput("");
    setSending(true);
    try {
      const response = await fetch("/api/diana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, vertical: config.slug })
      });
      const result = await response.json();
      setMessages((items) => [...items, { role: "diana", text: result.answer || "Maaf, saya belum dapat menjawab." }]);
    } catch {
      setMessages((items) => [...items, { role: "diana", text: "Koneksi Diana sedang tidak tersedia." }]);
    } finally {
      setSending(false);
    }
  }

  return <section id="diana-mua" className="mua-diana glass">
    <div className="mua-diana__head"><span className="mua-diana__avatar">D</span><span><b>DIANA</b><small><i /> AI assistant khusus MUA</small></span><em>ONLINE</em></div>
    <div className="mua-diana__messages" aria-live="polite">
      {messages.map((message, index) => <p key={`${message.role}-${index}`} className={`mua-message mua-message--${message.role}`}>{message.text}</p>)}
      {sending && <p className="mua-diana__typing">Diana sedang menyiapkan jawaban...</p>}
    </div>
    <div className="mua-diana__chips"><button onClick={() => setInput("Berapa harga website MUA ini?")}>Harga promo</button><button onClick={() => setInput("Apa saja fitur website MUA?")}>Lihat fitur</button></div>
    <form onSubmit={send} className="mua-diana__form"><input value={input} onChange={(event) => setInput(event.target.value)} maxLength={400} placeholder="Tanya Diana tentang website MUA..." /><button disabled={!input.trim() || sending} aria-label="Kirim pertanyaan">↗</button></form>
  </section>;
}

function BookingDemo({ config }) {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(config.demoServices[0]);
  const [date, setDate] = useState("");
  const [packageName, setPackageName] = useState(config.demoPackages[0].name);
  const [booked, setBooked] = useState(false);
  const unavailable = date && config.calendarRules.unavailableDays.includes(Number(date.slice(-2)));
  const selectedPackage = config.demoPackages.find((item) => item.name === packageName);
  const label = ["Jenis acara", "Tanggal acara", "Pilih paket", "Data calon pengantin"][step];

  function next() {
    if (step === 1 && (!date || unavailable)) return;
    setStep((current) => Math.min(current + 1, 3));
  }

  return <section id="demo" className="mua-section mua-demo-section"><div className="mua-section__heading"><p>Live demo</p><h2>Coba sebagai calon pengantin.</h2><span>Demo ini tidak mengirim booking ke sistem produksi.</span></div><div className="mua-booking-demo glass">
    <aside className="mua-booking-demo__aside"><small>DEMO WEBSITE MUA</small><h3>Booking makeup<br />jadi lebih rapi.</h3><div className="mua-booking-demo__progress">{["Acara", "Tanggal", "Paket", "Data"].map((item, index) => <span key={item} className={index <= step ? "active" : ""}>{index + 1}<i>{item}</i></span>)}</div><p>Calon client mengisi kebutuhan terlebih dahulu. Anda tinggal follow-up yang sudah siap booking.</p></aside>
    <div className="mua-booking-demo__content"><div className="mua-demo-label">Langkah {step + 1}/4 · {label}</div>
      {step === 0 && <div className="mua-option-grid">{config.demoServices.map((item) => <button className={service === item ? "selected" : ""} key={item} onClick={() => setService(item)}><b>{item}</b><small>Pilih layanan</small></button>)}</div>}
      {step === 1 && <div className="mua-date-demo"><input type="date" value={date} onChange={(event) => setDate(event.target.value)} /><div className={date ? (unavailable ? "unavailable" : "available") : "hint"}>{!date ? "Pilih tanggal untuk cek jadwal" : unavailable ? "Tanggal ini sudah terisi. Coba 11, 13, atau 14 Oktober." : `${date} tersedia untuk booking.`}</div><small>Demo kalender: tanggal 12, 18, dan 26 dianggap sudah terisi.</small></div>}
      {step === 2 && <div className="mua-package-list">{config.demoPackages.map((item) => <button key={item.name} className={packageName === item.name ? "selected" : ""} onClick={() => setPackageName(item.name)}><span><b>{item.name}</b><small>{item.note}</small></span><strong>{item.price}</strong></button>)}</div>}
      {step === 3 && !booked && <form className="mua-demo-form" onSubmit={(event) => { event.preventDefault(); setBooked(true); }}><input required placeholder="Nama calon pengantin" /><input required type="tel" placeholder="Nomor WhatsApp" /><input required placeholder="Lokasi acara" /><select defaultValue=""><option value="" disabled>Jumlah orang yang dimakeup</option><option>1 orang</option><option>2–4 orang</option><option>5+ orang</option></select><textarea placeholder="Catatan kebutuhan (opsional)" /><button className="mua-button mua-button--primary">Booking demo</button></form>}
      {step === 3 && booked && <div className="mua-demo-success"><span>✓</span><h3>Booking demo tersimpan.</h3><p>Ini hanya simulasi. Data tidak dikirim ke sistem produksi.</p><button onClick={() => { setStep(0); setBooked(false); setDate(""); }} className="mua-text-button">Ulangi demo</button></div>}
      {step < 3 && <div className="mua-demo-next"><span>{step === 0 && `Layanan: ${service}`}{step === 1 && (!date ? "Pilih tanggal dulu untuk lanjut" : unavailable ? "Pilih tanggal lain" : `Tanggal ${date} tersedia`)}{step === 2 && `${selectedPackage?.name} · ${selectedPackage?.price}`}</span><button onClick={next} disabled={step === 1 && (!date || unavailable)} className="mua-button mua-button--primary">{step === 0 ? "Pilih Tanggal" : step === 1 ? "Pilih Paket" : "Isi Data Booking"} <b>→</b></button></div>}
    </div>
  </div></section>;
}

function CalendarPreview({ config }) {
  const [day, setDay] = useState(12);
  const filled = config.calendarRules.unavailableDays.includes(day);
  return <section className="mua-section"><div className="mua-calendar-card glass"><div><p className="mua-kicker">Google Calendar ready</p><h2>Jadwal tidak perlu dicek manual satu-satu.</h2><p className="mua-muted">Untuk awal, website memakai logika kalender demo. Saat client live, struktur ini bisa dihubungkan ke Google Calendar milik MUA.</p><div className="mua-calendar-answer"><i className={filled ? "busy" : "free"} />{filled ? `${day} Oktober sudah terisi. Pilihan terdekat: ${day - 1}, ${day + 1}, ${day + 2} Oktober.` : `${day} Oktober tersedia untuk booking.`}</div></div><div className="mua-calendar"><div className="mua-calendar__header"><span>OKTOBER 2026</span><b>‹ &nbsp; ›</b></div><div className="mua-calendar__week">{["S","S","R","K","J","S","M"].map((item,index) => <span key={index}>{item}</span>)}</div><div className="mua-calendar__days">{Array.from({ length: 31 }, (_, index) => index + 1).map((item) => <button onClick={() => setDay(item)} key={item} className={`${day === item ? "current " : ""}${config.calendarRules.unavailableDays.includes(item) ? "busy" : ""}`}>{item}</button>)}</div><small><i /> tersedia <i className="busy" /> terisi</small></div></div></section>;
}

export default function VerticalLanding({ config }) {
  const [openFaq, setOpenFaq] = useState(0);
  const featureRows = useMemo(() => config.features, [config.features]);
  return <main className="mua-page"><Navbar hideLinks /><DianaChat vertical={config.slug} />
    <section id="home" className="mua-hero"><div className="mua-hero__glow" /><div className="mua-wrap mua-hero__grid"><div className="mua-hero__copy"><p className="mua-kicker">EXTREME STUDIOS / WEBSITE SOLUTION</p><div className="mua-hero__badge">{config.badge}</div><h1>{config.hero.title}</h1><p className="mua-hero__subtitle">{config.hero.subtitle}</p><div className="mua-price"><small>PROMO</small><strong>{config.price}</strong><span>Website siap membantu Anda menerima calon client.</span></div><div className="mua-actions"><button onClick={openDiana} className="mua-button mua-button--primary">Buka Chat Diana <b>→</b></button><button onClick={() => scrollToId("demo")} className="mua-button mua-button--secondary">Mulai Demo Booking</button></div></div><div className="mua-hero__visual"><div className="mua-device float-slow"><div className="mua-device__bar"><i /><i /><i /><span>yourmuastudio.com</span></div><div className="mua-device__screen"><div className="mua-device__nav"><b>YOUR MUA</b><small>Home · Portfolio · Paket · Booking</small></div><div className="mua-device__cover"><span>BRIDAL<br />BEAUTY</span><i>Makeup that feels like you.</i></div><div className="mua-device__cards"><b>Portfolio terbaru</b><span /><span /><span /></div></div></div><div className="mua-mini-chat"><img src="/diana-cs-avatar.png" alt="Avatar Diana" /><div><b>Chat Assistant</b><p>Halo Kak, mau cek paket bridal?</p></div><i>●</i></div><div className="mua-float-card"><small>BOOKING</small><b>12 Okt</b><span>Jadwal terisi</span></div></div></div></section>

    <section className="mua-section mua-visual-section"><div className="mua-wrap mua-visual-grid"><div className="mua-visual-copy"><p className="mua-kicker">WEBSITE + CHAT ASSISTANT</p><h2>Website bekerja saat Anda sedang makeup.</h2><p className="mua-muted">Satu tampilan yang menjelaskan layanan, menampilkan portfolio, membantu calon client bertanya, lalu mengarahkan mereka masuk ke alur booking.</p><div className="mua-stat-row"><span><b>24/7</b><small>Assistant menjawab</small></span><span><b>1</b><small>alur booking</small></span><span><b>∞</b><small>portfolio tampil</small></span></div></div><div className="mua-chat-preview"><div className="mua-chat-preview__top"><span>✦</span><b>Chat Assistant</b><small>Teman konsultasi MUA kamu</small></div><div className="mua-chat-preview__bubble mua-chat-preview__bubble--visitor">Kak, paket wedding berapa ya?</div><div className="mua-chat-preview__bubble">Untuk informasi paket wedding, tersedia Silver, Gold, hingga Platinum. Bisa disesuaikan dengan kebutuhan kamu.</div><div className="mua-chat-preview__bubble mua-chat-preview__bubble--visitor">Tanggal 12 Oktober masih tersedia?</div><div className="mua-chat-preview__bubble">Chat assistant bisa bantu cek jadwal dan mengarahkan calon client ke booking.</div><div className="mua-chat-preview__input">Ketik pesanmu di sini... <b>↗</b></div></div></div></section>

    <section className="mua-section"><div className="mua-wrap"><div className="mua-section__heading"><p>Apa yang didapat</p><h2>Semua yang dibutuhkan untuk menerima booking lebih rapi.</h2></div><div className="mua-feature-grid">{featureRows.map(([icon, title, body]) => <article className="mua-feature glass" key={title}><span>{icon}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section className="mua-section mua-process"><div className="mua-wrap"><div className="mua-section__heading"><p>Cara kerja</p><h2>Dari Instagram ke booking dalam satu alur.</h2></div><div className="mua-steps">{steps.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
    <div className="mua-wrap"><BookingDemo config={config} /><CalendarPreview config={config} /></div>
    <section className="mua-section"><div className="mua-wrap"><div className="mua-price-card glass"><div><p className="mua-kicker">Harga promo</p><h2>Website MUA yang siap jadi front desk digital Anda.</h2><p className="mua-muted">Mulai dari portfolio sampai AI assistant dan booking flow dalam satu paket.</p></div><div className="mua-price-card__right"><small>PROMO</small><strong>{config.price}</strong><span>Domain .com 1 tahun termasuk</span><button onClick={openDiana} className="mua-button mua-button--primary">Buka Chat Diana <b>→</b></button></div></div></div></section>
    <section className="mua-section"><div className="mua-wrap mua-faq"><div className="mua-section__heading"><p>FAQ</p><h2>Pertanyaan yang sering ditanyakan.</h2></div>{config.faq.map(([question, answer], index) => <article className={openFaq === index ? "open" : ""} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>
    <section className="mua-final"><div className="mua-wrap"><p className="mua-kicker">EXTREME STUDIOS FOR MUA</p><h2>Siap punya website yang membantu Anda menerima client?</h2><p>Mulai dengan bertanya ke Diana. Semua pertanyaan awal tentang paket MUA dijawab langsung di halaman ini.</p><button onClick={openDiana} className="mua-button mua-button--primary">Buka Chat Diana <b>→</b></button></div></section>
    <Footer />
  </main>;
}
