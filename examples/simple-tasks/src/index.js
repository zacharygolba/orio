// @flow

// export * from './factorial'
Object.assign(exports, require('./factorial'))
// export { default as fizzBuzz } from './fizz-buzz'
exports.fizzBuzz = require('./fizz-buzz')
// export { default as primes } from './primes'
exports.primes = require('./primes')
