## Subscription

<p>可清理资源的对象，表示 Observable 的执行，主要用于取消 Observable 的执行</p>

```js
var observable = Observable.interval(1000);
var subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();
```