"use client";

import { useState } from "react";
import { readMetrics } from "@/lib/demo-analytics";
import { cafeToday } from "@/lib/site-utils";
import { useContent } from "@/components/demo-content";

export default function Statistics({
  onNavigate,
}: {
  onNavigate: (tab: "content" | "events" | "media") => void;
}) {
  const [metrics, setMetrics] = useState(readMetrics);
  const [period, setPeriod] = useState(7);
  const [now, setNow] = useState(() => Date.now());
  const { events, media } = useContent();
  const days = Array.from({ length: period }, (_, i) =>
    cafeToday(new Date(now - (period - 1 - i) * 86400000)),
  );
  const rows = metrics.filter((row) => days.includes(row.day));
  const total = (
    key: "views" | "visits" | "whatsapp" | "directions" | "mobile" | "desktop",
  ) => rows.reduce((sum, row) => sum + (row[key] || 0), 0);
  const byDay = days.map((day) => ({
    day,
    views: rows
      .filter((row) => row.day === day)
      .reduce((sum, row) => sum + row.views, 0),
  }));
  const max = Math.max(1, ...byDay.map((day) => day.views));
  const byPage = Object.entries(
    rows.reduce<Record<string, number>>(
      (pages, row) => ({
        ...pages,
        [row.path]: (pages[row.path] || 0) + row.views,
      }),
      {},
    ),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="statistics">
      <div className="admin-section-title">
        <div>
          <p className="eyebrow">A LITTLE LOOK AROUND</p>
          <h2>
            Every visit tells <em>a story.</em>
          </h2>
        </div>
        <div className="stats-controls">
          <label className="sr-only" htmlFor="stats-period">
            Statistics period
          </label>
          <select
            id="stats-period"
            value={period}
            onChange={(event) => setPeriod(Number(event.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
          </select>
          <button
            onClick={() => {
              setMetrics(readMetrics());
              setNow(Date.now());
            }}
          >
            Refresh
          </button>
        </div>
      </div>
      <p className="admin-information">
        Real activity from this browser only. Explore the website, then refresh
        to see your visits. These counts do not represent the wider website
        audience.
      </p>
      <div className="stat-cards">
        {[
          ["Page views", total("views"), "Public page visits"],
          ["Tab visits", total("visits"), "New browser-tab sessions"],
          ["WhatsApp opens", total("whatsapp"), "Link clicks, not bookings"],
          ["Directions clicks", total("directions"), "Map links opened"],
        ].map(([label, value, note]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <p>{note}</p>
          </article>
        ))}
      </div>
      <div className="stats-main">
        <section className="admin-panel">
          <div className="panel-heading">
            <h3>A little coming & going</h3>
            <span>PAGE VIEWS · IST</span>
          </div>
          <div
            className="stats-chart"
            role="img"
            aria-label={`Page views over the last ${period} days: ${byDay.map((day) => `${day.day}: ${day.views}`).join(", ")}`}
          >
            <div className="chart-grid">
              <span>{max}</span>
              <span>{Math.round(max / 2)}</span>
              <span>0</span>
            </div>
            <div className="chart-bars">
              {byDay.map((day) => (
                <div
                  key={day.day}
                  title={`${day.day}: ${day.views} page views`}
                >
                  <span
                    style={{
                      height: `${(day.views / max) * 100}%`,
                      minHeight: day.views ? "3px" : "0",
                    }}
                  />
                  <i>{period === 7 ? day.day.slice(8) : ""}</i>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-dates">
            <span>{days[0]}</span>
            <span>{days[days.length - 1]}</span>
          </div>
          {!rows.length && (
            <p className="admin-empty">
              Your first visit is still to come. Open the site and take a little
              wander.
            </p>
          )}
        </section>
        <section className="admin-panel popular-pages">
          <div className="panel-heading">
            <h3>Favourite corners</h3>
            <span>TOP PAGES</span>
          </div>
          {byPage.length ? (
            <ol>
              {byPage.map(([path, views]) => (
                <li key={path}>
                  <span>{path === "/" ? "The landing page" : path}</span>
                  <strong>{views}</strong>
                </li>
              ))}
            </ol>
          ) : (
            <p className="admin-empty">Visited pages will appear here.</p>
          )}
          <div className="device-summary">
            <span>
              Mobile layouts <b>{total("mobile")}</b>
            </span>
            <span>
              Desktop & tablet <b>{total("desktop")}</b>
            </span>
          </div>
        </section>
      </div>
      <div className="admin-quick-actions">
        <button onClick={() => onNavigate("events")}>
          <span>01</span>
          <h3>Plan a gathering</h3>
          <p>
            {events.length} event{events.length === 1 ? "" : "s"} in the
            published demo
          </p>
          <b>Manage events ↗</b>
        </button>
        <button onClick={() => onNavigate("content")}>
          <span>02</span>
          <h3>Shape the story</h3>
          <p>Headlines, page copy and homepage sections</p>
          <b>Edit content ↗</b>
        </button>
        <button onClick={() => onNavigate("media")}>
          <span>03</span>
          <h3>Set the scene</h3>
          <p>{media.length} images in your collection</p>
          <b>Open media library ↗</b>
        </button>
      </div>
      <p className="admin-local-note">
        Counts are stored locally for approximately 31 days. Tab visits are an
        approximation, not unique people. Screen-size groups describe layouts,
        not verified device models. WhatsApp clicks cannot confirm that a
        message was sent. Cross-browser analytics, referrers and audience
        geography require a connected service.
      </p>
    </div>
  );
}
