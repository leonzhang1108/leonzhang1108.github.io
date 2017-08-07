## store
*一个应用只有一个store*

<small>store将 action 和 reducer 联系到一起的对象</small>
```js
// configure-store.js
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState)
  return store
}
```
```js
// App.js
import configureStore from './store/configure-store'
const store = configureStore();
```