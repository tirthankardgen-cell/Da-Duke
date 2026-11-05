# Alps meet Himalayas — storybook preview

Preview branch: `codex/preview-alps-himalayas-book`. [Open the Vercel preview](https://da-duke-git-codex-preview-alps-himalayas-book-tirthankar-s.vercel.app).

The homepage is an illustrated book inspired by the user-supplied [Biryani Legends / photos template](https://21stdev-my-components-one.vercel.app/#biryani-legends-template/photos). It tells the Da Duke and Chai story through the Alps, the Himalayas, Assam and North Bengal, with a forest-green binding, textured paper, botanical linework and locally served typography.

![The cover before the book opens](preview/storybook-cover.webp)

![The open storybook](preview/storybook-desktop.webp)

## What is included

- A closed forest-green cover waits for the visitor to select **Open the book**, use the forward arrow, or choose a chapter. Its inside carries the left page while turning, so no flat left page or binding appears prematurely. The contents/title spread and five chapters follow: The Alps, The Himalayas, At the table, The House, and Stay a little. Draft preview opens directly for editing.
- Two facing pages on desktop, phones and tablets, including landscape orientation. The compact book keeps short introductions, photographs and menu highlights, with **Read chapter** immediately below it or beside it in short landscape windows.
- A full chapter reader with comfortable prose, all CMS paragraphs, captions, disclosures and links. The native dialog supports internal scrolling, keyboard reading, Escape, backdrop dismissal, and **Back to book** with focus returned to the reading button.
- A single viewport for the cover, book, navigation and footer. Compact pages do not scroll. Longer reading happens inside the reader; unusually long desktop CMS copy retains keyboard-accessible page overflow.
- CSS 3D opening and page turns on every screen size, contents links, chapter buttons, previous/next controls, keyboard navigation, mouse-wheel navigation and horizontal touch swipes.
- Shareable chapter URLs such as `/#himalayas`, with browser back/forward support. Older `/#himalayas/right` links now open the complete spread.
- System reduced-motion support and a separate **Still pages** control. Both preserve the visitor's choice of when to open the cover.
- **View menu** in the mobile/tablet header, available before opening the book, plus links to the complete menu, gatherings, journal, house, visit and private-enquiry experiences.
- Editable cover, dedication, Alps/Himalayas text and images in **Pages & stories**, plus chapter order and visibility. Remaining chapters use existing shared copy and featured, available menu items.
- Migration of older browser-local drafts and publications without discarding their existing page edits.
- GitHub Actions checks on `codex/preview-*` pushes.

![Both pages together on a phone](preview/storybook-mobile.webp)

![The complete chapter at a comfortable reading size](preview/storybook-reader.webp)

![The two-page tablet layout](preview/storybook-tablet.webp)

## Verification

Verified on **5 November 2026**, using **Node 22.23.4**, Next.js 16.4.5 and Google Chrome through Playwright CLI, against the final production build.

- `npm run lint`, all **9 existing domain tests**, `npm run build`, `npm run typecheck`, and `git diff --check` pass.
- **44 interaction checks** cover manual opening, the moving inside cover, phone page-turn animation, native Chrome touch swipes, keyboard/wheel turns, first/last boundaries, browser history, legacy chapter links, resizing, reduced motion, the full reader, and the mobile menu link.
- **78 spread-layout checks**, **13 cover-layout checks**, and **6 full-reader checks** pass. Every chapter shows both facing pages without document scrolling, clipped default copy or broken images. Covered viewports: **320 × 568**, **320 × 740**, **390 × 600**, **390 × 844**, **600 × 1024**, **768 × 1024**, **1024 × 768**, **1100 × 768**, **1101 × 768**, **568 × 320**, **844 × 390**, **1440 × 900**, and **1280 × 633**. The two adjacent widths check the compact/desktop breakpoint.
- The cover remains closed until activated. Frame samples at phone, tablet and desktop widths confirm **closed → opening → open**, with the stationary left page hidden throughout the turn and the contents printed on the moving inside cover.
- Reader checks confirm complete chapter content, prose of at least **17px**, internal keyboard/wheel scrolling, isolation from background page turns, Escape/backdrop dismissal, restored focus, contents navigation and scroll reset on reopening.
- **12 CMS checks** confirm that a fifteen-paragraph draft remains fully reachable in phone and tablet readers, does not change the published copy, preserves desktop keyboard overflow, and retains the draft URL when turning chapters. Temporary fixtures were restored after the checks.
- Axe reports **no WCAG A/AA violations through WCAG 2.2** in ten checked states: the phone cover, three compact book spreads, five full-reader chapters, and desktop contents.
- Photographs and headings record **zero idle size or position changes** across phone, tablet and the shorter desktop viewport. A stable desktop scrollbar gutter keeps overflow measurements independent of the page width.
- No JavaScript page errors or broken book images were found. Existing supporting-route and broader CMS verification is recorded in [the previous verification notes](VERIFICATION.md).

Full screenshots, downloaded reference material and browser QA scripts are kept in ignored `output/`. Selected compressed screenshots from the production build are committed under `docs/preview/`.

![The Himalayan chapter](preview/storybook-himalayas.webp)

## Scope

This is the existing frontend/CMS demonstration on a separate preview branch. Browser-local content, demonstration sign-in, concept menu notices, photography disclosures and unconfirmed business details retain their existing boundaries. There is no new booking, payment or backend service. The Vercel preview retains the project's sign-in protection.

The photographs retain their existing licences; the line drawings and paper treatment are original. See [references](REFERENCES.md) for provenance. Chrome viewport and touch checks do not substitute for physical-device, Safari, Firefox or screen-reader testing.
