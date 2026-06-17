import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const contactEmail = process.env.CONTACT_EMAIL ?? "info@skylinegardens.ca";
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Skyline Gardens <onboarding@resend.dev>",
        to: contactEmail,
        reply_to: email,
        subject: `Website message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }
  } else {
    console.log("Contact form submission (no RESEND_API_KEY configured):", {
      name,
      email,
      message,
    });
  }

  return NextResponse.json({ success: true });
}
