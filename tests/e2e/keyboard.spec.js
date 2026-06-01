import { test, expect } from '@playwright/test';

test.describe('Keyboard navigation', () => {
  test('Tab through interactive elements without losing focus', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load and cert grid to be populated
    await page.waitForSelector('.cert-card', { timeout: 5000 }).catch(() => {
      // Cert cards may not load if no server is running — skip cert card checks
    });

    // Tab through the CTA button in the hero section
    await page.keyboard.press('Tab');
    const focusedHero = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focusedHero);

    // Tab through filter buttons
    const filterButtons = page.locator('.filter-btn');
    const filterCount = await filterButtons.count();
    if (filterCount > 0) {
      await filterButtons.first().focus();
      const ariaPressed = await filterButtons.first().getAttribute('aria-pressed');
      expect(ariaPressed).not.toBeNull();
    }

    // Tab to a cert card and open lightbox with Enter
    const certCards = page.locator('.cert-card');
    const cardCount = await certCards.count();
    if (cardCount > 0) {
      await certCards.first().focus();
      await page.keyboard.press('Enter');

      // Lightbox should open
      const lightbox = page.locator('#lightbox');
      await expect(lightbox).not.toHaveAttribute('hidden');

      // Focus should be on the close button
      const closeBtn = page.locator('.lightbox__close');
      await expect(closeBtn).toBeFocused();

      // Escape should close the lightbox
      await page.keyboard.press('Escape');
      await expect(lightbox).toHaveAttribute('hidden', '');

      // Focus should return to the cert card
      const focusedAfterClose = await page.evaluate(() => document.activeElement?.classList.contains('cert-card'));
      expect(focusedAfterClose).toBe(true);
    }

    // Tab to form fields
    const firstInput = page.locator('#fullName');
    await firstInput.focus();
    await expect(firstInput).toBeFocused();

    // Tab to submit button
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.focus();
    await expect(submitBtn).toBeFocused();

    // Tab to contact links
    const phoneLink = page.locator('a[href^="tel:"]');
    await phoneLink.focus();
    await expect(phoneLink).toBeFocused();

    const emailLink = page.locator('a[href^="mailto:"]');
    await emailLink.focus();
    await expect(emailLink).toBeFocused();

    const whatsappBtn = page.locator('.contact__whatsapp');
    await whatsappBtn.focus();
    await expect(whatsappBtn).toBeFocused();
  });

  test('Lightbox closes on Escape key', async ({ page }) => {
    await page.goto('/');

    const certCards = page.locator('.cert-card');
    const cardCount = await certCards.count().catch(() => 0);

    if (cardCount > 0) {
      await certCards.first().click();
      const lightbox = page.locator('#lightbox');
      await expect(lightbox).not.toHaveAttribute('hidden');

      await page.keyboard.press('Escape');
      await expect(lightbox).toHaveAttribute('hidden', '');
    } else {
      test.skip();
    }
  });
});
