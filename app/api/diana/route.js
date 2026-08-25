import { NextResponse } from "next/server";
import { apps } from "@/data/apps";
import { getVerticalConfig } from "@/data/verticals";

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
Web Builder Extreme Studios: pembuatan website interactive, marketplace, web chatbot, landing
page, company profile, dan kebutuhan website bisnis lainnya. Harga mulai Rp1.000.000, sudah
termasuk domain, dengan biaya tahunan terjangkau. Customer dapat bertanya ke DIANA untuk detail
paket dan rekomendasi solusi.
AI Engineering mencakup AI Assistant, AI Integration, AI Automation, Intelligent Systems, dan
Custom AI Solutions. Software Development mencakup custom software, web application, internal
tools, dan business solutions. Android Development mencakup aplikasi pendidikan, bisnis, dan
project Android kustom. R&D mencakup eksperimen AI, prototype, teknologi baru, dan project internal.
Stack yang dipakai di berbagai project: Next.js, React, Tailwind CSS, JavaScript, Electron,
Pixi.js, Live2D, Kotlin, Jetpack Compose, C++17, Android Room, dan Kotlin Coroutines.
Cara kerja: ide, eksperimen, engineering, testing, lalu product. Extreme Studios terbuka untuk
diskusi project, kerja sama, dan kolaborasi teknologi. Kontak Fajar: WhatsApp 0896-7752-3666.
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
  if (/(layanan|service).*(apa|apaaja|tersedia)|apa.*layanan/.test(value)) {
    return "Kami melayani AI, web builder, software, Android, automation, dan R&D.";
  }
  if (/(webbuilder|buatwebsite|jasabuatwebsite|pembuatanwebsite|websitebisnis)/.test(value)) {
    return "Web Builder mulai Rp1 juta, termasuk domain dan biaya tahunan terjangkau.";
  }
  if (/(marketplace|landingpage|webchatbot|websiteinteractive|companyprofile)/.test(value)) {
    return "Kami membuat marketplace, landing page, web chatbot, dan website interactive.";
  }
  if (value.includes("aiengineering")) {
    return "AI Engineering mencakup AI Assistant, integration, automation, dan intelligent systems.";
  }
  if (value.includes("softwaredevelopment")) {
    return "Software Development mencakup custom software, web app, dan internal tools.";
  }
  if (value.includes("androiddevelopment")) {
    return "Kami membuat aplikasi Android pendidikan, bisnis, dan project kustom.";
  }
  if (/(teknologi|techstack|stack)/.test(value)) {
    return "Kami memakai Next.js, React, Electron, Kotlin, Compose, dan C++17.";
  }
  if (/(kontak|whatsapp|hubungi)/.test(value)) {
    return "Hubungi Fajar melalui WhatsApp 0896-7752-3666.";
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
    "guitarf", "moviehub", "portalarekmusik", "pasarkusidokerto", "cinearena",
    "teknologi", "stack", "electron", "react", "nextjs", "kotlin", "compose", "c17",
    "kontak", "whatsapp", "hubungi", "profile", "tentang", "kuota", "durasi", "materi"
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

function limitWords(text, maxWords = 10) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, maxWords)
    .join(" ");
}

function getMuaAnswer(question, config) {
  const value = normalize(question);
  if (/(harga|biaya|berapa|promo|bayar|pembayaran)/.test(value)) return `Harga promo ${config.price}. Domain .com satu tahun sudah termasuk.`;
  if (/(order|pesan|beli|caradaftar|carapesan|mulai)/.test(value)) return "Sampaikan kebutuhan melalui Diana, kami konfirmasi detail, lalu pembayaran setelah paket disepakati.";
  if (/(domain|com)/.test(value)) return "Domain .com satu tahun sudah termasuk dalam harga promo.";
  if (/(fitur|dapatapa|termasuk)/.test(value)) return "Termasuk website, portfolio, Diana AI, form calon pengantin, booking, kalender, WhatsApp, dan domain.";
  if (/(calendar|kalender|jadwal|tanggal|tersedia)/.test(value)) return "Website dapat mengecek jadwal. Demo memakai data simulasi dan siap dihubungkan ke Google Calendar.";
  if (/(booking|pesan|reservasi)/.test(value)) return "Calon pengantin memilih acara, tanggal, paket, lalu mengisi detail booking di website.";
  if (/(diana|aiassistant|chatbot|asisten)/.test(value)) return "Diana membantu menjawab paket, proses, dan booking calon client sepanjang waktu.";
  if (/(proses|buatnya|pembuatan|berapa.*lama)/.test(value)) return "Kami siapkan konsep, desain, isi portfolio, alur booking, lalu website dipublikasikan.";
  if (/(manfaat|membantu|gunanya)/.test(value)) return "Website membuat portfolio, paket, pertanyaan, dan booking calon client lebih rapi.";
  if (/(whatsapp|wa)/.test(value)) return "WhatsApp dipakai untuk follow-up ketika calon client sudah siap melanjutkan booking.";
  return null;
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

  const vertical = getVerticalConfig(body?.vertical);
  if (vertical) {
    const directAnswer = getMuaAnswer(question, vertical);
    if (directAnswer) return NextResponse.json({ answer: limitWords(directAnswer, 32) });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ answer: "Diana MUA menjelaskan harga, fitur, booking, kalender, dan proses website." });
    }

    const verticalContext = `Produk: ${vertical.productName}. Harga promo: ${vertical.price}. ${vertical.badge}. Fitur: ${vertical.features.map(([, title]) => title).join(", ")}. Demo service: ${vertical.demoServices.join(", ")}. Paket demo: ${vertical.demoPackages.map((item) => `${item.name} ${item.price}`).join(", ")}. FAQ: ${vertical.faq.map(([q, a]) => `${q}: ${a}`).join(" ")}.`;
    const prompt = `${vertical.chatbotPrompt}\n\n${verticalContext}\n\nAturan:\n- Jawab hanya seputar Website MUA + AI Assistant Extreme Studios.\n- Pahami bahasa Indonesia santai dan typo.\n- Jangan menyuruh visitor menghubungi WhatsApp untuk pertanyaan awal.\n- Jika diminta order/pembayaran, arahkan: \"Mulai order dengan mengisi kebutuhan melalui Diana; detail pembayaran dibuka setelah order siap.\"\n- Jika pertanyaan meminta detail yang tidak ada di knowledge, isi answer dengan: \"Untuk detail informasi tersebut, kami sambungkan ke admin.\" dan set escalate true.\n- Jawaban maksimal 32 kata, tanpa emoji.\n- Keluarkan JSON murni: {"answer":"...","escalate":false}.\n\nPertanyaan: ${question}`;
    try {
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", maxOutputTokens: 110 } })
      });
      if (!geminiResponse.ok) throw new Error("Gemini request failed");
      const geminiData = await geminiResponse.json();
      const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
      const decision = JSON.parse(rawText || "{}");
      if (decision.escalate) {
        await notifyAdmin(question);
        return NextResponse.json({ answer: "Untuk detail informasi tersebut, kami sambungkan ke admin." });
      }
      return NextResponse.json({ answer: limitWords(decision.answer || "Diana dapat menjelaskan paket Website MUA dan demo booking.", 32) });
    } catch {
      return NextResponse.json({ answer: "Diana dapat menjelaskan harga, fitur, booking, kalender, dan proses Website MUA." });
    }
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
