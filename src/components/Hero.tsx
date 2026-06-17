import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";
import { ContactInfoCard } from "./ContactInfoCard";

type HeroProps = {
  settings: SiteSettings;
};

export function Hero({ settings }: HeroProps) {
  return (
    <section id="welcome" className="bg-white">
      <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        {/* Left column — flower image in top white space, welcome text below */}
        <div className="flex flex-col bg-white lg:min-h-[560px]">
          <div className="flex min-h-[160px] flex-1 items-start overflow-hidden bg-white sm:min-h-[200px] lg:min-h-[260px]">
            <Image
              src="/images/bannerimage-1.jpg"
              alt="Pink clematis flowers"
              width={1200}
              height={400}
              className="h-auto w-full max-h-[180px] object-contain object-left-top sm:max-h-[220px] lg:max-h-[320px]"
              priority
            />
          </div>

          <div className="shrink-0 px-5 pb-8 pt-4 sm:px-8 lg:px-12 lg:pb-10">
            <div className="decorative-lines">
              <span />
              <span />
              <span />
            </div>

            <h1 className="hero-heading mb-4 sm:mb-5">{settings.heroTitle}</h1>
            <p className="section-lead mb-7 max-w-xl sm:mb-8">{settings.heroText}</p>
            <Link href="/#products" className="hero-cta">
              What we offer
            </Link>
          </div>
        </div>

        {/* Right column — single compact card on mobile/tablet; image overlay on desktop */}
        <div className="relative lg:min-h-[560px]">
          <div className="absolute inset-0 hidden lg:block">
            <Image
              src="/images/gardener-17.jpg"
              alt=""
              fill
              sizes="45vw"
              className="object-cover object-center"
              priority
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[rgba(29,38,0,0.78)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-[55%] opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(255,255,255,0.35) 3px, rgba(255,255,255,0.35) 5px)",
              }}
              aria-hidden
            />
          </div>

          <div className="relative z-10 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 lg:absolute lg:inset-0 lg:p-0">
            <div className="overflow-hidden rounded-button border border-black/8 shadow-sm lg:contents lg:border-0 lg:shadow-none">
              <div className="lg:absolute lg:right-6 lg:top-8">
                <ContactInfoCard
                  settings={settings}
                  compact
                  className="rounded-none shadow-none lg:max-w-[300px] lg:rounded-button lg:shadow-[0_8px_30px_rgba(0,0,0,0.18)] lg:-translate-x-6"
                />
              </div>

              <div className="flex flex-col sm:flex-row lg:absolute lg:inset-x-0 lg:bottom-0">
                <div className="border-t border-white/10 bg-skyline-teal px-4 py-3.5 text-white sm:flex-[1.65] sm:px-5 sm:py-4 lg:border-t-0 lg:bg-[rgba(27,97,109,0.92)] lg:px-8 lg:py-8">
                  <h2 className="mb-1 font-[family-name:var(--font-heading)] text-base font-bold leading-snug sm:mb-1.5 sm:text-lg lg:mb-3 lg:text-[26px] lg:leading-tight">
                    {settings.familyCentreTitle}
                  </h2>
                  <p className="mb-2.5 text-sm leading-snug text-white/95 sm:mb-3 lg:mb-6 lg:leading-relaxed">
                    {settings.familyCentreText}
                  </p>
                  <Link
                    href={settings.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[36px] items-center gap-2 font-[family-name:var(--font-oswald)] text-[11px] font-medium uppercase tracking-[0.15em] hover:underline sm:min-h-[40px] sm:text-xs"
                  >
                    <svg className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Get Directions
                  </Link>
                </div>

                <Link
                  href="/#contact"
                  className="flex min-h-[40px] items-center justify-center border-t border-white/10 bg-[#1d2600] px-4 py-3 text-center font-[family-name:var(--font-oswald)] text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 sm:min-h-0 sm:flex-1 sm:border-t-0 sm:py-5 sm:text-xs lg:py-8"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
