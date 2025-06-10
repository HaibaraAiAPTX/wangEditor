/**
 * @description render header
 * @author wangfupeng
 */

import type { Element as SlateElement } from 'slate'
import type { VNode } from 'snabbdom'
import { jsx } from 'snabbdom'
import type { IDomEditor } from '@wangeditor/core'

function genRenderElem(level: number) {
  /**
   * render header elem
   * @param _elemNode slate elem
   * @param children children
   * @param _editor editor
   * @returns vnode
   */
  function renderHeader(
    _elemNode: SlateElement,
    children: VNode[] | null,
    _editor: IDomEditor
  ): VNode {
    const Tag = `h${level}`
    const vnode = <Tag>{children}</Tag>
    return vnode
  }

  return renderHeader
}

const renderHeader1Conf = {
  type: 'header1', // 和 elemNode.type 一致
  renderElem: genRenderElem(1),
}
const renderHeader2Conf = {
  type: 'header2',
  renderElem: genRenderElem(2),
}
const renderHeader3Conf = {
  type: 'header3',
  renderElem: genRenderElem(3),
}
const renderHeader4Conf = {
  type: 'header4',
  renderElem: genRenderElem(4),
}
const renderHeader5Conf = {
  type: 'header5',
  renderElem: genRenderElem(5),
}

export {
  renderHeader1Conf,
  renderHeader2Conf,
  renderHeader3Conf,
  renderHeader4Conf,
  renderHeader5Conf,
}
