import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateField, validateForm } from '../../js/form.js';

describe('Form validation — property tests', () => {
  it('Property 7: Form validation preserves valid field values on failed submission', () => {
    // Feature: ujwal-gems-website, Property 7: Form validation preserves valid field values on failed submission

    // Arbitraries for each field type
    const validName = fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0);
    const validPhone = fc.constantFrom('+91 98765 43210', '9876543210', '+1-800-555-0100', '07700 900123');
    const validEmail = fc.constantFrom('buyer@example.com', 'trade@gems.in', 'wholesale@co.uk');
    const validOrigin = fc.constantFrom('zambian', 'panjshir', 'colombian', 'all');
    const validQuantity = fc.float({ min: Math.fround(0.01), max: Math.fround(1000) }).map(n => String(Math.round(n * 100) / 100));
    const validMessage = fc.string();

    // Invalid values for required fields
    const invalidValue = fc.constantFrom('', '   ');

    fc.assert(
      fc.property(
        // Generate a fields object where at least one required field is invalid
        fc.record({
          fullName:     fc.oneof(validName, invalidValue),
          businessName: fc.oneof(validName, invalidValue),
          phone:        fc.oneof(validPhone, invalidValue),
          email:        fc.oneof(validEmail, invalidValue),
          origin:       fc.oneof(validOrigin, invalidValue),
          quantity:     fc.oneof(validQuantity, invalidValue),
          message:      validMessage, // always valid (optional)
        }).filter(fields => {
          // Ensure at least one required field is invalid
          const requiredFields = ['fullName', 'businessName', 'phone', 'email', 'origin', 'quantity'];
          return requiredFields.some(name => !validateField(name, fields[name]).isValid);
        }),
        (fields) => {
          // Snapshot valid field values before calling validateForm
          const snapshot = { ...fields };

          // validateForm must return false (at least one required field is invalid)
          const result = validateForm(fields);
          expect(result).toBe(false);

          // Every field value must be unchanged after validateForm
          for (const [name, value] of Object.entries(snapshot)) {
            expect(fields[name]).toBe(value);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
