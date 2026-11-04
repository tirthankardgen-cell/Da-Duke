import type { Metadata } from "next";
import Cafe from "@/components/cafe";

export const metadata: Metadata = {
  title: "Visit Us | Da Duke and Chai",
  description:
    "Imagine your next slow afternoon at Da Duke and Chai. Explore our sample visit planner and café opening information.",
};
export default function VisitPage() {
  return <Cafe page="visit" />;
}
