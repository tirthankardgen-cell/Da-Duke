import type { CafeEvent } from "./content";

export const CAFE_TIMEZONE = "Asia/Kolkata";

export function whatsappUrl(number: string, message: string): string | null {
  const digits = number.replace(/[\s()+.-]/g, "");
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export function eventPhase(
  event: CafeEvent,
  now = Date.now(),
): "upcoming" | "now" | "past" {
  if (new Date(event.endsAt).getTime() <= now) return "past";
  if (new Date(event.startsAt).getTime() > now) return "upcoming";
  return "now";
}

export function publicEvents(events: CafeEvent[]) {
  return events.filter(
    (event) =>
      event.published &&
      Number.isFinite(Date.parse(event.startsAt)) &&
      Number.isFinite(Date.parse(event.endsAt)) &&
      Date.parse(event.endsAt) > Date.parse(event.startsAt),
  );
}

export function upcomingEvents(events: CafeEvent[], now = Date.now()) {
  return publicEvents(events)
    .filter(
      (event) =>
        eventPhase(event, now) !== "past" &&
        event.status !== "cancelled" &&
        event.status !== "postponed",
    )
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

export function eventGroups(events: CafeEvent[], now = Date.now()) {
  const sorted = publicEvents(events).sort(
    (a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt),
  );
  const changed = (event: CafeEvent) =>
    event.status === "cancelled" || event.status === "postponed";
  return {
    live: sorted.filter(
      (event) => eventPhase(event, now) === "now" && !changed(event),
    ),
    future: sorted.filter(
      (event) => eventPhase(event, now) === "upcoming" && !changed(event),
    ),
    updates: sorted.filter(
      (event) => eventPhase(event, now) !== "past" && changed(event),
    ),
    past: sorted.filter((event) => eventPhase(event, now) === "past").reverse(),
  };
}

export function eventDate(value: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: CAFE_TIMEZONE,
    ...options,
  }).format(new Date(value));
}

export function cafeToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CAFE_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (name: string) => parts.find((p) => p.type === name)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validateEvent(
  event: CafeEvent,
  others: CafeEvent[],
): string | null {
  if (!event.title.trim() || !event.summary.trim())
    return "Add a title and a short description.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.slug))
    return "Use a URL slug with lowercase letters, numbers and hyphens.";
  if (
    others.some((other) => other.id !== event.id && other.slug === event.slug)
  )
    return "Another gathering already uses this URL slug.";
  if (
    !Number.isFinite(Date.parse(event.startsAt)) ||
    !Number.isFinite(Date.parse(event.endsAt))
  )
    return "Choose valid start and end dates.";
  if (Date.parse(event.endsAt) <= Date.parse(event.startsAt))
    return "The gathering must end after it starts.";
  return null;
}

export function occasionMessage(
  occasion: string,
  date: string,
  guests: string,
  notes: string,
) {
  const day = date ? ` on ${eventDate(`${date}T12:00:00+05:30`)}` : "";
  const group = guests ? ` for around ${guests} guests` : "";
  return `Hello Da Duke and Chai! I’d like to enquire about ${occasion.toLowerCase() === "anniversary" ? "an" : "a"} ${occasion.toLowerCase()}${day}${group}. Please share the details.${notes.trim() ? `\n\n${notes.trim()}` : ""}`;
}
