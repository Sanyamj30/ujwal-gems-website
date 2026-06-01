/**
 * js/main.js — Entry point for Ujwal Gems website
 *
 * Responsibilities:
 *  - Wholesale Inquiry form validation
 */

import { validateField } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- Wholesale Inquiry Form ---
  const inquiryForm = document.getElementById('inquiry-form');
  const formConfirmation = document.getElementById('form-confirmation');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect field values
      const fields = {
        fullName:     inquiryForm.querySelector('#fullName')?.value ?? '',
        businessName: inquiryForm.querySelector('#businessName')?.value ?? '',
        phone:        inquiryForm.querySelector('#phone')?.value ?? '',
        email:        inquiryForm.querySelector('#email')?.value ?? '',
        origin:       inquiryForm.querySelector('#origin')?.value ?? '',
        quantity:     inquiryForm.querySelector('#quantity')?.value ?? '',
        message:      inquiryForm.querySelector('#message')?.value ?? '',
      };

      // Validate each field and display inline errors
      let formIsValid = true;
      for (const [name, value] of Object.entries(fields)) {
        const result = validateField(name, value);
        const errorSpan = document.getElementById(`${name}-error`);
        if (errorSpan) {
          errorSpan.textContent = result.errorMessage ?? '';
        }
        if (!result.isValid) {
          formIsValid = false;
        }
      }

      if (formIsValid) {
        if (formConfirmation) {
          formConfirmation.removeAttribute('hidden');
        }
        formConfirmation?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        const firstErrorSpan = inquiryForm.querySelector('.field-error:not(:empty)');
        if (firstErrorSpan) {
          const fieldId = firstErrorSpan.id.replace('-error', '');
          document.getElementById(fieldId)?.focus();
        }
      }
    });

    // Clear error on input change
    inquiryForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        const errorSpan = document.getElementById(`${field.name}-error`);
        if (errorSpan) errorSpan.textContent = '';
      });
    });
  }
});
