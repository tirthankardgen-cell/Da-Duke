import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./pages.css";
import "./journey.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000",
  ),
  title:
    "Da Duke and Chai | A European state of mind. A Himalayan cup of soul.",
  robots: { index: false, follow: false },
  description:
    "European café charm meets the tea traditions of Assam and the warmth of North Bengal. Discover Da Duke and Chai — a café for the unhurried.",
  openGraph: {
    title: "Da Duke and Chai",
    description: "A little Europe. A lot of home. A café for the unhurried.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/social-card.jpg",
        width: 1200,
        height: 630,
        alt: "Da Duke and Chai — European soul. Bengal at heart.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Da Duke and Chai",
    description: "A little Europe. A lot of home.",
    images: ["/images/social-card.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#f3eee4" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
