## Observer

<p>一个回调函数的集合，它知道如何去监听由 Observable 提供的值</p>

```js
var observer = {
  x => console.log('next value: ' + x),
  err => console.error('error: ' + err),
  () => console.log('complete notification')
};
```