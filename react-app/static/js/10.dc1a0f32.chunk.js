webpackJsonp([10,22,32],{161:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t){this.ctx=t}return t.prototype.drawHead=function(t){this.ctx.save(),this.ctx.beginPath(),this.ctx.translate(0,4*Math.sin(t)),this.ctx.arc(80,-35,35,0,2*Math.PI),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()},t.prototype.drawBody=function(t){this.ctx.beginPath(),this.ctx.save(),this.ctx.rotate(Math.sin(t)*Math.PI/180*-1),this.ctx.translate(0,4*Math.sin(t)),this.ctx.scale(.5,.5);var e=new Path2D("M125,284 L1,284 C0.33333333,94.6666667 35,0 105,0 C115.666667,4 122.333333,20.6666667 125,50 L125,284 Z");this.ctx.fill(e),this.ctx.restore(),this.ctx.closePath()},t.prototype.drawFeet=function(t){t/=2,this.ctx.save(),this.ctx.scale(.5,.5),this.ctx.translate(0,460);var e=new Path2D("M23,0 C67,0 80,16 80,22 C80,26 78.6666667,28 76,28 C29.3333333,28 6,28 6,28 C6,28 -1.34111707e-14,30 0,17 C1.42108547e-14,4 10,1.9505735e-16 13,0 C16,0 13,0 23,0 Z");this.ctx.save(),this.ctx.translate(-50*Math.cos(t),Math.sin(t)>0?-35*Math.sin(t):0),t<Math.PI&&this.ctx.rotate(Math.sin(-Math.PI*t/2)*Math.PI/180*-5),this.ctx.fill(e),this.ctx.restore(),this.ctx.save(),this.ctx.translate(-50*Math.cos(t+Math.PI),Math.sin(t+Math.PI)>0?-35*Math.sin(t+Math.PI):0),t>Math.PI&&this.ctx.rotate(Math.sin(t+Math.PI)*Math.PI/180*-5),this.ctx.fill(e),this.ctx.restore(),this.ctx.restore()},t.prototype.drawShadow=function(t){this.ctx.beginPath(),this.ctx.save(),this.ctx.scale(.5,.5),this.ctx.translate(45,490),this.ctx.fillStyle="rgba(0, 0, 0, 0.1)",this.ctx.ellipse(0,0,120+10*Math.sin(t),8,0,0,2*Math.PI),this.ctx.fill(),this.ctx.restore(),this.ctx.closePath()},t.prototype.draw=function(t){t=t%Math.PI*2,this.ctx.fillStyle="#eee",this.ctx.save(),this.ctx.translate(.5*window.innerWidth-80,.5*window.innerHeight-80),this.drawShadow(t),this.drawHead(t),this.drawBody(t),this.drawFeet(t),this.ctx.restore()},t}();e.default=a},385:function(t,e,s){var a=s(550);"string"===typeof a&&(a=[[t.i,a,""]]);var n={hmr:!1,transform:void 0};s(374)(a,n);a.locals&&(t.exports=a.locals)},550:function(t,e,s){(t.exports=s(373)(!0)).push([t.i,".sad-man-wrapper{width:100%}","",{version:3,sources:["/Users/leonzhang/Documents/github/typescript/leon-ts-app/src/pages/SadMan/index.less"],names:[],mappings:"AAAA,iBACE,UAAY,CACb",file:"index.less",sourcesContent:[".sad-man-wrapper {\n  width: 100%;\n}\n"],sourceRoot:""}])},59:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,n=s(0),i=(s.n(n),s(385)),r=(s.n(i),s(161)),c=this&&this.__extends||(a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s])})(t,e)},function(t,e){function s(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(s.prototype=e.prototype,new s)}),o=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.tick=0,e.loop=function(){return e.draw()&&requestAnimationFrame(e.loop)},e.initCanvas=function(){var t=e.wrapper,s=t.offsetHeight,a=t.offsetWidth;e.ctx=e.canvas.getContext("2d"),e.sadman=new r.default(e.ctx),e.canvas.width=a,e.canvas.height=s},e.draw=function(){return!!e.canvas&&(e.ctx.clearRect(0,0,e.canvas.width,e.canvas.height),e.tick+=.05,e.sadman.draw(e.tick),!0)},e}return c(e,t),e.prototype.componentDidMount=function(){this.initCanvas(),this.loop()},e.prototype.render=function(){var t=this;return n.createElement("div",{className:"sad-man-wrapper",ref:function(e){return t.wrapper=e}},n.createElement("canvas",{ref:function(e){return t.canvas=e}}))},e}(n.Component);e.default=o}});
//# sourceMappingURL=10.dc1a0f32.chunk.js.map