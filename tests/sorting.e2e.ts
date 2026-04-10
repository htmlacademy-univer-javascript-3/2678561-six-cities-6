import { test, expect } from '@playwright/test';
import { MainPage } from './pages/main.page';

test.describe('Offers sorting', () => {
  test('should change offers order when sorting option selected', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.load();

    const firstOfferBefore = await mainPage.offerCards.first().locator('.place-card__name').textContent();
    const secondOfferBefore = await mainPage.offerCards.nth(1).locator('.place-card__name').textContent();
    const thirdOfferBefore = await mainPage.offerCards.nth(2).locator('.place-card__name').textContent();

    await mainPage.openSorting();
    await mainPage.selectSorting('Price: low to high');

    await page.waitForTimeout(500);

    const firstOfferAfter = await mainPage.offerCards.first().locator('.place-card__name').textContent();
    const secondOfferAfter = await mainPage.offerCards.nth(1).locator('.place-card__name').textContent();
    const thirdOfferAfter = await mainPage.offerCards.nth(2).locator('.place-card__name').textContent();

    const orderChanged = 
      firstOfferBefore !== firstOfferAfter || 
      secondOfferBefore !== secondOfferAfter || 
      thirdOfferBefore !== thirdOfferAfter;

    expect(orderChanged).toBe(true);
  });
});