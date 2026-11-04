"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useContent } from "@/components/demo-content";
import HeritageSketch, { InkStudy } from "@/components/heritage-sketch";
import MediaImage from "@/components/media-image";
import { Arrow } from "@/components/illustrations";
import { WhatsAppLink } from "@/components/enquiry";
import {
  eventDate,
  eventGroups,
  eventPhase,
  publicEvents,
  upcomingEvents,
} from "@/lib/site-utils";
import type { CafeEvent } from "@/lib/content";

// Updating the clock also moves a gathering between sections while the page is open.
function useEventClock() {
  const [now, setNow] = useState<number | undefined>();
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const first = window.setTimeout(refresh, 0);
    const interval = window.setInterval(refresh, 30000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);
  return now;
}

function EventCard({ event, now }: { event: CafeEvent; now?: number }) {
  const status =
    event.status !== "scheduled"
      ? event.status.replace("-", " ")
      : eventPhase(event, now) === "past"
        ? "Past gathering"
        : eventPhase(event, now) === "now"
          ? "Happening now"
          : "Upcoming";
  return (
    <article className="event-card">
      <Link
        href={`/gatherings/${event.slug}`}
        className="event-photo"
        aria-label={`Read about ${event.title}`}
      >
        <MediaImage id={event.image} sizes="(max-width: 700px) 90vw, 40vw" />
        <span className="event-status">{status}</span>
      </Link>
      <div className="event-card-body">
        <p className="eyebrow">
          {event.category} · {eventDate(event.startsAt)}
        </p>
        <h3>
          <Link href={`/gatherings/${event.slug}`}>{event.title}</Link>
        </h3>
        <p>{event.summary}</p>
        <Link href={`/gatherings/${event.slug}`} className="text-link">
          Discover the gathering
          <Arrow />
        </Link>
      </div>
    </article>
  );
}

export function EmptyGatherings({ past = false }: { past?: boolean }) {
  const { sections } = useContent();
  return (
    <div className={`empty-gatherings ${past ? "empty-gatherings-small" : ""}`}>
      <div className="empty-sketch">
        <InkStudy kind={past ? "rome" : "tea"} />
      </div>
      <div>
        <p className="eyebrow">
          {past ? "THE MEMORY BOOK" : "SOMETHING LOVELY IS BREWING"}
        </p>
        <h3>
          {past ? (
            <>
              Every story starts
              <br />
              <em>somewhere.</em>
            </>
          ) : (
            <>
              The next gathering
              <br />
              <em>is being prepared.</em>
            </>
          )}
        </h3>
        <p>
          {past
            ? "Memories of our past gatherings will find a home here."
            : sections.gatherings.body}
        </p>
        {!past && (
          <Link href="/private-affairs" className="text-link">
            Have an occasion in mind?
            <Arrow />
          </Link>
        )}
      </div>
    </div>
  );
}

export function GatheringsPreview() {
  const { sections, events } = useContent();
  const now = useEventClock();
  const selected = upcomingEvents(events, now)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 3);
  const copy = sections.gatherings;
  return (
    <section
      className="gatherings-preview section-spacing"
      aria-labelledby="gatherings-title"
    >
      <HeritageSketch kind="rome" />
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="gatherings-title">
              {copy.title}
              <br />
              <em>{copy.accent}</em>
            </h2>
          </div>
          <Link href="/gatherings" className="text-link">
            {copy.linkLabel}
            <Arrow />
          </Link>
        </div>
        {selected.length ? (
          <div className="event-grid">
            {selected.map((event) => (
              <EventCard key={event.id} event={event} now={now} />
            ))}
          </div>
        ) : (
          <EmptyGatherings />
        )}
      </div>
    </section>
  );
}

export function GatheringsList() {
  const { events } = useContent();
  const now = useEventClock();
  const [category, setCategory] = useState("All gatherings");
  const all = publicEvents(events);
  const filtered = all.filter(
    (event) => category === "All gatherings" || event.category === category,
  );
  const { live, future, past, updates } = eventGroups(filtered, now);
  return (
    <section className="gatherings-list section-spacing">
      <HeritageSketch kind="florence" side="left" />
      <div className="shell">
        {all.length > 0 && (
          <div
            className="filter-row"
            role="group"
            aria-label="Filter gatherings"
          >
            {[
              "All gatherings",
              ...new Set(all.map((event) => event.category)),
            ].map((value) => (
              <button
                key={value}
                aria-pressed={value === category}
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
          </div>
        )}
        {live.length > 0 && (
          <div className="event-group">
            <h2>
              Happening <em>now.</em>
            </h2>
            <div className="event-grid">
              {live.map((event) => (
                <EventCard key={event.id} event={event} now={now} />
              ))}
            </div>
          </div>
        )}
        <div className="event-group">
          <div className="group-heading">
            <h2>
              On the <em>horizon.</em>
            </h2>
            <span className="eyebrow">UPCOMING GATHERINGS</span>
          </div>
          {future.length ? (
            <div className="event-grid">
              {future.map((event) => (
                <EventCard key={event.id} event={event} now={now} />
              ))}
            </div>
          ) : (
            <EmptyGatherings />
          )}
        </div>
        {updates.length > 0 && (
          <div className="event-group schedule-updates">
            <div className="group-heading">
              <h2>
                A change of <em>plans.</em>
              </h2>
              <span className="eyebrow">SCHEDULE UPDATES</span>
            </div>
            <div className="event-grid">
              {updates.map((event) => (
                <EventCard key={event.id} event={event} now={now} />
              ))}
            </div>
          </div>
        )}
        <div className="event-group past-group">
          <div className="group-heading">
            <h2>
              In good <em>memory.</em>
            </h2>
            <span className="eyebrow">PAST GATHERINGS</span>
          </div>
          {past.length ? (
            <div className="event-grid">
              {past.map((event) => (
                <EventCard key={event.id} event={event} now={now} />
              ))}
            </div>
          ) : (
            <EmptyGatherings past />
          )}
        </div>
      </div>
    </section>
  );
}

export function EventDetails({ slug }: { slug: string }) {
  const { events } = useContent();
  const now = useEventClock();
  const event = publicEvents(events).find((item) => item.slug === slug);
  if (!event)
    return (
      <section className="missing-page section-spacing">
        <HeritageSketch kind="rome" />
        <div className="shell">
          <p className="eyebrow">A PAGE YET TO BE WRITTEN</p>
          <h1>
            This gathering
            <br />
            <em>isn’t on the calendar.</em>
          </h1>
          <p>It may be a draft, or the details may have changed.</p>
          <Link href="/gatherings" className="button button-green">
            Explore Gatherings
            <Arrow />
          </Link>
        </div>
      </section>
    );
  const canEnquire =
    event.enquiries &&
    eventPhase(event, now) !== "past" &&
    event.status === "scheduled";
  return (
    <article className="event-detail">
      <div className="shell">
        <Link href="/gatherings" className="breadcrumb">
          ← All Gatherings
        </Link>
        <div className="event-detail-heading">
          <p className="eyebrow">
            {event.category} · {eventDate(event.startsAt)}
          </p>
          <h1>{event.title}</h1>
          <p>{event.summary}</p>
        </div>
        <div className="event-detail-photo">
          <MediaImage id={event.image} eager sizes="90vw" />
        </div>
        <div className="event-detail-layout">
          <div className="event-prose">
            {event.body
              .split("\n")
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>
          <aside className="event-information">
            <p className="eyebrow">THE LITTLE DETAILS</p>
            <dl>
              <div>
                <dt>When</dt>
                <dd>
                  {eventDate(event.startsAt)}
                  <br />
                  {eventDate(event.startsAt, {
                    day: undefined,
                    month: undefined,
                    year: undefined,
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {eventDate(event.endsAt, {
                    day: undefined,
                    month: undefined,
                    year: undefined,
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  IST
                  {eventDate(event.startsAt) !== eventDate(event.endsAt) && (
                    <>
                      <br />
                      Ends {eventDate(event.endsAt)}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>{event.venue || "Venue details to be announced"}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  {event.status === "scheduled"
                    ? eventPhase(event, now) === "past"
                      ? "Past gathering"
                      : eventPhase(event, now) === "now"
                        ? "Happening now"
                        : "Upcoming"
                    : event.status.replace("-", " ")}
                </dd>
              </div>
            </dl>
            {canEnquire && (
              <>
                <WhatsAppLink
                  message={`Hello Da Duke and Chai! I’d like to enquire about ${event.title} on ${eventDate(event.startsAt)}. Please share the details.`}
                />
                <p className="form-note">
                  Enquiries are subject to confirmation by our team.
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
      <HeritageSketch kind="hills" />
    </article>
  );
}
