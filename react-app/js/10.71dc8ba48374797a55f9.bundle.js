(window.webpackJsonp=window.webpackJsonp||[]).push([[10,66],{468:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={transitionstart:{transition:"transitionstart",WebkitTransition:"webkitTransitionStart",MozTransition:"mozTransitionStart",OTransition:"oTransitionStart",msTransition:"MSTransitionStart"},animationstart:{animation:"animationstart",WebkitAnimation:"webkitAnimationStart",MozAnimation:"mozAnimationStart",OAnimation:"oAnimationStart",msAnimation:"MSAnimationStart"}},o={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},r=[],s=[];function a(e,t,n){e.addEventListener(t,n,!1)}function l(e,t,n){e.removeEventListener(t,n,!1)}"undefined"!=typeof window&&"undefined"!=typeof document&&function(){var e=document.createElement("div").style;function t(t,n){for(var i in t)if(t.hasOwnProperty(i)){var o=t[i];for(var r in o)if(r in e){n.push(o[r]);break}}}"AnimationEvent"in window||(delete i.animationstart.animation,delete o.animationend.animation),"TransitionEvent"in window||(delete i.transitionstart.transition,delete o.transitionend.transition),t(i,r),t(o,s)}();var u={startEvents:r,addStartEventListener:function(e,t){0!==r.length?r.forEach(function(n){a(e,n,t)}):window.setTimeout(t,0)},removeStartEventListener:function(e,t){0!==r.length&&r.forEach(function(n){l(e,n,t)})},endEvents:s,addEndEventListener:function(e,t){0!==s.length?s.forEach(function(n){a(e,n,t)}):window.setTimeout(t,0)},removeEndEventListener:function(e,t){0!==s.length&&s.forEach(function(n){l(e,n,t)})}};t.default=u,e.exports=t.default},469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,r){var s=o.default.unstable_batchedUpdates?function(e){o.default.unstable_batchedUpdates(n,e)}:n;return(0,i.default)(e,t,s,r)};var i=r(n(121)),o=r(n(4));function r(e){return e&&e.__esModule?e:{default:e}}},493:function(e,t,n){},494:function(e,t,n){"use strict";n.r(t);var i,o=n(3),r=n.n(o),s=n(1),a=n.n(s),l=n(6),u=n.n(l),c=n(5),d=n.n(c),h=n(7),p=n.n(h),m=n(4),v=n.n(m),f=n(22),g=n(49);var y=function(e){if(document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth){if(e)return document.body.style.position="",void(document.body.style.width="");var t=function(e){if(e||void 0===i){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var n=document.createElement("div"),o=n.style;o.position="absolute",o.top=0,o.left=0,o.pointerEvents="none",o.visibility="hidden",o.width="200px",o.height="150px",o.overflow="hidden",n.appendChild(t),document.body.appendChild(n);var r=t.offsetWidth;n.style.overflow="scroll";var s=t.offsetWidth;r===s&&(s=n.clientWidth),document.body.removeChild(n),i=r-s}return i}();t&&(document.body.style.position="relative",document.body.style.width="calc(100% - ".concat(t,"px)"))}},b=n(42),w=function(e){function t(){return u()(this,t),d()(this,e.apply(this,arguments))}return p()(t,e),t.prototype.shouldComponentUpdate=function(e){return!!e.hiddenClassName||!!e.visible},t.prototype.render=function(){var e=this.props.className;this.props.hiddenClassName&&!this.props.visible&&(e+=" "+this.props.hiddenClassName);var t=r()({},this.props);return delete t.hiddenClassName,delete t.visible,t.className=e,s.createElement("div",r()({},t))},t}(s.Component),E=0;function k(e,t){var n=e["page"+(t?"Y":"X")+"Offset"],i="scroll"+(t?"Top":"Left");if("number"!=typeof n){var o=e.document;"number"!=typeof(n=o.documentElement[i])&&(n=o.body[i])}return n}function M(e,t){var n=e.style;["Webkit","Moz","Ms","ms"].forEach(function(e){n[e+"TransformOrigin"]=t}),n.transformOrigin=t}var C=function(e){function t(n){u()(this,t);var i=d()(this,e.call(this,n));return i.inTransition=!1,i.onAnimateLeave=function(){var e=i.props.afterClose;i.wrap&&(i.wrap.style.display="none"),i.inTransition=!1,i.removeScrollingEffect(),e&&e()},i.onDialogMouseDown=function(){i.dialogMouseDown=!0},i.onMaskMouseUp=function(){i.dialogMouseDown&&(i.timeoutId=setTimeout(function(){i.dialogMouseDown=!1},0))},i.onMaskClick=function(e){Date.now()-i.openTime<300||e.target!==e.currentTarget||i.dialogMouseDown||i.close(e)},i.onKeyDown=function(e){var t=i.props;if(t.keyboard&&e.keyCode===f.a.ESC)return e.stopPropagation(),void i.close(e);if(t.visible&&e.keyCode===f.a.TAB){var n=document.activeElement,o=i.sentinelStart;e.shiftKey?n===o&&i.sentinelEnd.focus():n===i.sentinelEnd&&o.focus()}},i.getDialogElement=function(){var e=i.props,t=e.closable,n=e.prefixCls,o={};void 0!==e.width&&(o.width=e.width),void 0!==e.height&&(o.height=e.height);var a=void 0;e.footer&&(a=s.createElement("div",{className:n+"-footer",ref:i.saveRef("footer")},e.footer));var l=void 0;e.title&&(l=s.createElement("div",{className:n+"-header",ref:i.saveRef("header")},s.createElement("div",{className:n+"-title",id:i.titleId},e.title)));var u=void 0;t&&(u=s.createElement("button",{type:"button",onClick:i.close,"aria-label":"Close",className:n+"-close"},e.closeIcon||s.createElement("span",{className:n+"-close-x"})));var c=r()({},e.style,o),d={width:0,height:0,overflow:"hidden"},h=i.getTransitionName(),p=s.createElement(w,{key:"dialog-element",role:"document",ref:i.saveRef("dialog"),style:c,className:n+" "+(e.className||""),visible:e.visible,onMouseDown:i.onDialogMouseDown},s.createElement("div",{tabIndex:0,ref:i.saveRef("sentinelStart"),style:d,"aria-hidden":"true"}),s.createElement("div",{className:n+"-content"},u,l,s.createElement("div",r()({className:n+"-body",style:e.bodyStyle,ref:i.saveRef("body")},e.bodyProps),e.children),a),s.createElement("div",{tabIndex:0,ref:i.saveRef("sentinelEnd"),style:d,"aria-hidden":"true"}));return s.createElement(b.a,{key:"dialog",showProp:"visible",onLeave:i.onAnimateLeave,transitionName:h,component:"",transitionAppear:!0},e.visible||!e.destroyOnClose?p:null)},i.getZIndexStyle=function(){var e={},t=i.props;return void 0!==t.zIndex&&(e.zIndex=t.zIndex),e},i.getWrapStyle=function(){return r()({},i.getZIndexStyle(),i.props.wrapStyle)},i.getMaskStyle=function(){return r()({},i.getZIndexStyle(),i.props.maskStyle)},i.getMaskElement=function(){var e=i.props,t=void 0;if(e.mask){var n=i.getMaskTransitionName();t=s.createElement(w,r()({style:i.getMaskStyle(),key:"mask",className:e.prefixCls+"-mask",hiddenClassName:e.prefixCls+"-mask-hidden",visible:e.visible},e.maskProps)),n&&(t=s.createElement(b.a,{key:"mask",showProp:"visible",transitionAppear:!0,component:"",transitionName:n},t))}return t},i.getMaskTransitionName=function(){var e=i.props,t=e.maskTransitionName,n=e.maskAnimation;return!t&&n&&(t=e.prefixCls+"-"+n),t},i.getTransitionName=function(){var e=i.props,t=e.transitionName,n=e.animation;return!t&&n&&(t=e.prefixCls+"-"+n),t},i.addScrollingEffect=function(){1===(0,i.props.getOpenCount)()&&(y(),document.body.style.overflow="hidden")},i.removeScrollingEffect=function(){0===(0,i.props.getOpenCount)()&&(document.body.style.overflow="",y(!0))},i.close=function(e){var t=i.props.onClose;t&&t(e)},i.saveRef=function(e){return function(t){i[e]=t}},i.titleId="rcDialogTitle"+E++,i}return p()(t,e),t.prototype.componentDidMount=function(){this.componentDidUpdate({}),(this.props.forceRender||!1===this.props.getContainer&&!this.props.visible)&&this.wrap&&(this.wrap.style.display="none")},t.prototype.componentDidUpdate=function(e){var t,n,i,o,r,s=this.props,a=this.props.mousePosition;if(s.visible){if(!e.visible){this.openTime=Date.now(),this.addScrollingEffect(),this.tryFocus();var l=m.findDOMNode(this.dialog);if(a){var u=(n=(t=l).getBoundingClientRect(),i={left:n.left,top:n.top},o=t.ownerDocument,r=o.defaultView||o.parentWindow,i.left+=k(r),i.top+=k(r,!0),i);M(l,a.x-u.left+"px "+(a.y-u.top)+"px")}else M(l,"")}}else if(e.visible&&(this.inTransition=!0,s.mask&&this.lastOutSideFocusNode)){try{this.lastOutSideFocusNode.focus()}catch(e){this.lastOutSideFocusNode=null}this.lastOutSideFocusNode=null}},t.prototype.componentWillUnmount=function(){var e=this.props,t=e.visible,n=e.getOpenCount;!t&&!this.inTransition||n()||this.removeScrollingEffect(),clearTimeout(this.timeoutId)},t.prototype.tryFocus=function(){Object(g.a)(this.wrap,document.activeElement)||(this.lastOutSideFocusNode=document.activeElement,this.sentinelStart.focus())},t.prototype.render=function(){var e=this.props,t=e.prefixCls,n=e.maskClosable,i=this.getWrapStyle();return e.visible&&(i.display=null),s.createElement("div",null,this.getMaskElement(),s.createElement("div",r()({tabIndex:-1,onKeyDown:this.onKeyDown,className:t+"-wrap "+(e.wrapClassName||""),ref:this.saveRef("wrap"),onClick:n?this.onMaskClick:null,onMouseUp:n?this.onMaskMouseUp:null,role:"dialog","aria-labelledby":e.title?this.titleId:null,style:i},e.wrapProps),this.getDialogElement()))},t}(s.Component),x=C;C.defaultProps={className:"",mask:!0,visible:!1,keyboard:!0,closable:!0,maskClosable:!0,destroyOnClose:!1,prefixCls:"rc-dialog"};var S=n(0),T=n.n(S),P=n(21),L=n(123),O=n(124);function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(n,!0).forEach(function(t){N(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e){return(_="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function W(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function R(e){return(R=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e,t){return(I=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var z=0,X=!("undefined"!=typeof window&&window.document&&window.document.createElement),Y="createPortal"in v.a,Z=function(e){function t(e){var n,i,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),i=this,o=R(t).call(this,e),(n=!o||"object"!==_(o)&&"function"!=typeof o?j(i):o).getParent=function(){var e=n.props.getContainer;if(e){if("string"==typeof e)return document.querySelectorAll(e)[0];if("function"==typeof e)return e();if("object"===_(e)&&e instanceof window.HTMLElement)return e}return document.body},n.getContainer=function(){if(X)return null;n.container||(n.container=document.createElement("div"),n.getParent().appendChild(n.container));return n.setWrapperClassName(),n.container},n.setWrapperClassName=function(){var e=n.props.wrapperClassName;n.container&&e&&e!==n.container.className&&(n.container.className=e)},n.savePortal=function(e){n._component=e},n.removeCurrentContainer=function(e){n.container=null,n._component=null,Y||(e?n.renderComponent({afterClose:n.removeContainer,onClose:function(){},visible:!1}):n.removeContainer())};var r=e.visible;return z=r?z+1:z,n.state={_self:j(n)},n}var n,i,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&I(e,t)}(t,a.a.Component),n=t,o=[{key:"getDerivedStateFromProps",value:function(e,t){var n=t.prevProps,i=t._self,o=e.visible,r=e.getContainer;if(n){var s=n.visible,a=n.getContainer;o!==s&&(z=o&&!s?z+1:z-1),r!==a&&i.removeCurrentContainer(!1)}return{prevProps:e}}}],(i=[{key:"componentDidUpdate",value:function(){this.setWrapperClassName()}},{key:"componentWillUnmount",value:function(){var e=this.props.visible;z=e&&z?z-1:z,this.removeCurrentContainer(e)}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,i=t.forceRender,o=t.visible,r=null,s={getOpenCount:function(){return z},getContainer:this.getContainer};return Y?((i||o||this._component)&&(r=a.a.createElement(O.a,{getContainer:this.getContainer,ref:this.savePortal},n(s))),r):a.a.createElement(L.a,{parent:this,visible:o,autoDestroy:!1,getComponent:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n(D({},t,{},s,{ref:e.savePortal}))},getContainer:this.getContainer,forceRender:i},function(t){var n=t.renderComponent,i=t.removeContainer;return e.renderComponent=n,e.removeContainer=i,null})}}])&&W(n.prototype,i),o&&W(n,o),t}();Z.propTypes={wrapperClassName:T.a.string,forceRender:T.a.bool,getContainer:T.a.any,children:T.a.func,visible:T.a.bool};var U=Object(P.polyfill)(Z);t.default=function(e){var t=e.visible,n=e.getContainer,i=e.forceRender;return!1===n?s.createElement(x,r()({},e,{getOpenCount:function(){return 2}})):s.createElement(U,{visible:t,forceRender:i,getContainer:n},function(t){return s.createElement(x,r()({},e,t))})}},722:function(e,t,n){e.exports=n.p+"img/justice_league.7f16e.jpg"},91:function(e,t,n){"use strict";n.r(t);var i=n(722),o=n.n(i),r=n(11),s=n(1),a=n.n(s);n(493);
/*!
 * imgzoomer v1.0.2
 * https://github.com/leonzhang1108/imgzoomer
 * Released under the MIT License.
 */
function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function c(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e}var d,h=function(){function e(t,n){l(this,e),this.canvas=null,this.ctx=null,this.times=1,this.outerTimes,this.currentTimes=1,this.lastX=0,this.lastY=0,this.lastMouseX=0,this.lastMouseY=0,this.top=null,this.left=null,this.img=null,this.zoomImg=null,this.callback=n.callback,this.svgDragging=!1,this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleMouseWheel=this.handleMouseWheel.bind(this),this.initCanvas(t,n)}return c(e,[{key:"initCanvas",value:function(e,t){var n=document.querySelector("#".concat(e));this.canvas=n,this.ctx=n.getContext("2d"),t?this.calculateCanvasSize(t):console.error("width and height need to specify")}},{key:"calculateCanvasSize",value:function(e){var t=e.width,n=e.height,i=this.canvas;i&&(this.wrapperWidth=i.width=t,this.wrapperHeight=i.height=n)}},{key:"draw",value:function(e){var t=this,n=this.img=new Image;n.onload=function(){t.render(),t.removeEvents(),t.initEvents()},n.src=e}},{key:"render",value:function(e){var t=0,n=0;e&&(t=e.left,n=e.top);var i=this.top,o=this.left,r=this.currentTimes,s=this.times,a=this.wrapperWidth,l=this.wrapperHeight,u=this.ctx,c=this.zoomImg||this.calculate(this.img),d=c.width,h=c.height;e||(i&&o?(t=o,n=i):(t=(a-d)/2,n=(l-h)/2)),t+=((this.lastMouseX||0)-t)*(1-r),n+=((this.lastMouseY||0)-n)*(1-r),this.lastX=t,this.lastY=n,u.clearRect(0,0,a,l),u.drawImage(this.img,t,n,d*s,h*s),this.callback&&this.callback({times:this.outerTimes||1,top:n,left:t})}},{key:"drag",value:function(e){var t=e.offsetX,n=e.offsetY,i=this.top,o=this.left+t-this.movedX,r=i+n-this.movedY;this.render({left:o,top:r})}},{key:"zoom",value:function(e){var t=this,n=Math.pow(1.1,e.wheelDelta/300);this.times*=n,this.currentTimes*=n,this.outerTimes*=n,requestAnimationFrame(function(e){t.render()})}},{key:"calculate",value:function(e){var t=this.wrapperWidth,n=this.wrapperHeight,i=e.width,o=e.height,r=o/i-n/t,s=o/i;return this.zoomImg||(this.zoomImg={},r>0?(this.outerTimes=n/o,this.zoomImg.height=n,this.zoomImg.width=n/s):(this.outerTimes=t/i,this.zoomImg.width=t,this.zoomImg.height=t*s)),this.zoomImg}},{key:"initEvents",value:function(){var e=this.canvas.parentElement.parentElement;e.addEventListener("wheel",this.handleMouseWheel),e.addEventListener("mousedown",this.handleMouseDown),e.addEventListener("mousemove",this.handleMouseMove),e.addEventListener("mouseup",this.handleMouseUp)}},{key:"removeEvents",value:function(){var e=this.canvas.parentElement.parentElement;e.removeEventListener("wheel",this.handleMouseWheel),e.removeEventListener("mousedown",this.handleMouseDown),e.removeEventListener("mousemove",this.handleMouseMove),e.removeEventListener("mouseup",this.handleMouseUp)}},{key:"handleMouseWheel",value:function(e){this.lastMouseX&&this.lastMouseY&&(e.preventDefault(),e.stopPropagation(),this.zoom(e))}},{key:"handleMouseDown",value:function(e){var t=e.offsetX,n=e.offsetY;this.clicked=!0,this.movedX=t,this.movedY=n,this.resetTopLeft()}},{key:"handleMouseMove",value:function(e){if(!this.svgDragging){var t=e.offsetX,n=e.offsetY,i=this.currentTimes;this.lastMouseX=t,this.lastMouseY=n,1!==i&&(this.currentTimes=1),this.clicked?this.drag(e):this.resetTopLeft()}}},{key:"handleMouseUp",value:function(e){this.svgDragging=!1,this.clicked=!1,this.movedX=0,this.movedY=0,this.resetTopLeft()}},{key:"resetTopLeft",value:function(){var e=this.left,t=this.top,n=this.lastX,i=this.lastY;n===e&&i===t||(this.left=n,this.top=i)}}]),e}(),p=function(e){return void 0===e},m=function(){function e(t,n){var i=n.imgZoomer,o=n.pointsList;l(this,e),i?(this.pointsList=o||[],this.blockList=[],this.temp=[],this.dragging=!1,this.clicked=!1,this.polygonMove=!1,this.imgZoomer=i,this.mousedownX=0,this.mousedownY=0,this.circleDragging=!1,this.group=void 0,this.index=void 0,this.isRectangle=!1,this.svgMousedown=this.svgMousedown.bind(this),this.svgMousemove=this.svgMousemove.bind(this),this.svgMouseup=this.svgMouseup.bind(this),this._wrapper=document.querySelector("#".concat(t)),this.imgZoomer.callback=this.rerender.bind(this),this.removeEvents(),this.initEvents()):console.error("imgZoomer need to specify")}return c(e,[{key:"initEvents",value:function(){this._wrapper.addEventListener("mousedown",this.svgMousedown),this._wrapper.addEventListener("mousemove",this.svgMousemove),this._wrapper.addEventListener("mouseup",this.svgMouseup)}},{key:"removeEvents",value:function(){this._wrapper.removeEventListener("mousedown",this.svgMousedown),this._wrapper.removeEventListener("mousemove",this.svgMousemove),this._wrapper.removeEventListener("mouseup",this.svgMouseup)}},{key:"svgMousedown",value:function(){this.clicked=!0}},{key:"setIsRectangle",value:function(e){this.isRectangle=e||!1}},{key:"svgMousemove",value:function(e){var t=this;if(this.clicked&&(this.dragging=!0),this.circleDragging){var n=e.offsetX,i=e.offsetY,o=this.group,r=this.index,s=this.times,a=n-this.mousedownX,l=i-this.mousedownY;if(p(r)||p(o)){var u=this.temp[r],c=u.x,d=u.y;this.temp[r]={x:c+a/s,y:d+l/s},this.rerenderTempPoints(),this.resetMousedownPoint(e)}else{var h=this.pointsList[o][r],m=h.x,v=h.y;this.pointsList[o][r]={x:m+a/s,y:v+l/s},this.renderSingleArea(this.pointsList[o],o),this.resetMousedownPoint(e)}}if(this.imgZoomer.svgDragging&&!this.circleDragging){var f=e.offsetX,g=e.offsetY,y=this.index,b=f-this.mousedownX,w=g-this.mousedownY;this.pointsList[y]=this.pointsList[y].map(function(e){var n=e.x,i=e.y;return{x:n+b/t.times,y:i+w/t.times}}),this.renderSingleArea(this.pointsList[y],y),this.resetMousedownPoint(e)}if(this.isRectangle&&this.temp.length){var E=this.temp[0],k=E.x,M=E.y,C=this.calculateAddPoint(e),x=C.x,S=C.y;this.temp=function(e){var t=e.x0,n=e.y0,i=e.x1,o=e.y1;return[{x:t,y:n},{x:i,y:n},{x:i,y:o},{x:t,y:o},{x:t,y:n}]}({x0:k,y0:M,x1:x,y1:S}),this.rerenderTempPoints()}}},{key:"svgMouseup",value:function(e){if(this.clicked=!1,this.circleDragging=!1,this.imgZoomer.svgDragging=!1,this.group=void 0,this.index=void 0,!this.isDragging())switch(e.target.tagName){case"svg":2!==e.button&&this.addTempPoint(e);break;case"circle":this.isRectangle&&this.temp.length&&(this.temp.splice(this.temp.length-1),this.addPointList())}}},{key:"isDragging",value:function(){var e=this.dragging;return this.dragging=!1,e}},{key:"addPointList",value:function(){this.temp.length<3||(this.pointsList.push(this.temp),this.removeTempGroup(),this.rerenderExsitPoints())}},{key:"removeTempGroup",value:function(){this.temp=[];var e=document.querySelector("#temp");e&&e.remove()}},{key:"removeGroup",value:function(e){this.pointsList[e]=[];var t=document.querySelector("#svginner-".concat(e));t&&t.remove()}},{key:"addTempPoint",value:function(e){var t=this.calculateAddPoint(e);this.temp.push(t),this.rerenderTempPoints()}},{key:"calculateAddPoint",value:function(e){var t=e.clientX,n=e.clientY,i=this._wrapper.getBoundingClientRect(),o=i.left,r=i.top,s=this.top,a=this.left,l=this.times;return{x:(t-(a||0)-o)/l,y:(n-(s||0)-r)/l}}},{key:"createSVGElement",value:function(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}},{key:"rerender",value:function(e){var t=e.times,n=e.top,i=e.left;this.times=t,this.top=n,this.left=i,this.rerenderExsitPoints(),this.rerenderTempPoints()}},{key:"rerenderExsitPoints",value:function(){this.pointsList.forEach(this.renderSingleArea.bind(this))}},{key:"renderSingleArea",value:function(e,t){var n=this,i=e.length,o=this.calculate(e);if(this.pointsList[t].length){var r=this.renderGroup(t),s=r.getElementsByTagName("polygon")[0];this.reRenderPolygon({polygon:s,g:r,index:t}),o.forEach(function(e,s){var a=r.getElementsByTagName("line")[s],l=r.getElementsByTagName("circle")[s],u=s===i-1?o[0]:o[s+1],c=u.x,d=u.y;n.reRenderLine({line:a,p:e,p2:{x2:c,y2:d},g:r,i:s}),n.reRenderCircle({circle:l,p:e,g:r,i:s,index:t})})}}},{key:"rerenderTempPoints",value:function(){var e=this,t=this.renderTempGroup(),n=this.calculate(this.temp),i=n.length;n.forEach(function(o,r){var s=t.getElementsByTagName("circle")[r],a=t.getElementsByTagName("line")[r],l=r===i-1?n[0]:n[r+1],u=l.x,c=l.y,d=e.reRenderCircle({circle:s,p:o,g:t,i:r});0===r&&d.addEventListener("mouseup",function(){return!e.dragging&&e.addPointList.call(e)}),r!==i-1&&e.reRenderLine({line:a,p:o,p2:{x2:u,y2:c},g:t})})}},{key:"renderGroup",value:function(e){var t=this._wrapper.querySelector("#svginner-".concat(e));return t||((t=this.createSVGElement("g")).id="svginner-".concat(e),t.setAttribute("class","polygon"),this._wrapper.appendChild(t)),t}},{key:"renderTempGroup",value:function(){var e=document.querySelector("#temp");return e||((e=this.createSVGElement("g")).id="temp",this._wrapper.appendChild(e)),e}},{key:"reRenderPolygon",value:function(e){var t=this,n=e.polygon,i=e.g,o=e.index;n||((n=this.createSVGElement("polygon")).setAttribute("fill","rgb(56, 120, 196, .5)"),n.setAttribute("cursor","move"),n.addEventListener("mousedown",function(e){t.imgZoomer.svgDragging=!0,t.index=e.target.parentElement.id.split("-")[1],t.resetMousedownPoint(e)}),n.addEventListener("mouseup",function(e){t.imgZoomer.svgDragging=!1,t.index=void 0}),n.addEventListener("contextmenu",function(e){t.removeGroup(o),e.preventDefault()}),i.appendChild(n)),n.setAttribute("points",this.convertPoints2String(this.calculate(this.pointsList[o])))}},{key:"resetMousedownPoint",value:function(e){var t=e.offsetX,n=e.offsetY;this.mousedownX=t,this.mousedownY=n}},{key:"reRenderLine",value:function(e){var t=this,n=e.line,i=e.p,o=i.x,r=i.y,s=e.p2,a=s.x2,l=s.y2,u=e.g,c=e.i;n||((n=this.createSVGElement("line")).setAttribute("stroke","rgb(211, 220, 230)"),this.setStrokeWidth({line:n,v:2}),!p(c)&&n.setAttribute("index",c),n.addEventListener("mouseover",function(){return t.setStrokeWidth({line:n,v:5})}),n.addEventListener("mouseout",function(){return t.setStrokeWidth({line:n,v:2})}),n.addEventListener("click",function(e){var n=e.target,i=n.parentElement.id;if("temp"!==i){var o=i.split("-")[1],r=n.getAttribute("index"),s=t.calculateAddPoint(e);t.pointsList[o].splice(parseInt(r)+1,0,s),t.renderSingleArea(t.pointsList[o],o)}}),u.append(n)),n.setAttribute("x1",o),n.setAttribute("y1",r),n.setAttribute("x2",a),n.setAttribute("y2",l)}},{key:"setStrokeWidth",value:function(e){var t=e.line,n=e.v;t.setAttribute("stroke-width",n)}},{key:"reRenderCircle",value:function(e){var t=this,n=e.circle,i=e.p,o=i.x,r=i.y,s=e.g,a=e.i,l=e.index;return n||((n=this.createSVGElement("circle")).setAttribute("fill","rgb(89, 249, 46)"),n.setAttribute("cursor","move"),!p(a)&&n.setAttribute("index",a),!p(l)&&n.setAttribute("group",l),n.addEventListener("mousedown",function(e){t.imgZoomer.svgDragging=!0,t.circleDragging=!0,!p(l)&&(t.group=l),t.index=p(a)?e.target.getAttribute("index"):a,t.resetMousedownPoint(e)}),n.addEventListener("mouseup",function(){t.imgZoomer.svgDragging=!1,t.circleDragging=!1}),s.append(n)),n.setAttribute("r",6),n.setAttribute("cx",o),n.setAttribute("cy",r),n}},{key:"calculate",value:function(e){return e.map(this.calculateSinglePoint.bind(this))}},{key:"calculateSinglePoint",value:function(e){var t=this.top,n=this.left,i=this.times;return{x:n+e.x*i,y:t+e.y*i}}},{key:"convertPoints2String",value:function(e){return e.map(function(e){var t=e.x,n=e.y;return"".concat(t,",").concat(n)}).join(" ")}}]),e}(),v=n(53),f=n.n(v),g=(n(52),n(480)),y=n.n(g),b=(n(479),d=function(e,t){return(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}d(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.getPoints=function(){y.a.info({title:"Points",content:a.a.createElement("div",null,t.svgLabelEditor.pointsList.map(function(e,t){return a.a.createElement("div",{key:t},"[",e.map(function(e,t){var n=e.x,i=e.y;return a.a.createElement("div",{key:t},"(",n,", ",i,")")}),"]")}))})},t}return b(t,e),t.prototype.componentDidMount=function(){var e=this.props,t=e.height,n=e.width,i=h,r=m;this.imgZoomer=new i("canvas",{width:n,height:t}),this.imgZoomer.draw(o.a),this.svgLabelEditor=new r("svg-wrapper",{imgZoomer:this.imgZoomer,pointsList:[[{x:415.84196194762626,y:147.26284891271456},{x:600.8419619476263,y:190.26284891271456},{x:653.8419619476264,y:352.26284891271456},{x:376.1088135552601,y:340.5695301104572}],[{x:940.7072245800349,y:338.003545055495},{x:1013.1629207825664,y:471.97822859979857},{x:880.5553258458576,y:447.37063366308996}]]})},t.prototype.componentWillUnmount=function(){this.imgZoomer.removeEvents(),this.svgLabelEditor.removeEvents()},t.prototype.render=function(){return a.a.createElement("div",{className:"widget-wrapper"},a.a.createElement("svg",{id:"svg-wrapper"}),a.a.createElement("canvas",{id:"canvas"}),a.a.createElement(f.a,{className:"btn",type:"primary",onClick:this.getPoints},"get points"))},t}(a.a.Component);t.default=r.a.connect({component:w,mapStateToProps:function(e){return{height:e.common.contentHeight,width:e.common.contentWidth}}})}}]);
//# sourceMappingURL=10.71dc8ba48374797a55f9.bundle.js.map