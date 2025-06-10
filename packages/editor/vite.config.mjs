import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /@wangeditor\/(.*)/,
        replacement: path.resolve(__dirname, '../', '$1', 'src'),
      },
    ],
  },
  plugins: [
    {
      name: 'ignore-dist-css',
      apply: 'serve',
      transform(code, id) {
        // 只处理 ts/js 文件
        if (!/\.(ts|js|tsx|jsx)$/.test(id)) return null
        // 删除 @wangeditor/xxx/dist/css/style.css 的 import 语句
        const newCode = code.replace(
          /import\s+['"]@wangeditor\/(.*?)\/dist\/css\/style\.css['"];?/g,
          ''
        )
        return newCode
      },
    },
  ],
})
