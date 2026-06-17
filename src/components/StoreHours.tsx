"use client";

import { useEffect, useState } from "react";
import { getHoursBlocks, getMillisecondsUntilNextStatusChange, getOpenStatus } from "@/lib/hours";
import type { SiteSettings } from "@/sanity/types";

type StoreHoursProps = {
  settings: SiteSettings;
};

export function StoreHours({ settings }: StoreHoursProps) {
  const [status, setStatus] = useState(() => getOpenStatus(settings));
  const blocks = getHoursBlocks(settings);

  useEffect(() => {
    let timeoutId = 0;

    const updateStatus = () => {
      setStatus(getOpenStatus(settings));
      const delay = getMillisecondsUntilNextStatusChange(settings);
      timeoutId = window.setTimeout(updateStatus, Math.max(delay, 1000));
    };

    updateStatus();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [settings]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-button border border-white/15 bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="border-b border-white/10 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span
                className={`relative flex h-2.5 w-2.5 rounded-full ${
                  status.isOpen ? "bg-[#7ee081]" : "bg-white/35"
                }`}
                aria-hidden
              >
                {status.isOpen ? (
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#7ee081]/70" />
                ) : null}
              </span>
              <p
                className={`font-[family-name:var(--font-oswald)] text-sm font-medium uppercase tracking-[0.18em] ${
                  status.isOpen ? "text-[#b8f5ba]" : "text-white/70"
                }`}
              >
                {status.statusText}
              </p>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
              {status.heading}
            </h3>
            <p className="mt-1 text-sm text-white/75">{status.detail}</p>
          </div>

          <div className="rounded-button border border-white/15 bg-white/10 px-3 py-1.5">
            <p className="font-[family-name:var(--font-oswald)] text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
              Hours
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col divide-y divide-white/10">
        {blocks.map((block) => (
          <div key={block.title} className="px-5 py-5 sm:px-6">
            <p className="mb-4 font-[family-name:var(--font-oswald)] text-xs font-medium uppercase tracking-[0.2em] text-white/55">
              {block.title}
            </p>
            <dl className="space-y-3">
              {block.rows.map((row) => (
                <div
                  key={`${block.title}-${row.label}`}
                  className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-baseline gap-3 border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="text-base font-medium text-white/90">{row.label}</dt>
                  <dd className="text-right font-[family-name:var(--font-oswald)] text-base tracking-wide text-white">
                    {row.hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
