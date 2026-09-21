(function () {
  var CMS = "srv1079154.hstgr.cloud";
  function wrap(url) {
    try {
      var u = String(url);
      if (u.indexOf(CMS) !== -1) return "/__cms?u=" + encodeURIComponent(u);
    } catch (e) {}
    return url;
  }
  var ofetch = window.fetch;
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : input && input.url;
    var nu = wrap(url);
    if (nu !== url) {
      if (typeof input === "string") return ofetch(nu, init);
      return ofetch(new Request(nu, input), init);
    }
    return ofetch.apply(this, arguments);
  };
  var ox = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var args = Array.prototype.slice.call(arguments);
    args[1] = wrap(url);
    return ox.apply(this, args);
  };
})();
