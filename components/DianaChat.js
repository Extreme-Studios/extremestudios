"use client";

import { useEffect, useRef, useState } from "react";

export default function DianaChat({ vertical = "", displayName = "DIANA" }) {
  const isMua = vertical === "mua";
  const assistantName = displayName || "DIANA";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "diana", text: isMua ? `Halo Kak, saya ${assistantName}. Mau tahu harga dan cara order Website MUA?` : `Halo, saya ${assistantName}. Ada yang ingin ditanyakan?` }]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const orderUrl = "https://wa.me/6289677523666?text=Halo%20Extreme%20Studios,%20saya%20berminat%20order%20Website%20MUA%20%2B%20AI%20Assistant.";

  useEffect(() => {
    function openFromCta(event) {
      const requestedVertical = typeof event.detail === "object" ? event.detail?.vertical : event.detail;
      if (!requestedVertical || requestedVertical === vertical) setIsOpen(true);
    }
    window.addEventListener("open-diana", openFromCta);
    return () => window.removeEventListener("open-diana", openFromCta);
  }, [vertical]);
  const inputRef = useRef(null);

  async function sendMessage(event) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isSending) return;

    setMessages((current) => [...current, { role: "visitor", text: question }]);
    setInput("");
    setIsSending(true);
    const questionCount = messages.filter((message) => message.role === "visitor").length + 1;

    try {
      const response = await fetch("/api/diana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, vertical })
      });
      const result = await response.json();
      setMessages((current) => {
        const next = [...current, { role: "diana", text: result.answer || "Maaf, DIANA belum bisa menjawab." }];
        if (isMua && questionCount === 3) next.push({ role: "diana", text: "Kalau Kakak berminat, silakan klik tombol order. Kalau masih ingin bertanya, lanjutkan chat di sini.", action: "order" });
        return next;
      });
    } catch {
      setMessages((current) => [
        ...current,
        { role: "diana", text: `Koneksi ${assistantName} sedang tidak tersedia.` }
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <aside id="diana" className={`diana-chat ${isMua ? "diana-chat--mua" : ""} ${isOpen ? "diana-chat--open" : ""}`} aria-label={`Chat dengan ${assistantName}`}>
      {isOpen && (
        <section className="diana-chat__panel" aria-live="polite">
          <header className="diana-chat__header">
            <div className="diana-chat__identity">
              <img className="diana-chat__avatar" src="/diana-cs-avatar.png" alt={`Avatar ${assistantName}`} />
              <span><strong>{assistantName}</strong><small><i /> Online assistant</small></span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Tutup chat DIANA">×</button>
          </header>
          <div className="diana-chat__intro">
            <span>EXTREME STUDIOS / AI ASSISTANT</span>
            <p>{isMua ? "Tanya harga, fitur, dan cara order Website MUA." : "Tanya layanan atau project kami."}</p>
          </div>
          <div className="diana-chat__messages">
            {messages.map((message, index) => (
              <div className={`diana-chat__message-wrap diana-chat__message-wrap--${message.role}`} key={`${message.role}-${index}`}><p className={`diana-chat__message diana-chat__message--${message.role}`}>{message.text}</p>{message.action === "order" && <a className="diana-chat__order" href={orderUrl} target="_blank" rel="noreferrer">Order via WhatsApp <b>↗</b></a>}</div>
            ))}
            {isSending && <p className="diana-chat__typing">{assistantName} sedang mengetik<span>...</span></p>}
          </div>
          <form className="diana-chat__form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="diana-message">Pesan untuk DIANA</label>
            <input
              id="diana-message"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={isMua ? "Tanya order Website MUA..." : "Tulis pertanyaan..."}
              maxLength={400}
            />
            <button type="submit" disabled={!input.trim() || isSending} aria-label="Kirim pesan">↗</button>
          </form>
          <p className="diana-chat__note">{isMua ? "Diana membantu menjelaskan paket dan proses order." : "Pertanyaan di luar konteks diteruskan ke admin."}</p>
        </section>
      )}
      <button
        type="button"
        className="diana-chat__launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="diana-chat__pulse" />
        <img className="diana-chat__launcher-icon" src="/diana-cs-avatar.png" alt="" />
        <span><strong>{assistantName}</strong><small>AI assistant</small></span>
      </button>
    </aside>
  );
}
