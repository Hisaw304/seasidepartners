import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "gol89usa",
  dataset: "production",
  apiVersion: "2025-11-05",
  useCdn: true,
});
