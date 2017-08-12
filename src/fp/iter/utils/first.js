// @flow

import { take } from '../adapters'

import reduce from './reduce'

export default function first<T>(source: Iterator<T>): T | void {
  return reduce((_, value) => value, undefined, take(1, source))
}
