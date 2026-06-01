import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { renderCertCard } from '../../js/filter.js';

// Feature: ujwal-gems-website, Property 1: Certificate card render fidelity

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

describe('Certificate card render fidelity — property tests', () => {
  it('Property 1: Certificate card render fidelity', () => {
    // Feature: ujwal-gems-website, Property 1: Certificate card render fidelity
    fc.assert(
      fc.property(
        fc.array(certificateArb, { minLength: 0, maxLength: 20 }),
        (certs) => {
          // Render all cards
          const cards = certs.map(cert => renderCertCard(cert));

          // No card is omitted and no extra cards are added
          expect(cards.length).toBe(certs.length);

          // For every certificate, the rendered card must match
          certs.forEach((cert, i) => {
            const card = cards[i];
            const img = card.querySelector('img');
            const caption = card.querySelector('.cert-card__caption');

            // img.src (via getAttribute to avoid jsdom URL resolution) matches thumbSrc
            expect(img.getAttribute('src')).toBe(cert.thumbSrc);

            // caption text matches cert.caption
            expect(caption.textContent).toBe(cert.caption);

            // img.alt matches cert.altText
            expect(img.alt).toBe(cert.altText);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
