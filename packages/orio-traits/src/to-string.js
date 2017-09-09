// @flow

interface Named {
  static name: string,
}

export default function ToString<T: Named>(Target: Class<T>): Class<T> {
  Reflect.defineProperty(Target.prototype, Symbol.toStringTag, {
    value: Target.name,
  })

  return Target
}
