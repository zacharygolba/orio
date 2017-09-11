// @flow

import Empty from '../empty'

let producer

beforeEach(() => {
  producer = new Empty()
})

test('#constructor()', () => {
  expect(producer).toMatchSnapshot()
})

test('#drop()', () => {
  expect(producer.drop()).toBeUndefined()
  expect(producer).toMatchSnapshot()
})

test('#next()', async () => {
  expect(await producer.next()).toMatchSnapshot()
  expect(await producer.next()).toMatchSnapshot()
})
