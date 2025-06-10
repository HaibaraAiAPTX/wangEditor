/**
 * @description render row
 * @author wangfupeng
 */

import type { Element as SlateElement } from 'slate'
import type { VNode } from 'snabbdom'
import { jsx } from 'snabbdom'
import type { IDomEditor } from '@wangeditor/core'

function renderTableRow(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const vnode = <tr>{children}</tr>
  return vnode
}

export default renderTableRow
