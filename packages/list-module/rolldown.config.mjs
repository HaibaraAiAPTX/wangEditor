import { defineConfig } from 'rolldown'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import fs from 'fs'
import { visualizer } from 'rollup-plugin-visualizer'
import { dts } from '../../build/get-dts-plugin.mjs'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const name = 'WangEditorListModule'

export default defineConfig([
  {
    input: './src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      name,
      sourcemap: true,
    },
    jsx: {
      mode: 'classic',
      factory: 'jsx',
      fragment: 'Fragment',
      importSource: 'snabbdom',
    },
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
    plugins: [
      postcss({
        plugins: [autoprefixer()],
        extract: 'css/style.css',
      }),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      name,
      sourcemap: true,
    },
    jsx: {
      mode: 'classic',
      factory: 'jsx',
      fragment: 'Fragment',
      importSource: 'snabbdom',
    },
    external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
    plugins: [
      postcss({
        plugins: [autoprefixer()],
        extract: 'css/style.css',
      }),
      dts('list-module'),
      visualizer(),
    ],
  },
])
