"use client";

import Carte from "@/components/carte";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/components/demo-content";
import Storybook from "@/components/storybook/storybook";
import HeritageSketch from "@/components/heritage-sketch";
import { Arrow } from "@/components/illustrations";
import {
  PageIntro,
  DualitySection,
  HousePreview,
  RitualSection,
  PrivatePrompt,
  GallerySection,
  VisitSection,
  VisitDetails,
} from "@/components/public-sections";
import { GatheringsList, EventDetails } from "@/components/gatherings";
import EnquiryComposer from "@/components/enquiry";
import MediaImage from "@/components/media-image";
import { pageLinks, type PageId } from "@/lib/content";
import { safeExternalUrl } from "@/lib/site-utils";
import { trackDemo } from "@/lib/demo-analytics";

export type CafePage = PageId | "event" | "privacy" | "terms" | "not-found";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="wordmark"
      aria-label="Da Duke and Chai — return to the landing page"
    >
      <span className="brand-name">Da Duke</span>
      <span className="brand-subtitle">and Chai</span>
    </Link>
  );
}

function LegalPage({ terms = false }: { terms?: boolean }) {
  return (
    <section className="legal-page shell section-spacing">
      <HeritageSketch kind="florence" />
      <p className="eyebrow">THE SMALL PRINT · DEMO WEBSITE</p>
      <h1>
        {terms ? "A few little" : "A thoughtful"}
        <br />
        <em>{terms ? "understandings." : "approach to privacy."}</em>
      </h1>
      {terms ? (
        <div className="legal-prose">
          <h2>A café concept</h2>
          <p>
            This website demonstrates the identity and experience of Da Duke and
            Chai. Illustrative menu selections and moodboard photography are not
            a promise of actual products, venue facilities, sourcing or
            availability. Business details will be published when approved.
          </p>
          <h2>Enquiries, not reservations</h2>
          <p>
            The occasion composer prepares a message for WhatsApp. The website
            does not accept bookings, orders or payments. Opening WhatsApp does
            not send a message or confirm an arrangement. All enquiries require
            a response and confirmation from the café team.
          </p>
          <h2>Content and photographs</h2>
          <p>
            Concept photographs are licensed Unsplash images. Brand assets and
            original illustrations belong to their respective owners. Images are
            used as atmosphere references and do not document the actual café or
            its suppliers.
          </p>
          <h2>Before launch</h2>
          <p>
            Final business terms, contact information and event conditions will
            be added with the confirmed café details.
          </p>
        </div>
      ) : (
        <div className="legal-prose">
          <h2>Your occasion stays yours</h2>
          <p>
            Details entered in the enquiry composer are held only while the page
            is open. They are not sent to a server or stored as a reservation.
            Choosing a WhatsApp link passes the message to WhatsApp, where its
            own privacy terms apply. Copying a message puts it on your device’s
            clipboard.
          </p>
          <h2>Local demonstration statistics</h2>
          <p>
            This demo records page counts, tab visits, WhatsApp link clicks,
            directions clicks and a broad screen-size group in this browser’s
            local storage. It keeps approximately 31 days of counts. There is no
            tracking identifier, remote analytics service, advertising cookie,
            precise location collection or recording of enquiry messages. These
            statistics cannot measure the website’s wider audience.
          </p>
          <h2>Demo content editing</h2>
          <p>
            The demonstration CMS saves its drafts, published preview content
            and uploaded images in this browser’s local storage. Its publicly
            shown demo credentials are only a preview of the sign-in experience,
            not secure authentication. Do not put confidential information into
            the demo editor.
          </p>
          <h2>External links and hosting</h2>
          <p>
            WhatsApp, maps and social links open external services only when
            selected. Their own privacy policies apply. Images and fonts are
            served with this website. Hosting providers may process technical
            request logs under their own policies.
          </p>
          <h2>Clearing local data</h2>
          <p>
            You can remove demo content and counts by clearing this site’s
            storage in your browser settings. No browser data is sent to the
            café. A final privacy policy and a verified contact for privacy
            requests will accompany the production launch.
          </p>
        </div>
      )}
    </section>
  );
}

function PrivatePage() {
  const { sections, settings } = useContent();
  return (
    <>
      <section className="private-affairs-content section-spacing">
        <HeritageSketch kind="hills" />
        <div className="shell private-layout">
          <div className="occasion-story">
            <div className="occasion-photo">
              <MediaImage id={sections.private.image} eager />
              <span>FOR THE MOMENTS THAT MATTER</span>
            </div>
            <h2>
              A table full
              <br />
              <em>of your favourites.</em>
            </h2>
            <p>{sections.private.body}</p>
            <div className="occasion-types">
              {settings.occasions.map((occasion, i) => (
                <span key={occasion}>
                  <i>0{i + 1}</i>
                  {occasion}
                </span>
              ))}
            </div>
            {settings.capacity && (
              <p className="capacity-note">{settings.capacity}</p>
            )}
            <p className="image-disclosure">{settings.photoNotice}</p>
          </div>
          <EnquiryComposer />
        </div>
      </section>
      <GallerySection />
    </>
  );
}

export default function Cafe({
  page = "home",
  slug = "",
  preview = false,
}: {
  page?: CafePage;
  slug?: string;
  preview?: boolean;
}) {
  const { settings } = useContent();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const navButton = useRef<HTMLButtonElement>(null);
  const lastTrackedPath = useRef("");
  const instagram = safeExternalUrl(settings.instagram);
  const isHome = page === "home";

  useEffect(() => {
    if (!preview && lastTrackedPath.current !== pathname) {
      lastTrackedPath.current = pathname;
      trackDemo("views", pathname);
    }
  }, [pathname, preview]);

  if (isHome) return <Storybook preview={preview} />;

  return (
    <div className="site" data-motion={paused ? "still" : "live"}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {preview && (
        <div className="preview-banner">
          Draft preview · visible in this browser only
          <Link href="/admin">
            Return to the editor <Arrow />
          </Link>
        </div>
      )}
      <header
        id="top"
        className="site-header"
        onClick={(event) => {
          if ((event.target as Element).closest("a")) setNavOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && navOpen) {
            setNavOpen(false);
            navButton.current?.focus();
          }
        }}
      >
        <div className="shell header-inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            {pageLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                aria-current={page === link.id ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link className="header-cta" href="/private-affairs#enquire">
            Plan an Occasion
            <Arrow />
          </Link>
          <button
            ref={navButton}
            className="mobile-nav-toggle"
            type="button"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className={navOpen ? "is-open" : ""} />
            <span className={navOpen ? "is-open" : ""} />
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!navOpen}
        >
          {pageLinks.map((link, i) => (
            <Link
              href={link.href}
              key={link.id}
              aria-current={page === link.id ? "page" : undefined}
              onClick={() => setNavOpen(false)}
            >
              <span>
                <i>0{i + 1}</i>
                {link.label}
              </span>
              <Arrow />
            </Link>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1} className={`${page}-page`}>
        <>
          {[
            "house",
            "table",
            "carte",
            "gatherings",
            "private",
            "visit",
            "gallery",
          ].includes(page) && <PageIntro page={page as PageId} />}
          {page === "house" && (
            <>
              <DualitySection eager />
              <HousePreview extended />
              <VisitSection />
            </>
          )}
          {page === "carte" && <Carte />}
          {page === "table" && (
            <>
              <RitualSection full />
              <VisitSection />
            </>
          )}
          {page === "gatherings" && (
            <>
              <GatheringsList />
              <PrivatePrompt />
            </>
          )}
          {page === "event" && <EventDetails slug={slug} />}
          {page === "private" && <PrivatePage />}
          {page === "visit" && <VisitDetails />}
          {page === "gallery" && (
            <>
              <GallerySection full />
              <VisitSection />
            </>
          )}
          {(page === "privacy" || page === "terms") && (
            <LegalPage terms={page === "terms"} />
          )}
          {page === "not-found" && (
            <section className="missing-page section-spacing">
              <HeritageSketch kind="rome" />
              <div className="shell">
                <p className="eyebrow">404 · A LITTLE OFF THE BEATEN PATH</p>
                <h1>
                  Shall we find
                  <br />
                  <em>our way back?</em>
                </h1>
                <p>
                  This page seems to have wandered. There’s still a warm welcome
                  at the house.
                </p>
                <Link href="/" className="button button-green">
                  Back to Da Duke and Chai
                  <Arrow />
                </Link>
              </div>
            </section>
          )}
        </>
      </main>
      <footer className="site-footer">
        <div className="shell">
          <div className="footer-top">
            <div>
              <Wordmark />
              <p>
                A European state of mind.
                <br />A Himalayan cup of soul.
              </p>
            </div>
            <div className="footer-links">
              <span className="eyebrow">WANDER A LITTLE</span>
              <div>
                {pageLinks.map((link) => (
                  <Link key={link.id} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="footer-note">
              <span className="eyebrow">A LITTLE MORE, SOON</span>
              <p>
                A café concept, thoughtfully imagined.
                <br />
                The details are still brewing.
              </p>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Instagram
                  <Arrow />
                </a>
              )}
              <button
                className="motion-toggle"
                onClick={() => setPaused(!paused)}
                aria-pressed={paused}
              >
                <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
                {paused ? "Resume scenery" : "Pause scenery"}
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Da Duke and Chai</p>
            <div>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
            <a href="#top" className="back-to-top">
              Back to the top
              <Arrow />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
