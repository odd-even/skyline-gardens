import { client, isSanityConfigured } from "./client";
import { homepageQuery } from "./queries";
import { fallbackData } from "./fallback";
import type { HomepageData, SiteSettings } from "./types";

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await getHomepageData();
  return data.settings;
}

export async function getHomepageData(): Promise<HomepageData> {
  if (!isSanityConfigured) {
    return fallbackData;
  }

  try {
    const data = await client.fetch<HomepageData>(homepageQuery);
    if (!data?.settings) {
      return fallbackData;
    }
    return data;
  } catch {
    return fallbackData;
  }
}
