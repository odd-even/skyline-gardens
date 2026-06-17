import { useEffect, useState } from "react";

const HEADER_OFFSET = 120;

export function useScrollSpy(sectionIds: string[], enabled: boolean) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + HEADER_OFFSET;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [enabled, sectionIds]);

  return activeSection;
}

export function getSectionIdFromHref(href: string) {
  if (href.startsWith("/#")) {
    return href.slice(2);
  }

  return null;
}
