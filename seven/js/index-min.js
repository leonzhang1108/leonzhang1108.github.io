window.onload=function(){function e(e){var n,t,s;for(s=e.length;s;s--)n=Math.floor(Math.random()*s),t=e[s-1],e[s-1]=e[n],e[n]=t}function n(e,n){return e.className.match(new RegExp("(\\s|^)"+n+"(\\s|$)"))}function t(e,t){n(e,t)||(e.className+=" "+t)}function s(e,t){if(n(e,t)){var s=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(s," ")}}function a(){for(var e=document.getElementsByClassName("transformed");e.length>0;)s(e[0],"transformed")}function o(){for(var e=0;e<i.length;e++)n(this,i[e])&&(t(this,"transformed"),e==m?(m++,m==i.length&&($(document).snowFlurry({maxSize:5,numberOfFlakes:500,minSpeed:10,maxSpeed:20,color:"#fff",timeout:0}),$("text").each(function(){var e=$(this),n=e.html().split("");e.html("<tspan>"+n.join("</tspan><tspan>")+"</tspan>")}),$("html, body").animate({scrollTop:"777"},1e3))):(m=0,setTimeout(a,500)))}var l=document.getElementsByClassName("j-play")[0],r=document.getElementsByClassName("j-pause")[0],c=document.getElementsByClassName("j-audio")[0],i=["chandler","phoebe","joey","monica","ross","rachel"],m=0;e(i),$(".fr_item").on("click",function(){n(this,"transformed")||o.call(this)});var u=function(){return null!=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(navigator.userAgent)&&parseFloat(RegExp.$1)}();l.addEventListener("click",function(e){c.play(),l.style.display="none",r.style.display="block"}),r.addEventListener("click",function(e){c.pause(),r.style.display="none",l.style.display="block"}),u&&(console.log("Internet Explorer not supported"),document.getElementsByClassName("l-wrapper")[0].innerHTML='<div class="b-ie">Internet Explorer not supported</div>'),document.onmousedown=function(){return!1}};