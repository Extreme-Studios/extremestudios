"use client";

import { useEffect } from "react";

function playNavigationSound(isNewPage) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const now = context.currentTime;
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  gain.connect(context.destination);
  [isNewPage ? 520 : 420, isNewPage ? 780 : 560].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.035);
    oscillator.connect(gain);
    oscillator.start(now + index * 0.035);
    oscillator.stop(now + 0.17);
  });
  window.setTimeout(() => context.close(), 250);
}

export default function AudioFeedback() {
  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href]");
      if (!link || link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      playNavigationSound(!href.startsWith("#"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
