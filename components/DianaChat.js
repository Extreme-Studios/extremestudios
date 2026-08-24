"use client";

import { useRef, useState } from "react";

const welcomeMessage = {
  role: "diana",
  text: "Halo, saya DIANA. Ada yang ingin ditanyakan?"
};

export default function DianaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);

  async function sendMessage(event) {
    event.preventDefault();
    const question = input.trim();
    if (!question || isSending) return;

    setMessages((current) => [...current, { role: "visitor", text: question }]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/diana", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question })
      });
      const result = await response.json();
      setMessages((current) => [
        ...current,
        { role: "diana", text: result.answer || "Maaf, DIANA belum bisa menjawab." }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: "diana", text: "Koneksi DIANA sedang tidak tersedia." }
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <aside id="diana" className={`diana-chat ${isOpen ? "diana-chat--open" : ""}`} aria-label="Chat dengan DIANA">
      {isOpen && (
        <section className="diana-chat__panel" aria-live="polite">
          <header className="diana-chat__header">
            <div className="diana-chat__identity">
              <img className="diana-chat__avatar" src="/diana-cs-avatar.png" alt="Avatar DIANA" />
              <span><strong>DIANA</strong><small><i /> Online assistant</small></span>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Tutup chat DIANA">×</button>
          </header>
          <div className="diana-chat__intro">
            <span>EXTREME STUDIOS / AI ASSISTANT</span>
            <p>Tanya layanan atau project kami.</p>
          </div>
          <div className="diana-chat__messages">
            {messages.map((message, index) => (
              <p className={`diana-chat__message diana-chat__message--${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </p>
            ))}
            {isSending && <p className="diana-chat__typing">DIANA sedang mengetik<span>...</span></p>}
          </div>
          <form className="diana-chat__form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="diana-message">Pesan untuk DIANA</label>
            <input
              id="diana-message"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tulis pertanyaan..."
              maxLength={400}
            />
            <button type="submit" disabled={!input.trim() || isSending} aria-label="Kirim pesan">↗</button>
          </form>
          <p className="diana-chat__note">Pertanyaan di luar konteks diteruskan ke admin.</p>
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
        <span><strong>Tanya DIANA</strong><small>AI assistant</small></span>
      </button>
    </aside>
  );
}
