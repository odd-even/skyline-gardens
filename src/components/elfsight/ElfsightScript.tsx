"use client";

import Script from "next/script";
import { ELFSIGHT_PLATFORM_SCRIPT } from "./constants";

export function ElfsightScript() {
  return <Script src={ELFSIGHT_PLATFORM_SCRIPT} strategy="lazyOnload" />;
}
