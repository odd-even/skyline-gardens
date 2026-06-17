/** Public Sanity project — safe to default when env is unset (e.g. Vercel preview). */
export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "livlgj6e";

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-01-01";

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id";
