# playwright_JS_Web_API_Visual_pom
# E2E Playwright JavaScript Automation

## Overview
This project uses Playwright and the Page Object Model (POM) framework to perform end-to-end testing on web applications. It includes web testing, API testing and visual testing.

## Page Object Model (POM) Framework
The POM framework is used to organize test code and make it more maintainable. It involves creating a separate class for each page in the application being tested, with methods representing the actions that can be performed on that page.

##🔍 Visual Comparison Testing
This project uses Playwright's visual testing capabilities to compare screenshots of the expected and actual states of the web pages being tested. Visual comparison testing helps to ensure that UI changes do not introduce unexpected visual regressions.

##🧪 API Testing
In addition to web testing, this project includes API testing to verify the functionality of the backend services that support the web application being tested. This is achieved using tools such as Axios and Chai, and by sending requests to the API endpoints and verifying the responses.

##✅ Functional Testing
Functional testing ensures that the web application being tested meets the functional requirements specified in the project requirements. This project uses the POM framework to organize test code into separate classes for each page, with methods representing the actions that can be performed on that page. This helps to ensure that the test code is maintainable and easy to understand.

##🔢 Test Cases with Multi-Data Parameterization
This project includes test cases with multidata parameterization, which allows the same test code to be used to test different input values. This is achieved using test data files that contain input values for each test case, which are then used to execute the same test code with different data values.

##🤖 Automation using GitHub Actions
This project uses GitHub Actions to automate the testing process. GitHub Actions allow the test code to be executed automatically whenever changes are made to the codebase. This helps to ensure that any changes made to the codebase do not introduce unexpected regressions or break existing functionality.