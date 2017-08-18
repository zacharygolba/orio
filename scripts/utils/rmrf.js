const path = require('path')

const fs = require('mz/fs')

module.exports = async function rmrf(target) {
  const exists = await fs.exists(target)

  if (exists) {
    const isDirectory = await fs.stat(target).then(info => info.isDirectory())

    if (isDirectory) {
      const children = await fs.readdir(target)

      await Promise.all(children.map(child => rmrf(path.join(target, child))))
      return fs.rmdir(target)
    }

    return fs.unlink(target)
  }

  return undefined
}
