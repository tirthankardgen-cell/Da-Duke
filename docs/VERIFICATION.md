# Verification

Verified locally on **5 November 2026 (Asia/Kolkata)** using **Node 22.23.4**, the Next.js production build and Google Chrome through Playwright CLI. This covers the brief update and frontend CMS demo, not a production backend or live hosting deployment.

## Build and routes

- `npm run lint` passed.
- `npm test` passed all **9 domain tests**.
- `npm run build` passed, including Next.js compilation and TypeScript checks.
- `npm run typecheck` passed.
- `git diff --check` passed.
- The public pages, CMS sign-in and browser-local event fallback load directly. An unknown ordinary route returns HTTP 404 with the branded not-found page.
- The four original URLs return HTTP **308**: `/our-story` to `/the-house`, `/menu` to `/the-table`, `/the-space` to `/gallery`, and `/visit` to `/visit-us`.
- `robots.txt` disallows crawling of the demo. `sitemap.xml` lists nine public page URLs and excludes admin, preview and local event records. Its origin uses Vercel's deployment environment when available, with `http://localhost:3000` as the local fallback.

The domain tests cover event start/end boundaries, draft and invalid-date exclusion, chronological selection, unique slugs, WhatsApp URL/message encoding, the date boundary in India, enquiry-field validation, allowed URL protocols, and cancelled/postponed event grouping.

## Browser and accessibility checks

The public-route matrix covered **48 route/viewport combinations**: `/`, `/the-house`, `/the-table`, `/gatherings`, `/private-affairs`, `/visit-us`, `/gallery`, `/privacy`, `/terms`, the branded 404, a missing browser-local event, and CMS sign-in, each at **320, 390, 768 and 1440 pixels wide**.

The signed-in CMS matrix covered **24 view/viewport combinations**: overview, pages, gatherings, menu, media and settings at the same four widths. Checks included document overflow, JavaScript page errors, visible image loading, primary headings where applicable, and axe-core WCAG A/AA rules through WCAG 2.2.

These passes exposed muted-text contrast issues and hidden file inputs causing media-editor overflow. Both were corrected. A **16-combination targeted production recheck** of affected pages and CMS views then reported zero issues. No JavaScript page errors or broken visible images remained in the checked flows.

Desktop and phone screenshots were visually reviewed, including all three illustrated hero chapters, inner-page scenery and the CMS. The final build includes a soft ivory overlay behind hero text to keep drawings from competing with headings; fresh screenshots were captured after restarting that build.

Automated checks supplement manual review and do not constitute a complete accessibility certification. Firefox, Safari, physical iOS/Android devices, screen readers and real-user Core Web Vitals were not tested in this pass.

## Public interaction checks

- All three scroll-journey scenes appear at the intended positions. The still-view control removes the extended scroll sequence and stops decorative animation. Emulated system reduced motion also removes extra scrolling and running animation.
- Mobile navigation changes routes, closes after selection, supports Escape and restores focus to its toggle. There is no Home navigation item.
- Menu category filtering updates visible selections and can restore all selections.
- Gallery images open in a dialog, advance with arrow keys and close with Escape; focus returns to the originating image. The open dialog passed axe checks.
- The enquiry composer rejects past dates. With no configured number, its dialog previews the message without claiming that anything was sent or reserved; the dialog passed axe checks.
- With a configured demonstration number, WhatsApp URLs contain the validated international number and correctly encoded message. No messages were sent during QA. Private enquiry fields were not persisted to browser storage.

## CMS workflow checks

- The displayed demo credentials open the studio. The interface clearly explains that this is a browser-only sign-in demonstration.
- Text changes can be saved as drafts and previewed separately. Publishing updates the public site, including another tab on the same origin. Drafts do not change the published view until publication.
- Homepage section visibility and edited menu prices/selections appear in the corresponding public views after publishing.
- Local image upload, required alt text, captions, gallery collection and crop focus work. Image replacement was published and verified on The House page against the production build.
- Event creation rejects an end before the start. A valid fixture can be published, opened at its detail URL and displayed in India time; cancellation and archive states were also exercised.
- WhatsApp settings reject invalid numbers and allow a valid encoded link preview.
- Test fixture events, image replacements and content changes were reset to the initial concept before final screenshots. They were confined to the QA browser and are not seeded repository content.

## Demo boundaries and handover

There is **no backend, database, secure authentication, role enforcement, shared upload storage or remote analytics service**. Drafts, published content and resized uploads live in this browser's localStorage. The publicly shown login credentials and browser-only publishing demonstrate the workflow; they do not protect real business data.

Statistics use actual local aggregate page and CTA activity. They do not represent the full site's audience or confirmed WhatsApp messages/bookings. New browsers start with empty counts. The overview screenshot contains activity generated while exercising this demo.

Saved content is scoped to the browser and origin. Event URLs therefore do not share records with another browser/device, and server-rendered metadata does not reflect browser-only edits. A missing `/gatherings/[slug]` renders an explanatory fallback with HTTP 200 because only the browser can determine whether that local record exists. The whole demo is `noindex`.

The initial event collection and unconfirmed contact details remain empty. Menu selections and licensed concept photography are labelled appropriately. No operational prices, dates, address, hours, capacity or sourcing claims have been invented. The enquiry composer has no reservation, checkout or payment flow.

Before clearing storage, export the draft and its images as JSON from House settings. The demo reset restores the original content; it does not change repository files. A real launch needs approved business content and separately scoped authentication, persistence, asset storage, analytics and publishing services.

GitHub Actions runs lint, the domain tests, the production build and type checks on Node 22. Local checks and a Git push alone do not prove a live Vercel deployment.

## Captures

Selected compressed previews are committed in `docs/preview/`:

- [Illustrated landing page](preview/brief-home.webp)
- [The House with background illustrations](preview/brief-house.webp)
- [Mobile landing page](preview/brief-mobile.webp)
- [CMS overview with local activity](preview/brief-cms.webp)

Full browser captures and QA scripts remain locally in ignored `output/playwright/` and `.playwright-cli/`.
