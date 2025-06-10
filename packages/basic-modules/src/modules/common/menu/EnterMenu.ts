/**
 * @description enter menu
 * @author wangfupeng
 */

import { Range, Transforms, Editor } from 'slate'
import type { IButtonMenu, IDomEditor } from '@wangeditor/core'
import { t } from '@wangeditor/core'
import { ENTER_SVG } from '../../../constants/icon-svg'

class EnterMenu implements IButtonMenu {
  title = t('common.enter')
  iconSvg = ENTER_SVG
  tag = 'button'

  getValue(_editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (Range.isExpanded(selection)) return true
    return false
  }

  exec(editor: IDomEditor, _value: string | boolean) {
    const { selection } = editor
    if (selection == null) return
    const { anchor } = selection
    const { path } = anchor

    // 在当前位置插入空行，当前元素下移
    const newElem = { type: 'paragraph', children: [{ text: '' }] }
    const newPath = [path[0]]
    Transforms.insertNodes(editor, newElem, { at: newPath })
    editor.select(Editor.start(editor, newPath))
  }
}

export default EnterMenu
