var channels = [
   "/channel/UCIR9VKPE70KJ4DX2zCjHObw",
   "/channel/UC_gV70G_Y51LTa3qhu8KiEA",
   "/user/felipeneto",
   "/user/luccasneto",
   "/user/irmaosneto",
]
let reg = /^.+.com/;

function getRedirectUrl() {
   let urls = [
      "https://www.youtube.com/user/destinws2/videos",
      "https://www.youtube.com/user/nerdologia/videos",
      "https://www.youtube.com/user/Pirulla25/videos",
      "https://www.youtube.com/user/iberethenorio/videos"
   ]
   return urls[Math.floor(Math.random() * urls.length)];
}


$(function () {
   handle()
})

var __ID = null

function handle() {
   if (channels.indexOf(location.href.replace(reg, '')) > -1) {
      $("video").get(0).pause()
      $('body').css("display", "none")
      location.href = getRedirectUrl();
      return;
   } else if (location.href.indexOf("/watch") > -1) {
      $("a").each(function (i, obj) {
         if (channels.indexOf(obj.href.replace(reg, '')) > -1) {
            $("video").get(0).pause()
            if (!$($("#top-level-buttons.style-scope.ytd-menu-renderer").find("button").parent().get(1)).hasClass("style-default-active")) {
               $("#top-level-buttons.style-scope.ytd-menu-renderer").find("button").get(1).click()
            }
            $('body').css("display", "none")
            setTimeout(function () {
               location.href = getRedirectUrl();
            }, 200)
            return false;
         }
      })
   } else {
      function __removeAll() {
         $("a").each(function (i, obj) {
            if (channels.indexOf(obj.href.replace(reg, '')) > -1) {
               let $obj = $(obj)
               $obj.parent().find("#subscribe-button").remove()
               $obj.closest("div.ytd-video-renderer").parent().parent().remove()
               $obj.closest("#dismissable").parent().remove()
            }
         })
      }
      __removeAll()
      if (__ID == null) {
         __ID = setInterval(__removeAll, 200);
      }
   }
}

chrome.runtime.onMessage.addListener(
   function (request, sender, sendResponse) {
      switch (request.action) {
         case "onUpdated":
            handle();
            break;
         default:
            break;
      }
      /*
      console.log(sender.tab ?
         "from a content script:" + sender.tab.url :
         "from the extension");
         */

      // if (request.greeting == "hello")
      //    sendResponse({ farewell: "goodbye" });
   }
);