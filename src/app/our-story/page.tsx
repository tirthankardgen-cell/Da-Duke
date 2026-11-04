import type { Metadata } from "next";
import Cafe from "@/components/cafe";

export const metadata: Metadata = {
  title: "Our Story | Da Duke and Chai",
  description:
    "European café charm, Assam tea traditions, and the familiar warmth of North Bengal. Discover the feeling behind Da Duke and Chai.",
};
export default function StoryPage() {
  return <Cafe page="story" />;
}
