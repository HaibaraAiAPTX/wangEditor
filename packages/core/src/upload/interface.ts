/**
 * @description upload interface
 * @author wangfupeng
 */

import { type UppyFile } from '@uppy/core'

type FilesType = { [key: string]: UppyFile<any, any> }

/**
 * 配置参考 https://uppy.io/docs/uppy/
 */
export interface IUploadConfig {
  server: string
  fieldName?: string
  maxFileSize?: number
  maxNumberOfFiles?: number
  meta?: Record<string, unknown>
  metaWithUrl: boolean
  headers?:
    | Headers
    | ((file: UppyFile<Record<string, unknown>, Record<string, unknown>>) => Headers)
    | undefined
  withCredentials?: boolean
  timeout?: number
  onBeforeUpload?: (files: FilesType) => boolean | FilesType
  onSuccess: (
    file: UppyFile<Record<string, unknown>, Record<string, unknown>>,
    response: any
  ) => void
  onProgress?: (progress: number) => void
  onFailed: (
    file: UppyFile<Record<string, unknown>, Record<string, unknown>>,
    response: any
  ) => void
  onError: (
    file: UppyFile<Record<string, unknown>, Record<string, unknown>>,
    error: any,
    res: any
  ) => void
}
