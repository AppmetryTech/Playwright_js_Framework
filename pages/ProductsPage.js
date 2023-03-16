// @ts-check
const { expect } = require('@playwright/test');

class ProductsPage {

    constructor(page, request) {
        this.page = page;
        this.request = request;
        // this.ClickOnProducts = page.getByRole('link', { name: ' Products' });
        this.ClickOnProducts = page.getByText("Products");
        this.products = page.locator("//div[@id='cartModal']/following-sibling::div");
        this.saleBanner = page.locator("#sale_image");
        this.productName = page.locator("//div[@class='productinfo text-center']//p")
    }

    async navigateToProductsPage() {
        await this.page.goto("https://automationexercise.com/products");


    }

    async validateSaleBanner() {
        await this.saleBanner.waitFor();

        expect(await this.saleBanner.screenshot()).toMatchSnapshot('VisualTestData/sale_banner.jpg');

    }

    async validateProductCount() {
        const allproducts = await this.products.count();
        console.log("Number Of Present --> " + allproducts)
        expect(allproducts).toBe(34)
    }

    async validateData(apiData) {

        const rowText = await this.productName.nth(3).textContent();
        console.log(rowText);
        //const apiItem = await RespBody.products[0].name;
        // console.log("UI TEXT -->   API TEXT --> " + apiItem)
        const productCount = await this.productName.count();
        console.log("ProductCount --> " + productCount)

        for (let i = 0; i < productCount; i++) {
            const apiItem = await apiData.products[i].name;
            const rowText = await this.productName.nth(i).textContent();
            // console.log(" **UI TEXT --> " + rowText + " **API TEXT --> " + apiItem)
            console.log(`--UI TEXT-- ${rowText}  --API TEXT--  ${apiItem}`)
            expect(rowText).toBe(apiItem);
        }
    }



}

module.exports = { ProductsPage }