// @flow

export default async function* chain<T, U>(
  b: AsyncIterable<U>,
  a: AsyncIterable<T>,
): AsyncIterator<T | U> {
  for await (const value of a) {
    yield value
  }

  // eslint-disable-next-line no-shadow, no-redeclare
  for await (const value of b) {
    yield value
  }
}
