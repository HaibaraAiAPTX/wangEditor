/**
 * @description 自定义扩展 slate 接口属性
 * @author wangfupeng
 */
import { StyledText } from './packages/basic-modules/src/modules/text-style/custom-types'
import { ColorText } from './packages/basic-modules/src/modules/color/custom-types'
import { FontSizeAndFamilyText } from './packages/basic-modules/src/modules/font-size-family/custom-types'
import { LineHeightElement } from './packages/basic-modules/src/modules/line-height/custom-types'
import { JustifyElement } from './packages/basic-modules/src/modules/justify/custom-types'
import { IndentElement } from './packages/basic-modules/src/modules/indent/custom-types'
import { ParagraphElement } from './packages/basic-modules/src/modules/paragraph/custom-types'
import { LinkElement } from './packages/basic-modules/src/modules/link/custom-types'
import { BlockQuoteElement } from './packages/basic-modules/src/modules/blockquote/custom-types'
import {
  Header1Element,
  Header2Element,
  Header3Element,
  Header4Element,
  Header5Element,
} from './packages/basic-modules/src/modules/header/custom-types'
import { DividerElement } from './packages/basic-modules/src/modules/divider/custom-types'
import { ImageElement } from './packages/basic-modules/src/modules/image/custom-types'
import { TodoElement } from './packages/basic-modules/src/modules/todo/custom-types'
import {
  PreElement,
  CodeElement,
} from './packages/basic-modules/src/modules/code-block/custom-types'
import { VideoElement } from './packages/video-module/src/module/custom-types'
import {
  TableCellElement,
  TableRowElement,
  TableElement,
} from './packages/table-module/src/module/custom-types'
import { ListItemElement } from './packages/list-module/src/module/custom-types'

type PureText = {
  text: string
}

type CustomText = PureText | StyledText | FontSizeAndFamilyText | ColorText

type BaseElement = {
  type: string
  children: Array<CustomElement | CustomText>
}

type CustomElement =
  | BaseElement
  | LineHeightElement
  | JustifyElement
  | IndentElement
  | ParagraphElement
  | LinkElement
  | BlockQuoteElement
  | Header1Element
  | Header2Element
  | Header3Element
  | Header4Element
  | Header5Element
  | DividerElement
  | ImageElement
  | TodoElement
  | PreElement
  | CodeElement
  | VideoElement
  | TableCellElement
  | TableRowElement
  | TableElement
  | ListItemElement

declare module 'slate' {
  interface CustomTypes {
    // 扩展 Text
    Text: CustomText

    // 扩展 Element
    Element: CustomElement
  }
}
