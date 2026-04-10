import { Locator, Page } from '@playwright/test';

export class MainPage {
  constructor(page: Page, url = 'http://localhost:5173/') {
    this.url = url;
    this.page = page;
    this.sortingDropdown = this.page.locator('.places__sorting-type');
    this.sortingOptions = this.page.locator('.places__options');
    this.offersList = this.page.locator('.cities__places-list');
    this.offerCards = this.page.locator('.place-card');
    this.offerPrices = this.page.locator('.place-card__price-value');
    this.cityTabs = this.page.locator('.locations__item-link');
    this.placesFound = this.page.locator('.places__found');
  }

  private readonly url: string;
  private readonly page: Page;
  public readonly sortingDropdown: Locator;
  public readonly sortingOptions: Locator;
  public readonly offersList: Locator;
  public readonly offerCards: Locator;
  public readonly offerPrices: Locator;
  public readonly cityTabs: Locator;
  public readonly placesFound: Locator;

  public async load(): Promise<void> {
    await this.page.goto(this.url);
  }

  public async openSorting(): Promise<void> {
    await this.sortingDropdown.click();
  }

  public async selectSorting(option: string): Promise<void> {
    await this.sortingOptions.locator(`text=${option}`).click();
  }

  public async getOfferPrices(): Promise<number[]> {
    const prices = await this.offerPrices.allTextContents();
    return prices.map(price => parseInt(price.replace('€', '').trim()));
  }

  public async selectCity(cityName: string): Promise<void> {
    await this.cityTabs.filter({ hasText: cityName }).click();
    await this.page.waitForTimeout(300);
  }

  public async getCurrentCity(): Promise<string> {
    const placesFoundText = await this.placesFound.textContent();
    const match = placesFoundText?.match(/in (.+)$/);
    return match ? match[1] : '';
  }

  public async getActiveCityTab(): Promise<Locator> {
    return this.page.locator('.locations__item-link.tabs__item--active');
  }

  public async getActiveCityName(): Promise<string | null> {
    const activeTab = await this.getActiveCityTab();
    const span = activeTab.locator('span');
    return await span.textContent();
  }
}
