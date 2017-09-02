// @flow

import Unbound from '../unbound'

function* randomRepeat(value, amount) {
  const exit = Math.round(amount / 2)

  while (Math.round(Math.random() * amount) !== exit) {
    yield value
  }
}

const ITEM = 'test'
let producer

beforeEach(() => {
  producer = new Unbound(randomRepeat(ITEM, 5))
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#@@iterator()', () => {
  let i = 0

  for (const item of producer) {
    if (i > 3) {
      break
    }

    expect(item).toBe(ITEM)
    i += 1
  }
})
