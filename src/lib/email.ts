type SendEmailOptions = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? process.env.SkylineEmailKey;
}

export function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ??
    "Skyline Gardens <onboarding@resend.dev>"
  );
}

export function getContactEmail() {
  return process.env.CONTACT_EMAIL ?? "info@skylinegardens.ca";
}

export async function sendEmail({ to, subject, text, replyTo }: SendEmailOptions) {
  const resendKey = getResendApiKey();

  if (!resendKey) {
    console.log("Email (no RESEND_API_KEY configured):", { to, subject, text, replyTo });
    return { sent: false, reason: "missing_api_key" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromAddress(),
      to,
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Resend API error:", response.status, errorBody);
    return { sent: false, reason: "api_error" as const };
  }

  return { sent: true as const };
}
