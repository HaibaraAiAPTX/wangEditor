/**
 * @description render line-height style
 * @author wangfupeng
 */

import type { Descendant } from 'slate'
import { Element } from 'slate'
import type { VNode } from 'snabbdom'
import { jsx } from 'snabbdom'
import { addVnodeStyle } from '../../utils/vdom'
import type { LineHeightElement } from './custom-types'

/**
 * 添加样式
 * @param node slate elem
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  if (!Element.isElement(node)) return vnode

  const { lineHeight } = node as LineHeightElement // 如 '1' '1.5'
  const styleVnode: VNode = vnode

  if (lineHeight) {
    addVnodeStyle(styleVnode, { lineHeight })
  }

  return styleVnode
}
