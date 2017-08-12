// @flow

export default async function* repeat<T>(value: T): AsyncIterator<T> {
  for (;;) {
    yield value
  }
}
