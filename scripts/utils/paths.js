const path = require('path')

const ROOT = path.join(__dirname, '..', '..')

const COVERAGE = path.join(ROOT, 'coverage')
const DIST = path.join(ROOT, 'dist')
const FLOW_TYPED = path.join(ROOT, 'flow-typed')
const SRC = path.join(ROOT, 'src')

module.exports = {
  COVERAGE,
  DIST,
  FLOW_TYPED,
  ROOT,
  SRC,
}
