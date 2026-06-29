import type { SiteSettings } from "@/sanity/types";
import { buildFaqSchema, buildStructuredDataGraph } from "@/lib/structured-data";

type StructuredDataProps = {
  settings: SiteSettings;
};

export function StructuredData({ settings }: StructuredDataProps) {
  const graph = buildStructuredDataGraph(settings);
  const faq = buildFaqSchema(settings);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
