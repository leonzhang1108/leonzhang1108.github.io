## react-navigation

```js
StackNavigator({
  TabPage: { screen: TabPage },
  ...
}, {
  initialRouteName: 'TabPage',
  navigationOptions: {
    header: null
  },
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal
  }),
  // 回调
  onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  
  onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  
})
```