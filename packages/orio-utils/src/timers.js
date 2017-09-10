// @flow

type ImmediateFn = Function => void

let immediateFn: ImmediateFn = fn => {
  setTimeout(fn, 0)
}

if (typeof setImmediate === 'function') {
  immediateFn = fn => {
    setImmediate(fn)
  }
}

export function immediate(): Promise<void> {
  return new Promise(resolve => immediateFn(resolve))
}
