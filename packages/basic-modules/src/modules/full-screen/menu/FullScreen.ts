/**
 * @description redo menu
 * @author wangfupeng
 */

import type { IButtonMenu, IDomEditor } from '@wangeditor/core'
import { t } from '@wangeditor/core'
import { FULL_SCREEN_SVG } from '../../../constants/icon-svg'

class FullScreen implements IButtonMenu {
  title = t('fullScreen.title')
  iconSvg = FULL_SCREEN_SVG
  tag = 'button'
  alwaysEnable = true

  getValue(_editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return editor.isFullScreen
  }

  isDisabled(_editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, _value: string | boolean) {
    if (editor.isFullScreen) {
      editor.unFullScreen()
    } else {
      editor.fullScreen()
    }
  }
}

export default FullScreen
