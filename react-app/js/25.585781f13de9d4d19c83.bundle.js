(window.webpackJsonp=window.webpackJsonp||[]).push([[25,60],{490:function(t,n,o){},86:function(t,n,o){"use strict";o.r(n);var e,c=o(10),r=o(1),i=o.n(r),p=(o(490),o(323)),u=(e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var o in n)n.hasOwnProperty(o)&&(t[o]=n[o])})(t,n)},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),a=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return u(n,t),n.prototype.componentDidMount=function(){this.cancel=Object(p.default)(this.canvas)},n.prototype.componentWillUnmount=function(){console.log("test"),this.cancel&&this.cancel()},n.prototype.render=function(){var t=this,n=this.props,o=n.height,e=n.width;return i.a.createElement("canvas",{ref:function(n){return t.canvas=n},height:o,width:e})},n}(i.a.Component);n.default=c.a.connect({component:a,mapStateToProps:function(t){return{height:t.common.contentHeight,width:t.common.contentWidth}}})}}]);
//# sourceMappingURL=25.585781f13de9d4d19c83.bundle.js.map