(window.webpackJsonp=window.webpackJsonp||[]).push([[8,36,46,53],{166:function(e,t,n){"use strict";n.r(t);var r=n(21),a=function(e){var t=e.key,n=e.words,a=e.w,i=e.h;this.text=t,this.x=Math.random()*a,this.y=Math.random()*i,this.font=10*n[t]+"px arial",this.speed=(n[t]>5?n[t]-2.5:n[t])+r.a.random(0,5)};t.default=a},167:function(e){e.exports=JSON.parse('{"蒸羊羔儿":10,"蒸熊掌":10,"蒸鹿尾儿":10,"烧花鸭":6,"烧雏鸡":6,"烧子鹅":6,"卤猪":6,"卤鸭":6,"香肠儿":6,"银鱼":6,"清蒸哈什蚂":2,"烩鸭丝":2,"烩鸭腰":2,"清拌鸭丝儿":2,"黄心管儿":2,"焖白鳝":2,"焖黄鳝":2,"豆豉鲇鱼":2,"锅烧鲤鱼":2,"烀烂甲鱼":2,"抓炒鲤鱼":2,"抓炒对虾":2,"软炸里脊":2,"软炸鸡":2,"什锦套肠儿":2,"卤煮寒鸦儿":2,"麻酥油卷儿":2,"熘鲜蘑":2,"熘鱼脯":2,"熘鱼肚":2,"熘鱼片儿":2,"醋熘肉片儿":2,"烩三鲜儿":2,"烩白蘑":2,"烩鸽子蛋":2,"炒银丝":2,"烩鳗鱼":2,"炒白虾":2,"炝青蛤":2,"炒面鱼":2,"炒竹笋":2,"芙蓉燕菜":2,"炒虾仁儿":2,"烩腰花儿":2,"烩海参":2,"炒蹄筋儿":2,"锅烧海参":2,"锅烧白菜":2,"炸木耳":2}')},338:function(e,t,n){},366:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.fillRef=i,t.composeRef=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){i(t,e)}))}},t.supportRef=function(e){var t,n,a=(0,r.isMemo)(e)?e.type.type:e.type;if("function"==typeof a&&!(null===(t=a.prototype)||void 0===t?void 0:t.render))return!1;if("function"==typeof e&&!(null===(n=e.prototype)||void 0===n?void 0:n.render))return!1;return!0};var r=n(39);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){"function"==typeof e?e(t):"object"===a(e)&&e&&"current"in e&&(e.current=t)}},367:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(r=n(501))&&r.__esModule?r:{default:r};t.default=a,e.exports=a},368:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(r=n(503))&&r.__esModule?r:{default:r};t.default=a,e.exports=a},369:function(e,t,n){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=(r=n(505))&&r.__esModule?r:{default:r};t.default=a,e.exports=a},371:function(e,t,n){"use strict";n.r(t),n.d(t,"ResizableTextArea",(function(){return C}));var r=n(11),a=n(13),i=n(15),o=n(45),s=n(35),u=n(0),c=n(5),l=n(1),f=n(18),d=n(68),p=n(139),h=n(24),v=n(42),m=n(69),b=function(e){Object(i.a)(n,e);var t=Object(f.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).resizeObserver=null,e.childNode=null,e.currentElement=null,e.state={width:0,height:0,offsetHeight:0,offsetWidth:0},e.onResize=function(t){var n=e.props.onResize,r=t[0].target,a=r.getBoundingClientRect(),i=a.width,o=a.height,s=r.offsetWidth,u=r.offsetHeight,c=Math.floor(i),f=Math.floor(o);if(e.state.width!==c||e.state.height!==f||e.state.offsetWidth!==s||e.state.offsetHeight!==u){var d={width:c,height:f,offsetWidth:s,offsetHeight:u};e.setState(d),n&&Promise.resolve().then((function(){n(Object(l.a)(Object(l.a)({},d),{},{offsetWidth:s,offsetHeight:u}))}))}},e.setChildNode=function(t){e.childNode=t},e}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.onComponentUpdated()}},{key:"componentDidUpdate",value:function(){this.onComponentUpdated()}},{key:"componentWillUnmount",value:function(){this.destroyObserver()}},{key:"onComponentUpdated",value:function(){if(this.props.disabled)this.destroyObserver();else{var e=Object(d.a)(this.childNode||this);e!==this.currentElement&&(this.destroyObserver(),this.currentElement=e),!this.resizeObserver&&e&&(this.resizeObserver=new m.a(this.onResize),this.resizeObserver.observe(e))}}},{key:"destroyObserver",value:function(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}},{key:"render",value:function(){var e=this.props.children,t=Object(p.a)(e);if(t.length>1)Object(h.a)(!1,"Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if(0===t.length)return Object(h.a)(!1,"`children` of ResizeObserver is empty. Nothing is in observe."),null;var n=t[0];if(u.isValidElement(n)&&Object(v.c)(n)){var r=n.ref;t[0]=u.cloneElement(n,{ref:Object(v.a)(r,this.setChildNode)})}return 1===t.length?t[0]:t.map((function(e,t){return!u.isValidElement(e)||"key"in e&&null!==e.key?e:u.cloneElement(e,{key:"".concat("rc-observer-key","-").concat(t)})}))}}]),n}(u.Component);b.displayName="ResizeObserver";var y,g,O=b,x=n(38),z=n(4),w=n.n(z),S="\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n",j=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","font-variant","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"],A={};function E(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.getAttribute("id")||e.getAttribute("data-reactid")||e.getAttribute("name");if(t&&A[n])return A[n];var r=window.getComputedStyle(e),a=r.getPropertyValue("box-sizing")||r.getPropertyValue("-moz-box-sizing")||r.getPropertyValue("-webkit-box-sizing"),i=parseFloat(r.getPropertyValue("padding-bottom"))+parseFloat(r.getPropertyValue("padding-top")),o=parseFloat(r.getPropertyValue("border-bottom-width"))+parseFloat(r.getPropertyValue("border-top-width")),s=j.map((function(e){return"".concat(e,":").concat(r.getPropertyValue(e))})).join(";"),u={sizingStyle:s,paddingSize:i,borderSize:o,boxSizing:a};return t&&n&&(A[n]=u),u}function R(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?R(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):R(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(s.a)(e);if(t){var a=Object(s.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(o.a)(this,n)}}!function(e){e[e.NONE=0]="NONE",e[e.RESIZING=1]="RESIZING",e[e.RESIZED=2]="RESIZED"}(g||(g={}));var C=function(e){Object(i.a)(n,e);var t=_(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).saveTextArea=function(e){a.textArea=e},a.handleResize=function(e){var t=a.state.resizeStatus,n=a.props,r=n.autoSize,i=n.onResize;t===g.NONE&&("function"==typeof i&&i(e),r&&a.resizeOnNextFrame())},a.resizeOnNextFrame=function(){cancelAnimationFrame(a.nextFrameActionId),a.nextFrameActionId=requestAnimationFrame(a.resizeTextarea)},a.resizeTextarea=function(){var e=a.props.autoSize;if(e&&a.textArea){var t=e.minRows,n=e.maxRows,r=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;y||((y=document.createElement("textarea")).setAttribute("tab-index","-1"),y.setAttribute("aria-hidden","true"),document.body.appendChild(y)),e.getAttribute("wrap")?y.setAttribute("wrap",e.getAttribute("wrap")):y.removeAttribute("wrap");var a=E(e,t),i=a.paddingSize,o=a.borderSize,s=a.boxSizing,u=a.sizingStyle;y.setAttribute("style","".concat(u,";").concat(S)),y.value=e.value||e.placeholder||"";var c,l=Number.MIN_SAFE_INTEGER,f=Number.MAX_SAFE_INTEGER,d=y.scrollHeight;if("border-box"===s?d+=o:"content-box"===s&&(d-=i),null!==n||null!==r){y.value=" ";var p=y.scrollHeight-i;null!==n&&(l=p*n,"border-box"===s&&(l=l+i+o),d=Math.max(l,d)),null!==r&&(f=p*r,"border-box"===s&&(f=f+i+o),c=d>f?"":"hidden",d=Math.min(f,d))}return{height:d,minHeight:l,maxHeight:f,overflowY:c}}(a.textArea,!1,t,n);a.setState({textareaStyles:r,resizeStatus:g.RESIZING},(function(){cancelAnimationFrame(a.resizeFrameId),a.resizeFrameId=requestAnimationFrame((function(){a.setState({resizeStatus:g.RESIZED},(function(){a.resizeFrameId=requestAnimationFrame((function(){a.setState({resizeStatus:g.NONE}),a.fixFirefoxAutoScroll()}))}))}))}))}},a.renderTextArea=function(){var e=a.props,t=e.prefixCls,n=void 0===t?"rc-textarea":t,r=e.autoSize,i=e.onResize,o=e.className,s=e.disabled,l=a.state,f=l.textareaStyles,d=l.resizeStatus,p=Object(x.default)(a.props,["prefixCls","onPressEnter","autoSize","defaultValue","onResize"]),h=w()(n,o,Object(c.a)({},"".concat(n,"-disabled"),s));"value"in p&&(p.value=p.value||"");var v=N(N(N({},a.props.style),f),d===g.RESIZING?{overflowX:"hidden",overflowY:"hidden"}:null);return u.createElement(O,{onResize:a.handleResize,disabled:!(r||i)},u.createElement("textarea",Object.assign({},p,{className:h,style:v,ref:a.saveTextArea})))},a.state={textareaStyles:{},resizeStatus:g.NONE},a}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.resizeTextarea()}},{key:"componentDidUpdate",value:function(e){e.value!==this.props.value&&this.resizeTextarea()}},{key:"componentWillUnmount",value:function(){cancelAnimationFrame(this.nextFrameActionId),cancelAnimationFrame(this.resizeFrameId)}},{key:"fixFirefoxAutoScroll",value:function(){try{if(document.activeElement===this.textArea){var e=this.textArea.selectionStart,t=this.textArea.selectionEnd;this.textArea.setSelectionRange(e,t)}}catch(e){}}},{key:"render",value:function(){return this.renderTextArea()}}]),n}(u.Component);function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(s.a)(e);if(t){var a=Object(s.a)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Object(o.a)(this,n)}}var M=function(e){Object(i.a)(n,e);var t=P(n);function n(e){var a;Object(r.a)(this,n),(a=t.call(this,e)).focus=function(){a.resizableTextArea.textArea.focus()},a.saveTextArea=function(e){a.resizableTextArea=e},a.handleChange=function(e){var t=a.props.onChange;a.setValue(e.target.value,(function(){a.resizableTextArea.resizeTextarea()})),t&&t(e)},a.handleKeyDown=function(e){var t=a.props,n=t.onPressEnter,r=t.onKeyDown;13===e.keyCode&&n&&n(e),r&&r(e)};var i=void 0===e.value||null===e.value?e.defaultValue:e.value;return a.state={value:i},a}return Object(a.a)(n,[{key:"setValue",value:function(e,t){"value"in this.props||this.setState({value:e},t)}},{key:"blur",value:function(){this.resizableTextArea.textArea.blur()}},{key:"render",value:function(){return u.createElement(C,Object.assign({},this.props,{value:this.state.value,onKeyDown:this.handleKeyDown,onChange:this.handleChange,ref:this.saveTextArea}))}}],[{key:"getDerivedStateFromProps",value:function(e){return"value"in e?{value:e.value}:null}}]),n}(u.Component);t.default=M},501:function(e,t,n){"use strict";var r=n(2),a=n(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n(0)),o=r(n(502)),s=r(n(22)),u=function(e,t){return i.createElement(s.default,Object.assign({},e,{ref:t,icon:o.default}))};u.displayName="SearchOutlined";var c=i.forwardRef(u);t.default=c},502:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"}}]},name:"search",theme:"outlined"}},503:function(e,t,n){"use strict";var r=n(2),a=n(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n(0)),o=r(n(504)),s=r(n(22)),u=function(e,t){return i.createElement(s.default,Object.assign({},e,{ref:t,icon:o.default}))};u.displayName="EyeOutlined";var c=i.forwardRef(u);t.default=c},504:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"}},505:function(e,t,n){"use strict";var r=n(2),a=n(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n(0)),o=r(n(506)),s=r(n(22)),u=function(e,t){return i.createElement(s.default,Object.assign({},e,{ref:t,icon:o.default}))};u.displayName="EyeInvisibleOutlined";var c=i.forwardRef(u);t.default=c},506:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"}},81:function(e,t,n){"use strict";n.r(t);var r,a=n(365),i=n.n(a),o=(n(364),n(0)),s=n.n(o),u=(n(338),n(166)),c=n(167),l=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),f=i.a.Search,d=function(e){function t(t){var n=e.call(this,t)||this;return n.words={},n.onSearch=function(e){console.log(e)},n.initCanvas=function(e){n.words=e;var t=[],r=n.wrapper,a=r.offsetHeight,i=r.offsetWidth,o=n.words,s=n.canvas.getContext("2d");for(var c in n.canvas.width=i,n.canvas.height=a,s.fillStyle="#000",s.globalAlpha=.2,n.words)c&&t.push(new u.default({key:c,words:o,w:i,h:a}));var l=function(){t.forEach((function(e,n){s.font=t[n].font,s.fillText(t[n].text,t[n].x,t[n].y),t[n].width=s.measureText(t[n].text).width,s.stroke()})),t.forEach((function(e,n){t[n].x>i?(t[n].x=-t[n].width,t[n].y=Math.random()*a):t[n].x+=t[n].speed}))},f=function(){s.clearRect(0,0,i,a),l()};if(requestAnimationFrame){var d=function(){f(),requestAnimationFrame(d)};d()}else n.interval=setInterval(f,24)},n.state={loaded:!1},n}return l(t,e),t.prototype.componentDidMount=function(){var e=this;this.setState({loaded:!0},(function(){return e.initCanvas(c)}))},t.prototype.componentWillUnmount=function(){clearInterval(this.interval)},t.prototype.render=function(){var e=this,t=this.state.loaded;return s.a.createElement("div",{className:"food-wrapper",ref:function(t){return e.wrapper=t}},t?s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"input"},s.a.createElement(f,{placeholder:"food you want",enterButton:"Add",size:"large",onSearch:this.onSearch})),s.a.createElement("canvas",{id:"c",className:"canvas",ref:function(t){return e.canvas=t},style:{opacity:t?1:0}})):s.a.createElement("div",{className:"loader"}))},t}(s.a.Component);t.default=d}}]);
//# sourceMappingURL=8.734f1795c248fca34b39.bundle.js.map