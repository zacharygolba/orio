// @flow

import RepeatProducer from '../repeat'

const ITEM = 'test'
let producer

beforeEach(() => {
  producer = new RepeatProducer(ITEM)
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

test('#sizeHint()', () => {
  expect(producer.sizeHint()).toBe(Infinity)
})
