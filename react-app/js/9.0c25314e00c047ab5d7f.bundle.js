(window.webpackJsonp=window.webpackJsonp||[]).push([[9,63],{327:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={transitionstart:{transition:"transitionstart",WebkitTransition:"webkitTransitionStart",MozTransition:"mozTransitionStart",OTransition:"oTransitionStart",msTransition:"MSTransitionStart"},animationstart:{animation:"animationstart",WebkitAnimation:"webkitAnimationStart",MozAnimation:"mozAnimationStart",OAnimation:"oAnimationStart",msAnimation:"MSAnimationStart"}},o={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},s=[],r=[];function a(e,t,n){e.addEventListener(t,n,!1)}function l(e,t,n){e.removeEventListener(t,n,!1)}"undefined"!=typeof window&&"undefined"!=typeof document&&function(){var e=document.createElement("div").style;function t(t,n){for(var i in t)if(t.hasOwnProperty(i)){var o=t[i];for(var s in o)if(s in e){n.push(o[s]);break}}}"AnimationEvent"in window||(delete i.animationstart.animation,delete o.animationend.animation),"TransitionEvent"in window||(delete i.transitionstart.transition,delete o.transitionend.transition),t(i,s),t(o,r)}();var u={startEvents:s,addStartEventListener:function(e,t){0!==s.length?s.forEach(function(n){a(e,n,t)}):window.setTimeout(t,0)},removeStartEventListener:function(e,t){0!==s.length&&s.forEach(function(n){l(e,n,t)})},endEvents:r,addEndEventListener:function(e,t){0!==r.length?r.forEach(function(n){a(e,n,t)}):window.setTimeout(t,0)},removeEndEventListener:function(e,t){0!==r.length&&r.forEach(function(n){l(e,n,t)})}};t.default=u,e.exports=t.default},328:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,s){var r=o.default.unstable_batchedUpdates?function(e){o.default.unstable_batchedUpdates(n,e)}:n;return(0,i.default)(e,t,r,s)};var i=s(n(118)),o=s(n(5));function s(e){return e&&e.__esModule?e:{default:e}}e.exports=t.default},351:function(e,t,n){},352:function(e,t,n){"use strict";n.r(t);var i=n(2),o=n.n(i),s=n(1),r=n.n(s),a=n(4),l=n.n(a),u=n(3),c=n.n(u),d=n(6),h=n.n(d),m=n(5),p=n.n(m),v=n(22),f=n(49),g=void 0;var y=function(e){if(document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth){if(e)return document.body.style.position="",void(document.body.style.width="");var t=function(e){if(e||void 0===g){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var n=document.createElement("div"),i=n.style;i.position="absolute",i.top=0,i.left=0,i.pointerEvents="none",i.visibility="hidden",i.width="200px",i.height="150px",i.overflow="hidden",n.appendChild(t),document.body.appendChild(n);var o=t.offsetWidth;n.style.overflow="scroll";var s=t.offsetWidth;o===s&&(s=n.clientWidth),document.body.removeChild(n),g=o-s}return g}();t&&(document.body.style.position="relative",document.body.style.width="calc(100% - "+t+"px)")}},w=n(41),E=function(e){function t(){return l()(this,t),c()(this,e.apply(this,arguments))}return h()(t,e),t.prototype.shouldComponentUpdate=function(e){return!!e.hiddenClassName||!!e.visible},t.prototype.render=function(){var e=this.props.className;this.props.hiddenClassName&&!this.props.visible&&(e+=" "+this.props.hiddenClassName);var t=o()({},this.props);return delete t.hiddenClassName,delete t.visible,t.className=e,s.createElement("div",o()({},t))},t}(s.Component),b=0;function k(e,t){var n=e["page"+(t?"Y":"X")+"Offset"],i="scroll"+(t?"Top":"Left");if("number"!=typeof n){var o=e.document;"number"!=typeof(n=o.documentElement[i])&&(n=o.body[i])}return n}function M(e,t){var n=e.style;["Webkit","Moz","Ms","ms"].forEach(function(e){n[e+"TransformOrigin"]=t}),n.transformOrigin=t}var x=function(e){function t(){l()(this,t);var n=c()(this,e.apply(this,arguments));return n.onAnimateLeave=function(){var e=n.props.afterClose;n.wrap&&(n.wrap.style.display="none"),n.inTransition=!1,n.removeScrollingEffect(),e&&e()},n.onDialogMouseDown=function(){n.dialogMouseDown=!0},n.onMaskMouseUp=function(){n.dialogMouseDown&&(n.timeoutId=setTimeout(function(){n.dialogMouseDown=!1},0))},n.onMaskClick=function(e){Date.now()-n.openTime<300||e.target!==e.currentTarget||n.dialogMouseDown||n.close(e)},n.onKeyDown=function(e){var t=n.props;if(t.keyboard&&e.keyCode===v.a.ESC)return e.stopPropagation(),void n.close(e);if(t.visible&&e.keyCode===v.a.TAB){var i=document.activeElement,o=n.sentinelStart;e.shiftKey?i===o&&n.sentinelEnd.focus():i===n.sentinelEnd&&o.focus()}},n.getDialogElement=function(){var e=n.props,t=e.closable,i=e.prefixCls,r={};void 0!==e.width&&(r.width=e.width),void 0!==e.height&&(r.height=e.height);var a=void 0;e.footer&&(a=s.createElement("div",{className:i+"-footer",ref:n.saveRef("footer")},e.footer));var l=void 0;e.title&&(l=s.createElement("div",{className:i+"-header",ref:n.saveRef("header")},s.createElement("div",{className:i+"-title",id:n.titleId},e.title)));var u=void 0;t&&(u=s.createElement("button",{type:"button",onClick:n.close,"aria-label":"Close",className:i+"-close"},e.closeIcon||s.createElement("span",{className:i+"-close-x"})));var c=o()({},e.style,r),d={width:0,height:0,overflow:"hidden"},h=n.getTransitionName(),m=s.createElement(E,{key:"dialog-element",role:"document",ref:n.saveRef("dialog"),style:c,className:i+" "+(e.className||""),visible:e.visible,onMouseDown:n.onDialogMouseDown},s.createElement("div",{tabIndex:0,ref:n.saveRef("sentinelStart"),style:d,"aria-hidden":"true"}),s.createElement("div",{className:i+"-content"},u,l,s.createElement("div",o()({className:i+"-body",style:e.bodyStyle,ref:n.saveRef("body")},e.bodyProps),e.children),a),s.createElement("div",{tabIndex:0,ref:n.saveRef("sentinelEnd"),style:d,"aria-hidden":"true"}));return s.createElement(w.a,{key:"dialog",showProp:"visible",onLeave:n.onAnimateLeave,transitionName:h,component:"",transitionAppear:!0},e.visible||!e.destroyOnClose?m:null)},n.getZIndexStyle=function(){var e={},t=n.props;return void 0!==t.zIndex&&(e.zIndex=t.zIndex),e},n.getWrapStyle=function(){return o()({},n.getZIndexStyle(),n.props.wrapStyle)},n.getMaskStyle=function(){return o()({},n.getZIndexStyle(),n.props.maskStyle)},n.getMaskElement=function(){var e=n.props,t=void 0;if(e.mask){var i=n.getMaskTransitionName();t=s.createElement(E,o()({style:n.getMaskStyle(),key:"mask",className:e.prefixCls+"-mask",hiddenClassName:e.prefixCls+"-mask-hidden",visible:e.visible},e.maskProps)),i&&(t=s.createElement(w.a,{key:"mask",showProp:"visible",transitionAppear:!0,component:"",transitionName:i},t))}return t},n.getMaskTransitionName=function(){var e=n.props,t=e.maskTransitionName,i=e.maskAnimation;return!t&&i&&(t=e.prefixCls+"-"+i),t},n.getTransitionName=function(){var e=n.props,t=e.transitionName,i=e.animation;return!t&&i&&(t=e.prefixCls+"-"+i),t},n.addScrollingEffect=function(){1===(0,n.props.getOpenCount)()&&(y(),document.body.style.overflow="hidden")},n.removeScrollingEffect=function(){0===(0,n.props.getOpenCount)()&&(document.body.style.overflow="",y(!0))},n.close=function(e){var t=n.props.onClose;t&&t(e)},n.saveRef=function(e){return function(t){n[e]=t}},n}return h()(t,e),t.prototype.componentWillMount=function(){this.inTransition=!1,this.titleId="rcDialogTitle"+b++},t.prototype.componentDidMount=function(){this.componentDidUpdate({}),this.props.forceRender&&this.wrap&&(this.wrap.style.display="none")},t.prototype.componentDidUpdate=function(e){var t,n,i,o,s,r=this.props,a=this.props.mousePosition;if(r.visible){if(!e.visible){this.openTime=Date.now(),this.addScrollingEffect(),this.tryFocus();var l=m.findDOMNode(this.dialog);if(a){var u=(n=(t=l).getBoundingClientRect(),i={left:n.left,top:n.top},o=t.ownerDocument,s=o.defaultView||o.parentWindow,i.left+=k(s),i.top+=k(s,!0),i);M(l,a.x-u.left+"px "+(a.y-u.top)+"px")}else M(l,"")}}else if(e.visible&&(this.inTransition=!0,r.mask&&this.lastOutSideFocusNode)){try{this.lastOutSideFocusNode.focus()}catch(e){this.lastOutSideFocusNode=null}this.lastOutSideFocusNode=null}},t.prototype.componentWillUnmount=function(){var e=this.props,t=e.visible,n=e.getOpenCount;!t&&!this.inTransition||n()||this.removeScrollingEffect(),clearTimeout(this.timeoutId)},t.prototype.tryFocus=function(){Object(f.a)(this.wrap,document.activeElement)||(this.lastOutSideFocusNode=document.activeElement,this.sentinelStart.focus())},t.prototype.render=function(){var e=this.props,t=e.prefixCls,n=e.maskClosable,i=this.getWrapStyle();return e.visible&&(i.display=null),s.createElement("div",null,this.getMaskElement(),s.createElement("div",o()({tabIndex:-1,onKeyDown:this.onKeyDown,className:t+"-wrap "+(e.wrapClassName||""),ref:this.saveRef("wrap"),onClick:n?this.onMaskClick:null,onMouseUp:n?this.onMaskMouseUp:null,role:"dialog","aria-labelledby":e.title?this.titleId:null,style:i},e.wrapProps),this.getDialogElement()))},t}(s.Component),C=x;x.defaultProps={className:"",mask:!0,visible:!1,keyboard:!0,closable:!0,maskClosable:!0,destroyOnClose:!1,prefixCls:"rc-dialog"};var T=n(54),S=n.n(T),L=n(13),P=n.n(L),A=n(0),D=n.n(A),N=n(21),_=n(120),W=n(121),O=0,R=!("undefined"!=typeof window&&window.document&&window.document.createElement),I="createPortal"in p.a,z=function(e){function t(e){l()(this,t);var n=c()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.getParent=function(){var e=n.props.getContainer;if(e){if("string"==typeof e)return document.querySelectorAll(e)[0];if("function"==typeof e)return e();if("object"===(void 0===e?"undefined":S()(e))&&e instanceof window.HTMLElement)return e}return document.body},n.getContainer=function(){if(R)return null;n.container||(n.container=document.createElement("div"),n.getParent().appendChild(n.container));return n.setWrapperClassName(),n.container},n.setWrapperClassName=function(){var e=n.props.wrapperClassName;n.container&&e&&e!==n.container.className&&(n.container.className=e)},n.savePortal=function(e){n._component=e};var i=e.visible;return O=i?O+1:O,n.state={},n}return h()(t,e),P()(t,[{key:"componentDidUpdate",value:function(){this.setWrapperClassName()}},{key:"componentWillUnmount",value:function(){var e=this.props.visible;this.container=null,this._component=null,O=e&&O?O-1:O,I||(e?this.renderComponent({afterClose:this.removeContainer,onClose:function(){},visible:!1}):this.removeContainer())}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,i=t.forceRender,s=t.visible,a=null,l={getOpenCount:function(){return O},getContainer:this.getContainer};return I?((i||s||this._component)&&(a=r.a.createElement(W.a,{getContainer:this.getContainer,ref:this.savePortal},n(l))),a):r.a.createElement(_.a,{parent:this,visible:s,autoDestroy:!1,getComponent:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return n(o()({},t,l,{ref:e.savePortal}))},getContainer:this.getContainer,forceRender:i},function(t){var n=t.renderComponent,i=t.removeContainer;return e.renderComponent=n,e.removeContainer=i,null})}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=t.visible,i=e.visible;return void 0!==n&&i!==n&&(O=i&&!n?O+1:O-1),{visible:i}}}]),t}(r.a.Component);z.propTypes={wrapperClassName:D.a.string,forceRender:D.a.bool,getContainer:D.a.any,children:D.a.func,visible:D.a.bool};var X=Object(N.polyfill)(z);t.default=function(e){var t=e.visible,n=e.getContainer,i=e.forceRender;return!1===n?s.createElement(C,o()({},e,{getOpenCount:function(){return 2}})):s.createElement(X,{visible:t,forceRender:i,getContainer:n},function(t){return s.createElement(C,o()({},e,t))})}},580:function(e,t,n){e.exports=n.p+"img/justice_league.7f16e.jpg"},89:function(e,t,n){"use strict";n.r(t);var i=n(580),o=n.n(i),s=n(10),r=n(1);n(351);
/*!
 * imgzoomer v1.0.2
 * https://github.com/leonzhang1108/imgzoomer
 * Released under the MIT License.
 */
function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function u(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}var c,d=function(){function e(t,n){a(this,e),this.canvas=null,this.ctx=null,this.times=1,this.outerTimes,this.currentTimes=1,this.lastX=0,this.lastY=0,this.lastMouseX=0,this.lastMouseY=0,this.top=null,this.left=null,this.img=null,this.zoomImg=null,this.callback=n.callback,this.svgDragging=!1,this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseUp=this.handleMouseUp.bind(this),this.handleMouseWheel=this.handleMouseWheel.bind(this),this.initCanvas(t,n)}return u(e,[{key:"initCanvas",value:function(e,t){var n=document.querySelector("#".concat(e));this.canvas=n,this.ctx=n.getContext("2d"),t?this.calculateCanvasSize(t):console.error("width and height need to specify")}},{key:"calculateCanvasSize",value:function(e){var t=e.width,n=e.height,i=this.canvas;i&&(this.wrapperWidth=i.width=t,this.wrapperHeight=i.height=n)}},{key:"draw",value:function(e){var t=this,n=this.img=new Image;n.onload=function(){t.render(),t.removeEvents(),t.initEvents()},n.src=e}},{key:"render",value:function(e){var t=0,n=0;e&&(t=e.left,n=e.top);var i=this.top,o=this.left,s=this.currentTimes,r=this.times,a=this.wrapperWidth,l=this.wrapperHeight,u=this.ctx,c=this.zoomImg||this.calculate(this.img),d=c.width,h=c.height;e||(i&&o?(t=o,n=i):(t=(a-d)/2,n=(l-h)/2)),t+=((this.lastMouseX||0)-t)*(1-s),n+=((this.lastMouseY||0)-n)*(1-s),this.lastX=t,this.lastY=n,u.clearRect(0,0,a,l),u.drawImage(this.img,t,n,d*r,h*r),this.callback&&this.callback({times:this.outerTimes||1,top:n,left:t})}},{key:"drag",value:function(e){var t=e.offsetX,n=e.offsetY,i=this.top,o=this.left+t-this.movedX,s=i+n-this.movedY;this.render({left:o,top:s})}},{key:"zoom",value:function(e){var t=this,n=Math.pow(1.1,e.wheelDelta/300);this.times*=n,this.currentTimes*=n,this.outerTimes*=n,requestAnimationFrame(function(e){t.render()})}},{key:"calculate",value:function(e){var t=this.wrapperWidth,n=this.wrapperHeight,i=e.width,o=e.height,s=o/i-n/t,r=o/i;return this.zoomImg||(this.zoomImg={},s>0?(this.outerTimes=n/o,this.zoomImg.height=n,this.zoomImg.width=n/r):(this.outerTimes=t/i,this.zoomImg.width=t,this.zoomImg.height=t*r)),this.zoomImg}},{key:"initEvents",value:function(){var e=this.canvas.parentElement.parentElement;e.addEventListener("wheel",this.handleMouseWheel),e.addEventListener("mousedown",this.handleMouseDown),e.addEventListener("mousemove",this.handleMouseMove),e.addEventListener("mouseup",this.handleMouseUp)}},{key:"removeEvents",value:function(){var e=this.canvas.parentElement.parentElement;e.removeEventListener("wheel",this.handleMouseWheel),e.removeEventListener("mousedown",this.handleMouseDown),e.removeEventListener("mousemove",this.handleMouseMove),e.removeEventListener("mouseup",this.handleMouseUp)}},{key:"handleMouseWheel",value:function(e){this.lastMouseX&&this.lastMouseY&&(e.preventDefault(),e.stopPropagation(),this.zoom(e))}},{key:"handleMouseDown",value:function(e){var t=e.offsetX,n=e.offsetY;this.clicked=!0,this.movedX=t,this.movedY=n,this.resetTopLeft()}},{key:"handleMouseMove",value:function(e){if(!this.svgDragging){var t=e.offsetX,n=e.offsetY,i=this.currentTimes;this.lastMouseX=t,this.lastMouseY=n,1!==i&&(this.currentTimes=1),this.clicked?this.drag(e):this.resetTopLeft()}}},{key:"handleMouseUp",value:function(e){this.svgDragging=!1,this.clicked=!1,this.movedX=0,this.movedY=0,this.resetTopLeft()}},{key:"resetTopLeft",value:function(){var e=this.left,t=this.top,n=this.lastX,i=this.lastY;n===e&&i===t||(this.left=n,this.top=i)}}]),e}(),h=function(e){return void 0===e},m=function(){function e(t,n){var i=n.imgZoomer,o=n.pointsList;a(this,e),i?(this.pointsList=o||[],this.blockList=[],this.temp=[],this.dragging=!1,this.clicked=!1,this.polygonMove=!1,this.imgZoomer=i,this.mousedownX=0,this.mousedownY=0,this.circleDragging=!1,this.group=void 0,this.index=void 0,this.isRectangle=!1,this.svgMousedown=this.svgMousedown.bind(this),this.svgMousemove=this.svgMousemove.bind(this),this.svgMouseup=this.svgMouseup.bind(this),this._wrapper=document.querySelector("#".concat(t)),this.imgZoomer.callback=this.rerender.bind(this),this.removeEvents(),this.initEvents()):console.error("imgZoomer need to specify")}return u(e,[{key:"initEvents",value:function(){this._wrapper.addEventListener("mousedown",this.svgMousedown),this._wrapper.addEventListener("mousemove",this.svgMousemove),this._wrapper.addEventListener("mouseup",this.svgMouseup)}},{key:"removeEvents",value:function(){this._wrapper.removeEventListener("mousedown",this.svgMousedown),this._wrapper.removeEventListener("mousemove",this.svgMousemove),this._wrapper.removeEventListener("mouseup",this.svgMouseup)}},{key:"svgMousedown",value:function(){this.clicked=!0}},{key:"setIsRectangle",value:function(e){this.isRectangle=e||!1}},{key:"svgMousemove",value:function(e){var t=this;if(this.clicked&&(this.dragging=!0),this.circleDragging){var n=e.offsetX,i=e.offsetY,o=this.group,s=this.index,r=this.times,a=n-this.mousedownX,l=i-this.mousedownY;if(h(s)||h(o)){var u=this.temp[s],c=u.x,d=u.y;this.temp[s]={x:c+a/r,y:d+l/r},this.rerenderTempPoints(),this.resetMousedownPoint(e)}else{var m=this.pointsList[o][s],p=m.x,v=m.y;this.pointsList[o][s]={x:p+a/r,y:v+l/r},this.renderSingleArea(this.pointsList[o],o),this.resetMousedownPoint(e)}}if(this.imgZoomer.svgDragging&&!this.circleDragging){var f=e.offsetX,g=e.offsetY,y=this.index,w=f-this.mousedownX,E=g-this.mousedownY;this.pointsList[y]=this.pointsList[y].map(function(e){var n=e.x,i=e.y;return{x:n+w/t.times,y:i+E/t.times}}),this.renderSingleArea(this.pointsList[y],y),this.resetMousedownPoint(e)}if(this.isRectangle&&this.temp.length){var b=this.temp[0],k=b.x,M=b.y,x=this.calculateAddPoint(e),C=x.x,T=x.y;this.temp=function(e){var t=e.x0,n=e.y0,i=e.x1,o=e.y1;return[{x:t,y:n},{x:i,y:n},{x:i,y:o},{x:t,y:o},{x:t,y:n}]}({x0:k,y0:M,x1:C,y1:T}),this.rerenderTempPoints()}}},{key:"svgMouseup",value:function(e){if(this.clicked=!1,this.circleDragging=!1,this.imgZoomer.svgDragging=!1,this.group=void 0,this.index=void 0,!this.isDragging())switch(e.target.tagName){case"svg":2!==e.button&&this.addTempPoint(e);break;case"circle":this.isRectangle&&this.temp.length&&(this.temp.splice(this.temp.length-1),this.addPointList())}}},{key:"isDragging",value:function(){var e=this.dragging;return this.dragging=!1,e}},{key:"addPointList",value:function(){this.temp.length<3||(this.pointsList.push(this.temp),this.removeTempGroup(),this.rerenderExsitPoints())}},{key:"removeTempGroup",value:function(){this.temp=[];var e=document.querySelector("#temp");e&&e.remove()}},{key:"removeGroup",value:function(e){this.pointsList[e]=[];var t=document.querySelector("#svginner-".concat(e));t&&t.remove()}},{key:"addTempPoint",value:function(e){var t=this.calculateAddPoint(e);this.temp.push(t),this.rerenderTempPoints()}},{key:"calculateAddPoint",value:function(e){var t=e.clientX,n=e.clientY,i=this._wrapper.getBoundingClientRect(),o=i.left,s=i.top,r=this.top,a=this.left,l=this.times;return{x:(t-(a||0)-o)/l,y:(n-(r||0)-s)/l}}},{key:"createSVGElement",value:function(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}},{key:"rerender",value:function(e){var t=e.times,n=e.top,i=e.left;this.times=t,this.top=n,this.left=i,this.rerenderExsitPoints(),this.rerenderTempPoints()}},{key:"rerenderExsitPoints",value:function(){this.pointsList.forEach(this.renderSingleArea.bind(this))}},{key:"renderSingleArea",value:function(e,t){var n=this,i=e.length,o=this.calculate(e);if(this.pointsList[t].length){var s=this.renderGroup(t),r=s.getElementsByTagName("polygon")[0];this.reRenderPolygon({polygon:r,g:s,index:t}),o.forEach(function(e,r){var a=s.getElementsByTagName("line")[r],l=s.getElementsByTagName("circle")[r],u=r===i-1?o[0]:o[r+1],c=u.x,d=u.y;n.reRenderLine({line:a,p:e,p2:{x2:c,y2:d},g:s,i:r}),n.reRenderCircle({circle:l,p:e,g:s,i:r,index:t})})}}},{key:"rerenderTempPoints",value:function(){var e=this,t=this.renderTempGroup(),n=this.calculate(this.temp),i=n.length;n.forEach(function(o,s){var r=t.getElementsByTagName("circle")[s],a=t.getElementsByTagName("line")[s],l=s===i-1?n[0]:n[s+1],u=l.x,c=l.y,d=e.reRenderCircle({circle:r,p:o,g:t,i:s});0===s&&d.addEventListener("mouseup",function(){return!e.dragging&&e.addPointList.call(e)}),s!==i-1&&e.reRenderLine({line:a,p:o,p2:{x2:u,y2:c},g:t})})}},{key:"renderGroup",value:function(e){var t=this._wrapper.querySelector("#svginner-".concat(e));return t||((t=this.createSVGElement("g")).id="svginner-".concat(e),t.setAttribute("class","polygon"),this._wrapper.appendChild(t)),t}},{key:"renderTempGroup",value:function(){var e=document.querySelector("#temp");return e||((e=this.createSVGElement("g")).id="temp",this._wrapper.appendChild(e)),e}},{key:"reRenderPolygon",value:function(e){var t=this,n=e.polygon,i=e.g,o=e.index;n||((n=this.createSVGElement("polygon")).setAttribute("fill","rgb(56, 120, 196, .5)"),n.setAttribute("cursor","move"),n.addEventListener("mousedown",function(e){t.imgZoomer.svgDragging=!0,t.index=e.target.parentElement.id.split("-")[1],t.resetMousedownPoint(e)}),n.addEventListener("mouseup",function(e){t.imgZoomer.svgDragging=!1,t.index=void 0}),n.addEventListener("contextmenu",function(e){t.removeGroup(o),e.preventDefault()}),i.appendChild(n)),n.setAttribute("points",this.convertPoints2String(this.calculate(this.pointsList[o])))}},{key:"resetMousedownPoint",value:function(e){var t=e.offsetX,n=e.offsetY;this.mousedownX=t,this.mousedownY=n}},{key:"reRenderLine",value:function(e){var t=this,n=e.line,i=e.p,o=i.x,s=i.y,r=e.p2,a=r.x2,l=r.y2,u=e.g,c=e.i;n||((n=this.createSVGElement("line")).setAttribute("stroke","rgb(211, 220, 230)"),this.setStrokeWidth({line:n,v:2}),!h(c)&&n.setAttribute("index",c),n.addEventListener("mouseover",function(){return t.setStrokeWidth({line:n,v:5})}),n.addEventListener("mouseout",function(){return t.setStrokeWidth({line:n,v:2})}),n.addEventListener("click",function(e){var n=e.target,i=n.parentElement.id;if("temp"!==i){var o=i.split("-")[1],s=n.getAttribute("index"),r=t.calculateAddPoint(e);t.pointsList[o].splice(parseInt(s)+1,0,r),t.renderSingleArea(t.pointsList[o],o)}}),u.append(n)),n.setAttribute("x1",o),n.setAttribute("y1",s),n.setAttribute("x2",a),n.setAttribute("y2",l)}},{key:"setStrokeWidth",value:function(e){var t=e.line,n=e.v;t.setAttribute("stroke-width",n)}},{key:"reRenderCircle",value:function(e){var t=this,n=e.circle,i=e.p,o=i.x,s=i.y,r=e.g,a=e.i,l=e.index;return n||((n=this.createSVGElement("circle")).setAttribute("fill","rgb(89, 249, 46)"),n.setAttribute("cursor","move"),!h(a)&&n.setAttribute("index",a),!h(l)&&n.setAttribute("group",l),n.addEventListener("mousedown",function(e){t.imgZoomer.svgDragging=!0,t.circleDragging=!0,!h(l)&&(t.group=l),t.index=h(a)?e.target.getAttribute("index"):a,t.resetMousedownPoint(e)}),n.addEventListener("mouseup",function(){t.imgZoomer.svgDragging=!1,t.circleDragging=!1}),r.append(n)),n.setAttribute("r",6),n.setAttribute("cx",o),n.setAttribute("cy",s),n}},{key:"calculate",value:function(e){return e.map(this.calculateSinglePoint.bind(this))}},{key:"calculateSinglePoint",value:function(e){var t=this.top,n=this.left,i=this.times;return{x:n+e.x*i,y:t+e.y*i}}},{key:"convertPoints2String",value:function(e){return e.map(function(e){var t=e.x,n=e.y;return"".concat(t,",").concat(n)}).join(" ")}}]),e}(),p=n(53),v=n.n(p),f=(n(52),n(339)),g=n.n(f),y=(n(338),c=function(e,t){return(c=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}c(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.getPoints=function(){g.a.info({title:"Points",content:r.createElement("div",null,t.svgLabelEditor.pointsList.map(function(e,t){return r.createElement("div",{key:t},"[",e.map(function(e,t){var n=e.x,i=e.y;return r.createElement("div",{key:t},"(",n,", ",i,")")}),"]")}))})},t}return y(t,e),t.prototype.componentDidMount=function(){var e=this.props,t=e.height,n=e.width,i=d,s=m;this.imgZoomer=new i("canvas",{width:n,height:t}),this.imgZoomer.draw(o.a),this.svgLabelEditor=new s("svg-wrapper",{imgZoomer:this.imgZoomer,pointsList:[[{x:415.84196194762626,y:147.26284891271456},{x:600.8419619476263,y:190.26284891271456},{x:653.8419619476264,y:352.26284891271456},{x:376.1088135552601,y:340.5695301104572}],[{x:940.7072245800349,y:338.003545055495},{x:1013.1629207825664,y:471.97822859979857},{x:880.5553258458576,y:447.37063366308996}]]})},t.prototype.componentWillUnmount=function(){this.imgZoomer.removeEvents(),this.svgLabelEditor.removeEvents()},t.prototype.render=function(){return r.createElement("div",{className:"widget-wrapper"},r.createElement("svg",{id:"svg-wrapper"}),r.createElement("canvas",{id:"canvas"}),r.createElement(v.a,{className:"btn",type:"primary",onClick:this.getPoints},"get points"))},t}(r.Component);t.default=s.a.connect({component:w,mapStateToProps:function(e){return{height:e.common.contentHeight,width:e.common.contentWidth}}})}}]);
//# sourceMappingURL=9.0c25314e00c047ab5d7f.bundle.js.map