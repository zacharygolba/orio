// @flow

export type Filter<T> = (input: T) => boolean | Promise<boolean>

export default async function* filter<T>(
  fn: Filter<T>,
  source: AsyncIterable<T>,
): AsyncIterator<T> {
  for await (const value of source) {
    // eslint-disable-next-line no-await-in-loop
    if (await fn(value)) {
      yield value
    }
  }
}
