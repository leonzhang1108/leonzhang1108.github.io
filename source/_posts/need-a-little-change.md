---
title: need-a-little-change
date: 2017-04-15 19:33:01
tags: [others]
---
__事件委托：__就是不遍历绑事件，只绑在父元素，通过事件冒泡去实现子元素的事件触发

__事件冒泡：__由内而外

__事件捕获：__由外及内

__清除浮动：__伪类after+zoom

__box-sizing：__content-box, padding-box, border-box

__Doctype：__告知浏览器的解析器用什么文档标准解析这个文档。HTML5不基于 SGML，因此不需要对DTD进行引用

__HTML5新特性：__canvas, audio, video, localStorage, sessionStorage, websocket, webworker, Geolaotion,表单控件, 语义化元素

__JS基本数据类型：__Undefined, Null, Boolean, String, Number

__JS内置对象：__Object, Array, Boolean, Number, String, Function, Arguments, Math, Date, RegExp, Error

__浏览器内核：__JS引擎，渲染引擎

__new操作符：__1.创建空对象，this引用该对象，并继承函数原型  2.属性方法加入this对象 3. 新对象由this引用，返回this

__性能优化：__减少请求次数，压缩文件，样式放顶部，脚本放底部

__优雅降级：__以最高标准编码，代码确认浏览器版本逐渐降级，降低体验，不影响功能

__渐进增强：__支持浏览器基本功能，逐渐添加新浏览器功能。

__造成内存泄漏：__当对象引用数为0，会被回收

__函数节流：__setTimeout

__Function.prototype.bind：__改变this

__媒体查询：__@media screen and (min-width: 400px) and (max-width: 700px) { … }  根据不同媒体特性加载不同样式 demo

__CSS预处理器：__SAAS, LESS, Stylus  用过stylus, @属性减少维护量, 缩进让代码结构更加清晰, 复杂逻辑可用JS做

__柯里化函数：__add函数存在的意义是为了提供闭包，递归调用add每次都会产生新闭包。  闭包真是个好东西

```javascript
//累加
function add(a) {
  function returnFun(b) {
    return add(a + b)
  }
  returnFun.toString = function(){
    return a
  }
  return returnFun
}
console.log(add(1)(2)(3).toString()) //6

//pointfree
function compose(f, g) {
    return x => f(g(x))
}
var newFunc = compose(
    list => list.forEach(val => console.log(val)), 
    string => string.split('')
)
newFunc('asdfasdfasdf')
```

__jQuery框架：__
```javascript
(function(){
  var jQuery = window.jQuery = function(selector, context) {
    return new jQuery.prototype.init(selector, context)
  }
  jQuery.fn = jQuery.prototype = {
    init: function(selector, context) {
      return this
    }
  }
  jQuery.prototype.init.prototype = jQuery.prototype
})()
```