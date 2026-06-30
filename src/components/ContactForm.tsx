"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
    };

    if (payload.company) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-1 flex-col justify-center py-6 text-center">
        <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-skyline-gray">
          Message sent!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-skyline-gray-light">
          Thanks for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-skyline-teal hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Name"
            disabled={status === "submitting"}
            className="form-field w-full border border-gray-300 px-4 py-3 text-skyline-gray outline-none placeholder:text-gray-400 focus:border-skyline-teal disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email"
            disabled={status === "submitting"}
            className="form-field w-full border border-gray-300 px-4 py-3 text-skyline-gray outline-none placeholder:text-gray-400 focus:border-skyline-teal disabled:opacity-60"
          />
        </label>
      </div>

      <label className="block flex-1">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Message"
          disabled={status === "submitting"}
          className="form-field min-h-[140px] w-full resize-y border border-gray-300 px-4 py-3 text-skyline-gray outline-none placeholder:text-gray-400 focus:border-skyline-teal disabled:opacity-60"
        />
      </label>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      {status === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="hero-cta min-w-[120px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
