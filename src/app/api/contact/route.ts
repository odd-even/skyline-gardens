import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/send-contact-email";

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

  const result = await sendContactEmail({
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Unable to send your message right now. Please call or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
