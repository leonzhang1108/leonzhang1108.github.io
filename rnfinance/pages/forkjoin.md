* 多个异步请求完成后处理

```js
const source = Observable.forkJoin(
    Observable.of(1, 2, 3).delay(1000),
    Observable.range(0, 10)
)
const subscription = source.subscribe(console.log)
```
* 取消请求

```js
componentWillUnmount() {
    subscription.unsubscribe()
}
```