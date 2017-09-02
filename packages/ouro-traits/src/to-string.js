// @flow

import type { Named } from './types'

export default function ToString<T: Named>(Target: Class<T>): Class<T> {
  Object.defineProperty(Target.prototype, Symbol.toStringTag, {
    value: Target.name,
  })

  return Target
}
