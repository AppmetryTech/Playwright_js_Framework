// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
import fetch from 'cross-fetch';

let responseBody;
let productIndex = 10;
let ProductName;
let price;
let brand;
let userType;
let category;

test.beforeAll(async ({ request }) => {
    const response = await request.get("https://automationexercise.com/api/productsList");
    responseBody = JSON.parse(await response.text());
    ProductName = await responseBody.products[productIndex].name;
    price = await responseBody.products[productIndex].price;
    brand = await responseBody.products[productIndex].brand;
    userType = await responseBody.products[productIndex].category.usertype.usertype;
    category = await responseBody.products[productIndex].category.category;
})




test.describe('Test Case 8: Validate Product Page', () => {
    let poManager;
    let productsPage;
    const url = "https://automationexercise.com/products";



    test('Validate the Product count', async ({ page }) => {
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
        productsPage.validateProductCount(34);
    });


    test("Validate API response with UI", async ({ page }) => {

        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        //apiData = poManager.getAPIData();
        await page.goto(url);
        /* const ProductName = await responseBody.products[0].ProductName;
         console.log("ProductName --> " + ProductName)*/
        //const apiItem = await apiData.products[0].ProductName;
        await productsPage.validateData(responseBody);

    })

    test("Verify that on the product detail page detail is visible: product ProductName, category, price, availability, condition, brand", async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await page.goto(url);

        console.log(`ProductName--> ${ProductName}  price -->${price}  brand -->${brand}  userType --> ${userType} category --> ${category}`)

        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        })
        await productsPage.clickOnViewProduct(ProductName);

        await productsPage.validateProductDetail();
    })

    //test with test.step
    test.only("Verify all the products related to search are visible", async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();

        //await productsPage.adsBlocker();
        await test.step(`Navigate to Product Page --> ${url}`, async () => {
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
