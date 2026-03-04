# Shadow DOM 事件处理兼容实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复 wangEditor 在 Shadow DOM 模式下表格列宽拖拽功能失效的问题

**Architecture:** 在 `dom.ts` 中添加 `getEventTarget` 工具函数，使用 `event.composedPath()` 遍历事件路径以兼容 Shadow DOM。修改 `render-cell.tsx` 使用新工具函数替代 `event.target`。

**Tech Stack:** TypeScript, Slate.js, Snabbdom, jQuery-style DOM 操作 (`$`), Shadow DOM API

---

### Task 1: 添加 `getEventTarget` 工具函数

**Files:**
- Modify: `packages/core/src/utils/dom.ts`

**Step 1: 在 dom.ts 末尾添加 `getEventTarget` 函数**

找到文件末尾，在最后一个 `export` 语句之后添加：

```typescript
/**
 * 从事件中获取目标元素，兼容 Shadow DOM
 * @param event 事件对象
 * @param selector CSS 选择器或匹配函数
 * @returns 匹配的元素，未找到返回 null
 *
 * @example
 * // 使用 CSS 选择器
 * const cell = getEventTarget(event, 'td')
 *
 * // 使用自定义匹配函数
 * const editable = getEventTarget(event, (el) => el.contentEditable === 'true')
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

**Step 2: 导出新函数**

在 `dom.ts` 文件顶部找到现有的 `export` 语句区域，确认函数已正确导出（通过 `export function` 声明）。

**Step 3: 提交**

```bash
cd packages/core
git add src/utils/dom.ts
git commit -m "feat(core): add getEventTarget utility for Shadow DOM event handling

- Use event.composedPath() to traverse event path across Shadow DOM boundaries
- Support both CSS selector and custom matcher function
- Enable reliable event target retrieval in shadow mode"

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

---

### Task 2: 添加单元测试

**Files:**
- Create: `packages/core/__tests__/utils/dom-getEventTarget.test.ts`

**Step 1: 创建测试文件**

创建新文件 `packages/core/__tests__/utils/dom-getEventTarget.test.ts`：

```typescript
import { getEventTarget } from '../../src/utils/dom'

describe('getEventTarget - Shadow DOM compatible', () => {
  afterEach(() => {
    // 清理可能添加到 body 的元素
    while (document.body.lastChild) {
      if (document.body.lastChild instanceof HTMLDivElement) {
        document.body.removeChild(document.body.lastChild)
      } else {
        break
      }
    }
  })

  it('should find element by CSS selector in normal DOM', () => {
    const div = document.createElement('div')
    const button = document.createElement('button')
    button.className = 'test-btn'
    div.appendChild(button)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', { value: button, enumerable: true })

    const result = getEventTarget(event, 'button.test-btn')
    expect(result).toBe(button)
  })

  it('should find element inside Shadow DOM', () => {
    const host = document.createElement('div')
    document.body.appendChild(host)

    const shadowRoot = host.attachShadow({ mode: 'open' })
    const button = document.createElement('button')
    button.className = 'shadow-btn'
    shadowRoot.appendChild(button)

    const event = new MouseEvent('click', { bubbles: true, composed: true })
    Object.defineProperty(event, 'target', { value: button, enumerable: true })

    const result = getEventTarget(event, 'button.shadow-btn')
    expect(result).toBe(button)
  })

  it('should find element with tagName selector', () => {
    const div = document.createElement('div')
    const td = document.createElement('td')
    div.appendChild(td)

    const event = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(event, 'target', { value: td, enumerable: true })

    const result = getEventTarget(event, 'td')
    expect(result).toBe(td)
  })

  it('should support custom matcher function', () => {
    const div = document.createElement('div')
    div.dataset.test = 'value'

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', { value: div, enumerable: true })

    const result = getEventTarget(event, (el) => el.dataset.test === 'value')
    expect(result).toBe(div)
  })

  it('should support custom matcher with tagName check (table use case)', () => {
    const div = document.createElement('div')
    const th = document.createElement('th')
    div.appendChild(th)

    const event = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(event, 'target', { value: th, enumerable: true })

    const result = getEventTarget(event, (el) => el.tagName === 'TH' || el.tagName === 'TD')
    expect(result).toBe(th)
  })

  it('should return null when no match found', () => {
    const div = document.createElement('div')
    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', { value: div, enumerable: true })

    const result = getEventTarget(event, 'button')
    expect(result).toBeNull()
  })

  it('should return null when custom matcher returns false', () => {
    const div = document.createElement('div')
    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', { value: div, enumerable: true })

    const result = getEventTarget(event, (el) => el.tagName === 'BUTTON')
    expect(result).toBeNull()
  })
})
```

**Step 2: 运行测试验证通过**

```bash
cd f:/Project/wangEditor
pnpm test -- dom-getEventTarget
```

预期：所有测试通过

**Step 3: 提交**

```bash
cd packages/core
git add __tests__/utils/dom-getEventTarget.test.ts
git commit -m "test(core): add vitest unit tests for getEventTarget utility

- Test normal DOM event target retrieval
- Test Shadow DOM event target retrieval
- Test CSS selector and custom matcher
- Test edge cases (no match, null returns)"

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

---

### Task 3: 修改 render-cell.tsx 移除全局事件绑定

**Files:**
- Modify: `packages/table-module/src/module/render-elem/render-cell.tsx`

**Step 1: 删除全局 mousedown 绑定相关代码**

在 `render-cell.tsx` 中：

1. 删除第 25-44 行的 `onMouseDown` 函数
2. 删除第 45 行的 `$body.on('mousedown', onMouseDown)` 绑定
3. 删除不再需要的全局状态变量（如果有的话）

删除后文件开头应该是：

```typescript
/**
 * @description render cell
 * @author wangfupeng
 */

import throttle from 'lodash.throttle'
import type { Element as SlateElement, Location } from 'slate'
import { Transforms } from 'slate'
import type { VNode } from 'snabbdom'
import { jsx } from 'snabbdom'
import type { IDomEditor } from '@wangeditor/core'
import { DomEditor, getEventTarget } from '@wangeditor/core'
import type { TableCellElement } from '../custom-types'
import { isCellInFirstRow } from '../helpers'
import $ from '../../utils/dom'

// 拖拽列宽相关信息
let isMouseDownForResize = false
let clientXWhenMouseDown = 0
let cellWidthWhenMouseDown = 0
let cellPathWhenMouseDown: Location | null = null
let editorWhenMouseDown: IDomEditor | null = null

// onMouseDown 函数已删除，将在 renderTableCell 中内联处理
```

**Step 2: 修改 mousemove 事件处理中的事件绑定**

将 `onMouseMove` 中对 `$body` 的引用改为 `document`：

找到 `onMouseUp` 函数，修改事件绑定和解绑：

```typescript
function onMouseUp(event: Event) {
  isMouseDownForResize = false
  editorWhenMouseDown = null
  cellPathWhenMouseDown = null

  // 解绑事件 - 使用 document 代替 $body
  $(document).off('mousemove', onMouseMove)
  $(document).off('mouseup', onMouseUp)
}
```

**Step 3: 提交**

```bash
cd packages/table-module
git add src/module/render-elem/render-cell.tsx
git commit -m "refactor(table): remove global mousedown binding

- Remove global $body mousedown event listener
- Will use cell-level mousedown handler instead
- Change document event binding to $(document) for consistency"

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

---

### Task 4: 在 renderTableCell 中添加 mousedown 事件处理

**Files:**
- Modify: `packages/table-module/src/module/render-elem/render-cell.tsx`

**Step 1: 在 renderTableCell 函数的 vnode on 属性中添加 mousedown 处理**

找到 `renderTableCell` 函数中的 vnode 定义，在 `on` 属性中添加 `mousedown`：

```typescript
const vnode = (
  <Tag
    colSpan={colSpan}
    rowSpan={rowSpan}
    style={{ borderRightWidth: '3px' }}
    on={{
      mousemove: throttle(function (this: VNode, event: MouseEvent) {
        // ... 现有代码保持不变 ...
      }, 100),

      // 新增 mousedown 事件处理
      mousedown: (event: MouseEvent) => {
        // 使用 getEventTarget 兼容 Shadow DOM
        const elem = getEventTarget(event as Event, (el) => el.tagName === 'TH' || el.tagName === 'TD')
        if (!elem) return

        // 检查是否在列宽调整模式
        if (elem.style.cursor !== 'col-resize') return

        // 开始拖拽
        elem.style.cursor = 'auto'
        event.preventDefault()

        // 记录必要信息
        isMouseDownForResize = true
        clientXWhenMouseDown = event.clientX
        cellWidthWhenMouseDown = elem.getBoundingClientRect().width
        editorWhenMouseDown = editor
        cellPathWhenMouseDown = DomEditor.findPath(editor, cellNode)

        // 绑定 document 级事件以确保拖拽过程不丢失
        $(document).on('mousemove', onMouseMove)
        $(document).on('mouseup', onMouseUp)
      }
    }}
  >
    {children}
  </Tag>
)
```

**Step 2: 提交**

```bash
cd packages/table-module
git add src/module/render-elem/render-cell.tsx
git commit -m "fix(table): add Shadow DOM compatible mousedown handler for column resize

- Use getEventTarget with composedPath() for Shadow DOM support
- Handle mousedown at cell level instead of global body binding
- Properly capture TH/TD elements across shadow boundaries"

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

---

### Task 5: 构建项目验证编译通过

**Files:**
- Root: `package.json`

**Step 1: 构建所有包**

```bash
cd f:/Project/wangEditor
npm run build
```

预期：编译无错误

**Step 2: 检查 table-module 构建**

```bash
ls -la packages/table-module/lib/
```

预期：`lib` 目录存在且包含编译后的文件

---

### Task 6: 手动测试验证

**Files:**
- None (manual testing)

**Step 1: 创建测试 HTML 文件**

创建一个临时测试文件 `test-shadow-table.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Shadow DOM Table Test</title>
  <style>
    #editor-container {
      width: 800px;
      height: 400px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <h1>Shadow DOM 表格列宽拖拽测试</h1>
  <div id="host"></div>

  <script type="module">
    import { createEditor, createToolbar } from '@wangeditor/editor'
    import '@wangeditor/editor/dist/css/style.css'

    // 创建 Shadow DOM 容器
    const host = document.getElementById('host')
    const shadowRoot = host.attachShadow({ mode: 'open' })

    // 在 Shadow DOM 中创建编辑器容器
    const container = document.createElement('div')
    container.id = 'editor-container'
    shadowRoot.appendChild(container)

    // 复制样式到 Shadow DOM
    const style = document.createElement('style')
    style.textContent = `
      #editor-container {
        width: 800px;
        height: 400px;
        border: 1px solid #ccc;
      }
    `
    shadowRoot.appendChild(style)

    // 创建编辑器
    const editorConfig = {
      placeholder: '请插入表格测试列宽拖拽...',
      onChange(editor) {
        console.log(editor.getHtml())
      }
    }

    const toolbarConfig = {}

    const editor = createEditor({
      selector: '#editor-container',
      html: '<p>测试文本</p>',
      config: editorConfig,
      mode: 'shadow' // 确保 shadow 模式
    })

    const toolbar = createToolbar({
      editor,
      selector: '#editor-container',
      config: toolbarConfig,
      mode: 'shadow'
    })

    // 提示信息
    console.log('请在编辑器中插入表格，然后尝试拖拽调整列宽')
    console.log('在 Shadow DOM 模式下，列宽拖拽应该正常工作')
  </script>
</body>
</html>
```

**Step 2: 运行本地开发服务器**

```bash
cd f:/Project/wangEditor
npm run dev
```

**Step 3: 测试步骤**

1. 在浏览器中打开编辑器
2. 点击表格工具栏图标插入表格
3. 将鼠标移动到第一行单元格的右边缘
4. 验证光标变为 `col-resize`
5. 按下鼠标左键并拖动
6. 验证列宽能正常调整

**预期结果：**
- 在普通模式下列宽拖拽正常
- 在 Shadow DOM 模式下列宽拖拽正常（这是修复的目标）

---

### Task 7: 更新类型导出（如果需要）

**Files:**
- Check: `packages/core/src/index.ts`

**Step 1: 检查 getEventTarget 是否需要导出**

查看 `packages/core/src/index.ts`，如果工具函数从 `utils/dom` 单独导出，添加：

```typescript
export { getEventTarget } from './utils/dom'
```

如果 dom.ts 的导出已经在 index 中通过 `export * from './utils/dom'` 处理，则跳过此步骤。

**Step 2: 验证 table-module 可以正确导入**

```bash
cd packages/table-module
npm run build
```

预期：编译无错误，无 "Cannot find module '@wangeditor/core'" 错误

---

## 总结

这个修复通过以下方式解决 Shadow DOM 中事件目标获取的问题：

1. **核心工具函数**：使用 `event.composedPath()` 遍历完整事件路径
2. **表格模块修改**：移除全局事件绑定，改为 cell 级绑定
3. **完整测试覆盖**：单元测试 + 手动测试验证

**向后兼容**：新函数不影响现有代码，非 Shadow DOM 场景继续正常工作。
