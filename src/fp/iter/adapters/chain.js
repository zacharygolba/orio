// @flow

export default function* chain<T, U>(b: Iterable<U>, a: Iterable<T>): Iterator<T | U> {
  for (const value of a) {
    yield value
  }

  for (const value of b) {
    yield value
  }
}
