/**
 * @description menus entry
 * @author wangfupeng
 */

import Toolbar from './bar/Toolbar'
import HoverBar from './bar/HoverBar'

// 注册
export { registerMenu } from './register'

// menu 相关接口
export type {
  IButtonMenu,
  ISelectMenu,
  IDropPanelMenu,
  IModalMenu,
  IRegisterMenuConf,
  IOption,
} from './interface'

// 输出 modal 相关方法
export {
  genModalInputElems,
  genModalButtonElems,
  genModalTextareaElems,
} from './panel-and-modal/Modal'

export { Toolbar, HoverBar }
