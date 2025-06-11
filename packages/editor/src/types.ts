export type {
  BlockQuoteElement,
  PreElement,
  CodeElement,
  ColorText,
  DividerElement,
  FontSizeAndFamilyText,
  Header1Element,
  Header2Element,
  Header3Element,
  Header4Element,
  Header5Element,
  ImageElement,
  ImageStyle,
  IndentElement,
  JustifyElement,
  LineHeightElement,
  LinkElement,
  ParagraphElement,
  StyledText,
  TodoElement,
} from '@wangeditor/basic-modules'
export type { ListItemElement } from '@wangeditor/list-module'
export type { TableElement, TableRowElement, TableCellElement } from '@wangeditor/table-module'
export type { VideoElement } from '@wangeditor/video-module'

// 扩展 slate CustomTypes
import type {
  StyledText,
  ColorText,
  FontSizeAndFamilyText,
  LineHeightElement,
  JustifyElement,
  IndentElement,
  ParagraphElement,
  LinkElement,
  BlockQuoteElement,
  Header1Element,
  Header2Element,
  Header3Element,
  Header4Element,
  Header5Element,
  DividerElement,
  ImageElement,
  TodoElement,
  PreElement,
  CodeElement,
} from '@wangeditor/basic-modules'
import type { VideoElement } from '@wangeditor/video-module'
import type { TableCellElement, TableRowElement, TableElement } from '@wangeditor/table-module'
import type { ListItemElement } from '@wangeditor/list-module'

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
    Text: CustomText
    Element: CustomElement
  }
}
