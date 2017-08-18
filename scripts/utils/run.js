const { spawn } = require('mz/child_process')

const paths = require('./paths')

module.exports = (program, ...options) => spawn(program, options, {
  cwd: paths.ROOT,
  env: process.env,
  stdio: 'inherit',
})
