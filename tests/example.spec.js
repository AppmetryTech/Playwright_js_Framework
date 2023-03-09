import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('test_chetan@gmail.com');
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').press('Tab');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('T');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Logged in as Chetan Motghare').click();
  await page.getByRole('link', { name: ' Logout' }).click();
});



test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('test_chetan@gmail.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('T');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Test@1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: 'Rs. 500 Blue Top Add to cart Rs. 500 Blue Top Add to cart' }).locator('a').nth(1).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Rs. 500').first().click();
  await page.getByText('Proceed To Checkout').click();
  await page.locator('#address_delivery').getByText('Mr. Chetan Motghare').click();
  await page.locator('#address_delivery').getByText('Test Company').click();
  await page.locator('#address_delivery').getByText('test 762 , tet').click();
  await page.locator('#address_delivery').getByText('MG ROAD').click();
  await page.locator('#address_delivery').getByText('Pune MH 400001').click();
  await page.locator('#address_delivery').getByText('India').click();
  await page.locator('#address_delivery').getByText('23415154123').click();
  await page.getByRole('row', { name: 'Total Amount Rs. 500' }).getByText('Rs. 500').click();
  await page.getByRole('link', { name: 'Blue Top' }).click();
  await page.goto('https://automationexercise.com/checkout');
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').press('CapsLock');
  await page.locator('input[name="name_on_card"]').fill('DEMO CARD');
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill('23425235432532');
  await page.getByPlaceholder('ex. 311').click();
  await page.getByPlaceholder('ex. 311').fill('234');
  await page.getByPlaceholder('MM').click();
  await page.getByPlaceholder('MM').fill('22');
  await page.getByPlaceholder('MM').click();
  await page.getByPlaceholder('MM').fill('12');
  await page.getByPlaceholder('YYYY').click();
  await page.getByPlaceholder('YYYY').fill('2027');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await page.getByText('Congratulations! Your order has been confirmed!').click();
  await page.getByText('Order Placed!').click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download Invoice' }).click();
  const download = await downloadPromise;
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
});