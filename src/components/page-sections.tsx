import HeritageSketch from "@/components/heritage-sketch";
import Image from "next/image";
import Link from "next/link";
import {
  ArchDrawing,
  Arrow,
  Botanical,
  TeaCup,
} from "@/components/illustrations";
import { menu, menuCategories } from "@/lib/menu";

export type CafePage = "home" | "story" | "menu" | "space" | "visit";

const intros = {
  story: {
    label: "Our story",
    eyebrow: "FARAWAY INSPIRATIONS. FAMILIAR FEELINGS.",
    first: "A little heritage.",
    second: "A feeling of home.",
    description:
      "The charm of a European café, the soul of our tea gardens, and a place to bring them together.",
  },
  menu: {
    label: "The menu",
    eyebrow: "FOR THE FIRST SIP & THE LAST CRUMB",
    first: "Good things.",
    second: "Served slowly.",
    description:
      "From a proper cup of Assam chai to a buttery little escape. Find something that feels like you.",
  },
  space: {
    label: "The space",
    eyebrow: "STEP INSIDE THE FEELING",
    first: "Room to breathe.",
    second: "Reasons to stay.",
    description:
      "A daydream in warm wood, soft light and quiet arches. Take a look around our inspiration.",
  },
  visit: {
    label: "Visit us",
    eyebrow: "AN INVITATION TO SLOW DOWN",
    first: "Save a little time.",
    second: "For yourself.",
    description:
      "Good company is all you need to bring. Imagine your next afternoon at Da Duke and Chai.",
  },
};

export function PageIntro({ page }: { page: Exclude<CafePage, "home"> }) {
  const intro = intros[page];
  return (
    <section className="page-intro shell" aria-labelledby="page-title">
      <HeritageSketch kind={page === "menu" || page === "story" ? "hills" : "arches"} />
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{intro.label}</span>
      </nav>
      <p className="eyebrow">{intro.eyebrow}</p>
      <h1 id="page-title">
        {intro.first}
        <br />
        <em>{intro.second}</em>
      </h1>
      <p className="page-intro-description">{intro.description}</p>
      <Botanical className="intro-botanical" />
    </section>
  );
}

export function StoryDetails() {
  return (
    <>
      <section
        className="story-values shell"
        aria-label="The little things we believe in"
      >
        <article>
          <TeaCup />
          <span className="eyebrow">01 / THE TEA</span>
          <h3>A sense of belonging.</h3>
          <p>
            Bold Assam chai. Delicate Darjeeling leaves. Familiar flavours that
            connect every cup to the places we love.
          </p>
        </article>
        <article>
          <ArchDrawing />
          <span className="eyebrow">02 / THE TABLE</span>
          <h3>Two worlds, together.</h3>
          <p>
            European café traditions meet the generous spirit of Bengali adda. A
            croissant with your chai? You’re in the right place.
          </p>
        </article>
        <article>
          <Botanical />
          <span className="eyebrow">03 / THE TIME</span>
          <h3>A moment, unhurried.</h3>
          <p>
            For catching up, getting lost in a book, or simply looking out of
            the window. There is pleasure in a little pause.
          </p>
        </article>
      </section>
      <section className="brand-story">
        <div className="shell brand-story-inner">
          <div className="original-logo">
            <Image
              src="/images/original-emblem.webp"
              alt="The original Da Duke and Chai emblem: a brass tea cup and laurel wreath on dark wood"
              fill
              sizes="(max-width:650px) 75vw, 340px"
            />
          </div>
          <div>
            <p className="eyebrow">ROOTED IN A SIMPLE RITUAL</p>
            <h2>
              A warm cup.
              <br />
              <em>A familiar feeling.</em>
            </h2>
            <p>
              Our original emblem brings together a tea cup, a wreath of leaves,
              and the warmth of wood and brass. A small reminder of everything
              Da Duke stands for: a little ceremony, a lot of comfort, and a
              welcome that stays with you.
            </p>
            <Link className="text-link" href="/menu">
              Meet your next favourite <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function FullMenu() {
  return (
    <section
      id="full-menu"
      className="paper-menu shell section-spacing"
      aria-labelledby="full-menu-title"
    >
      <div className="paper-menu-heading">
        <TeaCup />
        <p className="eyebrow">THE WHOLE LITTLE COLLECTION</p>
        <h2 id="full-menu-title">
          For every <em>kind of afternoon.</em>
        </h2>
        <p>Our illustrative menu. All prices are in Indian rupees.</p>
      </div>
      <div className="paper-menu-grid">
        {menuCategories.map((group) => (
          <section className="full-menu-group" key={group}>
            <h3>{group}</h3>
            {menu
              .filter((item) => item.category === group)
              .map((item) => (
                <div className="full-menu-item" key={item.name}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <span>₹{item.price}</span>
                </div>
              ))}
          </section>
        ))}
      </div>
      <p className="menu-dietary-note">
        Sample dishes & prices. Please check final availability, ingredients and
        allergens with the café before ordering.
      </p>
      <Link href="/visit" className="button button-green">
        Make a little time for us <Arrow />
      </Link>
    </section>
  );
}

export function SpaceDetails() {
  return (
    <section className="space-details">
      <div className="shell">
        <div className="space-details-heading">
          <p className="eyebrow">THE DETAILS MAKE THE DIFFERENCE</p>
          <h2>
            A softer <em>sort of everyday.</em>
          </h2>
        </div>
        <div className="space-detail-grid">
          <article>
            <span>01</span>
            <h3>Arches & afternoon light</h3>
            <p>
              Classical curves, quiet corners, and the kind of light that asks
              you to put your phone away for a moment.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Cane, wood & warm brass</h3>
            <p>
              A palette borrowed from tea bungalows and old cafés. Natural
              textures, softened by time and a little greenery.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>A table for your kind of day</h3>
            <p>
              A book for one. A conversation for two. Or the whole afternoon
              with your favourite people.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
