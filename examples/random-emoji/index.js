// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const ouro = require('ouro-core')

const EMOJI = require('./emoji')

function randomIndex() {
  return Math.round(Math.random() * (EMOJI.length - 1))
}

module.exports = function randomEmoji() {
  const magicNumber = randomIndex()

  return ouro
    .cycle(EMOJI)
    .filter(() => magicNumber === randomIndex())
    .first()
}
