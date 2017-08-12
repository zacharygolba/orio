// @flow

export type ForEach<T> = (input: T) => void

export default function forEach<T>(fn: ForEach<T>, source: Iterator<T>): void {
  for (const value of source) {
    fn(value)
  }
}
