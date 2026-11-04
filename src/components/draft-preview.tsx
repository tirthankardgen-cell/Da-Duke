"use client";
import Cafe from "@/components/cafe";
import { ContentPreview, useDemoState } from "@/components/demo-content";
import type { PageId } from "@/lib/content";

export default function DraftPreview({
  page,
  event,
}: {
  page: PageId;
  event?: string;
}) {
  const { draft } = useDemoState();
  // This is an explicitly public demo with no private content or server authentication.
  const content = event
    ? {
        ...draft,
        events: draft.events.map((item) =>
          item.slug === event ? { ...item, published: true } : item,
        ),
      }
    : draft;
  return (
    <ContentPreview value={content}>
      <Cafe page={event ? "event" : page} slug={event} preview />
    </ContentPreview>
  );
}
