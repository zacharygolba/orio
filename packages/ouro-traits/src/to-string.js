// @flow

import type { Named } from './types'

export default function ToString<T: Named>(Target: Class<T>): Class<T> {
  Reflect.defineProperty(Target.prototype, Symbol.toStringTag, {
    value: Target.name,
  })

  return Target
}
