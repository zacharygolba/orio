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

test('#drop()', () => {
  expect(producer.drop()).toBeUndefined()
  expect(producer.next()).toMatchSnapshot()
  expect(producer).toMatchSnapshot()
})
