/**
 * @description justify right menu
 * @author wangfupeng
 */

import { Transforms, Element } from 'slate'
import type { IDomEditor } from '@wangeditor/core'
import { t } from '@wangeditor/core'
import BaseMenu from './BaseMenu'
import { JUSTIFY_RIGHT_SVG } from '../../../constants/icon-svg'

class JustifyRightMenu extends BaseMenu {
  readonly title = t('justify.right')
  readonly iconSvg = JUSTIFY_RIGHT_SVG

  exec(editor: IDomEditor, _value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        textAlign: 'right',
      },
      { match: n => Element.isElement(n) && !editor.isInline(n) }
    )
  }
}

export default JustifyRightMenu
