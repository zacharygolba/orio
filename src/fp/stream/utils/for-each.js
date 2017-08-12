// @flow

export type ForEach<T> = (input: T) => void | Promise<void>

export default async function forEach<T>(fn: ForEach<T>, source: AsyncIterator<T>): Promise<void> {
  for await (const value of source) {
    await fn(value)
  }
}
