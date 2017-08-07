## 运用Rxjs控制异步流

```js
// 输入框自动检索
function doajax() {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => resolve(resolve))
  })
}
Observable.fromEvent(input, 'input')
  .debounceTime(300) // 防抖300毫秒
  .map(e => e.target.value) // 取值
  .filter(v => v != '')  // 过滤空
  .distinctUntilChanged()  // 若值未改变 不往下走
  .switchMap(doajax) //请求，若多个请求，取消上一个请求
  .subscribe(console.log)  // 输出
```