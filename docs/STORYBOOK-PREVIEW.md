# Alps meet Himalayas — storybook preview

Preview branch: `codex/preview-alps-himalayas-book`.

The homepage is now an open book inspired by the user-supplied [Biryani Legends / photos template](https://21stdev-my-components-one.vercel.app/#biryani-legends-template/photos). It tells the Da Duke and Chai story through the Alps, the Himalayas, Assam and North Bengal, with a forest-green binding, textured paper, botanical linework and locally served typography.

![The open storybook](preview/storybook-desktop.webp)

## What is included

- Contents and title page, followed by five two-page chapters: The Alps, The Himalayas, At the table, The House, and Stay a little.
- CSS 3D page turns, contents links, chapter buttons, previous/next controls, keyboard navigation, mouse-wheel navigation and horizontal touch swipes.
- Shareable chapter URLs such as `/#himalayas`, with browser back/forward support and focus restoration after leaving the contents page.
- Readable stacked pages on phones and tablets, with persistent navigation controls. Long edited stories can scroll inside desktop pages; opening another chapter resets the page's scroll position.
- System reduced-motion support and a separate **Still pages** control.
- Links to the complete menu, gatherings, journal, house, visit and private-enquiry experiences.
- Editable cover, dedication, Alps/Himalayas text and images in **Pages & stories**, plus chapter order and visibility. Remaining chapters use existing shared copy and featured, available menu items.
- Migration of older browser-local drafts and publications without discarding their existing page edits.
- GitHub Actions checks on `codex/preview-*` pushes.

## Verification

Verified on **5 November 2026**, using **Node 22.23.4**, Next.js 16.4.5 and Google Chrome through Playwright CLI.

- `npm run lint`, all **9 existing domain tests**, `npm run build`, `npm run typecheck`, and `git diff --check` pass.
- Browser checks cover all six spreads at **1440 × 1000** and **390 × 844**, plus the contents at **320 × 740**, **768 × 1024** and **1280 × 720**. The four affected layouts were checked again after fixing tablet overflow and page-content overflow.
- Axe checks for WCAG A/AA rules through WCAG 2.2 report no violations in the checked book layouts or the content editor at desktop and mobile widths. No JavaScript page errors or broken book images were found.
- Contents navigation, keyboard arrows, wheel turns, horizontal touch events, first/last boundaries, chapter deep links, browser history, reduced motion and focus restoration were exercised.
- **20 production HTTP routes** were checked. Public pages, CMS and draft preview return 200; the four legacy routes retain their 308 redirects; a missing ordinary page returns the branded 404.
- CMS checks confirm headline validation, saved-draft isolation, the actual preview button, image selection, publication into another open tab, chapter order/visibility after reload, and preservation of existing edits when loading an older content snapshot.
- Long-copy checks confirm that the text remains reachable, reading it does not accidentally turn the chapter, and the next chapter starts at the top. Temporary CMS fixtures were removed from the QA browser after verification.

Full screenshots, downloaded reference material and browser QA scripts are kept in ignored `output/`. Selected compressed screenshots are committed under `docs/preview/`.

![The Himalayan chapter](preview/storybook-himalayas.webp)

## Scope

This is the existing frontend/CMS demonstration on a separate preview branch. Browser-local content, demonstration sign-in, concept menu notices, photography disclosures and unconfirmed business details retain their existing boundaries. There is no new booking, payment or backend service.

The photographs retain their existing licences; the new line drawings and paper treatment are original. See [references](REFERENCES.md) for provenance. Chrome viewport and touch-event checks do not substitute for physical-device, Safari, Firefox or screen-reader testing.
