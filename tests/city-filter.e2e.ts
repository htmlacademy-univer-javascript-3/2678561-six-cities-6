import { test, expect } from '@playwright/test';
import { MainPage } from './pages/main.page';

test.describe('City filter', () => {
  test('should change offers when selecting different city', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    const initialCity = await mainPage.getCurrentCity();
    expect(initialCity).toBe('Paris');

    await mainPage.selectCity('Cologne');

    const newCity = await mainPage.getCurrentCity();
    expect(newCity).toBe('Cologne');

    const activeCityName = await mainPage.getActiveCityName();
    expect(activeCityName).toBe('Cologne');

    const offersCountInCologne = await mainPage.offerCards.count();

    if (offersCountInCologne === 0) {
      await expect(page.locator('.cities__status')).toBeVisible();
      await expect(page.locator('.cities__status')).toContainText('No places to stay available');
    }

    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('should display empty state when city has no offers', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    await mainPage.selectCity('Hamburg');

    const offersCount = await mainPage.offerCards.count();
    
    if (offersCount === 0) {
      await expect(page.locator('.cities__status')).toBeVisible();
      await expect(page.locator('.cities__status')).toContainText('No places to stay available');
      await expect(page.locator('.cities__status-description')).toContainText('Hamburg');
    } else {
      expect(offersCount).toBeGreaterThan(0);
    }
  });

  test('should highlight selected city tab', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
    
    for (const city of cities) {
      await mainPage.selectCity(city);

      const activeCityName = await mainPage.getActiveCityName();
      expect(activeCityName).toBe(city);

      const currentCity = await mainPage.getCurrentCity();
      expect(currentCity).toBe(city);
    }
  });
});
