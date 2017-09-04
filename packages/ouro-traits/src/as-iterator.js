// @flow

export default function AsIterator<T>(Target: Class<T>): Class<T> {
  function iterator(): T {
    return this
  }

  Reflect.defineProperty(iterator, 'name', {
    value: '[Symbol.iterator]',
  })

  Reflect.defineProperty(Target.prototype, Symbol.iterator, {
    value: iterator,
  })

  return Target
}
