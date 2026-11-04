import type { Metadata } from "next";
import Cafe from "@/components/cafe";
export const metadata: Metadata = {
  title: "Terms | Da Duke and Chai",
  description: "The concept website, illustrative content and enquiry terms.",
  alternates: { canonical: "/terms" },
};
export default function Page() {
  return <Cafe page="terms" />;
}
