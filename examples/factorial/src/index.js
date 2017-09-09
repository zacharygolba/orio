// @flow

import { iter } from 'orio'

export default function factorial(n: number): number {
  return iter
    .range(n === 0 ? 1 : Math.abs(n), 1)
    .takeWhile(Number.isFinite)
    .product()
}
