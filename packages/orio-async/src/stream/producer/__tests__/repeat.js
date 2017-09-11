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
  expect(await producer.next()).toMatchSnapshot()
})
