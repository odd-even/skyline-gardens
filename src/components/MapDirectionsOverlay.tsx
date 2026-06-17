type MapDirectionsOverlayProps = {
  mapsUrl: string;
  address: string;
};

export function MapDirectionsOverlay({ mapsUrl, address }: MapDirectionsOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 sm:inset-x-auto sm:bottom-6 sm:left-6">
      <div className="pointer-events-auto max-w-[280px] rounded-button border border-white/90 bg-white/95 px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:max-w-[300px]">
        <h3 className="mb-1 font-[family-name:var(--font-heading)] text-base font-bold text-skyline-gray">
          Get Directions
        </h3>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-skyline-pink underline underline-offset-2 hover:text-skyline-teal"
        >
          Open in Google Maps
        </a>
        <p className="mt-2 text-xs leading-snug text-skyline-gray-light">{address}</p>
      </div>
    </div>
  );
}
