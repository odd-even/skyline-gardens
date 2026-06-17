import type { SiteSettings } from "@/sanity/types";
import { ContactForm } from "./ContactForm";
import { SocialFeed } from "./SocialFeed";
import { StoreHours } from "./StoreHours";

type ContactSectionProps = {
  settings: SiteSettings;
};

export function ContactSection({ settings }: ContactSectionProps) {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="content-max px-5 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="section-heading mb-3 sm:mb-4">{settings.socialTitle}</h2>
            <p className="section-lead mx-auto max-w-2xl">{settings.socialText}</p>
          </div>
          <SocialFeed />
        </div>
      </section>

      <section
        id="contact"
        className="section-padding relative bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29, 38, 0, 0.75), rgba(29, 38, 0, 0.75)), url('/images/gardener-17.jpg')",
        }}
      >
        <div className="content-max px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10">
            <div className="flex flex-col gap-10">
              <StoreHours settings={settings} />
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="mb-5 font-[family-name:var(--font-heading)] text-2xl font-bold text-white sm:mb-6 sm:text-3xl lg:text-[2.75rem] lg:leading-tight">
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
