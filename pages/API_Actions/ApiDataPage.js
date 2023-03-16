class ApiDataPage {
  constructor(request) {
    this.Request = request;

  }

  async fetchApiData() {
  
    const response = await this.request.get("https://automationexercise.com/api/productsList");
    const RespBody = JSON.parse(await response.text());
    return RespBody;
  }
}

module.exports = { ApiDataPage };