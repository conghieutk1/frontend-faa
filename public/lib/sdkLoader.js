(function () {
  window.LoadMobileSdk = function (callback) {
    callback = callback || function () {};

    var startApp = function () {
      XPMobileSDK.onLoad = callback;
      if (XPMobileSDK.isLoaded()) {
        callback();
      }
    };

    if ("XPMobileSDK" in window) {
      window.XPMobileSDK = XPMobileSDK;
      window.XPMobileSDKSettings = XPMobileSDKSettings;
      startApp();
    } else {
      script = document.createElement("script");
      script.addEventListener("load", startApp);
      script.src = "./XPMobileSDK.js";

      document.querySelector("head").appendChild(script);
    }
  };
})();
