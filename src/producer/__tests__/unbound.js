// @flow

import UnboundProducer from '../unbound'

function* randomRepeat(value, amount) {
  const exit = Math.round(amount / 2)

  while (Math.round(Math.random() * amount) !== exit) {
    yield value
  }
}

const ITEM = 'test'
let producer

beforeEach(() => {
  producer = new UnboundProducer(randomRepeat(ITEM, 5))
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#@@iterator()', () => {
  let i = 0

  for (const item of producer) {
    expect(item).toBe(ITEM)

    if (i++ > 3) {
      break
    }
  }
})

test('#sizeHint()', () => {
  expect(producer.sizeHint()).toBe(Infinity)
})
