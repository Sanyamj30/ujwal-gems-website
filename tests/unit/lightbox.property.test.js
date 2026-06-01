import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { applyZoom, clampScale } from '../../js/lightbox.js';

describe('Lightbox zoom — property tests', () => {
  it('Property 5: Zoom stays within bounds with correct increments', () => {
    // Feature: ujwal-gems-website, Property 5: Zoom stays within bounds with correct increments
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('in', 'out'), { minLength: 1, maxLength: 50 }),
        (actions) => {
          let state = { scale: 1.0, panX: 0, panY: 0 };

          for (const direction of actions) {
            const prevScale = state.scale;
            const isAtMin = prevScale <= 1.0;
            const isAtMax = prevScale >= 4.0;

            state = applyZoom(state, direction);

            // Scale must always be within [1.0, 4.0]
            expect(state.scale).toBeGreaterThanOrEqual(1.0);
            expect(state.scale).toBeLessThanOrEqual(4.0);

            // If not at a boundary, scale must change by exactly 0.25
            if (direction === 'in' && !isAtMax) {
              expect(Math.abs(state.scale - prevScale)).toBeCloseTo(0.25, 10);
            }
            if (direction === 'out' && !isAtMin) {
              expect(Math.abs(state.scale - prevScale)).toBeCloseTo(0.25, 10);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
