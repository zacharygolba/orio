// @flow

import Cycle from '../cycle'

const SOURCE = 'test'
let producer

beforeEach(() => {
  producer = new Cycle(SOURCE)
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#drop()', () => {
  expect(producer.drop()).toBeUndefined()
  expect(producer.next()).toMatchSnapshot()
  expect(producer).toMatchSnapshot()
})

test('#next()', () => {
  // First cycle...
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()

  // Second cycle...
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
})
