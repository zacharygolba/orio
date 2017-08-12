// @flow

export type Map<T, U> = (input: T) => U

export default function* map<T, U>(fn: Map<T, U>, source: Iterable<T>): Iterator<U> {
  for (const value of source) {
    yield fn(value)
  }
}
