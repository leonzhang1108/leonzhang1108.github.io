## action
*本质上是 JavaScript 普通对象*

<small> 约定 action 内使用一个字符串类型的 type 字段来表示将要执行的动作</small>
```js
// ActionTypes.js
export const SHOW_MASK_ACTION = 'SHOW_MASK_ACTION';
```
```js
// MaskAction.js
import * as types from '../common/ActionTypes';
export function showMaskAction(username, password) {
  return dispatch => {
    dispatch(showMask())
  }
}
```
```js
// HYHeader.js
import { showMaskAction } from '../actions/MaskAction'
```