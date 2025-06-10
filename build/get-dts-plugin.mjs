import fs from 'node:fs'
import { spawn } from 'node:child_process'
import dtsRolldown from 'unplugin-dts/rolldown'

export function dts(scopePkgName) {
  return dtsRolldown({
    afterBuild() {
      const p = spawn('npx', ['api-extractor', 'run', '--local'], { stdio: 'inherit' })
      p.on('close', code => {
        if (code !== 0) {
          console.error(`API Extractor process exited with code ${code}`)
        } else {
          console.log('API Extractor completed successfully')
          fs.rmdirSync(`./dist/${scopePkgName}`, { recursive: true, force: true })
        }
      })
    },
  })
}
