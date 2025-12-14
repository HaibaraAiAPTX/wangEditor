/**
 * @description parse html
 * @author wangfupeng
 */

import type { Descendant } from 'slate'
import type { IDomEditor } from '@wangeditor/core'
import type { ImageElement } from './custom-types'
import type { DOMElement } from '../../utils/dom'
import $, { getStyleValue } from '../../utils/dom'

function parseHtml(elem: DOMElement, _children: Descendant[], _editor: IDomEditor): ImageElement {
  const $elem = $(elem)
  let href = $elem.attr('data-href') || ''
  href = decodeURIComponent(href) // 兼容 V4

  // width/height may be set in style or as attributes. Prefer style value if present.
  function normalizeDim(val: string): string {
    if (!val) return ''
    const v = val.trim()
    // numeric attribute values (e.g. width="100") should be interpreted as px
    if (/^\d+$/.test(v)) return `${v}px`
    return v
  }

  const widthFromStyle = getStyleValue($elem, 'width')
  const heightFromStyle = getStyleValue($elem, 'height')
  const widthAttr = $elem.attr('width') || ''
  const heightAttr = $elem.attr('height') || ''

  return {
    type: 'image',
    src: $elem.attr('src') || '',
    alt: $elem.attr('alt') || '',
    href,
    style: {
      width: normalizeDim(widthFromStyle || widthAttr),
      height: normalizeDim(heightFromStyle || heightAttr),
    },
    children: [{ text: '' }], // void node 有一个空白 text
  }
}

export const parseHtmlConf = {
  selector: 'img:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseHtml,
}
