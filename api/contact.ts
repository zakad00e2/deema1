const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM_EMAIL = "Athr Contact <onboarding@resend.dev>";
const DEFAULT_TO_EMAIL = "Leaveanathr@gmail.com";
const MAX_MESSAGE_LENGTH = 8_000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  message?: unknown;
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMultilineText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, maxLength);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getEnv(): Record<string, string | undefined> {
  if (typeof process !== "undefined" && process.env) {
    return process.env as Record<string, string | undefined>;
  }
  return {};
}

async function sendEmail(payload: {
  name: string;
  email: string;
  interest: string;
  message: string;
}): Promise<Response> {
  const env = getEnv();
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    return json(
      {
        message:
          "Email service is not configured yet. Add RESEND_API_KEY in the environment settings.",
      },
      500,
    );
  }

  const from = env.CONTACT_EMAIL_FROM || DEFAULT_FROM_EMAIL;
  const to = env.CONTACT_EMAIL_TO || DEFAULT_TO_EMAIL;
  const replyTo = payload.email;
  const siteUrl = env.CONTACT_SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL || "";

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject: `New contact form message from ${payload.name}`,
      text: [
        "New contact form submission",
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Interest: ${payload.interest}`,
        siteUrl ? `Site: ${siteUrl}` : "",
        "",
        "Message:",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Interest:</strong> ${escapeHtml(payload.interest)}</p>
          ${siteUrl ? `<p><strong>Site:</strong> ${escapeHtml(siteUrl)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <div>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</div>
        </div>
      `.trim(),
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("[contact] Resend request failed:", errorText);
    let message = "Unable to send the email right now.";

    if (errorText.includes("You can only send testing emails to your own email address")) {
      message =
        "Resend is rejecting this send because onboarding@resend.dev only works for your own Resend account email. To deliver to Leaveanathr@gmail.com, verify your own domain in Resend and use it in CONTACT_EMAIL_FROM.";
    }

    return json({ message }, 502);
  }

  return json({ ok: true }, 200);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const payload = (await request.json()) as ContactPayload;
    const name = cleanText(payload.name, 120);
    const email = cleanText(payload.email, 160).toLowerCase();
    const interest = cleanText(payload.interest, 120);
    const message = cleanMultilineText(payload.message, MAX_MESSAGE_LENGTH);

    if (!name || !email || !interest || !message) {
      return json({ message: "All fields are required." }, 400);
    }

    if (!isEmail(email)) {
      return json({ message: "Please provide a valid email address." }, 400);
    }

    return await sendEmail({ name, email, interest, message });
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return json({ message: "Unable to process this request right now." }, 500);
  }
}

export function GET(): Response {
  return json({ message: "Method not allowed." }, 405);
}
