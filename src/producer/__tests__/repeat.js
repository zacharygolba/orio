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
    expect(item).toBe(ITEM)

    if (i++ > 3) {
      break
    }
  }
})

test('#sizeHint()', () => {
  expect(producer.sizeHint()).toBe(Infinity)
})
