import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./sanity/project";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "skyline-gardens",
  title: "Skyline Gardens",
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
