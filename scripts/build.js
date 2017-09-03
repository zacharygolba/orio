// @flow

import * as fs from 'fs'
import * as path from 'path'

import command from './utils/command'

const PACKAGES = path.join(__dirname, '..', 'packages')
const TESTS = ['**', '__tests__', '**'].join(path.sep)

async function main() {
  const promises = [
    command('rollup')
      .arg('-c')
      .env('NODE_ENV', 'release')
      .stdout('inherit')
      .stderr('inherit')
      .exec(),
  ]

  {
    const targets = fs.readdirSync(PACKAGES)

    targets.forEach(target => {
      const lib = path.join(PACKAGES, target, 'lib')
      const src = path.join(PACKAGES, target, 'src')

      promises.push(
        command('babel')
          .arg(src)
          .arg('-d', lib)
          .arg('--ignore', TESTS)
          .exec(),
        command('flow-copy-source')
          .arg('-i', TESTS)
          .arg(src, lib)
          .exec(),
      )
    })
  }

  return promises
}

main()
