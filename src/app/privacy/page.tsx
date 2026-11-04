import type { Metadata } from "next";
import Cafe from "@/components/cafe";
export const metadata: Metadata = {
  title: "Privacy | Da Duke and Chai",
  description:
    "How this demonstration handles local data and WhatsApp enquiries.",
  alternates: { canonical: "/privacy" },
};
export default function Page() {
  return <Cafe page="privacy" />;
}
