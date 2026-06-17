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
          <div className="flex min-h-[200px] flex-1 items-start overflow-hidden bg-white lg:min-h-[260px]">
            <Image
              src="/images/bannerimage-1.jpg"
              alt="Pink clematis flowers"
              width={1200}
              height={400}
              className="h-auto w-full max-h-[220px] object-contain object-left-top sm:max-h-[260px] lg:max-h-[320px]"
              priority
            />
          </div>

          <div className="shrink-0 px-6 pb-8 pt-4 sm:px-10 lg:px-12 lg:pb-10">
            <div className="decorative-lines">
              <span />
              <span />
              <span />
            </div>

            <h1 className="hero-heading mb-5">{settings.heroTitle}</h1>
            <p className="mb-8 max-w-xl text-[17px] leading-[1.7] text-skyline-gray-light">
              {settings.heroText}
            </p>
            <Link href="/#products" className="hero-cta">
              What we offer
            </Link>
          </div>
        </div>

        {/* Right column — one container, one background image, panels inside */}
        <div className="relative min-h-[560px] overflow-hidden">
          <Image
            src="/images/gardener-17.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
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

          <div className="absolute right-4 top-6 z-10 sm:right-6 lg:right-6 lg:top-8">
            <ContactInfoCard
              settings={settings}
              className="w-full max-w-[300px] -translate-x-2 lg:-translate-x-6"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex">
            <div className="flex-[1.65] bg-[rgba(27,97,109,0.92)] px-6 py-8 text-white lg:px-8">
              <h2 className="mb-3 font-[family-name:var(--font-heading)] text-xl font-bold leading-tight lg:text-[26px]">
                {settings.familyCentreTitle}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-white/95">
                {settings.familyCentreText}
              </p>
              <Link
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-[0.15em] hover:underline"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Get Directions
              </Link>
            </div>

            <Link
              href="/#contact"
              className="flex flex-1 items-center justify-center bg-[#1d2600] px-4 py-8 text-center font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
