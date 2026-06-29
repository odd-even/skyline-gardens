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
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col gap-4">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-skyline-gray">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={status === "submitting"}
          className="form-field w-full border border-gray-300 px-4 py-3 outline-none focus:border-skyline-teal disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-skyline-gray">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={status === "submitting"}
          className="form-field w-full border border-gray-300 px-4 py-3 outline-none focus:border-skyline-teal disabled:opacity-60"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-skyline-gray"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          disabled={status === "submitting"}
          className="form-field min-h-[120px] w-full flex-1 resize-y border border-gray-300 px-4 py-3 outline-none focus:border-skyline-teal disabled:opacity-60"
        />
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>

      {status === "success" && (
        <p className="text-sm text-skyline-green" role="status">
          Thanks for reaching out! We&apos;ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
