import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { initLightbox, openLightbox } from '../../js/lightbox.js';

// Feature: ujwal-gems-website, Property 6: Lightbox displays correct certificate metadata

const certifierLabels = { gia: 'GIA', igi: 'IGI', 'jaipur-lab': 'Jaipur Lab' };

const certificateArb = fc.record({
  id: fc.string({ minLength: 1 }),
  origin: fc.constantFrom('zambian', 'panjshir', 'colombian'),
  certifier: fc.constantFrom('gia', 'igi', 'jaipur-lab'),
  weightCt: fc.float({ min: Math.fround(0.1), max: Math.fround(50) }),
  thumbSrc: fc.string(),
  fullSrc: fc.string(),
  altText: fc.string(),
  caption: fc.string(),
});

describe('Lightbox certificate metadata — property tests', () => {
  beforeEach(() => {
    // Reset DOM between tests
    document.body.innerHTML = '';
  });

  it('Property 6: Lightbox displays correct certificate metadata', () => {
    // Feature: ujwal-gems-website, Property 6: Lightbox displays correct certificate metadata
    fc.assert(
      fc.property(
        certificateArb,
        (cert) => {
          // Reset DOM for each run
          document.body.innerHTML = '';

          // Initialise lightbox (injects HTML into body)
          initLightbox();

          // Open lightbox with the certificate
          openLightbox(cert);

          // Get the caption element
          const captionEl = document.querySelector('.lightbox__caption');
          expect(captionEl).not.toBeNull();

          const captionText = captionEl.textContent;

          // Caption must contain cert.caption
          expect(captionText).toContain(cert.caption);

          // Caption must contain the certifier label
          const expectedLabel = certifierLabels[cert.certifier];
          expect(captionText).toContain(expectedLabel);
        }
      ),
      { numRuns: 100 }
    );
  });
});
