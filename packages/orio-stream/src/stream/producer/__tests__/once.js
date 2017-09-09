// @flow

import Once from '../once'

let producer

beforeEach(() => {
  producer = new Once('test')
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
})
