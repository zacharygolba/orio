// @flow

function reduce<T, U>(fn: (U, T) => U, acc: U, source: Iterator<T>): U {
  const next = source.next()

  if (next.done) {
    return acc
  }

  return reduce(fn, fn(acc, next.value), source)
}

export default reduce
