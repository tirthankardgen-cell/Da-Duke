"use client";

import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/components/demo-content";
import HeritageSketch, { InkStudy } from "@/components/heritage-sketch";
import MediaImage from "@/components/media-image";
import Gallery from "@/components/gallery";
import { Arrow, Botanical } from "@/components/illustrations";
import { GatheringsPreview } from "@/components/gatherings";
import { WhatsAppLink } from "@/components/enquiry";
import {
  pageLinks,
  weekdays,
  type PageId,
  type PageCopy,
  type MenuItem,
  type SketchKind,
} from "@/lib/content";
import { safeExternalUrl } from "@/lib/site-utils";
import { trackDemo } from "@/lib/demo-analytics";

const pageSketches: Record<PageId, SketchKind> = {
  home: "rome",
  house: "florence",
  table: "paris",
  gatherings: "rome",
  private: "florence",
  visit: "hills",
  gallery: "paris",
};

export function PageIntro({ page }: { page: PageId }) {
  const copy = useContent().pages[page];
  return (
    <section className={`page-intro intro-${page}`}>
      <HeritageSketch kind={pageSketches[page]} side="left" />
      <HeritageSketch kind="hills" />
      <div className="shell">
        <div className="breadcrumb">
          <Link href="/">Da Duke and Chai</Link>
          <span>/</span>
          <span>
            {pageLinks.find((link) => link.id === page)?.label || "Gallery"}
          </span>
        </div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.title}
          <br />
          <em>{copy.accent}</em>
        </h1>
        <p className="page-intro-description">{copy.description}</p>
        <span className="intro-rule" aria-hidden="true" />
      </div>
    </section>
  );
}

export function SectionHeading({
  copy,
  id,
  children,
}: {
  copy: PageCopy;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id={id}>
          {copy.title}
          <br />
          <em>{copy.accent}</em>
        </h2>
      </div>
      {children || <p>{copy.description}</p>}
    </div>
  );
}

export function DualitySection({ eager = false }: { eager?: boolean }) {
  const { sections } = useContent();
  const copy = sections.duality;
  return (
    <section
      className="duality-section section-spacing"
      aria-labelledby="duality-title"
    >
      <HeritageSketch kind="hills" />
      <div className="shell duality-layout">
        <div className="editorial-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="duality-title">
            {copy.title}
            <br />
            <em>{copy.accent}</em>
          </h2>
          <p>{copy.description}</p>
          <p>{copy.body}</p>
          <Link href="/the-house" className="text-link">
            {copy.linkLabel}
            <Arrow />
          </Link>
        </div>
        <div className="duality-images">
          <figure className="duality-europe">
            <div>
              <MediaImage id={copy.image} eager={eager} />
            </div>
            <figcaption>
              <span>01 / THE INSPIRATION</span>A little European romance.
            </figcaption>
          </figure>
          <figure className="duality-hills">
            <div>
              <MediaImage id="mountains" />
            </div>
            <figcaption>
              <span>02 / THE FEELING</span>A little mountain mist.
            </figcaption>
          </figure>
          <span className="handwritten duality-note">
            a place between places
          </span>
        </div>
      </div>
    </section>
  );
}

export function HousePreview({ extended = false }: { extended?: boolean }) {
  const { sections, houseNotes, settings } = useContent();
  const copy = sections.house;
  return (
    <>
      <section
        className="house-section section-spacing"
        aria-labelledby="house-title"
      >
        <HeritageSketch kind="rome" />
        <div className="shell house-layout">
          <div className="house-photo">
            <MediaImage id={copy.image} />
            <span className="photo-corner">THE HOUSE, IMAGINED</span>
          </div>
          <div className="editorial-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 id="house-title">
              {copy.title}
              <br />
              <em>{copy.accent}</em>
            </h2>
            <p>{copy.description}</p>
            <p>{copy.body}</p>
            <Link
              className="text-link"
              href={extended ? "/gallery" : "/the-house"}
            >
              {extended ? "A glimpse of the atmosphere" : copy.linkLabel}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      {extended && (
        <>
          <section
            className="house-notes section-spacing"
            aria-label="The philosophy of the house"
          >
            <HeritageSketch kind="hills" side="left" />
            <div className="shell house-notes-grid">
              {houseNotes.map((note, i) => (
                <article key={i}>
                  <span className="chapter-number">0{i + 1}</span>
                  <h2>{note.title}</h2>
                  <p>{note.body}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="tea-story section-spacing">
            <HeritageSketch kind="paris" />
            <div className="shell tea-story-layout">
              <div className="editorial-copy">
                <p className="eyebrow">{sections.ritual.eyebrow}</p>
                <h2>
                  A ritual that
                  <br />
                  <em>feels like home.</em>
                </h2>
                <p>{sections.ritual.body}</p>
                <p>{sections.ritual.description}</p>
                <Link href="/the-table" className="text-link">
                  {sections.ritual.linkLabel}
                  <Arrow />
                </Link>
              </div>
              <div className="tea-story-photo">
                <MediaImage id={sections.ritual.image} />
              </div>
            </div>
            <p className="image-disclosure shell">{settings.photoNotice}</p>
          </section>
        </>
      )}
    </>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="menu-card">
      <div className="menu-card-image">
        <MediaImage id={item.image} sizes="(max-width: 700px) 90vw, 32vw" />
        <span>{item.category}</span>
      </div>
      <div className="menu-card-title">
        <h3>{item.name}</h3>
        {item.price && <span>₹{item.price}</span>}
      </div>
      <p>{item.description}</p>
      {item.dietary && <span className="dietary-label">{item.dietary}</span>}
      {!item.available && (
        <span className="availability-label">Currently unavailable</span>
      )}
    </article>
  );
}

export function RitualSection({ full = false }: { full?: boolean }) {
  const { sections, settings, menu, menuCategories } = useContent();
  const [category, setCategory] = useState("All selections");
  const copy = sections.ritual;
  const items = full
    ? menu.filter(
        (item) => category === "All selections" || item.category === category,
      )
    : menu.filter((item) => item.featured && item.available).slice(0, 3);
  const pdf = safeExternalUrl(settings.menuPdf);
  return (
    <section
      className={`ritual-section section-spacing ${full ? "table-menu" : ""}`}
      aria-labelledby="ritual-title"
    >
      <HeritageSketch kind="paris" side="left" />
      <div className="shell">
        <SectionHeading copy={copy} id="ritual-title" />
        <p className="sample-notice">
          <span>THE CONCEPT MENU</span>
          {settings.menuNotice}
        </p>
        {full && (
          <div className="filter-row" role="group" aria-label="Filter the menu">
            {["All selections", ...menuCategories].map((value) => (
              <button
                key={value}
                aria-pressed={category === value}
                aria-controls="menu-selection"
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
          </div>
        )}
        <div id="menu-selection" aria-live="polite" aria-atomic="true">
          {items.length ? (
            <div className="menu-grid">
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="empty-note">
              A new selection is taking shape. Please check back soon.
            </p>
          )}
        </div>
        <div className="section-bottom">
          <span>Thoughtfully poured. Unhurriedly enjoyed.</span>
          {full ? (
            pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View the PDF menu
                <Arrow />
              </a>
            )
          ) : (
            <Link href="/the-table" className="text-link">
              {copy.linkLabel}
              <Arrow />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function PrivatePrompt() {
  const { sections } = useContent();
  const copy = sections.private;
  return (
    <section className="private-prompt" aria-labelledby="private-prompt-title">
      <div className="private-prompt-image">
        <MediaImage id={copy.image} sizes="100vw" />
      </div>
      <div className="private-prompt-shade" />
      <HeritageSketch kind="florence" />
      <div className="shell private-prompt-copy">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 id="private-prompt-title">
          {copy.title}
          <br />
          <em>{copy.accent}</em>
        </h2>
        <p>{copy.description}</p>
        <Link href="/private-affairs" className="button button-cream">
          {copy.linkLabel}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

export function GallerySection({ full = false }: { full?: boolean }) {
  const { sections } = useContent();
  return (
    <section
      className="gallery-section section-spacing"
      aria-label="Visual journal"
    >
      <HeritageSketch kind="florence" side="left" />
      <div className="shell">
        {!full && (
          <SectionHeading id="gallery-title" copy={sections.gallery}>
            <Link className="text-link" href="/gallery">
              {sections.gallery.linkLabel}
              <Arrow />
            </Link>
          </SectionHeading>
        )}
        <Gallery full={full} />
      </div>
    </section>
  );
}

export function VisitSection() {
  const { sections, settings } = useContent();
  const copy = sections.visit;
  return (
    <section
      className="visit-section section-spacing"
      aria-labelledby="visit-title"
    >
      <HeritageSketch kind="hills" />
      <HeritageSketch kind="florence" side="left" />
      <div className="shell visit-layout">
        <div className="editorial-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="visit-title">
            {copy.title}
            <br />
            <em>{copy.accent}</em>
          </h2>
          <p>{copy.description}</p>
          <Link className="button button-cream" href="/visit-us">
            {copy.linkLabel}
            <Arrow />
          </Link>
        </div>
        <div className="visit-note">
          <Botanical />
          <span className="eyebrow">A WARM WELCOME AWAITS</span>
          {settings.address ? (
            <address>{settings.address}</address>
          ) : (
            <p>{copy.body}</p>
          )}
          <span className="handwritten">until then, a little daydream.</span>
        </div>
      </div>
    </section>
  );
}

export function VisitDetails() {
  const { settings } = useContent();
  const maps = safeExternalUrl(settings.mapsUrl);
  const instagram = safeExternalUrl(settings.instagram);
  const phone = settings.phone.replace(/[^\d+]/g, "");
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email)
    ? settings.email
    : "";
  return (
    <section className="visit-details section-spacing">
      <HeritageSketch kind="paris" side="left" />
      <div className="shell visit-details-grid">
        <div className="location-card">
          <div className="location-drawing">
            <InkStudy kind="hills" />
            <span>
              DA DUKE <i>and Chai</i>
            </span>
          </div>
          <p className="eyebrow">FIND YOUR WAY HERE</p>
          <h2>
            {settings.address ? (
              "Just around the corner."
            ) : (
              <>
                Good things
                <br />
                <em>are finding a home.</em>
              </>
            )}
          </h2>
          {settings.address ? (
            <address>{settings.address}</address>
          ) : (
            <p>
              Our exact address and map pin will be shared once confirmed. For
              now, explore a little of the feeling.
            </p>
          )}
          {settings.directions && <p>{settings.directions}</p>}
          {maps ? (
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              onClick={() => trackDemo("directions", "/visit-us")}
            >
              Get Directions
              <Arrow />
            </a>
          ) : (
            <Link href="/the-house" className="text-link">
              Step into the House
              <Arrow />
            </Link>
          )}
        </div>
        <div className="visit-details-copy">
          <p className="eyebrow">MAKE A LITTLE TIME</p>
          <h2>
            The door,
            <br />
            <em>and the details.</em>
          </h2>
          <div className="hours-list">
            {weekdays.map((day, i) => (
              <div key={day}>
                <span>{day}</span>
                <span>{settings.hours[i] || "To be announced"}</span>
              </div>
            ))}
          </div>
          {settings.specialHours && (
            <p className="form-note">{settings.specialHours}</p>
          )}
          <div className="contact-details">
            {phone && <a href={`tel:${phone}`}>{settings.phone}</a>}
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer">
                Find us on Instagram ↗
              </a>
            )}
          </div>
          <WhatsAppLink />
          <p className="form-note">
            {settings.whatsapp
              ? "Send a message in WhatsApp to speak with our team."
              : "Our WhatsApp contact is coming soon. You can preview a message in the meantime."}
          </p>
        </div>
      </div>
      <div className="shell visit-faq">
        <p className="eyebrow">A FEW LITTLE THINGS</p>
        <details>
          <summary>
            Can I book an occasion here?<span>+</span>
          </summary>
          <p>
            Use Private Affairs to prepare an enquiry for WhatsApp. Our team
            will discuss the details and confirm arrangements with you directly.
            The website does not reserve seats or take payments.
          </p>
        </details>
        <details>
          <summary>
            Is this the final menu?<span>+</span>
          </summary>
          <p>
            The Table is a concept menu for this demonstration. Confirmed
            selections, prices and dietary information will be shared before the
            café launches.
          </p>
        </details>
        <details>
          <summary>
            Are these photographs of the café?<span>+</span>
          </summary>
          <p>{settings.photoNotice}</p>
        </details>
      </div>
    </section>
  );
}

export function HomeSections() {
  const { homeSections } = useContent();
  return (
    <>
      {homeSections
        .filter((section) => section.visible)
        .map(({ id }) => {
          switch (id) {
            case "duality":
              return <DualitySection key={id} />;
            case "house":
              return <HousePreview key={id} />;
            case "ritual":
              return <RitualSection key={id} />;
            case "gatherings":
              return <GatheringsPreview key={id} />;
            case "private":
              return <PrivatePrompt key={id} />;
            case "gallery":
              return <GallerySection key={id} />;
            case "visit":
              return <VisitSection key={id} />;
          }
        })}
    </>
  );
}
