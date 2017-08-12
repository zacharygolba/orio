// @flow

export default function* cycle<T>(source: Iterable<T>): Iterator<T> {
  const items = []

  for (const value of source) {
    yield value
    items.push(value)
  }

  for (;;) {
    for (const value of items) {
      yield value
    }
  }
}
