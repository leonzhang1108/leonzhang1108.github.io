
## Reducer

*组合后统一输出*

```js
// reducers/index.js
import { combineReducers } from 'redux'
import login from './LoginReducers'
...
const rootReducer = combineReducers({
  login,
  ...
})
export default rootReducer
```