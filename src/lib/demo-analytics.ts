export type LocalMetric = {
  day: string;
  path: string;
  views: number;
  visits: number;
  whatsapp: number;
  directions: number;
  mobile: number;
  desktop: number;
};
const KEY = "da-duke-demo-statistics-v1";
const VISIT_KEY = "da-duke-demo-visit";

export function readMetrics(): LocalMetric[] {
  if (typeof window === "undefined") return [];
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(data)
      ? data.filter(
          (item) =>
            typeof item.day === "string" &&
            typeof item.path === "string" &&
            Number.isFinite(item.views),
        )
      : [];
  } catch {
    return [];
  }
}

export function trackDemo(
  type: "views" | "whatsapp" | "directions",
  path: string,
) {
  try {
    const day = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const cutoff = new Date(Date.now() - 31 * 86400000)
      .toISOString()
      .slice(0, 10);
    const rows = readMetrics().filter((row) => row.day >= cutoff);
    let row = rows.find((entry) => entry.day === day && entry.path === path);
    if (!row) {
      row = {
        day,
        path,
        views: 0,
        visits: 0,
        whatsapp: 0,
        directions: 0,
        mobile: 0,
        desktop: 0,
      };
      rows.push(row);
    }
    row[type]++;
    if (type === "views") {
      row[window.innerWidth < 768 ? "mobile" : "desktop"]++;
      if (!sessionStorage.getItem(VISIT_KEY)) {
        sessionStorage.setItem(VISIT_KEY, "started");
        row.visits++;
      }
    }
    localStorage.setItem(KEY, JSON.stringify(rows));
  } catch {
    /* Disabled storage must never block the public site. */
  }
}
