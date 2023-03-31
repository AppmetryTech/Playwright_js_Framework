/*const { test: baseTest } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ContactFormPage } = require('../pages/ContactFormPage');
const { WidgetsPage } = require('@pages/WidgetsPage');
const { InteractionsPage } = require('@pages/InteractionsPage');
const { WebActions } = require('@lib/WebActions');

const test = baseTest.extend({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    contactFormPage: async ({ page, context }, use) => {
        await use(new ContactFormPage(page, context));
    },
    productsPage: async ({ page, context }, use) => {
        await use(new ProductsPage(page, context));
    },
    widgetsPage: async ({ page, context }, use) => {
        await use(new WidgetsPage(page, context));
    },
    interactionsPage: async ({ page, context }, use) => {
        await use(new InteractionsPage(page, context));
    }
});

module.exports = test;*/
