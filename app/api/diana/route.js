import { NextResponse } from "next/server";
import { apps } from "@/data/apps";

export const runtime = "nodejs";

const PROJECT_MEMORY = apps
  .map(({ title, category, desc, points }) => `${title} (${category}): ${desc} Fitur: ${points.join(", ")}.`)
  .join("\n");

const SITE_CONTEXT = `
Extreme Studios adalah studio AI Engineering dan Software Development.
Layanan: pengembangan AI, software, aplikasi Android, sistem digital, product engineering.
Project: DIANA Smart Assistant, Extreme Studios Guitar FX, Movie HUB, Portal Arek Musik,
Pasarku Sidokerto, Cinema PARFI Jatim, Cine Arena, Lazis NU Sidokerto TV, GRII Sidoarjo,
Extreme Studios HUB, Auto Cut Video, Pas Photo Layout, Photography Invoice.
Program terbaru: Pelatihan AI Engineer Basic untuk siswa SD kelas 4-6. Materinya pengenalan
AI dan pembuatan aplikasi Android dengan AI serta Android Studio. Durasi 4 pertemuan, 1 jam
pertemuan; biaya Rp250.000 per siswa; kuota minimum 5 dan maksimum 10 siswa.
Layanan Extreme Studios: AI Engineering, Software Development, Android Development, Web
Application, Automation, Research & Development, dan AI Education.
MEMORI PROJECT WEBSITE:
${PROJECT_MEMORY}
Kontak admin: WhatsApp 0896-7752-3666.
`;

function normalize(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getWebsiteAnswer(question) {
  const value = normalize(question);

  if (/(event|acara|program)(terbaru|baru)/.test(value)) {
    return "Event terbaru kami Pelatihan AI Engineer Basic.";
  }
  if (value.includes("aiengineer") && /(harga|biaya|bayar)/.test(value)) {
    return "Biaya AI Engineer Basic Rp250.000 per siswa.";
  }
  if (value.includes("aiengineer") && /(durasi|berapa.*pertemuan|jadwal)/.test(value)) {
    return "Kelas berlangsung 4 pertemuan, masing-masing satu jam.";
  }
  if (value.includes("aiengineer") && /(untuksiapa|kelasberapa|usia)/.test(value)) {
    return "AI Engineer Basic untuk siswa SD kelas 4 sampai 6.";
  }
  if (value.includes("aiengineer") && /(daftar|pendaftaran)/.test(value)) {
    return "Pendaftaran melalui pihak sekolah atau WhatsApp Extreme Studios.";
  }

  const project = apps.find((app) => value.includes(normalize(app.title)));
  if (project) return project.desc;
  return null;
}

function isWebsiteTopic(question) {
  const value = normalize(question);
  const keywords = [
    "extremestudios", "diana", "project", "layanan", "service", "program", "event",
    "aiengineer", "software", "android", "web", "automation", "pelatihan", "kelas",
    "guitarf", "moviehub", "portalarekmusik", "pasarkusidokerto", "cinearena"
  ];
  return keywords.some((keyword) => value.includes(keyword)) || apps.some((app) => value.includes(normalize(app.title)));
}

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

  const directAnswer = getWebsiteAnswer(question);
  if (directAnswer) {
    return NextResponse.json({ answer: limitToTenWords(directAnswer) });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ answer: "DIANA sedang disiapkan. Hubungi admin, ya." }, { status: 503 });
  }

  const prompt = `${SITE_CONTEXT}\n\nAturan:\n- Kamu DIANA, asisten Extreme Studios yang ramah.\n- Pahami typo dan bahasa Indonesia santai.\n- Semua pertanyaan terkait layanan, project, program, event, teknologi, atau informasi website di atas WAJIB dijawab langsung; jangan escalate.\n- Escalate true hanya untuk pertanyaan yang benar-benar tidak terkait Extreme Studios atau untuk penawaran khusus yang belum tersedia.\n- Jawaban maksimal 10 kata, ramah, tanpa emoji.\n- Keluarkan JSON murni: {"answer":"...","escalate":false}.\n\nPertanyaan pengunjung: ${question}`;

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
      if (isWebsiteTopic(question)) {
        return NextResponse.json({
          answer: limitToTenWords(decision.answer || "Extreme Studios menyediakan layanan AI, software, Android, dan web.")
        });
      }
      await notifyAdmin(question);
      return NextResponse.json({ answer: "Pertanyaanmu sudah diteruskan ke admin." });
    }
    return NextResponse.json({ answer: limitToTenWords(decision.answer) });
  } catch {
    return NextResponse.json({ answer: "DIANA belum dapat menjawab. Hubungi admin, ya." }, { status: 502 });
  }
}
