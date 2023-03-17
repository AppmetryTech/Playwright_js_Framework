const { test, expect } = require('@playwright/test');
const { APIActions } = require('../../pages/API_Actions/api_action');
const loginPayload = { email: "test_chetan@gmail.com", password: "Test@1234" };

const apiActions = new APIActions();


test(`@API getAllProductList`, async ({ request }) => {
    const responseList = await request.get("https://automationexercise.com/api/productsList");
    expect(await responseList.status()).toBe(200);
    expect(await responseList.ok()).toBeTruthy();
    const RespBody = JSON.parse(await responseList.text());
    const name = await RespBody.products[0].name;
    console.log("NAME --> " + name)
    console.log("BODY ---->" + RespbBody)

})

test(`@API getBrand List`, async ({ request }) => {
    const response = await request.get("https://automationexercise.com/api/brandsList");
    expect(await response.status()).toBe(200);
    expect(await response.ok()).toBeTruthy();

})


