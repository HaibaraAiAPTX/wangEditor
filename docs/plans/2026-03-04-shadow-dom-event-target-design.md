# Shadow DOM 事件处理兼容方案

## 问题背景

在 wangEditor 的 Shadow DOM 模式下，表格的拖拽调整列宽功能失效。原因是 `event.target` 在 Shadow DOM 中会被事件重定向（event retargeting）机制调整为 shadow tree 边界的 host 元素，导致 `tagName` 检查失败。

## 解决方案

使用 `event.composedPath()` 获取事件的完整传播路径，该路径能正确穿越 Shadow DOM 边界。

## 核心改动

### 1. 新增工具函数（`packages/core/src/utils/dom.ts`）

```typescript
/**
 * 从事件中获取目标元素，兼容 Shadow DOM
 * @param event 事件对象
 * @param selector CSS 选择器或匹配函数
 * @returns 匹配的元素，未找到返回 null
 */
export function getEventTarget(
  event: Event,
  selector: string | ((el: HTMLElement) => boolean)
): HTMLElement | null {
  const path = event.composedPath()

  for (const item of path) {
    if (item instanceof HTMLElement) {
      if (typeof selector === 'string') {
        if (item.matches(selector)) return item
      } else if (selector(item)) {
        return item
      }
    }
  }

  return null
}
```

### 2. 修改表格渲染（`packages/table-module/src/module/render-elem/render-cell.tsx`）

**移除全局事件绑定**，改为在每个 cell 元素上绑定 mousedown 事件：

```typescript
import { getEventTarget } from '@wangeditor/core'

// 删除全局绑定的 onMouseDown 和相关代码
// $body.on('mousedown', onMouseDown) // 删除

function renderTableCell(...) {
  // ...

  const vnode = (
    <Tag
      on={{
        mousemove: /* 现有代码 */,

        mousedown: (event: MouseEvent) => {
          const elem = getEventTarget(event as Event, (el) => el.tagName === 'TH' || el.tagName === 'TD')
          if (!elem) return

          if (elem.style.cursor !== 'col-resize') return
          elem.style.cursor = 'auto'

          event.preventDefault()

          isMouseDownForResize = true
          clientXWhenMouseDown = event.clientX
          cellWidthWhenMouseDown = elem.getBoundingClientRect().width
          editorWhenMouseDown = editor
          cellPathWhenMouseDown = DomEditor.findPath(editor, cellNode)

          $(document).on('mousemove', onMouseMove)
          $(document).on('mouseup', onMouseUp)
        }
      }}
    >
      {children}
    </Tag>
  )
}
```

## 单元测试

在 `packages/core/src/utils/__tests__/dom.test.ts` 添加：

- 普通 DOM 场景测试
- Shadow DOM 场景测试
- 自定义匹配函数测试
- 未找到场景测试

## 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| `event.composedPath()` | 53+ | 63+ | 10+ | 79+ |
| Shadow DOM | 53+ | 63+ | 10+ | 79+ |

现代浏览器全部支持，不考虑 IE11。

## 实施步骤

1. 在 `dom.ts` 添加 `getEventTarget` 函数
2. 添加单元测试并验证通过
3. 修改 `render-cell.tsx` 使用新函数
4. 在 Shadow DOM 模式下手动测试表格拖拽功能
5. 考虑迁移其他模块的类似代码

## 影响范围

- 新增功能，向后兼容
- 不破坏现有非 Shadow DOM 场景的代码
