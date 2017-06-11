/* @flow */

import type { Noop } from './types'

export type Accessors<T> = {
  get?: () => T,
  set?: (value: T) => void,
}

export type Flags = {
  configurable?: boolean,
  enumerable?: boolean,
  writable?: boolean,
}

export type Desc<T> = Accessors<T> & Flags
                    | Flags & { value?: T }

const extractFlags = ({ configurable, enumerable, writable }) => ({
  configurable,
  enumerable,
  writable,
})

const withName = (name, fn) => Object.defineProperty(fn, 'name', {
  value: name,
})

/**
 * Mark a method as unimplemented. Calls to the method will throw an error.
 * Think of this as a glorified TODO comment.
 */
export const unimplemented =
  <T: Object, U>(target: T, key: string, desc: Desc<U>): Desc<Noop> => ({
    ...extractFlags(desc),
    value: withName(key, () => {
      throw new Error(
        `method '${key}' is unimplemented for ${target.constructor.name}`
      )
    }),
  })
