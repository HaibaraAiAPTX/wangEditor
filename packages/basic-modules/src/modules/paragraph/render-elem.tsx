/**
 * @description render paragraph elem
 * @author wangfupeng
 */

import type { Element as SlateElement } from 'slate'
import { jsx, type VNode } from 'snabbdom'
import type { IDomEditor } from '@wangeditor/core'

/**
 * render paragraph elem
 * @param _elemNode slate elem
 * @param children children
 * @param _editor editor
 * @returns vnode
 */
function renderParagraph(
  _elemNode: SlateElement,
  children: VNode[] | null,
  _editor: IDomEditor
): VNode {
  const vnode = <p>{children}</p>
  return vnode
}

export const renderParagraphConf = {
  type: 'paragraph',
  renderElem: renderParagraph,
}
