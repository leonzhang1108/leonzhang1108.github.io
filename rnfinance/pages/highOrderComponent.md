## 高阶组件

```js
const maskWraper = WrappedComponent => {
  return class extends Component {
    render() {
      return (
        <View style={{ flex: 1 }}>
          <WrappedComponent {...this.props} />
          <Mask />
        </View>
      )
    }
  }
}
export default maskWraper
```
