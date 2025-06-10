/**
 * @description undo menu
 * @author wangfupeng
 */

import { type IButtonMenu, type IDomEditor, t } from '@wangeditor/core'
import { UNDO_SVG } from '../../../constants/icon-svg'

class UndoMenu implements IButtonMenu {
  title = t('undo.undo')
  iconSvg = UNDO_SVG
  tag = 'button'

  getValue(_editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) return true
    return false
  }

  exec(editor: IDomEditor, _value: string | boolean) {
    if (typeof editor.undo === 'function') {
      editor.undo()
    }
  }
}

export default UndoMenu
