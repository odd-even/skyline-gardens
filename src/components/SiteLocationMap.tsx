import { getSiteSettings } from "@/sanity/fetch";
import { LocationMap } from "./LocationMap";

export async function SiteLocationMap() {
  const settings = await getSiteSettings();

  return <LocationMap address={settings.fullAddress} />;
}
