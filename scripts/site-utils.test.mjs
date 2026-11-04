import test from "node:test";
import assert from "node:assert/strict";
import {
  cafeToday,
  eventDate,
  eventGroups,
  eventPhase,
  occasionMessage,
  publicEvents,
  safeExternalUrl,
  slugify,
  upcomingEvents,
  validateEvent,
  whatsappUrl,
} from "../src/lib/site-utils.ts";

const event = {
  id: "one",
  slug: "tea-and-stories",
  title: "Tea and stories",
  summary: "A test gathering",
  body: "",
  startsAt: "2026-11-05T18:00:00+05:30",
  endsAt: "2026-11-05T20:00:00+05:30",
  category: "Tea tasting",
  image: "",
  venue: "",
  status: "scheduled",
  published: true,
  featured: false,
  enquiries: true,
};

test("events change from upcoming to happening now to past at exact timestamps", () => {
  assert.equal(
    eventPhase(event, Date.parse("2026-11-05T12:29:59Z")),
    "upcoming",
  );
  assert.equal(eventPhase(event, Date.parse("2026-11-05T12:30:00Z")), "now");
  assert.equal(eventPhase(event, Date.parse("2026-11-05T14:30:00Z")), "past");
});

test("drafts, invalid dates and reversed ranges never appear in public events", () => {
  assert.deepEqual(
    publicEvents([
      event,
      { ...event, published: false },
      { ...event, startsAt: "invalid" },
      { ...event, endsAt: event.startsAt },
      { ...event, endsAt: "2026-11-01T10:00:00Z" },
    ]),
    [event],
  );
});

test("home events omit cancelled, postponed and past events and sort by time", () => {
  const later = {
    ...event,
    id: "two",
    startsAt: "2026-11-06T12:30:00Z",
    endsAt: "2026-11-06T14:30:00Z",
  };
  assert.deepEqual(
    upcomingEvents(
      [
        later,
        { ...event, status: "cancelled" },
        event,
        { ...event, status: "postponed" },
        {
          ...event,
          startsAt: "2026-11-01T10:00:00Z",
          endsAt: "2026-11-01T11:00:00Z",
        },
      ],
      Date.parse("2026-11-05T10:00:00Z"),
    ),
    [event, later],
  );
});

test("event validation protects stable unique routes and valid time ranges", () => {
  assert.equal(validateEvent(event, [event]), null);
  assert.match(validateEvent({ ...event, id: "two" }, [event]), /already uses/);
  assert.match(validateEvent({ ...event, slug: "../escape" }, []), /URL slug/);
  assert.match(
    validateEvent({ ...event, endsAt: event.startsAt }, []),
    /after/,
  );
  assert.match(validateEvent({ ...event, startsAt: "" }, []), /valid start/);
  assert.match(validateEvent({ ...event, title: " " }, []), /title/);
  assert.equal(
    slugify("An evening of tea & stories!"),
    "an-evening-of-tea-stories",
  );
});

test("WhatsApp links require a valid number and round-trip the complete message", () => {
  assert.equal(whatsappUrl("", "Hello"), null);
  assert.equal(whatsappUrl("abc123456789", "Hello"), null);
  assert.equal(whatsappUrl("123", "Hello"), null);
  const message = "Tea & stories?\nA gathering for 12 — please share details.";
  // Syntactic number for a pure URL test; never configured on the public demo.
  const url = new URL(whatsappUrl("+91 (00000) 00000", message));
  assert.equal(url.pathname, "/910000000000");
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.origin, "https://wa.me");
});

test("the cafe date uses India time across midnight, independent of browser timezone", () => {
  assert.equal(cafeToday(new Date("2026-11-04T18:29:59Z")), "2026-11-04");
  assert.equal(cafeToday(new Date("2026-11-04T18:30:00Z")), "2026-11-05");
  assert.match(eventDate("2026-11-04T18:30:00Z"), /5 November 2026/);
});

test("optional enquiry fields compose a message without implying a booking", () => {
  assert.equal(
    occasionMessage("Birthday", "", "", ""),
    "Hello Da Duke and Chai! I’d like to enquire about a birthday. Please share the details.",
  );
  const message = occasionMessage(
    "Anniversary",
    "2026-11-15",
    "12",
    "  Tea & music, please.  ",
  );
  assert.match(
    message,
    /an anniversary on 15 November 2026 for around 12 guests/,
  );
  assert.ok(message.endsWith("\n\nTea & music, please."));
  assert.doesNotMatch(message, /confirmed|reserved|booked/);
});

test("external settings accept secure URLs and reject executable or malformed URLs", () => {
  assert.equal(
    safeExternalUrl("https://example.com/menu.pdf"),
    "https://example.com/menu.pdf",
  );
  for (const input of [
    "",
    "not a url",
    "javascript:alert(1)",
    "data:text/html,test",
    "http://example.com",
    "//example.com",
  ]) {
    assert.equal(safeExternalUrl(input), null);
  }
});

test("cancelled and postponed dates have their own updates group until the original end time", () => {
  const now = Date.parse("2026-11-05T13:00:00Z");
  const cancelled = { ...event, id: "cancelled", status: "cancelled" };
  const postponed = {
    ...event,
    id: "postponed",
    status: "postponed",
    startsAt: "2026-11-06T12:30:00Z",
    endsAt: "2026-11-06T14:30:00Z",
  };
  const groups = eventGroups([event, cancelled, postponed], now);
  assert.deepEqual(groups.live, [event]);
  assert.deepEqual(groups.future, []);
  assert.deepEqual(groups.past, []);
  assert.deepEqual(groups.updates, [cancelled, postponed]);
});
