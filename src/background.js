var channels = [
   "/channel/UCIR9VKPE70KJ4DX2zCjHObw",
   "/channel/UC_gV70G_Y51LTa3qhu8KiEA",
   "/user/felipeneto",
   "/user/luccasneto"
]

let reg = /^.+.com/;

chrome.tabs.onUpdated.addListener(function (tabId, data, tab) {
   chrome.tabs.sendMessage(tabId, { action: "onUpdated" }, function (response) {
      // console.log(response.farewell);
   });
})
