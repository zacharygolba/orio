// @flow

import * as pkg from '../package.json'

export const VERSION: string = pkg.version

export * from './as-iterator'
export { default as ToString } from './to-string'
