(window.webpackJsonp=window.webpackJsonp||[]).push([[20,49],{335:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n,r=a(10),i=a(1),o=(a(478),a(479),a(335),n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])})(e,t)},function(e,t){function a(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(a.prototype=t.prototype,new a)}),s=window,c=navigator,l=s.tracking,m=function(e){function t(t){var a=e.call(this,t)||this;return a.frame=["threat","big threat","machine","analog","gov","president"],a.userMedia=function(){return navigator.getUserMedia=c.getUserMedia||c.webkitGetUserMedia||c.mozGetUserMedia||c.msGetUserMedia||null},a.startDrawing=function(){a.userMedia()?navigator.getUserMedia({video:!0,audio:!1},function(e){a.doDrawing.apply(a)},function(e){a.setState({hasCamera:!1}),console.log(e)}):a.setState({hasCamera:!1})},a.doDrawing=function(){var e=new(0,l.ObjectTracker)("face");e.setInitialScale(4),e.setStepSize(1),e.setEdgesDensity(.1),a.task=l.track("#video",e,{camera:!0}),e.on("track",function(e){e.data.forEach(function(e){var t=e.x,n=e.y,r=e.width,i=e.height;a.setState({x:t,y:n,width:r,height:i})})}),a.task.run()},a.state={hasCamera:!0,x:0,y:0,height:150,width:150,index:r.a.random(0,5)},a}return o(t,e),t.prototype.componentWillUnmount=function(){this.task&&this.task.stop&&this.task.stop()},t.prototype.componentDidMount=function(){this.startDrawing()},t.prototype.render=function(){var e=this,t=this.state,a=t.hasCamera,n=t.x,r=t.y,o=t.height,s=t.width,c=t.index;return a?i.createElement("div",{className:"home"},i.createElement("div",{className:"frame-wrapper",style:{transform:"translate3d( "+n+"px, "+r+"px, 0)"}},i.createElement("div",{className:"frame "+this.frame[c],style:{height:o+"px",width:s+"px"}},i.createElement("div",{className:"top-left corner"}),i.createElement("div",{className:"top-right corner"}),i.createElement("div",{className:"bottom-right corner"}),i.createElement("div",{className:"bottom-left corner"}),i.createElement("div",{className:"top line"}),i.createElement("div",{className:"left line"}),i.createElement("div",{className:"right line"}),i.createElement("div",{className:"bottom line"}))),i.createElement("video",{id:"video",className:"video",width:"100%",height:"100%",ref:function(t){return e.v=t},autoPlay:!0})):i.createElement("div",{className:"empty"},i.createElement("span",null,"no camera"))},t}(i.Component);t.default=m}}]);
//# sourceMappingURL=20.78b2bc4135d5d6d96745.bundle.js.map