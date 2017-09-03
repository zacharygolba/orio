// @flow

import * as ouro from 'ouro-core'

export const LENGTH: number = 48
export const PATTERN: RegExp = /[0-9A-Za-z]/

export default function generate(
  length?: number = LENGTH,
  pattern?: RegExp = PATTERN,
): string {
  return (
    ouro
      .chars('0', '9')
      .chain(ouro.chars('A', 'Z'))
      .chain(ouro.chars('a', 'z'))
      .cycle()
      // filter chars that don't match the input pattern (default: [0-9A-Za-z])
      .filter(char => pattern.test(char))
      // filter by a random boolean for increased randomness
      .filter(() => Math.floor(Math.random() * 7) === 3)
      // take n number of values from this iterator (default: 48)
      .take(length)
      // collect into a string
      .join('')
  )
}
