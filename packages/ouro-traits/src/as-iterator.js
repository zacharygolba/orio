// @flow

function iterator() {
  return this
}

Object.defineProperty(iterator, 'name', {
  value: '[Symbol.iterator]',
})

export default function AsIterator<T>(Target: Class<T>): Class<T> {
  Object.defineProperty(Target.prototype, Symbol.iterator, {
    value: iterator,
  })

  return Target
}
