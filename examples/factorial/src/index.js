// @flow

import * as ouro from 'ouro-core'

export default function factorial(n: number): number {
  return ouro
    .range(n === 0 ? 1 : Math.abs(n), 1)
    .takeWhile(Number.isFinite)
    .product()
}
