import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "skyline-gardens",
  title: "Skyline Gardens",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
