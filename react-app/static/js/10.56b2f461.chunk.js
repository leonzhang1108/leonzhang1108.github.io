webpackJsonp([10,15],{142:function(r,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={L:[[[0,0,1],[1,1,1]],[[1,0],[1,0],[1,1]],[[1,1,1],[1,0]],[[1,1],[0,1],[0,1]]],J:[[[1,0,0],[1,1,1]],[[0,1],[0,1],[1,1]],[[1,1,1],[0,0,1]],[[1,1],[1,0],[1,0]]],O:[[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]],[[1,1],[1,1]]],T:[[[0,1,0],[1,1,1]],[[1,0],[1,1],[1,0]],[[1,1,1],[0,1,0]],[[0,1],[1,1],[0,1]]],Z:[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]],[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],S:[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]],[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],I:[[[1,1,1,1]],[[1],[1],[1],[1]],[[1,1,1,1]],[[1],[1],[1],[1]]]}},150:function(r,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=t(22),u=t(142),a=37,c=39,l=40,f=function(r){r.width;var e=r.block,t=r.rx,n=r.y,o=r.playboard,u=r.length,a=[],c=!0;return e.forEach(function(r,e){r.every(function(r,t){return r&&a.push({x:t,y:e}),!0})}),a.every(function(r){var e=r.x,a=r.y,l=e+t,f=n+a-u;return f>=0&&f<20&&o[f][l]&&(c=!1),c}),c},i=((n={})[38]=function(r){r.width;var e=r.block,t=r.rx,n=r.y,o=r.playboard,u=r.length,a=!0;return e.every(function(r,e){return r.every(function(r,c){var l=c+t,f=n+e-u;return f>=0&&f<20&&o[f][l]&&(a=!1),a}),a}),a},n[l]=function(r){var e=r.width,t=r.block,n=r.rx,o=r.y,u=r.playboard,a=r.length;if(21===o)return!1;for(var c=!0,l=[],f=0;f<e;f++)for(var i=t.length-1,v=!0;i>=0&&v;)t[i][f]&&(l.push({x:f,y:i}),v=!1),i--;return l.every(function(r){var e=r.x,t=r.y,l=e+n,f=o+t-a;return f>=0&&f<20&&u[f][l]&&(c=!1),c}),c},n[a]=f,n[c]=f,n);e.default={getCurrPosition:function(r){var e=r.x,t=r.y,n=r.cBlock,a=r.screen,c=r.rotate,l=r.moveTo,f=o.a.clone(a),v=u.default[n][c],y=v[0].length,d=10-y,h=Math.floor((10-y)/2),b=v.length,s=t,p=h+e;p<0&&(p=0,e=-h),p>d&&(p=d,e=y%2===1?h+1:h);var x=i[l]({width:y,block:v,rx:p,y:t,playboard:f,length:b});if(x)for(;s>0&&b>0;){var g=--s,k=v[b-1];g=g>20?20:g;for(var w=0;w<10;w++){if(w<k.length)f[g][p+w]||(f[g][p+w]=k[w])}b--}return{playboard:f,x:e,screen:a,couldMove:x}}}}});
//# sourceMappingURL=10.56b2f461.chunk.js.map