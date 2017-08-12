// @flow

export type Filter<T> = (input: T) => boolean

export default function* filter<T>(fn: Filter<T>, source: Iterable<T>): Iterator<T> {
  for (const value of source) {
    if (fn(value)) {
      yield value
    }
  }
}
