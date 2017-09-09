// @flow

import { iter } from 'orio'

function isComposite(n) {
  const abs = Math.abs(n)

  if (abs === 0 || abs === 1 || abs === 2) {
    return false
  }

  return iter.range(abs - 1, 2).some(div => abs % div === 0)
}

export default function primes(size: number): Array<number> {
  return iter
    .range()
    .filter(n => !isComposite(n))
    .take(size)
    .collect()
}
