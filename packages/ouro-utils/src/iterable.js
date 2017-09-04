// @flow

type Target = { [key: string]: mixed }
type IterFn<T: Target> = $PropertyType<T, '@@iterator'>

function extractIteratorFn<T: Target>(target: T): IterFn<T> {
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
