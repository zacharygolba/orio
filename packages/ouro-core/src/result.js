// @flow

export function done<T>(value?: T): IteratorResult<*, T> {
  return {
    done: true,
    value,
  }
}

export function next<T>(value: T): IteratorResult<T, *> {
  return {
    done: false,
    value,
  }
}
