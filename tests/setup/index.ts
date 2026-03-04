import { expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import { randomFillSync } from 'node:crypto'

if (!global.crypto) {
  // @ts-ignore
  global.crypto = {
    getRandomValues: function (buffer: any) {
      return randomFillSync(buffer)
    },
  }
} else {
  // If crypto exists (in newer jsdom), just add getRandomValues if missing
  if (!global.crypto.getRandomValues) {
    // @ts-ignore
    global.crypto.getRandomValues = function (buffer: any) {
      return randomFillSync(buffer)
    }
  }
}

// Jest environment not contains DataTransfer object, so mock a DataTransfer class
// @ts-ignore
global.DataTransfer = class DataTransfer {
  clearData() {}
  getData(type: string) {
    if (type === 'text/plain') return ''
    return []
  }
  setData() {}
  get files() {
    return [new File(['124'], 'test.jpg')]
  }
}
