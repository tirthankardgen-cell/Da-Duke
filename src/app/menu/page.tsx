import type { Metadata } from "next";
import Cafe from "@/components/cafe";

export const metadata: Metadata = {
  title: "The Menu | Da Duke and Chai",
  description:
    "Browse our sample collection of Assam chai, Darjeeling tea, European café favourites and Bengal-inspired sweets.",
};
export default function MenuPage() {
  return <Cafe page="menu" />;
}
