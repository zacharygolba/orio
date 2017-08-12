// @flow

export type Map<T, U> = (input: T) => U | Promise<U>

export default async function* map<T, U>(
  fn: Map<T, U>,
  source: AsyncIterable<T>,
): AsyncIterator<U> {
  for await (let value of source) {
    yield await fn(value)
  }
}
