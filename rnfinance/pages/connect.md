## connect & mapStateToProps
* *一个柯里化函数  先接受数据绑定(mapStateToProps)和事件绑定(mapDispatchToProps)，再接受将要绑定的组件*

* *构建Redux系统时候会被初始化，但需要告知React组件*

```js
// HYHeader.js
...
function mapStateToProps(state) {
  const { login, mask } = state;
  return {
    login,
    mask
  }
}
export default connect(mapStateToProps)(HYHeader)
```