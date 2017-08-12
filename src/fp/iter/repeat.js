// @flow

export default function* repeat<T>(value: T): Iterator<T> {
  for (;;) {
    yield value
  }
}
