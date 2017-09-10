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

test('#drop()', async () => {
  expect(producer.drop()).toBeUndefined()
  expect(await producer.next()).toMatchSnapshot()
  expect(producer).toMatchSnapshot()
})

test('#next()', async () => {
  expect(await producer.next()).toMatchSnapshot()
  expect(await producer.next()).toMatchSnapshot()
  expect(await producer.next()).toMatchSnapshot()
  expect(await producer.next()).toMatchSnapshot()
  expect(await producer.next()).toMatchSnapshot()
})
