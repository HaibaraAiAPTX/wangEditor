/**
 * @description slate 插件 - event data 相关
 * @author wangfupeng
 */

import type { Node } from 'slate'
import { Editor, Transforms, Range } from 'slate'
import { DomEditor } from '../dom-editor'
import type { IDomEditor } from '../..'

import { isDOMText, getPlainText } from '../../utils/dom'

export const withEventData = <T extends Editor>(editor: T) => {
  const e = editor as T & IDomEditor
  const { insertText, insertFragment } = e

  e.setFragmentData = (data: Pick<DataTransfer, 'getData' | 'setData'>) => {
    const { selection } = e

    if (!selection) {
      return
    }

    // 获取开始、结束两个 point { path, offset }
    const [start, end] = Range.edges(selection)
    // Editor.void - Match a void node in the current branch of the editor.
    const startVoid = Editor.void(e, { at: start.path })
    const endVoid = Editor.void(e, { at: end.path })

    if (Range.isCollapsed(selection) && !startVoid) {
      return
    }

    // Create a fake selection so that we can add a Base64-encoded copy of the
    // fragment to the HTML, to decode on future pastes.
    const domRange = DomEditor.toDOMRange(e, selection)
    let contents = domRange.cloneContents()
    let attach = contents.childNodes[0] as HTMLElement

    // Make sure attach is non-empty, since empty nodes will not get copied.
    contents.childNodes.forEach(node => {
      if (node.textContent && node.textContent.trim() !== '') {
        attach = node as HTMLElement
      }
    })

    // COMPAT: If the end node is a void node, we need to move the end of the
    // range from the void node's spacer span, to the end of the void node's
    // content, since the spacer is before void's content in the DOM.
    if (endVoid) {
      const [voidNode] = endVoid
      const r = domRange.cloneRange()
      const domNode = DomEditor.toDOMNode(e, voidNode)
      r.setEndAfter(domNode)
      contents = r.cloneContents()
    }

    // COMPAT: If the start node is a void node, we need to attach the encoded
    // fragment to the void node's content node instead of the spacer, because
    // attaching it to empty `<div>/<span>` nodes will end up having it erased by
    // most browsers. (2018/04/27)
    if (startVoid) {
      attach = contents.querySelector('[data-slate-spacer]')! as HTMLElement
    }

    // Remove any zero-width space spans from the cloned DOM so that they don't
    // show up elsewhere when pasted.
    Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach(zw => {
      const isNewline = zw.getAttribute('data-slate-zero-width') === 'n'
      zw.textContent = isNewline ? '\n' : ''
    })

    // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
    // in the HTML, and can be used for intra-Slate pasting. If it's a text
    // node, wrap it in a `<span>` so we have something to set an attribute on.
    if (isDOMText(attach)) {
      const span = attach.ownerDocument.createElement('span')
      // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
      // then leading and trailing spaces will be ignored. (2017/09/21)
      span.style.whiteSpace = 'pre'
      span.appendChild(attach)
      contents.appendChild(span)
      attach = span
    }

    const fragment = e.getFragment()
    const string = JSON.stringify(fragment)
    const encoded = window.btoa(encodeURIComponent(string))
    attach.setAttribute('data-slate-fragment', encoded)
    data.setData('application/x-slate-fragment', encoded)

    // Add the content to a <div> so that we can get its inner HTML.
    const div = contents.ownerDocument.createElement('div')
    div.appendChild(contents)
    div.setAttribute('hidden', 'true')
    contents.ownerDocument.body.appendChild(div)
    data.setData('text/html', div.innerHTML)
    data.setData('text/plain', getPlainText(div))
    contents.ownerDocument.body.removeChild(div)

    return data
  }

  e.insertData = (data: DataTransfer) => {
    const fragment = data.getData('application/x-slate-fragment')
    if (fragment) {
      const decoded = decodeURIComponent(window.atob(fragment))
      const parsed = JSON.parse(decoded) as Node[]
      e.insertFragment(parsed)
      return
    }

    const text = data.getData('text/plain')
    const html = data.getData('text/html')
    // const rtf = data.getData('text/rtf')

    if (html) {
      e.dangerouslyInsertHtml(html)
      return
    }

    if (text) {
      const lines = text.split(/\r\n|\r|\n/)
      let split = false

      for (const line of lines) {
        if (split) {
          Transforms.splitNodes(e, { always: true })
        }

        insertText(line)
        split = true
      }
      return
    }
  }

  return e
}
