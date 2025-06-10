/**
 * @description paragraph plugin test
 * @author wangfupeng
 */

import type { Point } from 'slate'
import { Editor, Transforms } from 'slate'
import type { IDomEditor } from '@wangeditor/core'
import { DomEditor } from '@wangeditor/core'
import createEditor from '../../../../tests/utils/create-editor'
import withParagraph from '../../src/modules/paragraph/plugin'

let editor: IDomEditor
let startLocation: Point
describe('paragraph plugin', () => {
  beforeEach(() => {
    editor = withParagraph(createEditor())
    startLocation = Editor.start(editor, [])
  })

  it('delete to clear text', () => {
    editor.select(startLocation)
    Transforms.setNodes(editor, { type: 'header1', children: [] }) // 设置 header
    editor.deleteBackward('character') // 向后删除
    const selectedParagraph1 = DomEditor.getSelectedNodeByType(editor, 'paragraph')
    expect(selectedParagraph1).not.toBeNull() // 执行删除后，header 变为 paragraph

    Transforms.setNodes(editor, { type: 'blockquote', children: [] }) // 设置 blockquote
    editor.deleteForward('character') // 向前删除
    const selectedParagraph2 = DomEditor.getSelectedNodeByType(editor, 'paragraph')
    expect(selectedParagraph2).not.toBeNull() // 执行删除后，header 变为 paragraph
  })
})
