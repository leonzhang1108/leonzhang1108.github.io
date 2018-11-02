# 渲染

<ul>
  <li>(a, b): 图片左上角坐标</li>
  <li>s: 缩放倍数</li>
</ul>

```
const renderPoints = originPoints.map(
  ({x, y}) => ({
    x: x * s + a,
    y: y * s + b
  })
)
```