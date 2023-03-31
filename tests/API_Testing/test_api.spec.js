const { test, expect } = require('@playwright/test');
const { APIActions } = require('../../pages/API_Actions/api_action');
const { testConfig } = require('../../Data/login_data')
const loginPayload = { email: "test_chetan@gmail.com", password: "Test@1234" };

const apiActions = new APIActions();


test(`@API getAllProductList`, async ({ request }) => {
    const responseList = await request.get(testConfig.APIURI);
    expect(await responseList.status()).toBe(200);
    expect(await responseList.ok()).toBeTruthy();
    const RespBody = JSON.parse(await responseList.text());
    const name = await RespBody.products[0].name;
    console.log("NAME --> " + name)
    console.log("BODY ---->" + RespbBody)

})

test(`@API getBrand List`, async ({ request }) => {
    const response = await request.get(testConfig.APIURI);
    expect(await response.status()).toBe(200);
    expect(await response.ok()).toBeTruthy();

})


