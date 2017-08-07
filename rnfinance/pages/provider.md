## Provider
* *作为顶层app的分发点，只有store属性，他将state分发给所有connect的组件*

```js
// app.js
import { Provider } from 'react-redux'
import configureStore from './store/configure-store'
const store = configureStore();
const App = StackNavigator({...})
class rootApp extends Component {
  ...
  render() {
    return (
      <Provider store={store}>
        <App  />
      </Provider>
    )
  }
}
```