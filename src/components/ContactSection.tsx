import type { SiteSettings } from "@/sanity/types";
import { ContactFormCard } from "./ContactFormCard";
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
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-x-12">
            <StoreHours settings={settings} />
            <ContactFormCard />
          </div>
        </div>
      </section>
    </>
  );
}
