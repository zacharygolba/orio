// @flow

import Chars from '../chars'

const SOURCE = 'test'
let producer

beforeEach(() => {
  producer = new Chars(SOURCE)
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
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
  expect(producer.next()).toMatchSnapshot()
})
