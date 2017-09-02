// @flow

import * as pkg from '../package.json'

export const VERSION: string = pkg.version

export * from './types'
export { default as AsIterator } from './as-iterator'
export { default as ToString } from './to-string'
