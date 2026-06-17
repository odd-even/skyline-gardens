"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { getSectionIdFromHref, useScrollSpy } from "@/hooks/useScrollSpy";
import { siteNavLinks } from "@/lib/site-nav";

const navLinks = siteNavLinks;

const homeSectionIds = ["welcome", "products", "who-we-are", "contact", "location"];

function getNavLinkClassName(isActive: boolean, mobile = false) {
  const base = mobile
    ? "block rounded-button px-2 py-3 font-[family-name:var(--font-oswald)] text-sm uppercase tracking-wider transition-colors"
    : "font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-[0.12em] transition-colors lg:text-sm";

  return `${base} ${isActive ? "text-skyline-pink" : mobile ? "text-skyline-gray" : "text-skyline-gray-light"} hover:text-skyline-pink`;
}

function isNavLinkActive(
  href: string,
  pathname: string,
  activeSection: string,
) {
  if (href === "/products") {
    return pathname === "/products";
  }

  if (pathname !== "/") {
    return false;
  }

  const sectionId = getSectionIdFromHref(href);
  return sectionId === activeSection;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useScrollSpy(homeSectionIds, isHome);
  const isScrolled = useScrolled();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div
        className={`content-max flex items-center justify-between px-4 transition-[padding] duration-300 ease-out sm:px-6 lg:justify-center lg:gap-5 lg:px-8 xl:gap-7 ${
          isScrolled ? "py-2 lg:py-2" : "py-3 lg:py-3.5"
        }`}
      >
        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary left">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={getNavLinkClassName(isNavLinkActive(link.href, pathname, activeSection))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="shrink-0 px-1 lg:px-2">
          <Image
            src="/images/logo.png"
            alt="Skyline Gardens"
            width={200}
            height={88}
            className={`w-auto origin-center transition-all duration-300 ease-out ${
              isScrolled ? "h-10 lg:h-11" : "h-12 sm:h-14 lg:h-16"
            }`}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Primary right">
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={getNavLinkClassName(isNavLinkActive(link.href, pathname, activeSection))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-button lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-3.5 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-skyline-gray transition-transform duration-200 ${
                menuOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-skyline-gray transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-skyline-gray transition-transform duration-200 ${
                menuOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/25 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
          <nav
            className="relative z-50 border-t border-black/5 bg-white px-4 py-2 shadow-lg sm:px-6 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="divide-y divide-black/5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={getNavLinkClassName(
                      isNavLinkActive(link.href, pathname, activeSection),
                      true,
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
