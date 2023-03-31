// @ts-check
const { test } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
const { testConfig } = require('../../Data/login_data')
import fetch from 'cross-fetch';

let responseBody;
let productIndex = 12;
let ProductName;
let price;
let brand;
let userType;
let category;

test.beforeAll(async ({ request }) => {
    const response = await request.get(testConfig.APIURI);
    responseBody = JSON.parse(await response.text());
    ProductName = await responseBody.products[productIndex].name;
    price = await responseBody.products[productIndex].price;
    brand = await responseBody.products[productIndex].brand;
    userType = await responseBody.products[productIndex].category.usertype.usertype;
    category = await responseBody.products[productIndex].category.category;
})

test.describe('@e2e Scenario:-> Validate Product Page', () => {
    let poManager;
    let productsPage;
    test('TC_03 Validate the Product count', async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await page.goto(testConfig.productUrl);
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        });
        productsPage.validateProductCount(34);
    });

    test("TC_04 Validate API response with UI", async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await page.goto(testConfig.productUrl);
        await productsPage.validateData(responseBody);
    })

    test("TC_05 Verify that on the product detail page detail is visible: product ProductName, category, price, availability, condition, brand", async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await page.goto(testConfig.productUrl);
        console.log(`ProductName--> ${ProductName}  price -->${price}  brand -->${brand}  userType --> ${userType} category --> ${category}`)
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        })
        await productsPage.clickOnViewProduct(ProductName);
        await productsPage.validateProductDetail();
    })

    //test with test.step
    test("TC_06 Verify all the products related to search are visible", async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await test.step(`Navigate to Product Page --> ${testConfig.productUrl}`, async () => {
            await productsPage.navigateToProductsPage();
        })
        await test.step(`Search Product on Product Detail page --> product ProductName --> ${ProductName}`, async () => {
            await productsPage.searchProduct(ProductName);
        })
        await test.step(`Verify the Search Product is showing --> Searched Product --> ${ProductName}`, async () => {
            await productsPage.validateSearchedProduct(ProductName);
        })
    })

})
