import { test, expect } from '@playwright/test';

const breakpoints = {
  small: '[data-test-small]',
  medium: '[data-test-medium]',
  desktop: '[data-test-desktop]',
  large: '[data-test-large]',
  darkmode: '[data-test-darkmode]',
  largeAndDesktop: '[data-test-large-and-desktop]',
};

const matchesList = '[data-test-matches]';

test('matching breakpoints update as viewport and preferences change', async ({ page }) => {
  await page.setViewportSize({
    width: 399,
    height: 480,
  });

  await page.goto('/');

  await expect(page.locator(matchesList)).toHaveText('small');
  await expect(page.locator(breakpoints.small)).toHaveText('True');
  await expect(page.locator(breakpoints.medium)).toHaveText('False');
  await expect(page.locator(breakpoints.desktop)).toHaveText('False');
  await expect(page.locator(breakpoints.large)).toHaveText('False');
  await expect(page.locator(breakpoints.darkmode)).toHaveText('False');
  await expect(page.locator(breakpoints.largeAndDesktop)).toHaveText('False');

  await page.emulateMedia({ colorScheme: 'dark' });

  await expect(page.locator(matchesList)).toHaveText('small,darkmode');
  await expect(page.locator(breakpoints.small)).toHaveText('True');
  await expect(page.locator(breakpoints.medium)).toHaveText('False');
  await expect(page.locator(breakpoints.desktop)).toHaveText('False');
  await expect(page.locator(breakpoints.large)).toHaveText('False');
  await expect(page.locator(breakpoints.darkmode)).toHaveText('True');
  await expect(page.locator(breakpoints.largeAndDesktop)).toHaveText('False');

  await page.setViewportSize({
    width: 1400,
    height: 480,
  });

  await expect(page.locator(matchesList)).toHaveText('desktop,large,darkmode');
  await expect(page.locator(breakpoints.small)).toHaveText('False');
  await expect(page.locator(breakpoints.medium)).toHaveText('False');
  await expect(page.locator(breakpoints.desktop)).toHaveText('True');
  await expect(page.locator(breakpoints.large)).toHaveText('True');
  await expect(page.locator(breakpoints.darkmode)).toHaveText('True');
  await expect(page.locator(breakpoints.largeAndDesktop)).toHaveText('True');

  await page.setViewportSize({
    width: 798,
    height: 480,
  });

  await expect(page.locator(matchesList)).toHaveText('medium,darkmode');
  await expect(page.locator(breakpoints.small)).toHaveText('False');
  await expect(page.locator(breakpoints.medium)).toHaveText('True');
  await expect(page.locator(breakpoints.desktop)).toHaveText('False');
  await expect(page.locator(breakpoints.large)).toHaveText('False');
  await expect(page.locator(breakpoints.darkmode)).toHaveText('True');
  await expect(page.locator(breakpoints.largeAndDesktop)).toHaveText('False');

  await page.setViewportSize({
    width: 800,
    height: 480,
  });

  await expect(page.locator(matchesList)).toHaveText('desktop,darkmode');
  await expect(page.locator(breakpoints.small)).toHaveText('False');
  await expect(page.locator(breakpoints.medium)).toHaveText('False');
  await expect(page.locator(breakpoints.desktop)).toHaveText('True');
  await expect(page.locator(breakpoints.large)).toHaveText('False');
  await expect(page.locator(breakpoints.darkmode)).toHaveText('True');
  await expect(page.locator(breakpoints.largeAndDesktop)).toHaveText('False');
});
