// @flow

import Repeat from '../repeat'

const ITEM = 'test'
let producer

beforeEach(() => {
  producer = new Repeat(ITEM)
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
