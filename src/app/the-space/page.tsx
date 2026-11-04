import type { Metadata } from "next";
import Cafe from "@/components/cafe";

export const metadata: Metadata = {
  title: "The Space | Da Duke and Chai",
  description:
    "Explore the atmosphere of Da Duke: Roman arches, warm wood, cane, and the unhurried charm of tea-house afternoons.",
};
export default function SpacePage() {
  return <Cafe page="space" />;
}
