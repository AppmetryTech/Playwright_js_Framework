// @ts-check
const { expect } = require('@playwright/test');
const { PlaywrightBlocker } = require('@cliqz/adblocker-playwright')
import fetch from 'cross-fetch';

class ProductsPage {

    constructor(page, request) {
        this.page = page;
        this.request = request;
        // this.ClickOnProducts = page.getByRole('link', { name: ' Products' });
        this.ClickOnProducts = page.getByText("Products");
        this.products = page.locator("//div[@id='cartModal']/following-sibling::div");
        this.saleBanner = page.locator("#sale_image");
        this.productName = page.locator("//div[@class='productinfo text-center']//p")
        this.viewProduct = page.locator("//div[@class='choose']//a")
        this.dressName = page.locator("//div[@class='product-information']//h2");
        this.price = page.locator("//div[@class='product-information']//span");
        this.brandName = page.locator("//b[text()='Brand:']");
        this.searchBox = page.locator("#search_product");
        this.submitSearch = page.locator("#submit_search");
    }

    async navigateToProductsPage() {
        await this.page.goto("https://automationexercise.com/products");


    }

    async validateSaleBanner() {
        await this.saleBanner.waitFor();

        expect(await this.saleBanner.screenshot()).toMatchSnapshot('VisualTestData/sale_banner.jpg');

    }

    async validateProductCount(ExpectedProductCount) {
        const allproducts = await this.products.count();
        console.log("Number Of Present --> " + allproducts)
        expect(allproducts).toBe(ExpectedProductCount)
    }

    async validateData(apiData) {
        const productCount = await this.productName.count();
        console.log("ProductCount --> " + productCount)

        for (let i = 0; i < productCount; i++) {
            const apiItem = await apiData.products[i].name;
            const rowText = await this.productName.nth(i).textContent();
            console.log(`--UI TEXT-- ${rowText}  --API TEXT--  ${apiItem}`)
            expect(rowText).toBe(apiItem);
        }
    }

    async searchProduct(ProductName) {
        await this.searchBox.waitFor();
        await this.searchBox.fill(ProductName);
        await this.submitSearch.click();
    }

    async validateSearchedProduct(ProductName) {
        const productCount = await this.productName.count();
        console.log("ProductCount --> " + productCount)
        for (let i = 0; i < productCount; i++) {

            const rowText = await this.productName.nth(i).textContent();
            console.log(`--UI TEXT-- ${rowText}`)
            expect(rowText).toBe(ProductName);
        }

    }

    async clickOnViewProduct(ProductName) {

        const count = await this.productName.count();
        console.log(`view product count ${await this.viewProduct.count()}`)
        console.log("No of Product -->" + count);
        for (let i = 0; i < count; ++i) {
            if (await this.productName.nth(i).textContent() === ProductName) {
                await this.page.waitForLoadState()
                await this.viewProduct.nth(i).click();
                await this.page.goto('https://automationexercise.com/product_details/' + i)
                break;
            }
        }
    }

    async validateProductDetail() {
        const productName = await this.dressName.textContent();
        const price = await this.price.nth(1).textContent();
        const brandName = await this.brandName.textContent();
        console.log(`productName ${productName} price ${price} brandName ${brandName}`)
    }

    async adsBlocker() {
        PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
            blocker.enableBlockingInPage(this.page);
        })
    }



}

module.exports = { ProductsPage }