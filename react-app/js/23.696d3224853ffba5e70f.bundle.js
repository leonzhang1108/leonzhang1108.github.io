(window.webpackJsonp=window.webpackJsonp||[]).push([[23,56],{343:function(t,e,n){},84:function(t,e,n){"use strict";n.r(e);var r,i=n(0),a=n.n(i),o=(n(343),r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=function(){return(s=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},l=function(t){function e(e){var n=t.call(this,e)||this;n.randomBoolean=function(){return Math.random()-.5>0},n.calculateOffset=function(t){var e=n.state.list;if(t!==e.length){if(e[t].offsetTop)return e[t].offsetTop;var r=e[t].height;return r+=n.calculateOffset(t-1),e[t]=s(s({},e[t]),{offsetTop:r}),n.setState({list:e}),r}},n.doCalculate=function(t){var e=n.state,r=e.list,i=e.offset,a=t-=i;t=t>0?t:0;var o=n.findEndIndex(t)+2*i+1;return o=(o=a<0?o+a:o)>r.length?r.length:o,{visibleData:r.slice(t,o),top:n.findTopByIndex(t)}},n.findTopByIndex=function(t){return t?n.state.list[t-1].offsetTop:0},n.findStartIndex=function(t){for(var e=n.state.list,r=0;r<e.length&&(e[r].offsetTop||n.calculateOffset(r),!(t<e[r].offsetTop));)r++;return r},n.findEndIndex=function(t){var e=n.state.visibleHeight,r=n.state.list;if(r[t].endIndex)return r[t].endIndex;e=e||n.wrapper.clientHeight;var i=n.calculateEndIndex(e,t);return r[t].endIndex=i,n.setState({list:r}),i},n.calculateEndIndex=function(t,e){void 0===e&&(e=0);for(var r=n.state.list;t>0;){if(e+1===r.length)break;t-=r[++e].height}return e},n.scrollHandler=function(t){var e=n.state.interval,r=n.findStartIndex(t.target.scrollTop);r%e==0&&n.setState(n.doCalculate(r))};for(var r=[],i=0;i<777;i++){var a=n.randomBoolean()?60:30,o={val:i,height:a};i||(o.offsetTop=a),r.push(o)}var l=r.reduce((function(t,e){return t+e.height}),0);return n.state={top:0,visibleHeight:0,visibleData:[],offset:10,interval:2,list:r,contentHeight:l},n}return o(e,t),e.prototype.componentDidMount=function(){var t=this.wrapper.clientHeight;this.setState(s({visibleHeight:t},this.doCalculate(0)))},e.prototype.render=function(){var t=this,e=this.state,n=e.visibleData,r=e.contentHeight,i=e.top;return a.a.createElement("div",{className:"infinite-list-wrapper",onScroll:this.scrollHandler,ref:function(e){t.wrapper=e}},a.a.createElement("div",{className:"infinite-list-ghost",style:{height:r}}),a.a.createElement("div",{className:"infinite-list",style:{transform:"translate3d(0, "+i+"px, 0)"}},n.map((function(t,e){var n={height:t.height+"px",lineHeight:t.height+"px"};return a.a.createElement("div",{className:"item",key:e,style:n},"item-"+t.val)}))))},e}(a.a.Component);e.default=l}}]);
//# sourceMappingURL=23.696d3224853ffba5e70f.bundle.js.map