// @flow

import { EOL } from 'os'
import * as path from 'path'

import chalk from 'chalk'

import command from './utils/command'
import readdir from './utils/readdir'

const EXAMPLES = path.join(__dirname, '..', 'examples')
const PACKAGES = path.join(__dirname, '..', 'packages')
const TESTS = '**/__tests__/**'

const BUILDING = chalk.bgYellow.black(' Building ')
const COMPLETE = chalk.bgGreen.black(' Complete ')
const FAILED = chalk.bgRed.black('  Failed  ')

const { stdout, stderr } = process

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

        stdout.write(`${BUILDING} ${relativePath}`)

        return build(absolutePath)
          .then(() => {
            if (typeof stdout.clearLine === 'function') {
              stdout.clearLine()
            }

            if (typeof stdout.cursorTo === 'function') {
              stdout.cursorTo(0)
            } else {
              stdout.write(EOL)
            }

            stdout.write(`${COMPLETE} ${relativePath}`)
            stdout.write(EOL)
          })
          .catch(e => {
            if (typeof stdout.clearLine === 'function') {
              stdout.clearLine()
            }

            if (typeof stdout.cursorTo === 'function') {
              stdout.cursorTo(0)
            } else {
              stdout.write(EOL)
            }

            stdout.write(`${FAILED} ${relativePath}`)
            stdout.write(EOL)
            stdout.write(EOL)

            return Promise.reject(e)
          })
      }),
    Promise.resolve(),
  )
}

async function main() {
  stdout.write(EOL)
  await buildEach(PACKAGES)
  await buildEach(EXAMPLES)
  stdout.write(EOL)

  await command('rollup')
    .arg('-c')
    .env('NODE_ENV', 'release')
    .exec()
}

main().catch(e => {
  stderr.write(e.stack || e.message)
  stderr.write(EOL)
  stderr.write(EOL)
  process.exit(1)
})
