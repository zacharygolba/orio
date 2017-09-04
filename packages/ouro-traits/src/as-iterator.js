// @flow

function AsIterator<T, I: Iterator<T>>(Target: Class<I>): Class<I> {
  function iterator(): I {
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

export default AsIterator
