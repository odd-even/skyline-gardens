"use client";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { skylineMapStyles } from "@/lib/map-styles";

const DEFAULT_CENTER = { lat: 46.011921, lng: -66.688947 };

type LocationMapProps = {
  address: string;
  zoom?: number;
};

export function LocationMap({ address, zoom = 12 }: LocationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError("Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the styled map.");
      return;
    }

    let cancelled = false;

    setOptions({ key: apiKey, v: "weekly" });

    Promise.all([
      importLibrary("maps"),
      importLibrary("geocoding"),
      importLibrary("marker"),
    ])
      .then(async ([mapsLibrary, geocodingLibrary, markerLibrary]) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        const { Map } = mapsLibrary;
        const { Geocoder } = geocodingLibrary;
        const { Marker } = markerLibrary;

        const map = new Map(containerRef.current, {
          center: DEFAULT_CENTER,
          zoom,
          styles: skylineMapStyles,
          disableDefaultUI: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        const geocoder = new Geocoder();

        geocoder.geocode({ address }, (results, status) => {
          if (cancelled) {
            return;
          }

          const position =
            status === "OK" && results?.[0]?.geometry?.location
              ? results[0].geometry.location
              : DEFAULT_CENTER;

          map.setCenter(position);
          new Marker({
            map,
            position,
            title: "Skyline Gardens",
          });
        });
      })
      .catch(() => {
        if (!cancelled) {
          setError("Unable to load Google Maps.");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [address, zoom]);

  if (error) {
    return (
      <div
        id="location"
        className="flex h-[320px] items-center justify-center bg-[#1d2600] px-6 text-center text-sm text-white/80 sm:h-[380px] lg:h-[450px]"
      >
        {error}
      </div>
    );
  }

  return (
    <div
      id="location"
      ref={containerRef}
      className="h-[320px] w-full bg-[#1d2600] sm:h-[380px] lg:h-[450px]"
      role="region"
      aria-label="Skyline Gardens location on Google Maps"
    />
  );
}
