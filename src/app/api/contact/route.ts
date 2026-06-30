import { NextRequest, NextResponse } from "next/server";

function getResendApiKey() {
  return process.env.RESEND_API_KEY ?? process.env.SkylineEmailKey;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message, company } = body as {
    name?: string;
    email?: string;
    message?: string;
    company?: string;
  };

  if (company) {
    return NextResponse.json({ success: true });
  }

  const trimmedName = name?.trim() ?? "";
  const trimmedEmail = email?.trim() ?? "";
  const trimmedMessage = message?.trim() ?? "";

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  if (!isValidEmail(trimmedEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const contactEmail = process.env.CONTACT_EMAIL ?? "info@skylinegardens.ca";
  const resendKey = getResendApiKey();
  const fromAddress =
    process.env.CONTACT_FROM ?? "Skyline Gardens <onboarding@resend.dev>";

  if (!resendKey) {
    console.log("Contact form submission (no RESEND_API_KEY configured):", {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });
    return NextResponse.json({ success: true });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: contactEmail,
      reply_to: trimmedEmail,
      subject: `Website message from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
    }),
  });

  if (!response.ok) {
    console.error("Resend contact email failed:", await response.text());
    return NextResponse.json(
      { error: "Unable to send your message right now. Please call or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
