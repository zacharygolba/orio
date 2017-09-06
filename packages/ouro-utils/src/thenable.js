// @flow

export function isThenable(value: mixed): boolean %checks {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  )
}
