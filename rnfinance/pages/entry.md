## Entry *app.js*

## redux传递全局store

```js
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