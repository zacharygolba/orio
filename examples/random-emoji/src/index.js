// @flow

import { iter } from 'orio'

import EMOJI from './emoji'

function randomIndex() {
  return Math.round(Math.random() * (EMOJI.length - 1))
}

export default function randomEmoji(): string {
  const magicNumber = randomIndex()
  const result = iter
    .from(EMOJI)
    .cycle()
    .filter(() => magicNumber === randomIndex())
    .first()

  if (result == null) {
    throw new Error('unreachable')
  }

  return result
}
