"use client";

import { useEffect, useRef, useState } from "react";

export default function DianaChat({ vertical = "", displayName = "DIANA" }) {
  const isMua = vertical === "mua";
  const assistantName = displayName || "DIANA";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "diana", text: isMua ? `Halo Kak, saya ${assistantName}. Mau tahu harga dan cara order Website MUA?` : `Halo, saya ${assistantName}. Ada yang ingin ditanyakan?` }]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
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
  const dragRef = useRef(null);
  const draggedRef = useRef(false);

  useEffect(() => {
    if (isMua) return undefined;
    const onMove = (event) => moveDrag(event);
    const onEnd = (event) => endDrag(event);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  });

  function startDrag(event) {
    if (isMua || event.button !== 0) return;
    const bounds = event.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, offsetX: event.clientX - bounds.left, offsetY: event.clientY - bounds.top, width: bounds.width, height: bounds.height };
    draggedRef.current = false;
    setIsDragging(true);
  }

  function moveDrag(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (Math.abs(event.clientX - drag.startX) + Math.abs(event.clientY - drag.startY) > 4) draggedRef.current = true;
    const maxX = Math.max(8, window.innerWidth - drag.width - 8);
    const maxY = Math.max(8, window.innerHeight - drag.height - 8);
    setPosition({ x: Math.min(maxX, Math.max(8, event.clientX - drag.offsetX)), y: Math.min(maxY, Math.max(8, event.clientY - drag.offsetY)) });
  }

  function endDrag(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    window.setTimeout(() => { draggedRef.current = false; }, 0);
  }

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
    <aside id="diana" style={position && !isMua ? { left: position.x, top: position.y, right: "auto", bottom: "auto" } : undefined} className={`diana-chat ${isMua ? "diana-chat--mua" : ""} ${isOpen ? "diana-chat--open" : ""} ${isDragging ? "diana-chat--dragging" : ""}`} aria-label={`Chat dengan ${assistantName}`}>
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
        onPointerDown={startDrag}
        onClick={() => { if (!draggedRef.current) setIsOpen((open) => !open); }}
        aria-expanded={isOpen}
        title={isMua ? `Buka chat ${assistantName}` : "Klik untuk chat, seret untuk memindahkan"}
      >
        <span className="diana-chat__pulse" />
        <img className="diana-chat__launcher-icon" src="/diana-cs-avatar.png" alt="" />
        <span><strong>{assistantName}</strong><small>AI assistant</small></span>
      </button>
    </aside>
  );
}
