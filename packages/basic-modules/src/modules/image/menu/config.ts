/**
 * @description 图片菜单配置
 * @author wangfupeng
 */

import type { ImageElement } from '../custom-types'

export function genImageMenuConfig() {
  return {
    /**
     * 插入图片之后的回调
     * @param _imageElem ImageElement
     */
    onInsertedImage(_imageElem: ImageElement) {
      /*自定义*/
    },

    /**
     * 更新图片之后的回调
     * @param _node image node
     */
    onUpdatedImage(_node: ImageElement | null) {
      /*自定义*/
    },

    /**
     * 检查图片信息，支持 async fn
     * @param _src image src
     * @param _alt image alt
     * @param _href image href
     */
    checkImage(_src: string, _alt: string, _href: string): boolean | string | undefined {
      // 1. 返回 true ，说明检查通过
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止图片插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止图片插入
      return true
    },

    /**
     * parse image src
     * @param src image src
     * @returns new src
     */
    parseImageSrc(src: string): string {
      return src
    },
  }
}
