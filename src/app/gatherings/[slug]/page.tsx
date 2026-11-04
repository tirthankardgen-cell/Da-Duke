import type { Metadata } from "next";
import Cafe from "@/components/cafe";
export const metadata: Metadata = {
  title: "A Gathering | Da Duke and Chai",
  description:
    "An occasion at Da Duke and Chai. Explore the details and enquire on WhatsApp.",
  robots: { index: false, follow: false },
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Cafe page="event" slug={slug} />;
}
