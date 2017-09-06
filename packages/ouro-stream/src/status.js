// @flow

export type Status<T> =
  | $Exact<{ ready: true, value: T }>
  | $Exact<{ ready: false, value: void }>

export function ready<T>(value: T): Status<T> {
  return {
    ready: true,
    value,
  }
}

export function pending(): Status<*> {
  return {
    ready: false,
    value: undefined,
  }
}
