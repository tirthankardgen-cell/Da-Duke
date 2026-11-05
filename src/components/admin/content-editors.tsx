"use client";

import Image from "next/image";
import { useRef, useState, type SetStateAction } from "react";
import {
  eventCategories,
  bookChapterLabels,
  pageLinks,
  weekdays,
  type SiteContent,
  type PageId,
  type SectionId,
  type CafeEvent,
  type MediaItem,
  type StorybookContent,
} from "@/lib/content";
import { slugify, whatsappUrl, validateEvent } from "@/lib/site-utils";

export type EditorProps = {
  draft: SiteContent;
  change: (content: SetStateAction<SiteContent>) => void;
};

function ImageSelect({
  draft,
  value,
  onChange,
  label = "Image",
}: {
  draft: SiteContent;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">No image</option>
        {draft.media.map((image) => (
          <option key={image.id} value={image.id}>
            {image.caption || image.alt || image.id}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PagesEditor({ draft, change }: EditorProps) {
  const [selection, setSelection] = useState("book:cover");
  const [group, id] = selection.split(":");
  const copy =
    group === "book"
      ? draft.storybook[id as "cover" | "alps" | "himalayas"]
      : group === "page"
        ? draft.pages[id as PageId]
        : draft.sections[id as SectionId];
  const labels: Record<string, string> = {
    eyebrow: "Small introductory line",
    title: "Headline",
    accent: "Italic headline",
    description: "Introduction",
    body: "Body copy",
    linkLabel: "Link label",
    quote: "Quotation",
    caption: "Photograph heading",
  };
  function changeCopy(key: string, value: string) {
    if (group === "book")
      change({
        ...draft,
        storybook: {
          ...draft.storybook,
          [id]: { ...copy, [key]: value },
        } as StorybookContent,
      });
    else if (group === "page")
      change({
        ...draft,
        pages: { ...draft.pages, [id]: { ...copy, [key]: value } },
      });
    else
      change({
        ...draft,
        sections: { ...draft.sections, [id]: { ...copy, [key]: value } },
      });
  }
  function reorder(index: number, direction: number) {
    const chapters = [...draft.storybook.chapters];
    [chapters[index], chapters[index + direction]] = [
      chapters[index + direction],
      chapters[index],
    ];
    change({ ...draft, storybook: { ...draft.storybook, chapters } });
  }
  return (
    <div className="editor-columns">
      <section className="admin-panel">
        <div className="panel-heading">
          <h3>The words of the house</h3>
          <span>PAGE CONTENT</span>
        </div>
        <div className="admin-form">
          <label>
            Choose a page or section
            <select
              value={selection}
              onChange={(event) => setSelection(event.target.value)}
            >
              <optgroup label="The homepage storybook">
                <option value="book:cover">Title page & dedication</option>
                <option value="book:alps">The Alps chapter</option>
                <option value="book:himalayas">The Himalayas chapter</option>
              </optgroup>
              <optgroup label="Page introductions">
                {Object.keys(draft.pages)
                  .filter((key) => key !== "home")
                  .map((key) => (
                    <option key={key} value={`page:${key}`}>
                      {key === "home"
                        ? "Landing page / hero"
                        : pageLinks.find((link) => link.id === key)?.label ||
                          (key === "table"
                            ? "The Table (legacy page)"
                            : "The Journal")}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Shared editorial sections">
                {Object.keys(draft.sections).map((key) => (
                  <option key={key} value={`section:${key}`}>
                    {key === "duality"
                      ? "The brand duality"
                      : `${key[0].toUpperCase()}${key.slice(1)} section`}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
          {Object.entries(copy)
            .filter(([key]) => key in labels)
            .map(([key, value]) => (
              <label key={`${selection}:${key}`}>
                {labels[key]}
                {key === "description" || key === "body" ? (
                  <textarea
                    rows={4}
                    value={value}
                    maxLength={2000}
                    onChange={(event) => changeCopy(key, event.target.value)}
                  />
                ) : (
                  <input
                    value={value}
                    maxLength={200}
                    onChange={(event) => changeCopy(key, event.target.value)}
                  />
                )}
              </label>
            ))}
          {group === "section" && (
            <ImageSelect
              draft={draft}
              value={draft.sections[id as SectionId].image}
              onChange={(value) => changeCopy("image", value)}
            />
          )}
          {group === "book" && (id === "alps" || id === "himalayas") && (
            <ImageSelect
              draft={draft}
              value={draft.storybook[id].image}
              onChange={(value) => changeCopy("image", value)}
            />
          )}
        </div>
      </section>
      <div>
        <section className="admin-panel">
          <div className="panel-heading">
            <h3>The chapters of the book</h3>
            <span>HOMEPAGE STORYBOOK</span>
          </div>
          <p className="admin-help">
            Arrange or hide chapters. The table, house and visit pages use the
            shared editorial sections. Menu highlights come from featured,
            available dishes.
          </p>
          <div className="section-sort-list">
            {draft.storybook.chapters.map((section, i) => (
              <div key={section.id}>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={section.visible}
                    onChange={(event) =>
                      change({
                        ...draft,
                        storybook: {
                          ...draft.storybook,
                          chapters: draft.storybook.chapters.map((item) =>
                            item.id === section.id
                              ? { ...item, visible: event.target.checked }
                              : item,
                          ),
                        },
                      })
                    }
                  />
                  <span>{bookChapterLabels[section.id].label}</span>
                </label>
                <div>
                  <button
                    aria-label={`Move ${section.id} earlier`}
                    disabled={i === 0}
                    onClick={() => reorder(i, -1)}
                  >
                    ↑
                  </button>
                  <button
                    aria-label={`Move ${section.id} later`}
                    disabled={i === draft.storybook.chapters.length - 1}
                    onClick={() => reorder(i, 1)}
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="admin-panel">
          <div className="panel-heading">
            <h3>The House notes</h3>
            <span>PHILOSOPHY</span>
          </div>
          <div className="admin-form">
            {draft.houseNotes.map((note, i) => (
              <fieldset key={i}>
                <legend>Note {i + 1}</legend>
                <label>
                  Title
                  <input
                    value={note.title}
                    onChange={(event) =>
                      change({
                        ...draft,
                        houseNotes: draft.houseNotes.map((item, j) =>
                          j === i
                            ? { ...item, title: event.target.value }
                            : item,
                        ),
                      })
                    }
                  />
                </label>
                <label>
                  Story
                  <textarea
                    rows={4}
                    value={note.body}
                    onChange={(event) =>
                      change({
                        ...draft,
                        houseNotes: draft.houseNotes.map((item, j) =>
                          j === i
                            ? { ...item, body: event.target.value }
                            : item,
                        ),
                      })
                    }
                  />
                </label>
              </fieldset>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function localDate(value: string) {
  if (!value || !Number.isFinite(Date.parse(value))) return "";
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(value))
    .replace(" ", "T");
}
function utcDate(value: string) {
  return value ? new Date(`${value}:00+05:30`).toISOString() : "";
}

export function EventsEditor({
  draft,
  change,
  onPreview,
}: EditorProps & { onPreview: (slug: string) => void }) {
  const [selected, setSelected] = useState<string | null>(
    draft.events[0]?.id || null,
  );
  const [error, setError] = useState("");
  const event = draft.events.find((item) => item.id === selected);
  function update(values: Partial<CafeEvent>) {
    setError("");
    change({
      ...draft,
      events: draft.events.map((item) =>
        item.id === selected ? { ...item, ...values } : item,
      ),
    });
  }
  function addEvent() {
    const id = crypto.randomUUID();
    change({
      ...draft,
      events: [
        ...draft.events,
        {
          id,
          slug: "",
          title: "",
          summary: "",
          body: "",
          startsAt: "",
          endsAt: "",
          category: eventCategories[0],
          image: "",
          venue: "",
          status: "scheduled",
          published: false,
          featured: false,
          enquiries: true,
        },
      ],
    });
    setSelected(id);
    setError("");
  }
  return (
    <div className="editor-columns event-editor">
      <section className="admin-panel event-list-panel">
        <div className="panel-heading">
          <h3>Your gatherings</h3>
          <button className="admin-small-button" onClick={addEvent}>
            + New event
          </button>
        </div>
        {draft.events.length ? (
          <div className="admin-event-list">
            {draft.events.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item.id);
                  setError("");
                }}
                aria-pressed={selected === item.id}
              >
                <span>{item.title || "Untitled gathering"}</span>
                <small>
                  {item.published ? item.status.replace("-", " ") : "Draft"}
                </small>
              </button>
            ))}
          </div>
        ) : (
          <div className="admin-empty">
            <p>
              No events yet. Create your first gathering to try the publishing
              flow.
            </p>
            <button className="button button-outline" onClick={addEvent}>
              Create a gathering
            </button>
          </div>
        )}
        <p className="admin-help">
          No events are invented for this demo. Dates display in India time, and
          published events move to the archive after their end time.
        </p>
      </section>
      <section className="admin-panel">
        {event ? (
          <>
            <div className="panel-heading">
              <h3>{event.title || "A new gathering"}</h3>
              <span>{event.published ? "INCLUDED ON SITE" : "DRAFT"}</span>
            </div>
            <div className="admin-form">
              <label>
                Event title
                <input
                  value={event.title}
                  maxLength={150}
                  onChange={(e) =>
                    update({
                      title: e.target.value,
                      ...(!event.slug || event.slug === slugify(event.title)
                        ? { slug: slugify(e.target.value) }
                        : {}),
                    })
                  }
                />
              </label>
              <label>
                URL slug
                <input
                  value={event.slug}
                  placeholder="an-evening-of-tea"
                  onChange={(e) => update({ slug: e.target.value })}
                />
              </label>
              <label>
                Short description
                <textarea
                  rows={2}
                  value={event.summary}
                  maxLength={350}
                  onChange={(e) => update({ summary: e.target.value })}
                />
              </label>
              <label>
                The full story
                <textarea
                  rows={5}
                  value={event.body}
                  maxLength={8000}
                  onChange={(e) => update({ body: e.target.value })}
                />
              </label>
              <div className="form-row">
                <label>
                  Starts (India time)
                  <input
                    type="datetime-local"
                    value={localDate(event.startsAt)}
                    onChange={(e) =>
                      update({ startsAt: utcDate(e.target.value) })
                    }
                  />
                </label>
                <label>
                  Ends (India time)
                  <input
                    type="datetime-local"
                    value={localDate(event.endsAt)}
                    onChange={(e) =>
                      update({ endsAt: utcDate(e.target.value) })
                    }
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Event type
                  <select
                    value={event.category}
                    onChange={(e) => update({ category: e.target.value })}
                  >
                    {eventCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Event status
                  <select
                    value={event.status}
                    onChange={(e) =>
                      update({ status: e.target.value as CafeEvent["status"] })
                    }
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="sold-out">Sold out</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="postponed">Postponed</option>
                  </select>
                </label>
              </div>
              <label>
                Venue / location
                <input
                  value={event.venue}
                  placeholder="Only add a confirmed location"
                  onChange={(e) => update({ venue: e.target.value })}
                />
              </label>
              <ImageSelect
                draft={draft}
                value={event.image}
                label="Cover image / uploaded poster"
                onChange={(value) => update({ image: value })}
              />
              <p className="admin-help">
                Upload a poster in the Media Library, then select it here.
              </p>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={event.published}
                  onChange={(e) => {
                    const issue = e.target.checked
                      ? validateEvent(event, draft.events)
                      : null;
                    if (issue) setError(issue);
                    else update({ published: e.target.checked });
                  }}
                />
                Include this event on the website
              </label>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={event.featured}
                  onChange={(e) => update({ featured: e.target.checked })}
                />
                Feature on the landing page
              </label>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={event.enquiries}
                  onChange={(e) => update({ enquiries: e.target.checked })}
                />
                Enable WhatsApp enquiries
              </label>
              {error && (
                <p className="admin-error" role="alert">
                  {error}
                </p>
              )}
              <div className="admin-inline-actions">
                <button
                  className="button button-outline"
                  onClick={() => {
                    const issue = validateEvent(event, draft.events);
                    if (issue) setError(issue);
                    else onPreview(event.slug);
                  }}
                >
                  Preview event ↗
                </button>
                <button
                  className="admin-danger-link"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Remove “${event.title || "Untitled gathering"}” from this draft? The published demo stays unchanged until you publish.`,
                      )
                    ) {
                      change({
                        ...draft,
                        events: draft.events.filter(
                          (item) => item.id !== selected,
                        ),
                      });
                      setSelected(null);
                    }
                  }}
                >
                  Remove from draft
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="admin-empty">
            Choose a gathering to edit, or create a new one.
          </div>
        )}
      </section>
    </div>
  );
}

export function MenuEditor({ draft, change }: EditorProps) {
  const [selected, setSelected] = useState(draft.menu[0]?.id || "");
  const item = draft.menu.find((entry) => entry.id === selected);
  function update(values: Partial<SiteContent["menu"][number]>) {
    change({
      ...draft,
      menu: draft.menu.map((entry) =>
        entry.id === selected ? { ...entry, ...values } : entry,
      ),
    });
  }
  return (
    <div className="editor-columns">
      <div>
        <section className="admin-panel">
          <div className="panel-heading">
            <h3>On the table</h3>
            <button
              className="admin-small-button"
              onClick={() => {
                const id = crypto.randomUUID();
                change({
                  ...draft,
                  menu: [
                    ...draft.menu,
                    {
                      id,
                      name: "",
                      description: "",
                      category: draft.menuCategories[0] || "Chai & Tea",
                      image: "",
                      price: "",
                      dietary: "",
                      available: true,
                      featured: false,
                    },
                  ],
                });
                setSelected(id);
              }}
            >
              + Add item
            </button>
          </div>
          <div className="admin-event-list">
            {draft.menu.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry.id)}
                aria-pressed={selected === entry.id}
              >
                <span>{entry.name || "Untitled selection"}</span>
                <small>{entry.category}</small>
              </button>
            ))}
          </div>
        </section>
        <section className="admin-panel admin-form">
          <label>
            Menu categories (one per line)
            <textarea
              rows={5}
              value={draft.menuCategories.join("\n")}
              onChange={(e) =>
                change({ ...draft, menuCategories: e.target.value.split("\n") })
              }
            />
          </label>
          <label>
            Menu notice
            <textarea
              rows={3}
              value={draft.settings.menuNotice}
              onChange={(e) =>
                change({
                  ...draft,
                  settings: { ...draft.settings, menuNotice: e.target.value },
                })
              }
            />
          </label>
        </section>
      </div>
      <section className="admin-panel">
        {item ? (
          <>
            <div className="panel-heading">
              <h3>{item.name || "A new selection"}</h3>
              <span>MENU ITEM</span>
            </div>
            <div className="admin-form">
              <label>
                Item name
                <input
                  value={item.name}
                  maxLength={150}
                  onChange={(e) => update({ name: e.target.value })}
                />
              </label>
              <label>
                Description
                <textarea
                  rows={4}
                  value={item.description}
                  maxLength={800}
                  onChange={(e) => update({ description: e.target.value })}
                />
              </label>
              <div className="form-row">
                <label>
                  Category
                  <select
                    value={item.category}
                    onChange={(e) => update({ category: e.target.value })}
                  >
                    {draft.menuCategories.map((category, i) => (
                      <option key={i} value={category}>
                        {category || "Untitled category"}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Price in ₹ (optional)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    placeholder="Leave blank if unconfirmed"
                    onChange={(e) => update({ price: e.target.value })}
                  />
                </label>
              </div>
              <ImageSelect
                draft={draft}
                value={item.image}
                onChange={(value) => update({ image: value })}
              />
              <label>
                Dietary information (optional)
                <input
                  value={item.dietary}
                  placeholder="Only use confirmed information"
                  onChange={(e) => update({ dietary: e.target.value })}
                />
              </label>
              <div className="form-row">
                {[
                  [-1, "Move earlier"],
                  [1, "Move later"],
                ].map(([delta, label]) => {
                  const index = draft.menu.findIndex(
                    (entry) => entry.id === item.id,
                  );
                  const target = index + Number(delta);
                  return (
                    <button
                      key={label}
                      className="admin-small-button"
                      disabled={target < 0 || target >= draft.menu.length}
                      onClick={() => {
                        const menu = [...draft.menu];
                        [menu[index], menu[target]] = [
                          menu[target],
                          menu[index],
                        ];
                        change({ ...draft, menu });
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={!!item.seasonal}
                  onChange={(e) => update({ seasonal: e.target.checked })}
                />
                Seasonal dish
              </label>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={!!item.recommended}
                  onChange={(e) => update({ recommended: e.target.checked })}
                />
                Chef’s recommendation
              </label>
              <p className="admin-help">
                Upload photographs in Media, then select one above. Category
                order follows the list; reassign items before removing a
                category.
              </p>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={(e) => update({ available: e.target.checked })}
                />
                Available
              </label>
              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={item.featured}
                  onChange={(e) => update({ featured: e.target.checked })}
                />
                Signature dish / feature in the signature ritual
              </label>
              <button
                className="admin-danger-link"
                onClick={() => {
                  if (
                    window.confirm(
                      `Remove “${item.name || "Untitled selection"}” from this draft?`,
                    )
                  ) {
                    change({
                      ...draft,
                      menu: draft.menu.filter((entry) => entry.id !== item.id),
                    });
                    setSelected("");
                  }
                }}
              >
                Remove from draft
              </button>
            </div>
          </>
        ) : (
          <p className="admin-empty">Select a menu item to edit.</p>
        )}
      </section>
    </div>
  );
}

async function prepareImage(file: File) {
  if (
    !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)
  )
    throw new Error("Choose a JPG, PNG, WebP or AVIF image.");
  if (file.size > 5 * 1024 * 1024)
    throw new Error("Choose an image smaller than 5 MB for this browser demo.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 32_000_000)
      throw new Error(
        "This image is too large. Please use a version under 32 megapixels.",
      );
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error(
        "This browser cannot prepare the image. Try another browser.",
      );
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const src = canvas.toDataURL("image/webp", 0.8);
    if (src.length > 1_500_000)
      throw new Error(
        "The prepared image is still too large for local storage. Try a smaller image.",
      );
    return src;
  } finally {
    bitmap.close();
  }
}

export function MediaEditor({ draft, change }: EditorProps) {
  const [selected, setSelected] = useState(draft.media[0]?.id || "");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const uploadInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const item = draft.media.find((entry) => entry.id === selected);
  function update(values: Partial<MediaItem>) {
    change({
      ...draft,
      media: draft.media.map((entry) =>
        entry.id === selected ? { ...entry, ...values } : entry,
      ),
    });
  }
  async function upload(file: File | undefined, replace: boolean) {
    if (!file) return;
    setBusy(true);
    setStatus("");
    try {
      const src = await prepareImage(file);
      const id = replace ? selected : crypto.randomUUID();
      const image: MediaItem = {
        id,
        src,
        alt: "",
        caption: file.name.replace(/\.[^.]+$/, "").replace(/[_-]/g, " "),
        collection: "Interiors",
        focalPoint: "50% 50%",
      };
      change((current) => ({
        ...current,
        media: replace
          ? current.media.map((entry) =>
              entry.id === selected ? { ...entry, src } : entry,
            )
          : [...current.media, image],
      }));
      setSelected(id);
      setStatus(
        replace
          ? "Image replaced in the draft. Review its description before publishing."
          : "Image added to the draft. Add descriptive alt text before publishing.",
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "The image could not be opened. Try another file.",
      );
    } finally {
      setBusy(false);
      if (uploadInput.current) uploadInput.current.value = "";
      if (replaceInput.current) replaceInput.current.value = "";
    }
  }
  const pos = item?.focalPoint.match(/([\d.]+)%\s+([\d.]+)%/);
  function reorder(direction: number) {
    const images = [...draft.media];
    const index = images.findIndex((image) => image.id === selected);
    [images[index], images[index + direction]] = [
      images[index + direction],
      images[index],
    ];
    change({ ...draft, media: images });
  }
  return (
    <>
      <div className="admin-section-title">
        <div>
          <h2>
            A collection of <em>little moments.</em>
          </h2>
          <p className="admin-help">
            Images are resized in your browser. JPG, PNG, WebP or AVIF · up to 5
            MB each.
          </p>
        </div>
        <button
          disabled={busy}
          className="button button-green"
          onClick={() => uploadInput.current?.click()}
        >
          {busy ? "Preparing image…" : "+ Upload an image"}
        </button>
        <input
          ref={uploadInput}
          hidden
          tabIndex={-1}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          aria-label="Upload image"
          onChange={(e) => upload(e.target.files?.[0], false)}
        />
      </div>
      {status && (
        <p role="status" className="admin-information">
          {status}
        </p>
      )}
      <fieldset className="media-editor-fieldset" disabled={busy}>
        <legend className="sr-only">Media library</legend>
        <div className="editor-columns media-columns">
          <div className="media-library-grid">
            {draft.media.map((image) => (
              <button
                key={image.id}
                className="media-thumbnail"
                aria-pressed={selected === image.id}
                onClick={() => setSelected(image.id)}
              >
                <span>
                  <Image
                    src={image.src}
                    alt={image.alt || "New image; alt text needed"}
                    fill
                    sizes="220px"
                    unoptimized={image.src.startsWith("data:")}
                    style={{ objectPosition: image.focalPoint }}
                  />
                </span>
                <span>{image.caption || "Untitled image"}</span>
              </button>
            ))}
          </div>
          <section className="admin-panel">
            {item ? (
              <>
                <div className="panel-heading">
                  <h3>Every detail, considered</h3>
                  <span>IMAGE DETAILS</span>
                </div>
                <div className="media-crop-preview">
                  <Image
                    src={item.src}
                    alt={item.alt || "Crop preview"}
                    fill
                    sizes="450px"
                    unoptimized={item.src.startsWith("data:")}
                    style={{ objectPosition: item.focalPoint }}
                  />
                </div>
                <div className="admin-form">
                  <label>
                    Caption
                    <input
                      value={item.caption}
                      maxLength={200}
                      onChange={(e) => update({ caption: e.target.value })}
                    />
                  </label>
                  <label>
                    Alt text
                    <textarea
                      rows={3}
                      value={item.alt}
                      maxLength={400}
                      placeholder="Describe what is in the image"
                      onChange={(e) => update({ alt: e.target.value })}
                    />
                  </label>
                  <label>
                    Collection
                    <input
                      value={item.collection}
                      maxLength={60}
                      list="media-collections"
                      onChange={(e) => update({ collection: e.target.value })}
                    />
                  </label>
                  <datalist id="media-collections">
                    <option>Interiors</option>
                    <option>Tea & Table</option>
                    <option>Inspiration</option>
                    <option>Gatherings</option>
                  </datalist>
                  <label>
                    Horizontal crop focus
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pos?.[1] || 50}
                      onChange={(e) =>
                        update({
                          focalPoint: `${e.target.value}% ${pos?.[2] || 50}%`,
                        })
                      }
                    />
                  </label>
                  <label>
                    Vertical crop focus
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pos?.[2] || 50}
                      onChange={(e) =>
                        update({
                          focalPoint: `${pos?.[1] || 50}% ${e.target.value}%`,
                        })
                      }
                    />
                  </label>
                  <div className="admin-inline-actions">
                    <button
                      className="admin-small-button"
                      disabled={draft.media[0]?.id === item.id}
                      onClick={() => reorder(-1)}
                    >
                      Move earlier
                    </button>
                    <button
                      className="admin-small-button"
                      disabled={draft.media.at(-1)?.id === item.id}
                      onClick={() => reorder(1)}
                    >
                      Move later
                    </button>
                  </div>
                  <button
                    className="button button-outline"
                    onClick={() => replaceInput.current?.click()}
                  >
                    Replace image
                  </button>
                  <input
                    ref={replaceInput}
                    hidden
                    tabIndex={-1}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    aria-label="Replace selected image"
                    onChange={(e) => upload(e.target.files?.[0], true)}
                  />
                  <p className="admin-help">
                    Replacing an image updates every section using it after you
                    publish. Gallery order follows this library; its first three
                    images appear on the landing page.
                  </p>
                </div>
              </>
            ) : (
              <p className="admin-empty">Choose an image from the library.</p>
            )}
          </section>
        </div>
      </fieldset>
      <section className="admin-panel admin-form">
        <label>
          Photography notice
          <textarea
            rows={2}
            value={draft.settings.photoNotice}
            onChange={(e) =>
              change({
                ...draft,
                settings: { ...draft.settings, photoNotice: e.target.value },
              })
            }
          />
        </label>
      </section>
    </>
  );
}

export function SettingsEditor({ draft, change }: EditorProps) {
  const settings = draft.settings;
  const update = (values: Partial<SiteContent["settings"]>) =>
    change({ ...draft, settings: { ...settings, ...values } });
  const url = whatsappUrl(settings.whatsapp, settings.enquiryMessage);
  return (
    <div className="editor-columns">
      <section className="admin-panel">
        <div className="panel-heading">
          <h3>An open door</h3>
          <span>CONTACT & ENQUIRIES</span>
        </div>
        <p className="admin-help">
          Only add details approved by the café. Blank fields display a
          considered coming-soon state.
        </p>
        <div className="admin-form">
          <label>
            WhatsApp number
            <input
              type="tel"
              value={settings.whatsapp}
              onChange={(e) => update({ whatsapp: e.target.value })}
              placeholder="International number, including country code"
            />
          </label>
          <label>
            Default enquiry message
            <textarea
              rows={4}
              value={settings.enquiryMessage}
              onChange={(e) => update({ enquiryMessage: e.target.value })}
            />
          </label>
          <p className="admin-help">
            {url ? (
              <>
                WhatsApp link preview:{" "}
                <code className="url-preview">{url}</code>
              </>
            ) : settings.whatsapp ? (
              "Enter a valid international number with 8–15 digits."
            ) : (
              "No number configured. The public site shows a message preview instead of contacting an invented number."
            )}
          </p>
          <label>
            Contact phone
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => update({ phone: e.target.value })}
            />
          </label>
          <label>
            Contact email
            <input
              type="email"
              value={settings.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </label>
          <label>
            Instagram URL
            <input
              type="url"
              placeholder="https://www.instagram.com/…"
              value={settings.instagram}
              onChange={(e) => update({ instagram: e.target.value })}
            />
          </label>
          <label>
            PDF menu URL (optional)
            <input
              type="url"
              placeholder="https://…"
              value={settings.menuPdf}
              onChange={(e) => update({ menuPdf: e.target.value })}
            />
          </label>
          <label>
            Occasion types (one per line)
            <textarea
              rows={5}
              value={settings.occasions.join("\n")}
              onChange={(e) =>
                update({ occasions: e.target.value.split("\n") })
              }
            />
          </label>
          <label>
            Confirmed venue / capacity details
            <textarea
              rows={3}
              value={settings.capacity}
              onChange={(e) => update({ capacity: e.target.value })}
            />
          </label>
        </div>
      </section>
      <section className="admin-panel">
        <div className="panel-heading">
          <h3>The way to the house</h3>
          <span>LOCATION & HOURS</span>
        </div>
        <div className="admin-form">
          <label>
            Full address
            <textarea
              rows={3}
              value={settings.address}
              onChange={(e) => update({ address: e.target.value })}
            />
          </label>
          <label>
            Written directions
            <textarea
              rows={3}
              value={settings.directions}
              onChange={(e) => update({ directions: e.target.value })}
            />
          </label>
          <label>
            Maps URL
            <input
              type="url"
              placeholder="https://maps.google.com/…"
              value={settings.mapsUrl}
              onChange={(e) => update({ mapsUrl: e.target.value })}
            />
          </label>
          <fieldset>
            <legend>Opening hours · India time</legend>
            {weekdays.map((day, i) => (
              <label key={day}>
                {day}
                <input
                  value={settings.hours[i]}
                  placeholder="e.g. 10 am – 8 pm, or Closed"
                  onChange={(e) =>
                    update({
                      hours: settings.hours.map((value, j) =>
                        j === i ? e.target.value : value,
                      ),
                    })
                  }
                />
              </label>
            ))}
          </fieldset>
          <label>
            Holiday / special-hours note
            <textarea
              rows={3}
              value={settings.specialHours}
              onChange={(e) => update({ specialHours: e.target.value })}
            />
          </label>
        </div>
      </section>
    </div>
  );
}
