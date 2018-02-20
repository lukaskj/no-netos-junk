let reg = /^.+.com/;

chrome.tabs.onUpdated.addListener(function (tabId, data, tab) {
   chrome.tabs.sendMessage(tabId, { action: "onUpdated" }, function (response) {
      // console.log(response.farewell);
   });
})
