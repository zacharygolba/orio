// @flow

import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import Lazy from 'lazy.js'

type Options = {
  directory: string,
  filter: RegExp,
  pattern: RegExp,
}

const EOL = new RegExp(os.EOL, 'g')

function readFiles(directory) {
  return Lazy(fs.readdirSync(directory))
    .filter(file => file !== '.' && file !== '..')
    .map(file => path.join(directory, file))
    .map(file => {
      const info = fs.statSync(file)

      if (info.isDirectory()) {
        return readFiles(file)
      }

      return [file]
    })
    .flatten()
}

export function count({ directory, filter, pattern }: Options): number {
  return readFiles(directory, pattern)
    .filter(file => pattern.test(file))
    .map(file => fs.readFileSync(file, 'utf8').split(EOL))
    .flatten()
    .filter(line => line.length > 0)
    .filter(line => filter.test(line))
    .size()
}
