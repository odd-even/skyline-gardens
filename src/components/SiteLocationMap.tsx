import { getSiteSettings } from "@/sanity/fetch";
import { LocationMap } from "./LocationMap";
import { MapDirectionsOverlay } from "./MapDirectionsOverlay";

export async function SiteLocationMap() {
  const settings = await getSiteSettings();

  return (
    <div id="location" className="relative">
      <LocationMap address={settings.fullAddress} />
      <MapDirectionsOverlay mapsUrl={settings.mapsUrl} address={settings.fullAddress} />
    </div>
  );
}
