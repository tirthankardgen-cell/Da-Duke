"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow, Botanical, BrandEmblem } from "@/components/illustrations";

const scenes = [
  {
    src: "/images/rome.webp",
    alt: "The warm stone arches of Rome’s Colosseum at dusk",
    title: "The arches of Italy",
    caption: "where our daydream begins",
    label: "ITALIAN CHARM",
  },
  {
    src: "/images/mountains.webp",
    alt: "Snowy Himalayan peaks behind a wooded valley and a small mountain stupa",
    title: "The quiet of the Himalayas",
    caption: "a little closer to the clouds",
    label: "HIMALAYAN SOUL",
  },
  {
    src: "/images/cafe-table.webp",
    alt: "A warm café table set beside a sunlit window and greenery",
    title: "A table that feels like home",
    caption: "and somehow, we’re home",
    label: "ONE WARM WELCOME",
  },
];

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export default function JourneyHero() {
  const section = useRef<HTMLElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousScene = -1;
    let previousProgress = -1;

    function update() {
      frame = 0;
      if (!element) return;
      const reduced = preference.matches || element.dataset.still === "true";
      const bounds = element.getBoundingClientRect();
      const progress = reduced
        ? 1
        : clamp(-bounds.top / Math.max(1, bounds.height - window.innerHeight));
      if (Math.abs(progress - previousProgress) < 0.0001) return;
      previousProgress = progress;
      const firstTransition = ease((progress - 0.16) / 0.25);
      const secondTransition = ease((progress - 0.61) / 0.23);
      element.style.setProperty("--rome-opacity", String(1 - firstTransition));
      element.style.setProperty(
        "--mountain-opacity",
        String(firstTransition * (1 - secondTransition)),
      );
      element.style.setProperty("--cafe-opacity", String(secondTransition));
      element.style.setProperty("--rome-scale", String(1 + progress * 0.55));
      element.style.setProperty(
        "--mountain-scale",
        String(1.13 - clamp((progress - 0.23) / 0.5) * 0.13),
      );
      element.style.setProperty(
        "--cafe-scale",
        String(1.07 - secondTransition * 0.07),
      );
      element.style.setProperty(
        "--portal-scale",
        String(1 + firstTransition * 0.75),
      );
      element.style.setProperty(
        "--portal-opacity",
        String(1 - firstTransition),
      );
      element.style.setProperty("--journey-progress", `${progress * 100}%`);
      const nextScene = progress < 0.3 ? 0 : progress < 0.74 ? 1 : 2;
      if (nextScene !== previousScene) {
        previousScene = nextScene;
        setActiveScene(nextScene);
      }
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [still]);

  function moveToScene(index: number) {
    const element = section.current;
    if (!element) return;
    const offsets = [0, 0.5, 0.95];
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (element.offsetHeight - window.innerHeight) * offsets[index],
      behavior: "smooth",
    });
  }

  function toggleStill() {
    const element = section.current;
    const top = element
      ? element.getBoundingClientRect().top + window.scrollY
      : 0;
    setStill((previous) => !previous);
    window.requestAnimationFrame(() =>
      window.scrollTo({ top, behavior: "instant" }),
    );
  }

  return (
    <section
      ref={section}
      className="journey-section"
      data-still={still}
      aria-label="A journey from Italy to the mountains, and home to Da Duke"
    >
      <div className="journey-sticky">
        <div className="hero shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="little-line" /> A CAFÉ FOR THE UNHURRIED
            </p>
            <h1>
              A little Europe.
              <br />A lot of <em>home.</em>
            </h1>
            <p className="hero-description">
              European charm. The soul of the tea gardens.
              <br className="desktop-break" /> And a warm cup that brings it all
              together.
            </p>
            <Link className="button button-green" href="/menu">
              Find your favourite <Arrow />
            </Link>
            <div className="journey-controls">
              <p className="journey-scroll-note">
                <span className="scroll-thread" />
                Scroll slowly. A little journey awaits.
              </p>
              <div className="journey-chapters" aria-label="Choose a scene">
                {scenes.map((scene, index) => (
                  <button
                    key={scene.src}
                    className={activeScene === index ? "active" : ""}
                    onClick={() => moveToScene(index)}
                    aria-label={`Scene ${index + 1}: ${scene.title}`}
                    aria-pressed={activeScene === index}
                  >
                    <span>0{index + 1}</span>
                    <span>{scene.label}</span>
                  </button>
                ))}
              </div>
              <button className="journey-motion-toggle" onClick={toggleStill}>
                {still ? "Play the scroll journey" : "Prefer a still moment?"}
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="arch-outline" />
            <div className="hero-arch journey-window">
              {scenes.map((scene, index) => (
                <div
                  key={scene.src}
                  className={`journey-scene journey-scene-${index}`}
                  aria-hidden={activeScene !== index}
                >
                  <Image
                    src={scene.src}
                    alt={scene.alt}
                    fill
                    sizes="(max-width:650px) 85vw, 46vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    className="journey-photo"
                  />
                </div>
              ))}
              <svg
                className="journey-portal"
                viewBox="0 0 500 600"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M7 600V252a243 243 0 0 1 486 0v348M27 600V252a223 223 0 0 1 446 0v348"
                  stroke="#f2e6ce"
                  strokeWidth="2"
                />
                <path
                  d="M5 258h28m434 0h29M6 244h28m433 0h29M18 172l23 9m16-82 17 16m48-73 10 22m66-53 4 24m72-24-3 24m70 8-10 23m64 31-17 20m46 52-22 10"
                  stroke="#f2e6ce"
                  strokeWidth="2"
                />
              </svg>
              <div className="journey-vignette" />
            </div>
            <div className="hero-seal">
              <span>ROOTED IN TEA</span>
              <BrandEmblem />
              <span>MADE FOR YOU</span>
            </div>
            <p className="image-note">{scenes[activeScene].caption}</p>
            <Botanical className="hero-botanical" />
          </div>
          <span className="hero-side-note">
            EUROPEAN SOUL · BENGAL AT HEART
          </span>
        </div>
        <div className="journey-progress" aria-hidden="true">
          <span />
        </div>
        <Link href="#welcome" className="journey-skip">
          Step into the café <Arrow />
        </Link>
      </div>
    </section>
  );
}
