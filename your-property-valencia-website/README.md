# Your Property Valencia — website (first version)

A static, multi-page site built from your site-map document, using the brand
system pulled from the current live site.

## Brand system used

| Token | Value | Where |
|---|---|---|
| Primary / accent (terracotta) | `oklch(65% .18 35.67)` ≈ `#cb5e3c` | buttons, links, highlights |
| Ink / text (deep slate navy) | `oklch(20% .05 258.34)` ≈ `#1c2733` | headings, body, footer bg |
| Muted text | `oklch(45% .02 258.34)` | secondary text |
| Surface alt (off-white) | `oklch(98% .005 258.34)` | alternating sections |
| Border | `oklch(90% .005 258.34)` | cards, inputs |
| Typeface | **Geist** (Google Fonts) | everything |
| Corner radius | `.5rem` | matches the current site |

All tokens live at the top of `css/styles.css` with hex fallbacks first and the
exact `oklch()` brand values second. Change them in one place.

**Voice:** first person, warm, direct. "A strategic partner, not a salesperson."
"I don't sell houses — I provide a comprehensive, worry-free service."
"Transparent, dedicated and personal." Copy is drawn from your own words in the
About section and site-map doc.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — full-screen **split gateway** (two paths over Valencia photos, modelled on weVLC's entry page), then your story, Why Valencia, how you help, case studies, Google-reviews slot + testimonials, CTA |
| `beginners.html` | **Path 1** — start investing, why Valencia for first-timers, market overview, common mistakes, DIY vs guided, 5-step journey, 3-tier packages, beginner FAQ |
| `investors.html` | **Path 2** — scale portfolio, market opportunity, why work with an expert, advanced strategies, off-market deals, services, insights |
| `case-studies.html` | Benimaclet / Ayora / Torrefiel — each laid out to match the case-study detail pages on your live site (navy hero + 4 metrics, transformation gallery, Overview, Acquisition & Renovation, Key Improvements, Investment Summary, Rental Returns, CTA). Copy is taken verbatim from the live pages. The gallery is a small vanilla-JS component: before/after side-by-side when both exist (Benimaclet + Torrefiel), single "after" image otherwise (Ayora), with thumbnails + prev/next. |
| `blog.html` | Blog / resources index — 6 placeholder article cards + a subscribe CTA. No individual post pages yet; each card links to a relevant section or to Contact. |
| `about.html` | Full personal story, track record stats, expertise |
| `contact.html` | Contact form + direct details + calendar-embed placeholder |

## Logo

`images/logo.png` is your logo, cropped and web-sized. It sits in the header on
every page. The art has a near-white background, so the CSS uses
`mix-blend-mode: multiply` to drop it cleanly onto the white header; on the home
page the header floats transparent over the gateway, so the logo gets a small
white "chip" background there. If you have a **transparent-PNG or SVG** version of
the logo, replace `images/logo.png` with it and remove the
`mix-blend-mode: multiply` line in `css/styles.css` (`.brand img`).

## Cache busting

CSS/JS links carry `?v=4`. When you change `styles.css` or `main.js`, bump that
number in every HTML file so browsers fetch the new version.

## Photos

Real photos are wired in (optimised for web, 120–310&nbsp;KB each). Full-size
originals are kept **outside** the site folder at
`../yourpropertyvalencia-photo-originals/` so they don't get deployed.

| File(s) | Used on |
|---|---|
| `sara-portrait.jpg` | About page hero |
| `sara-sofa.jpg` | Homepage "My name is Sara" |
| `sara-kitchen.jpg` | About page (on-site band) |
| `valencia-warm.jpg` / `valencia-city.jpg` | Homepage gateway panels (left = sunset plaza, right = City of Arts & Sciences) |
| `project-ana-*.jpg` + `project-ana-*-before.jpg` = **Calle Ana** (living, kitchen, bedroom, bathroom) | **Torrefiel** case study — full before/after gallery + header + Torrefiel homepage card |
| `project-perales-*.jpg` = **Calle Juan Bautista Perales** (master, kitchen, bedroom, room) | **Ayora** case study ("after" only) + Investors page |
| `transform-*-before/after.jpg` = **Carmen Crespo** (kitchen, room3, room4, bath) | **Benimaclet** case study (before/after gallery + header) + Benimaclet homepage card |

Property → case-study mapping (confirmed by Sara):
**Calle Ana → Torrefiel · Calle Juan Bautista Perales → Ayora · Carmen Crespo → Benimaclet.**

To swap any image later, drop a new file into `images/` with the **same name**,
or change the `src=""` in the HTML.

## Run it locally

Just open `index.html` in a browser, or serve the folder:

```bash
cd your-property-valencia-website
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What still needs your input

1. **Add missing gallery shots** — the Ayora gallery shows "after" photos only, so
   it displays as a single image (no before/after split). Add
   `data-before="images/…"` on those thumbnail buttons in `case-studies.html` (and
   drop the before photos into `images/`) to make it before/after like Benimaclet
   and Torrefiel. Your live site also has more photos per property (4/6/5) than the
   4 provided here — add the rest the same way.

2. **Contact form.** It uses Netlify Forms (the `data-netlify` attributes in
   `contact.html`, posted by `js/main.js`). After the first deploy, open Netlify →
   Forms → Form notifications → Add notification → Email, and enter the address
   that should receive the messages. All submissions are also kept in Netlify → Forms.

3. **Calendar booking.** In `contact.html`, replace the "Prefer to book straight
   into my calendar?" card with your Calendly / Cal.com embed snippet.

4. **Google reviews.** Yes — this is doable. There's a placeholder block with
   `id="google-reviews"` in the testimonials section of `index.html`. Two routes:
   - **Widget (easiest, no code):** sign up for a free plan at
     [Featurable](https://featurable.com), [Trustindex](https://www.trustindex.io)
     or [Elfsight](https://elfsight.com), connect your Google Business Profile,
     and paste the `<script>` + `<div>` they give you *inside* that block. It
     auto-updates as new reviews come in.
   - **Google Places API (custom):** returns up to 5 reviews as JSON for a
     `place_id`; needs a Google Cloud API key and a bit of JS. More control, more
     setup.
   Either way you'll need a **Google Business Profile** for Your Property Valencia
   with public reviews.

5. **Packages pricing.** Currently "On request". Add real figures in
   `beginners.html` (`.package__price`) when ready.

6. **Legal pages.** Add `privacy.html` / `aviso-legal.html` (required in Spain)
   and link them in the footer.

7. **Numbers & claims.** Double-check every stat (`+9.5%`, `15–20%`, `€2M+`, the
   case-study metrics) is current and something you're comfortable publishing.
   Disclaimers are already included next to the figures.

## Deploy

Drop the folder into any static host:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder, or connect a repo.
- **GitHub Pages** — push the folder to a repo, enable Pages.
- **Your current host** — upload the files to the web root.

No build step. All assets are local except Google Fonts (with a system-font
fallback if it's ever blocked).

## Content editor (`/admin`)

A lightweight CMS ([Decap CMS](https://decapcms.org)) is already wired in for
**blog posts, testimonials and photos** — see **[CMS-SETUP.md](CMS-SETUP.md)**
for the one-time setup (needs a free GitHub + Netlify account, ~15 minutes).
Once set up, editing those three things is a simple form at `/admin` — no code.

How it works, for reference:

- `content/blog-posts.json` and `content/testimonials.json` hold the editable
  data. `admin/config.yml` defines the edit form fields; `js/content.js`
  fetches the JSON on page load and swaps it into `blog.html`, `index.html`
  and `beginners.html`. If the fetch ever fails, the hardcoded content already
  in the HTML stays visible — nothing goes blank.
- Photos upload through the CMS's built-in media library into `images/`.
  Replacing an existing photo just means uploading a new file with the exact
  same filename.

Everything else (headlines, the About story, case-study numbers, pricing,
FAQ, etc.) is still plain HTML — edit those `.html` files directly, or ask me.
This was a deliberate scope choice: making *all* page text CMS-editable would
mean rebuilding every page as a template, which is a much bigger project. If
you want more of the page text made editable this way later, tell me which
sections matter most and I can extend it.

## Not built yet (in the site-map, planned for later)

Individual blog-post pages (the index exists; posts are placeholders),
downloadable guides / lead magnets, an ROI calculator, and the
Spanish/German/French translations. The footer language line is a label only for
now.
