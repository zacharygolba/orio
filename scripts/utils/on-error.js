// @flow

import { EOL } from 'os'

const { stderr } = process

export default function onError(e: Error): void {
  stderr.write(e.stack || e.message)
  stderr.write(EOL)
  stderr.write(EOL)
  process.exit(1)
}
