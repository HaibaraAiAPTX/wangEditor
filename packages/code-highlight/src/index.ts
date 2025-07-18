/**
 * @description code-highlight
 * @author wangfupeng
 */

import './assets/index.less'

// 配置多语言
import './locale/index'

export * from './custom-types'

import wangEditorCodeHighlightModule from './module/index'
import wangEditorCodeHighLightDecorate from './decorate'

export { wangEditorCodeHighlightModule, wangEditorCodeHighLightDecorate }
