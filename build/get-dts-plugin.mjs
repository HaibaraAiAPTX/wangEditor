import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import dtsRolldown from 'unplugin-dts/rolldown'

export function dts(scopePkgName, bundleTypes = true) {
  return dtsRolldown({
    afterBuild() {
      if (bundleTypes) {
        const p = spawnSync('npx', ['api-extractor', 'run', '--local'], { stdio: 'inherit', shell: true })
        fs.rmdirSync(`./dist/${scopePkgName}`, { recursive: true, force: true })
      }
    },
  })
}
