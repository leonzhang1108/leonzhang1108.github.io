(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{185:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var enterModule;function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}enterModule="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0,enterModule&&enterModule(module);var __signature__="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e},_default=function _default(canvas){var timeout=null,config={SIM_RESOLUTION:128,DYE_RESOLUTION:512,DENSITY_DISSIPATION:.97,VELOCITY_DISSIPATION:.98,PRESSURE_DISSIPATION:.8,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.5,SHADING:!0,COLORFUL:!0,PAUSED:!1,BACK_COLOR:{r:255,g:255,b:255},TRANSPARENT:!1,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:.8,BLOOM_THRESHOLD:.6,BLOOM_SOFT_KNEE:.7};function pointerPrototype(){this.id=-1,this.x=0,this.y=0,this.dx=0,this.dy=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}var pointers=[],splatStack=[],bloomFramebuffers=[];pointers.push(new pointerPrototype);var _getWebGLContext=getWebGLContext(canvas),gl=_getWebGLContext.gl,ext=_getWebGLContext.ext;function getWebGLContext(e){var r,t,n={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1},i=e.getContext("webgl2",n),o=!!i;o||(i=e.getContext("webgl",n)||e.getContext("experimental-webgl",n)),o?(i.getExtension("EXT_color_buffer_float"),t=i.getExtension("OES_texture_float_linear")):(r=i.getExtension("OES_texture_half_float"),t=i.getExtension("OES_texture_half_float_linear")),i.clearColor(0,0,0,1);var a,l,u,g=o?i.HALF_FLOAT:r.HALF_FLOAT_OES;return o?(a=getSupportedFormat(i,i.RGBA16F,i.RGBA,g),l=getSupportedFormat(i,i.RG16F,i.RG,g),u=getSupportedFormat(i,i.R16F,i.RED,g)):(a=getSupportedFormat(i,i.RGBA,i.RGBA,g),l=getSupportedFormat(i,i.RGBA,i.RGBA,g),u=getSupportedFormat(i,i.RGBA,i.RGBA,g)),{gl:i,ext:{formatRGBA:a,formatRG:l,formatR:u,halfFloatTexType:g,supportLinearFiltering:t}}}function getSupportedFormat(e,r,t,n){if(!supportRenderTextureFormat(e,r,t,n))switch(r){case e.R16F:return getSupportedFormat(e,e.RG16F,e.RG,n);case e.RG16F:return getSupportedFormat(e,e.RGBA16F,e.RGBA,n);default:return null}return{internalFormat:r,format:t}}function supportRenderTextureFormat(e,r,t,n){var i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,t,n,null);var o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function isMobile(){return/Mobi|Android/i.test(navigator.userAgent)}isMobile()&&(config.SHADING=!1),ext.supportLinearFiltering||(config.SHADING=!1,config.BLOOM=!1);var GLProgram=function(){function GLProgram(e,r){if(_classCallCheck(this,GLProgram),this.uniforms={},this.program=gl.createProgram(),gl.attachShader(this.program,e),gl.attachShader(this.program,r),gl.linkProgram(this.program),!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw gl.getProgramInfoLog(this.program);for(var t=gl.getProgramParameter(this.program,gl.ACTIVE_UNIFORMS),n=0;n<t;n++){var i=gl.getActiveUniform(this.program,n).name;this.uniforms[i]=gl.getUniformLocation(this.program,i)}}return _createClass(GLProgram,[{key:"bind",value:function(){gl.useProgram(this.program)}},{key:"__reactstandin__regenerateByEval",value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code)}}]),GLProgram}();function compileShader(e,r){var t=gl.createShader(e);if(gl.shaderSource(t,r),gl.compileShader(t),!gl.getShaderParameter(t,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(t);return t}var baseVertexShader=compileShader(gl.VERTEX_SHADER,"\n      precision highp float;\n      attribute vec2 aPosition;\n      varying vec2 vUv;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform vec2 texelSize;\n      void main () {\n          vUv = aPosition * 0.5 + 0.5;\n          vL = vUv - vec2(texelSize.x, 0.0);\n          vR = vUv + vec2(texelSize.x, 0.0);\n          vT = vUv + vec2(0.0, texelSize.y);\n          vB = vUv - vec2(0.0, texelSize.y);\n          gl_Position = vec4(aPosition, 0.0, 1.0);\n      }\n  "),clearShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying highp vec2 vUv;\n      uniform sampler2D uTexture;\n      uniform float value;\n      void main () {\n          gl_FragColor = value * texture2D(uTexture, vUv);\n      }\n  "),colorShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      uniform vec4 color;\n      void main () {\n          gl_FragColor = color;\n      }\n  "),backgroundShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uTexture;\n      uniform float aspectRatio;\n      #define SCALE 25.0\n      void main () {\n          vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));\n          float v = mod(uv.x + uv.y, 2.0);\n          v = v * 0.1 + 0.8;\n          gl_FragColor = vec4(vec3(v), 1.0);\n      }\n  "),displayShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uTexture;\n      void main () {\n          vec3 C = texture2D(uTexture, vUv).rgb;\n          float a = max(C.r, max(C.g, C.b));\n          gl_FragColor = vec4(C, a);\n      }\n  "),displayBloomShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uTexture;\n      uniform sampler2D uBloom;\n      uniform sampler2D uDithering;\n      uniform vec2 ditherScale;\n      void main () {\n          vec3 C = texture2D(uTexture, vUv).rgb;\n          vec3 bloom = texture2D(uBloom, vUv).rgb;\n          vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;\n          noise = noise * 2.0 - 1.0;\n          bloom += noise / 800.0;\n          bloom = pow(bloom.rgb, vec3(1.0 / 2.2));\n          C += bloom;\n          float a = max(C.r, max(C.g, C.b));\n          gl_FragColor = vec4(C, a);\n      }\n  "),displayShadingShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform sampler2D uTexture;\n      uniform vec2 texelSize;\n      void main () {\n          vec3 L = texture2D(uTexture, vL).rgb;\n          vec3 R = texture2D(uTexture, vR).rgb;\n          vec3 T = texture2D(uTexture, vT).rgb;\n          vec3 B = texture2D(uTexture, vB).rgb;\n          vec3 C = texture2D(uTexture, vUv).rgb;\n          float dx = length(R) - length(L);\n          float dy = length(T) - length(B);\n          vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n          vec3 l = vec3(0.0, 0.0, 1.0);\n          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n          C.rgb *= diffuse;\n          float a = max(C.r, max(C.g, C.b));\n          gl_FragColor = vec4(C, a);\n      }\n  "),displayBloomShadingShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform sampler2D uTexture;\n      uniform sampler2D uBloom;\n      uniform sampler2D uDithering;\n      uniform vec2 ditherScale;\n      uniform vec2 texelSize;\n      void main () {\n          vec3 L = texture2D(uTexture, vL).rgb;\n          vec3 R = texture2D(uTexture, vR).rgb;\n          vec3 T = texture2D(uTexture, vT).rgb;\n          vec3 B = texture2D(uTexture, vB).rgb;\n          vec3 C = texture2D(uTexture, vUv).rgb;\n          float dx = length(R) - length(L);\n          float dy = length(T) - length(B);\n          vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n          vec3 l = vec3(0.0, 0.0, 1.0);\n          float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n          C *= diffuse;\n          vec3 bloom = texture2D(uBloom, vUv).rgb;\n          vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;\n          noise = noise * 2.0 - 1.0;\n          bloom += noise / 800.0;\n          bloom = pow(bloom.rgb, vec3(1.0 / 2.2));\n          C += bloom;\n          float a = max(C.r, max(C.g, C.b));\n          gl_FragColor = vec4(C, a);\n      }\n  "),bloomPrefilterShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uTexture;\n      uniform vec3 curve;\n      uniform float threshold;\n      void main () {\n          vec3 c = texture2D(uTexture, vUv).rgb;\n          float br = max(c.r, max(c.g, c.b));\n          float rq = clamp(br - curve.x, 0.0, curve.y);\n          rq = curve.z * rq * rq;\n          c *= max(rq, br - threshold) / max(br, 0.0001);\n          gl_FragColor = vec4(c, 0.0);\n      }\n  "),bloomBlurShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform sampler2D uTexture;\n      void main () {\n          vec4 sum = vec4(0.0);\n          sum += texture2D(uTexture, vL);\n          sum += texture2D(uTexture, vR);\n          sum += texture2D(uTexture, vT);\n          sum += texture2D(uTexture, vB);\n          sum *= 0.25;\n          gl_FragColor = sum;\n      }\n  "),bloomFinalShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform sampler2D uTexture;\n      uniform float intensity;\n      void main () {\n          vec4 sum = vec4(0.0);\n          sum += texture2D(uTexture, vL);\n          sum += texture2D(uTexture, vR);\n          sum += texture2D(uTexture, vT);\n          sum += texture2D(uTexture, vB);\n          sum *= 0.25;\n          gl_FragColor = sum * intensity;\n      }\n  "),splatShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uTarget;\n      uniform float aspectRatio;\n      uniform vec3 color;\n      uniform vec2 point;\n      uniform float radius;\n      void main () {\n          vec2 p = vUv - point.xy;\n          p.x *= aspectRatio;\n          vec3 splat = exp(-dot(p, p) / radius) * color;\n          vec3 base = texture2D(uTarget, vUv).xyz;\n          gl_FragColor = vec4(base + splat, 1.0);\n      }\n  "),advectionManualFilteringShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uVelocity;\n      uniform sampler2D uSource;\n      uniform vec2 texelSize;\n      uniform vec2 dyeTexelSize;\n      uniform float dt;\n      uniform float dissipation;\n      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n          vec2 st = uv / tsize - 0.5;\n          vec2 iuv = floor(st);\n          vec2 fuv = fract(st);\n          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n      }\n      void main () {\n          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n          gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);\n          gl_FragColor.a = 1.0;\n      }\n  "),advectionShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      uniform sampler2D uVelocity;\n      uniform sampler2D uSource;\n      uniform vec2 texelSize;\n      uniform float dt;\n      uniform float dissipation;\n      void main () {\n          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n          gl_FragColor = dissipation * texture2D(uSource, coord);\n          gl_FragColor.a = 1.0;\n      }\n  "),divergenceShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying highp vec2 vUv;\n      varying highp vec2 vL;\n      varying highp vec2 vR;\n      varying highp vec2 vT;\n      varying highp vec2 vB;\n      uniform sampler2D uVelocity;\n      void main () {\n          float L = texture2D(uVelocity, vL).x;\n          float R = texture2D(uVelocity, vR).x;\n          float T = texture2D(uVelocity, vT).y;\n          float B = texture2D(uVelocity, vB).y;\n          vec2 C = texture2D(uVelocity, vUv).xy;\n          if (vL.x < 0.0) { L = -C.x; }\n          if (vR.x > 1.0) { R = -C.x; }\n          if (vT.y > 1.0) { T = -C.y; }\n          if (vB.y < 0.0) { B = -C.y; }\n          float div = 0.5 * (R - L + T - B);\n          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n      }\n  "),curlShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying highp vec2 vUv;\n      varying highp vec2 vL;\n      varying highp vec2 vR;\n      varying highp vec2 vT;\n      varying highp vec2 vB;\n      uniform sampler2D uVelocity;\n      void main () {\n          float L = texture2D(uVelocity, vL).y;\n          float R = texture2D(uVelocity, vR).y;\n          float T = texture2D(uVelocity, vT).x;\n          float B = texture2D(uVelocity, vB).x;\n          float vorticity = R - L - T + B;\n          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n      }\n  "),vorticityShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision highp float;\n      precision highp sampler2D;\n      varying vec2 vUv;\n      varying vec2 vL;\n      varying vec2 vR;\n      varying vec2 vT;\n      varying vec2 vB;\n      uniform sampler2D uVelocity;\n      uniform sampler2D uCurl;\n      uniform float curl;\n      uniform float dt;\n      void main () {\n          float L = texture2D(uCurl, vL).x;\n          float R = texture2D(uCurl, vR).x;\n          float T = texture2D(uCurl, vT).x;\n          float B = texture2D(uCurl, vB).x;\n          float C = texture2D(uCurl, vUv).x;\n          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n          force /= length(force) + 0.0001;\n          force *= curl * C;\n          force.y *= -1.0;\n          vec2 vel = texture2D(uVelocity, vUv).xy;\n          gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n      }\n  "),pressureShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying highp vec2 vUv;\n      varying highp vec2 vL;\n      varying highp vec2 vR;\n      varying highp vec2 vT;\n      varying highp vec2 vB;\n      uniform sampler2D uPressure;\n      uniform sampler2D uDivergence;\n      vec2 boundary (vec2 uv) {\n          return uv;\n          // uncomment if you use wrap or repeat texture mode\n          // uv = min(max(uv, 0.0), 1.0);\n          // return uv;\n      }\n      void main () {\n          float L = texture2D(uPressure, boundary(vL)).x;\n          float R = texture2D(uPressure, boundary(vR)).x;\n          float T = texture2D(uPressure, boundary(vT)).x;\n          float B = texture2D(uPressure, boundary(vB)).x;\n          float C = texture2D(uPressure, vUv).x;\n          float divergence = texture2D(uDivergence, vUv).x;\n          float pressure = (L + R + B + T - divergence) * 0.25;\n          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n      }\n  "),gradientSubtractShader=compileShader(gl.FRAGMENT_SHADER,"\n      precision mediump float;\n      precision mediump sampler2D;\n      varying highp vec2 vUv;\n      varying highp vec2 vL;\n      varying highp vec2 vR;\n      varying highp vec2 vT;\n      varying highp vec2 vB;\n      uniform sampler2D uPressure;\n      uniform sampler2D uVelocity;\n      vec2 boundary (vec2 uv) {\n          return uv;\n          // uv = min(max(uv, 0.0), 1.0);\n          // return uv;\n      }\n      void main () {\n          float L = texture2D(uPressure, boundary(vL)).x;\n          float R = texture2D(uPressure, boundary(vR)).x;\n          float T = texture2D(uPressure, boundary(vT)).x;\n          float B = texture2D(uPressure, boundary(vB)).x;\n          vec2 velocity = texture2D(uVelocity, vUv).xy;\n          velocity.xy -= vec2(R - L, T - B);\n          gl_FragColor = vec4(velocity, 0.0, 1.0);\n      }\n  "),blit=(gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer()),gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),gl.STATIC_DRAW),gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer()),gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),gl.STATIC_DRAW),gl.vertexAttribPointer(0,2,gl.FLOAT,!1,0,0),gl.enableVertexAttribArray(0),function(e){gl.bindFramebuffer(gl.FRAMEBUFFER,e),gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)}),simWidth,simHeight,dyeWidth,dyeHeight,density,velocity,divergence,curl,pressure,bloom,ditheringTexture=createTextureAsync(),clearProgram=new GLProgram(baseVertexShader,clearShader),colorProgram=new GLProgram(baseVertexShader,colorShader),backgroundProgram=new GLProgram(baseVertexShader,backgroundShader),displayProgram=new GLProgram(baseVertexShader,displayShader),displayBloomProgram=new GLProgram(baseVertexShader,displayBloomShader),displayShadingProgram=new GLProgram(baseVertexShader,displayShadingShader),displayBloomShadingProgram=new GLProgram(baseVertexShader,displayBloomShadingShader),bloomPrefilterProgram=new GLProgram(baseVertexShader,bloomPrefilterShader),bloomBlurProgram=new GLProgram(baseVertexShader,bloomBlurShader),bloomFinalProgram=new GLProgram(baseVertexShader,bloomFinalShader),splatProgram=new GLProgram(baseVertexShader,splatShader),advectionProgram=new GLProgram(baseVertexShader,ext.supportLinearFiltering?advectionShader:advectionManualFilteringShader),divergenceProgram=new GLProgram(baseVertexShader,divergenceShader),curlProgram=new GLProgram(baseVertexShader,curlShader),vorticityProgram=new GLProgram(baseVertexShader,vorticityShader),pressureProgram=new GLProgram(baseVertexShader,pressureShader),gradienSubtractProgram=new GLProgram(baseVertexShader,gradientSubtractShader);function initFramebuffers(){var e=getResolution(config.SIM_RESOLUTION),r=getResolution(config.DYE_RESOLUTION);simWidth=e.width,simHeight=e.height,dyeWidth=r.width,dyeHeight=r.height;var t=ext.halfFloatTexType,n=ext.formatRGBA,i=ext.formatRG,o=ext.formatR,a=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;density=null==density?createDoubleFBO(dyeWidth,dyeHeight,n.internalFormat,n.format,t,a):resizeDoubleFBO(density,dyeWidth,dyeHeight,n.internalFormat,n.format,t,a),velocity=null==velocity?createDoubleFBO(simWidth,simHeight,i.internalFormat,i.format,t,a):resizeDoubleFBO(velocity,simWidth,simHeight,i.internalFormat,i.format,t,a),divergence=createFBO(simWidth,simHeight,o.internalFormat,o.format,t,gl.NEAREST),curl=createFBO(simWidth,simHeight,o.internalFormat,o.format,t,gl.NEAREST),pressure=createDoubleFBO(simWidth,simHeight,o.internalFormat,o.format,t,gl.NEAREST),initBloomFramebuffers()}function initBloomFramebuffers(){var e=getResolution(config.BLOOM_RESOLUTION),r=ext.halfFloatTexType,t=ext.formatRGBA,n=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;bloom=createFBO(e.width,e.height,t.internalFormat,t.format,r,n),bloomFramebuffers.length=0;for(var i=0;i<config.BLOOM_ITERATIONS;i++){var o=e.width>>i+1,a=e.height>>i+1;if(o<2||a<2)break;var l=createFBO(o,a,t.internalFormat,t.format,r,n);bloomFramebuffers.push(l)}}function createFBO(e,r,t,n,i,o){gl.activeTexture(gl.TEXTURE0);var a=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,a),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,o),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,o),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE),gl.texImage2D(gl.TEXTURE_2D,0,t,e,r,0,n,i,null);var l=gl.createFramebuffer();return gl.bindFramebuffer(gl.FRAMEBUFFER,l),gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,a,0),gl.viewport(0,0,e,r),gl.clear(gl.COLOR_BUFFER_BIT),{texture:a,fbo:l,width:e,height:r,attach:function(e){return gl.activeTexture(gl.TEXTURE0+e),gl.bindTexture(gl.TEXTURE_2D,a),e}}}function createDoubleFBO(e,r,t,n,i,o){var a=createFBO(e,r,t,n,i,o),l=createFBO(e,r,t,n,i,o);return{get read(){return a},set read(e){a=e},get write(){return l},set write(e){l=e},swap:function(){var e=a;a=l,l=e}}}function resizeFBO(e,r,t,n,i,o,a){var l=createFBO(r,t,n,i,o,a);return clearProgram.bind(),gl.uniform1i(clearProgram.uniforms.uTexture,e.attach(0)),gl.uniform1f(clearProgram.uniforms.value,1),blit(l.fbo),l}function resizeDoubleFBO(e,r,t,n,i,o,a){return e.read=resizeFBO(e.read,r,t,n,i,o,a),e.write=createFBO(r,t,n,i,o,a),e}function createTextureAsync(){var e=gl.createTexture();return gl.bindTexture(gl.TEXTURE_2D,e),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,1,1,0,gl.RGB,gl.UNSIGNED_BYTE,new Uint8Array([255,255,255])),{texture:e,width:1,height:1,attach:function(r){return gl.activeTexture(gl.TEXTURE0+r),gl.bindTexture(gl.TEXTURE_2D,e),r}}}initFramebuffers(),multipleSplats(parseInt(20*Math.random())+5);var lastColorChangeTime=Date.now();function update(){resizeCanvas(),input(),config.PAUSED||step(.016),render(null),timeout=requestAnimationFrame(update)}function input(){splatStack.length>0&&multipleSplats(splatStack.pop());for(var e=0;e<pointers.length;e++){var r=pointers[e];r.moved&&(splat(r.x,r.y,r.dx,r.dy,r.color),r.moved=!1)}if(config.COLORFUL&&lastColorChangeTime+100<Date.now()){lastColorChangeTime=Date.now();for(var t=0;t<pointers.length;t++){pointers[t].color=generateColor()}}}function step(e){gl.disable(gl.BLEND),gl.viewport(0,0,simWidth,simHeight),curlProgram.bind(),gl.uniform2f(curlProgram.uniforms.texelSize,1/simWidth,1/simHeight),gl.uniform1i(curlProgram.uniforms.uVelocity,velocity.read.attach(0)),blit(curl.fbo),vorticityProgram.bind(),gl.uniform2f(vorticityProgram.uniforms.texelSize,1/simWidth,1/simHeight),gl.uniform1i(vorticityProgram.uniforms.uVelocity,velocity.read.attach(0)),gl.uniform1i(vorticityProgram.uniforms.uCurl,curl.attach(1)),gl.uniform1f(vorticityProgram.uniforms.curl,config.CURL),gl.uniform1f(vorticityProgram.uniforms.dt,e),blit(velocity.write.fbo),velocity.swap(),divergenceProgram.bind(),gl.uniform2f(divergenceProgram.uniforms.texelSize,1/simWidth,1/simHeight),gl.uniform1i(divergenceProgram.uniforms.uVelocity,velocity.read.attach(0)),blit(divergence.fbo),clearProgram.bind(),gl.uniform1i(clearProgram.uniforms.uTexture,pressure.read.attach(0)),gl.uniform1f(clearProgram.uniforms.value,config.PRESSURE_DISSIPATION),blit(pressure.write.fbo),pressure.swap(),pressureProgram.bind(),gl.uniform2f(pressureProgram.uniforms.texelSize,1/simWidth,1/simHeight),gl.uniform1i(pressureProgram.uniforms.uDivergence,divergence.attach(0));for(var r=0;r<config.PRESSURE_ITERATIONS;r++)gl.uniform1i(pressureProgram.uniforms.uPressure,pressure.read.attach(1)),blit(pressure.write.fbo),pressure.swap();gradienSubtractProgram.bind(),gl.uniform2f(gradienSubtractProgram.uniforms.texelSize,1/simWidth,1/simHeight),gl.uniform1i(gradienSubtractProgram.uniforms.uPressure,pressure.read.attach(0)),gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity,velocity.read.attach(1)),blit(velocity.write.fbo),velocity.swap(),advectionProgram.bind(),gl.uniform2f(advectionProgram.uniforms.texelSize,1/simWidth,1/simHeight),ext.supportLinearFiltering||gl.uniform2f(advectionProgram.uniforms.dyeTexelSize,1/simWidth,1/simHeight);var t=velocity.read.attach(0);gl.uniform1i(advectionProgram.uniforms.uVelocity,t),gl.uniform1i(advectionProgram.uniforms.uSource,t),gl.uniform1f(advectionProgram.uniforms.dt,e),gl.uniform1f(advectionProgram.uniforms.dissipation,config.VELOCITY_DISSIPATION),blit(velocity.write.fbo),velocity.swap(),gl.viewport(0,0,dyeWidth,dyeHeight),ext.supportLinearFiltering||gl.uniform2f(advectionProgram.uniforms.dyeTexelSize,1/dyeWidth,1/dyeHeight),gl.uniform1i(advectionProgram.uniforms.uVelocity,velocity.read.attach(0)),gl.uniform1i(advectionProgram.uniforms.uSource,density.read.attach(1)),gl.uniform1f(advectionProgram.uniforms.dissipation,config.DENSITY_DISSIPATION),blit(density.write.fbo),density.swap()}function render(e){config.BLOOM&&applyBloom(density.read,bloom),null!=e&&config.TRANSPARENT?gl.disable(gl.BLEND):(gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA),gl.enable(gl.BLEND));var r=null==e?gl.drawingBufferWidth:dyeWidth,t=null==e?gl.drawingBufferHeight:dyeHeight;if(gl.viewport(0,0,r,t),!config.TRANSPARENT){colorProgram.bind();var n=config.BACK_COLOR;gl.uniform4f(colorProgram.uniforms.color,n.r/255,n.g/255,n.b/255,1),blit(e)}if(null==e&&config.TRANSPARENT&&(backgroundProgram.bind(),gl.uniform1f(backgroundProgram.uniforms.aspectRatio,canvas.width/canvas.height),blit(null)),config.SHADING){var i=config.BLOOM?displayBloomShadingProgram:displayShadingProgram;if(i.bind(),gl.uniform2f(i.uniforms.texelSize,1/r,1/t),gl.uniform1i(i.uniforms.uTexture,density.read.attach(0)),config.BLOOM){gl.uniform1i(i.uniforms.uBloom,bloom.attach(1)),gl.uniform1i(i.uniforms.uDithering,ditheringTexture.attach(2));var o=getTextureScale(ditheringTexture,r,t);gl.uniform2f(i.uniforms.ditherScale,o.x,o.y)}}else{var a=config.BLOOM?displayBloomProgram:displayProgram;if(a.bind(),gl.uniform1i(a.uniforms.uTexture,density.read.attach(0)),config.BLOOM){gl.uniform1i(a.uniforms.uBloom,bloom.attach(1)),gl.uniform1i(a.uniforms.uDithering,ditheringTexture.attach(2));var l=getTextureScale(ditheringTexture,r,t);gl.uniform2f(a.uniforms.ditherScale,l.x,l.y)}}blit(e)}function applyBloom(e,r){if(!(bloomFramebuffers.length<2)){var t=r;gl.disable(gl.BLEND),bloomPrefilterProgram.bind();var n=config.BLOOM_THRESHOLD*config.BLOOM_SOFT_KNEE+1e-4,i=config.BLOOM_THRESHOLD-n,o=2*n,a=.25/n;gl.uniform3f(bloomPrefilterProgram.uniforms.curve,i,o,a),gl.uniform1f(bloomPrefilterProgram.uniforms.threshold,config.BLOOM_THRESHOLD),gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture,e.attach(0)),gl.viewport(0,0,t.width,t.height),blit(t.fbo),bloomBlurProgram.bind();for(var l=0;l<bloomFramebuffers.length;l++){var u=bloomFramebuffers[l];gl.uniform2f(bloomBlurProgram.uniforms.texelSize,1/t.width,1/t.height),gl.uniform1i(bloomBlurProgram.uniforms.uTexture,t.attach(0)),gl.viewport(0,0,u.width,u.height),blit(u.fbo),t=u}gl.blendFunc(gl.ONE,gl.ONE),gl.enable(gl.BLEND);for(var g=bloomFramebuffers.length-2;g>=0;g--){var m=bloomFramebuffers[g];gl.uniform2f(bloomBlurProgram.uniforms.texelSize,1/t.width,1/t.height),gl.uniform1i(bloomBlurProgram.uniforms.uTexture,t.attach(0)),gl.viewport(0,0,m.width,m.height),blit(m.fbo),t=m}gl.disable(gl.BLEND),bloomFinalProgram.bind(),gl.uniform2f(bloomFinalProgram.uniforms.texelSize,1/t.width,1/t.height),gl.uniform1i(bloomFinalProgram.uniforms.uTexture,t.attach(0)),gl.uniform1f(bloomFinalProgram.uniforms.intensity,config.BLOOM_INTENSITY),gl.viewport(0,0,r.width,r.height),blit(r.fbo)}}function splat(e,r,t,n,i){gl.viewport(0,0,simWidth,simHeight),splatProgram.bind(),gl.uniform1i(splatProgram.uniforms.uTarget,velocity.read.attach(0)),gl.uniform1f(splatProgram.uniforms.aspectRatio,canvas.width/canvas.height),gl.uniform2f(splatProgram.uniforms.point,e/canvas.width,1-r/canvas.height),gl.uniform3f(splatProgram.uniforms.color,t,-n,1),gl.uniform1f(splatProgram.uniforms.radius,config.SPLAT_RADIUS/100),blit(velocity.write.fbo),velocity.swap(),gl.viewport(0,0,dyeWidth,dyeHeight),gl.uniform1i(splatProgram.uniforms.uTarget,density.read.attach(0)),gl.uniform3f(splatProgram.uniforms.color,i.r,i.g,i.b),blit(density.write.fbo),density.swap()}function multipleSplats(e){for(var r=0;r<e;r++){var t=generateColor();t.r*=10,t.g*=10,t.b*=10,splat(canvas.width*Math.random(),canvas.height*Math.random(),1e3*(Math.random()-.5),1e3*(Math.random()-.5),t)}}function resizeCanvas(){canvas.width==canvas.clientWidth&&canvas.height==canvas.clientHeight||(canvas.width=canvas.clientWidth,canvas.height=canvas.clientHeight,initFramebuffers())}function generateColor(){var e=HSVtoRGB(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function HSVtoRGB(e,r,t){var n,i,o,a,l,u,g,m;switch(u=t*(1-r),g=t*(1-(l=6*e-(a=Math.floor(6*e)))*r),m=t*(1-(1-l)*r),a%6){case 0:n=t,i=m,o=u;break;case 1:n=g,i=t,o=u;break;case 2:n=u,i=t,o=m;break;case 3:n=u,i=g,o=t;break;case 4:n=m,i=u,o=t;break;case 5:n=t,i=u,o=g}return{r:n,g:i,b:o}}function getResolution(e){var r=gl.drawingBufferWidth/gl.drawingBufferHeight;r<1&&(r=1/r);var t=Math.round(e*r),n=Math.round(e);return gl.drawingBufferWidth>gl.drawingBufferHeight?{width:t,height:n}:{width:n,height:t}}function getTextureScale(e,r,t){return{x:r/e.width,y:t/e.height}}return update(),canvas.addEventListener("mousemove",(function(e){pointers[0].moved=pointers[0].down,pointers[0].dx=5*(e.offsetX-pointers[0].x),pointers[0].dy=5*(e.offsetY-pointers[0].y),pointers[0].x=e.offsetX,pointers[0].y=e.offsetY})),canvas.addEventListener("touchmove",(function(e){e.preventDefault();for(var r=e.targetTouches,t=0;t<r.length;t++){var n=pointers[t];n.moved=n.down,n.dx=8*(r[t].pageX-n.x),n.dy=8*(r[t].pageY-n.y),n.x=r[t].pageX,n.y=r[t].pageY}}),!1),canvas.addEventListener("mousedown",(function(){pointers[0].down=!0,pointers[0].color=generateColor()})),canvas.addEventListener("touchstart",(function(e){e.preventDefault();for(var r=e.targetTouches,t=0;t<r.length;t++)t>=pointers.length&&pointers.push(new pointerPrototype),pointers[t].id=r[t].identifier,pointers[t].down=!0,pointers[t].x=r[t].pageX,pointers[t].y=r[t].pageY,pointers[t].color=generateColor()})),canvas.addEventListener("mouseup",(function(){pointers[0].down=!1})),canvas.addEventListener("touchend",(function(e){for(var r=e.changedTouches,t=0;t<r.length;t++)for(var n=0;n<pointers.length;n++)r[t].identifier==pointers[n].id&&(pointers[n].down=!1)})),canvas.addEventListener("keydown",(function(e){"KeyP"===e.code&&(config.PAUSED=!config.PAUSED)," "===e.key&&splatStack.push(parseInt(20*Math.random())+5)})),function(){cancelAnimationFrame(timeout)}},reactHotLoader,leaveModule;__webpack_exports__.default=_default,reactHotLoader="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0,reactHotLoader&&reactHotLoader.register(_default,"default","/Users/leonzhang/Documents/github/typescript/leon-ts-app/src/pages/Painting/webGL.js"),leaveModule="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0,leaveModule&&leaveModule(module)}.call(this,__webpack_require__(75)(module))}}]);