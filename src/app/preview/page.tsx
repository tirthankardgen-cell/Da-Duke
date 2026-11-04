import type { Metadata } from "next";
import DraftPreview from "@/components/draft-preview";
import { initialContent, type PageId } from "@/lib/content";
export const metadata: Metadata = {
  title: "Draft Preview | Da Duke and Chai",
  robots: { index: false, follow: false },
};
export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; event?: string }>;
}) {
  const params = await searchParams;
  const page =
    params.page && params.page in initialContent.pages
      ? (params.page as PageId)
      : "home";
  return <DraftPreview page={page} event={params.event} />;
}
