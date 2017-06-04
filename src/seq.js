/* @flow */

type Filter<T> = (input: T) => boolean
type Mapper<T, U> = (input: T) => U

export function* range(from: number, to?: number): Iterator<number> {
  const start = Math.floor(from)
  const end = Math.floor(to || start)

  for (let state = start; state <= end; state += 1) {
    yield state
  }
}

export function* repeat<+T: any>(value: T): Iterator<T> {
  for (;;) {
    yield value
  }
}

export function* enumerate<T>(source: Iterator<T>): Iterator<[number, T]> {
  let state = 0

  for (const value of source) {
    yield [state, value]
    state += 1
  }
}

export function* map<T, U>(source: Iterator<T>, fn: Mapper<T, U>): Iterator<U> {
  for (const value of source) {
    yield fn(value)
  }
}

export function* filter<T>(source: Iterator<T>, fn: Filter<T>): Iterator<T> {
  for (const value of source) {
    if (fn(value)) {
      yield value
    }
  }
}

export function* take<T>(source: Iterator<T>, amount: number): Iterator<T> {
  // eslint-disable-next-line
  for (const _ of range(1, amount)) {
    // $FlowIgnore
    yield source.next().value
  }
}

export function* zip<T, U>(a: Iterator<T>, b: Iterable<U>): Iterator<[T, U]> {
  // $FlowIgnore
  const c = b[Symbol.iterator]()

  for (const key of a) {
    const { value } = c.next()

    yield [key, value]
  }
}
