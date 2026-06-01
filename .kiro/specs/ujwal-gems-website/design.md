# Design Document: Ujwal Gems Website

## Overview

The Ujwal Gems website is a static, single-page portfolio and business development site built with vanilla HTML, CSS, and JavaScript — no framework required. It targets boutique emerald buyers and wholesale dealers, communicating heritage, exclusivity, and trust through a "Luxury Heritage" aesthetic.

The site is a single `index.html` file with six primary sections rendered in sequence. All interactivity (filter bar, lightbox, form validation) is handled by vanilla JS modules. Images are served in WebP/AVIF format. No build step is required; the project can be served from any static host (Netlify, GitHub Pages, Vercel, or a plain CDN).

### Key Design Decisions

- **No framework**: Keeps the bundle zero-weight, maximises Lighthouse performance, and removes dependency churn for a long-lived marketing site.
- **CSS custom properties for the design token layer**: All brand colors, font stacks, and spacing values are declared as CSS variables in `:root`, making global theme changes a one-line edit.
- **ES modules (native)**: Each interactive feature (lightbox, filter, form) lives in its own `<script type="module">` file, loaded with `defer`. This avoids a bundler while still giving clean separation of concerns.
- **Progressive enhancement**: The page is fully readable with JS disabled; interactivity layers on top.

---

## Architecture

```
ujwal-gems/
├── index.html                  # Single HTML document, all six sections
├── css/
│   ├── tokens.css              # CSS custom properties (colors, fonts, spacing)
│   ├── base.css                # Reset, typography, global utilities
│   ├── layout.css              # Grid/flex layout helpers, responsive breakpoints
│   ├── hero.css
│   ├── heritage.css
│   ├── gemstone-vault.css
│   ├── certification-vault.css
│   ├── wholesale-inquiry.css
│   └── contact.css
├── js/
│   ├── lightbox.js             # Lightbox open/close, zoom, pan, touch gestures
│   ├── filter.js               # Certification Vault filter logic
│   ├── form.js                 # Wholesale Inquiry inline validation
│   └── main.js                 # Entry point: imports and initialises all modules
├── images/
│   ├── hero/
│   │   └── emerald-macro.webp
│   ├── heritage/
│   │   └── jaipur-workshop.webp
│   ├── gemstones/
│   │   ├── zambian.webp
│   │   ├── panjshir.webp
│   │   └── colombian.webp
│   └── certificates/
│       ├── [cert-id]-thumb.webp    # Thumbnail (≤ 600px wide)
│       └── [cert-id]-full.webp     # Full resolution (≤ 2400px wide)
└── data/
    └── certificates.json       # Certificate data array (see Data Models)
```

### Section Rendering Flow

```
index.html
  └── <main>
        ├── #hero
        ├── #heritage
        ├── #gemstone-vault
        ├── #certification-vault
        │     ├── .filter-bar
        │     └── .cert-grid          ← populated from certificates.json
        ├── #wholesale-inquiry
        └── #contact
```

The certificate grid is the only section that requires a runtime data fetch. On `DOMContentLoaded`, `main.js` fetches `data/certificates.json`, renders the grid, and initialises the filter and lightbox listeners.

---

## Components and Interfaces

### 1. Design Token Layer (`css/tokens.css`)

```css
:root {
  /* Brand colors */
  --color-emerald:    #004D40;
  --color-gold:       #C9A84C;
  --color-ivory:      #FFFFF0;
  --color-ivory-dark: #F5F5DC;   /* subtle card backgrounds */
  --color-text:       #1A1A1A;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Lato', 'Cormorant Garamond', sans-serif;

  /* Spacing scale (8px base) */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  32px;
  --space-xl:  64px;
  --space-2xl: 128px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-std:  200ms ease;
  --transition-slow: 300ms ease;
}
```

### 2. Hero Section

**HTML structure:**
```html
<section id="hero" aria-label="Hero">
  <picture>
    <source srcset="images/hero/emerald-macro.avif" type="image/avif">
    <img src="images/hero/emerald-macro.webp" alt="Close-up of a natural emerald gemstone" class="hero__bg">
  </picture>
  <div class="hero__content">
    <h1 class="hero__title">Ujwal Gems</h1>
    <p class="hero__tagline">Jaipur's Finest Natural Emeralds</p>
    <a href="#gemstone-vault" class="btn btn--gold">Explore the Vault</a>
  </div>
</section>
```

**Behaviour:** Full-viewport height via `height: 100dvh`. The background image uses `object-fit: cover`. On mobile, font size scales down via `clamp()`.

### 3. Our Heritage Section

Two-column layout on desktop (text left, image right), single column on mobile. Background: `var(--color-ivory)`. Heading accent: `var(--color-emerald)`.

### 4. Gemstone Vault Section

Three cards in a CSS Grid (`repeat(3, 1fr)` on desktop, `1fr` on mobile). Each card:
- Gold border: `2px solid var(--color-gold)`
- Hover transition: `transform: scale(1.03)` + `box-shadow` within `var(--transition-std)` (200ms)

### 5. Certification Vault — Filter Bar

```html
<div class="filter-bar" role="group" aria-label="Filter certificates">
  <button class="filter-btn filter-btn--active" data-filter="all" aria-pressed="true">All</button>
  <button class="filter-btn" data-filter="zambian"    aria-pressed="false">Zambian</button>
  <button class="filter-btn" data-filter="panjshir"   aria-pressed="false">Panjshir</button>
  <button class="filter-btn" data-filter="colombian"  aria-pressed="false">Colombian</button>
  <button class="filter-btn" data-filter="gia"        aria-pressed="false">Certified by GIA</button>
  <button class="filter-btn" data-filter="igi"        aria-pressed="false">Certified by IGI</button>
  <button class="filter-btn" data-filter="jaipur-lab" aria-pressed="false">Jaipur Lab</button>
</div>
```

Active state: `background: var(--color-emerald); color: var(--color-ivory)`. `aria-pressed` is toggled by `filter.js`.

### 6. Certification Vault — Certificate Card

```html
<article class="cert-card" 
         data-origin="zambian" 
         data-certifier="gia"
         data-weight="3.45"
         tabindex="0"
         role="button"
         aria-label="Open certificate: Verified Natural Emerald – 3.45 ct">
  <div class="cert-card__frame">
    <img src="images/certificates/cert-001-thumb.webp"
         alt="GIA certificate for 3.45 ct Zambian emerald"
         loading="lazy"
         width="400" height="566">
  </div>
  <p class="cert-card__caption">Verified Natural Emerald – 3.45 ct</p>
</article>
```

### 7. Lightbox Component

```html
<!-- Injected into <body> by lightbox.js on first open -->
<div id="lightbox" role="dialog" aria-modal="true" aria-label="Certificate viewer" hidden>
  <div class="lightbox__backdrop"></div>
  <div class="lightbox__panel">
    <button class="lightbox__close" aria-label="Close certificate viewer">×</button>
    <div class="lightbox__image-wrap" id="lightbox-image-wrap">
      <img id="lightbox-img" src="" alt="" draggable="false">
    </div>
    <div class="lightbox__controls">
      <button class="lightbox__zoom-out" aria-label="Zoom out">−</button>
      <span class="lightbox__zoom-level" aria-live="polite">100%</span>
      <button class="lightbox__zoom-in"  aria-label="Zoom in">+</button>
    </div>
    <p class="lightbox__caption" aria-live="polite"></p>
  </div>
</div>
```

### 8. Wholesale Inquiry Form

Seven fields with HTML5 constraint validation supplemented by `form.js` for inline error messages. The form submits to a `mailto:` action or a configurable endpoint. No server-side processing is in scope.

### 9. Contact Section

Static HTML with:
- Address block in `<address>` element
- `<iframe>` for Google Maps embed
- WhatsApp button: `<a href="https://wa.me/91XXXXXXXXXX?text=Hello%20Ujwal%20Gems">`
- Phone: `<a href="tel:+91XXXXXXXXXX">`
- Email: `<a href="mailto:info@ujwalgems.com">`

---

## Data Models

### Certificate (`data/certificates.json`)

```typescript
interface Certificate {
  id: string;           // e.g. "cert-001"
  origin: "zambian" | "panjshir" | "colombian";
  certifier: "gia" | "igi" | "jaipur-lab";
  weightCt: number;     // e.g. 3.45
  thumbSrc: string;     // relative path to WebP thumbnail
  fullSrc: string;      // relative path to full-resolution WebP
  altText: string;      // descriptive alt text for the full image
  caption: string;      // "Verified Natural Emerald – 3.45 ct"
}
```

Example `certificates.json`:
```json
[
  {
    "id": "cert-001",
    "origin": "zambian",
    "certifier": "gia",
    "weightCt": 3.45,
    "thumbSrc": "images/certificates/cert-001-thumb.webp",
    "fullSrc":  "images/certificates/cert-001-full.webp",
    "altText":  "GIA certificate for a 3.45 carat Zambian natural emerald",
    "caption":  "Verified Natural Emerald – 3.45 ct"
  }
]
```

### Lightbox State

The lightbox module maintains an in-memory state object (not persisted):

```typescript
interface LightboxState {
  isOpen: boolean;
  currentCertId: string | null;
  scale: number;          // 1.0 – 4.0 (100% – 400%)
  panX: number;           // pixels offset from center
  panY: number;           // pixels offset from center
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  lastPinchDistance: number | null;
}
```

### Filter State

```typescript
interface FilterState {
  activeFilter: "all" | "zambian" | "panjshir" | "colombian" | "gia" | "igi" | "jaipur-lab";
}
```

### Form State

```typescript
interface FormField {
  name: string;
  value: string;
  isValid: boolean;
  errorMessage: string | null;
}

interface InquiryFormState {
  fields: Record<string, FormField>;
  isSubmitted: boolean;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Certificate card render fidelity

*For any* array of `Certificate` objects, every rendered certificate card SHALL have an `<img>` whose `src` matches the certificate's `thumbSrc`, a caption text equal to `"Verified Natural Emerald – {weightCt} ct"`, and an `alt` attribute equal to the certificate's `altText` field — with no card omitted and no extra cards added.

**Validates: Requirements 5.2, 5.4, 10.2**

### Property 2: Filter shows only matching cards

*For any* non-"all" filter value and any array of `Certificate` objects, every card returned by `filterCards(cards, filter)` SHALL have a `data-origin` or `data-certifier` value that matches the filter, and every card that does NOT match SHALL be absent from the result.

**Validates: Requirements 6.3**

### Property 3: "All" filter restores the complete set

*For any* array of `Certificate` objects and any prior filter selection, calling `filterCards(cards, "all")` SHALL return a result set whose length and contents are identical to the original unfiltered array.

**Validates: Requirements 6.4**

### Property 4: Exactly one active filter button at all times

*For any* filter value passed to `setActiveFilter(buttons, filter)`, exactly one button in the button list SHALL have `aria-pressed="true"` and the active CSS class; all remaining buttons SHALL have `aria-pressed="false"` and no active class.

**Validates: Requirements 6.5**

### Property 5: Zoom stays within bounds with correct increments

*For any* sequence of zoom-in and zoom-out actions applied to a `LightboxState`, the resulting `scale` SHALL always satisfy `1.0 ≤ scale ≤ 4.0`, and each individual step SHALL change `scale` by exactly `0.25` (clamped at the boundaries).

**Validates: Requirements 7.4**

### Property 6: Lightbox displays correct certificate metadata

*For any* `Certificate` object opened in the lightbox, the lightbox caption element SHALL contain the certificate's `caption` string and the certifying body name derived from the certificate's `certifier` field.

**Validates: Requirements 7.8**

### Property 7: Form validation preserves valid field values on failed submission

*For any* combination of required form fields where at least one field is empty or invalid, submitting the form SHALL not display the confirmation message, and every field that contained a valid value before submission SHALL retain that value after the validation error is shown.

**Validates: Requirements 8.4**

---

## Error Handling

### Image Load Failures
- All `<img>` elements include a meaningful `alt` attribute so content degrades gracefully if an image fails to load.
- Certificate thumbnails that fail to load display a gold-bordered placeholder with the caption text still visible.

### `certificates.json` Fetch Failure
- If the fetch fails (network error or 404), the Certification Vault section displays a fallback message: "Certificate gallery temporarily unavailable. Please contact us directly."
- The filter bar is hidden when no cards are rendered.

### Form Submission
- The form uses `novalidate` on the `<form>` element so that `form.js` controls all validation UI (preventing inconsistent browser-native error bubbles).
- If the submission endpoint is unavailable, the user sees a generic error message and the form data is preserved.

### Lightbox Edge Cases
- If a certificate's `fullSrc` image fails to load inside the lightbox, the lightbox displays the thumbnail instead and shows an error notice.
- Zoom and pan state is reset to `scale: 1.0, panX: 0, panY: 0` every time the lightbox opens a new certificate.

### JavaScript Disabled
- The filter bar is hidden via `<noscript>` CSS so the full unfiltered grid is always visible.
- The lightbox open trigger is replaced with a direct link to the full-resolution image in a new tab.

---

## Testing Strategy

### Unit Tests (Vitest)

Unit tests cover pure functions with no DOM dependency:

| Module | Function | What is tested |
|---|---|---|
| `filter.js` | `filterCards(cards, filter)` | Returns correct subset for each filter value; returns all for "all" |
| `filter.js` | `setActiveFilter(buttons, filter)` | Exactly one button gets active class and `aria-pressed="true"` |
| `lightbox.js` | `clampScale(scale)` | Clamps to [1.0, 4.0] for any input |
| `lightbox.js` | `applyZoom(state, direction)` | Increments/decrements by 0.25, respects bounds |
| `lightbox.js` | `resetPan(state)` | Returns `panX: 0, panY: 0` |
| `form.js` | `validateField(name, value)` | Returns correct `isValid` and `errorMessage` for each field type |
| `form.js` | `validateForm(fields)` | Returns false when any required field is invalid; preserves other field values |
| `data` | `renderCertCard(cert)` | Rendered HTML attributes match source certificate object |

### Property-Based Tests (fast-check)

Property-based testing is appropriate here because the filter logic, zoom clamping, and form validation are pure functions whose correctness must hold across a wide input space. [fast-check](https://github.com/dubzzz/fast-check) is used as the PBT library (works with Vitest, zero-config).

Each property test runs a minimum of **100 iterations**.

Tag format: `// Feature: ujwal-gems-website, Property {N}: {property_text}`

| Property | Test description | Arbitraries used |
|---|---|---|
| Property 1 | Certificate card render fidelity | `fc.array(fc.record({id, origin, certifier, weightCt, thumbSrc, fullSrc, altText, caption}))` |
| Property 2 | Filter shows only matching cards | `fc.constantFrom(...filterValues)`, `fc.array(certificateArb)` |
| Property 3 | "All" filter restores full set | `fc.array(certificateArb)`, `fc.constantFrom(...filterValues)` for prior filter |
| Property 4 | Exactly one active filter button | `fc.constantFrom(...filterValues)` |
| Property 5 | Zoom stays within bounds with correct increments | `fc.array(fc.constantFrom("in","out"), {minLength:1, maxLength:50})` |
| Property 6 | Lightbox displays correct certificate metadata | `fc.record(certificateArb)` |
| Property 7 | Form validation preserves valid field values | `fc.record(...)` with random combinations of empty/invalid required fields |

### Integration / Smoke Tests

- **Lighthouse CI**: Run against a locally served build; assert Accessibility ≥ 90, Performance ≥ 80.
- **Keyboard navigation smoke test** (Playwright): Tab through all interactive elements, verify focus is never lost, Escape closes lightbox.
- **Responsive layout smoke test** (Playwright): Verify grid column counts at 320px, 768px, 1280px viewports.
- **WhatsApp link smoke test**: Assert `href` starts with `https://wa.me/`.

### Accessibility Checks

- `axe-core` integrated into Vitest DOM tests to catch ARIA violations on rendered components.
- Manual screen-reader test checklist (NVDA + Chrome, VoiceOver + Safari) for lightbox open/close announcements.
