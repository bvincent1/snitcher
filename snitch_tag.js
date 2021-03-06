'use strict';

function main() {
  console.log("As above, so bellow");
  const endpoint = "https://8ohm943ypd.execute-api.us-east-1.amazonaws.com/dev/snitch";

  var ref = getParameterByName("ref");
  if (ref) {
    mutateLinks("ref=" + ref + "&");
  }

  const view = {
    ref: getParameterByName("ref"),
    href: window.location.href
  };

  $.post(endpoint, JSON.stringify(view));
}

function mutateLinks(query) {
  document.querySelectorAll("a").forEach(function (e,i,a) {
    if (e.href.indexOf("?") < 0) {
      e.href += "?" + query;
    }
    else {
      e.href += query;
    }

  });
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) {return null;}
  if (!results[2]) {return '';}
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

main();
