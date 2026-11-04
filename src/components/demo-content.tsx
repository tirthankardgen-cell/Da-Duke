"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { initialContent, type SiteContent } from "@/lib/content";

const STORAGE_KEY = "da-duke-demo-content-v1";
type DemoState = {
  published: SiteContent;
  draft: SiteContent;
  updatedAt: string | null;
};
const serverState: DemoState = {
  published: initialContent,
  draft: initialContent,
  updatedAt: null,
};
let state = serverState;
let initialized = false;
const listeners = new Set<() => void>();
export const ContentPreview = createContext<SiteContent | null>(null);

function isContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const content = value as SiteContent;
  return (
    content.version === 1 &&
    !!content.settings &&
    Array.isArray(content.settings.hours) &&
    !!content.pages &&
    Object.keys(initialContent.pages).every((key) => key in content.pages) &&
    !!content.sections &&
    Object.keys(initialContent.sections).every(
      (key) => key in content.sections,
    ) &&
    Array.isArray(content.homeSections) &&
    Array.isArray(content.menu) &&
    Array.isArray(content.media) &&
    Array.isArray(content.menuCategories) &&
    Array.isArray(content.houseNotes) &&
    Array.isArray(content.events)
  );
}

function readStorage() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null",
    ) as DemoState | null;
    return saved && isContent(saved.published) && isContent(saved.draft)
      ? saved
      : serverState;
  } catch {
    return serverState;
  }
}

function getSnapshot() {
  if (!initialized && typeof window !== "undefined") {
    state = readStorage();
    initialized = true;
  }
  return state;
}

function onStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY || event.key === null) {
    state = readStorage();
    listeners.forEach((notify) => notify());
  }
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function persist(next: DemoState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    throw new Error(
      "This browser could not save the changes. Storage may be full or disabled. Your edits are still in the form; try a smaller image or export your draft.",
    );
  }
  state = next;
  listeners.forEach((notify) => notify());
}

export function useDemoState() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverState);
}

export function useContent() {
  const preview = useContext(ContentPreview);
  const published = useDemoState().published;
  return preview || published;
}

export function saveDraft(draft: SiteContent) {
  persist({ ...getSnapshot(), draft, updatedAt: new Date().toISOString() });
}

export function publishDemo(draft: SiteContent) {
  persist({ published: draft, draft, updatedAt: new Date().toISOString() });
}

export function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  state = serverState;
  listeners.forEach((notify) => notify());
}
