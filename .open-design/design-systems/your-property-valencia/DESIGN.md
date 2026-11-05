# Design System Inspired by Your Property Valencia

> Category: Professional Services & Advisory
> Warm paper, ink type and one rising sun: a calm, numerate, editorial look for an independent Valencia property advisor.

## Color Palette

All colours come from one mycolor.space palette (base #F8AD5C). The palette is a source of colours, never a gradient to paint.

| Token | Hex | Role |
|---|---|---|
| sun (accent) | #F8AD5C | Primary button fill, the sun motif, highlights, key numbers on ink grounds |
| sun-deep | #CA8535 | Hover / pressed state of sun fills, tiny accents |
| terracotta | #9C5E09 | Accent text, eyebrows and links on **cream** (4.96:1) |
| ink | #2F4858 | Headings, body text, dark sections, footer |
| ink-deep | #1E2F3A | Darkest ground; text on sun-deep hover |
| cream | #FFF8F0 | Default page background |
| sand | #F3E6D6 | Alternate section background, quiet panels |
| coral | #F08577 | Rare secondary accent (one tag or one chart series). Never on buttons, never as text (2.39:1) |
| muted | #53636F | Captions, sources, meta text (5.89:1 on cream, 5.06:1 on sand) |

Contrast rules (WCAG AA, checked):
- Primary button: ink text on sun (5.08:1). Hover: sun-deep fill with **ink-deep** text (4.54:1). Never white on sun.
- Terracotta on sand is 4.26:1: use it there only at ≥24px (large text). Links and small accents on sand switch to ink with an underline.
- On ink / ink-deep grounds: cream text (9.1 / 13.1:1), sun for numbers and highlights (5.08 / 7.30:1), #C9D2D8 for secondary text.
- The old red-orange (oklch 0.65 0.18 35.67 / #cb5e3c) and the old navy are retired everywhere.

## Typography

- **Display: Instrument Serif** (regular and italic only). For hero and section headlines and large numbers. Sizes 40–112px, leading 1.0–1.08, letter-spacing −0.01em. Never below 28px; never for body or UI.
- **Body and UI: Geist** 400 / 500 / 600. Body 17–18px, leading 1.6, measure 60–68ch.
- **Wordmark:** Geist, lowercase, "yourproperty" 600 + "valencia" 400 in terracotta (sun on dark), letter-spacing −0.03em.
- **Numbers:** `font-variant-numeric: tabular-nums lining-nums` on every stat, yield, price and euro amount. Hero figures are set in the serif like a financial paper's front page, never in coloured stat cards.
- **Eyebrows:** Geist 600, 12–13px, uppercase, letter-spacing 0.14em, terracotta on cream (ink on sand, sun on ink). At most one per section, and not on every section.

Scale: 12 / 14 / 17 / 21 / 28 / 44 / 64 / 96 px.

## Voice & Tone

First person, from Sara. Plain, honest and specific: numbers with sources, no hype words, no exclamation marks. Reassuring for first-time investors, brisk and factual for experienced ones. "I don't sell houses. I protect your investment." The one recurring action is "Book a strategy call".

## Imagery & Iconography

- Real, local photography: street-level Valencia neighbourhoods (Benimaclet, Ayora, Torrefiel, Ruzafa), real renovated interiors from case studies, Sara's own portraits. No skyline/landmark stock, no darkened gradient overlays.
- **The arch** is the signature: photos cropped with a semicircular top (Valencian doorways), radius = half the image width. At most one arch per section.
- **Sun arc**: a thin 1.5px half-circle line in sun or terracotta, used as a section divider or beside a heading. A small sun dot marks the active nav item.
- Icons: none decorative. Checklists use a short terracotta tick or a thin rule, never icons in circles. No emoji.

## Layout & Spacing

- Container 1200px, gutters 48 / 32 / 16px (desktop / tablet / phone). Sections 128 / 96 / 72px vertical.
- Left-aligned, asymmetric 12-column layouts that change from section to section (7/5, 5/7, 4/8). Centred text only in the final call to action, if at all.
- Radii: 4px buttons and inputs, 6–8px images and panels. The arch is the only large curve.
- No drop shadows. Separate with 1px rules: `rgba(47,72,88,.16)` on cream, sand on cream, `rgba(255,248,240,.16)` on ink.
- Buttons: one filled style (sun, ink text, 4px radius, 14px × 22px padding, Geist 600). Secondary actions are underlined text links with a → arrow, never pills or arrow-in-circle icons.
- Motion: colour/underline transitions on hover (150ms). No scroll-reveal animations, no parallax.
- Focus: 2px solid ink outline with 3px offset on cream/sand; 2px solid sun on ink grounds.

## Agent Prompt Guide

Build on cream with ink type. Set the big headline and the key numbers in Instrument Serif at large sizes with tight leading, everything else in Geist. Use sun only for the single primary button per view and for numbers or highlights on ink sections; use terracotta for eyebrows and links on cream. Reuse the logo's geometry once per section at most: an arched photo crop, a thin half-sun arc, or the sun dot. Separate with 1px hairlines, not shadows or cards. Keep layouts left-aligned and varied, radii small, motion to hover states, and avoid every generic template tell: split dark heroes, icon-in-circle card grids, pills, gradients, glows, carousels.
