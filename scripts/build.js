// @flow

import * as path from 'path'

import command from './utils/command'
import readdir from './utils/readdir'

const EXAMPLES = path.join(__dirname, '..', 'examples')
const PACKAGES = path.join(__dirname, '..', 'packages')
const TESTS = ['**', '__tests__', '**'].join(path.sep)

async function build(cwd, target) {
  const lib = path.join(cwd, target, 'lib')
  const src = path.join(cwd, target, 'src')

  await Promise.all([
    command('babel')
      .arg(src)
      .arg('-d', lib)
      .arg('--ignore', TESTS)
      .stdout('inherit')
      .stderr('inherit')
      .exec(),
    command('flow-copy-source')
      .arg('-i', TESTS)
      .arg(src, lib)
      .stdout('inherit')
      .stderr('inherit')
      .exec(),
  ])
}

async function buildEach(cwd) {
  const targets = await readdir(cwd)
  await targets.reduce(
    (promise, target) => promise.then(() => build(cwd, target)),
    Promise.resolve(),
  )
}

async function main() {
  await buildEach(PACKAGES)
  await buildEach(EXAMPLES)
  await command('rollup')
    .arg('-c')
    .env('NODE_ENV', 'release')
    .stdout('inherit')
    .stderr('inherit')
    .exec()
}

main().catch(e => {
  process.stderr.write(`${e.message}\n`)
  process.exit(1)
})
