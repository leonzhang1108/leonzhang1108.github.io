
<p>多次点击 记录点击次数</p>

```js
// vanillajs
var count = 0, t
window.addEventListener("click", function () {
  clearTimeout(t)
  count++
  t = setTimeout(function() {
    console.log(count)
    count = 0
  }, 250)
}, false)
```
```js
// rxjs
const clickStream = Observable.fromEvent(document, 'click')
clickStream
  .buffer(clickStream.debounceTime(250))
  .map(list => list.length)
  .subscribe(console.log)
```