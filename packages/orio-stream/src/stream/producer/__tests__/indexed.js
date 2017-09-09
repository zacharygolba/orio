// @flow

import Indexed from '../indexed'

const SOURCE = [1, 2, 3]
let producer

beforeEach(() => {
  producer = new Indexed(SOURCE)
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
})
