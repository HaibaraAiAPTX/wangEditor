/**
 * @description render elem
 * @author wangfupeng
 */

import type { Element as SlateElement } from 'slate'
import { jsx, type VNode } from 'snabbdom'
import type { IDomEditor } from '@wangeditor/core'

/**
 * render block quote elem
 * @param _elemNode slate elem
 * @param children children
 * @param _editor editor
 * @returns vnode
 */
function renderBlockQuote(
  _elemNode: SlateElement,
  children: VNode[] | null,
  _editor: IDomEditor
): VNode {
  const vnode = <blockquote>{children}</blockquote>
  return vnode
}

export const renderBlockQuoteConf = {
  type: 'blockquote',
  renderElem: renderBlockQuote,
}
