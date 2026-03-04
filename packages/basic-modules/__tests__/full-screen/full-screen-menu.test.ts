/**
 * @description full screen menu test
 * @author wangfupeng
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

import createEditor from '../../../../tests/utils/create-editor'
import FullScreen from '../../src/modules/full-screen/menu/FullScreen'

describe('full screen menu', () => {
  const editor = createEditor()
  const menu = new FullScreen()

  it('full screen menu', async () => {
    menu.exec(editor, '') // 设置全屏
    expect(menu.isActive(editor)).toBeTruthy()

    menu.exec(editor, '') // 取消全屏（有延迟）
    await new Promise(resolve => setTimeout(resolve, 500))
    expect(menu.isActive(editor)).toBeFalsy()
  })
})
