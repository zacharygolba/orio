// @flow

import * as ouro from 'ouro-core'

function isComposite(n) {
  const abs = Math.abs(n)

  if (abs === 0 || abs === 1 || abs === 2) {
    return false
  }

  return ouro.range(abs - 1, 2).some(div => abs % div === 0)
}

export default function primes(size: number): Array<number> {
  // $FlowFixMe
  return ouro
    .range()
    .filter(n => !isComposite(n))
    .take(size)
    .collect()
}
