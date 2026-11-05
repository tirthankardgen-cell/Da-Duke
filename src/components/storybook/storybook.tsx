"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useContent } from "@/components/demo-content";
import MediaImage from "@/components/media-image";
import { InkStudy } from "@/components/heritage-sketch";
import { Arrow } from "@/components/illustrations";
import { bookChapterLabels, type BookChapterId } from "@/lib/content";
import { safeExternalUrl } from "@/lib/site-utils";
import {
  AlpineSketch,
  Flourish,
  MountainEmblem,
  TeaBranch,
  TeacupSeal,
} from "./book-illustrations";
import styles from "./storybook.module.css";

type ChapterId = "contents" | BookChapterId;
type Side = "left" | "right";
type PageTurn = {
  from: ChapterId;
  to: ChapterId;
  direction: "forward" | "backward";
};
const chapterEvent = "da-duke:chapter";
const numerals = ["I", "II", "III", "IV", "V"];

function subscribeToChapter(notify: () => void) {
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
  window.addEventListener(chapterEvent, notify);
  return () => {
    window.removeEventListener("hashchange", notify);
    window.removeEventListener("popstate", notify);
    window.removeEventListener(chapterEvent, notify);
  };
}

function chapterSnapshot() {
  return window.location.hash.slice(1) || "contents";
}

function ChapterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className={styles.chapterLink} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}

function Photo({
  id,
  caption,
  className = "",
}: {
  id: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`${styles.photo} ${className}`}>
      <div className={styles.photoFrame}>
        <MediaImage id={id} sizes="(max-width: 600px) 85vw, 500px" eager />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function Storybook({ preview = false }: { preview?: boolean }) {
  const { storybook, sections, settings, menu } = useContent();
  const chapters = useMemo(
    () =>
      storybook.chapters
        .filter((chapter) => chapter.visible)
        .map((chapter) => chapter.id),
    [storybook.chapters],
  );
  const chapterIds = useMemo<ChapterId[]>(
    () => ["contents", ...chapters],
    [chapters],
  );
  const requestedChapter = useSyncExternalStore(
    subscribeToChapter,
    chapterSnapshot,
    () => "contents",
  );
  const active: ChapterId = chapterIds.includes(requestedChapter as ChapterId)
    ? (requestedChapter as ChapterId)
    : "contents";
  const activeIndex = chapterIds.indexOf(active);
  const [turn, setTurn] = useState<PageTurn | null>(null);
  const [still, setStill] = useState(false);
  const main = useRef<HTMLElement>(null);
  const book = useRef<HTMLDivElement>(null);
  const turnLocked = useRef(false);
  const restoreFocus = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const wheelGesture = useRef({ amount: 0, time: 0 });
  const instagram = safeExternalUrl(settings.instagram);
  const selections = menu
    .filter((item) => item.available && item.featured)
    .slice(0, 3);

  const finishTurn = useCallback(() => {
    setTurn(null);
    turnLocked.current = false;
    if (restoreFocus.current) {
      main.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, []);

  const goTo = useCallback(
    (next: ChapterId) => {
      if (next === active || turnLocked.current || !chapterIds.includes(next))
        return;
      const smallScreen = window.matchMedia("(max-width: 900px)").matches;
      const reduceMotion =
        still || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      restoreFocus.current = !!book.current?.contains(document.activeElement);
      if (!smallScreen && !reduceMotion) {
        turnLocked.current = true;
        setTurn({
          from: active,
          to: next,
          direction:
            chapterIds.indexOf(next) > activeIndex ? "forward" : "backward",
        });
      }
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${next}`,
      );
      window.dispatchEvent(new Event(chapterEvent));
      if (smallScreen)
        main.current?.scrollIntoView({ behavior: "instant", block: "start" });
      if (smallScreen || reduceMotion) finishTurn();
    },
    [active, activeIndex, chapterIds, finishTurn, still],
  );

  useEffect(() => {
    if (!turn) return;
    // The timeout also completes a turn if motion preferences change mid-animation.
    const timer = window.setTimeout(finishTurn, 850);
    return () => window.clearTimeout(timer);
  }, [turn, finishTurn]);

  useEffect(() => {
    const pages = Array.from(
      book.current?.querySelectorAll<HTMLElement>("[data-book-scroll]") || [],
    );
    const measure = () => {
      for (const page of pages) {
        // Ignore fractional font rounding; long edited stories remain scrollable.
        const overflow = page.scrollHeight > page.clientHeight + 2;
        page.dataset.overflow = String(overflow);
        page.tabIndex = overflow ? 0 : -1;
      }
    };
    const observer = new ResizeObserver(measure);
    for (const page of pages) {
      observer.observe(page);
      if (page.firstElementChild) observer.observe(page.firstElementChild);
    }
    measure();
    return () => observer.disconnect();
  }, [active, turn, storybook, sections, menu]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.target as HTMLElement).closest(
          "input, textarea, select, [contenteditable=true], dialog",
        )
      )
        return;
      if (
        ["Home", "End"].includes(event.key) &&
        (event.target as HTMLElement).closest('[data-overflow="true"]')
      )
        return;
      let next: ChapterId | undefined;
      if (event.key === "ArrowRight") next = chapterIds[activeIndex + 1];
      if (event.key === "ArrowLeft") next = chapterIds[activeIndex - 1];
      if (event.key === "Home") next = chapterIds[0];
      if (event.key === "End") next = chapterIds.at(-1);
      if (next) {
        event.preventDefault();
        goTo(next);
      }
    }
    function handleWheel(event: WheelEvent) {
      if (
        window.matchMedia("(max-width: 900px)").matches ||
        event.ctrlKey ||
        (event.target as HTMLElement).closest("input, textarea, select") ||
        window.getSelection()?.toString()
      )
        return;
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      const scrollingPage = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-book-scroll]",
      );
      if (
        scrollingPage &&
        scrollingPage.scrollHeight > scrollingPage.clientHeight + 2 &&
        ((delta > 0 &&
          scrollingPage.scrollTop + scrollingPage.clientHeight <
            scrollingPage.scrollHeight - 2) ||
          (delta < 0 && scrollingPage.scrollTop > 0))
      )
        return;
      const next = chapterIds[activeIndex + (delta > 0 ? 1 : -1)];
      if (!next || !delta) return;
      event.preventDefault();
      if (turnLocked.current) return;
      const now = performance.now();
      const gesture = wheelGesture.current;
      if (
        now - gesture.time > 200 ||
        Math.sign(gesture.amount) !== Math.sign(delta)
      )
        gesture.amount = 0;
      gesture.time = now;
      gesture.amount +=
        delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 600 : 1);
      if (Math.abs(gesture.amount) > 100) {
        gesture.amount = 0;
        goTo(next);
      }
    }
    const element = book.current;
    window.addEventListener("keydown", handleKey);
    element?.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKey);
      element?.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex, chapterIds, goTo]);

  function pageContent(id: ChapterId, side: Side) {
    if (id === "contents" && side === "left")
      return (
        <div className={styles.contents}>
          <TeaBranch className={styles.contentsBranch} />
          <p className={styles.kicker}>THE CONTENTS</p>
          <h2>
            A tale of
            <br />
            <em>two worlds.</em>
          </h2>
          <ol className={styles.contentsList}>
            {chapters.map((chapter, i) => (
              <li key={chapter}>
                <button type="button" onClick={() => goTo(chapter)}>
                  <span className={styles.roman}>{numerals[i]}</span>
                  <span className={styles.contentsLabel}>
                    <span>{bookChapterLabels[chapter].label}</span>
                    <small>{bookChapterLabels[chapter].note}</small>
                  </span>
                  <span className={styles.leader} />
                  <span className={styles.contentsNumber}>
                    {String(i * 2 + 4).padStart(2, "0")}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <blockquote className={styles.dedication}>
            “{storybook.cover.quote}”
          </blockquote>
          <div className={styles.contentsFootnote}>
            <span>EST. IN GOOD COMPANY</span>
            <span>✳</span>
          </div>
        </div>
      );
    if (id === "contents")
      return (
        <div className={styles.cover}>
          <div className={styles.coverFrame} aria-hidden="true" />
          <TeaBranch className={styles.coverBranchLeft} />
          <TeaBranch className={styles.coverBranchRight} />
          <p className={styles.kicker}>{storybook.cover.eyebrow}</p>
          <MountainEmblem className={styles.mountainEmblem} />
          <h2 className={styles.coverTitle}>
            {storybook.cover.title}
            <em>{storybook.cover.accent}</em>
          </h2>
          <p className={styles.coverSubtitle}>{storybook.cover.description}</p>
          <Flourish className={styles.flourish} />
          <p className={styles.edition}>EUROPE · NORTH BENGAL · ASSAM</p>
          <p className={styles.coverDescription}>{storybook.cover.body}</p>
          <span className={styles.volume}>
            VOLUME ONE <span aria-hidden="true">✳</span> THE ART OF SLOW LIVING
          </span>
        </div>
      );
    if (id === "alps" || id === "himalayas") {
      const story = storybook[id];
      if (side === "left")
        return (
          <div className={styles.story}>
            <div className={styles.storySketch}>
              {id === "alps" ? <AlpineSketch /> : <InkStudy kind="hills" />}
            </div>
            <p className={styles.kicker}>{story.eyebrow}</p>
            <h2>
              {story.title}
              <br />
              <em>{story.accent}</em>
            </h2>
            <p className={styles.storyIntro}>{story.description}</p>
            <div className={styles.prose}>
              {story.body.split(/\n\s*\n/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <ChapterLink href={id === "alps" ? "/the-house" : "/the-carte"}>
              {story.linkLabel}
            </ChapterLink>
          </div>
        );
      return (
        <div className={styles.storyFacing}>
          <span className={styles.plateLabel}>{story.caption}</span>
          <Photo
            id={story.image}
            caption={
              id === "alps"
                ? "The charm of a café, a world away."
                : "A landscape that stays with you."
            }
            className={id === "himalayas" ? styles.mountainPhoto : ""}
          />
          <TeaBranch className={styles.photoBranch} />
          <blockquote className={styles.pullQuote}>“{story.quote}”</blockquote>
          <Flourish className={styles.smallFlourish} />
          <p className={styles.disclosure}>{settings.photoNotice}</p>
        </div>
      );
    }
    if (id === "table" && side === "left")
      return (
        <div className={styles.tableStory}>
          <p className={styles.kicker}>FROM OUR KITCHEN & TEA ROOM</p>
          <h2>
            {sections.ritual.title}
            <br />
            <em>{sections.ritual.accent}</em>
          </h2>
          <p className={styles.storyIntro}>{sections.ritual.description}</p>
          <div className={styles.menuSelections}>
            {selections.length ? (
              selections.map((item, i) => (
                <div key={item.id} className={styles.menuSelection}>
                  <span className={styles.roman}>{numerals[i]}</span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    {item.dietary && <small>{item.dietary}</small>}
                  </div>
                </div>
              ))
            ) : (
              <p>{sections.ritual.body}</p>
            )}
          </div>
          <ChapterLink href="/the-carte">Explore The Carte</ChapterLink>
          <p className={styles.disclosure}>{settings.menuNotice}</p>
        </div>
      );
    if (id === "table")
      return (
        <div className={styles.tableFacing}>
          <span className={styles.plateLabel}>
            THE PLEASURE IS IN THE PAIRING
          </span>
          <Photo id={sections.ritual.image} className={styles.teaPhoto} />
          <Photo
            id="croissant"
            className={styles.pastryPhoto}
            caption="A little Paris. A little chai."
          />
          <TeaBranch className={styles.tableBranch} />
          <p className={styles.handwritten}>Better, together.</p>
          <p className={styles.disclosure}>{settings.photoNotice}</p>
        </div>
      );
    if (id === "house" && side === "left")
      return (
        <div className={styles.houseStory}>
          <p className={styles.kicker}>{sections.house.eyebrow}</p>
          <h2>
            {sections.house.title}
            <br />
            <em>{sections.house.accent}</em>
          </h2>
          <p className={styles.storyIntro}>{sections.house.description}</p>
          <Photo
            id={sections.house.image}
            caption="A corner for a conversation."
          />
          <div className={styles.prose}>
            <p>{sections.house.body}</p>
          </div>
          <ChapterLink href="/the-house">
            {sections.house.linkLabel}
          </ChapterLink>
        </div>
      );
    if (id === "house")
      return (
        <div className={styles.houseFacing}>
          <TeacupSeal className={styles.smallSeal} />
          <p className={styles.kicker}>{sections.gatherings.eyebrow}</p>
          <h2>
            {sections.gatherings.title}
            <br />
            <em>{sections.gatherings.accent}</em>
          </h2>
          <div className={styles.prose}>
            <p>{sections.gatherings.description}</p>
          </div>
          <ChapterLink href="/gatherings">
            {sections.gatherings.linkLabel}
          </ChapterLink>
          <Flourish className={styles.smallFlourish} />
          <p className={styles.kicker}>A FEW LITTLE MOMENTS</p>
          <p className={styles.journalNote}>{sections.gallery.description}</p>
          <ChapterLink href="/the-journal">Open the visual journal</ChapterLink>
        </div>
      );
    if (side === "left")
      return (
        <div className={styles.visitStory}>
          <div className={styles.storySketch}>
            <InkStudy kind="tea" />
          </div>
          <p className={styles.kicker}>{sections.visit.eyebrow}</p>
          <h2>
            {sections.visit.title}
            <br />
            <em>{sections.visit.accent}</em>
          </h2>
          <p className={styles.storyIntro}>{sections.visit.description}</p>
          <div className={styles.prose}>
            <p>{settings.address || sections.visit.body}</p>
          </div>
          <ChapterLink href="/visit-us">{sections.visit.linkLabel}</ChapterLink>
          {instagram && (
            <a
              className={styles.chapterLink}
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow the house on Instagram
              <Arrow />
            </a>
          )}
          <Flourish className={styles.smallFlourish} />
          <p className={styles.signoff}>Until we meet over chai.</p>
        </div>
      );
    return (
      <div className={styles.invitation}>
        <TeaBranch className={styles.invitationBranch} />
        <TeacupSeal className={styles.invitationSeal} />
        <p className={styles.kicker}>{sections.private.eyebrow}</p>
        <h2>
          {sections.private.title}
          <br />
          <em>{sections.private.accent}</em>
        </h2>
        <p className={styles.storyIntro}>{sections.private.description}</p>
        <Link
          className={styles.invitationButton}
          href="/private-affairs#enquire"
        >
          {sections.private.linkLabel}
          <Arrow />
        </Link>
        <p className={styles.disclosure}>
          Enquiries are subject to confirmation by our team.
        </p>
        <span className={styles.theEnd}>The beginning of a lovely story.</span>
      </div>
    );
  }

  function sheet(id: ChapterId, side: Side, decorative = false) {
    const number =
      Math.max(0, chapterIds.indexOf(id)) * 2 + (side === "left" ? 2 : 3);
    return (
      <section
        key={`${id}-${side}`}
        className={`${styles.sheet} ${side === "left" ? styles.leftSheet : styles.rightSheet} ${id === "contents" && side === "right" ? styles.coverSheet : ""}`}
        aria-label={
          decorative
            ? undefined
            : `${id === "contents" ? (side === "left" ? "Contents" : "Title page") : bookChapterLabels[id].label}, page ${number}`
        }
      >
        <div className={styles.paperBody} data-book-scroll>
          {pageContent(id, side)}
        </div>
        <div className={styles.paperFolio} aria-hidden="true">
          <span>{String(number).padStart(2, "0")}</span>
          <span>
            {side === "left"
              ? id === "contents"
                ? "THE CONTENTS"
                : bookChapterLabels[id].label
              : "DA DUKE AND CHAI"}
          </span>
          <span>✳</span>
        </div>
      </section>
    );
  }

  const leftChapter = turn?.direction === "forward" ? turn.from : active;
  const rightChapter = turn?.direction === "backward" ? turn.from : active;
  const firstPage = activeIndex * 2 + 2;

  return (
    <div className={styles.experience} data-still={still}>
      <a
        className="skip-link"
        href="#storybook-main"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        Skip to the storybook
      </a>
      {preview && (
        <div className={styles.previewBanner}>
          Draft preview · visible in this browser only
          <Link href="/admin">
            Return to the editor <Arrow />
          </Link>
        </div>
      )}
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.wordmark}
          aria-label="Da Duke and Chai — return to contents"
          onClick={(event) => {
            if (
              !event.ctrlKey &&
              !event.metaKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              event.preventDefault();
              goTo("contents");
            }
          }}
        >
          <span>Da Duke</span>
          <em>and Chai</em>
        </Link>
        <nav className={styles.chapterNav} aria-label="Book chapters">
          {chapterIds.map((id) => (
            <button
              key={id}
              type="button"
              aria-current={id === active ? "page" : undefined}
              onClick={() => goTo(id)}
            >
              {id === "contents" ? "Contents" : bookChapterLabels[id].label}
            </button>
          ))}
        </nav>
        <Link className={styles.headerCta} href="/private-affairs#enquire">
          Plan an occasion
          <Arrow />
        </Link>
      </header>
      <main
        id="storybook-main"
        className={styles.stage}
        ref={main}
        tabIndex={-1}
      >
        <h1 className={styles.srOnly}>
          Da Duke and Chai — where the Alps meet the Himalayas
        </h1>
        <div className={styles.bookSurround}>
          <div
            ref={book}
            className={styles.book}
            aria-label="An open book of two worlds"
            aria-busy={!!turn}
            onTouchStart={(event) => {
              const point = event.touches[0];
              touch.current =
                event.touches.length === 1 && point.clientX > 24
                  ? { x: point.clientX, y: point.clientY }
                  : null;
            }}
            onTouchCancel={() => {
              touch.current = null;
            }}
            onTouchEnd={(event) => {
              if (!touch.current) return;
              const point = event.changedTouches[0];
              const dx = point.clientX - touch.current.x;
              const dy = point.clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                const next = chapterIds[activeIndex + (dx < 0 ? 1 : -1)];
                if (next) goTo(next);
              }
            }}
          >
            <div className={styles.binding} aria-hidden="true" />
            <div className={styles.pageEdges} aria-hidden="true" />
            <div className={styles.spread} inert={!!turn}>
              {sheet(leftChapter, "left")}
              {sheet(rightChapter, "right")}
            </div>
            <div className={styles.spine} aria-hidden="true" />
            {turn && (
              <div
                className={`${styles.turningLeaf} ${turn.direction === "forward" ? styles.turnForward : styles.turnBackward}`}
                aria-hidden="true"
                inert
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget) finishTurn();
                }}
              >
                <div className={styles.leafFront}>
                  {sheet(
                    turn.from,
                    turn.direction === "forward" ? "right" : "left",
                    true,
                  )}
                </div>
                <div className={styles.leafBack}>
                  {sheet(
                    turn.to,
                    turn.direction === "forward" ? "left" : "right",
                    true,
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.bookControls}>
          <p className={styles.readingHint}>
            <span className={styles.desktopHint}>Scroll, swipe or use</span>
            <span className={styles.mobileHint}>Swipe or use</span>{" "}
            <span aria-hidden="true">← →</span> to turn the page
          </p>
          <div className={styles.progressBlock}>
            <span className={styles.folio}>
              pp. {String(firstPage).padStart(2, "0")} —{" "}
              {String(firstPage + 1).padStart(2, "0")}
            </span>
            <span className={styles.progressTrack} aria-hidden="true">
              <span
                style={{
                  width: `${((activeIndex + 1) / chapterIds.length) * 100}%`,
                }}
              />
            </span>
          </div>
          <div className={styles.pageButtons}>
            <button
              type="button"
              className={styles.previous}
              aria-label="Previous page"
              disabled={activeIndex === 0}
              onClick={() => goTo(chapterIds[activeIndex - 1])}
            >
              <Arrow />
            </button>
            <button
              type="button"
              aria-label="Next page"
              disabled={activeIndex === chapterIds.length - 1}
              onClick={() => goTo(chapterIds[activeIndex + 1])}
            >
              <Arrow />
            </button>
          </div>
        </div>
        <p
          className={styles.srOnly}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {active === "contents" ? "Contents" : bookChapterLabels[active].label}
          . Pages {firstPage} and {firstPage + 1}.
        </p>
      </main>
      <footer className={styles.footer}>
        <p>
          EUROPEAN SOUL <span aria-hidden="true">✳</span> HIMALAYAN HEART
        </p>
        <nav aria-label="Explore the café">
          <Link href="/the-carte">The Carte</Link>
          <Link href="/gatherings">Gatherings</Link>
          <Link href="/the-journal">The Journal</Link>
          <Link href="/visit-us">Visit Us</Link>
        </nav>
        <div>
          <button
            type="button"
            onClick={() => setStill(!still)}
            aria-pressed={still}
          >
            {still ? "Enable page motion" : "Still pages"}
          </button>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </div>
  );
}
