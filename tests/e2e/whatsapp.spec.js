import { test, expect } from '@playwright/test';

test.describe('WhatsApp link', () => {
  test('WhatsApp button href starts with https://wa.me/', async ({ page }) => {
    await page.goto('/');

    const whatsappBtn = page.locator('.contact__whatsapp');
    const href = await whatsappBtn.getAttribute('href');

    expect(href).not.toBeNull();
    expect(href).toMatch(/^https:\/\/wa\.me\//);
  });
});
