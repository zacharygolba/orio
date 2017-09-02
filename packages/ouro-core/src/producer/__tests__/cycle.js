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
    if (i > SOURCE.length * 3) {
      break
    }

    expect(SOURCE).toContain(item)
    i += 1
  }
})
