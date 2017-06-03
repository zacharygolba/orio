/* @flow */

type Range = Iterator<number>

export function* range(from: number, to?: number = Infinity): Range {
  let state = from

  for (; state <= to; state += 1) {
    yield state
  }
}

export function* repeat<T>(value: T): Iterator<T> {
  for (;;) { yield value }
}
