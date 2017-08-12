const fs = require('fs')

const iter = require('iter.js')

exports.cat = path => iter.stream
  .fromReadable(fs.createReadStream(path))
  .forEach(chunk => console.log(chunk))
