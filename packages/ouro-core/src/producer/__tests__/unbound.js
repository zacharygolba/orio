// @flow

import Unbound from '../unbound'

const ITEM = new Set('test')
let producer

beforeEach(() => {
  producer = new Unbound(ITEM.values())
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#drop()', () => {
  expect(producer.drop()).toBeUndefined()
})
