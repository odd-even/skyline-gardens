import type { SiteSettings } from "@/sanity/types";
import { ContactForm } from "./ContactForm";
import { ContactInfoCard } from "./ContactInfoCard";
import { SocialFeed } from "./SocialFeed";
import { StoreHours } from "./StoreHours";

type ContactSectionProps = {
  settings: SiteSettings;
};

export function ContactSection({ settings }: ContactSectionProps) {
  return (
    <>
      <section className="bg-white py-16">
        <div className="content-max px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-heading mb-4">{settings.socialTitle}</h2>
            <p className="text-lg text-skyline-gray-light">{settings.socialText}</p>
          </div>
          <SocialFeed />
        </div>
      </section>

      <section
        id="contact"
        className="relative bg-cover bg-center py-12 lg:py-16"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29, 38, 0, 0.75), rgba(29, 38, 0, 0.75)), url('/images/gardener-17.jpg')",
        }}
      >
        <div className="content-max px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
            <div className="flex flex-col gap-10">
              <ContactInfoCard settings={settings} className="max-w-md" />

              <StoreHours settings={settings} />
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="mb-6 font-[family-name:var(--font-heading)] text-3xl font-bold text-white lg:text-[2.75rem] lg:leading-tight">
                  Connect with us!
                </h2>
                <ContactForm variant="overlay" />
              </div>

              <div className="text-white">
                <h3 className="mb-3 text-xl font-bold">Get Directions</h3>
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium underline underline-offset-2 hover:text-white/80"
                >
                  Get Google Maps Directions
                </a>
                <p className="mt-3 text-sm text-white/90">{settings.fullAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
