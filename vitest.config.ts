import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@wangeditor/core/dist/css/style.css': resolve(__dirname, 'packages/core/dist/css/style.css'),
      '@wangeditor/core': resolve(__dirname, 'packages/core/src'),
      '@wangeditor/basic-modules/dist/css/style.css': resolve(
        __dirname,
        'packages/basic-modules/dist/css/style.css'
      ),
      '@wangeditor/basic-modules': resolve(__dirname, 'packages/basic-modules/src'),
      '@wangeditor/list-module/dist/css/style.css': resolve(
        __dirname,
        'packages/list-module/dist/css/style.css'
      ),
      '@wangeditor/list-module': resolve(__dirname, 'packages/list-module/src'),
      '@wangeditor/table-module/dist/css/style.css': resolve(
        __dirname,
        'packages/table-module/dist/css/style.css'
      ),
      '@wangeditor/table-module': resolve(__dirname, 'packages/table-module/src'),
      '@wangeditor/video-module/dist/css/style.css': resolve(
        __dirname,
        'packages/video-module/dist/css/style.css'
      ),
      '@wangeditor/video-module': resolve(__dirname, 'packages/video-module/src'),
      '@wangeditor/upload-image-module/dist/css/style.css': resolve(
        __dirname,
        'packages/upload-image-module/dist/css/style.css'
      ),
      '@wangeditor/upload-image-module': resolve(__dirname, 'packages/upload-image-module/src'),
      '@wangeditor/code-highlight/dist/css/style.css': resolve(
        __dirname,
        'packages/code-highlight/dist/css/style.css'
      ),
      '@wangeditor/code-highlight': resolve(__dirname, 'packages/code-highlight/src'),
      '@wangeditor/editor': resolve(__dirname, 'packages/editor/src'),
      '@wangeditor/editor-for-react': resolve(__dirname, 'packages/editor-for-react/src'),
      '@wangeditor/editor-for-vue': resolve(__dirname, 'packages/editor-for-vue/src'),
    },
  },
  test: {
    globals: false,
    passWithNoTests: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/index.ts'],
    include: ['packages/**/*.{test,spec}.{ts,js,tsx}'],
    exclude: ['node_modules', 'dist', '.worktrees', 'build', '**/node_modules/**'],
    css: true,
    coverage: {
      include: ['packages/**/src/**/*.(ts|tsx)'],
      exclude: [
        'dist',
        'locale',
        '**/index.ts',
        '**/config.ts',
        '**/browser-polyfill.ts',
        '**/node-polyfill.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/__tests__/**',
      ],
    },
  },
})
