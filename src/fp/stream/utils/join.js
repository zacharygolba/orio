// @flow

import { map } from '../adapters'

import reduce from './reduce'

export default function join<T>(sep?: string = ',', source: AsyncIterator<T>): Promise<string> {
  return reduce((prev, next) => prev.length ? prev + sep + next : next, '', map(String, source))
}
