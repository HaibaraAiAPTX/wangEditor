/**
 * @description textStyle to html
 * @author wangfupeng
 */

import type { Descendant } from 'slate'
import { Element } from 'slate'
import $, { getOuterHTML } from '../../utils/dom'
import type { JustifyElement } from './custom-types'

export function styleToHtml(node: Descendant, elemHtml: string): string {
  if (!Element.isElement(node)) return elemHtml

  const { textAlign } = node as JustifyElement // 如 'left'/'right'/'center' 等
  if (!textAlign) return elemHtml

  // 设置样式
  const $elem = $(elemHtml)
  $elem.css('text-align', textAlign)

  // 输出 html
  const outerHtml = getOuterHTML($elem)
  return outerHtml
}
