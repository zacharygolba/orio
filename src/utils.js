/* @flow */

type HasInputs<T> = (...args: Array<T>) => any
type Negated<T> = (...args: Array<T>) => boolean

export const isNil = <T>(value: T): boolean =>
  isUndefined(value) || isNull(value)

export const isNull = <T>(value: T): boolean =>
  value === null

export const isUndefined = <T>(value: T): boolean =>
  value === undefined

export const negate = <T>(fn: HasInputs<T>): Negated<T> =>
  (...args) => !fn(...args)

export const isSome = negate(isNil)
