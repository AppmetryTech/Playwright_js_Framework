// @ts-check
const { test, expect } = require('@playwright/test');
const { POManager } = require('../../pages/POManager');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
//import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';
import { ProductsPage } from '../../pages/ProductsPage';
let responseBody;
let productIndex = 5;
let name;
let price;
let brand;
let userType;
let category;

test.beforeAll(async ({ request }) => {
    const response = await request.get("https://automationexercise.com/api/productsList");
    responseBody = JSON.parse(await response.text());
    name = await responseBody.products[productIndex].name;
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
        productsPage.validateProductCount();
    });


    test("Validate API response with UI", async ({ page }) => {

        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        //apiData = poManager.getAPIData();
        await page.goto(url);
        /* const name = await responseBody.products[0].name;
         console.log("NAME --> " + name)*/
        //const apiItem = await apiData.products[0].name;
        await productsPage.validateData(responseBody);

    })

    test.only("Verify that on the product detail page detail is visible: product name, category, price, availability, condition, brand", async ({ page }) => {
        poManager = new POManager(page);
        productsPage = poManager.getProductsPage();
        await page.goto(url);

        console.log(`name--> ${name}  price -->${price}  brand -->${brand}  userType --> ${userType} category --> ${category}`)

        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(page);
        })
        await productsPage.clickOnViewProduct(name);

        await productsPage.validateProductDetail();
    })
})
