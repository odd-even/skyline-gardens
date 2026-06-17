import { ContactFormEmbed } from "./ContactFormEmbed";

export function ContactFormCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-button border border-white/90 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
      <div className="border-b border-black/8 bg-white px-5 py-5 sm:px-6">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-skyline-gray">
          Connect with us!
        </h3>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-white px-5 py-5 sm:px-6">
        <ContactFormEmbed />
      </div>
    </div>
  );
}
