const { test, expect, request } = require('@playwright/test');
const loginPayload = { email: "test_chetan@gmail.com", password: "Test@1234" };

test("POST To Verify Login with valid details", async ({ }) => {

    const req = await request.newContext();
    const loginResp = await req.post("https://automationexercise.com/api/verifyLogin",
        { data: loginPayload }
    )
    expect(loginResp.ok()).toBeTruthy();
    const responseBody = await loginResp.json();
    console.log(responseBody)


})

test("")

