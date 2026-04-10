import { test, expect } from '@playwright/test';
import { AuthPage } from './pages/auth.page';

test.describe('Authentication', () => {
  test('user can sign in with valid credentials', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.load();

    await authPage.emailInput.fill('test@example.com');
    await authPage.passwordInput.fill('password123');
    await authPage.signInButton.click();

    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('.header__signout')).toContainText('Sign out');
    await expect(page.locator('.header__user-name')).toContainText('test@example.com');
  });

  test('user cannot sign in with invalid credentials', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.load();

    await authPage.emailInput.fill('wrong@example.com');
    await authPage.passwordInput.fill('wrongpassword');
    await authPage.signInButton.click();

    await expect(page).toHaveURL('http://localhost:5173/login');
  });
});