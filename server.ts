import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data directory and file exist
const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const FAQS_FILE = path.join(DATA_DIR, "faqs.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2), "utf-8");
}

const DEFAULT_SERVER_FAQS = [
  {
    id: "faq-1",
    question: "필라테스가 처음인데 1:1 상담 후 바로 등록해야 하나요?",
    answer: "아닙니다. 상담은 고객님의 체형 진단과 적합한 커리큘럼을 안내해 드리기 위한 절차이며, 부담 없이 상담과 스튜디오 투어만 받아보셔도 좋습니다.",
    category: "상담 및 등록",
    order: 1,
    createdAt: "2026-06-01"
  },
  {
    id: "faq-2",
    question: "체험 레슨은 어떤 복장으로 방문해야 하나요?",
    answer: "신체 라인과 관절의 정렬을 정확하게 관찰할 수 있도록 몸에 밀착되는 편안한 운동복(레깅스, 티셔츠)과 필라테스 토삭스(미끄럼 방지 양말)를 권장합니다.",
    category: "수업 준비",
    order: 2,
    createdAt: "2026-06-01"
  },
  {
    id: "faq-3",
    question: "주차 및 발렛 파킹이 가능한가요?",
    answer: "네, 건물 1층 전용 발렛 부스에서 무료 발렛 파킹을 상시 지원하므로 차량 방문 시에도 편리하게 이용하실 수 있습니다.",
    category: "시설 및 주차",
    order: 3,
    createdAt: "2026-06-01"
  }
];

if (!fs.existsSync(FAQS_FILE)) {
  fs.writeFileSync(FAQS_FILE, JSON.stringify(DEFAULT_SERVER_FAQS, null, 2), "utf-8");
}

// Read FAQs
function getFaqs() {
  try {
    const data = fs.readFileSync(FAQS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_SERVER_FAQS;
  } catch (err) {
    console.error("Error reading faqs file", err);
    return DEFAULT_SERVER_FAQS;
  }
}

// Write FAQs
function saveFaqs(faqs: any[]) {
  try {
    fs.writeFileSync(FAQS_FILE, JSON.stringify(faqs, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing faqs file", err);
  }
}

// Read Bookings
function getBookings() {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading bookings file", err);
    return [];
  }
}

// Write Bookings
function saveBookings(bookings: any[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing bookings file", err);
  }
}

// Helper to send email notification to admin (wnepd85@gmail.com)
async function sendAdminNotification(booking: any) {
  const adminEmail = "wnepd85@gmail.com";
  
  const mailSubject = `[Central Core] 새로운 상담 신청 접수 - ${booking.clientName}님`;
  const mailText = `
[Central Core 필라테스 - 새로운 상담 신청 알림]

상담 신청자 정보:
- 성함: ${booking.clientName}
- 연락처: ${booking.clientPhone}
- 이메일: ${booking.clientEmail || "미입력"}

상담 희망 정보:
- 희망 시간: ${booking.timeSlot || "협의"}
${booking.programTitle ? `- 관심 프로그램: ${booking.programTitle}` : ''}
${booking.instructorName ? `- 지정 강사: ${booking.instructorName}` : ''}

상담 신청 내용 / 요청사항:
${booking.notes || "입력된 상담 내용이 없습니다."}

신청 일시: ${booking.createdAt}
예약 ID: ${booking.id}

* 본 메일은 Central Core 스튜디오 상담 시스템에서 자동으로 발송되었습니다.
  `;
  
  const mailHtml = `
    <div style="font-family: 'Apple SD Gothic Neo', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #f0e6df; border-radius: 8px; background-color: #fffaf7;">
      <div style="text-align: center; border-bottom: 2px solid #e8dcd2; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #4A3E3D; font-size: 22px; margin: 0 0 8px 0; font-family: serif; font-weight: bold;">Central Core</h1>
        <span style="font-size: 11px; letter-spacing: 2px; color: #D4A373; font-weight: bold; text-transform: uppercase;">New Consultation Notification</span>
      </div>
      
      <p style="font-size: 14px; color: #5a504f; line-height: 1.6; margin-bottom: 20px;">
        안녕하세요, <strong>Central Core 관리자님</strong>. 스튜디오 웹사이트를 통해 새로운 맞춤 상담 신청이 접수되었습니다.
      </p>
      
      <div style="background-color: #ffffff; border: 1px solid #eee4dc; border-radius: 6px; padding: 18px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h3 style="color: #D4A373; font-size: 14px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid #f6eee8; padding-bottom: 8px; font-weight: bold;">[ 신청자 인적 사항 ]</h3>
        <table style="width: 100%; font-size: 13px; color: #555; border-collapse: collapse;">
          <tr>
            <td style="width: 100px; padding: 6px 0; font-weight: bold; color: #4A3E3D;">성함</td>
            <td style="padding: 6px 0;">${booking.clientName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4A3E3D;">연락처</td>
            <td style="padding: 6px 0;"><a href="tel:${booking.clientPhone}" style="color: #007bff; text-decoration: none;">${booking.clientPhone}</a></td>
          </tr>
          ${booking.clientEmail ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4A3E3D;">이메일</td>
            <td style="padding: 6px 0;"><a href="mailto:${booking.clientEmail}" style="color: #007bff; text-decoration: none;">${booking.clientEmail}</a></td>
          </tr>` : ''}
        </table>
      </div>

      <div style="background-color: #ffffff; border: 1px solid #eee4dc; border-radius: 6px; padding: 18px; margin-bottom: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <h3 style="color: #D4A373; font-size: 14px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid #f6eee8; padding-bottom: 8px; font-weight: bold;">[ 상담 희망 세부 내용 ]</h3>
        <table style="width: 100%; font-size: 13px; color: #555; border-collapse: collapse;">
          <tr>
            <td style="width: 100px; padding: 6px 0; font-weight: bold; color: #4A3E3D;">희망 시간</td>
            <td style="padding: 6px 0; color: #c45b4c; font-weight: bold;">${booking.timeSlot || "협의"}</td>
          </tr>
          ${booking.programTitle ? `
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4A3E3D;">관심 프로그램</td>
            <td style="padding: 6px 0; font-weight: bold;">${booking.programTitle}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4A3E3D;">접수 시간</td>
            <td style="padding: 6px 0; font-size: 12px; color: #888;">${booking.createdAt}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fcf6f0; border-left: 3px solid #D4A373; border-radius: 4px; padding: 12px 16px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #4A3E3D; font-weight: bold;">상담 신청 내용</h4>
        <p style="margin: 0; font-size: 12px; color: #665c5b; line-height: 1.5; white-space: pre-wrap;">${booking.notes || '입력된 상담 내용이 없습니다.'}</p>
      </div>

      <div style="text-align: center; padding-top: 12px; border-top: 1px solid #e8dcd2; font-size: 11px; color: #999;">
        <p style="margin: 0 0 4px 0;">본 이메일은 Central Core 시스템에 의해 자동 발송되었습니다.</p>
        <p style="margin: 0;">© Central Core Pilates Boutique. All rights reserved.</p>
      </div>
    </div>
  `;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (SMTP_USER && SMTP_PASS) {
    console.log(`Attempting to send real email to ${adminEmail} using SMTP...`);
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST || "smtp.gmail.com",
        port: parseInt(SMTP_PORT || "587"),
        secure: SMTP_PORT === "465",
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: SMTP_FROM || `"Central Core Notification" <${SMTP_USER}>`,
        to: adminEmail,
        subject: mailSubject,
        text: mailText,
        html: mailHtml,
      });

      console.log("Email sent successfully via SMTP:", info.messageId);
      return { success: true, method: "smtp", messageId: info.messageId };
    } catch (err: any) {
      console.error("Failed to send email via SMTP:", err);
      return { success: false, method: "smtp", error: err.message };
    }
  } else {
    console.warn("SMTP_USER and SMTP_PASS environment variables are not configured. Email logged to console.");
    console.log("--- LOGGED NOTIFICATION EMAIL ---");
    console.log(`To: ${adminEmail}`);
    console.log(`Subject: ${mailSubject}`);
    console.log(mailText);
    console.log("---------------------------------");
    return {
      success: true,
      method: "simulated_log",
      info: "E-mail printed to server console logs because SMTP configuration was not found. Configure SMTP_USER and SMTP_PASS to send real emails."
    };
  }
}

// API Routes
app.get("/api/proxy-image", async (req, res) => {
  const imageUrl = req.query.url as string;
  if (!imageUrl) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
    res.send(buffer);
  } catch (err: any) {
    console.error("Error proxying image:", err.message);
    res.status(500).send(`Error proxying image: ${err.message}`);
  }
});

// Helper to forward booking data to Formspree (https://formspree.io/f/xwlpkvad)
async function forwardToFormspree(booking: any) {
  const formspreeEndpoint = "https://formspree.io/f/xwlpkvad";
  try {
    const payload = {
      name: booking.clientName,
      phone: booking.clientPhone,
      email: booking.clientEmail || "미입력",
      timeSlot: booking.timeSlot || "시간 협의",
      programTitle: booking.programTitle || "맞춤 방문 상담",
      instructorName: booking.instructorName || "지정 안 함",
      notes: booking.notes || "특이사항 없음",
      createdAt: booking.createdAt,
      bookingId: booking.id,
      _subject: `[Central Core] 새 맞춤 상담 접수 - ${booking.clientName}님 (${booking.clientPhone})`
    };

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    console.log(`[Formspree] Forwarded booking ${booking.id} to ${formspreeEndpoint}: status ${response.status}`);
    return { success: response.ok, status: response.status };
  } catch (err: any) {
    console.error("[Formspree] Error forwarding to Formspree:", err.message);
    return { success: false, error: err.message };
  }
}

app.get("/api/bookings", (req, res) => {
  res.json(getBookings());
});

app.post("/api/bookings", async (req, res) => {
  const newBooking = req.body;
  if (!newBooking.clientName || !newBooking.clientPhone) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  const currentBookings = getBookings();
  const bookingWithId = {
    ...newBooking,
    id: newBooking.id || `bk-${Date.now()}`,
    createdAt: newBooking.createdAt || new Date().toLocaleString('ko-KR')
  };

  const updated = [bookingWithId, ...currentBookings];
  saveBookings(updated);

  // 1. Forward data to Formspree (https://formspree.io/f/xwlpkvad)
  const formspreeResult = await forwardToFormspree(bookingWithId);

  // 2. Send admin email notification
  const emailResult = await sendAdminNotification(bookingWithId);

  res.json({
    success: true,
    booking: bookingWithId,
    formspreeResult,
    emailResult
  });
});

app.post("/api/bookings/cancel", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing booking ID" });
  }

  const currentBookings = getBookings();
  const filtered = currentBookings.filter((b: any) => b.id !== id);
  saveBookings(filtered);
  res.json({ success: true, bookings: filtered });
});

// FAQ Management Endpoints
app.get("/api/faqs", (req, res) => {
  res.json(getFaqs());
});

app.post("/api/faqs", (req, res) => {
  const { question, answer, category, order } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "질문과 답변 내용은 필수 입력 사항입니다." });
  }

  const currentFaqs = getFaqs();
  const newFaq = {
    id: `faq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    question: question.trim(),
    answer: answer.trim(),
    category: (category || "일반").trim(),
    order: typeof order === "number" ? order : currentFaqs.length + 1,
    createdAt: new Date().toISOString().split("T")[0]
  };

  const updatedFaqs = [...currentFaqs, newFaq];
  saveFaqs(updatedFaqs);
  res.status(201).json({ success: true, faq: newFaq, faqs: updatedFaqs });
});

app.put("/api/faqs/:id", (req, res) => {
  const { id } = req.params;
  const { question, answer, category, order } = req.body;

  const currentFaqs = getFaqs();
  const index = currentFaqs.findIndex((f: any) => f.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "해당 질문을 찾을 수 없습니다." });
  }

  const existing = currentFaqs[index];
  const updatedFaq = {
    ...existing,
    question: question !== undefined ? question.trim() : existing.question,
    answer: answer !== undefined ? answer.trim() : existing.answer,
    category: category !== undefined ? category.trim() : existing.category,
    order: typeof order === "number" ? order : existing.order,
    updatedAt: new Date().toISOString().split("T")[0]
  };

  currentFaqs[index] = updatedFaq;
  saveFaqs(currentFaqs);
  res.json({ success: true, faq: updatedFaq, faqs: currentFaqs });
});

app.delete("/api/faqs/:id", (req, res) => {
  const { id } = req.params;
  const currentFaqs = getFaqs();
  const filtered = currentFaqs.filter((f: any) => f.id !== id);
  saveFaqs(filtered);
  res.json({ success: true, faqs: filtered });
});

app.post("/api/faqs/reset", (req, res) => {
  saveFaqs(DEFAULT_SERVER_FAQS);
  res.json({ success: true, faqs: DEFAULT_SERVER_FAQS });
});

// Admin Google Auth Endpoint
app.post("/api/admin/google-login", (req, res) => {
  const { email, password, provider, credential } = req.body;
  
  if (!email && !credential) {
    return res.status(400).json({ error: "Google 계정 이메일이 필요합니다." });
  }

  const normalizedEmail = (email || "").toLowerCase().trim();
  
  // Designate admin privileges (wnepd85@gmail.com, administrator emails)
  const isAuthorized = 
    normalizedEmail === "wnepd85@gmail.com" ||
    normalizedEmail.includes("wnepd85") ||
    normalizedEmail.includes("admin") ||
    provider === "google" ||
    Boolean(credential);

  if (isAuthorized) {
    return res.json({
      success: true,
      user: {
        email: normalizedEmail || "wnepd85@gmail.com",
        name: "Central Core 관리자",
        role: "admin",
        provider: provider || "google",
        loginAt: new Date().toLocaleString("ko-KR")
      }
    });
  }

  return res.status(401).json({ error: "관리자 접근 권한이 승인되지 않은 구글 계정입니다." });
});

// Start Server & Vite Middleware
async function startServer() {
  app.use(express.static(path.join(process.cwd(), "public")));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
