/**
 * @description to html
 * @author wangfupeng
 */

import type { Element } from 'slate'
import type { ImageElement } from './custom-types'
import { isPxValue, pxNumber } from './_utils'

function imageToHtml(elemNode: Element, _childrenHtml: string): string {
  const { src, alt = '', href = '', style = {} } = elemNode as ImageElement
  const { width = '', height = '' } = style

  const attrs: string[] = []
  const styleParts: string[] = []

  if (width) {
    if (isPxValue(width)) {
      const num = pxNumber(width)
      attrs.push(`width="${num}"`)
    }
    styleParts.push(`width: ${width};`)
  }
  if (height) {
    if (isPxValue(height)) {
      const num = pxNumber(height)
      attrs.push(`height="${num}"`)
    }
    styleParts.push(`height: ${height};`)
  }

  const styleStr = styleParts.join('')
  const attrStr = attrs.length ? ` ${attrs.join(' ')}` : ''

  return `<img src="${src}" alt="${alt}" data-href="${href}" ${attrStr} style="${styleStr}"/>`
}

export const imageToHtmlConf = {
  type: 'image',
  elemToHtml: imageToHtml,
}
