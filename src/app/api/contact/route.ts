import { NextRequest, NextResponse } from "next/server";
import { getContactEmail, sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await sendEmail({
    to: getContactEmail(),
    replyTo: email,
    subject: `Website message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (!result.sent && result.reason === "api_error") {
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
