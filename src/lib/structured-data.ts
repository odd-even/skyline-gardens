import type { SiteSettings } from "@/sanity/types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const GEO = {
  latitude: 45.892,
  longitude: -66.823,
};

function parsePhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return phone;
}

function hoursLinesFromSettings(settings: SiteSettings): string[] {
  const lines: string[] = [];

  for (const schedule of settings.hoursSchedules ?? []) {
    const block = schedule.hours
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(1);

    for (const line of block) {
      lines.push(`${schedule.title}: ${line}`);
    }
  }

  return lines;
}

function buildOpeningHoursSpec(settings: SiteSettings) {
  const specs: Record<string, unknown>[] = [];

  for (const schedule of settings.hoursSchedules ?? []) {
    const rows = schedule.hours
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(1);

    for (const row of rows) {
      const match = row.match(/^(.+?):\s*(.+)$/);
      if (!match) {
        continue;
      }

      const dayLabel = match[1].trim();
      const timeRange = match[2].trim();
      const timeMatch = timeRange.match(/(.+?)\s*[-–]\s*(.+)/);
      if (!timeMatch) {
        continue;
      }

      const dayMap: Record<string, string[]> = {
        monday: ["Monday"],
        tuesday: ["Tuesday"],
        wednesday: ["Wednesday"],
        thursday: ["Thursday"],
        friday: ["Friday"],
        saturday: ["Saturday"],
        sunday: ["Sunday"],
      };

      const normalized = dayLabel.toLowerCase();
      let daysOfWeek: string[] = [];

      if (normalized.includes("–") || normalized.includes("-")) {
        const [startRaw, endRaw] = normalized.split(/[–-]/).map((part) => part.trim());
        const order = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        const startIdx = order.indexOf(startRaw);
        const endIdx = order.indexOf(endRaw);
        if (startIdx >= 0 && endIdx >= 0) {
          daysOfWeek = order.slice(startIdx, endIdx + 1).map((day) => dayMap[day][0]);
        }
      } else {
        daysOfWeek = dayMap[normalized] ?? [];
      }

      if (daysOfWeek.length === 0) {
        continue;
      }

      specs.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: daysOfWeek,
        opens: normalizeSchemaTime(timeMatch[1]),
        closes: normalizeSchemaTime(timeMatch[2]),
        validFrom: schedule.startsOn,
        ...(schedule.endsOn ? { validThrough: schedule.endsOn } : {}),
      });
    }
  }

  return specs;
}

function normalizeSchemaTime(value: string): string {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) {
    return value.trim();
  }

  let hours = Number(match[1]) % 12;
  const minutes = match[2] ?? "00";
  if (match[3].toUpperCase() === "PM") {
    hours += 12;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

export function buildFaqSchema(settings: SiteSettings) {
  const hoursSummary =
    hoursLinesFromSettings(settings).join("; ") ||
    "Seasonal hours from late April through mid-September.";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Skyline Gardens located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${SITE_NAME} is located at ${settings.fullAddress}, Canada.`,
        },
      },
      {
        "@type": "Question",
        name: "What are Skyline Gardens store hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: hoursSummary,
        },
      },
      {
        "@type": "Question",
        name: "What does Skyline Gardens sell?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Skyline Gardens sells bedding plants, annuals, perennials, vegetables, herbs, succulents, cacti, hanging baskets, patio planters, ornamental grasses, and seasonal greenhouse-grown plants.",
        },
      },
      {
        "@type": "Question",
        name: "How do I contact Skyline Gardens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Call ${settings.phone} or email ${settings.email}.`,
        },
      },
      {
        "@type": "Question",
        name: "When is Skyline Gardens open for the season?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The garden centre season typically runs from ${settings.seasonOpensOn} through ${settings.seasonClosesOn}.`,
        },
      },
    ],
  };
}

export function buildStructuredDataGraph(settings: SiteSettings) {
  const openingHoursSpecification = buildOpeningHoursSpec(settings);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-CA",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": ["GardenStore", "LocalBusiness"],
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/images/gardener-02.png`,
        telephone: parsePhoneE164(settings.phone),
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "644 Route 616",
          addressLocality: "Keswick Ridge",
          addressRegion: "NB",
          postalCode: "E6L 1S8",
          addressCountry: "CA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "New Brunswick, Canada",
        },
        sameAs: [settings.facebookUrl, settings.instagramUrl].filter(Boolean),
        ...(openingHoursSpecification.length > 0
          ? { openingHoursSpecification }
          : {}),
      },
    ],
  };
}
