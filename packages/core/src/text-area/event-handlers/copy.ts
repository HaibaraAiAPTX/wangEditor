/**
 * @description 处理 copy 事件
 * @author wangfupeng
 */

import { type IDomEditor } from '../../editor/interface'
// import { DomEditor } from '../../editor/dom-editor'
import type TextArea from '../TextArea'
import { hasEditableTarget } from '../helpers'

function handleOnCopy(e: Event, textarea: TextArea, editor: IDomEditor) {
  const event = e as ClipboardEvent

  if (!hasEditableTarget(editor, event.target)) return
  event.preventDefault()

  const data = event.clipboardData
  if (data == null) return
  editor.setFragmentData(data)
}

export default handleOnCopy
