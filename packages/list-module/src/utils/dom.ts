/**
 * @description DOM 操作
 * @author wangfupeng
 */

import type { Dom7Array } from 'dom7'
import $, { append, on, focus, attr, val, html, parent, hasClass, empty } from 'dom7'

if (append) $.fn.append = append
// if (on) $.fn.on = on
// if (focus) $.fn.focus = focus
if (attr) $.fn.attr = attr
// if (val) $.fn.val = val
// if (html) $.fn.html = html
if (parent) $.fn.parent = parent
// if (hasClass) $.fn.hasClass = hasClass
// if (empty) $.fn.empty = empty

export default $

// COMPAT: This is required to prevent TypeScript aliases from doing some very
// weird things for Slate's types with the same name as globals. (2019/11/27)
// https://github.com/microsoft/TypeScript/issues/35002
import DOMNode = globalThis.Node
import DOMComment = globalThis.Comment
import DOMElement = globalThis.Element
import DOMText = globalThis.Text
import DOMRange = globalThis.Range
import DOMSelection = globalThis.Selection
import DOMStaticRange = globalThis.StaticRange
export { DOMNode, DOMComment, DOMElement, DOMText, DOMRange, DOMSelection, DOMStaticRange }

/**
 * 获取 tagName lower-case
 * @param $elem $elem
 */
export function getTagName($elem: Dom7Array): string {
  if ($elem.length) return $elem[0].tagName.toLowerCase()
  return ''
}
