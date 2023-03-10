const { test, expect, request } = require('@playwright/test');
const { APIActions } = require('../../pages/API_Actions/api_action');
const loginPayload = { email: "test_chetan@gmail.com", password: "Test@1234" };


const apiActions = new APIActions();

test(`@API getUsers`, async ({ request }) => {
    const response = await request.get(`https://automationexercise.com/api/getUserDetailByEmail`, { data: { email: 'test_chetan@gmail.com' } });
    await apiActions.verifyStatusCode(response);
    console.log(response)

    const responseList = await request.get("https://automationexercise.com/api/productsList");
    await apiActions.verifyStatusCode(response);
    console.log(responseList)


})


