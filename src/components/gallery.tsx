"use client";

import { useRef, useState } from "react";
import { useContent } from "@/components/demo-content";
import MediaImage from "@/components/media-image";
import { Arrow } from "@/components/illustrations";

export default function Gallery({ full = false }: { full?: boolean }) {
  const { media, settings } = useContent();
  const [collection, setCollection] = useState("All moments");
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const collections = [
    "All moments",
    ...new Set(media.map((image) => image.collection).filter(Boolean)),
  ];
  const selected = full
    ? media.filter(
        (image) =>
          collection === "All moments" || collection === image.collection,
      )
    : media.slice(0, 3);
  const index = Math.max(
    0,
    selected.findIndex((image) => image.id === activeId),
  );
  const active = selected[index];
  function move(direction: number) {
    if (selected.length)
      setActiveId(
        selected[(index + direction + selected.length) % selected.length].id,
      );
  }

  return (
    <>
      {full && (
        <div
          className="filter-row"
          role="group"
          aria-label="Filter the gallery"
        >
          {collections.map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={collection === value}
              onClick={() => setCollection(value)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
      {selected.length ? (
        <div className={`gallery-grid ${full ? "gallery-full" : ""}`}>
          {selected.map((item, i) => (
            <button
              className={`gallery-item gallery-item-${i % 3}`}
              key={item.id}
              aria-label={`View image: ${item.caption || item.alt}`}
              onClick={() => {
                setActiveId(item.id);
                dialog.current?.showModal();
              }}
            >
              <span className="gallery-image">
                <MediaImage
                  id={item.id}
                  sizes="(max-width: 700px) 90vw, 32vw"
                />
                <span className="gallery-expand">
                  <Arrow />
                </span>
              </span>
              <span className="gallery-caption">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item.caption || item.alt}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-note">The first photographs are on their way.</p>
      )}
      <p className="image-disclosure">{settings.photoNotice}</p>
      <dialog
        ref={dialog}
        className="lightbox-dialog"
        aria-label="The visual journal"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
        }}
      >
        <div className="lightbox-inner">
          <button
            className="dialog-close"
            aria-label="Close gallery"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
          {active && (
            <div className="lightbox-photo">
              <MediaImage id={active.id} sizes="90vw" />
            </div>
          )}
          <div className="lightbox-bottom">
            <button aria-label="Previous image" onClick={() => move(-1)}>
              <Arrow className="rotate-180" />
            </button>
            <div aria-live="polite">
              <p>{active?.caption || active?.alt}</p>
              <span>
                {index + 1} / {selected.length} · Visual moodboard
              </span>
            </div>
            <button aria-label="Next image" onClick={() => move(1)}>
              <Arrow />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
