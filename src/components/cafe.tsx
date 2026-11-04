"use client";

import Image from "next/image";
import Link from "next/link";
import JourneyHero from "@/components/journey-hero";
import VisitPlanner from "@/components/visit-planner";
import {
  PageIntro,
  StoryDetails,
  FullMenu,
  SpaceDetails,
  type CafePage,
} from "@/components/page-sections";
import { useRef, useState } from "react";
import {
  Arrow,
  ArchDrawing,
  Botanical,
  BrandEmblem,
} from "@/components/illustrations";
import {
  categoryImages,
  menu,
  menuCategories,
  type MenuCategory,
} from "@/lib/menu";

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`wordmark ${light ? "wordmark-light" : ""}`}
      aria-label="Da Duke and Chai — home"
    >
      <BrandEmblem className="brand-emblem" />
      <span>
        <span className="brand-name">Da Duke</span>
        <span className="brand-subtitle">and Chai</span>
      </span>
    </Link>
  );
}

const gallery = [
  {
    src: "/images/cafe-table.webp",
    alt: "A quiet wooden table by a sunlit window, with cups and climbing greenery",
    caption: "A corner to call your own",
  },
  {
    src: "/images/cafe-exterior.webp",
    alt: "An intimate European café terrace with cream façades and green plants",
    caption: "A little European daydream",
  },
  {
    src: "/images/cafe-interior.webp",
    alt: "Warm pendant lights and a vintage café sign",
    caption: "The glow of a slow evening",
  },
];

export default function Cafe({ page = "home" }: { page?: CafePage }) {
  const isHome = page === "home";
  const [navOpen, setNavOpen] = useState(false);
  const [category, setCategory] = useState<MenuCategory | "Favourites">(
    "Favourites",
  );
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryDialog = useRef<HTMLDialogElement>(null);
  const navToggle = useRef<HTMLButtonElement>(null);

  function changeGallery(direction: number) {
    setGalleryIndex(
      (previous) => (previous + direction + gallery.length) % gallery.length,
    );
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        id="home"
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && navOpen) {
            setNavOpen(false);
            navToggle.current?.focus();
          }
        }}
      >
        <div className="shell header-inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              href="/our-story"
              aria-current={page === "story" ? "page" : undefined}
            >
              Our story
            </Link>
            <Link
              href="/menu"
              aria-current={page === "menu" ? "page" : undefined}
            >
              The menu
            </Link>
            <Link
              href="/the-space"
              aria-current={page === "space" ? "page" : undefined}
            >
              The space
            </Link>
          </nav>
          <Link
            href="/visit"
            className="header-visit"
            aria-current={page === "visit" ? "page" : undefined}
          >
            Come on in <Arrow />
          </Link>
          <button
            ref={navToggle}
            className="mobile-nav-toggle"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            aria-controls={navOpen ? "mobile-navigation" : undefined}
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className={navOpen ? "is-open" : ""} />
            <span className={navOpen ? "is-open" : ""} />
          </button>
        </div>
        {navOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["Our story", "/our-story"],
              ["The menu", "/menu"],
              ["The space", "/the-space"],
              ["Come on in", "/visit"],
            ].map(([label, id]) => (
              <Link key={id} href={id} onClick={() => setNavOpen(false)}>
                {label}
                <Arrow />
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main id="main" tabIndex={-1} className={`${page}-page`}>
        {isHome && <JourneyHero />}
        {!isHome && <PageIntro page={page} />}

        <div id="welcome" className="heritage-strip">
          <div className="shell">
            <span>EUROPEAN SOUL</span>
            <span className="strip-flower">✳</span>
            <span>ASSAM IN EVERY SIP</span>
            <span className="strip-flower">✳</span>
            <span>BENGAL AT HEART</span>
            <span className="strip-flower">✳</span>
            <span>ALWAYS, A WARM WELCOME</span>
          </div>
        </div>

        {(isHome || page === "story") && (
          <section
            id="story"
            className="story shell section-spacing"
            aria-labelledby="story-title"
          >
            <div className="story-art">
              <ArchDrawing />
              <span>Two worlds. One table.</span>
            </div>
            <div className="story-copy">
              <p className="eyebrow">A MEETING OF TWO WORLDS</p>
              <h2 id="story-title">
                Faraway charm.
                <br />
                <em>Familiar warmth.</em>
              </h2>
              <p>
                Imagine a quiet European café, with the heart of a North Bengal
                afternoon. The arches are timeless. The cane chairs feel like
                home. And the chai? It has stories to tell.
              </p>
              <p>
                Da Duke and Chai brings our love for café culture to the tea
                traditions of Assam and the easy warmth of Bengali adda. A
                little place for long conversations and life’s simple pleasures.
              </p>
              <Link
                href={isHome ? "/our-story" : "/the-space"}
                className="text-link"
              >
                {isHome ? "The story behind the cup" : "A place to linger"}{" "}
                <Arrow />
              </Link>
            </div>
            <Botanical className="story-botanical" />
          </section>
        )}
        {page === "story" && <StoryDetails />}

        {(isHome || page === "menu") && (
          <section
            id="menu"
            className="menu-section section-spacing"
            aria-labelledby="menu-title"
          >
            <div className="shell">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">POURED WITH CARE. MADE WITH LOVE.</p>
                  <h2 id="menu-title">
                    A taste of <em>the good life.</em>
                  </h2>
                </div>
                <p>
                  Something comforting. Something curious.
                  <br />
                  Always a reason for one more bite.
                </p>
              </div>
              <div
                className="menu-filters"
                role="group"
                aria-label="Filter the sample menu"
              >
                {(["Favourites", ...menuCategories] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={category === value}
                    aria-controls="menu-selection"
                    className={category === value ? "active" : ""}
                    onClick={() => setCategory(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div id="menu-selection" aria-live="polite" aria-atomic="true">
                {category === "Favourites" ? (
                  <div className="favourites-grid">
                    {[menu[0], menu[3], menu[6]].map((item, index) => (
                      <article className="menu-card" key={item.name}>
                        <div
                          className={`menu-card-image menu-card-image-${index}`}
                        >
                          <Image
                            src={categoryImages[item.category].src}
                            alt={categoryImages[item.category].alt}
                            fill
                            sizes="(max-width: 650px) 90vw, 30vw"
                          />
                          <span>{item.note}</span>
                        </div>
                        <div className="menu-card-title">
                          <h3>{item.name}</h3>
                          <span>₹{item.price}</span>
                        </div>
                        <p>{item.description}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="category-panel" key={category}>
                    <div className="category-photo">
                      <Image
                        src={categoryImages[category].src}
                        alt={categoryImages[category].alt}
                        fill
                        sizes="(max-width: 650px) 90vw, 38vw"
                      />
                    </div>
                    <div className="category-items">
                      <p className="eyebrow">{category}</p>
                      {menu
                        .filter((item) => item.category === category)
                        .map((item) => (
                          <article key={item.name}>
                            <div className="menu-card-title">
                              <h3>{item.name}</h3>
                              <span>₹{item.price}</span>
                            </div>
                            <p>{item.description}</p>
                          </article>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="menu-bottom">
                <span>
                  A little preview of what’s brewing. Sample menu & prices.
                </span>
                <Link
                  className="text-link"
                  href={isHome ? "/menu" : "#full-menu"}
                >
                  Explore the full menu <Arrow />
                </Link>
              </div>
            </div>
          </section>
        )}
        {page === "menu" && <FullMenu />}

        {(isHome || page === "space") && (
          <section
            id="space"
            className="space-section shell section-spacing"
            aria-labelledby="space-title"
          >
            <div className="space-heading">
              <p className="eyebrow">YOUR EVERYDAY LITTLE ESCAPE</p>
              <h2 id="space-title">
                Some places make you
                <br />
                <em>forget the time.</em>
              </h2>
              <p>
                Sunlit corners. Earthy textures. Conversations without a clock.
                <br className="desktop-break" /> Settle into the feeling of Da
                Duke.
              </p>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button
                  className={`gallery-item gallery-item-${index}`}
                  key={item.src}
                  onClick={() => {
                    setGalleryIndex(index);
                    galleryDialog.current?.showModal();
                  }}
                  aria-label={`View image: ${item.caption}`}
                >
                  <div className="gallery-image">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 650px) 82vw, 32vw"
                    />
                    <span className="gallery-expand">
                      <Arrow />
                    </span>
                  </div>
                  <span className="gallery-caption">
                    <span>0{index + 1}</span>
                    {item.caption}
                  </span>
                </button>
              ))}
            </div>
            {isHome && (
              <div className="space-page-link">
                <Link href="/the-space" className="text-link">
                  Step inside our world <Arrow />
                </Link>
              </div>
            )}
            <p className="gallery-note">
              A glimpse of the mood. Inspiration imagery for our café concept.
            </p>
          </section>
        )}
        {page === "space" && <SpaceDetails />}

        {page !== "visit" && (
          <section
            id="visit"
            className="visit-section"
            aria-labelledby="visit-title"
          >
            <div className="shell visit-inner">
              <Botanical className="visit-botanical" />
              <div className="visit-copy">
                <p className="eyebrow">THERE’S A SEAT WITH YOUR NAME ON IT</p>
                <h2 id="visit-title">
                  Come for the chai.
                  <br />
                  <em>Stay for a while.</em>
                </h2>
                <p>
                  Bring a friend, a book, or just yourself.
                  <br />
                  We’ll bring the warmth.
                </p>
                <Link className="button button-cream" href="/visit">
                  Plan a visit <Arrow />
                </Link>
              </div>
              <div className="visit-arch">
                <BrandEmblem />
                <p className="visit-card-title">
                  A little pause.
                  <br />A lovely ritual.
                </p>
                <div className="visit-rule" />
                <p>
                  Inspired by North Bengal
                  <br />& the tea gardens of Assam
                </p>
                <span>VISITING DETAILS COMING SOON</span>
              </div>
            </div>
          </section>
        )}
        {page === "visit" && <VisitPlanner />}
      </main>

      <footer className="site-footer shell">
        <div className="footer-top">
          <Wordmark />
          <p>
            European soul. Bengal at heart.
            <br />A cup of something wonderful.
          </p>
          <a href="#home" className="back-to-top">
            Back to the top <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Da Duke and Chai</p>
          <span>A café concept, thoughtfully imagined.</span>
          <Link href="/menu">Our sample menu</Link>
        </div>
      </footer>

      <dialog
        className="cafe-dialog lightbox-dialog"
        ref={galleryDialog}
        aria-label="Café inspiration gallery"
        onClick={(e) => {
          if (e.target === e.currentTarget) galleryDialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") changeGallery(1);
          if (e.key === "ArrowLeft") changeGallery(-1);
        }}
      >
        <div className="lightbox-inner">
          <button
            className="dialog-close"
            aria-label="Close gallery"
            onClick={() => galleryDialog.current?.close()}
          >
            ×
          </button>
          <div className="lightbox-photo">
            <Image
              src={gallery[galleryIndex].src}
              alt={gallery[galleryIndex].alt}
              fill
              sizes="90vw"
            />
          </div>
          <div className="lightbox-bottom">
            <button
              aria-label="Previous image"
              onClick={() => changeGallery(-1)}
            >
              <Arrow className="rotate-180" />
            </button>
            <div aria-live="polite">
              <p>{gallery[galleryIndex].caption}</p>
              <span>
                {galleryIndex + 1} / {gallery.length} · Inspiration imagery
              </span>
            </div>
            <button aria-label="Next image" onClick={() => changeGallery(1)}>
              <Arrow />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
