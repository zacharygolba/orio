// @flow

import command from './utils/command'
import onError from './utils/on-error'

async function main() {
  await command('yarn')
    .arg('build')
    .shell()
    .stdout('inherit')
    .stderr('inherit')
    .exec()

  await command('yarn')
    .arg('test')
    .shell()
    .stdout('inherit')
    .stderr('inherit')
    .exec()
}

main().catch(onError)
