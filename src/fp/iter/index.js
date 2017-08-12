// @flow

import curry from '../../utils/curry'
import noop from '../../utils/noop'

import * as adapters from './adapters'
import * as utils from './utils'

export type { Filter, Map } from './adapters'
export { cycle, enumerate } from './adapters'
export const chain = curry(adapters.chain)
export const filterMap = curry(adapters.filterMap)
export const filter = curry(adapters.filter)
export const flatMap = curry(adapters.flatMap)
export const map = curry(adapters.map)
export const skipWhile = curry(adapters.skipWhile)
export const skip = curry(adapters.skip)
export const takeWhile = curry(adapters.takeWhile)
export const take = curry(adapters.take)
export const tap = curry(adapters.tap)
export const zip = curry(adapters.zip)

export type { ForEach, Reduce } from './utils'
export { count, first, last, reduce, sum, product } from './utils'
export const every = curry(utils.every)
export const find = curry(utils.find)
export const forEach = curry(utils.forEach)
export const join = curry(utils.join)
export const nth = curry(utils.nth)
export const some = curry(utils.some)

export const from = map(noop)
export { default as range } from './range'
export { default as repeat } from './repeat'
