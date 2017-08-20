// @flow

import CycleProducer from '../cycle'

const SOURCE = 'test'
let producer

beforeEach(() => {
  producer = new CycleProducer(SOURCE)
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#@@iterator()', () => {
  let i = 0

  for (const item of producer) {
    expect(SOURCE).toContain(item)

    if (i++ > SOURCE.length * 3) {
      break
    }
  }
})

test('#sizeHint()', () => {
  expect(producer.sizeHint()).toBe(Infinity)
})
