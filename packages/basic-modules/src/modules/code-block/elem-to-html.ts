/**
 * @description to html
 * @author wangfupeng
 */

import type { Element } from 'slate'

function codeToHtml(_elem: Element, childrenHtml: string): string {
  // 代码高亮 `class="language-xxx"` 在 code-highlight 中实现
  return `<code>${childrenHtml}</code>`
}

export const codeToHtmlConf = {
  type: 'code',
  elemToHtml: codeToHtml,
}

function preToHtml(_elem: Element, childrenHtml: string): string {
  return `<pre>${childrenHtml}</pre>`
}

export const preToHtmlConf = {
  type: 'pre',
  elemToHtml: preToHtml,
}
