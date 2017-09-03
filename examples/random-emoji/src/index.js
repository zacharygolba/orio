// @flow

import * as ouro from 'ouro-core'

import EMOJI from './emoji'

function randomIndex() {
  return Math.round(Math.random() * (EMOJI.length - 1))
}

export default function randomEmoji(): string {
  const magicNumber = randomIndex()

  return ouro
    .from(EMOJI)
    .cycle()
    .filter(() => magicNumber === randomIndex())
    .first()
}
