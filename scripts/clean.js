const paths = require('./utils/paths')
const rmrf = require('./utils/rmrf')

const main = () => Promise.all([
  rmrf(paths.COVERAGE),
  rmrf(paths.DIST),
])

module.exports = main()
