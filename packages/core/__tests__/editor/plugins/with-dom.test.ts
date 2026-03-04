/**
 * @description editor DOM API test
 * @author wangfupeng
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Editor } from 'slate'
import createCoreEditor from '../../create-core-editor' // packages/core 不依赖 packages/editor ，不能使用后者的 createEditor
import { withDOM } from '../../../src/editor/plugins/with-dom'

function createEditor(...args) {
  return withDOM(createCoreEditor(...args))
}

describe('editor DOM API', () => {
  function getStartLocation(editor) {
    return Editor.start(editor, [])
  }

  it('editor id', () => {
    const editor = createEditor()
    expect(editor.id).not.toBeNull()
  })

  it('isFullScreen fullScreen unFullScreen', async () => {
    const editor = createEditor()

    expect(editor.isFullScreen).toBeFalsy()

    editor.fullScreen()
    expect(editor.isFullScreen).toBeTruthy()

    editor.unFullScreen()
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(editor.isFullScreen).toBeFalsy()
  })

  // TODO focus blur isFocused 用 jest 测试异常，以及 editor-config.test.ts 中的 `onFocus` `onBlur`

  it('disable isDisabled enable', () => {
    const editor = createEditor()
    editor.select(getStartLocation(editor))

    expect(editor.isDisabled()).toBeFalsy()
    editor.insertText('123')
    expect(editor.getText().length).toBe(3)

    editor.disable()
    expect(editor.isDisabled()).toBeTruthy()
    editor.insertText('123') // disabled ，不会插入
    expect(editor.getText().length).toBe(3)

    editor.enable()
    expect(editor.isDisabled()).toBeFalsy()
    editor.insertText('123') // enable ，可以插入
    expect(editor.getText().length).toBe(6)
  })

  it('destroy', async () => {
    const editor = createEditor()
    expect(editor.isDestroyed).toBeFalsy()

    await new Promise(resolve => setTimeout(resolve))
    editor.destroy()
    expect(editor.isDestroyed).toBeTruthy()
  })

  it('toDOMNode', async () => {
    const p = { type: 'paragraph', children: [{ text: 'hello' }] }
    const editor = createEditor({
      content: [p],
    })

    await new Promise(resolve => setTimeout(resolve))
    const domNode = editor.toDOMNode(p)
    expect(domNode.tagName).toBe('DIV')
  })
})
