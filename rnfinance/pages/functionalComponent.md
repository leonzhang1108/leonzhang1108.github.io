## 函数式组件

```js
const maskWraper = WrappedComponent => {
  return ({ props }) => {
    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent {...props} />
        <Mask />
      </View>
    )
  }
}
export default maskWraper
```