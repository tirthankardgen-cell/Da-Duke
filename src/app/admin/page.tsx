import type { Metadata } from "next";
import AdminStudio from "@/components/admin/studio";
import "./studio.css";
export const metadata: Metadata = {
  title: "The Content Studio | Da Duke and Chai",
  description:
    "The browser-only content management demonstration for Da Duke and Chai.",
  robots: { index: false, follow: false },
};
export default function AdminPage() {
  return <AdminStudio />;
}
