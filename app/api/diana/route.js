import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SITE_CONTEXT = `
Extreme Studios adalah studio AI Engineering dan Software Development.
Layanan: pengembangan AI, software, aplikasi Android, sistem digital, product engineering.
Project: DIANA Smart Assistant, Extreme Studios Guitar FX, Movie HUB, Portal Arek Musik,
Pasarku Sidokerto, Cinema PARFI Jatim, Cine Arena, Lazis NU Sidokerto TV, GRII Sidoarjo,
Extreme Studios HUB, Auto Cut Video, Pas Photo Layout, Photography Invoice.
Kontak admin: WhatsApp 0896-7752-3666.
`;

function limitToTenWords(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 10)
    .join(" ");
}

async function notifyAdmin(question) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) return false;

  const message = [
    "DIANA membutuhkan jawaban admin.",
    "",
    `Pertanyaan: ${question}`,
    "",
    "Balas melalui sistem knowledge DIANA setelah integrasi database aktif."
  ].join("\n");
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message })
  });
  return response.ok;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ answer: "Pesan tidak dapat dibaca." }, { status: 400 });
  }

  const question = String(body?.message || "").trim();
  if (!question || question.length > 400) {
    return NextResponse.json({ answer: "Tulis pertanyaan singkat, ya." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ answer: "DIANA sedang disiapkan. Hubungi admin, ya." }, { status: 503 });
  }

  const prompt = `${SITE_CONTEXT}\n\nAturan:\n- Kamu DIANA, asisten Extreme Studios.\n- Pahami typo dan bahasa Indonesia santai.\n- Jawab HANYA bila pertanyaan sesuai konteks di atas.\n- Bila informasi tidak tersedia, di luar konteks, atau butuh penawaran spesifik: escalate true.\n- Jawaban maksimal 10 kata, ramah, tanpa emoji.\n- Keluarkan JSON murni: {"answer":"...","escalate":false}.\n\nPertanyaan pengunjung: ${question}`;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            maxOutputTokens: 80
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      console.error("DIANA Gemini request failed", geminiResponse.status);
      throw new Error("Gemini request failed");
    }
    const geminiData = await geminiResponse.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    const decision = JSON.parse(rawText || "{}");
    if (decision.escalate || !decision.answer) {
      await notifyAdmin(question);
      return NextResponse.json({ answer: "Pertanyaanmu sudah diteruskan ke admin." });
    }
    return NextResponse.json({ answer: limitToTenWords(decision.answer) });
  } catch {
    return NextResponse.json({ answer: "DIANA belum dapat menjawab. Hubungi admin, ya." }, { status: 502 });
  }
}
