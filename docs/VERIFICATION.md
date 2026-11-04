# Verification

Verified locally on 4 November 2026 against the production build, using Node 22.23.4 and Google Chrome through Playwright CLI.

## Build and routes

- Clean `npm ci` completed successfully with Node 22.
- `npm run lint` passed with no errors or warnings.
- `npm run build` passed; all five pages are statically prerendered by Next.js.
- `npm run typecheck` passed.
- `/`, `/our-story`, `/menu`, `/the-space`, and `/visit` all returned HTTP 200 when opened directly.
- Every page has its own title and exactly one primary heading. All visible desktop image assets loaded successfully.

## Browser and accessibility checks

The final pass covered all five pages at **320, 390, 768, and 1440 pixels wide**: 20 page/viewport combinations. After finite entrance animations settled, there were:

- No horizontal document overflow.
- No JavaScript page errors.
- No violations reported by axe-core 4.10.3.

Automated checks supplement visual review; they are not a comprehensive accessibility certification. Full desktop pages, phone layouts and all three hero scenes were visually reviewed. The final pass includes fixes for muted-text contrast, a botanical illustration extending one pixel past the tablet viewport, and an unnecessarily nested complementary landmark.

## Interaction checks

- The hero scene buttons scroll to Italy, the Himalayas and the café; the photograph, arch transformation, caption and progress indication update together.
- The still-view button shows the café and removes the extended scrolling section.
- Emulated `prefers-reduced-motion: reduce` uses a still café image with no sticky sequence or extra scroll distance.
- All three menu categories display the correct three dishes; the complete menu remains available on the Menu page.
- Desktop navigation and the mobile navigation both change routes. Selecting a mobile link closes the navigation.
- The gallery opens, advances with the Right Arrow key, and closes with Escape. Focus returns to the gallery image button. The open gallery also passed axe.
- Empty visit forms are rejected. Past dates are rejected by the date field. A valid first name, future date and party size produce the correct preview.
- The preview explicitly states that no table has been reserved. Both localStorage and sessionStorage remained empty after submission.

## Deployment and sample boundaries

The checked-in configuration uses the Next.js Vercel preset, Node 22, `npm ci`, and `npm run build`. A GitHub Actions workflow runs the build, lint, and type checks. Local verification does not by itself verify a live Vercel deployment.

There is no booking backend, customer account system, live menu feed, map address, or payment flow. The visit form does not transmit or persist personal details. Opening and contact details must be provided before launch as a real business site.

The production dependency audit (`npm audit --omit=dev`) reported **zero vulnerabilities**. The full audit reports 16 moderate findings in the development-only ESLint/minimatch dependency chain. ESLint 9 is retained for compatibility with Next.js’s bundled ESLint plugins; force-upgrading those transitive packages was not applied.

## Captures

Selected compressed previews are committed under `docs/preview/`. Original browser screenshots and research snapshots are retained locally under ignored `output/playwright/` and `.playwright-cli/`.
