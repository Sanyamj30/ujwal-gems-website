# Requirements Document

## Introduction

Ujwal Gems is a boutique emerald specialist based in Jaipur, India, serving both local retail and wholesale markets. This document defines the requirements for a high-end, premium portfolio and business website that communicates the brand's heritage, exclusivity, and trustworthiness. The website must reflect a "Luxury Heritage" aesthetic — deep Emerald Green and Champagne Gold on ivory backgrounds — and serve as both a showcase and a business development tool for wholesale dealers and discerning buyers.

The site includes six primary sections: Hero, Our Heritage, Gemstone Vault, Certification Vault, Wholesale Inquiry, and Contact. A key interactive feature is the Certification Vault, which provides a filterable grid of gemstone certificates with a full-screen lightbox and zoom capability.

---

## Glossary

- **Website**: The Ujwal Gems premium portfolio and business website.
- **Hero_Section**: The full-viewport landing section featuring a macro emerald image and brand tagline.
- **Heritage_Section**: The "Our Heritage" section highlighting Jaipur's craftsmanship and Ujwal Gems' provenance story.
- **Gemstone_Vault**: The section showcasing the three emerald origins: Zambian, Panjshir, and Colombian.
- **Certification_Vault**: The filterable grid section displaying gemstone certificates with lightbox functionality.
- **Wholesale_Inquiry_Section**: The section targeting local dealers with an inquiry form.
- **Contact_Section**: The section containing WhatsApp integration and an embedded Jaipur office map.
- **Lightbox**: A full-screen overlay that displays a certificate image with zoom capability.
- **Certificate_Card**: A single grid item in the Certification Vault, consisting of a gold-bordered thumbnail, a caption, and a click target for the Lightbox.
- **Filter_Bar**: The row of filter buttons at the top of the Certification Vault (All, Zambian, Panjshir, Certified by GIA, etc.).
- **Zoom_Control**: The in-Lightbox control that allows the user to magnify the certificate image to read fine text.
- **Visitor**: Any person accessing the Website via a web browser.
- **Dealer**: A wholesale buyer or local trade partner who uses the Wholesale Inquiry form.
- **GIA**: Gemological Institute of America — a recognized gemstone certification authority.
- **IGI**: International Gemological Institute — a recognized gemstone certification authority.
- **Jaipur_Lab**: A local Jaipur-based gemological laboratory issuing regional certificates.

---

## Requirements

### Requirement 1: Visual Design System

**User Story:** As a Visitor, I want the website to feel premium and trustworthy, so that I am confident in Ujwal Gems' quality and exclusivity.

#### Acceptance Criteria

1. THE Website SHALL use a color palette consisting of deep Emerald Green (`#004D40` or equivalent), Champagne Gold (`#C9A84C` or equivalent), and Ivory (`#FFFFF0` or equivalent) as the three primary brand colors.
2. THE Website SHALL use Playfair Display as the primary serif typeface for all headings and display text.
3. THE Website SHALL use a complementary sans-serif typeface (such as Lato or Cormorant Garamond) for body text and UI labels to ensure readability.
4. THE Website SHALL apply consistent spacing, typographic scale, and color usage across all six sections so that the visual language is uniform throughout.
5. THE Website SHALL be fully responsive, rendering correctly on viewport widths of 320px (mobile), 768px (tablet), and 1280px and above (desktop).
6. WHEN a Visitor loads any page, THE Website SHALL display all above-the-fold content within 3 seconds on a standard broadband connection (≥ 10 Mbps).

---

### Requirement 2: Hero Section

**User Story:** As a Visitor, I want to immediately understand Ujwal Gems' identity and premium positioning, so that I am drawn into exploring the site further.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy the full viewport height on initial page load.
2. THE Hero_Section SHALL display a high-resolution macro photograph of a natural emerald as the primary background or focal image.
3. THE Hero_Section SHALL display the brand name "Ujwal Gems" in Playfair Display at a prominent display size (minimum 48px on desktop).
4. THE Hero_Section SHALL display a brand tagline that communicates exclusivity and heritage (e.g., "Jaipur's Finest Natural Emeralds").
5. THE Hero_Section SHALL include a primary call-to-action button styled in Champagne Gold that navigates the Visitor to the Gemstone_Vault section.
6. WHEN a Visitor views the Hero_Section on a mobile device, THE Hero_Section SHALL reflow the text and button to remain legible and accessible without horizontal scrolling.

---

### Requirement 3: Our Heritage Section

**User Story:** As a Visitor, I want to learn about Ujwal Gems' history and Jaipur's craftsmanship tradition, so that I trust the brand's expertise and provenance.

#### Acceptance Criteria

1. THE Heritage_Section SHALL include a heading, a narrative body text block of at least two paragraphs describing Jaipur's gemstone legacy and Ujwal Gems' sourcing philosophy.
2. THE Heritage_Section SHALL include at least one supporting visual (photograph or decorative illustration) that reinforces the artisanal and heritage theme.
3. THE Heritage_Section SHALL use Ivory as the background color and Emerald Green as the heading accent color.
4. WHEN a Visitor reads the Heritage_Section, THE Heritage_Section SHALL present content in a layout that separates text and imagery clearly, with a minimum text column width of 480px on desktop.

---

### Requirement 4: Gemstone Vault Section

**User Story:** As a Visitor or Dealer, I want to browse the types of emeralds Ujwal Gems offers, so that I can identify the origin and quality that meets my needs.

#### Acceptance Criteria

1. THE Gemstone_Vault SHALL display exactly three emerald origin categories: Zambian, Panjshir, and Colombian.
2. THE Gemstone_Vault SHALL present each category as a distinct card or panel containing a high-quality gemstone image, the origin name, and a short descriptive text (2–4 sentences) about that origin's characteristics.
3. THE Gemstone_Vault SHALL style each card with a Champagne Gold border or accent element to reinforce the luxury aesthetic.
4. WHEN a Visitor hovers over a Gemstone_Vault card on a pointer device, THE Gemstone_Vault SHALL apply a subtle visual transition (e.g., scale, shadow, or border glow) within 200ms to indicate interactivity.
5. WHEN a Visitor views the Gemstone_Vault on a mobile device, THE Gemstone_Vault SHALL stack the three cards vertically in a single column.

---

### Requirement 5: Certification Vault — Grid Display

**User Story:** As a Visitor or Dealer, I want to view Ujwal Gems' gemstone certificates in a clean, professional grid, so that I can verify the authenticity and quality of the stones.

#### Acceptance Criteria

1. THE Certification_Vault SHALL display Certificate_Cards in a responsive grid layout with a minimum of 3 columns on desktop (≥ 1280px), 2 columns on tablet (768px–1279px), and 1 column on mobile (< 768px).
2. EACH Certificate_Card SHALL display a high-quality thumbnail image of the certificate.
3. EACH Certificate_Card SHALL apply a Champagne Gold border frame (minimum 2px solid) around the certificate thumbnail.
4. EACH Certificate_Card SHALL display a caption below the thumbnail in the format: "Verified Natural Emerald – [Weight in Carats] ct".
5. THE Certification_Vault SHALL use an Ivory or white background with Emerald Green section heading to maintain visual consistency with the design system.
6. THE Certification_Vault SHALL include a section heading and a brief introductory sentence explaining the certification standards used.

---

### Requirement 6: Certification Vault — Filter Bar

**User Story:** As a Visitor or Dealer, I want to filter certificates by origin or certifying body, so that I can quickly find the specific certificates relevant to my inquiry.

#### Acceptance Criteria

1. THE Filter_Bar SHALL appear at the top of the Certification_Vault section, above the certificate grid.
2. THE Filter_Bar SHALL include at minimum the following filter options: "All", "Zambian", "Panjshir", "Colombian", "Certified by GIA", "Certified by IGI", "Jaipur Lab".
3. WHEN a Visitor clicks a filter option, THE Certification_Vault SHALL display only the Certificate_Cards matching that filter within 300ms, without a full page reload.
4. WHEN a Visitor clicks the "All" filter option, THE Certification_Vault SHALL display all Certificate_Cards.
5. THE Filter_Bar SHALL visually indicate the currently active filter using a distinct style (e.g., filled Emerald Green background with Ivory text) to differentiate it from inactive filters.
6. WHEN a Visitor views the Filter_Bar on a mobile device, THE Filter_Bar SHALL allow horizontal scrolling or wrapping so all filter options remain accessible.

---

### Requirement 7: Certification Vault — Lightbox

**User Story:** As a Visitor or Dealer, I want to open a certificate in a full-screen overlay and zoom in, so that I can read the fine text and verify the certificate details.

#### Acceptance Criteria

1. WHEN a Visitor clicks a Certificate_Card, THE Lightbox SHALL open and display the full-resolution certificate image in a full-screen overlay within 400ms.
2. THE Lightbox SHALL display a close button (×) in a clearly visible position (top-right corner) styled consistently with the brand palette.
3. WHEN a Visitor clicks the close button or presses the Escape key, THE Lightbox SHALL close and return the Visitor to the Certification_Vault grid.
4. THE Lightbox SHALL include Zoom_Control buttons (zoom in "+" and zoom out "−") that increase or decrease the displayed image scale in increments of 25%, with a minimum scale of 100% and a maximum scale of 400%.
5. WHEN the certificate image is zoomed beyond the viewport dimensions, THE Lightbox SHALL allow the Visitor to pan the image by clicking and dragging.
6. WHEN a Visitor opens the Lightbox on a touch device, THE Lightbox SHALL support pinch-to-zoom and swipe-to-pan gestures as equivalents to the Zoom_Control buttons.
7. WHILE the Lightbox is open, THE Website SHALL prevent the background page from scrolling.
8. THE Lightbox SHALL display the certificate caption ("Verified Natural Emerald – [Weight] ct") and the certifying body name below or beside the image for reference.

---

### Requirement 8: Wholesale Inquiry Section

**User Story:** As a Dealer, I want to submit a wholesale inquiry directly from the website, so that I can initiate a business relationship with Ujwal Gems efficiently.

#### Acceptance Criteria

1. THE Wholesale_Inquiry_Section SHALL include a heading that clearly identifies the section as intended for trade and wholesale buyers.
2. THE Wholesale_Inquiry_Section SHALL include an inquiry form with the following fields: Full Name (text, required), Business Name (text, required), Phone Number (tel, required), Email Address (email, required), Emerald Origin of Interest (select: Zambian / Panjshir / Colombian / All, required), Estimated Quantity in Carats (number, required), and Message (textarea, optional).
3. WHEN a Dealer submits the form with all required fields populated and valid, THE Wholesale_Inquiry_Section SHALL display a confirmation message acknowledging receipt of the inquiry.
4. IF a Dealer submits the form with one or more required fields empty or invalid, THEN THE Wholesale_Inquiry_Section SHALL display inline validation error messages adjacent to each invalid field without clearing the other field values.
5. THE Wholesale_Inquiry_Section SHALL style the submit button in Champagne Gold with Ivory text, consistent with the primary CTA style.
6. THE Wholesale_Inquiry_Section SHALL include a brief trust statement (e.g., "Your inquiry is confidential and will be responded to within 24 hours") to reinforce professionalism.

---

### Requirement 9: Contact Section

**User Story:** As a Visitor or Dealer, I want to contact Ujwal Gems via WhatsApp or find their office location, so that I can reach them through my preferred communication channel.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the Ujwal Gems office address in Jaipur, India, including street, city, state, and PIN code.
2. THE Contact_Section SHALL embed an interactive map (e.g., Google Maps iframe or equivalent) centered on the Jaipur office location.
3. THE Contact_Section SHALL include a WhatsApp contact button that, WHEN clicked, opens a WhatsApp chat with the Ujwal Gems business number pre-populated.
4. THE Contact_Section SHALL display the business phone number and email address as tappable links on mobile devices.
5. THE Contact_Section SHALL include the business operating hours (e.g., Monday–Saturday, 10:00 AM – 7:00 PM IST).
6. WHEN a Visitor clicks the WhatsApp button on a mobile device, THE Contact_Section SHALL open the WhatsApp application directly via the `https://wa.me/` deep link protocol.

---

### Requirement 10: Accessibility and Performance

**User Story:** As a Visitor using any device or assistive technology, I want the website to be usable and performant, so that I can access Ujwal Gems' content without barriers.

#### Acceptance Criteria

1. THE Website SHALL achieve a Lighthouse Accessibility score of 90 or above on desktop.
2. THE Website SHALL provide descriptive `alt` text for all non-decorative images, including certificate thumbnails and gemstone photographs.
3. THE Website SHALL ensure all interactive elements (buttons, links, form fields, filter options, Lightbox controls) are keyboard-navigable and have a visible focus indicator.
4. THE Website SHALL achieve a Google Lighthouse Performance score of 80 or above on desktop.
5. THE Website SHALL compress and serve all images in a modern format (WebP or AVIF) with appropriate dimensions to avoid serving oversized assets.
6. WHEN a Visitor navigates the Website using a screen reader, THE Lightbox SHALL announce its open/close state and the certificate caption via ARIA live regions or appropriate ARIA roles.
