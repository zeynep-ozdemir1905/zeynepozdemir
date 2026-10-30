import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/resume`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
