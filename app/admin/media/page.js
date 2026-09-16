"use client";

import { useState } from "react";

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MediaAdminPage() {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState("Portfolio");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!file) return setStatus("Pilih gambar terlebih dahulu.");
    if (file.size > 3.5 * 1024 * 1024) return setStatus("Ukuran gambar maksimal 3,5 MB.");
    setBusy(true);
    setStatus("Mengirim gambar ke Google Drive...");
    try {
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-media-admin-password": password },
        body: JSON.stringify({ dataUrl: await toDataUrl(file), filename: file.name, title, alt, category })
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) throw new Error(payload.error || "Upload gagal.");
      setStatus("Berhasil. Gambar sudah masuk Drive, tercatat di Sheet, dan tampil di halaman Projects.");
      setFile(null); setTitle(""); setAlt("");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(error.message || "Upload gagal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#040915] px-5 py-12 text-slate-100 md:px-8">
      <div className="mx-auto max-w-xl">
        <a className="text-sm font-bold text-cyan hover:text-white" href="/">← Kembali ke website</a>
        <p className="eyebrow mt-12">Media Admin</p>
        <h1 className="mt-4 text-4xl font-medium text-white">Upload ke Google Drive.</h1>
        <p className="mt-4 leading-7 text-slate-400">Gambar maksimal 3,5 MB. Setelah berhasil, media langsung dicatat di Google Sheet dan muncul pada halaman Projects.</p>
        <form onSubmit={submit} className="project-card mt-8 grid gap-5 p-6">
          <label className="grid gap-2 text-sm font-medium">Password admin<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-lg border border-cyan/20 bg-[#071829] p-3 outline-none focus:border-cyan" /></label>
          <label className="grid gap-2 text-sm font-medium">Gambar<input type="file" required accept="image/jpeg,image/png,image/webp" onChange={(event) => setFile(event.target.files?.[0] || null)} className="text-sm text-slate-300" /></label>
          <label className="grid gap-2 text-sm font-medium">Judul<input required value={title} onChange={(event) => setTitle(event.target.value)} className="rounded-lg border border-cyan/20 bg-[#071829] p-3 outline-none focus:border-cyan" /></label>
          <label className="grid gap-2 text-sm font-medium">Deskripsi gambar / alt text<input value={alt} onChange={(event) => setAlt(event.target.value)} className="rounded-lg border border-cyan/20 bg-[#071829] p-3 outline-none focus:border-cyan" /></label>
          <label className="grid gap-2 text-sm font-medium">Kategori<select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-lg border border-cyan/20 bg-[#071829] p-3 outline-none focus:border-cyan"><option>Portfolio</option><option>Website Project</option><option>Program</option><option>Behind the Scenes</option></select></label>
          <button disabled={busy} className="rounded-lg bg-cyan px-4 py-3 font-bold text-[#04121e] disabled:opacity-50">{busy ? "Mengunggah..." : "Upload ke Drive"}</button>
          {status && <p className="text-sm leading-6 text-slate-300">{status}</p>}
        </form>
      </div>
    </main>
  );
}
