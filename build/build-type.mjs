import { spawnSync } from 'node:child_process'
import { copyFileSync, rmSync } from 'node:fs';
import path from 'node:path'

const scope = path.basename(process.cwd())

spawnSync("api-extractor", ["run", "--local"], { shell: true, stdio: "inherit" });

copyFileSync("./dist/index.d.ts", `./dist/index.d.mts`);

rmSync(`./dist/${scope}`, { recursive: true, force: true });
