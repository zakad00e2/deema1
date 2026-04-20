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

type ContactEnv = {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_EMAIL_REPLY_TO?: string;
  CONTACT_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
};

function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init?.headers ?? {}),
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

function validatePayload(payload: ContactPayload): {
  ok: true;
  data: {
    name: string;
    email: string;
    interest: string;
    message: string;
  };
} | {
  ok: false;
  message: string;
} {
  const name = cleanText(payload.name, 120);
  const email = cleanText(payload.email, 160).toLowerCase();
  const interest = cleanText(payload.interest, 120);
  const message = cleanMultilineText(payload.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !interest || !message) {
    return { ok: false, message: "All fields are required." };
  }

  if (!isEmail(email)) {
    return { ok: false, message: "Please provide a valid email address." };
  }

  return {
    ok: true,
    data: { name, email, interest, message },
  };
}

async function sendViaResend(
  payload: {
    name: string;
    email: string;
    interest: string;
    message: string;
  },
  env: ContactEnv,
): Promise<Response> {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Missing RESEND_API_KEY.");
    return json(
      {
        message:
          "Email service is not configured yet. Add RESEND_API_KEY in the environment settings.",
      },
      { status: 500 },
    );
  }

  const from = env.CONTACT_EMAIL_FROM || DEFAULT_FROM_EMAIL;
  const to = env.CONTACT_EMAIL_TO || DEFAULT_TO_EMAIL;
  const replyTo = env.CONTACT_EMAIL_REPLY_TO || payload.email;
  const siteUrl = env.CONTACT_SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL || "";

  const subject = `New contact form message from ${payload.name}`;
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");
  const safeInterest = escapeHtml(payload.interest);
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSite = escapeHtml(siteUrl);

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
      subject,
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
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Interest:</strong> ${safeInterest}</p>
          ${siteUrl ? `<p><strong>Site:</strong> ${safeSite}</p>` : ""}
          <p><strong>Message:</strong></p>
          <div style="white-space: normal;">${safeMessage}</div>
        </div>
      `.trim(),
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("[contact] Resend request failed:", errorText);
    return json(
      { message: "Unable to send the email right now." },
      { status: 502 },
    );
  }

  return json({ ok: true }, { status: 200 });
}

export async function handleContactRequest(
  request: Request,
  env: ContactEnv = process.env,
): Promise<Response> {
  if (request.method === "GET") {
    return json({ message: "Method not allowed." }, { status: 405 });
  }

  if (request.method !== "POST") {
    return json({ message: "Method not allowed." }, { status: 405 });
  }

  try {
    const payload = (await request.json()) as ContactPayload;
    const result = validatePayload(payload);

    if (result.ok === false) {
      return json({ message: result.message }, { status: 400 });
    }

    return await sendViaResend(result.data, env);
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return json(
      { message: "Unable to process this request right now." },
      { status: 500 },
    );
  }
}
