// @flow

import enumerate from './enumerate'
import filter from './filter'

const skipFilter = amount => ([index]) => index >= amount

export default function* skip<T>(amount: number, source: Iterable<T>): Iterator<T> {
  for (const [, value] of filter(skipFilter(amount), enumerate(source))) {
    yield value
  }
}
