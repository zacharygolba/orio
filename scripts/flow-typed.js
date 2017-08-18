const path = require('path')

const paths = require('./utils/paths')
const rmrf = require('./utils/rmrf')
const run = require('./utils/run')

const main = async () => {
  await rmrf(path.join(paths.FLOW_TYPED, 'npm'))
  await run('flow-typed', 'install')
}

module.exports = main()
