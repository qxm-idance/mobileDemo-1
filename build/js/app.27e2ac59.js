!function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(){var e=[{records:"张三：187 xxxx 7777   100"},{records:"李四：187 xxxx 9999   200"},{records:"王二：187 xxxx 6666   300"},{records:"王yi：187 xxxx 1111   300"},{records:"王er：187 xxxx 2222   300"},{records:"王sa：187 xxxx 5555   300"},{records:"王si：187 xxxx 4444   300"}];e&&e.length>0&&!function(){var t=[];e.map(function(e){t.push("<li>"+e.records+"</li>")}),Array.prototype.slice.call(o).map(function(e){e.innerHTML=t.join("")}),e.length<4?o[0].parentNode.removeChild(o[1]):a(o[0],e.length)}()}r(2),r(1);var o=(document.getElementById("J-Status"),document.querySelectorAll(".J-D"));console.log(o);var a=function(e,t){var r=document.documentElement,n=document.createElement("style");r.firstElementChild.appendChild(n);var o=e.offsetHeight;console.log(o),e.parentNode.style.cssText=";-webkit-animation: marquees "+t+"s linear infinite; animation: marquees "+t+"s linear infinite;",n.innerHTML="@-webkit-keyframes marquees {from {-webkit-transform: translate(0, 0);  transform: translate( 0, 0); }to {  -webkit-transform: translate(0, -"+o+"px); transform: translate(0, -"+o+"px);} }@keyframes marquees {from {-webkit-transform: translate(0, 0);transform: translate(0, 0);}to {-webkit-transform: translate(0, -"+o+"px);transform: translate(0, -"+o+"px);}}"};n()},function(e,t){"use strict";"function"!=typeof Object.assign&&(Object.assign=function(e){if(null==e)throw new TypeError("Cannot convert undefined or null to object");e=Object(e);for(var t=1;t<arguments.length;t++){var r=arguments[t];if(null!=r)for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e})},function(e,t){}]);
//# sourceMappingURL=app.27e2ac59.js.map