// @flow

import { EOL } from 'os'
import * as path from 'path'

import chalk from 'chalk'

import command from './utils/command'
import readdir from './utils/readdir'

const EXAMPLES = path.join(__dirname, '..', 'examples')
const PACKAGES = path.join(__dirname, '..', 'packages')
const TESTS = ['**', '__tests__', '**'].join(path.sep)

const BUILDING = chalk.bgYellow.black(' Building ')
const COMPLETE = chalk.bgGreen.black(' Complete ')
const FAILED = chalk.bgRed.black('  Failed  ')

/* eslint-disable no-console */

async function build(targetPath) {
  const lib = path.join(targetPath, 'lib')
  const src = path.join(targetPath, 'src')

  await Promise.all([
    command('babel')
      .arg(src)
      .arg('-d', lib)
      .arg('--ignore', TESTS)
      .exec(),
    command('flow-copy-source')
      .arg('-i', TESTS)
      .arg(src, lib)
      .exec(),
  ])
}

async function buildEach(cwd) {
  const targets = await readdir(cwd)
  await targets.reduce(
    (promise, target) =>
      promise.then(() => {
        const absolutePath = path.join(cwd, target)
        const relativePath = path.relative(process.cwd(), absolutePath)

        process.stdout.write(`${BUILDING} ${relativePath}`)
        return build(absolutePath)
          .then(() => {
            // $FlowFixMe
            process.stdout.clearLine()
            // $FlowFixMe
            process.stdout.cursorTo(0)
            process.stdout.write(`${COMPLETE} ${relativePath}\n`)
          })
          .catch(e => {
            // $FlowFixMe
            process.stdout.clearLine()
            // $FlowFixMe
            process.stdout.cursorTo(0)
            process.stdout.write(`${FAILED} ${relativePath}`)
            process.stdout.write(EOL)
            return Promise.reject(e)
          })
      }),
    Promise.resolve(),
  )
}

async function main() {
  process.stdout.write(EOL)
  await buildEach(PACKAGES)
  await buildEach(EXAMPLES)
  process.stdout.write(EOL)

  await command('rollup')
    .arg('-c')
    .env('NODE_ENV', 'release')
    .exec()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})

/* eslint-enable no-console */
