import Image from "next/image";
import Link from "next/link";
import { siteNavLinks } from "@/lib/site-nav";
import { getSiteSettings } from "@/sanity/fetch";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-[0.2em] text-skyline-pink">
      {children}
    </h3>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-button border border-white/25 text-white transition-colors hover:border-skyline-pink hover:bg-skyline-pink/10 hover:text-white"
    >
      {children}
    </a>
  );
}

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const phoneDigits = settings.phone.replace(/\D/g, "");

  return (
    <footer className="border-t border-skyline-pink bg-[#1d2600] text-white">
      <div className="content-max px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Skyline Gardens"
                width={200}
                height={88}
                className="h-auto w-full max-w-[180px] brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75">
              Your local family garden centre in Keswick Ridge, New Brunswick.
            </p>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {siteNavLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-oswald)] text-sm uppercase tracking-wider text-white/85 transition-colors hover:text-skyline-pink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <FooterHeading>Visit Us</FooterHeading>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-white/85">
              <p className="flex gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-skyline-pink"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{settings.fullAddress}</span>
              </p>
              <p>
                <a
                  href={`tel:+1${phoneDigits}`}
                  className="transition-colors hover:text-skyline-pink"
                >
                  {settings.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${settings.email}`}
                  className="break-all transition-colors hover:text-skyline-pink"
                >
                  {settings.email}
                </a>
              </p>
            </address>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#contact" className="hero-cta text-xs">
                Contact Us
              </Link>
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-button border border-white/40 px-5 py-3 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div>
            <FooterHeading>Connect</FooterHeading>
            <p className="mb-4 text-sm leading-relaxed text-white/75">
              Follow us for seasonal updates, specials, and garden inspiration.
            </p>
            <div className="flex gap-3">
              <SocialButton href={settings.facebookUrl} label="Follow on Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialButton>
              <SocialButton href={settings.instagramUrl} label="Follow on Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialButton>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="content-max flex flex-col items-center gap-6 px-6 py-6 text-center text-sm text-white/70 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
          <p>
            Copyright © {year} Skyline Gardens. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <span className="font-[family-name:var(--font-oswald)] text-[10px] uppercase tracking-[0.18em] text-white/50">
              Website Development
            </span>
            <a
              href="https://darrowdesign.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              <Image
                src="/images/logo-color-white.png"
                alt="Designed by Darrow Design"
                width={160}
                height={48}
                className="h-8 w-auto brightness-0 invert"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
