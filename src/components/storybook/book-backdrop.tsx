import { InkStudy } from "@/components/heritage-sketch";
import { TeaBranch } from "./book-illustrations";
import styles from "./storybook.module.css";

/** Decorative ink in the margins of the Alps / Himalayas edition. */
export default function BookBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true" inert>
      <InkStudy kind="paris" className={styles.backdropParis} />
      <InkStudy kind="rome" className={styles.backdropRome} />
      <InkStudy kind="hills" className={styles.backdropHills} />
      <TeaBranch className={styles.backdropBranchLeft} />
      <TeaBranch className={styles.backdropBranchRight} />
      <svg
        className={styles.backdropTrail}
        viewBox="0 0 1440 960"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M-60 530C160 625 180 315 65 260S-8 104 204 130M1260 52c-144 51-122 231 12 269s261 196 118 302-68 240 89 285" />
      </svg>
      {[0, 1, 2].map((leaf) => (
        <svg
          key={leaf}
          data-leaf={leaf}
          className={styles.backdropLeaf}
          viewBox="0 0 48 80"
          fill="none"
        >
          <path d="M9 71C-3 41 12 12 39 6c8 29-3 54-30 65Zm0 0L35 14M17 51l-4-17m11 2 12-10M13 62l15-5" />
        </svg>
      ))}
      {[0, 1, 2].map((spark) => (
        <svg
          key={spark}
          data-spark={spark}
          className={styles.backdropSpark}
          viewBox="0 0 28 28"
          fill="none"
        >
          <path d="M14 2c0 9-3 12-12 12 9 0 12 3 12 12 0-9 3-12 12-12-9 0-12-3-12-12Z" />
        </svg>
      ))}
    </div>
  );
}
