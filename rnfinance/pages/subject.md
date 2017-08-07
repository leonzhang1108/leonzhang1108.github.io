## Subject

<p>相当于 EventEmitter，并且是将值或事件**多路推送**给多个 Observer 的唯一方式。每个 Subject 都是 Observable</p>

```js
var observable1 = Observable.interval(1000);
var subject = new Subject();
subject.subscribe(x => console.log('hello'+x))
subject.subscribe(x => console.log('world'+x))
var subscription = observable1.subscribe(subject)
```