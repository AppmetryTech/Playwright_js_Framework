// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
//import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';
let responseBody;

test.beforeAll(async ({ request }) => {
    const response = await request.get("https://automationexercise.com/api/productsList");
    responseBody = JSON.parse(await response.text());
})


test.describe('Test Case 8: Validate Product Count', () => {
    let poManager;
    let productsPage;
    const url = "https://automationexercise.com/products";


    test('Verify ContactUs Button on HomePage', async ({ page }) => {
        //await page.goto('/');
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await page.goto(url);
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        });
        // /*await page.route("**/*", (request) => {
        /*  request.request().url().startsWith("https://pagead2.googlesyndication.com")
              ? request.abort()
              : request.continue();
          return;
      });*/
        productsPage.validateSaleBanner();
        productsPage.validateProductCount();
    });


    test.only("Validate API response with UI", async ({ page }) => {

        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        //apiData = poManager.getAPIData();

        await page.goto(url);
        /* const name = await responseBody.products[0].name;
         console.log("NAME --> " + name)*/
        //const apiItem = await apiData.products[0].name;
        await productsPage.validateData(responseBody);

    })
})