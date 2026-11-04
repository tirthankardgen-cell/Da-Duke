# DA DUKE and Chai
## Website Product Requirements & Design Direction

**Document type:** Website brief / Product Requirements Document (PRD) / Implementation guide  
**Project:** Da Duke and Chai — Café + Restaurant  
**Working title:** *A European state of mind. A Himalayan cup of soul.*  
**Status:** Initial full build brief; final content, address, contact information, menu and brand assets supplied by the client  
**Primary goal:** Build a premium, editorial, minimal, dynamic café website with an approachable content-management dashboard.

> **Brand spelling:** **Da Duke and Chai**. Visually emphasize **Da Duke** and treat **and Chai** as smaller, supporting typography. Do not abbreviate the public-facing brand to “D A” or “D U K E” unless a separate approved monogram is supplied.

---

## 1. Project vision

Da Duke and Chai is a café–restaurant imagined where **European old-world elegance** meets the **tea-growing heritage of Assam, Darjeeling and North Bengal**. Its digital identity should evoke an intimate European salon, a literary café, an inherited estate, and a beautifully served cup of chai — without appearing like a generic British pub, a themed amusement café, or a conventional Indian tea shop.

The brand's two complementary halves:

- **DA DUKE:** European-inspired architecture, understated aristocratic charm, art, craftsmanship, dark woods, stone, warm brass, quiet hospitality, editorial elegance.
- **and Chai:** Assam and Darjeeling tea traditions, the mist and slopes of North Bengal, warmth, aroma, origin, storytelling, and unhurried conversation.

The blending should feel **coherent and subtle**: e.g., European arches and portraiture alongside authentic tea leaves, planting landscapes, ceramics, tea service, natural woven materials and local regional craftsmanship. Avoid making unverified historical or sourcing claims, and avoid using traditional motifs as arbitrary decoration.

### Desired feelings

**Refined • Warm • Nostalgic • Intimate • Artistic • Cultural • Unhurried • Modern yet timeless**

### What this website must accomplish

1. Introduce the identity and ambience of the café.
2. Display curated food, beverages, signature chai, and menus (if the client supplies menu information).
3. Feature **dynamic events**, including upcoming, ongoing, and past events.
4. Invite enquiries for birthdays, celebrations and private events through **WhatsApp**, not a real-time booking engine.
5. Display an editable gallery of high-quality photographs.
6. Help visitors find, contact and follow the café.
7. Give authorized staff a simple, secure **admin dashboard** to update text, photos, event details, menu items and basic site settings **without developer help**.
8. Show useful **website statistics** in the admin dashboard.

---

## 2. Audience and brand voice

**Audience:** Café visitors, couples, friend groups, tea lovers, tourists, local culture followers, birthday organizers, private event planners and people seeking a beautiful dining experience.

**Voice:** Poetic but legible; hospitable rather than pretentious. Use short paragraphs and concise editorial lines. Avoid exaggerated luxury clichés ("world's finest," "royal experience") unless substantiated.

### Sample brand copy (editable placeholders)

**Hero eyebrow:** `WHERE TWO WORLDS MEET`  
**Hero headline:** `Old-world elegance. A new ritual of chai.`  
**Hero supporting line:** `European-inspired charm, with the warmth of Assam and the hills of Darjeeling.`  
**Primary CTA:** `Explore the House`  
**Secondary CTA:** `See What's On`

**Story teaser:**
> A little European romance. A little mountain mist. A space for good food, fine tea, and conversations worth staying for.

**Event CTA:** `Join the Gathering`  
**Private enquiry CTA:** `Plan an Occasion`  
**Contact CTA:** `Find Your Way Here`

All actual copy must be editable in the admin system, not hard-coded into components.

---

## 3. Experience, navigation and sitemap

**Important client direction:** The landing page **is** the home page, but **do not show a “Home” navigation item**. Clicking the brand wordmark returns visitors to `/`.

### Recommended primary navigation

| Display label | Route | Purpose |
|---|---|---|
| **The House** | `/the-house` | Brand philosophy, origin of the concept, ambience; an art-directed alternative to “About Us” / “Our Story” |
| **The Table** | `/the-table` | Food, beverages, tea highlights and menu presentation |
| **Gatherings** | `/gatherings` | Current, upcoming and past events, with individual event pages |
| **Private Affairs** | `/private-affairs` | Birthday/private event enquiries and WhatsApp CTA; **not** an online reservation system |
| **The Journal** | `/the-journal` | Optional editorial updates, announcements, café moments and curated stories; can be hidden until content exists |
| **Visit Us** | `/visit-us` | Location, hours, phone, social accounts, directions and contact |

**Wordmark at left:** `Da Duke` (dominant) + `and Chai` (delicate).  
**Header right CTA:** `Enquire on WhatsApp` or `Plan an Occasion`, depending on page.  
**Mobile:** compact logo + hamburger menu; all links fully accessible and easy to tap.

**Secondary routes** (can be accessed via cards/footer rather than navigation):

- `/` — immersive editorial landing page
- `/gatherings/[slug]` — individual event detail pages
- `/the-journal/[slug]` — optional journal article detail pages
- `/gallery` — optional full photo collection accessible from homepage/footer
- `/privacy` — privacy policy
- `/terms` — optional terms/disclaimer page
- `/admin` — protected CMS and analytics interface, **not** displayed in public navigation
- `/404` — branded not-found page

**Navigation rule:** The labels should remain understandable. Favor subtle elegance over obscure naming; all labels and visibility toggles should be configurable by admin where feasible.

---

## 4. Public pages and page-level requirements

### 4.1 Landing page `/`

The landing page should feel like a **small editorial experience**, not a long template filled with cards. It needs an art-directed sequence:

1. **Hero:** Full-bleed image (or optimized short silent ambient video if provided), creamy overlay where needed, ample negative space, oversized serif headline, supporting brand line, and 1–2 quiet calls to action. Responsive treatment must protect readability and image composition.
2. **The brand duality:** A sophisticated split layout: a European-inspired interior/architectural detail balanced with tea fields, tea service or regionally meaningful imagery. A short paragraph ties the concepts together; avoid flag collages or obvious split-cultural clipart.
3. **The House preview:** Warm atmospheric photography with 2–3 lines explaining the philosophy and a link to `/the-house`.
4. **The signature ritual:** Feature two to four curated highlights — e.g., teas, café favourites, signature dishes — drawn from the editable menu/featured content. Use actual client-supplied products; no invented menu items presented as fact.
5. **What's On:** Show up to three upcoming/ongoing events automatically, with date, concise description, image and a link to each event. If no future events exist, show an intentional empty state or admin-configured featured past experience.
6. **Private gatherings prompt:** Cinematic photo, sparse headline, WhatsApp enquiry CTA.
7. **Visual journal / gallery:** Asymmetric masonry/editorial photo arrangement using approved, optimized uploads. Each photo may have an optional caption and alt text.
8. **Visit block:** Address, opening hours, map/directions link, social links and contact info (all editable).
9. **Footer:** Wordmark, short tagline, relevant links, social icons, legal links and copyright.

**Interactions:** Restrained hover transitions, fades, tasteful image crops, subtle scrolling effects. Honor `prefers-reduced-motion`; no heavy loading screens, excessive parallax or aggressive animations.

### 4.2 The House `/the-house`

Rather than calling this “About” or “Our Story,” give it the feel of an editorial chapter.

Suggested structure:
- Introductory visual + headline such as `A place between places.`
- Story of the concept and its two influences: European art/architecture/hospitality and the tea cultures associated with Assam, Darjeeling and North Bengal.
- An image-led section on atmosphere/materials/design.
- A section on the tea ritual (only include verified origins and sourcing information supplied by client).
- A gentle invitation to visit or explore the menu.

Every heading, paragraph, quote, image, image focal point and section visibility should be editable.

### 4.3 The Table `/the-table`

An elegant, easy-to-browse **menu showcase**, not an e-commerce ordering page.

Features:
- Categories can include `Chai & Tea`, `Coffee`, `Small Plates`, `Mains`, `Desserts` — actual categories created by the admin.
- Menu items include name, short description, category, image, optional price, dietary tags, availability and sort order.
- Responsive category navigation or filters; no forced animations.
- Ability to feature select signature items on homepage.
- Optional downloadable PDF menu, managed via admin.
- Clear fallback states when images/prices are unavailable.
- **No online orders, cart, payments or checkout** in initial scope.

### 4.4 Gatherings `/gatherings`

A public event showcase that is genuinely dynamic.

**Event list features:**
- Separate **Upcoming**, **Happening Now** (only if relevant) and **Past Gatherings** sections; do not label past events as upcoming.
- Featured events hero or editorial card, followed by event listings.
- Optional filters by event type: live music, art, tea tasting, literary evening, celebrations, seasonal specials, other.
- Event title, description, cover image, gallery, start/end date and time, venue/location, event type, status, featured flag.
- Human-friendly event date formats in the café's configured time zone (`Asia/Kolkata` by default).
- Detail pages at `/gatherings/[slug]`, with prominent **WhatsApp enquiry** button when enabled.
- Optional `sold out`, `cancelled`, `postponed` states, controlled by admin; events do **not** collect bookings inside the website.
- Automatic sorting, future-to-past archive behavior based on timestamps, while allowing admins to hide cancelled events.
- Search-friendly event pages with metadata and share previews.

**If no upcoming events:** Display an elegant message such as `The next gathering is being prepared.` with a link to social media or a WhatsApp enquiry. Never generate fictional events.

### 4.5 Private Affairs `/private-affairs`

A dedicated **enquiry page**, not a reservation or booking backend.

Use refined language such as:
> Birthdays, intimate celebrations, and evenings worth remembering.

Contents:
- Atmospheric hero and short introduction.
- Occasion types: birthday, anniversary, small private gathering, team/corporate evening, other (all editable).
- Editable capacity/venue details only if provided by owner; do not invent availability or prices.
- Image gallery of the venue and prior celebrations with permission.
- A prominent **`Enquire on WhatsApp`** button.
- Optional lightweight enquiry composer that helps visitors select occasion, preferred date, approximate guests and notes **only to compose a WhatsApp message**. The website **must not** store, confirm or process a reservation.
- Disclaimer under CTA: `Enquiries are subject to confirmation by our team.`

**WhatsApp behavior:**
- Open `https://wa.me/<E164_NUMBER>?text=<URL_ENCODED_MESSAGE>` using the phone number configured by admin (country code and digits, no `+`, spaces or punctuation in the URL).
- Example *message text* (not a prefilled business number):
  `Hello Da Duke and Chai! I'd like to enquire about a birthday gathering on [date] for around [guests] guests. Please share the details.`
- On mobile: open WhatsApp where available; on desktop: use WhatsApp Web / normal WhatsApp link behavior.
- Do not claim the enquiry has been received or confirmed just because WhatsApp opened. The user must send the message in WhatsApp.
- Clicking the CTA may count as an **enquiry click** for site analytics; it is **not** a confirmed lead or completed booking.

### 4.6 The Journal `/the-journal` (optional, configurable)

A compact blog/announcements feature, visually consistent with the brand:
- Post image, title, excerpt, publication date, status and article body.
- Topics: café updates, seasonal menus, cultural stories, artists, events and guest moments.
- Rich-text editing, preview and draft/publish flow.
- Ability to disable the page and navigation label entirely if not used.

### 4.7 Visit Us `/visit-us`

- Café name and verified address, written directions, clickable map link, optional embedded map only if accepted for performance/privacy.
- Day-by-day opening hours, special-hours overrides, phone, WhatsApp, email if supplied, Instagram and other social links.
- A `Get Directions` link (external maps service) and `Chat on WhatsApp` CTA.
- Optional FAQ with carefully approved answers.
- Business/restaurant structured data once verified.

### 4.8 Gallery `/gallery` (optional full gallery page)

- Admin-curated collections: Interiors, Tea & Table, Events, Details, etc.
- Grid with elegant spacing, image preview/lightbox, captions and alt text.
- Respect photographers' rights and guest consent.

---

## 5. Visual identity and UI design system

### 5.1 Art direction

Think **quiet European luxury meets tea-estate warmth**. Mix architectural structure with organic accents. Keep layouts crisp, confident and generous with whitespace.

**Reference qualities:** historical European café interiors, archival editorial photography, tasteful serif magazine typography, natural woods, aged paper, tea gardens, handcrafted ceramics, muted botanical palettes.

**Avoid:** gold gradients, ornate crowns, heavy coats of arms, excessive crests, fake vintage textures, cliched teacup logos everywhere, high-saturation greens, loud UI cards, cluttered layout, hard shadows, giant decorative icons, neon colours, stereotyped cultural imagery, and performative aristocratic references.

### 5.2 Suggested palette (initial concepts; editable design tokens)

| Role | Color | Hex |
|---|---|---|
| Antique ivory | Background / light areas | `#F3EEE4` |
| Warm parchment | Subtle section contrast | `#E5DDCF` |
| Deep forest | Primary brand dark | `#273A31` |
| Espresso ink | Headlines / text | `#25231F` |
| Antique brass | Tiny accents / fine rules | `#A18459` |
| Muted tea leaf | Secondary accents | `#7E8A6D` |

Colors should maintain accessible contrast, especially for body text and CTA labels. Brass is decorative; not the primary body-text color on light backgrounds.

### 5.3 Typography

- **Display / wordmark:** high-character editorial serif (e.g. Cormorant Garamond, EB Garamond, or a licensed refined serif). Evaluate legibility and letter spacing before finalizing.
- **Body / navigation:** elegant modern sans-serif (e.g. Manrope, DM Sans, or another licensed/hosted equivalent).
- Use a clear type scale; 1–2 font families maximum.
- `Da Duke` receives visual priority. `and Chai` is subdued and smaller; remain readable and not an afterthought.
- Use occasional italic serif fragments sparingly for intimacy.

### 5.4 Layout details

- Desktop: wide hero and editorial grid with asymmetric imagery and consistent gutters.
- Mobile first: no tiny text, clipped headings, overflow or hard-to-use nav.
- Use restrained thin rules, framed imagery, soft micro-interactions and meaningful whitespace.
- Buttons: simple outlined or solid deep-forest, crisp corners or small radius; tasteful focus/hover states.
- Footer: strong brand close; not a dense list of generic links.

### 5.5 Brand photography guidelines

- Actual café, food, dishes and event imagery should come from the client.
- For cultural storytelling, use properly licensed, accurate images of the relevant regions and subjects. Do not misrepresent stock photography as the actual café or as its tea suppliers.
- Prioritize warm directional light, natural grain, architectural lines, hands pouring chai, porcelain, tea leaves, hill landscapes, details and candid hospitality.
- Admin can adjust image crop/focal point and add descriptive alt text.

---

## 6. Admin dashboard (`/admin`)

**Admin purpose:** Owners and approved staff must independently update the living website and understand its performance.

### 6.1 Security and access

- Authenticated sign-in, protected admin routes and authenticated APIs.
- Roles: **Owner / Super Admin**, **Editor**, **Viewer (analytics only)**. Owner manages team and site settings; editors manage content but cannot access users/security settings; viewers cannot publish.
- Strong passwords or managed passwordless login, secure sessions, rate limiting, optional/strongly encouraged MFA for privileged accounts.
- Authentication and authorization checked server-side for **every** read/write action; hiding menu items is not security.
- No public admin registration or publicly readable private analytics.
- Maintain audit log of material changes (who changed what and when).

### 6.2 Dashboard landing / overview

Show a simple, polished admin home with:
- Total page views, estimated unique visitors, total sessions (if supported).
- Last 7 days / 30 days / custom period, with comparison to previous period.
- Most visited public pages and top event details.
- WhatsApp enquiry **button clicks** (not confirmed bookings), segmented by page / event if possible.
- Traffic channels / referrers where reliably available.
- Device split (desktop/mobile/tablet) and approximate location/country only if collected lawfully and reliably.
- Quick shortcuts: `Create Event`, `Upload Images`, `Edit Homepage`, `View Site`.
- Recent events, draft content and recent activity.

Explain metric limitations in the UI: e.g., unique visitors are estimates, traffic filtering may be imperfect, some visitors block tracking and CTA clicks do not mean a WhatsApp message was sent.

### 6.3 Content manager (simple CMS)

**Pages & sections:**
- Edit hero headlines, subheadlines, buttons, descriptions, quote blocks, feature section text and gallery captions.
- Reorder supported sections; toggle page sections on/off.
- Preview changes before publishing, save draft, publish and unpublish.
- Edit SEO title, meta description and social share image per page.

**Media library:**
- Upload JPG/PNG/WebP/AVIF images (validate MIME, dimensions and size); optional video with strict storage/performance caps.
- Browser-friendly previews, filenames, alt text, captions, tags and usage locations.
- Automatic optimization and responsive thumbnails.
- Image focal-point selection/crop, reorder and replace.
- Prevent broken images when media is removed; warn when files are in use.

**Events manager:**
- Create, edit, schedule/publish, feature, archive, cancel and delete events.
- Event fields: title, slug, short and full description, poster, photo gallery, category, start/end dates and times, location, status, featured, visibility, optional CTA text and WhatsApp enquiry text override.
- Form validation: end after start, unique slug, valid image and required metadata.
- Events sorted by actual time; scheduled publishing and auto-archive behavior.
- Event detail preview before publication.

**Menu manager:**
- Create/edit categories and items, image, description, optional price and availability; drag-to-reorder and toggle featured.
- PDF menu upload/replace if enabled.

**Journal manager (if enabled):**
- Draft and publish posts, edit rich text and preview articles.

**Site settings:**
- WhatsApp number, enquiry message template, contact details, social URLs, address, opening hours, holidays, SEO defaults, branding assets, legal text, feature toggles and navigation display names.
- Validate WhatsApp number and show a safe preview of the resulting link.
- Admin-only preview of unpublished content.

### 6.4 Audit and reliability

- Soft delete or trash for important content where practical; restore option.
- Publish confirmation for destructive changes.
- Back up database and assets; document recovery procedure.
- Graceful errors and success messages; avoid losing unsaved edits.
- Restrict files by type/size, sanitize rich text and secure storage upload paths.

---

## 7. Dynamic data model (suggested entities)

Use relational data or a well-structured CMS; do not store every event as a hard-coded component.

| Entity | Important fields |
|---|---|
| `profiles` | id, auth_user_id, display_name, role, created_at |
| `pages` | id, slug, title, status, seo_title, seo_description, og_image_id, updated_by, updated_at |
| `page_sections` | id, page_id, section_type, position, visible, content_json, style_variant |
| `media` | id, object_key, public_url or signed_url, mime_type, size, width, height, alt_text, caption, focal_point, created_by |
| `events` | id, title, slug, summary, body, starts_at, ends_at, timezone, venue, category_id, cover_media_id, status, featured, published_at, cta_enabled, cta_template |
| `event_media` | event_id, media_id, position |
| `event_categories` | id, label, slug, position |
| `menu_categories` | id, title, description, position, visible |
| `menu_items` | id, category_id, name, description, price_optional, currency, image_id, featured, available, position |
| `journal_posts` | id, title, slug, excerpt, content, cover_media_id, status, published_at |
| `site_settings` | key, typed_value, updated_at |
| `analytics_events` | id, event_type, page_path, content_id_optional, occurred_at, anonymous_session_key_optional, referrer_group_optional |
| `audit_logs` | id, actor_id, action, entity_type, entity_id, summary, occurred_at |

Implementation notes:
- Use appropriate indexes on `slug`, status, published dates and event dates.
- Use a real time zone and UTC timestamps in storage; display in local café time.
- Store **content** separately from presentation; keep layouts reusable.
- Validate and sanitize rich text on server, and allow safe supported formatting only.
- Store only minimal, consent-appropriate analytics data; do not collect WhatsApp chat contents.

---

## 8. Analytics and privacy

### 8.1 What to track

**Core measures:**
- Page views and trends
- Estimated unique visitors / sessions (subject to chosen provider's definition)
- Top visited pages, top event pages
- Clicks on `Enquire on WhatsApp`, `Get Directions`, Instagram and primary CTAs
- Event page views and CTA click-through rate
- Traffic source/referrer categories when available
- Device group and broad geography where permissible

**Recommended event names:**
- `page_view`
- `whatsapp_enquiry_click` with `source_page`, `event_id` if relevant, `occasion_type` if chosen **but not private message text**
- `event_detail_view`
- `get_directions_click`
- `menu_view`
- `social_link_click`

### 8.2 How to implement analytics

Select **one** primary measurement approach early:

**Option A: privacy-focused analytics provider** (e.g., Plausible or other suitable platform). Use its reporting API where permitted to present metrics within admin. Verify provider limits and credentials before implementation.

**Option B: GA4 + authorized reporting API**, with correctly configured consent/privacy handling and admin dashboard integration. Avoid claiming every visitor is measurable.

**Option C: simple first-party event logging** using a secure ingestion endpoint plus aggregation, with rate limits, bot filtering, retention policies and appropriate consent decisions. This is more custom work and requires operational care.

The chosen implementation must be stated in build documentation. **Do not fabricate dashboard numbers**: show skeleton/empty states until a real source is connected. Do not write identifying personal data to analytics tables unless there is a clear lawful purpose and disclosure.

### 8.3 Privacy/legal requirements

- Publish a privacy policy explaining analytics, hosting and external WhatsApp links.
- Apply applicable Indian data protection/privacy requirements and any other laws relevant to the actual users; obtain legal review as necessary.
- Consent interface for non-essential trackers wherever required; honor consent settings.
- No WhatsApp messages, contact lists, birthdays, phone numbers or guest details stored by the café website during WhatsApp-only enquiries.
- Provide data retention, deletion and access controls proportionate to the analytics provider chosen.

---

## 9. Suggested architecture and technology

A solid default for an independent café website:

**Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS; responsive, accessible, SEO-friendly.  
**UI components:** A small custom component library; optional shadcn/ui primitives in the admin, restyled to the brand.  
**Backend/database/auth/storage:** Supabase (PostgreSQL, Auth, Storage) **or** an equivalent fully managed CMS/backend.  
**Forms:** Admin-only content forms; WhatsApp enquiry composer runs client-side and does not submit a booking.  
**Analytics:** Choose one of the approaches in Section 8.  
**Hosting:** Vercel or suitable managed hosting with CDN, HTTPS and environment variables.  
**Charts:** Lightweight, accessible chart components for the admin.  
**Images:** Next.js image optimization or equivalent responsive image/CDN pipeline.

These are **recommendations**, not fixed client approvals. Prefer maintainability and editor ease over technical novelty.

### Critical engineering guidelines

- Content changes in admin must be reflected on the live website after publication, via appropriate cache invalidation/revalidation.
- Public pages should be prerendered or cached where reasonable; dynamic data should not slow down every visitor.
- Public API queries should expose only published content; use authorization/row-level security to protect drafts, user accounts and internal analytics.
- Use server-side validation and parameterized queries.
- Store secrets only in server environment variables; never expose private API/service keys to the browser.
- No custom credit card handling or payment gateways.
- Deploy staging and production separately where budget permits.
- Provide exportable backups and handover notes.

---

## 10. SEO, speed, accessibility and quality

### Search / sharing

- Unique title/description per public page; editable SEO fields.
- Semantic page structure, correct heading levels and descriptive internal links.
- Open Graph/social sharing images for event details.
- `sitemap.xml`, `robots.txt`, canonical links.
- Restaurant/local business structured data using the café's **verified** location, hours and other facts.
- Descriptive image alt text and modern image compression.
- Avoid indexing drafts, admin pages and non-public content.

### Performance targets

- Aim for Core Web Vitals **LCP ≤ 2.5 s**, **INP ≤ 200 ms**, **CLS ≤ 0.1** at the 75th percentile on real-user data where measurable.
- Responsive, correctly sized images; lazy-load below-the-fold media.
- Host only essential fonts; avoid oversized videos and animation libraries.
- Target a clean, performant mobile experience even on mid-range Android phones and variable mobile data networks.

### Accessibility

- Target WCAG 2.2 AA practices: keyboard navigation, focus indicators, sufficient contrast, useful link/button labels, alt text, form labels, responsive text, reduced-motion mode.
- Clear error states and comfortable touch targets.
- Verify the mobile nav and WhatsApp link with assistive technology and keyboard navigation.

### Browser and device QA

- Current Chrome/Edge/Firefox/Safari, Android Chrome and iOS Safari.
- Small phones, tablets, laptop and wide desktop layouts.
- Empty events, no gallery images, missing menu prices, long text, long titles and bad-network states.

---

## 11. Sample user journeys

### Journey A: Event attendee

`Landing page → What's On → Event detail → Enquire on WhatsApp → Visitor sends message in WhatsApp → Café staff responds manually`

There is **no automatic seat confirmation** anywhere in this flow.

### Journey B: Birthday organiser

`Landing page → Private Affairs → Choose occasion / preferred date / group size (optional) → Enquire on WhatsApp → Visitor sends message → Staff handles the request`

Optional composer data is used to prepare the outgoing WhatsApp text; it is not stored as a booking.

### Journey C: Admin creates an event

`Admin sign-in → Events → New Event → Enter details and upload poster → Preview → Publish → Event appears on Gatherings and, if eligible, homepage → Admin sees event page views / enquiry clicks`

### Journey D: Admin updates a homepage image

`Admin sign-in → Media Library → Upload/choose image → Edit page section → Select focal point + alt text → Preview → Publish → Live homepage refreshes safely`

---

## 12. Build roadmap

### Phase 1 — Design and foundations

- Finalize brand assets, logo treatment, layout system, color palette, typography and responsive components.
- Set up project structure, database, authentication, storage and role permissions.
- Build public landing, The House, The Table, Gatherings, event detail, Private Affairs and Visit Us.
- Implement editable page copy, event management and media library.
- Connect WhatsApp CTA using admin-configured number and templates.

### Phase 2 — Analytics and polish

- Integrate real analytics source, CTA click tracking and dashboard visualizations.
- Add media crop/focal point, content preview and publishing workflow.
- Finish accessibility, performance, SEO, empty states and mobile responsiveness.
- Validate security, backups and deployed staging environment.

### Phase 3 — Optional future enhancements

- Journal / editorial content publishing.
- Enhanced gallery collections and refined event filtering.
- Multi-language presentation, if client provides translations.
- Event reminder notifications or third-party ticketing (only under a separate scope and approval).
- Dedicated tables/reservations or ordering **only if requested in a future phase**.

---

## 13. Definition of done / acceptance checklist

### Public website

- [ ] Brand reads **Da Duke and Chai** everywhere; **Da Duke** visually dominant.
- [ ] No **Home** item in the nav; logo returns to landing page.
- [ ] Elegant, minimal, premium visual direction reflecting both European influence and tea heritage from Assam/Darjeeling/North Bengal.
- [ ] Responsive landing, The House, The Table, Gatherings, event details, Private Affairs, Visit Us.
- [ ] Upcoming/ongoing/past events derive from database and display correct times/statuses.
- [ ] Event and private-enquiry buttons open WhatsApp with accurate editable business number and a useful prefilled message.
- [ ] No false claims of a completed booking, payment or message being sent.
- [ ] Public image gallery uses admin-uploaded imagery with appropriate alt text and optimization.
- [ ] Contact details, hours and directions are accurate to client-supplied data.
- [ ] Appropriate SEO, privacy and accessibility measures implemented.

### Admin

- [ ] Only authenticated, authorized accounts can access admin or unpublished data.
- [ ] Admin can update public text, imagery, homepage blocks and site settings without code edits.
- [ ] Admin can create/edit/publish/unpublish events and update image galleries.
- [ ] Admin can manage menu categories/items and optional PDF menu.
- [ ] Changes appear live after publishing and cached content invalidates correctly.
- [ ] Analytics displays **real** views/visitors and CTA clicks, not mocked metrics, with clear date filtering and limitations.
- [ ] Admin can update WhatsApp contact and message templates.
- [ ] Upload validation, safe editor inputs, role checks, audit trail and backup plan are tested.

---

## 14. Client information still required before launch

This list is an **implementation dependency**, not permission to substitute fictional content:

- Approved logo/wordmark and brand imagery.
- Exact venue address, map pin and contact details.
- WhatsApp Business/contact number in international format.
- Opening hours, holiday hours and social profiles.
- Real menu, item prices and approved product photographs (if menu is in launch scope).
- Real events, event dates/times, posters, participation terms and any capacity restrictions.
- Venue/private-event policies, seating/capacity details and confirmation process.
- Approved café story, photography rights, regional cultural/sourcing assertions and any founder details.
- Chosen domain, hosting, analytics service and administrator accounts.
- Final privacy/legal text and consent preferences.

**Until the above are supplied:** Use clearly marked editable sample content in local/staging builds, but **never** put invented facts, fake customer testimonials, false sourcing stories, fabricated metrics or made-up events on the live website.

---

## 15. Instructions for an AI website builder / development agent

> **Build a complete, deployable, responsive website for “Da Duke and Chai” using this specification.** It is a premium café–restaurant combining European old-world aesthetics with the warmth and tea culture of Assam, Darjeeling and North Bengal. **Da Duke** must dominate the identity while **and Chai** remains a refined secondary element. The landing page is the home page, but **do not put “Home” in the navigation**; the logo links to `/`. Use editorial imagery, sophisticated typography, an ivory/forest-green/espresso palette, restrained animations and accessible, fast layouts. Implement all essential public pages and a protected `/admin` dashboard. Events, page text, media, menus, contact details and key settings must be editable through the dashboard and persist in a real database. Support event scheduling, event detail pages, a gallery/media library, drafts and publishing, and real website analytics. For birthdays, private functions and event enquiries, use an admin-configured `wa.me` link with prefilled text; **do not create a booking engine, booking database, checkout or payment flow**. Ensure mobile quality, SEO, security, accessibility and production-ready states. Never represent placeholder content or fake analytics as real.

**Implementation priority:** A beautiful, credible public experience **and** a genuinely usable CMS. Do not produce a visually impressive static mockup that cannot be updated by staff.
