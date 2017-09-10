// @flow

import { EOL } from 'os'
import * as path from 'path'

import chalk from 'chalk'

import command from './utils/command'
import onError from './utils/on-error'
import readdir from './utils/readdir'

const EXAMPLES = path.join(__dirname, '..', 'examples')
const PACKAGES = path.join(__dirname, '..', 'packages')

const BUILDING = chalk.bgYellow.black(' BUILDING ')
const COMPLETE = chalk.bgGreen.black(' COMPLETE ')
const FAILED = chalk.bgRed.black('  FAILED  ')

const { stdout } = process

const formatPath = absolutePath => {
  const dirname = path.dirname(path.relative(process.cwd(), absolutePath))
  return chalk.dim(dirname + path.sep) + path.basename(absolutePath)
}

async function build(targetPath) {
  const lib = path.join(targetPath, 'lib')
  const src = path.join(targetPath, 'src')

  await Promise.all([
    command('babel')
      .arg(src)
      .arg('-d', lib)
      .arg('--ignore', '**/__mocks__/**,**/__tests__/**')
      .shell()
      .exec(),
    command('flow-copy-source')
      .arg('-i', '**/__mocks__/**')
      .arg('-i', '**/__tests__/**')
      .arg(src, lib)
      .shell()
      .exec(),
  ])
}

async function buildEach(cwd) {
  let targets = await readdir(cwd)
  targets = targets.filter(target => !target.startsWith('.'))

  await targets.reduce(
    (promise, target) =>
      promise.then(() => {
        const absolutePath = path.join(cwd, target)
        const displayPath = formatPath(absolutePath)

        stdout.write(`${BUILDING} ${displayPath}`)

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

            stdout.write(`${COMPLETE} ${displayPath}`)
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

            stdout.write(`${FAILED} ${displayPath}`)
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
    .arg('--silent')
    .env('NODE_ENV', 'release')
    .shell()
    .stdout('inherit')
    .stderr('inherit')
    .exec()
}

main().catch(onError)
