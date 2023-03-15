// @ts-check
const { expect } = require('@playwright/test');

class ProductPage {

    constructor(page) {
        this.page = page;
        this.ClickOnProducts = page.getByRole('link', { name: ' Products' });
        this.products = page.locator("//div[@id='cartModal']/following-sibling::div");
       /* this. = page.locator('.choose > .nav > li > a').first().click();
        this. = page.getByRole('heading', { name: 'Blue Top' }).click();
        this. = page.getByText('Category: Women > Tops').click();
        this. = page.getByRole('img', { name: 'ecommerce website products' }).nth(2).click();
        this. = page.getByText('Rs. 500').click();
        this. = page.getByText('Availability:').click();
        this. = page.getByText('Availability: In Stock').click();
        this. = page.getByText('Condition:').click();
        this. = page.getByText('Condition: New').click();
        this. = page.getByText('Brand:').click();
        this. = page.getByText('Brand: Polo').click();
        this. = page.getByRole('img', { name: 'ecommerce website products' }).first().click();*/

    }

}