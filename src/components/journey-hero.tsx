"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/illustrations";
import { useContent } from "@/components/demo-content";

const chapters = [
  "A Roman daydream",
  "A little mountain mist",
  "Above the clouds",
  "A warm welcome",
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

function Landscape({ kind }: { kind: "rome" | "hills" | "cafe" }) {
  return (
    <svg
      className={`journey-drawing drawing-${kind}`}
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "rome" ? (
          <>
            <path d="M-40 850V390L380 270V850M0 405L380 293M0 448L380 338M0 625L380 552M0 651L380 579M0 820L380 790M380 270L465 312V850M380 338L465 373M380 552L465 574M380 579L465 600" />
            {Array.from({ length: 7 }, (_, i) => {
              const x = 10 + i * 51;
              return (
                <g key={i}>
                  <path
                    d={`M${x} 590V${440 - i * 15}q18 -52 36 -10v${145 + i * 2}M${x} 787V${689 - i * 10}q18 -48 36 -8v${110 + i * 2}`}
                  />
                  <path d={`M${x - 5} 420v180m0 68v125`} />
                </g>
              );
            })}
            <path d="M1010 900V360h380v540M990 360h420l-210-95zM1030 330h340M1025 380h350M1040 410h320M1030 760h340M1000 790h400M980 820h440M960 850h480" />
            {[1045, 1110, 1250, 1315].map((x) => (
              <g key={x}>
                <path d={`M${x} 420v330m20-330v330m-27-330h34m-34 330h34`} />
              </g>
            ))}
            <path d="M1155 750V500q45-70 90 0v250M450 900V370C450 8 990 8 990 370V900M477 900V370C477 45 963 45 963 370V900M505 900V370C505 83 935 83 935 370V900M450 378h55m430 0h55M470 247l52 17m-2-131 41 35m52-106 25 45m88-73v48m93-22-24 44m100 31-38 35m89 73-51 19" />
            <path
              d="M0 866Q350 810 505 865M935 865q250-42 505 5M580 900l105-400m175 400L755 500"
              opacity=".35"
            />
          </>
        ) : kind === "hills" ? (
          <>
            <path d="M-60 510L140 300l110 98 170-190 140 130 150-192 160 190 110-84 220 240 130-55 180 120M140 300l25 103 85-5m170-190-35 152 70-32 105 10m150-192-45 167 70-42 135 65" />
            <path d="M-100 630Q170 320 460 570T1030 530T1540 600M-50 730Q240 460 550 660T1100 650T1500 660M-30 850Q300 590 650 790T1500 750" />
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M-50 ${680 + i * 26}Q220 ${430 + i * 35} 530 ${650 + i * 27}T1490 ${640 + i * 28}`}
                opacity={0.8 - i * 0.06}
              />
            ))}
            <path d="M1070 530v-90m-40 45 40-70 43 70m-35 45v-82M240 580v-90m-35 48 35-77 38 77" />
          </>
        ) : (
          <>
            <path d="M160 900V200h1120v700M140 200h1160M200 225h1040v85H200zM220 900V410q100-160 200 0v490M1020 900V410q100-160 200 0v490M490 900V420q230-300 460 0v480M510 900V425q210-260 420 0v475M220 590h200m-100-290v600m700-310h200m-100-290v600" />
            <path d="M140 315h1160l50 100H90zM100 415q35 40 70 0 35 40 70 0 35 40 70 0 35 40 70 0m580 0q35 40 70 0 35 40 70 0 35 40 70 0 35 40 70 0" />
            <path d="M510 790h420m-380 0-20 110m360-110 20 110M645 756h120v-52H645zm120-45q55-8 27 34h-27M670 680q-20-25 0-45m40 45q-20-25 0-45m40 45q-20-25 0-45M100 900l20-130h70l20 130m-60-130v-150m0 80q-85-50-60-100 70 10 60 100m0-40q70-70 80-15-30 50-80 45" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function JourneyHero({
  paused,
  onPause,
}: {
  paused: boolean;
  onPause: (value: boolean) => void;
}) {
  const { pages } = useContent();
  const copy = pages.home;
  const section = useRef<HTMLElement>(null);
  const [chapter, setChapter] = useState(0);
  const [complete, setComplete] = useState(false);
  const still = paused;
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const p =
        still || media.matches
          ? 1
          : clamp(
              -el.getBoundingClientRect().top /
                Math.max(1, el.offsetHeight - innerHeight),
            );
      const hills = smooth((p - 0.15) / 0.18),
        clouds = smooth((p - 0.48) / 0.16),
        home = smooth((p - 0.69) / 0.18);
      el.style.setProperty("--rome", String(1 - hills));
      el.style.setProperty("--zoom", String(1 + p * 2.6));
      el.style.setProperty("--hills", String(hills * (1 - home)));
      el.style.setProperty(
        "--hill-scale",
        String(1 + clamp((p - 0.25) / 0.5) * 0.35),
      );
      el.style.setProperty("--cloud", String(clouds * (1 - home)));
      el.style.setProperty("--home", String(home));
      el.style.setProperty("--progress", `${p * 100}%`);
      setComplete(p >= 0.999);
      setChapter(p < 0.28 ? 0 : p < 0.55 ? 1 : p < 0.78 ? 2 : 3);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    update();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, [still]);
  return (
    <section
      ref={section}
      className="journey-section"
      data-still={still}
      data-complete={complete}
      aria-label="From a Roman daydream to a Himalayan cup of soul"
    >
      <div className="journey-sticky">
        <div className="journey-paper" />
        <Landscape kind="hills" />
        <Landscape kind="rome" />
        <div className="journey-clouds" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <Landscape kind="cafe" />
        <div className="journey-home-copy" inert={!complete} aria-hidden={!complete}>
          <p className="journey-kicker">{copy.eyebrow}</p>
          <h1 className="journey-opening">
            {copy.title}
            <br />
            <em>{copy.accent}</em>
          </h1>
          <p className="journey-description">{copy.description}</p>
          <div className="journey-actions">
            <Link href="/the-house" className="button button-green">
              Explore the House <Arrow />
            </Link>
            <Link href="/gatherings" className="journey-secondary">
              See What’s On <Arrow />
            </Link>
          </div>
        </div>
        <div className="journey-footer">
          <span className="journey-chapter">
            0{chapter + 1} <span>/</span> {chapters[chapter]}
          </span>
          <a className="journey-scroll" href="#welcome">
            SCROLL TO WANDER ↓
          </a>
          <button
            onClick={() => {
              const top = section.current
                ? section.current.getBoundingClientRect().top + window.scrollY
                : 0;
              onPause(!still);
              requestAnimationFrame(() =>
                window.scrollTo({ top, behavior: "instant" }),
              );
            }}
          >
            {still ? "Replay journey" : "View without motion ↗"}
          </button>
        </div>
        <div className="journey-progress">
          <span />
        </div>
      </div>
    </section>
  );
}
