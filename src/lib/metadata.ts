import type { Metadata } from "next";
import { initialContent, pageLinks, type PageId } from "@/lib/content";

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export function pageMetadata(id: PageId, path: string): Metadata {
  const title =
    id === "home"
      ? "Da Duke and Chai | Where the Alps meet the Himalayas"
      : `${pageLinks.find((link) => link.id === id)?.label || (id === "table" ? "The Table" : "The Journal")} | Da Duke and Chai`;
  const description =
    id === "home"
      ? `${initialContent.storybook.cover.description} ${initialContent.storybook.cover.body}`
      : initialContent.pages[id].description;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "/images/social-card.jpg",
          width: 1200,
          height: 630,
          alt: "Da Duke and Chai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/social-card.jpg"],
    },
  };
}
