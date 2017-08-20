// @flow

const fs = require('fs')
const path = require('path')

const iter = require('iter.js')

const EMOJI = fs
  .readFileSync(path.join(__dirname, 'emoji.csv'), 'utf8')
  .split(',')

function spin() {
  const bet = Math.round(Math.random() * EMOJI.length)

  return iter
    .cycle(EMOJI)
    .filter(() => bet === Math.round(Math.random() * EMOJI.length))
    .tap(emoji => console.log(emoji))
    .first()
}

spin()
