
const { expect } = require('@playwright/test');

class APIActions {
    async verifyStatusCode(response) {
        await expect(response, `200 Status code was not displayed.`).toBeOK();
    }

    async verifyResponseBody(expectedResponseBodyParams, responsePart, responseType) {
        let status = true;
        let fieldNames = `Parameter`;
        const headers = expectedResponseBodyParams.split("|");
        const responseToString = JSON.stringify(responsePart).trim();
        for (let headerKey of headers) {
            if (!(responseToString.includes(headerKey.trim()))) {
                status = false;
                fieldNames = fieldNames + `, ` + headerKey;
                break;
            }
        }
        expect(status, `${fieldNames} was not present in ${responseType}`).toBe(true);
    }




}

module.exports = { APIActions };
