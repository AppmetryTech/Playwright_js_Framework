chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        // Implement your ad-blocking rules here
        if (details.url.includes(".ads.")) {
            return { cancel: true };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);