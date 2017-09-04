// @flow

type IterFn<T: Object> = $PropertyType<T, '@@iterator'>

function extractIteratorFn<T: Object>(target: T): IterFn<T> {
  return target[Symbol.iterator]
}

export function isIterableObject(target: mixed): boolean %checks {
  return (
    target != null &&
    typeof target === 'object' &&
    typeof extractIteratorFn(target) === 'function'
  )
}

export function intoIterator<T: Object>(target: T): Iterator<*> {
  return extractIteratorFn(target).call(target)
}
