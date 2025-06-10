/**
 * @description to html
 * @author wangfupeng
 */

import type { Element } from 'slate'

function pToHtml(_elem: Element, childrenHtml: string): string {
  if (childrenHtml === '') {
    return '<p><br></p>'
  }
  return `<p>${childrenHtml}</p>`
}

export const pToHtmlConf = {
  type: 'paragraph',
  elemToHtml: pToHtml,
}
