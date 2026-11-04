"use client";

import Link from "next/link";
import { useEffect, useState, type SetStateAction } from "react";
import { initialContent, type SiteContent } from "@/lib/content";
import { validateEvent, safeExternalUrl, whatsappUrl } from "@/lib/site-utils";
import {
  publishDemo,
  resetDemo,
  saveDraft,
  useDemoState,
} from "@/components/demo-content";
import DemoLogin, {
  setDemoAccess,
  useDemoAccess,
} from "@/components/admin/demo-login";
import Statistics from "@/components/admin/statistics";
import {
  PagesEditor,
  EventsEditor,
  MenuEditor,
  MediaEditor,
  SettingsEditor,
} from "@/components/admin/content-editors";
import { Arrow } from "@/components/illustrations";

type Tab = "overview" | "content" | "events" | "menu" | "media" | "settings";
const tabs: { id: Tab; title: string; short: string }[] = [
  { id: "overview", title: "At a glance", short: "Overview" },
  { id: "content", title: "Pages & stories", short: "Content" },
  { id: "events", title: "Gatherings", short: "Events" },
  { id: "menu", title: "The menu", short: "Menu" },
  { id: "media", title: "Media library", short: "Images" },
  { id: "settings", title: "House settings", short: "Settings" },
];

function validateContent(content: SiteContent): string | null {
  for (const [key, copy] of Object.entries(content.pages)) {
    if (!copy.title.trim() || !copy.description.trim())
      return `Add a headline and introduction to the ${key} page.`;
  }
  for (const event of content.events.filter((item) => item.published)) {
    const issue = validateEvent(event, content.events);
    if (issue) return `${event.title || "Gathering"}: ${issue}`;
  }
  const categories = content.menuCategories.map((value) => value.trim());
  if (
    categories.some((value) => !value) ||
    new Set(categories).size !== categories.length
  )
    return "Menu categories must be named and unique.";
  for (const item of content.menu) {
    if (!item.name.trim() || !item.description.trim())
      return "Add a name and description to each menu item before publishing.";
    if (!categories.includes(item.category))
      return `Choose an existing category for ${item.name}.`;
    if (
      item.price &&
      (!Number.isFinite(Number(item.price)) || Number(item.price) < 0)
    )
      return `Enter a valid price for ${item.name}, or leave the price blank.`;
  }
  if (content.media.some((image) => !image.alt.trim()))
    return "Add descriptive alt text to every image before publishing.";
  if (
    content.settings.occasions.some((value) => !value.trim()) ||
    new Set(content.settings.occasions).size !==
      content.settings.occasions.length
  )
    return "Each occasion type needs a unique name. Remove any empty lines.";
  if (
    content.settings.whatsapp &&
    !whatsappUrl(content.settings.whatsapp, "Hello")
  )
    return "Enter a valid international WhatsApp number with 8–15 digits, or leave it blank.";
  for (const key of ["mapsUrl", "instagram", "menuPdf"] as const) {
    if (content.settings[key] && !safeExternalUrl(content.settings[key]))
      return `Use a complete https:// URL for ${key}.`;
  }
  if (
    content.settings.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.settings.email)
  )
    return "Enter a valid contact email, or leave it blank.";
  return null;
}

function StudioWorkspace() {
  const state = useDemoState();
  const [draft, setDraft] = useState<SiteContent>(() =>
    structuredClone(state.draft),
  );
  const [tab, setTab] = useState<Tab>("overview");
  const [dirty, setDirty] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function change(next: SetStateAction<SiteContent>) {
    setDraft(next);
    setDirty(true);
    setFeedback("");
  }
  function report(message: string, failed = false) {
    setFeedback(message);
    setError(failed);
  }
  function save() {
    try {
      saveDraft(draft);
      setDirty(false);
      report("Draft saved in this browser. The public demo is unchanged.");
      return true;
    } catch (error) {
      report(
        error instanceof Error
          ? error.message
          : "The draft could not be saved.",
        true,
      );
      return false;
    }
  }
  function publish() {
    const issue = validateContent(draft);
    if (issue) {
      report(issue, true);
      return;
    }
    try {
      publishDemo(draft);
      setDirty(false);
      report(
        "Published to your browser’s demo. Open the website to see your changes.",
      );
    } catch (error) {
      report(
        error instanceof Error
          ? error.message
          : "The demo could not be published.",
        true,
      );
    }
  }
  function preview(slug?: string) {
    if (!save()) return;
    const route = slug
      ? `/preview?event=${encodeURIComponent(slug)}`
      : `/preview?page=${tab === "events" ? "gatherings" : tab === "menu" ? "table" : tab === "media" ? "gallery" : tab === "settings" ? "visit" : "home"}`;
    const popup = window.open(route, "_blank");
    if (popup) popup.opener = null;
    report(
      "Draft saved. Your preview opens in a new tab; use the preview links below if your browser blocks pop-ups.",
    );
  }
  function exportDraft() {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "da-duke-demo-content.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    report("Draft exported as a JSON file, including your uploaded images.");
  }
  const editorProps = { draft, change };
  return (
    <div className="admin-studio">
      <a className="skip-link" href="#studio-main">
        Skip to studio content
      </a>
      <aside className="admin-sidebar">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="wordmark"
          aria-label="Open Da Duke and Chai website in a new tab"
        >
          <span className="brand-name">Da Duke</span>
          <span className="brand-subtitle">and Chai</span>
        </Link>
        <span className="studio-label">THE CONTENT STUDIO</span>
        <nav aria-label="CMS navigation">
          {tabs.map((item, i) => (
            <button
              key={item.id}
              aria-current={tab === item.id ? "page" : undefined}
              onClick={() => {
                setTab(item.id);
                setFeedback("");
              }}
            >
              <span className="admin-nav-number">0{i + 1}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <span className="demo-indicator">DEMO WORKSPACE</span>
          <p>
            A little preview of
            <br />
            life behind the house.
          </p>
          <button
            onClick={() => {
              if (
                !dirty ||
                window.confirm(
                  "You have unsaved changes. Leave the studio without saving them?",
                )
              )
                setDemoAccess(false);
            }}
          >
            Sign out ↗
          </button>
        </div>
      </aside>
      <div className="admin-workspace">
        <header className="studio-header">
          <div>
            <span className="eyebrow">DA DUKE AND CHAI / STUDIO</span>
            <h1>{tabs.find((item) => item.id === tab)?.title}</h1>
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            View website
            <Arrow />
          </Link>
        </header>
        <div className="demo-workspace-note">
          <span>DEMO</span>
          <p>
            Changes and uploads stay in this browser. The sign-in is a preview;
            no backend or secure account service is connected.
          </p>
        </div>
        <main id="studio-main" className="studio-main" tabIndex={-1}>
          <div className="editor-toolbar">
            <span className={dirty ? "unsaved-indicator" : "saved-indicator"}>
              {dirty
                ? "Unsaved changes"
                : state.updatedAt
                  ? `Saved ${new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" }).format(new Date(state.updatedAt))} IST`
                  : "The house is ready for your touch"}
            </span>
            <div>
              <button className="admin-small-button" onClick={() => preview()}>
                Preview ↗
              </button>
              <button className="button button-outline" onClick={save}>
                Save draft
              </button>
              <button className="button button-green" onClick={publish}>
                Publish demo
                <Arrow />
              </button>
            </div>
          </div>
          {feedback && (
            <p
              className={
                error ? "admin-feedback admin-error" : "admin-feedback"
              }
              role={error ? "alert" : "status"}
            >
              {feedback}
            </p>
          )}
          {tab === "overview" && <Statistics onNavigate={setTab} />}
          {tab === "content" && <PagesEditor {...editorProps} />}
          {tab === "events" && (
            <EventsEditor {...editorProps} onPreview={preview} />
          )}
          {tab === "menu" && <MenuEditor {...editorProps} />}
          {tab === "media" && <MediaEditor {...editorProps} />}
          {tab === "settings" && (
            <>
              <SettingsEditor {...editorProps} />
              <section className="admin-panel demo-utilities">
                <div>
                  <h3>A copy, for safekeeping</h3>
                  <p>
                    Export the current content and images before resetting or
                    clearing your browser.
                  </p>
                </div>
                <button className="button button-outline" onClick={exportDraft}>
                  Export draft
                </button>
                <button
                  className="admin-danger-link"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Reset this browser’s draft and published demo content to the original concept? Export first if you want to keep your edits.",
                      )
                    ) {
                      try {
                        resetDemo();
                        setDraft(structuredClone(initialContent));
                        setDirty(false);
                        report(
                          "The original demo content has been restored in this browser.",
                        );
                      } catch {
                        report(
                          "This browser could not reset its local storage.",
                          true,
                        );
                      }
                    }
                  }}
                >
                  Reset demo content
                </button>
              </section>
            </>
          )}
          <footer className="studio-footer">
            <p>Preview a saved draft:</p>
            <div>
              {[
                ["home", "Landing"],
                ["house", "House"],
                ["table", "Table"],
                ["gatherings", "Gatherings"],
                ["private", "Private Affairs"],
                ["visit", "Visit"],
                ["gallery", "Gallery"],
              ].map(([id, label]) => (
                <a
                  href={`/preview?page=${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={id}
                >
                  {label} ↗
                </a>
              ))}
            </div>
            <span>
              Drafts are shared only between tabs in this browser. Publish demo
              never uploads anything to a server.
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function AdminStudio() {
  const access = useDemoAccess();
  return access ? <StudioWorkspace /> : <DemoLogin />;
}
