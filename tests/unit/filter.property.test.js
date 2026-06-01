import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterCards, setActiveFilter } from '../../js/filter.js';

/**
 * Arbitrary for a Certificate object matching the data model in design.md
 */
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

describe('Filter functions — property tests', () => {
  /**
   * Property 2: Filter shows only matching cards
   * Validates: Requirements 6.3
   */
  it('Property 2: Filter shows only matching cards', () => {
    // Feature: ujwal-gems-website, Property 2: Filter shows only matching cards
    fc.assert(
      fc.property(
        fc.constantFrom('zambian', 'panjshir', 'colombian', 'gia', 'igi', 'jaipur-lab'),
        fc.array(certificateArb),
        (filter, cards) => {
          const result = filterCards(cards, filter);

          // Every returned card must match the filter (no false positives)
          for (const card of result) {
            expect(card.origin === filter || card.certifier === filter).toBe(true);
          }

          // Every card in the input that matches the filter must be in the result (no false negatives)
          const expectedMatches = cards.filter(
            (card) => card.origin === filter || card.certifier === filter
          );
          expect(result.length).toBe(expectedMatches.length);
          for (const card of expectedMatches) {
            expect(result).toContain(card);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: "All" filter restores the complete set
   * Validates: Requirements 6.4
   */
  it('Property 3: "All" filter restores the complete set', () => {
    // Feature: ujwal-gems-website, Property 3: "All" filter restores the complete set
    fc.assert(
      fc.property(
        fc.array(certificateArb),
        fc.constantFrom('zambian', 'panjshir', 'colombian', 'gia', 'igi', 'jaipur-lab'),
        (cards, _priorFilter) => {
          // Simulate having applied a prior filter, then switching to "all"
          const result = filterCards(cards, 'all');

          // Result must have the same length as the original array
          expect(result.length).toBe(cards.length);

          // Result must contain exactly the same elements as the original array
          for (const card of cards) {
            expect(result).toContain(card);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Exactly one active filter button at all times
   * Validates: Requirements 6.5
   */
  it('Property 4: Exactly one active filter button at all times', () => {
    // Feature: ujwal-gems-website, Property 4: Exactly one active filter button at all times
    fc.assert(
      fc.property(
        fc.constantFrom('all', 'zambian', 'panjshir', 'colombian', 'gia', 'igi', 'jaipur-lab'),
        (filter) => {
          // Create 7 mock button elements using jsdom (available via vitest.config.js environment: "jsdom")
          const filterValues = ['all', 'zambian', 'panjshir', 'colombian', 'gia', 'igi', 'jaipur-lab'];
          const buttons = filterValues.map((value) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = value;
            btn.setAttribute('aria-pressed', 'false');
            return btn;
          });

          setActiveFilter(buttons, filter);

          // Exactly one button must have aria-pressed="true" and the active class
          const activeButtons = buttons.filter(
            (btn) => btn.getAttribute('aria-pressed') === 'true'
          );
          expect(activeButtons.length).toBe(1);
          expect(activeButtons[0].dataset.filter).toBe(filter);
          expect(activeButtons[0].classList.contains('filter-btn--active')).toBe(true);

          // All other buttons must have aria-pressed="false" and no active class
          const inactiveButtons = buttons.filter(
            (btn) => btn.getAttribute('aria-pressed') !== 'true'
          );
          expect(inactiveButtons.length).toBe(filterValues.length - 1);
          for (const btn of inactiveButtons) {
            expect(btn.getAttribute('aria-pressed')).toBe('false');
            expect(btn.classList.contains('filter-btn--active')).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
