// @flow

// export * from './factorial'
Object.assign(exports, require('./factorial'))
// export { default as fibonacci } from './fibonacci'
exports.fibonacci = require('./fibonacci')
// export { default as fizzBuzz } from './fizz-buzz'
exports.fizzBuzz = require('./fizz-buzz')
