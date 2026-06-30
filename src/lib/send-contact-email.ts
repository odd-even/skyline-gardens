type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

type SendResult =
  | { ok: true; provider: "smtp2go" | "resend" | "log" }
  | { ok: false; provider: "smtp2go" | "resend"; detail: string };

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? process.env.SkylineEmailKey;
}

function getContactEmail() {
  return process.env.CONTACT_EMAIL ?? "info@skylinegardens.ca";
}

function getContactFrom() {
  return (
    process.env.CONTACT_FROM ?? `Skyline Gardens <info@skylinegardens.ca>`
  );
}

async function sendViaSmtp2Go(payload: ContactPayload): Promise<SendResult> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  if (!apiKey) {
    return { ok: false, provider: "smtp2go", detail: "SMTP2GO_API_KEY not set" };
  }

  const response = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Smtp2go-Api-Key": apiKey,
    },
    body: JSON.stringify({
      sender: getContactFrom(),
      to: [getContactEmail()],
      subject: `Website message from ${payload.name}`,
      text_body: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
      custom_headers: [{ header: "Reply-To", value: payload.email }],
    }),
  });

  const body = (await response.json().catch(() => null)) as {
    data?: { succeeded?: number; error?: string };
    error?: string;
  } | null;

  if (!response.ok || !body?.data?.succeeded) {
    const detail =
      body?.data?.error ?? body?.error ?? `HTTP ${response.status}`;
    return { ok: false, provider: "smtp2go", detail };
  }

  return { ok: true, provider: "smtp2go" };
}

async function sendViaResend(payload: ContactPayload): Promise<SendResult> {
  const resendKey = getResendApiKey();
  if (!resendKey) {
    return { ok: false, provider: "resend", detail: "Resend API key not set" };
  }

  const fromAddress =
    process.env.CONTACT_FROM ?? "Skyline Gardens <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: getContactEmail(),
      reply_to: payload.email,
      subject: `Website message from ${payload.name}`,
      text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      provider: "resend",
      detail: await response.text(),
    };
  }

  return { ok: true, provider: "resend" };
}

export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  if (process.env.SMTP2GO_API_KEY) {
    const smtp2go = await sendViaSmtp2Go(payload);
    if (smtp2go.ok) {
      return smtp2go;
    }
    console.error("SMTP2Go contact email failed:", smtp2go.detail);
  }

  if (getResendApiKey()) {
    const resend = await sendViaResend(payload);
    if (resend.ok) {
      return resend;
    }
    console.error("Resend contact email failed:", resend.detail);
    return resend;
  }

  console.log("Contact form submission (no email provider configured):", payload);
  return { ok: true, provider: "log" };
}
