import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from "../../sanity/project";

/** Public Sanity project — env can override the committed defaults. */
export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || SANITY_PROJECT_ID;

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || SANITY_DATASET;

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || SANITY_API_VERSION;

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your_project_id";
