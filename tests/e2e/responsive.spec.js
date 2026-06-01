import { test, expect } from '@playwright/test';

test.describe('Responsive layout', () => {
  test('Certification Vault grid: 1 column at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    // Wait for cert cards to render
    await page.waitForSelector('.cert-card', { timeout: 5000 }).catch(() => {});

    const certGrid = page.locator('.cert-grid');
    const gridColumns = await certGrid.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // At 320px, should be 1 column (single value, no spaces between column widths)
    const columnCount = gridColumns.trim().split(/\s+/).filter(v => v !== '').length;
    expect(columnCount).toBe(1);
  });

  test('Certification Vault grid: 2 columns at 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await page.waitForSelector('.cert-card', { timeout: 5000 }).catch(() => {});

    const certGrid = page.locator('.cert-grid');
    const gridColumns = await certGrid.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // At 768px, should be 2 columns
    const columnCount = gridColumns.trim().split(/\s+/).filter(v => v !== '').length;
    expect(columnCount).toBe(2);
  });

  test('Certification Vault grid: 3 columns at 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await page.waitForSelector('.cert-card', { timeout: 5000 }).catch(() => {});

    const certGrid = page.locator('.cert-grid');
    const gridColumns = await certGrid.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // At 1280px, should be 3 columns
    const columnCount = gridColumns.trim().split(/\s+/).filter(v => v !== '').length;
    expect(columnCount).toBe(3);
  });

  test('Gemstone Vault cards stack vertically at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    const gemGrid = page.locator('.gem-grid');
    const gridColumns = await gemGrid.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // At 320px, should be 1 column
    const columnCount = gridColumns.trim().split(/\s+/).filter(v => v !== '').length;
    expect(columnCount).toBe(1);
  });
});
