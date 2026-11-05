import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/the-house",
    "/the-carte",
    "/the-table",
    "/gatherings",
    "/private-affairs",
    "/visit-us",
    "/gallery",
    "/the-journal",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
