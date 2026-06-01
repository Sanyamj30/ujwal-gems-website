# Implementation Plan: Ujwal Gems Website

## Overview

Build a static, single-page portfolio and business development site using vanilla HTML, CSS, and JavaScript. The implementation proceeds section-by-section, starting with the project scaffold and design token layer, then building each of the six sections, followed by the JavaScript modules, certificate data, property-based tests, and finally integration/smoke tests and accessibility validation.

## Tasks

- [x] 1. Project scaffold and design token layer
  - Create the full directory structure: `css/`, `js/`, `images/hero/`, `images/heritage/`, `images/gemstones/`, `images/certificates/`, `data/`
  - Create `css/tokens.css` with all CSS custom properties: `--color-emerald`, `--color-gold`, `--color-ivory`, `--color-ivory-dark`, `--color-text`, `--font-display`, `--font-body`, spacing scale (`--space-xs` through `--space-2xl`), and transition variables
  - Create `css/base.css` with CSS reset, global typography rules (Playfair Display for headings, Lato/Cormorant Garamond for body), and utility classes
  - Create `css/layout.css` with grid/flex helpers and responsive breakpoint definitions (320px, 768px, 1280px)
  - Create the `index.html` shell: `<!DOCTYPE html>`, `<head>` with Google Fonts links for Playfair Display and Lato, `<link>` tags for all CSS files, `<main>` with six empty `<section>` placeholders (`#hero`, `#heritage`, `#gemstone-vault`, `#certification-vault`, `#wholesale-inquiry`, `#contact`), and `<script type="module" src="js/main.js" defer>`
  - Create placeholder `js/main.js`, `js/lightbox.js`, `js/filter.js`, `js/form.js` files
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Hero section
  - [x] 2.1 Implement Hero section HTML and CSS
    - Write the Hero section markup in `index.html` per the design: `<picture>` with AVIF/WebP sources for `images/hero/emerald-macro.webp`, `<h1 class="hero__title">Ujwal Gems</h1>`, `<p class="hero__tagline">Jaipur's Finest Natural Emeralds</p>`, and `<a href="#gemstone-vault" class="btn btn--gold">Explore the Vault</a>`
    - Create `css/hero.css`: full-viewport height via `height: 100dvh`, `object-fit: cover` on the background image, `.btn--gold` styled with `background: var(--color-gold)` and Ivory text, `h1` minimum 48px on desktop using `clamp()` for mobile scaling
    - Ensure the CTA button navigates to `#gemstone-vault`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 3. Our Heritage section
  - [x] 3.1 Implement Heritage section HTML and CSS
    - Write the Heritage section markup: heading with Emerald Green accent, two-paragraph narrative body text about Jaipur's gemstone legacy and Ujwal Gems' sourcing philosophy, and a supporting image (`images/heritage/jaipur-workshop.webp`) with descriptive `alt` text
    - Create `css/heritage.css`: two-column layout on desktop (text left, image right) using CSS Grid, single column on mobile, `background: var(--color-ivory)`, heading color `var(--color-emerald)`, minimum text column width of 480px on desktop
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Gemstone Vault section
  - [x] 4.1 Implement Gemstone Vault HTML and CSS
    - Write the Gemstone Vault markup: three `<article>` cards for Zambian, Panjshir, and Colombian origins, each containing a gemstone image (`images/gemstones/zambian.webp`, etc.), origin name heading, and 2–4 sentence descriptive text; each card has `class="gem-card"`
    - Create `css/gemstone-vault.css`: CSS Grid with `repeat(3, 1fr)` on desktop, `1fr` on mobile; each card with `border: 2px solid var(--color-gold)`; hover transition `transform: scale(1.03)` and `box-shadow` within `var(--transition-std)` (200ms); `@media (prefers-reduced-motion: reduce)` disables the transform
    - Add descriptive `alt` text to all three gemstone images
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Certificate data and grid rendering
  - [x] 5.1 Create `data/certificates.json` with sample certificate entries
    - Write at least 7 sample `Certificate` objects covering all three origins (zambian, panjshir, colombian) and all three certifiers (gia, igi, jaipur-lab), each with `id`, `origin`, `certifier`, `weightCt`, `thumbSrc`, `fullSrc`, `altText`, and `caption` fields matching the data model in the design
    - Ensure `caption` values follow the exact format `"Verified Natural Emerald – {weightCt} ct"`
    - _Requirements: 5.2, 5.4_

  - [x] 5.2 Implement `renderCertCard(cert)` in `filter.js` and grid population in `main.js`
    - Write the `renderCertCard(cert)` function that returns an `<article class="cert-card">` element with `data-origin`, `data-certifier`, `data-weight` attributes, a `<div class="cert-card__frame">` containing a lazy-loaded `<img>` with `src` set to `cert.thumbSrc`, `alt` set to `cert.altText`, explicit `width` and `height`, and a `<p class="cert-card__caption">` with `cert.caption`; the article has `tabindex="0"`, `role="button"`, and `aria-label` per the design
    - In `main.js`, on `DOMContentLoaded`, fetch `data/certificates.json`, call `renderCertCard` for each entry, append cards to `.cert-grid`, then initialise filter and lightbox modules; on fetch failure, display the fallback message and hide the filter bar
    - Write the Certification Vault section HTML in `index.html`: section heading, introductory sentence, `.filter-bar` placeholder, and `.cert-grid` container
    - Create `css/certification-vault.css`: responsive grid (3 columns ≥1280px, 2 columns 768–1279px, 1 column <768px), `border: 2px solid var(--color-gold)` on `.cert-card__frame`, Ivory/white background, Emerald Green section heading
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 10.2_

- [x] 6. Certification Vault — Filter Bar
  - [x] 6.1 Implement `filterCards` and `setActiveFilter` pure functions in `filter.js`
    - Write `filterCards(cards, filter)`: accepts an array of `Certificate` objects and a filter string; returns all cards when filter is `"all"`, otherwise returns only cards whose `origin` or `certifier` matches the filter value; the function must be a pure function with no DOM side-effects
    - Write `setActiveFilter(buttons, filter)`: accepts a NodeList/array of filter buttons and a filter string; sets `aria-pressed="true"` and the active CSS class on exactly the matching button, and `aria-pressed="false"` with no active class on all others
    - Export both functions for use in tests and `main.js`
    - _Requirements: 6.3, 6.4, 6.5_

  - [x] 6.2 Wire filter bar into the DOM in `main.js`
    - Write the filter bar HTML in `index.html` per the design: seven `<button class="filter-btn">` elements with `data-filter` attributes (`all`, `zambian`, `panjshir`, `colombian`, `gia`, `igi`, `jaipur-lab`) and initial `aria-pressed` values; wrap in `<div class="filter-bar" role="group" aria-label="Filter certificates">`
    - In `main.js`, after grid population, attach click listeners to each filter button that call `filterCards` and `setActiveFilter`, then show/hide cards by toggling a `hidden` attribute or `display: none` within 300ms
    - Add `<noscript>` CSS rule to hide the filter bar when JS is disabled
    - Update `css/certification-vault.css`: active filter button style (`background: var(--color-emerald); color: var(--color-ivory)`); mobile filter bar allows horizontal scroll or wrapping
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 6.3 Write property tests for filter functions (Properties 2, 3, 4)
    - **Property 2: Filter shows only matching cards** — use `fc.constantFrom("zambian","panjshir","colombian","gia","igi","jaipur-lab")` and `fc.array(certificateArb)` to assert every returned card matches the filter and no matching card is absent
    - **Property 3: "All" filter restores the complete set** — use `fc.array(certificateArb)` and `fc.constantFrom(...)` for a prior filter to assert `filterCards(cards, "all")` returns the full original array
    - **Property 4: Exactly one active filter button at all times** — use `fc.constantFrom(...filterValues)` to assert `setActiveFilter` leaves exactly one button with `aria-pressed="true"` and the active class
    - Minimum 100 iterations per property; tag each test with `// Feature: ujwal-gems-website, Property {N}: {property_text}`
    - **Validates: Requirements 6.3, 6.4, 6.5**

- [x] 7. Certification Vault — Lightbox
  - [x] 7.1 Implement lightbox DOM injection and open/close in `lightbox.js`
    - Write `initLightbox()`: on first call, inject the lightbox HTML into `<body>` per the design (dialog with backdrop, panel, close button, image wrap, zoom controls, caption, `aria-live` regions); subsequent calls reuse the existing element
    - Write `openLightbox(cert)`: set `lightbox-img` `src` to `cert.fullSrc` and `alt` to `cert.altText`; populate `.lightbox__caption` with `cert.caption` and certifier name; remove `hidden` attribute; set `document.body.style.overflow = "hidden"`; move focus to the close button; reset state to `scale: 1.0, panX: 0, panY: 0`; if `fullSrc` fails to load, fall back to `cert.thumbSrc` and show an error notice
    - Write `closeLightbox()`: add `hidden` attribute; restore `document.body.style.overflow`; return focus to the card that triggered the open
    - Attach Escape key listener on `document` that calls `closeLightbox()` when lightbox is open
    - Attach click listener on `.lightbox__backdrop` to close
    - _Requirements: 7.1, 7.2, 7.3, 7.7, 7.8, 10.6_

  - [x] 7.2 Implement zoom and pan in `lightbox.js`
    - Write `clampScale(scale)`: returns `Math.min(4.0, Math.max(1.0, scale))`
    - Write `applyZoom(state, direction)`: increments `state.scale` by `+0.25` for `"in"` or `-0.25` for `"out"`, then clamps via `clampScale`; updates `.lightbox__zoom-level` text to `"{scale * 100}%"`; applies `transform: scale(state.scale) translate(state.panX, state.panY)` to `#lightbox-img`
    - Write `resetPan(state)`: sets `state.panX = 0` and `state.panY = 0`
    - Attach mousedown/mousemove/mouseup listeners on `#lightbox-image-wrap` for click-and-drag panning when `scale > 1.0`; update `state.panX/panY` and apply transform
    - Attach `touchstart`/`touchmove` listeners for pinch-to-zoom (two-finger distance delta → scale) and swipe-to-pan (single-finger drag → panX/panY)
    - _Requirements: 7.4, 7.5, 7.6_

  - [x] 7.3 Write property tests for lightbox zoom functions (Property 5)
    - **Property 5: Zoom stays within bounds with correct increments** — use `fc.array(fc.constantFrom("in","out"), {minLength:1, maxLength:50})` to apply a random sequence of zoom actions to an initial state and assert `1.0 ≤ scale ≤ 4.0` after every step, and that each non-boundary step changes scale by exactly `0.25`
    - Minimum 100 iterations; tag with `// Feature: ujwal-gems-website, Property 5: Zoom stays within bounds with correct increments`
    - **Validates: Requirements 7.4**

  - [x] 7.4 Wire lightbox open trigger to certificate cards in `main.js`
    - After rendering the cert grid, attach click and keydown (Enter/Space) listeners to each `.cert-card` that call `openLightbox(cert)` with the matching certificate object
    - Ensure the lightbox `aria-label` on each card matches `"Open certificate: {cert.caption}"`
    - _Requirements: 7.1, 10.3_

- [x] 8. Checkpoint — core interactivity complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Wholesale Inquiry section
  - [x] 9.1 Implement Wholesale Inquiry HTML and CSS
    - Write the Wholesale Inquiry section markup in `index.html`: section heading identifying it as for trade/wholesale buyers, trust statement paragraph, and a `<form novalidate>` with seven fields: Full Name (text, required), Business Name (text, required), Phone Number (tel, required), Email Address (email, required), Emerald Origin of Interest (select with options Zambian/Panjshir/Colombian/All, required), Estimated Quantity in Carats (number, required), Message (textarea, optional); each field wrapped in a `<div class="form-group">` with a `<label>` and an empty `<span class="field-error" aria-live="polite">` for inline errors; submit button with `class="btn btn--gold"`
    - Create `css/wholesale-inquiry.css`: Champagne Gold submit button with Ivory text; form layout with clear field grouping; error message styling in a visible color
    - _Requirements: 8.1, 8.2, 8.5, 8.6_

  - [x] 9.2 Implement `validateField` and `validateForm` in `form.js`
    - Write `validateField(name, value)`: returns `{ isValid: boolean, errorMessage: string | null }` for each field type — required text/tel/email fields fail when empty or format-invalid; number field fails when empty or ≤ 0; optional textarea always passes; email validated with a regex pattern
    - Write `validateForm(fields)`: iterates all fields, calls `validateField` for each, returns `false` if any required field is invalid; must not mutate valid field values
    - Export both functions
    - _Requirements: 8.3, 8.4_

  - [x] 9.3 Wire form validation and submission in `main.js`
    - In `main.js`, attach a `submit` event listener on the inquiry form that calls `validateForm`, displays inline error messages in each field's `.field-error` span without clearing other field values on failure, and shows a confirmation message on success; preserve all field values on failed submission
    - _Requirements: 8.3, 8.4_

  - [x] 9.4 Write property test for form validation (Property 7)
    - **Property 7: Form validation preserves valid field values on failed submission** — use `fc.record(...)` with random combinations of empty/invalid required fields (ensuring at least one is invalid) to assert `validateForm` returns `false` and every field that had a valid value before the call retains that value after
    - Minimum 100 iterations; tag with `// Feature: ujwal-gems-website, Property 7: Form validation preserves valid field values on failed submission`
    - **Validates: Requirements 8.4**

- [x] 10. Contact section
  - [x] 10.1 Implement Contact section HTML and CSS
    - Write the Contact section markup in `index.html`: `<address>` block with Jaipur office address (street, city, state, PIN), business phone as `<a href="tel:+91XXXXXXXXXX">`, email as `<a href="mailto:info@ujwalgems.com">`, operating hours text, WhatsApp button as `<a href="https://wa.me/91XXXXXXXXXX?text=Hello%20Ujwal%20Gems" class="btn btn--gold">` with descriptive `aria-label`, and a Google Maps `<iframe>` centered on the Jaipur office with `title` attribute for accessibility
    - Create `css/contact.css`: consistent brand styling; ensure phone and email links are tappable on mobile (minimum 44×44px touch target)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 11. Certificate card render fidelity — property test and unit tests
  - [x] 11.1 Implement `renderCertCard` unit tests
    - Write Vitest unit tests for `renderCertCard(cert)` asserting: `img.src` matches `cert.thumbSrc`, `img.alt` matches `cert.altText`, caption text equals `cert.caption`, `data-origin` equals `cert.origin`, `data-certifier` equals `cert.certifier`
    - _Requirements: 5.2, 5.4, 10.2_

  - [x] 11.2 Write property test for certificate card render fidelity (Property 1)
    - **Property 1: Certificate card render fidelity** — use `fc.array(fc.record({id: fc.string(), origin: fc.constantFrom("zambian","panjshir","colombian"), certifier: fc.constantFrom("gia","igi","jaipur-lab"), weightCt: fc.float({min:0.1, max:50}), thumbSrc: fc.string(), fullSrc: fc.string(), altText: fc.string(), caption: fc.string()}))` to assert that for every certificate in the input array, the rendered card's `img.src` matches `thumbSrc`, caption text matches `caption`, `img.alt` matches `altText`, no card is omitted, and no extra cards are added
    - Minimum 100 iterations; tag with `// Feature: ujwal-gems-website, Property 1: Certificate card render fidelity`
    - **Validates: Requirements 5.2, 5.4, 10.2**

  - [x] 11.3 Write property test for lightbox certificate metadata (Property 6)
    - **Property 6: Lightbox displays correct certificate metadata** — use `fc.record(certificateArb)` to assert that after `openLightbox(cert)`, the `.lightbox__caption` element contains `cert.caption` and the certifier name derived from `cert.certifier`
    - Minimum 100 iterations; tag with `// Feature: ujwal-gems-website, Property 6: Lightbox displays correct certificate metadata`
    - **Validates: Requirements 7.8**

- [x] 12. Accessibility and keyboard navigation
  - [x] 12.1 Audit and fix ARIA attributes across all sections
    - Verify all non-decorative images have descriptive `alt` text (hero, heritage, gemstones, certificate thumbnails, lightbox full image)
    - Verify all interactive elements have visible focus indicators (`:focus-visible` styles in `base.css`)
    - Verify lightbox `role="dialog"`, `aria-modal="true"`, `aria-label`, and `aria-live` regions on caption and zoom level are correctly set
    - Verify filter bar `role="group"` and `aria-pressed` toggling on filter buttons
    - Verify form fields have associated `<label>` elements and error spans use `aria-live="polite"`
    - Verify Google Maps iframe has a `title` attribute
    - _Requirements: 10.1, 10.2, 10.3, 10.6_

  - [x] 12.2 Write Playwright keyboard navigation smoke test
    - Write a Playwright test that serves the static site, tabs through all interactive elements (nav links, CTA button, filter buttons, cert cards, lightbox controls, form fields, submit button, contact links), verifies focus is never lost or trapped outside the lightbox, and verifies Escape closes the lightbox
    - _Requirements: 10.3_

  - [x] 12.3 Write Playwright responsive layout smoke test
    - Write a Playwright test that checks the Certification Vault grid column count at 320px (1 column), 768px (2 columns), and 1280px (3 columns) viewports, and verifies the Gemstone Vault cards stack vertically at 320px
    - _Requirements: 1.5, 4.5, 5.1_

  - [x] 12.4 Write Playwright WhatsApp link smoke test
    - Write a Playwright test that asserts the WhatsApp button `href` starts with `https://wa.me/`
    - _Requirements: 9.3, 9.6_

- [ ] 13. Performance optimisation
  - [x] 13.1 Audit and fix image delivery
    - Ensure all `<img>` elements in the HTML have explicit `width` and `height` attributes to prevent layout shift
    - Ensure all certificate thumbnail `<img>` elements use `loading="lazy"`
    - Ensure hero and above-the-fold images use `<picture>` with AVIF source and WebP fallback
    - Add `fetchpriority="high"` to the hero image to prioritise LCP
    - _Requirements: 1.6, 10.4, 10.5_

  - [x] 13.2 Configure and run Lighthouse CI
    - Add a `lighthouserc.json` (or `.lighthouserc.js`) configuration file asserting `categories.accessibility >= 0.9` and `categories.performance >= 0.8`
    - Add an `npm` script `"lighthouse": "lhci autorun"` to `package.json` (create `package.json` if it does not exist, also adding `"test": "vitest --run"` and `"test:e2e": "playwright test"` scripts)
    - _Requirements: 10.1, 10.4_

- [x] 14. Test infrastructure setup
  - [x] 14.1 Set up Vitest and fast-check
    - Create `package.json` with `"type": "module"`, dev dependencies for `vitest` and `fast-check`, and a `"test": "vitest --run"` script (merge with any existing `package.json`)
    - Create `vitest.config.js` with `environment: "jsdom"` so DOM-dependent tests can run
    - Create a `tests/` directory with a `tests/unit/` subdirectory for unit and property tests and a `tests/e2e/` subdirectory for Playwright tests
    - _Requirements: (testing infrastructure for all requirements)_

  - [x] 14.2 Set up Playwright
    - Install `@playwright/test` as a dev dependency and run `npx playwright install` to download browsers
    - Create `playwright.config.js` pointing to `tests/e2e/` with a `webServer` config that serves the project root on a local port (e.g., `npx serve . -p 3000`)
    - _Requirements: (testing infrastructure for 10.1, 10.3, 10.4)_

- [x] 15. Final checkpoint — all tests pass
  - Ensure all Vitest unit and property tests pass (`npm test`)
  - Ensure all Playwright smoke tests pass (`npm run test:e2e`)
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests (Properties 1–7) validate universal correctness properties across wide input spaces using fast-check
- Unit tests validate specific examples and edge cases
- The site requires no build step; serve the project root with any static file server (e.g., `npx serve .`) for local development and testing
- Placeholder images should be used during development; replace with real WebP/AVIF assets before launch
