(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{177:function(t,e,n){"use strict";n.r(e);var o,r=n(0),i=n.n(r),f=(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=function(t){function e(e){var n=t.call(this,e)||this;return n.doInterval=function(){n.interval=setInterval((function(){n.intervalContent()}),3e3)},n.intervalContent=function(){var t=n.state,e=t.onOff,o=t.offsetWidth;n.setState({onOff:!e,offset:e?0:o})},n.clearInterval=function(){n.interval&&clearInterval(n.interval)},n.state={width:0,offset:0,onOff:!1,offsetWidth:0,wrapperWidth:0},n}return f(e,t),e.prototype.componentDidMount=function(){this.setState({wrapperWidth:this.wrapper.offsetWidth}),this.doInterval()},e.prototype.componentWillUnmount=function(){this.clearInterval()},e.prototype.componentDidUpdate=function(){var t=this.state.width;if(this.dom.offsetWidth!==t){var e=this.wrapper.offsetWidth-this.dom.offsetWidth;e=e<=0?e:0,this.setState({width:this.dom.offsetWidth,offsetWidth:e,onOff:!1})}},e.prototype.render=function(){var t=this,e=this.props.musicName,n=this.state,o=n.offset,r=n.offsetWidth;return i.a.createElement("div",{className:"music-name "+(0===r?"flex":""),ref:function(e){t.wrapper=e}},i.a.createElement("div",{style:{transform:"translateX("+o+"px)"},className:"content",ref:function(e){t.dom=e}},e))},e}(i.a.Component);e.default=a}}]);
//# sourceMappingURL=40.e70cb13dd713d37642f3.bundle.js.map