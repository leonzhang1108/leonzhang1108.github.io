## Reducer
*Store 收到 Action 以后，给出一个新的 State 的计算过程*

<small>约定 action 内使用一个字符串类型的 type 字段来表示将要执行的动作</small>
```js
// MaskReducer.js
import * as types from '../common/ActionTypes'
const initialState = {
  showMask: false
}
export default function login(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MASK_ACTION:
      return Object.assign({}, state, {
        showMask: true
      })
    ...
    default:
      return state
  }
}
```