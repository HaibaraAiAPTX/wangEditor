/**
 * @description parse html
 * @author wangfupeng
 */

import { type Descendant, Text } from 'slate'
import $, { type DOMElement } from '../../utils/dom'
import type { IDomEditor } from '@wangeditor/core'
import type { BlockQuoteElement } from './custom-types'

function parseHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor
): BlockQuoteElement {
  const $elem = $(elem)

  children = children.filter(child => {
    if (Text.isText(child)) return true
    if (editor.isInline(child)) return true
    return false
  })

  // 无 children ，则用纯文本
  if (children.length === 0) {
    children = [{ text: $elem.text().replace(/\s+/gm, ' ') }]
  }

  return {
    type: 'blockquote',
    // @ts-expect-error
    children,
  }
}

export const parseHtmlConf = {
  selector: 'blockquote:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseHtml,
}
