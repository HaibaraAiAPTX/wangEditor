/**
 * @description parse style html
 * @author wangfupeng
 */

import type { Descendant } from 'slate'
import { Element } from 'slate'
import type { IDomEditor } from '@wangeditor/core'
import type { IndentElement } from './custom-types'
import type { DOMElement } from '../../utils/dom'
import $, { getStyleValue } from '../../utils/dom'

export function parseStyleHtml(
  elem: DOMElement,
  node: Descendant,
  _editor: IDomEditor
): Descendant {
  const $elem = $(elem)
  if (!Element.isElement(node)) return node

  const elemNode = node as IndentElement

  const indent = getStyleValue($elem, 'text-indent')
  const indentNumber = parseInt(indent, 10)
  if (indent && indentNumber > 0) {
    elemNode.indent = indent
  }

  return elemNode
}
