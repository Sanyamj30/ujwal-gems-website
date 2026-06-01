/**
 * js/form.js — Wholesale Inquiry form validation module
 *
 * Responsibilities:
 *  - validateField(name, value): validates a single form field
 *  - validateForm(fields): validates all fields, returns false if any required field is invalid
 *
 * Implemented in Task 9
 */

/** @typedef {{ isValid: boolean, errorMessage: string | null }} FieldValidationResult */

/**
 * Validates a single form field by name and value.
 *
 * @param {string} name  — field name (e.g. "email", "phone", "quantity")
 * @param {string} value — current field value
 * @returns {FieldValidationResult}
 */
export function validateField(name, value) {
  const trimmed = (value || '').trim();

  switch (name) {
    case 'fullName':
    case 'businessName':
      if (!trimmed) {
        return { isValid: false, errorMessage: 'This field is required.' };
      }
      return { isValid: true, errorMessage: null };

    case 'phone':
      if (!trimmed) {
        return { isValid: false, errorMessage: 'Phone number is required.' };
      }
      // Allow digits, spaces, +, -, ()
      if (!/^[+\d\s\-().]{7,20}$/.test(trimmed)) {
        return { isValid: false, errorMessage: 'Please enter a valid phone number.' };
      }
      return { isValid: true, errorMessage: null };

    case 'email':
      if (!trimmed) {
        return { isValid: false, errorMessage: 'Email address is required.' };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return { isValid: false, errorMessage: 'Please enter a valid email address.' };
      }
      return { isValid: true, errorMessage: null };

    case 'origin':
      if (!trimmed) {
        return { isValid: false, errorMessage: 'Please select an emerald origin.' };
      }
      return { isValid: true, errorMessage: null };

    case 'quantity':
      if (!trimmed) {
        return { isValid: false, errorMessage: 'Quantity is required.' };
      }
      if (isNaN(Number(trimmed)) || Number(trimmed) <= 0) {
        return { isValid: false, errorMessage: 'Please enter a quantity greater than 0.' };
      }
      return { isValid: true, errorMessage: null };

    case 'message':
      // Optional field — always valid
      return { isValid: true, errorMessage: null };

    default:
      if (!trimmed) {
        return { isValid: false, errorMessage: 'This field is required.' };
      }
      return { isValid: true, errorMessage: null };
  }
}

/**
 * Validates all form fields. Returns false if any required field is invalid.
 * Does NOT mutate valid field values.
 *
 * @param {Record<string, string>} fields — map of field name → value
 * @returns {boolean} true if all required fields are valid
 */
export function validateForm(fields) {
  let allValid = true;
  for (const [name, value] of Object.entries(fields)) {
    const result = validateField(name, value);
    if (!result.isValid) {
      allValid = false;
    }
  }
  return allValid;
}
