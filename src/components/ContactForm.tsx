"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  variant?: "default" | "overlay";
};

export function ContactForm({ variant = "default" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isOverlay = variant === "overlay";

  const inputClassName = isOverlay
    ? "form-field w-full border border-gray-200 bg-white px-4 py-3 text-sm text-skyline-gray outline-none focus:border-skyline-teal"
    : "form-field w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-skyline-teal";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("success");
      setMessage("Thanks! We'll get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please call or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={isOverlay ? "grid gap-4 sm:grid-cols-2" : "space-y-4"}>
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name"
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className={inputClassName}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={isOverlay ? 7 : 5}
          placeholder="Message"
          className={`${inputClassName} resize-y`}
        />
      </div>
      <div className={isOverlay ? "flex justify-end" : ""}>
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            isOverlay
              ? "hero-cta min-w-[120px] disabled:opacity-60"
              : "btn-primary w-full disabled:opacity-60"
          }
        >
          {status === "loading" ? "Sending…" : "Send"}
        </button>
      </div>
      {message && (
        <p
          className={`text-sm ${isOverlay ? "" : "text-center"} ${
            status === "success"
              ? isOverlay
                ? "text-white/90"
                : "text-skyline-green"
              : isOverlay
                ? "text-red-300"
                : "text-red-600"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
