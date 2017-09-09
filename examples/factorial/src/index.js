// @flow

import * as orio from 'orio'

export default function factorial(n: number): number {
  return orio
    .range(n === 0 ? 1 : Math.abs(n), 1)
    .takeWhile(Number.isFinite)
    .product()
}
