// @flow

type Target = { [key: string]: mixed }
type IterFn<+T> = () => Iterator<T>

function extractIteratorFn<T: Target>(target: T): ?IterFn<*> {
  const value = target[Symbol.iterator]

  if (typeof value === 'function') {
    return value
  }

  return undefined
}

export function isIterableObject(target: mixed): boolean %checks {
  return (
    target != null &&
    typeof target === 'object' &&
    typeof extractIteratorFn(target) === 'function'
  )
}

export function intoIterator(target: mixed): ?Iterator<*> {
  if (target != null && typeof target === 'object') {
    const iterFn = extractIteratorFn(target)

    if (typeof iterFn === 'function') {
      return iterFn.call(target)
    }
  }

  return undefined
}
