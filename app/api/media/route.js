import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = Math.floor(3.5 * 1024 * 1024);

function scriptUrl() {
  const value = process.env.MEDIA_APPS_SCRIPT_URL || "";
  return value.startsWith("https://script.google.com/") ? value : "";
}

async function readUpstream(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, error: "Respons Google Drive tidak valid." };
  }
}

export async function GET() {
  const endpoint = scriptUrl();
  if (!endpoint) return NextResponse.json({ ok: true, configured: false, items: [] });

  try {
    const response = await fetch(`${endpoint}?action=list`, { cache: "no-store" });
    const payload = await readUpstream(response);
    return NextResponse.json({ ...payload, configured: true }, { status: response.ok && payload.ok !== false ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, configured: true, error: "Media Drive sedang tidak dapat dihubungi." }, { status: 502 });
  }
}

export async function POST(request) {
  const endpoint = scriptUrl();
  const adminPassword = process.env.MEDIA_ADMIN_PASSWORD || "";
  const uploadSecret = process.env.MEDIA_UPLOAD_SECRET || "";
  if (!endpoint || !adminPassword || !uploadSecret) {
    return NextResponse.json({ ok: false, error: "Backend media belum dikonfigurasi." }, { status: 503 });
  }
  if (request.headers.get("x-media-admin-password") !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Password admin salah." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dataUrl = String(body.dataUrl || "");
    const match = dataUrl.match(/^data:image\/(?:jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
    const binaryBytes = match ? Math.floor(match[1].length * 0.75) : 0;
    if (!match || binaryBytes > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ ok: false, error: "Gunakan JPG, PNG, atau WebP maksimal 3,5 MB." }, { status: 400 });
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret: uploadSecret,
        dataUrl,
        filename: String(body.filename || ""),
        title: String(body.title || ""),
        alt: String(body.alt || ""),
        category: String(body.category || "Portfolio")
      }),
      cache: "no-store"
    });
    const payload = await readUpstream(response);
    return NextResponse.json(payload, { status: response.ok && payload.ok !== false ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "Data upload tidak dapat dibaca." }, { status: 400 });
  }
}
