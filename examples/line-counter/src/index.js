// @flow

const fs = require('fs')
const os = require('os')
const path = require('path')

const iter = require('iter.js')

/*::
type Options = {
  directory: string,
  filter: RegExp,
  pattern: RegExp,
}
*/

const EOL = new RegExp(os.EOL, 'g')

function readFiles(directory) {
  return iter
    .from(fs.readdirSync(directory))
    .filter(file => file !== '.' && file !== '..')
    .map(file => path.join(directory, file))
    .flatMap(file => {
      const info = fs.statSync(file)

      if (info.isDirectory()) {
        return readFiles(file)
      }

      return [file]
    })
}

module.exports = function main({ directory, filter, pattern } /*: Options */) /*: number */ {
  return readFiles(directory, pattern)
    .filter(file => pattern.test(file))
    .flatMap(file => fs.readFileSync(file, 'utf8').split(EOL))
    .filter(line => line.length > 0)
    .filter(line => filter.test(line))
    .count()
}
