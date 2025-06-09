import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  resolve: {
    '@wangeditor/*': path.join(__dirname, '../', 'packages', '*'),
  },
})
