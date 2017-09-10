// @flow

import { HAS_SET_IMMEDIATE } from './consts'

type ImmediateFn = Function => void

let immediateFn: ImmediateFn = fn => {
  setTimeout(fn, 0)
}

if (HAS_SET_IMMEDIATE) {
  immediateFn = fn => {
    setImmediate(fn)
  }
}

export function immediate(): Promise<void> {
  return new Promise(resolve => immediateFn(resolve))
}
