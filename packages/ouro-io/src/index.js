// @flow

import * as pkg from '../package.json'

import * as sink from './sink'
import * as stream from './stream'

export const VERSION: string = pkg.version
export { sink, stream }
